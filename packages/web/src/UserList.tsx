import * as React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { createQueryRendererModern } from './relay';
import { Flex } from 'rebass';
import { alignItems, flexDirection, justifyContent, space } from 'styled-system';
import styled from 'styled-components';

import { UserList_query } from './__generated__/UserList_query.graphql';

const Card = styled.a`
  border-radius: 2px;
  display: flex;
  max-width: 265px;
  width: 200px;
  background-color: #ffffff;
  box-shadow: 0 1px 5px 0 #dfdfdf, 0 1px 5px 0 #dfdfdf;
  flex-direction: column;
  cursor: pointer;
  margin: 10px;
  ${space}
  ${flexDirection}
  ${alignItems}
  ${justifyContent}
`;

type Props = {
  query:  UserList_query
}
const UserList = ({ query }: Props) => {
  const { users } = query;

  return (
    <div>
      {users!.edges.map((edge) => (
        <Card key={edge!.node.id}>
          <span>ID: {edge ? edge.node.id : ''}</span>
          <span>User: {edge ? edge.node.name : ''}</span>
          <span>Email: {edge ? edge.node.email : ''}</span>
        </Card>
      ))}
    </div>
  )
};

const UserListFragmentContainer = createFragmentContainer(UserList, {
  query: graphql`
    fragment UserList_query on Query {
      users(first: 10) @connection(key: "UserList_users", filters: []) {
        edges {
          node {
            id
            name
            email
          }
        }
      }
    }
  `
});

export default createQueryRendererModern(UserListFragmentContainer, UserList, {
  query: graphql`
    query UserListQuery {
      ...UserList_query
    }
  `,
});
