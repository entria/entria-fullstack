import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MockPayloadGenerator } from 'relay-test-utils';
import UserListDefault from '../UserList';
import Environment from '../relay/Environment';

afterEach(cleanup);

describe('<UserList />', () => {
  it('should reject query', () => {
    const { getByText } = render(<UserListDefault />);
    Environment.mock.rejectMostRecentOperation(new Error('A very bad error'));
    expect(getByText('Error: A very bad error')).toBeInTheDocument();
  });

  it('should reject query with function and render error with name of the operation', () => {
    const { getByText } = render(<UserListDefault />);
    Environment.mock.rejectMostRecentOperation((operation) =>
      new Error(`A error occurred on operation: ${operation.fragment.node.name}`)
    );

    expect(getByText('Error: A error occurred on operation: UserListQuery')).toBeInTheDocument();
  });

  it('should resolve query but no data', async () => {
    const { getByText } = render(<UserListDefault />);
    expect(getByText('loading')).toBeInTheDocument();

    Environment.mock.resolveMostRecentOperation((operation) =>
    MockPayloadGenerator.generate(operation),
    );

    expect(getByText(/ID: /)).toBeTruthy();
    expect(getByText(/User: /)).toBeTruthy();
    expect(getByText(/Email: /)).toBeTruthy();
  });

  it('should render success UserList', async () => {
    const { getByText } = render(<UserListDefault />);

    Environment.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, {
        PageInfo() {
          return {
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: "YXJyYXljb25uZWN0aW9uOjA=",
            endCursor: "YXJyYXljb25uZWN0aW9uOjE="
          }
        },
        UserEdge() {
          return [
            {
              cursor: "YXJyYXljb25uZWN0aW9uOjA=",
              node: {
                email: "example.example@gmail.com",
                id: "Q2xpZW50OjE=",
                name: "Adhis Yudha",
              }
            },
            {
              cursor: "YXJyYXljb25uZWN0aW9uOjE=",
              node: {
                email: "test.test@gmail.com",
                id: "Q2xpZW50OjI=",
                name: "Bangkit Ilham",
              }
            }
          ]
        }
      })
    );

    expect(getByText('ID: Q2xpZW50OjE=')).toBeTruthy();
    expect(getByText('User: Adhis Yudha')).toBeTruthy();
    expect(getByText('Email: example.example@gmail.com')).toBeTruthy();

    expect(getByText('ID: Q2xpZW50OjI=')).toBeTruthy();
    expect(getByText('Email: test.test@gmail.com')).toBeTruthy();
    expect(getByText('User: Bangkit Ilham')).toBeTruthy();
  });
});