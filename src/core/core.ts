/**
 * Sends messages by SMS to a [Free Mobile](http://mobile.free.fr) account.
 */
export interface Client {

  /**
   * The URL of the API end point.
   */
  endPoint: URL;

  /**
   * The identification key associated to the account.
   */
  password: string;

  /**
   * The user name associated to the account.
   */
  username: string;

  /**
   * Sends a SMS message to the underlying account.
   * @param text The text of the message to send.
   * @return Completes when the operation is done.
   */
  sendMessage(text: string): Promise<void>;
}

/**
 * An exception caused by an error in a `Client` request.
 */
export class ClientError extends Error {

  /**
   * Creates a new client error.
   * @param message A message describing the error.
   * @param uri The URL of the HTTP request or response that failed.
   */
  constructor(message: string = '', readonly uri: URL | null = null) {
    super(message);
    this.name = 'ClientError';
  }

  /**
   * Returns a string representation of this object.
   * @return The string representation of this object.
   */
  toString(): string {
    let values = `"${this.message}"`;
    if (this.uri) values = `${values}, uri: "${this.uri.href}"`;
    return `${this.name}(${values})`;
  }
}
