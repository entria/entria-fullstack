// @flow

import { IncomingWebhook } from '@slack/client';
import prettyFormat from 'pretty-format';
import { slackWebhook } from './config';

export const wh = new IncomingWebhook(slackWebhook);

type SlackWebhookAttachment = {
  text: string,
  color?: string,
};

type SlackWebhookOptions = {
  channel: string,
  attachments: Array<SlackWebhookAttachment>,
  [optionName: string]: any,
};

/**
 * Thin wrapper to handle DEV and PROD environments
 */
export function sendtoSlack({ channel, ...args }: SlackWebhookOptions) {
  wh.send({
    ...args,
    channel: process.env.NODE_ENV === 'production' ? channel : `${channel}-dev`,
  });
}

export function logApiErrorToSlack(application: string, error: Object, header: string, channel: string) {
  if (error.message.indexOf('Must provide query string') > -1) {
    return;
  }

  sendtoSlack({
    channel,
    attachments: [
      { text: application, color: '#0000ff' },
      { text: prettyFormat(header) },
      { text: error.message },
      { text: prettyFormat(error.locations) },
      { text: prettyFormat(error.stack), color: '#ff0000' },
      {
        text: prettyFormat(error.source),
        color: '#00ff00',
      },
      { text: prettyFormat(error.originalError) },
    ],
  });
}
