
import 'isomorphic-fetch';

import Koa, { Request } from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
import graphqlHttp from 'koa-graphql';
import graphqlBatchHttpWrapper from 'koa-graphql-batch';
import logger from 'koa-logger';
import Router from 'koa-router';
// import { graphiqlKoa } from 'apollo-server-koa';
import koaPlayground from 'graphql-playground-middleware-koa';
import { GraphQLError } from 'graphql';

import { schema } from './schema';
import { getUser } from './auth';
import * as loaders from './loader';

const app = new Koa();
const router = new Router();

app.keys = [process.env.JWT_KEY];

const graphqlSettingsPerReq = async (req: Request) => {
  const { user } = await getUser(req.header.authorization);

  const dataloaders = Object.keys(loaders).reduce(
    (acc, loaderKey) => ({
      ...acc,
      [loaderKey]: loaders[loaderKey].getLoader(),
    }),
    {},
  );

  return {
    graphiql: process.env.NODE_ENV !== 'production',
    schema,
    context: {
      user,
      req,
      dataloaders,
    },
    // extensions: ({ document, variables, operationName, result }) => {
    // console.log(print(document));
    // console.log(variables);
    // console.log(result);
    // },
    formatError: (error: GraphQLError) => {
      console.log(error.message);
      console.log(error.locations);
      console.log(error.stack);

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
      };
    },
  };
};

const graphqlServer = graphqlHttp(graphqlSettingsPerReq);

// graphql batch query route
router.all('/graphql/batch', bodyParser(), graphqlBatchHttpWrapper(graphqlServer));
router.all('/graphql', graphqlServer);
router.all(
  '/graphiql',
  koaPlayground({
    endpoint: '/graphql',
    subscriptionEndpoint: `ws://localhost:${process.env.GRAPHQL_PORT}/subscriptions`,
  }),
);

app.use(logger());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

export default app;
