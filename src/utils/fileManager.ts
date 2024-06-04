import { mkdir as tauri_mkdir } from '@tauri-apps/plugin-fs'

import { useSettingsStore } from '~/state/useSettingsStore'

type MkdirOptions = {
	folderName: string
}

export function mkdir({ folderName }: MkdirOptions) {
	const { basePath } = useSettingsStore.getState()

	tauri_mkdir(`${basePath}\\junimod-${folderName}`).catch(console.error)
}
