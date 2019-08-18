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

it('should not login if email is not in the database', async () => {
  // language=GraphQL
  const query = `
    mutation M(
      $email: String!
      $password: String!
    ) {
      UserLoginWithEmail(input: {
        email: $email
        password: $password
      }) {
        clientMutationId
        token
        error
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    email: 'awesome@example.com',
    password: 'awesome',
  };

  const result = await graphql(schema, query, rootValue, context, variables);

  expect(result.data.UserLoginWithEmail.token).toBe(null);
  expect(result.data.UserLoginWithEmail.error).toBe('Invalid credentials');
});

it('should not login with wrong password', async () => {
  const user = await createRows.createUser();
  // language=GraphQL
  const query = `
    mutation M(
      $email: String!
      $password: String!
    ) {
      UserLoginWithEmail(input: {
        email: $email
        password: $password
      }) {
        clientMutationId
        token
        error
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    email: user.email,
    password: 'awesome',
  };

  const result = await graphql(schema, query, rootValue, context, variables);

  expect(result.data.UserLoginWithEmail.token).toBe(null);
  expect(result.data.UserLoginWithEmail.error).toBe('Invalid credentials');
});

it('should generate token when email and password is correct', async () => {
  const password = 'awesome';
  const user = await createRows.createUser({ password });
  // language=GraphQL
  const query = `
    mutation M(
      $email: String!
      $password: String!
    ) {
      UserLoginWithEmail(input: {
        email: $email
        password: $password
      }) {
        clientMutationId
        token
        error
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    email: user.email,
    password: 'awesome',
  };

  const result = await graphql(schema, query, rootValue, context, variables);

  expect(result.data.UserLoginWithEmail.token).not.toBe(null);
  expect(result.data.UserLoginWithEmail.error).toBe(null);
});
