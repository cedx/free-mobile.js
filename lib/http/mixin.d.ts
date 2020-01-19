import { RequestEvent, ResponseEvent } from './events';
/** Provides the base feature of a [FreeMobile](http://mobile.free.fr) client. */
export declare abstract class ClientMixin {
    /** The URL of the API end point. */
    endPoint: URL;
    /** The identification key associated to the account. */
    password: string;
    /** The user name associated to the account. */
    username: string;
    /**
     * Sends a SMS message to the underlying account.
     * @param text The text of the message to send.
     * @return Completes when the operation is done.
     * @throws [[ClientError]] An error occurred while fetching the server response.
     * @throws [[TypeError]] The specified message is empty.
     */
    sendMessage(text: string): Promise<void>;
    /**
     * Emits an event.
     * @param name The name of the event to be emitted.
     * @param data The data of the event to be emitted.
     */
    protected abstract _emit(name: string, data: RequestEvent | ResponseEvent): void;
}
