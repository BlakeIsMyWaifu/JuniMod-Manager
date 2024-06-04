import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { createActionName, persistStoreName, type Slice } from './storeTypes'

type SettingsState = {
	basePath: string | null
}

const settingsState: SettingsState = {
	basePath: null
}

type SettingsAction = {
	updateBasePath: (path: SettingsState['basePath']) => void
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
