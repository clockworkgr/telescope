import { Timestamp, TimestampSDKType } from "../../google/protobuf/timestamp";
import { Header, HeaderSDKType } from "../types/types";
import { ProofOps, ProofOpsSDKType } from "../crypto/proof";
import { EvidenceParams, EvidenceParamsSDKType, ValidatorParams, ValidatorParamsSDKType, VersionParams, VersionParamsSDKType } from "../types/params";
import { PublicKey, PublicKeySDKType } from "../crypto/keys";
import { Rpc } from "../../helpers";
import * as _m0 from "protobufjs/minimal";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { RequestEcho, RequestEchoSDKType, ResponseEcho, ResponseEchoSDKType, RequestFlush, RequestFlushSDKType, ResponseFlush, ResponseFlushSDKType, RequestInfo, RequestInfoSDKType, ResponseInfo, ResponseInfoSDKType, RequestSetOption, RequestSetOptionSDKType, ResponseSetOption, ResponseSetOptionSDKType, RequestDeliverTx, RequestDeliverTxSDKType, ResponseDeliverTx, ResponseDeliverTxSDKType, RequestCheckTx, RequestCheckTxSDKType, ResponseCheckTx, ResponseCheckTxSDKType, RequestQuery, RequestQuerySDKType, ResponseQuery, ResponseQuerySDKType, RequestCommit, RequestCommitSDKType, ResponseCommit, ResponseCommitSDKType, RequestInitChain, RequestInitChainSDKType, ResponseInitChain, ResponseInitChainSDKType, RequestBeginBlock, RequestBeginBlockSDKType, ResponseBeginBlock, ResponseBeginBlockSDKType, RequestEndBlock, RequestEndBlockSDKType, ResponseEndBlock, ResponseEndBlockSDKType, RequestListSnapshots, RequestListSnapshotsSDKType, ResponseListSnapshots, ResponseListSnapshotsSDKType, RequestOfferSnapshot, RequestOfferSnapshotSDKType, ResponseOfferSnapshot, ResponseOfferSnapshotSDKType, RequestLoadSnapshotChunk, RequestLoadSnapshotChunkSDKType, ResponseLoadSnapshotChunk, ResponseLoadSnapshotChunkSDKType, RequestApplySnapshotChunk, RequestApplySnapshotChunkSDKType, ResponseApplySnapshotChunk, ResponseApplySnapshotChunkSDKType } from "./types";
export interface ABCIApplication {
  echo(request: RequestEcho): Promise<ResponseEcho>;
  flush(request?: RequestFlush): Promise<ResponseFlush>;
  info(request: RequestInfo): Promise<ResponseInfo>;
  setOption(request: RequestSetOption): Promise<ResponseSetOption>;
  deliverTx(request: RequestDeliverTx): Promise<ResponseDeliverTx>;
  checkTx(request: RequestCheckTx): Promise<ResponseCheckTx>;
  query(request: RequestQuery): Promise<ResponseQuery>;
  commit(request?: RequestCommit): Promise<ResponseCommit>;
  initChain(request: RequestInitChain): Promise<ResponseInitChain>;
  beginBlock(request: RequestBeginBlock): Promise<ResponseBeginBlock>;
  endBlock(request: RequestEndBlock): Promise<ResponseEndBlock>;
  listSnapshots(request?: RequestListSnapshots): Promise<ResponseListSnapshots>;
  offerSnapshot(request: RequestOfferSnapshot): Promise<ResponseOfferSnapshot>;
  loadSnapshotChunk(request: RequestLoadSnapshotChunk): Promise<ResponseLoadSnapshotChunk>;
  applySnapshotChunk(request: RequestApplySnapshotChunk): Promise<ResponseApplySnapshotChunk>;
}
export class ABCIApplicationClientImpl implements ABCIApplication {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.echo = this.echo.bind(this);
    this.flush = this.flush.bind(this);
    this.info = this.info.bind(this);
    this.setOption = this.setOption.bind(this);
    this.deliverTx = this.deliverTx.bind(this);
    this.checkTx = this.checkTx.bind(this);
    this.query = this.query.bind(this);
    this.commit = this.commit.bind(this);
    this.initChain = this.initChain.bind(this);
    this.beginBlock = this.beginBlock.bind(this);
    this.endBlock = this.endBlock.bind(this);
    this.listSnapshots = this.listSnapshots.bind(this);
    this.offerSnapshot = this.offerSnapshot.bind(this);
    this.loadSnapshotChunk = this.loadSnapshotChunk.bind(this);
    this.applySnapshotChunk = this.applySnapshotChunk.bind(this);
  }
  echo(request: RequestEcho): Promise<ResponseEcho> {
    const data = RequestEcho.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Echo", data);
    return promise.then(data => ResponseEcho.decode(new _m0.Reader(data)));
  }
  flush(request: RequestFlush = {}): Promise<ResponseFlush> {
    const data = RequestFlush.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Flush", data);
    return promise.then(data => ResponseFlush.decode(new _m0.Reader(data)));
  }
  info(request: RequestInfo): Promise<ResponseInfo> {
    const data = RequestInfo.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Info", data);
    return promise.then(data => ResponseInfo.decode(new _m0.Reader(data)));
  }
  setOption(request: RequestSetOption): Promise<ResponseSetOption> {
    const data = RequestSetOption.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "SetOption", data);
    return promise.then(data => ResponseSetOption.decode(new _m0.Reader(data)));
  }
  deliverTx(request: RequestDeliverTx): Promise<ResponseDeliverTx> {
    const data = RequestDeliverTx.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "DeliverTx", data);
    return promise.then(data => ResponseDeliverTx.decode(new _m0.Reader(data)));
  }
  checkTx(request: RequestCheckTx): Promise<ResponseCheckTx> {
    const data = RequestCheckTx.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "CheckTx", data);
    return promise.then(data => ResponseCheckTx.decode(new _m0.Reader(data)));
  }
  query(request: RequestQuery): Promise<ResponseQuery> {
    const data = RequestQuery.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Query", data);
    return promise.then(data => ResponseQuery.decode(new _m0.Reader(data)));
  }
  commit(request: RequestCommit = {}): Promise<ResponseCommit> {
    const data = RequestCommit.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Commit", data);
    return promise.then(data => ResponseCommit.decode(new _m0.Reader(data)));
  }
  initChain(request: RequestInitChain): Promise<ResponseInitChain> {
    const data = RequestInitChain.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "InitChain", data);
    return promise.then(data => ResponseInitChain.decode(new _m0.Reader(data)));
  }
  beginBlock(request: RequestBeginBlock): Promise<ResponseBeginBlock> {
    const data = RequestBeginBlock.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "BeginBlock", data);
    return promise.then(data => ResponseBeginBlock.decode(new _m0.Reader(data)));
  }
  endBlock(request: RequestEndBlock): Promise<ResponseEndBlock> {
    const data = RequestEndBlock.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "EndBlock", data);
    return promise.then(data => ResponseEndBlock.decode(new _m0.Reader(data)));
  }
  listSnapshots(request: RequestListSnapshots = {}): Promise<ResponseListSnapshots> {
    const data = RequestListSnapshots.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "ListSnapshots", data);
    return promise.then(data => ResponseListSnapshots.decode(new _m0.Reader(data)));
  }
  offerSnapshot(request: RequestOfferSnapshot): Promise<ResponseOfferSnapshot> {
    const data = RequestOfferSnapshot.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "OfferSnapshot", data);
    return promise.then(data => ResponseOfferSnapshot.decode(new _m0.Reader(data)));
  }
  loadSnapshotChunk(request: RequestLoadSnapshotChunk): Promise<ResponseLoadSnapshotChunk> {
    const data = RequestLoadSnapshotChunk.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "LoadSnapshotChunk", data);
    return promise.then(data => ResponseLoadSnapshotChunk.decode(new _m0.Reader(data)));
  }
  applySnapshotChunk(request: RequestApplySnapshotChunk): Promise<ResponseApplySnapshotChunk> {
    const data = RequestApplySnapshotChunk.encode(request).finish();
    const promise = this.rpc.request("tendermint.abci.ABCIApplication", "ApplySnapshotChunk", data);
    return promise.then(data => ResponseApplySnapshotChunk.decode(new _m0.Reader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new ABCIApplicationClientImpl(rpc);
  return {
    echo(request: RequestEcho): Promise<ResponseEcho> {
      return queryService.echo(request);
    },
    flush(request?: RequestFlush): Promise<ResponseFlush> {
      return queryService.flush(request);
    },
    info(request: RequestInfo): Promise<ResponseInfo> {
      return queryService.info(request);
    },
    setOption(request: RequestSetOption): Promise<ResponseSetOption> {
      return queryService.setOption(request);
    },
    deliverTx(request: RequestDeliverTx): Promise<ResponseDeliverTx> {
      return queryService.deliverTx(request);
    },
    checkTx(request: RequestCheckTx): Promise<ResponseCheckTx> {
      return queryService.checkTx(request);
    },
    query(request: RequestQuery): Promise<ResponseQuery> {
      return queryService.query(request);
    },
    commit(request?: RequestCommit): Promise<ResponseCommit> {
      return queryService.commit(request);
    },
    initChain(request: RequestInitChain): Promise<ResponseInitChain> {
      return queryService.initChain(request);
    },
    beginBlock(request: RequestBeginBlock): Promise<ResponseBeginBlock> {
      return queryService.beginBlock(request);
    },
    endBlock(request: RequestEndBlock): Promise<ResponseEndBlock> {
      return queryService.endBlock(request);
    },
    listSnapshots(request?: RequestListSnapshots): Promise<ResponseListSnapshots> {
      return queryService.listSnapshots(request);
    },
    offerSnapshot(request: RequestOfferSnapshot): Promise<ResponseOfferSnapshot> {
      return queryService.offerSnapshot(request);
    },
    loadSnapshotChunk(request: RequestLoadSnapshotChunk): Promise<ResponseLoadSnapshotChunk> {
      return queryService.loadSnapshotChunk(request);
    },
    applySnapshotChunk(request: RequestApplySnapshotChunk): Promise<ResponseApplySnapshotChunk> {
      return queryService.applySnapshotChunk(request);
    }
  };
};