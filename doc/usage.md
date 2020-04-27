---
path: src/branch/master
source: src/client.ts
---

# Usage

## SMS notifications
**Free Mobile for JS** provides the `Client` class, which allow to send SMS messages to your mobile phone by using the `sendMessage()` method:

```js
import {Client, ClientError} from '@cedx/free-mobile';

async function main() {
  try {
    const client = new Client('your account identifier', 'your API key');
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

The `Client.sendMessage()` method throws a [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError)
if the account credentials are invalid or if the specified message is empty. It throws a `ClientError` if any error occurred while sending the message.

!!! warning
    The text of the messages will be automatically truncated to **160** characters:  
    you can't send multipart messages using this library.

## Client events
The `Client` class is an [`EventEmitter`](https://nodejs.org/api/events.html) that triggers some events during its life cycle.

### The `Client.eventRequest` event
Emitted every time a request is made to the remote service:

```js
import {Client} from '@cedx/free-mobile';

function main() {
  const client = new Client('your account identifier', 'your API key');
  client.on(Client.eventRequest, request =>
    console.log(`Client request: ${request.url}`)
  );
}
```

### The `Client.eventResponse` event
Emitted every time a response is received from the remote service:

```js
import {Client} from '@cedx/free-mobile';

function main() {
  const client = new Client('your account identifier', 'your API key');
  client.on(Client.eventResponse, (response, request) =>
    console.log(`Server response: ${response.status}`)
  );
}
```
