// @flow

import mongoose from 'mongoose';

import * as loaders from '../src/loader';
import * as _createRows from './createRows';

export const createRows = _createRows;

const { ObjectId } = mongoose.Types;

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
// jest does this automatically for you if no NODE_ENV is set
process.env.NODE_ENV = 'test';

const mongooseOptions = {
  autoIndex: false,
  autoReconnect: false,
  connectTimeoutMS: 10000,
  useNewUrlParser: true,
};

// Just in case want to debug something
// mongoose.set('debug', true);

export async function connectMongoose() {
  jest.setTimeout(20000);
  return mongoose.connect(
    global.__MONGO_URI__,
    {
      ...mongooseOptions,
      dbName: global.__MONGO_DB_NAME__,
    },
  );
}

export async function clearDatabase() {
  await mongoose.connection.db.dropDatabase();
}

export async function disconnectMongoose() {
  await mongoose.disconnect();
  mongoose.connections.forEach((connection) => {
    const modelNames = Object.keys(connection.models);

    modelNames.forEach((modelName) => {
      delete connection.models[modelName];
    });

    const collectionNames = Object.keys(connection.collections);
    collectionNames.forEach((collectionName) => {
      delete connection.collections[collectionName];
    });
  });

  const modelSchemaNames = Object.keys(mongoose.modelSchemas);
  modelSchemaNames.forEach((modelSchemaName) => {
    delete mongoose.modelSchemas[modelSchemaName];
  });
}

export async function clearDbAndRestartCounters() {
  await clearDatabase();
  createRows.restartCounters();
}

export function getContext(context: Object) {
  const dataloaders = Object.keys(loaders).reduce(
    (prev, loaderKey) => ({
      ...prev,
      [loaderKey]: loaders[loaderKey].getLoader(),
    }),
    {},
  );

  return {
    ...context,
    req: {},
    dataloaders,
  };
}

// @TODO Make those two functions a separated npm package.
function sanitizeValue(value: Object, field: ?string, keysToFreeze: string[]) {
  // If this current field is specified on the `keysToFreeze` array, we simply redefine it
  // so it stays the same on the snapshot
  if (field && keysToFreeze.indexOf(field) !== -1) {
    return `FROZEN-${field.toUpperCase()}`;
  }

  // Check if value is boolean
  if (typeof value === 'boolean') {
    return value;
  }

  // If value is falsy, return `EMPTY` value so it's easier to debug
  if (!value && value !== 0) {
    return 'EMPTY';
  }

  // Check if it's not an array and can be transformed into a string
  if (!Array.isArray(value) && typeof value.toString === 'function') {
    // Remove any non-alphanumeric character from value
    const cleanValue = value.toString().replace(/[^a-z0-9]/gi, '');

    // Check if it's a valid `ObjectId`, if so, replace it with a static value
    if (ObjectId.isValid(cleanValue) && value.toString().indexOf(cleanValue) !== -1) {
      return value.toString().replace(cleanValue, 'ObjectId');
    }
  }

  // if it's an array, sanitize the field
  if (Array.isArray(value)) {
    return value.map(item => sanitizeValue(item, null, keysToFreeze));
  }

  // If it's an object, we call sanitizeTestObject function again to handle nested fields
  if (typeof value === 'object') {
    // eslint-disable-next-line no-use-before-define
    return sanitizeTestObject(value, keysToFreeze);
  }

  return value;
}

/**
 * Sanitize a test object removing the mentions of a `ObjectId` from Mongoose and also
 *  stringifying any other object into a valid, "snapshotable", representation.
 */
export function sanitizeTestObject(payload: Object, keysToFreeze: string[] = ['id'], ignore: string[] = ['password']) {
  return Object.keys(payload).reduce((sanitizedObj: Object, field: string) => {
    if (ignore.indexOf(field) !== -1) {
      return sanitizedObj;
    }

    const value = payload[field];
    const sanitizedValue = sanitizeValue(value, field, keysToFreeze);

    return {
      ...sanitizedObj,
      [field]: sanitizedValue,
    };
  }, {});
}
