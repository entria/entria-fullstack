import * as React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { createQueryRendererModern } from './relay';
import { UserList_query } from './__generated__/UserList_query.graphql';
import { Flex } from 'rebass';
import { alignItems, flexDirection, justifyContent, space } from 'styled-system';
import styled from 'styled-components';

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
class UserList extends React.Component<Props> {
  render() {
    const { query } = this.props;
    const { users } = query;

    return (
      <Flex flexDirection='column'>
        {users.edges.map(({node}) => (
          <Card key={node.id}>
            <span>User: {node.name}</span>
            <span>Email: {node.name}</span>
          </Card>
        ))}
      </Flex>
    )
  }
}

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
