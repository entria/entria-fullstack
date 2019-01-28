import { graphql } from 'graphql';

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

it.only('should not show email of other users', async () => {
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
