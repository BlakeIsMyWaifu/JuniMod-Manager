import { type EffectCallback, useEffect } from 'react'

export default function useMountEffect(func: EffectCallback) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(func, [])
}
