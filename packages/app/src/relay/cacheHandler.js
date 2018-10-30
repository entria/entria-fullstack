// @flow
import RelayQueryResponseCache from 'relay-runtime/lib/RelayQueryResponseCache.js';

import type { Variables, UploadableMap, CacheConfig } from 'react-relay';

import type { RequestNode } from 'relay-runtime';

import fetchQuery from './fetchQuery';
import { isMutation, isQuery, forceFetch } from './helpers';

const oneMinute = 60 * 1000;
const relayResponseCache = new RelayQueryResponseCache({ size: 250, ttl: oneMinute });

const cacheHandler = async (
  request: RequestNode,
  variables: Variables,
  cacheConfig: CacheConfig,
  uploadables: UploadableMap,
) => {
  const queryID = request.text;

  if (isMutation(request)) {
    relayResponseCache.clear();
    return fetchQuery(request, variables, uploadables);
  }

  const fromCache = relayResponseCache.get(queryID, variables);
  if (isQuery(request) && fromCache !== null && !forceFetch(cacheConfig)) {
    return fromCache;
  }

  const fromServer = await fetchQuery(request, variables, uploadables);
  if (fromServer) {
    relayResponseCache.set(queryID, variables, fromServer);
  }

  return fromServer;
};

export default cacheHandler;
