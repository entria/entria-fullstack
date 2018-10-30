// external imports
import { GraphQLObjectType } from 'graphql';

import UserSubscriptions from '../modules/user/subscription';

export default new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    ...UserSubscriptions,
  },
});
