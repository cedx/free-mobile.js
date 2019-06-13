import EventEmitter from 'events';
import fetch from 'node-fetch';
import {ClientConstructor, ClientPrototype} from './mixins.js';

/**
 * Sends messages by SMS to a {@link http://mobile.free.fr|Free Mobile} account.
 * @mixes ClientConstructor
 * @mixes ClientPrototype
 */
export class NodeClient extends EventEmitter {

  /**
   * Creates a new client.
   * @param {string} username The user name associated to the account.
   * @param {string} password The identification key associated to the account.
   * @param {URL} [endPoint] The URL of the API end point.
   * @throws {TypeError} The account credentials are invalid.
   */
  constructor(username, password, endPoint = new URL('https://smsapi.free-mobile.fr/')) {
    super();
    this._init(username, password, endPoint);
  }

  /**
   * Creates an HTTP request from the specified URL.
   * @param {URL} url The URL of the HTTP request.
   * @return {Request} The request corresponding to the specified URL.
   * @private
   */
  _createRequest(url) {
    return new fetch.Request(url.href);
  }

  /**
   * Emits an event.
   * @param {string} name The name of the event to be emitted.
   * @param {*} data The data of the event to be emitted.
   * @private
   */
  _emit(name, data) {
    this.emit(name, data);
  }

  /**
   * Fetches a resource from the network.
   * @param {Request} request The resource to be fetched.
   * @return {Promise<Response>} The server response.
   * @private
   */
  _fetch(request) {
    return fetch(request);
  }
}

// Apply the client mixins.
Object.assign(NodeClient, ClientConstructor);
Object.assign(NodeClient.prototype, ClientPrototype);
