import mongoose from 'mongoose';

import { getUser, generateToken } from '../auth';

import { connectMongoose, clearDbAndRestartCounters, disconnectMongoose, createRows } from '../../test/helper';

const { ObjectId } = mongoose.Types;

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

describe('getUser', () => {
  it('should return an user null when token is null', async () => {
    const token = null;
    const { user } = await getUser(token);

    expect(user).toBe(null);
  });

  it('should return null when token is invalid', async () => {
    const token = 'invalid token';
    const { user } = await getUser(token);

    expect(user).toBe(null);
  });

  it('should return null when token do not represent a valid user', async () => {
    const token = generateToken({ _id: new ObjectId() });
    const { user } = await getUser(token);

    expect(user).toBe(null);
  });

  it('should return user from a valid token', async () => {
    const me = await createRows.createUser();

    const token = generateToken(me);
    const { user } = await getUser(token);

    expect(user.name).toBe(me.name);
    expect(user.email).toBe(me.email);
  });
});
