import {ClientError} from './error';
import {RequestEvent, ResponseEvent} from './events';

/**
 * Applies the given mixins to the specified constructor.
 * @param constructor The constructor to modify.
 * @param mixins The list of mixins to be applied.
 */
export function applyMixins(constructor: any, mixins: any[]): void {
  for (const mixin of mixins)
    for (const name of Object.getOwnPropertyNames(mixin.prototype))
      Object.defineProperty(constructor.prototype, name, Object.getOwnPropertyDescriptor(mixin.prototype, name)!);
}

/** Provides the base feature of a [FreeMobile](http://mobile.free.fr) client. */
export abstract class ClientMixin {

  /** The URL of the API end point. */
  endPoint!: URL;

  /** The identification key associated to the account. */
  password!: string;

  /** The user name associated to the account. */
  username!: string;

  /**
   * Sends a SMS message to the underlying account.
   * @param text The text of the message to send.
   * @return Completes when the operation is done.
   * @throws [[ClientError]] An error occurred while fetching the server response.
   * @throws [[TypeError]] The specified message is empty.
   */
  async sendMessage(text: string): Promise<void> {
    const message = text.trim();
    if (!message.length) throw new TypeError('The specified message is empty.');

    const url = new URL('sendmsg', this.endPoint);
    url.searchParams.set('msg', message.substring(0, 160));
    url.searchParams.set('pass', this.password);
    url.searchParams.set('user', this.username);

    const request = new Request(url.href);
    this._emit('request', new RequestEvent(request));

    let response;
    try { response = await fetch(request); }
    catch (err) { throw new ClientError(err.message, url); }

    this._emit('response', new ResponseEvent(response, request));
    if (!response.ok) throw new ClientError('An error occurred while querying the end point.', url);
  }

  /**
   * Emits an event.
   * @param name The name of the event to be emitted.
   * @param data The data of the event to be emitted.
   */
  protected abstract _emit(name: string, data: RequestEvent|ResponseEvent): void;
}
