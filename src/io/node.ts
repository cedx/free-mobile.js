import fetch, {Request as NodeRequest} from 'node-fetch';
import {BaseClient} from '../http/client';

/** Sends messages by SMS to a [Free Mobile](http://mobile.free.fr) account. */
export class Client extends BaseClient {

  /**
   * Creates a new client.
   * @param username The user name associated to the account.
   * @param password The identification key associated to the account.
   * @param endPoint The URL of the API end point.
   */
  constructor(username: string, password: string, endPoint?: URL) {
    super(username, password, {
      fetch(request: Request): Promise<Response> { return fetch(request as any) as any; },
      newRequest(url: URL): Request { return new NodeRequest(url.href) as any; }
    });

    if (endPoint) this.endPoint = endPoint;
  }
}
