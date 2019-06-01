// @flow
import 'babel-polyfill';
import 'isomorphic-fetch';
import app from './app';
import { apiPort } from '../common/config';

(async () => {
  await app.listen(apiPort);
  console.log(`Server started on port ${apiPort}`);
})();
