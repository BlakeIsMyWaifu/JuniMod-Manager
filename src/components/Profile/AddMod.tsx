import { NumberInput } from '@mantine/core'
import { useState } from 'react'

import { getModFromId } from '~/utils/nexusApi'

export default function AddMod() {
	const [searchValue, setSearchValue] = useState<string | number>('')

	return (
		<NumberInput
			hideControls
			value={searchValue}
			onChange={setSearchValue}
			label='Add Mod From ID'
			placeholder='12345'
			max={99999}
			min={0}
			onKeyDown={event => {
				if (event.key !== 'Enter') return
				getModFromId({ id: +searchValue }).catch(console.error)
			}}
		/>
	)
}
