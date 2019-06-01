// @flow

// import prettyFormat from 'pretty-format';

import type { Middleware } from 'koa';
import type { ApiContext } from '../TypeDefinition';

// import { sendtoSlack } from '../common/slack';

const errorHandler = (): Middleware => async (ctx: ApiContext, next: () => void) => {
  try {
    await next();
  } catch (error) {
    console.log('request:', ctx.req.body);
    console.log('error: ', new Date().toISOString(), error);

    // sendtoSlack({
    //   channel: 'restria',
    //   attachments: [{ text: error.message }, { text: prettyFormat(error.stack), color: '#ff0000' }],
    // });
    ctx.throw(404, `Not Found: ${error}`);
  }
};

export default errorHandler;
