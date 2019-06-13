import {ClientError} from './error.js';
import {RequestEvent, ResponseEvent} from './events.js';

/**
 * Provides static properties for {@link http://mobile.free.fr|Free Mobile} clients.
 * @mixin
 */
export const ClientConstructor = {

  /**
   * An event that is triggered when a request is made to the remote service.
   * @type {string}
   */
  get eventRequest() {
    return 'request';
  },

  /**
   * An event that is triggered when a response is received from the remote service.
   * @type {string}
   */
  get eventResponse() {
    return 'response';
  }
};

/**
 * Provides the instance methods for {@link http://mobile.free.fr|Free Mobile} clients.
 * @mixin
 */
export const ClientPrototype = {

  /**
   * Sends a SMS message to the underlying account.
   * @param {string} text The text of the message to send.
   * @return {Promise} Completes when the operation is done.
   * @throws {ClientError} An error occurred while fetching the server response.
   * @throws {TypeError} The specified message is empty.
   */
  async sendMessage(text) {
    const message = text.trim();
    if (!message.length) throw new TypeError('The specified message is empty.');

    const url = new URL('sendmsg', this.endPoint);
    url.searchParams.set('msg', message.substring(0, 160));
    url.searchParams.set('pass', this.password);
    url.searchParams.set('user', this.username);

    const request = this._createRequest(url);
    this._emit(this.constructor.eventRequest, new RequestEvent(request));

    let response;
    try { response = await this._fetch(request); }
    catch (err) { throw new ClientError(err.message, url); }

    this._emit(this.constructor.eventResponse, new ResponseEvent(response, request));
    if (!response.ok) throw new ClientError('An error occurred while querying the end point.', url);
  },

  /**
   * Initializes this object.
   * @param {string} username The user name associated to the account.
   * @param {string} password The identification key associated to the account.
   * @param {URL} endPoint The URL of the API end point.
   * @throws {TypeError} The account credentials are invalid.
   * @protected
   */
  _init(username, password, endPoint) {
    if (!password.length || !username.length) throw new TypeError('The account credentials are invalid.');

    /**
     * The URL of the API end point.
     * @type {URL}
     */
    this.endPoint = endPoint;

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
};
