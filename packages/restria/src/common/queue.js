// @flow

import kue from 'kue';
import { redisConfig } from './config';

const queue = kue.createQueue(redisConfig);
export default queue;
