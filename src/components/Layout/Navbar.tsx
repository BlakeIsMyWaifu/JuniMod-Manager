import { ActionIcon, AppShell, Group, Modal, rem, Text, TextInput, Tooltip, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus, IconSettings } from '@tabler/icons-react'
import { useState } from 'react'

import { useProfileStore } from '~/state/useProfileStore'

import classes from './Navbar.module.css'

export default function Navbar() {
	return (
		<AppShell.Navbar p='md' className={classes.navbar}>
			<AppShell.Section grow>
				<ProfilesHead />
				<ProfilesList />
			</AppShell.Section>
			<Settings />
		</AppShell.Navbar>
	)
}

function ProfilesHead() {
	const profiles = useProfileStore(state => state.profiles)
	const addProfile = useProfileStore(state => state.addProfile)
	const setActiveProfile = useProfileStore(state => state.setActiveProfile)

	const [opened, { open, close }] = useDisclosure(false)
	const [profileName, setProfileName] = useState('')
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	return (
		<>
			<Group justify='space-between' pb='xs'>
				<Text size='xs' fw={500} c='dimmed'>
					Profiles
				</Text>
				<Tooltip label='Create New Profile' withArrow position='right' color='gray'>
					<ActionIcon variant='default' size={18} onClick={open}>
						<IconPlus style={{ width: rem(12), height: rem(23) }} stroke={1.5} />
					</ActionIcon>
				</Tooltip>
			</Group>

			<Modal opened={opened} onClose={close} title='New Profile' centered>
				<TextInput
					placeholder='Profile Name'
					value={profileName}
					error={errorMessage}
					onChange={event => {
						if (errorMessage) setErrorMessage(null)
						setProfileName(event.currentTarget.value)
					}}
					onKeyDown={event => {
						if (event.key !== 'Enter') return
						if (Object.keys(profiles).includes(profileName)) {
							setErrorMessage(`${profileName} is already a profile name`)
							return
						}
						addProfile(profileName)
						setActiveProfile(profileName)
						setProfileName('')
						close()
					}}
				/>
			</Modal>
		</>
	)
}

function ProfilesList() {
	const profiles = useProfileStore(state => state.profiles)
	const activeProfile = useProfileStore(state => state.activeProfile)
	const setActiveProfile = useProfileStore(state => state.setActiveProfile)

	return Object.keys(profiles).map(name => {
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
	})
}

function Settings() {
	return (
		<AppShell.Section className={classes.footer}>
			<UnstyledButton component='a' className={classes.link} onClick={event => event.preventDefault()}>
				<IconSettings className={classes.linkIcon} stroke={1.5} />
				Settings
			</UnstyledButton>
		</AppShell.Section>
	)
}
