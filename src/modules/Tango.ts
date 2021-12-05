// Local json
import Heroes = require("@constants/heroes.json")
import HeroNames = require("@constants/heroNames.json")
import Config = require("@constants/config.json")
// Local TS Files
import IsHero from "@interfaces/IsHero"
import emptyHero from "@templates/HeroTemplate"
// Node modules
import Fuse from "fuse.js"
import { Message, User } from "discord.js"

class Tango {
		msg: Message
		msgParams: string[]
		msgParamsString: string
		mention: User | false

		constructor(message: Message) {
			this.msg = message
			this.mention = this.hasMention() 
			this.msgParams = message.content.split(" ").slice(1)
			this.msgParamsString = this.msgParams.join(" ")
		}

		hasHero(): IsHero {
			const hasParams = this.hasParams()

			if (!hasParams)
				return emptyHero

			const params = this.msgParams

			const result = params.map(param => {
				const fuse = new Fuse(HeroNames, {
					includeScore: true,
					shouldSort: true,
					threshold: Config.heroFuzzyThreshold
				})
				
				return fuse.search(param).shift()
			})

			if (!result)
				return emptyHero

			const heroObject = result.sort((a: { score: number }, b: { score: number }) => a.score - b.score).shift()
			const hero = Heroes[heroObject.refIndex]
			
			return hero
		}

		hasMention(): User | false {
			const hasParams = this.hasParams()

			if (!hasParams)
				return false

			const user = this.msg.mentions.users.first() || false

			return user
		}

		hasParams(): number {
			return this.msgParams.length
		}
}

export default Tango
