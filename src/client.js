import {Observable} from 'rxjs';
import request from 'superagent';

/**
 * Sends messages by SMS to a [Free Mobile](http://mobile.free.fr) account.
 */
export class Client {

  /**
   * Initializes a new instance of the class.
   * @param {string} username The user name associated to the account.
   * @param {string} password The identification key associated to the account.
   * @throws {Error} The specified user name or password is empty.
   */
  constructor(username, password) {
    if (typeof username != 'string' || !username.length) throw new Error('The specified user name is empty.');
    if (typeof password != 'string' || !password.length) throw new Error('The specified password is empty.');

    /**
     * The identification key associated to the account.
     * @type {string}
     */
    this.password = password;

    /**
     * The user name associated to the account.
     * @type {string}
     */
    this.username = username;
  }

  /**
   * The URL of the API end point.
   * @type {string}
   */
  static get END_POINT() {
    return 'https://smsapi.free-mobile.fr/sendmsg';
  }

  /**
   * Sends a SMS message to the underlying account.
   * @param {string} text The text of the message to send.
   * @return {Observable<string>} The response as string.
   */
  sendMessage(text) {
    let encoded = Buffer.from(text).toString('latin1').trim();
    if (!encoded.length) return Observable.throw(new Error('The specified message is empty.'));

    return new Observable(observer => request.get(Client.END_POINT)
      .query({
        msg: encoded.substr(0, 160),
        pass: this.password,
        user: this.username
      })
      .end((err, res) => {
        if (err || !res.ok) observer.error(new Error(err ? err.status : res.status));
        else {
          observer.next(res.text);
          observer.complete();
        }
      })
    );
  }
}
