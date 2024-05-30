import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { type ReactNode } from 'react'

import Header from './Header'
import Navbar from './Navbar'

type LayoutProps = {
	children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: 'sm',
				collapsed: { mobile: !mobileOpened, desktop: !desktopOpened }
			}}
			padding='md'
		>
			<Header
				desktopOpened={desktopOpened}
				mobileOpened={mobileOpened}
				toggleDesktop={toggleDesktop}
				toggleMobile={toggleMobile}
			/>

			<Navbar />

			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	)
}
