path: blob/master/lib
source: client.js

# Usage

## SMS notifications
**Free Mobile for JS** provides the `Client` class, which allow to send SMS messages to your mobile phone by using the `sendMessage()` method:

```javascript
const {Client, ClientError} = require('@cedx/free-mobile');

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
```

The `Client#sendMessage()` method throws a [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError)
if the account credentials are invalid or if the specified message is empty. It throws a `ClientError` if any error occurred while sending the message.

!!! warning
    The text of the messages will be automatically truncated to **160** characters:  
    you can't send multipart messages using this library.

## Client events
The `Client` class is an [`EventEmitter`](https://nodejs.org/api/events.html) that triggers some events during its life cycle:

- `request` : emitted every time a request is made to the remote service.
- `response` : emitted every time a response is received from the remote service.

You can subscribe to them using the `on()` method:

```javascript
client.on('request', (request) =>
  console.log(`Client request: ${request.url}`)
);

client.on('response', (request, response) =>
  console.log(`Server response: ${response.status}`)
);
```

## Unit tests
If you want to run the library tests, you must set two environment variables:

```shell
export FREEMOBILE_USERNAME="your account identifier"
export FREEMOBILE_PASSWORD="your API key"
```

Then, you can run the `test` script from the command prompt:

```shell
npm test
```
