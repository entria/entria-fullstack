// @flow
import { User, AdminUser } from '../src/models';

// Counter handles creating multiple rows on a single test
let counter = {
  user: 0,
  adminUser: 0,
};

// Function to restart the counter before every test
export const restartCounter = () => {
  counter = Object.keys(counter).reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {});
};

export const createUser = async ({ payload } = {}) => {
  counter.user++;

  return await new User({
    name: `Normal User ${counter.user}`,
    email: `user-${counter.user}@example.com`,
    ...payload,
  }).save();
};

export const createAdminUser = async ({ payload } = {}) => {
  counter.adminUser++;

  return await new AdminUser({
    name: `Admin User ${counter.adminUser}`,
    email: `user-${counter.adminUser}@example.com`,
    ...payload,
  }).save();
};
