import { Container, Text } from '@mantine/core'

import Layout from './components/Layout'
import PathImport from './components/PathImport'

export default function App() {
	return (
		<>
			<PathImport />

			<Layout>
				<Container>
					<Text>No Profiles Created Yet</Text>
				</Container>
			</Layout>
		</>
	)
}
