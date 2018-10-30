// @flow
/* global __DEV__ */
import { installRelayDevTools } from 'relay-devtools';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import RelayNetworkLogger from 'relay-runtime/lib/RelayNetworkLogger';

import cacheHandler from './cacheHandler';

if (__DEV__) {
  installRelayDevTools();
}

const network = Network.create(__DEV__ ? RelayNetworkLogger.wrapFetch(cacheHandler) : cacheHandler);

const source = new RecordSource();
const store = new Store(source);

// export const inspector = new RecordSourceInspector(source);

const env = new Environment({
  network,
  store,
});

export default env;
