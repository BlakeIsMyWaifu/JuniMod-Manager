import { Image } from '@mantine/core'
import { useState } from 'react'

export default function Junimo() {
	const [isHovering, setIsHovering] = useState(false)

	return (
		<Image
			src={`junimo.${isHovering ? 'gif' : 'png'}`}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		/>
	)
}
