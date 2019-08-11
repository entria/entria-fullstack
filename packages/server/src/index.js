/* eslint implicit-arrow-linebreak: 0 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import app from './app';
import logger, { getConsoleTransport } from './core/logger';
import { connectDatabase } from './database';
import { graphqlPort } from './config';

import { schema } from './schema';

logger.add(getConsoleTransport('graphql-main'));

(async () => {
  try {
    await connectDatabase();
  } catch (error) {
    logger.error('Could not connect to database', { error });
    throw error;
  }

  const server = createServer(app.callback());

  server.listen(graphqlPort, () => {
    logger.info(`Server started on port :${graphqlPort}`);
  });

  SubscriptionServer.create(
    {
      onConnect: connectionParams =>
        logger.info('Client subscription connected!', connectionParams),
      onDisconnect: () => logger.info('Client subscription disconnected!'),
      execute,
      subscribe,
      schema,
    },
    {
      server,
      path: '/subscriptions',
    },
  );
})();

let currentApp = app;

if (module.hot) {
  module.hot.accept('./index.js', () => {
    app.removeListener('request', currentApp);
    app.on('request', app);
    currentApp = app;
  });
}
