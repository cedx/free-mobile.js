import {BaseClient} from './http';
import {fetchClient} from './io/browser';
export * from './http';

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
    super(username, password, fetchClient);
    if (endPoint) this.endPoint = endPoint;
  }
}
