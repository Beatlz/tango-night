interface IsHero {
	id: number | null
	name: string
	localized_name: string
	primary_attr: string
	attack_type: string
	roles: string[]
	img: string
	icon: string
	base_health: number | null
	base_health_regen: number | null
	base_mana: number | null
	base_mana_regen: number | null
	base_armor: number | null
	base_mr: number | null
	base_attack_min: number | null
	base_attack_max: number | null
	base_str: number | null
	base_agi: number | null
	base_int: number | null
	str_gain: number | null
	agi_gain: number | null
	int_gain: number | null
	attack_range: number | null
	projectile_speed: number | null
	attack_rate: number | null
	move_speed: number | null
	turn_rate: number | null
	cm_enabled: boolean
	legs: number | null
}

export default IsHero