import { Container, Text } from '@mantine/core'

import Layout from './components/Layout'
import Profile from './components/Profile'
import Setup from './components/Setup'
import { useProfileStore } from './state/useProfileStore'

export default function App() {
	const activeProfile = useProfileStore(state => state.activeProfile)

	return (
		<>
			<Setup />

			<Layout>
				{activeProfile ? (
					<Profile />
				) : (
					<Container>
						<Text>No Profiles Created Yet</Text>
					</Container>
				)}
			</Layout>
		</>
	)
}
