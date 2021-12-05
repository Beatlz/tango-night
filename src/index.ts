require("module-alias/register")
// Local assets
import Constants from "@constants/config"
import Credentials from "@constants/credentials"
import Tango from "@modules/Tango"
// Node modules
import { Client } from "discord.js"

const client = new Client()
const { user } = client
const { prefix } = Constants

client.on("ready", () => {
	console.log(`Logged in as ${user}!`)
})

client.on("message", msg => {
	const { content, author } = msg

	if (!content.startsWith(prefix) || author.bot || content.split(prefix).length <= 1)
		return

	const tango = new Tango(msg)
	const command = tango.command

})
	
client.login(Credentials.token)
