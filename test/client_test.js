import {strict as assert} from "assert";
import {Client, ClientError} from "../lib/index.js";

/** Tests the features of the `Client` class. */
describe("Client", function() {
	this.timeout(15000);

	describe("constructor", function() {
		it("should throw an error if the credentials are invalid", function() {
			assert.throws(() => new Client("", ""), TypeError);
		});
	});

	describe(".sendMessage()", function() {
		it("should not send invalid messages", function() {
			assert.rejects(new Client("anonymous", "secret").sendMessage(""), TypeError);
		});

		it("should reject if a network error occurred", function() {
			const endPoint = new URL("http://localhost:10000/");
			assert.rejects(new Client("anonymous", "secret", endPoint).sendMessage("Bonjour Cédric !"), ClientError);
		});

		it("should send valid messages with valid credentials", function() {
			const username = process.env.FREEMOBILE_USERNAME;
			const password = process.env.FREEMOBILE_PASSWORD;
			assert.doesNotReject(new Client(username, password).sendMessage("Bonjour Cédric, à partir de Node.js !"));
		});
	});
});
