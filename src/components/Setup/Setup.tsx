import { Modal, Stepper } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'

import { useSettingsStore } from '~/state/useSettingsStore'

import GetApiKey from './GetApiKey'
import PathImport from './PathImport'

export default function Setup() {
	const basePath = useSettingsStore(state => state.basePath)
	const apiKey = useSettingsStore(state => state.apiKey)

	const [opened, { close }] = useDisclosure(true)
	const [activeStep, setActiveStep] = useState(0)
	const nextStep = () => {
		const stepCount = 2
		setActiveStep(current => (current < stepCount ? current + 1 : current))
		if (activeStep + 1 === stepCount) {
			close()
		}
	}

	return (
		<Modal opened={opened && !(basePath && apiKey)} onClose={() => null} withCloseButton={false} centered>
			<Stepper active={activeStep} allowNextStepsSelect={false}>
				<Stepper.Step label='First Step' description='Select Install Folder'>
					<PathImport nextStep={nextStep} />
				</Stepper.Step>
				<Stepper.Step label='Second Step' description='Login to NexusMods'>
					<GetApiKey nextStep={nextStep} />
				</Stepper.Step>
			</Stepper>
		</Modal>
	)
}
