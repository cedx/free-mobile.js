/**
 * Sends messages by SMS to a [FreeMobile](https://mobile.free.fr) account.
 */
export class Client {

	/**
	 * The base URL of the remote API endpoint.
	 */
	readonly baseUrl: URL;

	/**
	 * The Free Mobile password.
	 */
	readonly #password: string;

	/**
	 * The Free Mobile username.
	 */
	readonly #username: string;

	/**
	 * Creates a new client.
	 * @param username The Free Mobile username.
	 * @param password The Free Mobile password.
	 * @param baseUrl The base URL of the remote API endpoint.
	 */
	constructor(username: string, password: string, baseUrl: string|URL = "https://smsapi.free-mobile.fr") {
		const url = baseUrl instanceof URL ? baseUrl.href : baseUrl;
		this.baseUrl = new URL(url.endsWith("/") ? url : `${url}/`);
		this.#username = username;
		this.#password = password;
	}

	/**
	 * Sends an SMS message to the underlying account.
	 * @param message The message text.
	 * @returns Resolves when the message has been sent.
	 */
	async sendMessage(message: string): Promise<void> {
		const query = new URLSearchParams({msg: message.trim().slice(0, 160), pass: this.#password, user: this.#username});
		const response = await fetch(new URL(`sendmsg?${query}`, this.baseUrl), {headers: {"User-Agent": navigator.userAgent}});
		if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
	}
}
