import {Client} from "@cedx/free-mobile"
import console from "node:console"

# Sends an SMS notification.
try
	client = new Client "your account identifier", "your API key"
	await client.sendMessage "Hello World from Node.js!"
	console.log "The message was sent successfully."

catch error
	console.error if error instanceof Error then error.message else error
