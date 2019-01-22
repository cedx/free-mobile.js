import {BaseClient} from '../http';

/**
 * Sends messages by SMS to a [Free Mobile](http://mobile.free.fr) account.
 */
export class Client extends BaseClient {

  /**
   * Creates a new client.
   * @param username The user name associated to the account.
   * @param password The identification key associated to the account.
   * @param endPoint The URL of the API end point.
   */
  constructor(username: string, password: string, endPoint?: URL) {
    super(username, password, {
      fetch(request: Request): Promise<Response> { return window.fetch(request); },
      newRequest(url: URL): Request { return new Request(url.href, {mode: 'no-cors'}); }
    });

    if (endPoint) this.endPoint = endPoint;
  }

  /**
   * The class name.
   */
  get [Symbol.toStringTag](): string {
    return `Client(Browser, endPoint: "${this.endPoint.href}")`;
  }
}
