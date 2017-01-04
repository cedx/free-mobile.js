import {Client} from './client';
export * from './client';

/**
 * Sends a SMS message to a given Free Mobile account, and returns the response body.
 * @param {string} text The text of the message to send.
 * @param {object} credentials The Free Mobile credentials.
 * @return {Observable<string>} The response as string.
 */
export function sendMessage(text, credentials) {
  return new Client(credentials).sendMessage(text);
}
