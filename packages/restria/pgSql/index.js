// @flow
import 'dotenv-safe';
import pg from 'pg';
import runner from './migrationRunner';

import { dbs } from '../src/common/config';

const db = new pg.Client(dbs.restria);

const commands = ['migration', 'migrate', 'rollback', 'up', 'down', 'seed'];
const command = process.argv[2];

if (!commands.includes(command)) {
  throw new Error('Command not valid');
}

runner(command, db);
