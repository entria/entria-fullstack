import mongoose from 'mongoose';

const mongoUri = 'mongodb://localhost/test';

// mongoose.set('debug', true);

mongoose.Promise = Promise;
mongoose.connect(mongoUri, {
  auto_reconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
});

export const connection = mongoose.connection;

connection.on('error', e => {
  if (e.message.code === 'ETIMEDOUT') {
    console.log(e);
    mongoose.connect(mongoUri, opts);
  }
  console.log(e);
});

connection.once('open', () => {
  console.log(`MongoDB successfully connected to ${mongoUri}`);
});
