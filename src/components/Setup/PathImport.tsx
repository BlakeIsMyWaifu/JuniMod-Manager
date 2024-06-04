import { Button, Stack, Title } from '@mantine/core'
import { open } from '@tauri-apps/plugin-dialog'

import { useSettingsStore } from '~/state/useSettingsStore'

type PathImportProps = {
	nextStep: () => void
}

export default function PathImport({ nextStep }: PathImportProps) {
	const updateBasePath = useSettingsStore(state => state.updateBasePath)

	return (
		<Stack align='center'>
			<Title order={2} style={{ textAlign: 'center' }}>
				Select Stardew Valley Install Folder
			</Title>
			<Button
				variant='default'
				onClick={() => {
					open({
						directory: true,
						defaultPath: 'C:\\Program Files (x86)\\Steam\\SteamApps\\common\\Stardew Valley'
					})
						.then(selected => {
							updateBasePath(selected)
							if (selected) {
								nextStep()
							}
						})
						.catch(console.error)
				}}
			>
				Select Folder
			</Button>
		</Stack>
	)
}
