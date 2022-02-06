import Tango from "@modules/Tango"

const commandNotFound = (tango: Tango): string => {
	return `${tango.command} is not a command.`
}

export default commandNotFound
