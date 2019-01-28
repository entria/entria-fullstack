import * as React from 'react';
import { waitForElement } from 'react-native-testing-library';

import { render, queryMock } from '../../test/testUtils';
import { GRAPHQL_URL } from '../relay/fetchQuery';

import UserList from '../UserList';

queryMock.setup(GRAPHQL_URL);

const data = {
  users: {
    pageInfo: {
      hasNextPage: false,
      endCursor: 'bW9uZ286MA==',
    },
    edges: [
      {
        cursor: 'bW9uZ286MA==',
        node: {
          __typename: 'User',
          id: 'VXNlcjo1YmNmNDgxZTk0ZTg2MDA3ZWM5MTUxN2Q=',
          name: 'username',
        },
      },
    ],
  },
};

beforeEach(() => {
  queryMock.reset();
});

it('render UserList', async () => {
  try {

    queryMock.mockQuery({
      name: 'UserListQuery',
      data,
    });

    const r = render(<UserList/>);

    await waitForElement(() => r.getByText('username'));

    expect(r.getByText('username')).toBe(null);
  } catch (err) {
    console.log('err: ', err);
  }
});
