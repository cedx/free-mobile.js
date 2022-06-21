import assert from "node:assert/strict";
import {env} from "node:process";
import test from "node:test";
import {Client} from "../lib/index.js";

test(".sendMessage()", async ctx => {
	await ctx.test("should reject if a network error occurred", () => {
		assert.rejects(new Client("anonymous", "secret", "http://localhost:10000/").sendMessage("Hello World!"));
	});

	await ctx.test("should reject if the credentials are invalid", () => {
		assert.rejects(new Client("anonymous", "secret").sendMessage("Hello World!"));
	});

	await ctx.test("should send SMS messages if the credentials are valid", () => {
		const account = env.FREEMOBILE_ACCOUNT ?? "";
		const apiKey = env.FREEMOBILE_API_KEY ?? "";
		return assert.doesNotReject(new Client(account, apiKey).sendMessage("Hello Cédric, from Node.js !"));
	});
});
