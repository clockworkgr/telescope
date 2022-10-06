import { getTestProtoStore, expectCode, defaultTelescopeOptions, printCode } from '../../test-utils';
import { ProtoParseContext } from '../encoding';
import { documentWithTypeUrl, documentWithTypeUrlReadme } from './with-type-url';
import { documentRpcClients, documentRpcClientsReadme } from './rpc-clients';
import * as t from '@babel/types';
import { ServiceMutation } from '@osmonauts/types';

const store = getTestProtoStore();
store.traverseAll();

const mutations: ServiceMutation[] = [
    {
        message: 'message',
        messageImport: 'messageImport',
        methodName: 'methodName',
        package: 'tendermint.yolo.db',
        response: 'myResponse',
        responseImport: 'responseImport',
        comment: 'my comment'
    }
];

it('documentWithTypeUrl', () => {
    expectCode(documentWithTypeUrl(mutations))
});

it('documentWithTypeUrlReadme', () => {
    expect(documentWithTypeUrlReadme(mutations)).toMatchSnapshot();
});

it('documentRpcClients', () => {
    const myBase = 'osmosis';
    const ref = store.findProto('osmosis/gamm/v1beta1/tx.proto');
    const context = new ProtoParseContext(ref, store, defaultTelescopeOptions);
    const asts = documentRpcClients(context, myBase, store).reduce((m, obj) => {
        return [...m, ...obj.asts];
    }, [])
    expectCode(t.program(asts))
});

it('documentRpcClientsReadme', () => {
    const myBase = 'osmosis';
    const ref = store.findProto('osmosis/gamm/v1beta1/tx.proto');
    const context = new ProtoParseContext(ref, store, defaultTelescopeOptions);
    const text = documentRpcClientsReadme(context, myBase, store);
    console.log(text)
});