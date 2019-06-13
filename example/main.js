/* eslint-disable no-unused-vars */
import {Client, ClientError} from '@cedx/free-mobile';

/**
 * Sends an SMS notification.
 * @return {Promise} Completes when the program is terminated.
 */
async function main() {
  try {
    const client = new Client('your account identifier', 'your API key');
    // For example: new Client('12345678', 'a9BkVohJun4MAf')

    await client.sendMessage('Hello World from Node.js!');
    console.log('The message was sent successfully');
  }

  catch (error) {
    console.log(`An error occurred: ${error.message}`);
    if (error instanceof ClientError) console.log(`From: ${error.uri.href}`);
  }
}
