import { Any, AnySDKType } from "../../../google/protobuf/any";
import { Timestamp, TimestampSDKType } from "../../../google/protobuf/timestamp";
import * as _m0 from "protobufjs/minimal";
import { isSet, DeepPartial, toTimestamp, fromTimestamp } from "../../../helpers";
export const protobufPackage = "cosmos.authz.v1beta1";
/**
 * GenericAuthorization gives the grantee unrestricted permissions to execute
 * the provided method on behalf of the granter's account.
 */
export interface GenericAuthorization {
  /** Msg, identified by it's type URL, to grant unrestricted permissions to execute */
  msg: string;
}
/**
 * GenericAuthorization gives the grantee unrestricted permissions to execute
 * the provided method on behalf of the granter's account.
 */
export interface GenericAuthorizationSDKType {
  msg: string;
}
/**
 * Grant gives permissions to execute
 * the provide method with expiration time.
 */
export interface Grant {
  authorization?: Any;
  /**
   * time when the grant will expire and will be pruned. If null, then the grant
   * doesn't have a time expiration (other conditions  in `authorization`
   * may apply to invalidate the grant)
   */
  expiration?: Date;
}
/**
 * Grant gives permissions to execute
 * the provide method with expiration time.
 */
export interface GrantSDKType {
  authorization?: AnySDKType;
  expiration?: Date;
}
/**
 * GrantAuthorization extends a grant with both the addresses of the grantee and granter.
 * It is used in genesis.proto and query.proto
 */
export interface GrantAuthorization {
  granter: string;
  grantee: string;
  authorization?: Any;
  expiration?: Date;
}
/**
 * GrantAuthorization extends a grant with both the addresses of the grantee and granter.
 * It is used in genesis.proto and query.proto
 */
export interface GrantAuthorizationSDKType {
  granter: string;
  grantee: string;
  authorization?: AnySDKType;
  expiration?: Date;
}
/** GrantQueueItem contains the list of TypeURL of a sdk.Msg. */
export interface GrantQueueItem {
  /** msg_type_urls contains the list of TypeURL of a sdk.Msg. */
  msgTypeUrls: string[];
}
/** GrantQueueItem contains the list of TypeURL of a sdk.Msg. */
export interface GrantQueueItemSDKType {
  msg_type_urls: string[];
}
function createBaseGenericAuthorization(): GenericAuthorization {
  return {
    msg: ""
  };
}
export const GenericAuthorization = {
  encode(message: GenericAuthorization, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.msg !== "") {
      writer.uint32(10).string(message.msg);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): GenericAuthorization {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenericAuthorization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.msg = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GenericAuthorization {
    return {
      msg: isSet(object.msg) ? String(object.msg) : ""
    };
  },
  toJSON(message: GenericAuthorization): unknown {
    const obj: any = {};
    message.msg !== undefined && (obj.msg = message.msg);
    return obj;
  },
  fromPartial(object: DeepPartial<GenericAuthorization>): GenericAuthorization {
    const message = createBaseGenericAuthorization();
    message.msg = object.msg ?? "";
    return message;
  },
  fromSDK(object: GenericAuthorizationSDKType): GenericAuthorization {
    return {
      msg: object?.msg
    };
  },
  fromSDKJSON(object: any): GenericAuthorizationSDKType {
    return {
      msg: isSet(object.msg) ? String(object.msg) : ""
    };
  },
  toSDK(message: GenericAuthorization): GenericAuthorizationSDKType {
    const obj: any = {};
    obj.msg = message.msg;
    return obj;
  }
};
function createBaseGrant(): Grant {
  return {
    authorization: undefined,
    expiration: undefined
  };
}
export const Grant = {
  encode(message: Grant, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authorization !== undefined) {
      Any.encode(message.authorization, writer.uint32(10).fork()).ldelim();
    }
    if (message.expiration !== undefined) {
      Timestamp.encode(toTimestamp(message.expiration), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): Grant {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authorization = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.expiration = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Grant {
    return {
      authorization: isSet(object.authorization) ? Any.fromJSON(object.authorization) : undefined,
      expiration: isSet(object.expiration) ? new Date(object.expiration) : undefined
    };
  },
  toJSON(message: Grant): unknown {
    const obj: any = {};
    message.authorization !== undefined && (obj.authorization = message.authorization ? Any.toJSON(message.authorization) : undefined);
    message.expiration !== undefined && (obj.expiration = message.expiration.toISOString());
    return obj;
  },
  fromPartial(object: DeepPartial<Grant>): Grant {
    const message = createBaseGrant();
    message.authorization = object.authorization !== undefined && object.authorization !== null ? Any.fromPartial(object.authorization) : undefined;
    message.expiration = object.expiration ?? undefined;
    return message;
  },
  fromSDK(object: GrantSDKType): Grant {
    return {
      authorization: object.authorization ? Any.fromSDK(object.authorization) : undefined,
      expiration: object.expiration ?? undefined
    };
  },
  fromSDKJSON(object: any): GrantSDKType {
    return {
      authorization: isSet(object.authorization) ? Any.fromSDKJSON(object.authorization) : undefined,
      expiration: isSet(object.expiration) ? new Date(object.expiration) : undefined
    };
  },
  toSDK(message: Grant): GrantSDKType {
    const obj: any = {};
    message.authorization !== undefined && (obj.authorization = message.authorization ? Any.toSDK(message.authorization) : undefined);
    message.expiration !== undefined && (obj.expiration = message.expiration ?? undefined);
    return obj;
  }
};
function createBaseGrantAuthorization(): GrantAuthorization {
  return {
    granter: "",
    grantee: "",
    authorization: undefined,
    expiration: undefined
  };
}
export const GrantAuthorization = {
  encode(message: GrantAuthorization, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.granter !== "") {
      writer.uint32(10).string(message.granter);
    }
    if (message.grantee !== "") {
      writer.uint32(18).string(message.grantee);
    }
    if (message.authorization !== undefined) {
      Any.encode(message.authorization, writer.uint32(26).fork()).ldelim();
    }
    if (message.expiration !== undefined) {
      Timestamp.encode(toTimestamp(message.expiration), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): GrantAuthorization {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrantAuthorization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.granter = reader.string();
          break;
        case 2:
          message.grantee = reader.string();
          break;
        case 3:
          message.authorization = Any.decode(reader, reader.uint32());
          break;
        case 4:
          message.expiration = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GrantAuthorization {
    return {
      granter: isSet(object.granter) ? String(object.granter) : "",
      grantee: isSet(object.grantee) ? String(object.grantee) : "",
      authorization: isSet(object.authorization) ? Any.fromJSON(object.authorization) : undefined,
      expiration: isSet(object.expiration) ? new Date(object.expiration) : undefined
    };
  },
  toJSON(message: GrantAuthorization): unknown {
    const obj: any = {};
    message.granter !== undefined && (obj.granter = message.granter);
    message.grantee !== undefined && (obj.grantee = message.grantee);
    message.authorization !== undefined && (obj.authorization = message.authorization ? Any.toJSON(message.authorization) : undefined);
    message.expiration !== undefined && (obj.expiration = message.expiration.toISOString());
    return obj;
  },
  fromPartial(object: DeepPartial<GrantAuthorization>): GrantAuthorization {
    const message = createBaseGrantAuthorization();
    message.granter = object.granter ?? "";
    message.grantee = object.grantee ?? "";
    message.authorization = object.authorization !== undefined && object.authorization !== null ? Any.fromPartial(object.authorization) : undefined;
    message.expiration = object.expiration ?? undefined;
    return message;
  },
  fromSDK(object: GrantAuthorizationSDKType): GrantAuthorization {
    return {
      granter: object?.granter,
      grantee: object?.grantee,
      authorization: object.authorization ? Any.fromSDK(object.authorization) : undefined,
      expiration: object.expiration ?? undefined
    };
  },
  fromSDKJSON(object: any): GrantAuthorizationSDKType {
    return {
      granter: isSet(object.granter) ? String(object.granter) : "",
      grantee: isSet(object.grantee) ? String(object.grantee) : "",
      authorization: isSet(object.authorization) ? Any.fromSDKJSON(object.authorization) : undefined,
      expiration: isSet(object.expiration) ? new Date(object.expiration) : undefined
    };
  },
  toSDK(message: GrantAuthorization): GrantAuthorizationSDKType {
    const obj: any = {};
    obj.granter = message.granter;
    obj.grantee = message.grantee;
    message.authorization !== undefined && (obj.authorization = message.authorization ? Any.toSDK(message.authorization) : undefined);
    message.expiration !== undefined && (obj.expiration = message.expiration ?? undefined);
    return obj;
  }
};
function createBaseGrantQueueItem(): GrantQueueItem {
  return {
    msgTypeUrls: []
  };
}
export const GrantQueueItem = {
  encode(message: GrantQueueItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.msgTypeUrls) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): GrantQueueItem {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrantQueueItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.msgTypeUrls.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GrantQueueItem {
    return {
      msgTypeUrls: Array.isArray(object?.msgTypeUrls) ? object.msgTypeUrls.map((e: any) => String(e)) : []
    };
  },
  toJSON(message: GrantQueueItem): unknown {
    const obj: any = {};
    if (message.msgTypeUrls) {
      obj.msgTypeUrls = message.msgTypeUrls.map(e => e);
    } else {
      obj.msgTypeUrls = [];
    }
    return obj;
  },
  fromPartial(object: DeepPartial<GrantQueueItem>): GrantQueueItem {
    const message = createBaseGrantQueueItem();
    message.msgTypeUrls = object.msgTypeUrls?.map(e => e) || [];
    return message;
  },
  fromSDK(object: GrantQueueItemSDKType): GrantQueueItem {
    return {
      msgTypeUrls: Array.isArray(object?.msg_type_urls) ? object.msg_type_urls.map((e: any) => e) : []
    };
  },
  fromSDKJSON(object: any): GrantQueueItemSDKType {
    return {
      msg_type_urls: Array.isArray(object?.msg_type_urls) ? object.msg_type_urls.map((e: any) => String(e)) : []
    };
  },
  toSDK(message: GrantQueueItem): GrantQueueItemSDKType {
    const obj: any = {};
    if (message.msgTypeUrls) {
      obj.msg_type_urls = message.msgTypeUrls.map(e => e);
    } else {
      obj.msg_type_urls = [];
    }
    return obj;
  }
};