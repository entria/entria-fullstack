// @flow

import type { Middleware } from 'koa';

import * as loaders from '../api/loader';
import type { ApiContext } from '../TypeDefinition';

const dataloader = (): Middleware => async (ctx: ApiContext, next: () => void) => {
  const dataloaders = Object.keys(loaders).reduce(
    (prev, loader) => ({
      ...prev,
      [loader]: loaders[loader].getLoader(ctx),
    }),
    {},
  );

  ctx.dataloaders = {
    ...dataloaders,
  };

  await next();
};

export default dataloader;
