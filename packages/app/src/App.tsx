import React from 'react';
import { StackNavigator } from 'react-navigation';

import UserCreate from './UserCreate';
import UserList from './UserList';
import UserDetail from './UserDetail';

const RelayApp = StackNavigator(
  {
    UserCreate: { screen: UserCreate },
    UserList: { screen: UserList },
    UserDetail: { screen: UserDetail },
  },
  {
    initialRouteName: 'UserCreate',
  },
);

export default () => <RelayApp />;
