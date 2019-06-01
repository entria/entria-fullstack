// @flow

import path from 'path';
import dotenvSafe from 'dotenv-safe';

const root = path.join.bind(this, __dirname, '../../');

dotenvSafe.load({
  path: root('.env'),
  sample: root('.env.example'),
});

export const ENV = ((process.env: any): {
  API_PORT: string,
  NODE_ENV: string,
  PG_RESTRIA_HOST: string,
  PG_RESTRIA_DATABASE: string,
  PG_RESTRIA_USER: string,
  PG_RESTRIA_PASSWORD: string,
  REDIS_HOST: string,
  [string]: ?string,
});

// Display a friendly message on console to indicate if we're are runnning in a prodution or development enviroment
const status = process.env.NODE_ENV === 'production' ? 'production' : 'development';

if (process.env.NODE_ENV) {
  console.log(`CONFIG: NODE_ENV: '${process.env.NODE_ENV}' running in: '${status}'`);
}

// Export worker settings
export const redisConfig = {
  redis: {
    host: process.env.REDIS_HOST,
  },
};

// Ports
export const apiPort = process.env.API_PORT || 3009;

// Slack
export const slackWebhook = process.env.SLACK_WEBHOOK;

// Jwt
export const jwtSecret = process.env.JWT_KEY;

// Databases
export const dbs = {
  restria: {
    name: 'restria',
    host: ENV.PG_RESTRIA_HOST,
    database: ENV.PG_RESTRIA_DATABASE,
    user: ENV.PG_RESTRIA_USER,
    password: ENV.PG_RESTRIA_PASSWORD,
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
  },
};
