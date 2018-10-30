import { commitMutation, graphql } from 'react-relay';
import { Environment } from './relay';

import type { UserRegisterWithEmailInput, UserRegisterWithEmailMutationResponse } from './__generated__/UserRegisterWithEmailMutation.graphql';

const mutation = graphql`
  mutation UserRegisterWithEmailMutation($input: UserRegisterWithEmailInput!) {
    UserRegisterWithEmail(input: $input) {
      error
      token
    }
  }
`;

function commit(input: UserRegisterWithEmailInput, onCompleted: (response: UserRegisterWithEmailMutationResponse) => void, onError: (error: Error) => void) {
  return commitMutation(Environment, {
    mutation,
    variables: {
      input,
    },
    onCompleted,
    onError,
  });
}

export default { commit };
