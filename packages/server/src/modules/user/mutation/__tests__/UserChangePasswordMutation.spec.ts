import { graphql } from 'graphql';

import { schema } from '../../../../schema';
import {
  getContext,
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose,
  createRows,
} from '../../../../../test/helper';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should not change password of non authorized user', async () => {
  // language=GraphQL
  const query = `
    mutation M(
      $oldPassword: String!
      $password: String!
    ) {
      UserChangePassword(input: {
        oldPassword: $oldPassword
        password: $password
      }) {
        error
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    oldPassword: 'abc',
    password: 'abc',
  };

  const result = await graphql(schema, query, rootValue, context, variables);

  expect(result.errors).toBe(undefined);
  expect(result.data.UserChangePassword.error).toBe('User not authenticated');
});

it('should not change password if oldPassword is invalid', async () => {
  await createRows.createUser();
  // language=GraphQL
  const query = `
    mutation M(
      $oldPassword: String!
      $password: String!
    ) {
      UserChangePassword(input: {
        oldPassword: $oldPassword
        password: $password
      }) {
        error
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    oldPassword: 'abc',
    password: 'abc',
  };

  const result = await graphql(schema, query, rootValue, context, variables);

  expect(result.errors).toBe(undefined);
  expect(result.data.UserChangePassword.error).toBe('User not authenticated');
});

it('should change password if oldPassword is correct', async () => {
  const password = 'awesome';
  const user = await createRows.createUser({ password });

  // language=GraphQL
  const query = `
    mutation M(
      $oldPassword: String!
      $password: String!
    ) {
      UserChangePassword(input: {
        oldPassword: $oldPassword
        password: $password
      }) {
        error
      }
    }
  `;

  const rootValue = {};
  const context = getContext({ user });
  const variables = {
    oldPassword: password,
    password: 'abc',
  };

  const result = await graphql(schema, query, rootValue, context, variables);

  expect(result.data.UserChangePassword.error).toBe(null);
});
