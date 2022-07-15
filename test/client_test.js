import assert from "node:assert/strict";
import {env} from "node:process";
// @ts-expect-error TS2614
import {describe, it} from "node:test";
import {Client} from "../src/index.js";

/**
 * Tests the features of the {@link Client} class.
 */
describe("Client", () => {
	describe(".sendMessage()", () => {
		it("should reject if a network error occurred", () => {
			assert.rejects(new Client("anonymous", "secret", "http://localhost:10000/").sendMessage("Hello World!"));
		});

		it("should reject if the credentials are invalid", () => {
			assert.rejects(new Client("anonymous", "secret").sendMessage("Hello World!"));
		});

		it("should send SMS messages if the credentials are valid", () => {
			const account = env.FREEMOBILE_ACCOUNT ?? "";
			const apiKey = env.FREEMOBILE_API_KEY ?? "";
			return assert.doesNotReject(new Client(account, apiKey).sendMessage("Hello Cédric, from Node.js !"));
		});
	});
});
