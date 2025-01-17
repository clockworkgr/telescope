import { Duration, DurationSDKType } from "../../../google/protobuf/duration";
import { DistrInfo, DistrInfoSDKType, Params, ParamsSDKType } from "./incentives";
import { Gauge, GaugeSDKType } from "../../incentives/gauge";
import * as _m0 from "protobufjs/minimal";
import { grpc } from "@improbable-eng/grpc-web";
import { UnaryMethodDefinitionish } from "../../../grpc-web";
import { DeepPartial } from "../../../helpers";
import { BrowserHeaders } from "browser-headers";
import { QueryGaugeIdsRequest, QueryGaugeIdsRequestSDKType, QueryGaugeIdsResponse, QueryGaugeIdsResponseSDKType, QueryDistrInfoRequest, QueryDistrInfoRequestSDKType, QueryDistrInfoResponse, QueryDistrInfoResponseSDKType, QueryParamsRequest, QueryParamsRequestSDKType, QueryParamsResponse, QueryParamsResponseSDKType, QueryLockableDurationsRequest, QueryLockableDurationsRequestSDKType, QueryLockableDurationsResponse, QueryLockableDurationsResponseSDKType, QueryIncentivizedPoolsRequest, QueryIncentivizedPoolsRequestSDKType, QueryIncentivizedPoolsResponse, QueryIncentivizedPoolsResponseSDKType, QueryExternalIncentiveGaugesRequest, QueryExternalIncentiveGaugesRequestSDKType, QueryExternalIncentiveGaugesResponse, QueryExternalIncentiveGaugesResponseSDKType } from "./query";
export interface Query {
  /** GaugeIds takes the pool id and returns the matching gauge ids and durations */
  gaugeIds(request: DeepPartial<QueryGaugeIdsRequest>, metadata?: grpc.Metadata): Promise<QueryGaugeIdsResponse>;
  /** DistrInfo returns the pool's matching gauge ids and weights. */
  distrInfo(request?: DeepPartial<QueryDistrInfoRequest>, metadata?: grpc.Metadata): Promise<QueryDistrInfoResponse>;
  /** Params returns pool incentives params. */
  params(request?: DeepPartial<QueryParamsRequest>, metadata?: grpc.Metadata): Promise<QueryParamsResponse>;
  /** LockableDurations returns lock durations for pools. */
  lockableDurations(request?: DeepPartial<QueryLockableDurationsRequest>, metadata?: grpc.Metadata): Promise<QueryLockableDurationsResponse>;
  /** IncentivizedPools returns currently incentivized pools */
  incentivizedPools(request?: DeepPartial<QueryIncentivizedPoolsRequest>, metadata?: grpc.Metadata): Promise<QueryIncentivizedPoolsResponse>;
  /** ExternalIncentiveGauges returns external incentive gauges. */
  externalIncentiveGauges(request?: DeepPartial<QueryExternalIncentiveGaugesRequest>, metadata?: grpc.Metadata): Promise<QueryExternalIncentiveGaugesResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.gaugeIds = this.gaugeIds.bind(this);
    this.distrInfo = this.distrInfo.bind(this);
    this.params = this.params.bind(this);
    this.lockableDurations = this.lockableDurations.bind(this);
    this.incentivizedPools = this.incentivizedPools.bind(this);
    this.externalIncentiveGauges = this.externalIncentiveGauges.bind(this);
  }
  gaugeIds(request: DeepPartial<QueryGaugeIdsRequest>, metadata?: grpc.Metadata): Promise<QueryGaugeIdsResponse> {
    return this.rpc.unary(QueryGaugeIdsDesc, QueryGaugeIdsRequest.fromPartial(request), metadata);
  }
  distrInfo(request: DeepPartial<QueryDistrInfoRequest> = {}, metadata?: grpc.Metadata): Promise<QueryDistrInfoResponse> {
    return this.rpc.unary(QueryDistrInfoDesc, QueryDistrInfoRequest.fromPartial(request), metadata);
  }
  params(request: DeepPartial<QueryParamsRequest> = {}, metadata?: grpc.Metadata): Promise<QueryParamsResponse> {
    return this.rpc.unary(QueryParamsDesc, QueryParamsRequest.fromPartial(request), metadata);
  }
  lockableDurations(request: DeepPartial<QueryLockableDurationsRequest> = {}, metadata?: grpc.Metadata): Promise<QueryLockableDurationsResponse> {
    return this.rpc.unary(QueryLockableDurationsDesc, QueryLockableDurationsRequest.fromPartial(request), metadata);
  }
  incentivizedPools(request: DeepPartial<QueryIncentivizedPoolsRequest> = {}, metadata?: grpc.Metadata): Promise<QueryIncentivizedPoolsResponse> {
    return this.rpc.unary(QueryIncentivizedPoolsDesc, QueryIncentivizedPoolsRequest.fromPartial(request), metadata);
  }
  externalIncentiveGauges(request: DeepPartial<QueryExternalIncentiveGaugesRequest> = {}, metadata?: grpc.Metadata): Promise<QueryExternalIncentiveGaugesResponse> {
    return this.rpc.unary(QueryExternalIncentiveGaugesDesc, QueryExternalIncentiveGaugesRequest.fromPartial(request), metadata);
  }
}
export const QueryDesc = {
  serviceName: "osmosis.poolincentives.v1beta1.Query"
};
export const QueryGaugeIdsDesc: UnaryMethodDefinitionish = {
  methodName: "GaugeIds",
  service: QueryDesc,
  requestStream: false,
  reponseStream: false,
  requestType: ({
    serializeBinary() {
      return QueryGaugeIdsRequest.encode(this).finish();
    }
  } as any),
  responseType: ({
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryGaugeIdsResponse.decode(data),
        toObject() {
          return this;
        }
      };
    }
  } as any)
};
export const QueryDistrInfoDesc: UnaryMethodDefinitionish = {
  methodName: "DistrInfo",
  service: QueryDesc,
  requestStream: false,
  reponseStream: false,
  requestType: ({
    serializeBinary() {
      return QueryDistrInfoRequest.encode(this).finish();
    }
  } as any),
  responseType: ({
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryDistrInfoResponse.decode(data),
        toObject() {
          return this;
        }
      };
    }
  } as any)
};
export const QueryParamsDesc: UnaryMethodDefinitionish = {
  methodName: "Params",
  service: QueryDesc,
  requestStream: false,
  reponseStream: false,
  requestType: ({
    serializeBinary() {
      return QueryParamsRequest.encode(this).finish();
    }
  } as any),
  responseType: ({
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryParamsResponse.decode(data),
        toObject() {
          return this;
        }
      };
    }
  } as any)
};
export const QueryLockableDurationsDesc: UnaryMethodDefinitionish = {
  methodName: "LockableDurations",
  service: QueryDesc,
  requestStream: false,
  reponseStream: false,
  requestType: ({
    serializeBinary() {
      return QueryLockableDurationsRequest.encode(this).finish();
    }
  } as any),
  responseType: ({
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryLockableDurationsResponse.decode(data),
        toObject() {
          return this;
        }
      };
    }
  } as any)
};
export const QueryIncentivizedPoolsDesc: UnaryMethodDefinitionish = {
  methodName: "IncentivizedPools",
  service: QueryDesc,
  requestStream: false,
  reponseStream: false,
  requestType: ({
    serializeBinary() {
      return QueryIncentivizedPoolsRequest.encode(this).finish();
    }
  } as any),
  responseType: ({
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryIncentivizedPoolsResponse.decode(data),
        toObject() {
          return this;
        }
      };
    }
  } as any)
};
export const QueryExternalIncentiveGaugesDesc: UnaryMethodDefinitionish = {
  methodName: "ExternalIncentiveGauges",
  service: QueryDesc,
  requestStream: false,
  reponseStream: false,
  requestType: ({
    serializeBinary() {
      return QueryExternalIncentiveGaugesRequest.encode(this).finish();
    }
  } as any),
  responseType: ({
    deserializeBinary(data: Uint8Array) {
      return {
        ...QueryExternalIncentiveGaugesResponse.decode(data),
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