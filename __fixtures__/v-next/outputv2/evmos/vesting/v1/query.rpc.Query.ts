import { Coin, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import * as _m0 from "protobufjs/minimal";
import { grpc } from "@improbable-eng/grpc-web";
import { UnaryMethodDefinitionish } from "../../../grpc-web";
import { DeepPartial } from "../../../helpers";
import { BrowserHeaders } from "browser-headers";
import { QueryBalancesRequest, QueryBalancesRequestSDKType, QueryBalancesResponse, QueryBalancesResponseSDKType } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Retrieves the unvested, vested and locked tokens for a vesting account */
  balances(request: DeepPartial<QueryBalancesRequest>, metadata?: grpc.Metadata): Promise<QueryBalancesResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.balances = this.balances.bind(this);
  }
  balances(request: DeepPartial<QueryBalancesRequest>, metadata?: grpc.Metadata): Promise<QueryBalancesResponse> {
    return this.rpc.unary(QueryBalancesDesc, QueryBalancesRequest.fromPartial(request), metadata);
  }
}
export const QueryDesc = {
  serviceName: "evmos.vesting.v1.Query"
};
export const QueryBalancesDesc: UnaryMethodDefinitionish = {
  methodName: "Balances",
  service: QueryDesc,
  requestStream: false,
  reponseStream: false,
  requestType: ({
    serializeBinary() {
      return QueryBalancesRequest.encode(this).finish();
    }
  } as any),
  responseType: ({
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryBalancesResponse.decode(data),
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