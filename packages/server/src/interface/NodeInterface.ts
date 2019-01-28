
import { fromGlobalId, nodeDefinitions } from 'graphql-relay';

import { GraphQLObjectType } from 'graphql';

import * as loaders from '../loader';
import { GraphQLContext } from '../TypeDefinition';

type RegisteredTypes = {
  [key: string]: GraphQLObjectType;
};
const registeredTypes: RegisteredTypes = {};

export function registerType(type: GraphQLObjectType) {
  registeredTypes[type.name] = type;
  return type;
}

type Loader = {
  load: (context: GraphQLContext, id: string) => Promise<any>;
};
type Loaders = {
  [key: string]: Loader;
};
export const { nodeField, nodeInterface } = nodeDefinitions(
  (globalId, context: GraphQLContext) => {
    const { type, id } = fromGlobalId(globalId);
    // TODO - convert loaders to Loaders
    const loader = loaders[`${type}Loader`];

    return (loader && loader.load(context, id)) || null;
  },
  object => registeredTypes[object.constructor.name] || null,
);
