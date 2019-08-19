import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';

import { schema } from '../../schema';
import {
  getContext,
  connectMongoose,
  clearDbAndRestartCounters,
  disconnectMongoose,
  createRows,
} from '../../../test/helper';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should not show email of other users', async () => {
  const userA = await createRows.createUser();
  const userB = await createRows.createUser();

  // language=GraphQL
  const query = `
    query Q {
      users(first: 2) {
        edges {
          node {
            _id
            name
            email
            active
          }
        }
      }
    }
  `;

  const rootValue = {};
  const context = getContext({ user: userA });

  const result = await graphql(schema, query, rootValue, context);
  const { edges } = result.data.users;

  expect(edges[0].node.name).toBe(userB.name);
  expect(edges[0].node.email).toBe(null);

  expect(edges[1].node.name).toBe(userA.name);
  expect(edges[1].node.email).toBe(userA.email);
});


it('should return the current user when user is logged in', async () => {
  const user = await createRows.createUser();

  const query = `
    query Q {
      me {
        id
        name
        email
      }
    }
  `;

  const rootValue = {};
  const context = getContext({ user });

  const result = await graphql(schema, query, rootValue, context);
  const { data } = result;

  expect(data.me.name).toBe(user.name);
  expect(data.me.email).toBe(user.email);
});

it('should return a user by global id', async () => {
  const user = await createRows.createUser();

  const query = `
    query Q($id: ID!) {
      user(id: $id) {
        id
        name
        email
        active
      }
    }
  `;

  const rootValue = {};
  const context = getContext({ user });
  const variables = {
    id: toGlobalId('User', user.id),
  }

  const result = await graphql(schema, query, rootValue, context, variables);
  const { data } = result;

  expect(data.user.name).toBe(user.name);
  expect(data.user.email).toBe(user.email);
  expect(data.user.active).toBe(user.active);
});


it('should return a user with id and email null', async () => {
  const user = await createRows.createUser();

  const query = `
    query Q($id: ID!) {
      user(id: $id) {
        id
        name
        email
        active
      }
    }
  `;

  const rootValue = {};
  // can only see email and active status if user is in context
  const context = getContext();
  const variables = {
    id: toGlobalId('User', user.id),
  }

  console.log('context');
  console.log(context);
  const result = await graphql(schema, query, rootValue, context, variables);
  const { data } = result;

  expect(data.user.name).toBe(user.name);
  expect(data.user.email).toBe(null);
  expect(data.user.active).toBe(null);
});
