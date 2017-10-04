'use strict';

const EventEmitter = require('events');
const {default: fetch, Request} = require('node-fetch');
const {URL, URLSearchParams} = require('url');

/**
 * Sends messages by SMS to a [Free Mobile](http://mobile.free.fr) account.
 */
exports.Client = class Client extends EventEmitter {

  /**
   * The URL of the default API end point.
   * @type {URL}
   */
  static get defaultEndPoint() {
    return new URL('https://smsapi.free-mobile.fr');
  }

  /**
   * Initializes a new instance of the class.
   * @param {string} username The user name associated to the account.
   * @param {string} password The identification key associated to the account.
   * @param {string|URL} [endPoint] The URL of the API end point.
   */
  constructor(username, password, endPoint = Client.defaultEndPoint) {
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
   * @return {Promise} Completes when the operation is done.
   * @emits {Request} The "request" event.
   * @emits {Response} The "response" event.
   */
  async sendMessage(text) {
    if (!this.username.length || !this.password.length) throw new Error('The account credentials are invalid.');

    let message = text.trim();
    if (!message.length) throw new Error('The specified message is empty.');

    let endPoint = new URL('sendmsg', this.endPoint);
    endPoint.search = new URLSearchParams({
      msg: message.substr(0, 160),
      pass: this.password,
      user: this.username
    });

    let req = new Request(endPoint.href);
    this.emit('request', req);

    let res = await fetch(req);
    this.emit('response', res);

    if (!res.ok) throw new Error('An error occurred while sending the message.');
    return res.text();
  }
};
