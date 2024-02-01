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
	constructor(account: string, apiKey: string, baseUrl: URL|string = "https://smsapi.free-mobile.fr") {
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
		const url = new URL("sendmsg", this.baseUrl);
		url.searchParams.set("msg", message.trim().slice(0, 160));
		url.searchParams.set("pass", this.apiKey);
		url.searchParams.set("user", this.account);

		const response = await fetch(url);
		if (!response.ok) switch (Math.trunc(response.status / 100)) {
			case 4: throw Error("The provided credentials are invalid.");
			default: throw Error("An error occurred while sending the message.");
		}
	}
}
