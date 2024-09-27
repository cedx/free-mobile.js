/**
 * Sends messages by SMS to a [FreeMobile](https://mobile.free.fr) account.
 */
export class Client {

	/**
	 * The Free Mobile account.
	 */
	readonly account: string;

	/**
	 * The Free Mobile API key.
	 */
	readonly apiKey: string;

	/**
	 * The base URL of the remote API endpoint.
	 */
	readonly baseUrl: URL;

	/**
	 * Creates a new client.
	 * @param account The Free Mobile account.
	 * @param apiKey The Free Mobile API key.
	 * @param baseUrl The base URL of the remote API endpoint.
	 */
	constructor(account: string, apiKey: string, baseUrl: string|URL = "https://smsapi.free-mobile.fr") {
		const url = baseUrl instanceof URL ? baseUrl.href : baseUrl;
		this.account = account;
		this.apiKey = apiKey;
		this.baseUrl = new URL(url.endsWith("/") ? url : `${url}/`);
	}

	/**
	 * Sends an SMS message to the underlying account.
	 * @param message The message text.
	 * @returns Resolves when the message has been sent.
	 */
	async sendMessage(message: string): Promise<void> {
		const query = new URLSearchParams({msg: message.trim().slice(0, 160), pass: this.apiKey, user: this.account});
		const response = await fetch(new URL(`sendmsg?${query}`, this.baseUrl), {headers: {"user-agent": navigator.userAgent}});
		if (!response.ok) throw Error(`${response.status} ${response.statusText}`);
	}
}
