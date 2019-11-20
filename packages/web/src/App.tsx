import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RelayEnvironment from './relay/Environment';
import ErrorBoundary from './ErrorBoundary';
import { hot } from 'react-hot-loader';

const UserList = React.lazy(() => import('./UserList'));

const { Suspense } = React;

function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <ErrorBoundary>
        <Suspense fallback={'Loading...'}>
          <UserList />
        </Suspense>
      </ErrorBoundary>
    </RelayEnvironmentProvider>
  );
}

export default hot(module)(App);
