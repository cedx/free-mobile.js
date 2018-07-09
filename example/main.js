/* eslint-disable no-unused-vars */
const {Client, ClientError} = require('@cedx/free-mobile');

/**
 * Sends an SMS notification.
 */
async function main() {
  try {
    let client = new Client('your account identifier', 'your API key');
    // For example: new Client('12345678', 'a9BkVohJun4MAf')

    await client.sendMessage('Hello World!');
    console.log('The message was sent successfully');
  }

  catch (error) {
    console.log(`An error occurred: ${error.message}`);
    if (error instanceof ClientError) console.log(`From: ${error.uri.href}`);
  }
}
