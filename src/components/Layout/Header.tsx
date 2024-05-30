import { AppShell, Burger, Group, Title } from '@mantine/core'

import Junimo from '~/components/Junimo'

type HeaderProps = {
	desktopOpened: boolean
	mobileOpened: boolean
	toggleDesktop: () => void
	toggleMobile: () => void
}

export default function Header({ desktopOpened, mobileOpened, toggleDesktop, toggleMobile }: HeaderProps) {
	return (
		<AppShell.Header>
			<Group h='100%' px='md'>
				<Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom='sm' size='sm' />
				<Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom='sm' size='sm' />
				<Junimo />
				<Title>JuniMod Manager</Title>
			</Group>
		</AppShell.Header>
	)
}
