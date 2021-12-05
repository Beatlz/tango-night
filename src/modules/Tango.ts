require("module-alias/register")
// Local assets
import Heroes from "@constants/heroes"
import HeroNames from "@constants/heroNames"
import Config from "@constants/config"
// Local templates and interfaces
import IsHero from "@interfaces/IsHero"
import emptyHero from "@templates/HeroTemplate"
// Node modules
import Fuse from "fuse.js"
import { Message, User } from "discord.js"

class Tango {
		command: string
		mention: User | false
		msg: Message
		msgParams: string[]
		msgParamsString: string

		constructor(message: Message) {
			this.msg = message
			this.command = message.content.split(".")[1]
			this.mention = this.hasMention()
			this.msgParams = message.content.split(" ").slice(1)
			this.msgParamsString = this.msgParams.join(" ")
		}

		hasHero(): IsHero {
			const hasParams = this.hasParams()

			if (!hasParams)
				return emptyHero

			const params = this.msgParams
			const heroSearchParam = params.find(param => !param.includes("dota.") && !param.includes("@") && !param.includes("="))

			if (!heroSearchParam)
				return emptyHero

			const fuse = new Fuse(HeroNames, {
				includeScore: true,
				shouldSort: true,
				threshold: Config.heroFuzzyThreshold,
			})

			const heroNameSearch = fuse.search(heroSearchParam).shift()

			if (!heroNameSearch)
				return emptyHero

			const hero = Heroes.find(hero => hero.localized_name === heroNameSearch.item) || emptyHero
			
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
			if (!this.msgParams)
				return 0
			
			return this.msgParams.length
		}

		queryParams(): string {
			const params = this.msgParams.filter((param: string) => param.includes("="))

			return `?${params.join("&")}`
		}

		apiUrl(url: string): string {
			return `${Config.apiServer}/${url}/${this.queryParams()}`
		}
}

export default Tango
