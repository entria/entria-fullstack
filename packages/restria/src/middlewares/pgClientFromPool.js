// @flow

import type { Middleware } from 'koa';

import pools from '../dbs/postgres';

import type { ApiContext } from '../TypeDefinition';

const pgClientFromPool = (): Middleware => async (ctx: ApiContext, next: () => void) => {
  // there is no need to get an exclusive client from the pool
  ctx.conns = {
    ...pools,
  };

  await next();
};

export default pgClientFromPool;
