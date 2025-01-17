import { Attribute, AttributeSDKType } from "../../base/v1beta1/attribute";
import { UnaryMethodDefinitionish } from "../../../grpc-web";
import * as _m0 from "protobufjs/minimal";
import { DeepPartial } from "../../../helpers";
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import { MsgSignProviderAttributes, MsgSignProviderAttributesSDKType, MsgSignProviderAttributesResponse, MsgSignProviderAttributesResponseSDKType, MsgDeleteProviderAttributes, MsgDeleteProviderAttributesSDKType, MsgDeleteProviderAttributesResponse, MsgDeleteProviderAttributesResponseSDKType } from "./audit";
/** Msg defines the provider Msg service */
export interface Msg {
  /** SignProviderAttributes defines a method that signs provider attributes */
  signProviderAttributes(request: DeepPartial<MsgSignProviderAttributes>, metadata?: grpc.Metadata): Promise<MsgSignProviderAttributesResponse>;
  /** DeleteProviderAttributes defines a method that deletes provider attributes */
  deleteProviderAttributes(request: DeepPartial<MsgDeleteProviderAttributes>, metadata?: grpc.Metadata): Promise<MsgDeleteProviderAttributesResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.signProviderAttributes = this.signProviderAttributes.bind(this);
    this.deleteProviderAttributes = this.deleteProviderAttributes.bind(this);
  }
  signProviderAttributes(request: DeepPartial<MsgSignProviderAttributes>, metadata?: grpc.Metadata): Promise<MsgSignProviderAttributesResponse> {
    return this.rpc.unary(MsgSignProviderAttributesDesc, MsgSignProviderAttributes.fromPartial(request), metadata);
  }
  deleteProviderAttributes(request: DeepPartial<MsgDeleteProviderAttributes>, metadata?: grpc.Metadata): Promise<MsgDeleteProviderAttributesResponse> {
    return this.rpc.unary(MsgDeleteProviderAttributesDesc, MsgDeleteProviderAttributes.fromPartial(request), metadata);
  }
}
export const MsgDesc = {
  serviceName: "akash.audit.v1beta1.Msg"
};
export const MsgSignProviderAttributesDesc: UnaryMethodDefinitionish = {
  methodName: "SignProviderAttributes",
  service: MsgDesc,
  requestStream: false,
  reponseStream: false,
  requestType: ({
    serializeBinary() {
      return MsgSignProviderAttributes.encode(this).finish();
    }
  } as any),
  responseType: ({
    deserializeBinary(data: Uint8Array) {
      return {
        ...MsgSignProviderAttributesResponse.decode(data),
        toObject() {
          return this;
        }
      };
    }
  } as any)
};
export const MsgDeleteProviderAttributesDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteProviderAttributes",
  service: MsgDesc,
  requestStream: false,
  reponseStream: false,
  requestType: ({
    serializeBinary() {
      return MsgDeleteProviderAttributes.encode(this).finish();
    }
  } as any),
  responseType: ({
    deserializeBinary(data: Uint8Array) {
      return {
        ...MsgDeleteProviderAttributesResponse.decode(data),
        toObject() {
          return this;
        }
      };
    }
  } as any)
};
export interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(methodDesc: T, request: any, metadata: grpc.Metadata | undefined);
}
export class GrpcWebImpl {
  host: string;
  options: {
    transport: grpc.TransportFactory;
    debug: boolean;
    metadata: grpc.Metadata;
  };
  constructor(host: string, options: {
    transport: grpc.TransportFactory;
    debug: boolean;
    metadata: grpc.Metadata;
  }) {
    this.host = host;
    this.options = options;
  }
  unary(methodDesc: T, _request: any, metadata: grpc.metadata | undefined) {
    const request = {
      ..._request,
      ...methodDesc.requestType
    };
    const maybeCombinedMetadata = metadata && this.options.metadata ? new BrowserHeaders({
      ...this.metadata?.options.headersMap,
      ...metadata?.headersMap
    }) : metadata || this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message);
          } else {
            const err = (new Error(response.statusMessage) as any);
            err.code = response.status;
            err.code = response.metadata;
            err.response = response.trailers;
            reject(err);
          }
        }
      });
    });
  }
}