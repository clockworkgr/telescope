import { Coin, CoinSDKType } from "../../base/v1beta1/coin";
import * as _m0 from "protobufjs/minimal";
import { DeepPartial } from "../../../helpers";
export const protobufPackage = "cosmos.bank.v1beta1";
/**
 * SendAuthorization allows the grantee to spend up to spend_limit coins from
 * the granter's account.
 * 
 * Since: cosmos-sdk 0.43
 */
export interface SendAuthorization {
  spendLimit: Coin[];
}
/**
 * SendAuthorization allows the grantee to spend up to spend_limit coins from
 * the granter's account.
 * 
 * Since: cosmos-sdk 0.43
 */
export interface SendAuthorizationSDKType {
  spend_limit: CoinSDKType[];
}
function createBaseSendAuthorization(): SendAuthorization {
  return {
    spendLimit: []
  };
}
export const SendAuthorization = {
  encode(message: SendAuthorization, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.spendLimit) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): SendAuthorization {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendAuthorization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.spendLimit.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SendAuthorization {
    return {
      spendLimit: Array.isArray(object?.spendLimit) ? object.spendLimit.map((e: any) => Coin.fromJSON(e)) : []
    };
  },
  toJSON(message: SendAuthorization): unknown {
    const obj: any = {};
    if (message.spendLimit) {
      obj.spendLimit = message.spendLimit.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.spendLimit = [];
    }
    return obj;
  },
  fromPartial(object: DeepPartial<SendAuthorization>): SendAuthorization {
    const message = createBaseSendAuthorization();
    message.spendLimit = object.spendLimit?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromSDK(object: SendAuthorizationSDKType): SendAuthorization {
    return {
      spendLimit: Array.isArray(object?.spend_limit) ? object.spend_limit.map((e: any) => Coin.fromSDK(e)) : []
    };
  },
  fromSDKJSON(object: any): SendAuthorizationSDKType {
    return {
      spend_limit: Array.isArray(object?.spend_limit) ? object.spend_limit.map((e: any) => Coin.fromSDKJSON(e)) : []
    };
  },
  toSDK(message: SendAuthorization): SendAuthorizationSDKType {
    const obj: any = {};
    if (message.spendLimit) {
      obj.spend_limit = message.spendLimit.map(e => e ? Coin.toSDK(e) : undefined);
    } else {
      obj.spend_limit = [];
    }
    return obj;
  }
};