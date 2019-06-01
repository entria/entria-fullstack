// @flow

import * as PersonLoader from '../../loader/pg/db/PersonLoader';

import type { ApiContext } from '../../../TypeDefinition';

const personGet = async (ctx: ApiContext) => {
  const { id } = ctx.params;
  if (!id) {
    ctx.throw(400, 'Missing id');
  }
  try {
    ctx.status = 200;
    ctx.body = await PersonLoader.load(ctx, id);
  } catch (err) {
    ctx.throw(404, err);
  }
};

const personsGet = async (ctx: ApiContext) => {
  try {
    ctx.status = 200;
    ctx.body = await PersonLoader.loadPersons(ctx, ctx.args);
  } catch (err) {
    ctx.throw(404, err);
  }
};

export { personGet, personsGet };
