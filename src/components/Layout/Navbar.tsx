import { ActionIcon, AppShell, Group, rem, Text, Tooltip, UnstyledButton } from '@mantine/core'
import { IconPlus, IconSettings } from '@tabler/icons-react'

import { useProfileStore } from '~/state/useProfileStore'

import classes from './Navbar.module.css'

export default function Navbar() {
	const profiles = useProfileStore(state => state.profiles)
	const activeProfile = useProfileStore(state => state.activeProfile)
	const setActiveProfile = useProfileStore(state => state.setActiveProfile)

	return (
		<AppShell.Navbar p='md' className={classes.navbar}>
			<AppShell.Section grow>
				<Group justify='space-between' pb='xs'>
					<Text size='xs' fw={500} c='dimmed'>
						Profiles
					</Text>
					<Tooltip label='Create New Profile' withArrow position='right' color='gray'>
						<ActionIcon variant='default' size={18}>
							<IconPlus style={{ width: rem(12), height: rem(23) }} stroke={1.5} />
						</ActionIcon>
					</Tooltip>
				</Group>

				{Object.keys(profiles).map(name => {
					return (
						<UnstyledButton
							component='a'
							key={name}
							className={classes.link}
							data-active={activeProfile === name || null}
							onClick={() => setActiveProfile(name)}
						>
							{name}
						</UnstyledButton>
					)
				})}
			</AppShell.Section>

			<AppShell.Section className={classes.footer}>
				<UnstyledButton component='a' className={classes.link} onClick={event => event.preventDefault()}>
					<IconSettings className={classes.linkIcon} stroke={1.5} />
					Settings
				</UnstyledButton>
			</AppShell.Section>
		</AppShell.Navbar>
	)
}
