/**
 * Sends messages by SMS to a [FreeMobile](https://mobile.free.fr) account.
 */
export class Client {

	/**
	 * The Free Mobile account.
	 * @type {string}
	 * @readonly
	 */
	account;

	/**
	 * The Free Mobile API key.
	 * @type {string}
	 * @readonly
	 */
	apiKey;

	/**
	 * The base URL of the remote API endpoint.
	 * @type {URL}
	 * @readonly
	 */
	baseUrl;

	/**
	 * Creates a new client.
	 * @param {string} account The Free Mobile account.
	 * @param {string} apiKey The Free Mobile API key.
	 * @param {string|URL} baseUrl The base URL of the remote API endpoint.
	 */
	constructor(account, apiKey, baseUrl = "https://smsapi.free-mobile.fr") {
		const url = baseUrl instanceof URL ? baseUrl.href : baseUrl;
		this.account = account;
		this.apiKey = apiKey;
		this.baseUrl = new URL(url.endsWith("/") ? url : `${url}/`);
	}

	/**
	 * Sends an SMS message to the underlying account.
	 * @param {string} message The message text.
	 * @returns {Promise<void>} Resolves when the message has been sent.
	 */
	async sendMessage(message) {
		const query = new URLSearchParams({msg: message.trim().slice(0, 160), pass: this.apiKey, user: this.account});
		const response = await fetch(new URL(`sendmsg?${query}`, this.baseUrl), {headers: {"user-agent": navigator.userAgent}});
		if (!response.ok) switch (Math.trunc(response.status / 100)) {
			case 4: throw Error("The provided credentials are invalid.");
			default: throw Error("An error occurred while sending the message.");
		}
	}
}
