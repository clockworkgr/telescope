import * as t from '@babel/types';
import { ProtoType } from '@osmonauts/types';
import { BILLION } from '../../../utils';
import { ProtoParseContext } from '../../context';
import { getFieldNames } from '../../types';
import { ToAminoJSONMethod } from './index';

const notUndefinedSetValue = (sdkName: string, msgName: string, expr: t.Expression) => {
    return t.expressionStatement(
        t.logicalExpression(
            '&&',
            t.binaryExpression(
                '!==',
                t.memberExpression(
                    t.identifier('message'),
                    t.identifier(msgName)
                ),
                t.identifier('undefined')
            ),
            t.assignmentExpression(
                '=',
                t.memberExpression(
                    t.identifier('obj'),
                    t.identifier(sdkName)
                ),
                expr
            )
        )
    );
}

export const toAminoJSON = {

    scalar(args: ToAminoJSONMethod) {
        const { propName, origName } = getFieldNames(args.field);

        return t.expressionStatement(
            t.assignmentExpression(
                '=',
                t.memberExpression(
                    t.identifier('obj'),
                    t.identifier(origName)
                ),
                t.memberExpression(
                    t.identifier('message'),
                    t.identifier(propName)
                )
            )
        );
    },

    string(args: ToAminoJSONMethod) {
        return toAminoJSON.scalar(args);
    },
    double(args: ToAminoJSONMethod) {
        return toAminoJSON.scalar(args);
    },
    float(args: ToAminoJSONMethod) {
        return toAminoJSON.scalar(args);
    },
    bool(args: ToAminoJSONMethod) {
        return toAminoJSON.scalar(args);
    },

    number(args: ToAminoJSONMethod) {
        return toAminoJSON.scalar(args);
    },

    int32(args: ToAminoJSONMethod) {
        return toAminoJSON.scalar(args);
    },

    uint32(args: ToAminoJSONMethod) {
        return toAminoJSON.scalar(args);
    },

    sint32(args: ToAminoJSONMethod) {
        return toAminoJSON.scalar(args);
    },
    fixed32(args: ToAminoJSONMethod) {
        return toAminoJSON.scalar(args);
    },
    sfixed32(args: ToAminoJSONMethod) {
        return toAminoJSON.scalar(args);
    },
    long(args: ToAminoJSONMethod) {
        return toAminoJSON.scalar(args);
    },
    int64(args: ToAminoJSONMethod) {
        return toAminoJSON.scalar(args);
    },
    uint64(args: ToAminoJSONMethod) {
        return toAminoJSON.scalar(args);
    },
    sint64(args: ToAminoJSONMethod) {
        return toAminoJSON.scalar(args);
    },
    fixed64(args: ToAminoJSONMethod) {
        return toAminoJSON.scalar(args);
    },
    sfixed64(args: ToAminoJSONMethod) {
        return toAminoJSON.scalar(args);
    },

    type(args: ToAminoJSONMethod) {
        const { propName, origName } = getFieldNames(args.field);
        const name = args.context.getTypeName(args.field);

        return t.expressionStatement(
            t.assignmentExpression(
                '=',
                t.memberExpression(
                    t.identifier('obj'),
                    t.identifier(origName)
                ),
                t.conditionalExpression(
                    t.memberExpression(
                        t.identifier('message'),
                        t.identifier(propName)
                    ),
                    t.callExpression(
                        t.memberExpression(
                            t.identifier(name),
                            t.identifier('toAmino')
                        ),
                        [
                            t.memberExpression(
                                t.identifier('message'),
                                t.identifier(propName)
                            )
                        ]
                    ),
                    t.identifier('undefined')
                )
            )
        );
    },

    enum(args: ToAminoJSONMethod) {
        const { propName, origName } = getFieldNames(args.field);

        const enumFuncName = args.context.getToEnum(args.field);
        return notUndefinedSetValue(origName, propName, t.callExpression(
            t.identifier(enumFuncName),
            [
                t.memberExpression(
                    t.identifier('message'),
                    t.identifier(propName)
                )
            ]
        ));
    },

    bytes(args: ToAminoJSONMethod) {
        return toAminoJSON.scalar(args);
    },

    duration(args: ToAminoJSONMethod) {
        return toAminoJSON.type(args);
    },

    timestamp(args: ToAminoJSONMethod) {
        return toAminoJSON.type(args);
    },

    keyHash(args: ToAminoJSONMethod) {

        const { propName, origName } = getFieldNames(args.field);
        const keyType = args.field.keyType;
        const valueType = args.field.parsedType.name;

        let toAminoJSON = null;
        switch (valueType) {
            case 'string':
                toAminoJSON = t.identifier('v')
                break;
            case 'uint32':
            case 'int32':
                toAminoJSON = t.callExpression(
                    t.memberExpression(
                        t.identifier('Math'),
                        t.identifier('round')
                    ),
                    [
                        t.identifier('v')
                    ]
                )
                break;
            case 'int64':
            case 'uint64':
                toAminoJSON = t.callExpression(
                    t.memberExpression(
                        t.identifier('v'),
                        t.identifier('toString')
                    ),
                    []
                )
                break;
            default:
                toAminoJSON = t.callExpression(
                    t.memberExpression(
                        t.identifier(valueType),
                        t.identifier('toAmino')
                    ),
                    [
                        t.identifier('v')
                    ]
                )
        }


        return [
            t.expressionStatement(
                t.assignmentExpression(
                    '=',
                    t.memberExpression(
                        t.identifier('obj'),
                        t.identifier(origName)
                    ),
                    t.objectExpression([])
                )
            ),
            //
            t.ifStatement(
                t.memberExpression(
                    t.identifier('message'),
                    t.identifier(propName)
                ),
                t.blockStatement([
                    t.expressionStatement(
                        t.callExpression(
                            t.memberExpression(
                                t.callExpression(
                                    t.memberExpression(
                                        t.identifier('Object'),
                                        t.identifier('entries')
                                    ),
                                    [
                                        t.memberExpression(
                                            t.identifier('message'),
                                            t.identifier(propName)
                                        )
                                    ]
                                ),
                                t.identifier('forEach')
                            ),
                            [
                                t.arrowFunctionExpression(
                                    [
                                        t.arrayPattern(
                                            [
                                                t.identifier('k'),
                                                t.identifier('v')
                                            ]
                                        )
                                    ],
                                    t.blockStatement([
                                        t.expressionStatement(
                                            t.assignmentExpression(
                                                '=',
                                                t.memberExpression(
                                                    t.memberExpression(
                                                        t.identifier('obj'),
                                                        t.identifier(origName)
                                                    ),
                                                    t.identifier('k'),
                                                    true
                                                ),
                                                toAminoJSON
                                            )
                                        )
                                    ])
                                )
                            ]
                        )
                    )
                ])
            )
        ]
    },

    array(args: ToAminoJSONMethod, expr: t.Expression) {
        const { propName, origName } = getFieldNames(args.field);

        return t.ifStatement(
            t.memberExpression(
                t.identifier('message'),
                t.identifier(propName)
            ),
            t.blockStatement([
                t.expressionStatement(
                    t.assignmentExpression(
                        '=',
                        t.memberExpression(
                            t.identifier('obj'),
                            t.identifier(origName)
                        ),
                        t.callExpression(
                            t.memberExpression(
                                t.memberExpression(
                                    t.identifier('message'),
                                    t.identifier(propName)
                                ),
                                t.identifier('map')
                            ),
                            [
                                t.arrowFunctionExpression(
                                    [
                                        t.identifier('e')
                                    ],
                                    expr
                                )
                            ]
                        )
                    )
                )
            ]),
            t.blockStatement([
                t.expressionStatement(
                    t.assignmentExpression(
                        '=',
                        t.memberExpression(
                            t.identifier('obj'),
                            t.identifier(origName)
                        ),
                        t.arrayExpression([])
                    )
                )
            ])
        );
    }

};

export const arrayTypes = {
    scalar() {
        return t.identifier('e');
    },
    string() {
        return arrayTypes.scalar();
    },
    double() {
        return arrayTypes.scalar();
    },
    float() {
        return arrayTypes.scalar();
    },
    bool() {
        return arrayTypes.scalar();
    },
    number() {
        return arrayTypes.scalar();
    },
    int32() {
        return arrayTypes.number();
    },
    uint32() {
        return arrayTypes.number();
    },
    sint32() {
        return arrayTypes.number();
    },
    fixed32() {
        return arrayTypes.number();
    },
    sfixed32() {
        return arrayTypes.number();
    },
    long(args: ToAminoJSONMethod) {
        return arrayTypes.scalar();
    },
    int64(args: ToAminoJSONMethod) {
        return arrayTypes.long(args);
    },
    uint64(args: ToAminoJSONMethod) {
        return arrayTypes.long(args);
    },
    sint64(args: ToAminoJSONMethod) {
        return arrayTypes.long(args);
    },
    fixed64(args: ToAminoJSONMethod) {
        return arrayTypes.long(args);
    },
    sfixed64(args: ToAminoJSONMethod) {
        return arrayTypes.long(args);
    },
    bytes(args: ToAminoJSONMethod) {
        return arrayTypes.scalar();
    },
    enum(args: ToAminoJSONMethod) {
        const enumFuncName = args.context.getToEnum(args.field);
        return t.callExpression(
            t.identifier(enumFuncName),
            [
                t.identifier('e')
            ]
        );
    },
    type(args: ToAminoJSONMethod) {
        const name = args.context.getTypeName(args.field);
        return t.conditionalExpression(
            t.identifier('e'),
            t.callExpression(
                t.memberExpression(
                    t.identifier(name),
                    t.identifier('toAmino')
                ),
                [
                    t.identifier('e')
                ]
            ),
            t.identifier('undefined')
        );
    }
}


export const toAminoMessages = {
    duration(context: ProtoParseContext, name: string, proto: ProtoType) {
        return t.returnStatement(
            t.callExpression(
                t.memberExpression(
                    t.binaryExpression(
                        '+',
                        t.binaryExpression(
                            '*',
                            t.callExpression(
                                t.memberExpression(
                                    t.memberExpression(
                                        t.identifier('message'),
                                        t.identifier('seconds')
                                    ),
                                    t.identifier('toInt')
                                ),
                                []
                            ),
                            BILLION
                        ),
                        t.memberExpression(
                            t.identifier('message'),
                            t.identifier('nanos')
                        )
                    ),
                    t.identifier('toString')
                ),
                []
            )
        )
    }
}