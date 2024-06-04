import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { createActionName, persistStoreName, type Slice } from './storeTypes'

type SettingsState = {
	basePath: string | null
	apiKey: string | null
}

const settingsState: SettingsState = {
	basePath: null,
	apiKey: null
}

type SettingsAction = {
	updateBasePath: (path: SettingsState['basePath']) => void
	updateApiKey: (apiKey: SettingsState['apiKey']) => void
}

const actionName = createActionName<keyof SettingsAction>('settings')

const createSettingsAction: Slice<SettingsStore, SettingsAction> = (set, _get) => ({
	updateBasePath: path => {
		set(
			{
				basePath: path
			},
			...actionName('updateBasePath')
		)
	},

	updateApiKey: apiKey => {
		set(
			{
				apiKey
			},
			...actionName('updateApiKey')
		)
	}
})

type SettingsStore = SettingsState & SettingsAction

export const useSettingsStore = create<SettingsStore>()(
	devtools(
		persist(
			(...a) => ({
				...settingsState,
				...createSettingsAction(...a)
			}),
			{ name: persistStoreName('settings') }
		),
		{ name: 'Settings Store' }
	)
)
