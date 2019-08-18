import EventEmitter from 'events';
import {RequestEvent, ResponseEvent} from './events';
import {ClientMixin} from './mixin';

/** Sends messages by SMS to a [FreeMobile](http://mobile.free.fr) account. */
export class NodeClient extends EventEmitter {

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
   * @throws [[TypeError]] The account credentials are invalid.
   */
  constructor(username: string, password: string, endPoint = new URL('https://smsapi.free-mobile.fr/')) {
    super();
    if (!password.length || !username.length) throw new TypeError('The account credentials are invalid.');
    this.endPoint = endPoint;
    this.password = password;
    this.username = username;
  }

  /**
   * Emits an event.
   * @param name The name of the event to be emitted.
   * @param data The data of the event to be emitted.
   */
  protected _emit(name: string, data: RequestEvent|ResponseEvent): void {
    this.emit(name, data);
  }
}

// Apply the client mixin.
export interface NodeClient extends ClientMixin {}
Object.defineProperties(NodeClient.prototype, Object.getOwnPropertyDescriptors(ClientMixin.prototype));
