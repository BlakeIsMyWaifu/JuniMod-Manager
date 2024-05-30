import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { createActionName, persistStoreName, type Slice } from './storeTypes'

type ProfileData = {
	modIds: number[]
}

type ProfileState = {
	activeProfile: string
	profiles: Record<string, ProfileData>
}

const profileState: ProfileState = {
	activeProfile: 'New Profile 1',
	profiles: {
		'New Profile 1': { modIds: [] },
		'New Profile 2': { modIds: [] },
		'New Profile 3': { modIds: [] },
		'New Profile 4': { modIds: [] },
		'New Profile 5': { modIds: [] },
		'New Profile 6': { modIds: [] }
	}
}

type ProfileAction = {
	setActiveProfile: (name: string) => void
	addProfile: (name: string) => void
}

const actionName = createActionName<keyof ProfileAction>('profile')

const createModpackAction: Slice<ProfileStore, ProfileAction> = (set, get) => ({
	setActiveProfile: name => {
		const profileNames = Object.keys(get().profiles)
		if (!profileNames.includes(name)) return

		set(
			{
				activeProfile: name
			},
			...actionName('setActiveProfile')
		)
	},

	addProfile: name => {
		const blankProfile: ProfileData = {
			modIds: []
		}

		set(
			state => ({
				profiles: {
					...state.profiles,
					[name]: blankProfile
				}
			}),
			...actionName('addProfile')
		)
	}
})

type ProfileStore = ProfileState & ProfileAction

export const useProfileStore = create<ProfileStore>()(
	devtools(
		persist(
			(...a) => ({
				...profileState,
				...createModpackAction(...a)
			}),
			{ name: persistStoreName('modpack') }
		),
		{ name: 'Modpack Store' }
	)
)
