import { fetch } from '@tauri-apps/plugin-http'

import { useSettingsStore } from '~/state/useSettingsStore'

async function request<T>({ method }: { method: string }) {
	const response = await fetch(`https://api.nexusmods.com/v1/games/stardewvalley/${method}`, {
		method: 'GET',
		headers: new Headers([['apiKey', useSettingsStore.getState().apiKey!]])
	})
	return (await response.json()) as T
}

type GetModFromId = {
	allow_rating: boolean
	author: string
	available: boolean
	category_id: number
	contains_adult_content: boolean
	created_time: string
	created_timestamp: number
	description: string
	domain_name: string
	endorsement: {
		endorse_status: string
		timestamp: unknown
		version: unknown
	}
	endorsement_count: number
	game_id: number
	mod_downloads: number
	mod_id: number
	mod_unique_downloads: number
	name: string
	picture_url: string
	status: string
	summary: string
	uid: number
	updated_time: string
	updated_timestamp: number
	uploaded_by: string
	uploaded_users_profile_url: string
	user: {
		member_id: number
		member_group_id: number
		name: string
	}
	version: string
}

export async function getModFromId({ id }: { id: number }) {
	const response = await request<GetModFromId>({ method: `mods/${id}` })
	console.log(response)
	return response
}
