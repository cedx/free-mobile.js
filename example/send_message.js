import {Client} from "@cedx/free-mobile";
import console from "node:console";

// Sends an SMS notification.
try {
	const client = new Client("your account identifier", "your API key");
	await client.sendMessage("Hello World from Node.js!");
	console.log("The message was sent successfully.");
}
catch (error) {
	const message = error instanceof Error ? error.message : String(error);
	console.log(`An error occurred: ${message}`);
}
