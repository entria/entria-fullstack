import React from 'react';
import { hot } from 'react-hot-loader';

import UserList from './UserList';

function App() {
  return (
    <>
      <UserList/>
    </>
  );
}

export default hot(module)(App);
