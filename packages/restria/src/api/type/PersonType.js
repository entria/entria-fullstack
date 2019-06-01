// @flow

import type { TableSinglePrimaryKey } from '../../TypeDefinition';

const tPerson: TableSinglePrimaryKey = {
  tableName: 'person',
  primaryKey: 'id',
  fields: {
    id: 'id',
    name: 'name',
    nick: 'nick',
    email: 'email',
    password: 'password',
    active: 'active',
    email_verified: 'emailVerified',
    created_at: 'createdAt',
    updated_at: 'updatedAt',
  },
};

export type PersonType = {
  id: string,
  name: string,
  nick?: string,
  email: string,
  password: string,
  active: boolean,
  email_verified: boolean,
  created_at?: string,
  updated_at?: string,
};

export default tPerson;
