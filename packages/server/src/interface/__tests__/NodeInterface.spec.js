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

it('should load User', async () => {
  const user = await createRows.createUser();

  // language=GraphQL
  const query = `
    query Q($id: ID!) {
      node(id: $id) {
        id
        ... on User {
          name
        }
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    id: toGlobalId('User', user.id),
  };

  const result = await graphql(schema, query, rootValue, context, variables);
  expect(result.data.node.id).toBe(variables.id);
  expect(result.data.node.name).toBe(user.name);
});
