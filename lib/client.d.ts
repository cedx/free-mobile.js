/// <reference types="node" />
import { EventEmitter } from "events";
/** An exception caused by an error in a [[Client]] request. */
export declare class ClientError extends Error {
    readonly uri?: URL | undefined;
    /**
     * Creates a new client error.
     * @param message A message describing the error.
     * @param uri The URL of the HTTP request or response that failed.
     */
    constructor(message?: string, uri?: URL | undefined);
}
/** Sends messages by SMS to a [FreeMobile](http://mobile.free.fr) account. */
export declare class Client extends EventEmitter {
    readonly username: string;
    readonly password: string;
    readonly endPoint: URL;
    /**
     * An event that is triggered when a request is made to the remote service.
     * @event request
     */
    static readonly eventRequest: string;
    /**
     * An event that is triggered when a response is received from the remote service.
     * @event response
     */
    static readonly eventResponse: string;
    /**
     * Creates a new client.
     * @param username The user name associated to the account.
     * @param password The identification key associated to the account.
     * @param endPoint The URL of the API end point.
     * @throws `TypeError` The account credentials are invalid.
     */
    constructor(username: string, password: string, endPoint?: URL);
    /**
     * Sends a SMS message to the underlying account.
     * @param text The text of the message to send.
     * @return Completes when the operation is done.
     * @throws [[ClientError]] An error occurred while fetching the server response.
     * @throws `TypeError` The specified message is empty.
     */
    sendMessage(text: string): Promise<void>;
}
