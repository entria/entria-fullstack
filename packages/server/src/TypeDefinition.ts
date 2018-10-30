import Dataloader from 'dataloader';

import { IUser } from './modules/user/UserModel';
import User from './modules/user/UserLoader';

type Key = string;

export type Dataloaders = {
  UserLoader: Dataloader<Key, IUser>;
};

export type GraphQLContext = {
  user?: User;
  dataloaders: Dataloaders;
};
