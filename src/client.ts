const EventEmitter from 'events');
const fetch from 'node-fetch');

/**
 * An exception caused by an error in a `Client` request.
 */
class ClientError extends Error {

  /**
   * Creates a new client error.
   * @param {string} message A message describing the error.
   * @param {string|URL} [uri] The URL of the HTTP request or response that failed.
   */
  constructor(message, uri) {
    super(message);

    /**
     * The error name.
     * @type {string}
     */
    this.name = 'ClientError';

    /**
     * The URL of the HTTP request or response that failed.
     * @type {URL}
     */
    this.uri = typeof uri == 'string' ? new URL(uri) : uri;
  }

  /**
   * Returns a string representation of this object.
   * @return The string representation of this object.
   */
  public toString(): string {
    let values = `"${this.message}"`;
    if (this.uri) values = `${values}, uri: "${this.uri.href}"`;
    return `${this.name}(${values})`;
  }
}

/**
 * Sends messages by SMS to a [Free Mobile](http://mobile.free.fr) account.
 */
class Client extends EventEmitter {

  /**
   * Initializes a new instance of the class.
   * @param {string} username The user name associated to the account.
   * @param {string} password The identification key associated to the account.
   * @param {string|URL} [endPoint] The URL of the API end point.
   * @throws {TypeError} The account credentials are invalid.
   */
  constructor(username, password, endPoint = 'https://smsapi.free-mobile.fr') {
    super();

    /**
     * The URL of the API end point.
     * @type {URL}
     */
    this.endPoint = typeof endPoint == 'string' ? new URL(endPoint) : endPoint;

    /**
     * The identification key associated to the account.
     * @type {string}
     */
    this.password = password;
    if (!this.password.length) throw new TypeError('The password is empty');

    /**
     * The user name associated to the account.
     * @type {string}
     */
    this.username = username;
    if (!this.username.length) throw new TypeError('The username is empty');
  }

  /**
   * The class name.
   * @type {string}
   */
  get [Symbol.toStringTag](): string {
    return 'Client';
  }

  /**
   * Sends a SMS message to the underlying account.
   * @param {string} text The text of the message to send.
   * @return {Promise} Completes when the operation is done.
   * @event {Request} The "request" event.
   * @event {Response} The "response" event.
   */
  async sendMessage(text) {
    let message = text.trim();
    if (!message.length) throw new TypeError('The specified message is empty');

    let endPoint = new URL('/sendmsg', this.endPoint);
    endPoint.search = new URLSearchParams({
      msg: message.substr(0, 160),
      pass: this.password,
      user: this.username
    });

    let req = new fetch.Request(endPoint.href);
    this.emit('request', req);

    let res;
    try { res = await fetch(req); }
    catch (err) { throw new ClientError(err.message, endPoint); }

    this.emit('response', req, res);

    if (!res.ok) throw new ClientError('An error occurred while querying the end point', endPoint);
    return res.text();
  }
}
