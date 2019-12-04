/* global __DEV__ */
import { installRelayDevTools } from 'relay-devtools';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { relayTransactionLogger } from './relayTransactionLogger';

import cacheHandler from './cacheHandler';

if (__DEV__) {
  installRelayDevTools();
}

const network = Network.create(cacheHandler);

const source = new RecordSource();
const store = new Store(source);

// export const inspector = new RecordSourceInspector(source);

const env = new Environment({
  network,
  store,
  log: __DEV__ ? relayTransactionLogger : null,
});

export default env;
