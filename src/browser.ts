export * from './http';

/**
 * Sends messages by SMS to a [Free Mobile](http://mobile.free.fr) account.
 */
export class Client extends AbstractClient {

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
}
