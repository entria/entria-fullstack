/* eslint-disable import/no-extraneous-dependencies */
// based on https://github.com/winstonjs/logform/blob/3327be2/simple.js
import winston from 'winston';
import PrettyError from 'pretty-error';

import { MESSAGE } from 'triple-beam';
import jsonStringify from 'fast-safe-stringify';

const { format } = winston;
const { combine, timestamp, colorize, label } = winston.format;

const pe = new PrettyError();

const consoleFormatter = format((info) => {
  const stringifiedRest = jsonStringify(
    Object.assign({}, info, {
      level: undefined,
      label: undefined,
      message: undefined,
      splat: undefined,
      timestamp: undefined,
      // in case error is an Error object, make it undefined here, since we print it separately
      error: info.error instanceof Error ? undefined : info.error,
    }),
    undefined,
    2,
  );

  const padding = (info.padding && info.padding[info.level]) || '';
  if (stringifiedRest !== '{}') {
    info[MESSAGE] = `${info.timestamp} [${info.label}] ${info.level}:${padding} ${info.message}\n${stringifiedRest}`;
  } else {
    info[MESSAGE] = `${info.timestamp} [${info.label}] ${info.level}:${padding} ${info.message}`;
  }

  // log error separately
  if (info.error && info.error instanceof Error) {
    info[MESSAGE] = `${info[MESSAGE]}\n${pe.render(info.error)}`;
  }

  return info;
});

export default (labelOptions: { label: string }) => combine(label(labelOptions), timestamp(), colorize(), consoleFormatter());
