/**
 * Sends messages by SMS to a [FreeMobile](https://mobile.free.fr) account.
 */
export class Client {

	/**
	 * The Free Mobile account.
	 */
	account: string;

	/**
	 * The Free Mobile API key.
	 */
	apiKey: string;

	/**
	 * The base URL of the remote API endpoint.
	 */
	baseUrl: URL;

	/**
	 * Creates a new client.
	 * @param account The Free Mobile account.
	 * @param apiKey The Free Mobile API key.
	 * @param baseUrl The base URL of the remote API endpoint.
	 */
	constructor(account: string, apiKey: string, baseUrl?: string|URL);

	/**
	 * Sends an SMS message to the underlying account.
	 * @param message The message text.
	 * @returns Resolves when the message has been sent.
	 */
	sendMessage(message: string): Promise<void>;
}
