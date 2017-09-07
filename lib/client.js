'use strict';

const EventEmitter = require('events');
const {default: fetch, Request} = require('node-fetch');
const {Observable, Subject} = require('rxjs');
const {URL, URLSearchParams} = require('url');

/**
 * Sends messages by SMS to a [Free Mobile](http://mobile.free.fr) account.
 */
exports.Client = class Client extends EventEmitter {

  /**
   * The URL of the default API end point.
   * @type {URL}
   */
  static get DEFAULT_ENDPOINT() {
    return new URL('https://smsapi.free-mobile.fr');
  }

  /**
   * Initializes a new instance of the class.
   * @param {string} [username] The user name associated to the account.
   * @param {string} [password] The identification key associated to the account.
   * @param {string|URL} [endPoint] The URL of the API end point.
   */
  constructor(username = '', password = '', endPoint = Client.DEFAULT_ENDPOINT) {
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

    /**
     * The user name associated to the account.
     * @type {string}
     */
    this.username = username;
  }

  /**
   * The class name.
   * @type {string}
   */
  get [Symbol.toStringTag]() {
    return 'Client';
  }

  /**
   * Sends a SMS message to the underlying account.
   * @param {string} text The text of the message to send.
   * @return {Observable} Completes when the operation is done.
   * @emits {Request} The "request" event.
   * @emits {Response} The "response" event.
   */
  sendMessage(text) {
    if (!this.username.length || !this.password.length)
      return Observable.throw(new Error('The account credentials are invalid.'));

    let message = text.trim();
    if (!message.length) return Observable.throw(new Error('The specified message is empty.'));

    let endPoint = new URL('sendmsg', this.endPoint);
    endPoint.search = new URLSearchParams({
      msg: message.substr(0, 160),
      pass: this.password,
      user: this.username
    });

    let req = new Request(endPoint.href);
    this._onRequest.next(req);

    return Observable.from(fetch(req)).mergeMap(res => {
      this._onResponse.next(res);
      return res.ok ? Observable.from(res.text()) : Observable.throw(new Error(`${res.status} ${res.statusText}`));
    });
  }

  /**
   * Converts this object to a map in JSON format.
   * @return {object} The map in JSON format corresponding to this object.
   */
  toJSON() {
    return {
      endPoint: this.endPoint ? this.endPoint.href : null,
      password: this.password,
      username: this.username
    };
  }

  /**
   * Returns a string representation of this object.
   * @return {string} The string representation of this object.
   */
  toString() {
    return `${this[Symbol.toStringTag]} ${JSON.stringify(this)}`;
  }
};
