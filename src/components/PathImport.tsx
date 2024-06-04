import { Button, Modal, Stack, Title } from '@mantine/core'
import { open } from '@tauri-apps/plugin-dialog'

import { useSettingsStore } from '~/state/useSettingsStore'

export default function PathImport() {
	const basePath = useSettingsStore(state => state.basePath)
	const updateBasePath = useSettingsStore(state => state.updateBasePath)

	return (
		<Modal opened={!basePath} onClose={() => null} withCloseButton={false} centered>
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
							})
							.catch(console.error)
					}}
				>
					Select Folder
				</Button>
			</Stack>
		</Modal>
	)
}
