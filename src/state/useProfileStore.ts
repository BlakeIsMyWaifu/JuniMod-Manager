import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { mkdir } from '~/utils/fileManager'

import { createActionName, persistStoreName, type Slice } from './storeTypes'

type ProfileData = {
	modIds: number[]
}

type ProfileState = {
	activeProfile: string | null
	profiles: Record<string, ProfileData>
}

const profileState: ProfileState = {
	activeProfile: null,
	profiles: {}
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
		const profileNames = Object.keys(get().profiles)
		if (profileNames.includes(name)) return

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

		mkdir({ folderName: name })
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
			{ name: persistStoreName('profile') }
		),
		{ name: 'Profile Store' }
	)
)
