import mongoose from 'mongoose';

import * as loaders from '../src/loader';
import * as _createRows from './createRows';

export const createRows = _createRows;

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

export function getContext(context) {
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
