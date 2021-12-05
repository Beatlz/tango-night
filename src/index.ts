// Local json
import * as Credentials from "@constants/credentials.json"
import * as Constants from "@constants/config.json"
// Local TS Files
import Tango from "@modules/Tango"
import { Client } from "discord.js"

const client = new Client()
const { user } = client
const { prefix } = Constants

client.on("ready", () => {
	console.log(`Logged in as ${user}!`)
})

client.on("message", msg => {
	const { content, author } = msg

	if (!content.startsWith(prefix) || author.bot || content.split(prefix).length <= 1) return

	const tango = new Tango(msg)

	console.log(tango.msgParamsString)
	
	if (tango.hasHero().id) {
		msg.channel.send(tango.hasHero().localized_name)
	} else {
		msg.channel.send(`No hero was found ${content}`)
	}
})
	
client.login(Credentials.token)