# Sends messages by SMS to a [FreeMobile](https://mobile.free.fr) account.
export class Client

	# Creates a new client.
	constructor: (account, apiKey, baseUrl = "https://smsapi.free-mobile.fr") ->
		url = if baseUrl instanceof URL then baseUrl.href else baseUrl
		@account = account
		@apiKey = apiKey
		@baseUrl = new URL(if url.endsWith("/") then url else "#{url}/")

	# Sends an SMS message to the underlying account.
	sendMessage: (message) ->
		query = new URLSearchParams msg: message.trim()[...160], pass: @apiKey, user: @account
		response = await fetch new URL("sendmsg?#{query}", @baseUrl), headers: {"user-agent": navigator.userAgent}
		throw Error "#{response.status} #{response.statusText}" unless response.ok
