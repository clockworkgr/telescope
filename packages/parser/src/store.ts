import { sync as glob } from "glob";
import { parse } from "@pyramation/protobufjs";
import { readFileSync } from "fs";
import { join, resolve as pathResolve } from "path";
import {
  ALLOWED_RPC_SERVICES,
  ProtoDep,
  ProtoField,
  ProtoRef,
  ProtoServiceMethod,
  ProtoType,
  TelescopeOptions,
} from "@osmonauts/types";
import {
  createTypeUrlTypeMap,
  getNestedProto,
  getPackageAndNestedFromStr,
} from "./utils";
import {
  parseFullyTraversedProtoImports,
  symbolsToImportNames,
  traverse,
} from "./traverse";
import { lookupAny, lookupAnyFromImports } from "./lookup";
import {
  defaultTelescopeOptions,
  TelescopeLogLevel,
  TraversalSymbol,
} from "@osmonauts/types";

import google_any from "./native/any";
import google_descriptor from "./native/descriptor";
import google_duration from "./native/duration";
import google_timestamp from "./native/timestamp";
import google_empty from "./native/empty";
import google_field_mask from "./native/field_mask";
import google_struct from "./native/struct";
import google_wrappers from "./native/wrappers";

const GOOGLE_PROTOS = [
  ["google/protobuf/any.proto", google_any],
  ["google/protobuf/duration.proto", google_duration],
  ["google/protobuf/descriptor.proto", google_descriptor],
  ["google/protobuf/timestamp.proto", google_timestamp],
  ["google/protobuf/empty.proto", google_empty],
  ["google/protobuf/struct.proto", google_struct],
  ["google/protobuf/wrappers.proto", google_wrappers],
  ["google/protobuf/field_mask.proto", google_field_mask],
];

interface ParseProtoOptions {
  keepCase?: boolean;
  alternateCommentMode?: boolean;
  preferTrailingComment?: boolean;
}

const protoParseOptionsDefaults = {
  keepCase: false,
  alternateCommentMode: true,
  preferTrailingComment: false,
};

export const parseProto = (content, options?: ParseProtoOptions) => {
  if (!options) {
    options = protoParseOptionsDefaults;
  }
  return parse(content, options);
};
export class ProtoStore {
  files: string[];
  includeDirs: string[];
  protoDirs: string[];
  deps: ProtoDep[];
  protos: ProtoRef[];
  packages: string[];
  options: TelescopeOptions;

  requests: Record<string, ProtoServiceMethod> = {};
  responses: Record<string, ProtoServiceMethod> = {};

  _traversed: boolean = false;
  _symbols: TraversalSymbol[] = [];

  constructor(
    protoDirs: string[] = [],
    includeDirs: string[] = [],
    options: TelescopeOptions = defaultTelescopeOptions
  ) {
    this.protoDirs = protoDirs.map((protoDir) => pathResolve(protoDir));
    this.includeDirs = includeDirs.map((includeDir) => pathResolve(includeDir));
    this.options = options;
  }

  findProto(filename): ProtoRef {
    return this.getProtos().find((proto) => {
      return proto.filename === filename;
    });
  }

  findProtoWhere(fn: (ref: ProtoRef) => boolean): ProtoRef {
    return this.getProtos().find((ref) => {
      return fn(ref);
    });
  }

  filterProtoWhere(fn: (ref: ProtoRef) => boolean): ProtoRef[] {
    return this.getProtos().filter((ref) => {
      return fn(ref);
    });
  }

  findProtoObject(filename, name): any {
    const proto = this.findProto(filename);
    return getNestedProto(proto.traversed ?? proto.proto)[name];
  }

  registerRequest(svc: ProtoServiceMethod): void {
    this.requests[svc.requestType] = svc;
    this.responses[svc.responseType] = svc;
  }

  processProtos(
    contents: { absolute: string; filename: string; content: string }[]
  ) {
    return contents.map(({ absolute, filename, content }) => {
      try {
        const proto = parseProto(content, this.options.prototypes.parser);
        return {
          absolute,
          filename,
          proto,
        };
      } catch (e) {
        console.error(`${filename} has a proto syntax error`);
        throw e;
      }
    });
  }

  getProtos(): ProtoRef[] {
    if (this.protos) return this.protos;
    const allcontents = this.includeDirs.reduce((m, protoDir) => {
      const protoSplat = join(protoDir, "/**/*.proto");
      const protoFiles = glob(protoSplat);
      const contents = protoFiles.map((filename) => ({
        absolute: filename,
        filename: filename.split(protoDir)[1].replace(/^\//, ""),
        content: readFileSync(filename, "utf-8"),
      }));
      return [...m, ...contents];
    }, []);
    const buildcontents = this.protoDirs.map((filename) => ({
      absolute: filename,
      filename: filename,
      content: readFileSync(filename, "utf-8"),
    }));
    const registeredProtos = [];
    const buildprotos = this.processProtos(buildcontents).filter((proto) => {
      if (registeredProtos.includes(proto.filename)) {
        if (this.options.logLevel >= TelescopeLogLevel.Warn) {
          console.warn(`${proto.filename} already included!`);
        }
        return false;
      }
      registeredProtos.push(proto.filename);
      return true;
    });
    const allprotos = this.processProtos(allcontents).filter((proto) => {
      if (registeredProtos.includes(proto.filename)) {
        if (this.options.logLevel >= TelescopeLogLevel.Warn) {
          console.warn(`${proto.filename} already included!`);
        }
        return false;
      }
      registeredProtos.push(proto.filename);
      return true;
    });
    const neededFromGoogle = [];
    const neededDeps = [];
    this.getDependencies(buildprotos).map((dep) => {
      const google =
        dep.imports?.filter((imp) => imp.startsWith("google/protobuf")) ?? [];
      if (google.length) {
        google.forEach((goog) => {
          // if they don't got it, let's give it to 'em!
          const found = buildcontents.find((file) => file.filename === goog);
          if (found) return;

          // NOT FOUND
          const filler = GOOGLE_PROTOS.find(([f, v]) => {
            return f === goog;
          });
          if (!filler) return; // technically an error should be thrown

          // we have the filler
          if (!neededFromGoogle.find((file) => file.filename === goog)) {
            neededFromGoogle.push({
              absolute: filler[0],
              filename: filler[0],
              content: filler[1],
            });
          }
        });
      }
      const otherdeps =
        dep.imports?.filter((imp) => !imp.startsWith("google/protobuf")) ?? [];
      if (otherdeps.length) {
        otherdeps.forEach((otherdep) => {
          // if they don't got it, let's give it to 'em!
          const found = buildcontents.find(
            (file) => file.filename === otherdep
          );
          if (found) return;

          // we have the filler
          if (!neededDeps.find((file) => file.filename === otherdep)) {
            const found = allcontents.find(
              (file) => file.filename === otherdep
            );
            neededDeps.push({
              absolute: found.absolute,
              filename: found.filename,
              content: found.content,
            });
          }
        });
      }
    });
    const missingProtos = [
      ...this.processProtos(neededFromGoogle),
      ...this.processProtos(neededDeps),
    ];

    this.protos = [...buildprotos, ...missingProtos];
    return this.protos;
  }

  getPackages(): string[] {
    if (this.packages) return this.packages;
    this.packages = this.getProtos().reduce((m, ref) => {
      return [...new Set([...m, ref.proto.package])];
    }, []);
    // LONGEST strings first, for better matching
    this.packages = this.packages.sort((a, b) => {
      return b.length - a.length;
    });
    return this.packages;
  }

  parseScope(type: string) {
    const pkgs = this.getPackages();
    for (let pkg of pkgs) {
      const found = getPackageAndNestedFromStr(type, pkg);
      if (found) return found;
    }
  }

  getDeps(): ProtoDep[] {
    if (this.deps) return this.deps;
    this.deps = this.getDependencies(this.getProtos());
    return this.deps;
  }

  getDependencies(protos: ProtoRef[]): ProtoDep[] {
    return protos.map((el) => {
      const {
        filename,
        proto: { package: pkg, imports },
      } = el;
      return {
        filename,
        package: pkg,
        imports,
      };
    });
  }

  traverseAll(): void {
    if (this._traversed) return;
    this.protos = this.getProtos().map((ref: ProtoRef) => {
      return {
        absolute: ref.absolute,
        filename: ref.filename,
        proto: ref.proto,
        traversed: traverse(this, ref),
      };
    });
    this._symbols = parseFullyTraversedProtoImports(this);

    // process import names
    this.protos = this.protos.map((ref: ProtoRef) => {
      const traversed = ref.traversed;
      const symbs = this._symbols.filter((f) => f.ref === ref.filename);
      traversed.importNames = symbolsToImportNames(ref, symbs);

      // now add any inferred imports as a result of accepts/implements
      symbs
        .filter((f) => f.ref !== f.source)
        .forEach((f) => {
          traversed.parsedImports[f.source] =
            traversed.parsedImports[f.source] || [];
          traversed.parsedImports[f.source] = [
            ...new Set([...traversed.parsedImports[f.source], f.symbolName]),
          ];
        });

      return {
        ...ref,
        traversed,
      };
    });

    this._traversed = true;
  }

  get(from: ProtoRef, name: string) {
    if (!this._traversed) throw new Error("get() requires traversal");
    return lookupAny(this, from, name);
  }

  getImportFromRef(ref: ProtoRef, name: string) {
    if (!this._traversed)
      throw new Error("getImportFromRef() requires traversal");
    return lookupAnyFromImports(this, ref, name);
  }

  getTypeUrlMap(ref: ProtoRef) {
    return createTypeUrlTypeMap(this, ref);
  }

  // DOCUMENTATION

  getServices(myBase: string): Record<string, ProtoRef[]> {
    const refs = this.getProtos().filter((ref: ProtoRef) => {
      const proto = getNestedProto(ref.traversed);

      //// Anything except Msg Service OK...
      const allowedRpcServices = this.options.rpcClients.enabledServices.filter(
        (a) => a !== "Msg"
      );
      const found = allowedRpcServices.some((svc) => {
        return proto?.[svc] && proto[svc]?.type === "Service";
      });

      if (!found) {
        return;
      }
      ///

      return true;
    });

    const check = refs.filter((ref: ProtoRef) => {
      const [base] = ref.proto.package.split(".");
      return base === myBase;
    });

    if (!check.length) {
      return {};
    }

    const packages = refs.reduce((m, ref: ProtoRef) => {
      const [base] = ref.proto.package.split(".");
      if (base === myBase) {
        if (!m[ref.proto.package]) m[ref.proto.package] = [];
        m[ref.proto.package].push(ref);
      }
      return m;
    }, {});

    return packages;
  }
}
