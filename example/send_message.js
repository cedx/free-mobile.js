import console from "node:console";
import {Client} from "@cedx/free-mobile";

// Sends an SMS notification.
try {
	const client = new Client("your account identifier", "your API key");
	await client.sendMessage("Hello World from Node.js!");
	console.log("The message was sent successfully.");
}
catch (error) {
	console.log(`An error occurred: ${error}`);
}
