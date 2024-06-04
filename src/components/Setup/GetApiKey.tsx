import { Button, Stack, Title } from '@mantine/core'
import { useState } from 'react'

import useMountEffect from '~/hooks/useMountEffect'
import { useSettingsStore } from '~/state/useSettingsStore'

type WebsocketResponse = {
	success: boolean
	error: string | null
	data: ConnectionToken | ApiKey
}

type ConnectionToken = {
	connection_token: string
}

type ApiKey = {
	api_key: string
}

function isApiKey(data: WebsocketResponse['data']): data is ApiKey {
	return !!(data as ApiKey).api_key
}
function isConnectionToken(data: WebsocketResponse['data']): data is ConnectionToken {
	return !!(data as ConnectionToken).connection_token
}

type GetApiKeyProps = {
	nextStep: () => void
}

export default function GetApiKey({ nextStep }: GetApiKeyProps) {
	const updateApiKey = useSettingsStore(state => state.updateApiKey)

	const [link, setLink] = useState('')
	const [connectionToken, setConnectionToken] = useState<string | null>(null)

	useMountEffect(() => {
		const uuid = crypto.randomUUID()

		const socket = new WebSocket('wss://sso.nexusmods.com')
		socket.addEventListener('open', _event => {
			const data = {
				id: uuid,
				token: connectionToken,
				protocol: 2
			}

			socket.send(JSON.stringify(data))

			setLink(`https://www.nexusmods.com/sso?id=${uuid}`)
		})

		socket.addEventListener('message', (event: MessageEvent<string>) => {
			const response = JSON.parse(event.data) as WebsocketResponse
			if (!response.success) {
				console.error(response.error)
				return
			}

			if (isApiKey(response.data) && response.data.api_key) {
				updateApiKey(response.data.api_key)
				nextStep()
			} else if (isConnectionToken(response.data)) {
				setConnectionToken(response.data.connection_token)
			}
		})
	})

	return (
		<Stack align='center'>
			<Title order={2}>Login to NexusMods</Title>
			<Button variant='default' component='a' href={link} target='_blank'>
				Login
			</Button>
		</Stack>
	)
}
