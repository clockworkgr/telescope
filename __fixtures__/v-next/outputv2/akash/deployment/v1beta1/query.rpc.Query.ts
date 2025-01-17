import { DeploymentFilters, DeploymentFiltersSDKType, DeploymentID, DeploymentIDSDKType, Deployment, DeploymentSDKType } from "./deployment";
import { PageRequest, PageRequestSDKType, PageResponse, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination";
import { GroupID, GroupIDSDKType, Group, GroupSDKType } from "./group";
import { Account, AccountSDKType } from "../../escrow/v1beta1/types";
import * as _m0 from "protobufjs/minimal";
import { grpc } from "@improbable-eng/grpc-web";
import { UnaryMethodDefinitionish } from "../../../grpc-web";
import { DeepPartial } from "../../../helpers";
import { BrowserHeaders } from "browser-headers";
import { QueryDeploymentsRequest, QueryDeploymentsRequestSDKType, QueryDeploymentsResponse, QueryDeploymentsResponseSDKType, QueryDeploymentRequest, QueryDeploymentRequestSDKType, QueryDeploymentResponse, QueryDeploymentResponseSDKType, QueryGroupRequest, QueryGroupRequestSDKType, QueryGroupResponse, QueryGroupResponseSDKType } from "./query";
/** Query defines the gRPC querier service */
export interface Query {
  /** Deployments queries deployments */
  deployments(request: DeepPartial<QueryDeploymentsRequest>, metadata?: grpc.Metadata): Promise<QueryDeploymentsResponse>;
  /** Deployment queries deployment details */
  deployment(request: DeepPartial<QueryDeploymentRequest>, metadata?: grpc.Metadata): Promise<QueryDeploymentResponse>;
  /** Group queries group details */
  group(request: DeepPartial<QueryGroupRequest>, metadata?: grpc.Metadata): Promise<QueryGroupResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.deployments = this.deployments.bind(this);
    this.deployment = this.deployment.bind(this);
    this.group = this.group.bind(this);
  }
  deployments(request: DeepPartial<QueryDeploymentsRequest>, metadata?: grpc.Metadata): Promise<QueryDeploymentsResponse> {
    return this.rpc.unary(QueryDeploymentsDesc, QueryDeploymentsRequest.fromPartial(request), metadata);
  }
  deployment(request: DeepPartial<QueryDeploymentRequest>, metadata?: grpc.Metadata): Promise<QueryDeploymentResponse> {
    return this.rpc.unary(QueryDeploymentDesc, QueryDeploymentRequest.fromPartial(request), metadata);
  }
  group(request: DeepPartial<QueryGroupRequest>, metadata?: grpc.Metadata): Promise<QueryGroupResponse> {
    return this.rpc.unary(QueryGroupDesc, QueryGroupRequest.fromPartial(request), metadata);
  }
}
export const QueryDesc = {
  serviceName: "akash.deployment.v1beta1.Query"
};
export const QueryDeploymentsDesc: UnaryMethodDefinitionish = {
  methodName: "Deployments",
  service: QueryDesc,
  requestStream: false,
  reponseStream: false,
  requestType: ({
    serializeBinary() {
      return QueryDeploymentsRequest.encode(this).finish();
    }
  } as any),
  responseType: ({
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryDeploymentsResponse.decode(data),
        toObject() {
          return this;
        }
      };
    }
  } as any)
};
export const QueryDeploymentDesc: UnaryMethodDefinitionish = {
  methodName: "Deployment",
  service: QueryDesc,
  requestStream: false,
  reponseStream: false,
  requestType: ({
    serializeBinary() {
      return QueryDeploymentRequest.encode(this).finish();
    }
  } as any),
  responseType: ({
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryDeploymentResponse.decode(data),
        toObject() {
          return this;
        }
      };
    }
  } as any)
};
export const QueryGroupDesc: UnaryMethodDefinitionish = {
  methodName: "Group",
  service: QueryDesc,
  requestStream: false,
  reponseStream: false,
  requestType: ({
    serializeBinary() {
      return QueryGroupRequest.encode(this).finish();
    }
  } as any),
  responseType: ({
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryGroupResponse.decode(data),
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