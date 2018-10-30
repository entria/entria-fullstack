// @flow
import { AsyncStorage } from 'react-native';

import type { Variables, UploadableMap } from 'react-relay';

import type { RequestNode } from 'relay-runtime';

import { handleData, getRequestBody, getHeaders, isMutation } from './helpers';
import fetchWithRetries from './fetchWithRetries';

export const GRAPHQL_URL = 'http://localhost:5000/graphql';

// Define a function that fetches the results of a request (query/mutation/etc)
// and returns its results as a Promise:
const fetchQuery = async (request: RequestNode, variables: Variables, uploadables: UploadableMap) => {
  try {
    const body = getRequestBody(request, variables, uploadables);
    const headers = {
      ...getHeaders(uploadables),
    };

    const response = await fetchWithRetries(GRAPHQL_URL, {
      method: 'POST',
      headers,
      body,
      fetchTimeout: 20000,
      retryDelays: [1000, 3000, 5000],
    });

    const data = await handleData(response);

    if (response.status === 401) {
      await AsyncStorage.clear();
      throw data.errors;
    }

    if (isMutation(request) && data.errors) {
      throw data;
    }

    if (!data.data) {
      await AsyncStorage.clear();
      throw data.errors;
    }

    return data;
  } catch (err) {
    // eslint-disable-next-line
    console.log('err: ', err);

    const timeoutRegexp = new RegExp(/Still no successful response after/);
    const serverUnavailableRegexp = new RegExp(/Failed to fetch/);
    if (timeoutRegexp.test(err.message) || serverUnavailableRegexp.test(err.message)) {

      throw new Error('Serviço indisponível. Tente novamente mais tarde.');
    }

    throw err;
  }
};

export default fetchQuery;
