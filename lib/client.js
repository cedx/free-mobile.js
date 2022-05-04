import {fetch} from "undici";

/**
 * Sends messages by SMS to a [FreeMobile](https://mobile.free.fr) account.
 */
export class Client {

	/**
	 * The Free Mobile account.
	 * @readonly
	 * @type {string}
	 */
	account;

	/**
	 * The Free Mobile API key.
	 * @readonly
	 * @type {string}
	 */
	apiKey;

	/**
	 * The base URL of the remote API endpoint.
	 * @readonly
	 * @type {URL}
	 */
	baseUrl;

	/**
	 * Creates a new client.
	 * @param {string} account The Free Mobile account.
	 * @param {string} apiKey The Free Mobile API key.
	 * @param {string} [baseUrl] The base URL of the remote API endpoint.
	 */
	constructor(account, apiKey, baseUrl = "https://smsapi.free-mobile.fr/") {
		this.account = account;
		this.apiKey = apiKey;
		this.baseUrl = new URL(baseUrl);
	}

	/**
	 * Sends a SMS message to the underlying account.
	 * @param {string} message The message text.
	 * @returns {Promise<void>} Resolves when the message has been sent.
	 */
	async sendMessage(message) {
		const url = new URL("sendmsg", this.baseUrl);
		url.searchParams.set("msg", message.trim().slice(0, 160));
		url.searchParams.set("pass", this.apiKey);
		url.searchParams.set("user", this.account);

		// JavaScript
		const response = await fetch(url);
		if (!response.ok) switch (Math.trunc(response.status / 100)) {
			case 4: throw new Error("The provided credentials are invalid.");
			default: throw new Error("An error occurred while sending the message.");
		}
	}
}
