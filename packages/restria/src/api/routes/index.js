// @flow

import { description, version } from '../../../package.json';

import type { ApiContext } from '../../TypeDefinition';

const index = async (ctx: ApiContext) => {
  ctx.status = 200;
  ctx.body = `
    ${description}
    Package version: ${version}
    Node Environment: ${process.env.NODE_ENV || ''}
  `;
};

export default index;
