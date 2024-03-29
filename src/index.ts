/* eslint-disable @typescript-eslint/ban-ts-comment */
require("module-alias/register")
// Local assets
import Config from "@constants/config"
import Credentials from "@constants/credentials"
import Tango from "@modules/Tango"
// Node modules
import { Client } from "discord.js"
// Commands
import commandNotFound from "@commands/commandNotFound"
import ping from "@commands/ping"

type commandFn = (param: Tango) => string

const commands: {[index: string]: commandFn} = {
	commandNotFound,
	ping,
}

const client = new Client()
const { prefix } = Config

client.on("ready", () => {
	const { user } = client

	console.log(`Logged in as ${user}!`)
})

client.on("message", msg => {
	const { content, author } = msg

	if (!content.startsWith(prefix) || author.bot || content.split(prefix).length <= 1)
		return

	const tango = new Tango(msg)
	const { command } = tango
	const commandList = Object.keys(commands)
	const cmd: string = commandList.find(c => c === command) || "commandNotFound"
	
	commands[cmd](tango)
})
	
client.login(Credentials.token)
