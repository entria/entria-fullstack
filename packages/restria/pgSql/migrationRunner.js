// @flow
import path from 'path';
import fs from 'fs';

import type { PgClient } from '../src/TypeDefinition';

const migrationsDir = path.join(__dirname, 'migrations/');

export default async function runner(
  command: string,
  db: PgClient,
  handleConnection: boolean = true,
) {
  if (handleConnection) await db.connect();

  try {
    switch (command) {
      case 'migration': {
        const now = Date.now();
        const migrationFileName = suffix => `${now}_migration_${suffix}.sql`;
        console.log('Creating migrations...');
        fs.writeFileSync(
          path.join(migrationsDir, migrationFileName('up')).toString(),
          '-- Up schema here',
        );
        fs.writeFileSync(
          path.join(migrationsDir, migrationFileName('down')).toString(),
          '-- Down schema here',
        );
        break;
      }
      case 'migrate':
        await migrate('_up', db);
        break;
      case 'rollback':
        await migrate('_down', db);
        break;
      case 'up':
        await all('_up', db);
        break;
      case 'down':
        await all('_down', db);
        break;
      case 'seed': {
        const seed = fs.readFileSync(path.join(__dirname, 'seed.sql')).toString();
        await db.query(seed);
        break;
      }
      default:
        migrate('_up', db);
    }
  } finally {
    if (handleConnection) await db.end();
  }
}

function migrate(suffix, db) {
  const latestMigration = fs
    .readdirSync(migrationsDir)
    .filter(fileName => fileName.includes(suffix))
    .reduce(
      (lastOne, fileName) => {
        const createdAt = datefy(fileName);
        if (lastOne != null && (!lastOne.createdAt || createdAt > lastOne.createdAt)) {
          return { createdAt, fileName };
        }
        return null;
      },
      { createdAt: null, fileName: null },
    );

  const migrationSql = fs
    .readFileSync(path.join(migrationsDir, latestMigration.fileName))
    .toString();

  return db.query(migrationSql).catch(err => console.log(err));
}

function all(suffix, db) {
  const sortedMigrations = fs
    .readdirSync(migrationsDir)
    .filter(fileName => fileName.includes(suffix))
    .sort((a, b) => datefy(a) > datefy(b))
    .map(fileName => fs.readFileSync(path.join(migrationsDir, fileName)).toString());

  return Promise.all(sortedMigrations.map(migrationSql => db.query(migrationSql)));
}

function datefy(fileName) {
  return Number(fileName.match(/[^_]+/)[0]);
}
