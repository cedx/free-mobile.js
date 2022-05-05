import assert from "node:assert/strict";
import {Client} from "../lib/index.js";

/**
 * Tests the features of the {@link Client} class.
 */
describe("Client", /** @this {Mocha.Suite} */ function() {
	this.timeout(15_000);

	describe(".sendMessage()", () => {
		it("should reject if a network error occurred", () => {
			assert.rejects(new Client("anonymous", "secret", "http://localhost:10000/").sendMessage("Hello World!"));
		});

		it("should reject if the credentials are invalid", () => {
			assert.rejects(new Client("anonymous", "secret").sendMessage("Hello World!"));
		});

		it("should send SMS messages if the credentials are valid", () => {
			const account = process.env.FREEMOBILE_ACCOUNT ?? "";
			const apiKey = process.env.FREEMOBILE_API_KEY ?? "";
			assert.doesNotReject(new Client(account, apiKey).sendMessage("Hello Cédric, from Node.js !"));
		});
	});
});
