path: blob/master
source: src/http/mixin.ts

# Usage

## SMS notifications
**Free Mobile for JS** provides the `Client` class, which allow to send SMS messages to your mobile phone by using the `sendMessage()` method:

```typescript
import {Client, ClientError} from '@cedx/free-mobile';

async function main(): Promise<void> {
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

The `Client#sendMessage()` method throws a [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError)
if the account credentials are invalid or if the specified message is empty. It throws a [`ClientError`](https://github.com/cedx/free-mobile.js/blob/master/src/http/error.ts) if any error occurred while sending the message.

!!! warning
    The text of the messages will be automatically truncated to **160** characters:  
    you can't send multipart messages using this library.

## Client events
The `Client` class is an event emitter that triggers some events during its life cycle.

The [Node.js](https://nodejs.org) instance is implemented as an [`EventEmitter`](https://nodejs.org/api/events.html), while the browser instance is implemented as an [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) that triggers [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) objects.

!!! tip
    If you target browsers that do not support the `EventTarget` constructor, you will need
    a dedicated polyfill. We recommend using the [`@ungap/event-target`](https://www.npmjs.com/package/@ungap/event-target) package.   

### The `Client.eventRequest` event
Emitted every time a request is made to the remote service:

```typescript
// With Node.js:
client.on(Client.eventRequest, event =>
  console.log(`Client request: ${event.request.url}`)
);

// With a browser:
client.addEventListener(Client.eventRequest, event =>
  console.log(`Client request: ${event.detail.request.url}`)
);
```

### The `Client.eventResponse` event
Emitted every time a response is received from the remote service:

```typescript
// With Node.js:
client.on(Client.eventResponse, event =>
  console.log(`Server response: ${event.response.status}`)
);

// With a browser:
client.addEventListener(Client.eventResponse, event =>
  console.log(`Server response: ${event.detail.response.status}`)
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
