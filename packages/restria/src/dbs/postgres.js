// @flow

import pg from 'pg';
import { dbs } from '../common/config';

const pools = Object.keys(dbs).reduce((obj, key) => {
  const pool = new pg.Pool(dbs[key]);

  pool.on('error', error => console.error(`Error on ${key}`, error.message, error.stack));

  if (process.env.NODE_ENV === 'development') {
    const oldQuery = pool.query;
    pool.query = (...args) => {
      console.log('--> PostgreSQL query');
      console.log(...args);
      return oldQuery.call(pool, ...args);
    };
  }

  return {
    ...pools,
    [key]: pool,
  };
}, {});

export default pools;
