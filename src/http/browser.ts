import {EventEmitter} from 'eventemitter3';
import {ClientError} from './core';
export * from './core';

/**
 * Sends messages by SMS to a [Free Mobile](http://mobile.free.fr) account.
 */
export class Client extends EventEmitter {

  /**
   * An event that is triggered when a request is made to the remote service.
   * @event request
   */
  static readonly eventRequest: string = 'request';

  /**
   * An event that is triggered when a response is received from the remote service.
   * @event response
   */
  static readonly eventResponse: string = 'response';

  /**
   * Creates a new client.
   * @param username The user name associated to the account.
   * @param password The identification key associated to the account.
   * @param endPoint The URL of the API end point.
   * @throws {TypeError} The account credentials are invalid.
   */
  constructor(public username: string, public password: string, readonly endPoint: URL = new URL('https://smsapi.free-mobile.fr')) {
    super();
    if (!this.password.length || !this.username.length) throw new TypeError('The account credentials are invalid.');
  }

  /**
   * The class name.
   */
  get [Symbol.toStringTag](): string {
    return 'Client';
  }

  /**
   * Sends a SMS message to the underlying account.
   * @param text The text of the message to send.
   * @return Completes when the operation is done.
   */
  async sendMessage(text: string): Promise<void> {
    const message = text.trim();
    if (!message.length) throw new TypeError('The specified message is empty.');

    const url = new URL('sendmsg', this.endPoint);
    url.searchParams.set('msg', message.substr(0, 160));
    url.searchParams.set('pass', this.password);
    url.searchParams.set('user', this.username);

    const req = new Request(url.href);
    this.emit(Client.eventRequest, req);

    let res: Response;
    try { res = await fetch(req); }
    catch (err) { throw new ClientError(err.message, url); }

    this.emit(Client.eventResponse, req, res);
    if (!res.ok) throw new ClientError('An error occurred while querying the end point.', url);
  }
}
