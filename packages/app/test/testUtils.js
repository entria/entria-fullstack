import * as React from 'react';
import { render } from 'react-native-testing-library';
import { QueryMock } from 'graphql-query-test-mock';

import { ThemeProvider } from 'styled-components';
import { GRAPHQL_URL } from '../src/relay/fetchQuery';

export const withTheme = node => <ThemeProvider theme={{ }}>{node}</ThemeProvider>;

const customRender = (node, ...options) => {
  return render(withTheme(node), ...options);
};

export * from 'react-native-testing-library';

// override render method
export { customRender as render };

const queryMock = new QueryMock();
queryMock.setup(GRAPHQL_URL);
