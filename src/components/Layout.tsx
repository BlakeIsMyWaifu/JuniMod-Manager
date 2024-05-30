import { AppShell, Burger, Group, Image, Skeleton, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { type ReactNode } from 'react'

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
			<AppShell.Header>
				<Group h='100%' px='md'>
					<Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom='sm' size='sm' />
					<Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom='sm' size='sm' />
					<Image src='junimo.png' />
					<Title>JuniMod Manager</Title>
				</Group>
			</AppShell.Header>

			<AppShell.Navbar p='md'>
				<AppShell.Section grow>
					Navbar
					{Array(15)
						.fill(0)
						.map((_, index) => (
							<Skeleton key={index} h={28} mt='sm' animate={false} />
						))}
				</AppShell.Section>
				<AppShell.Section>Settings</AppShell.Section>
			</AppShell.Navbar>

			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	)
}
