import { useEffect } from 'react'

const useDisableScroll = (elementIds: string[]) => {
	useEffect(() => {
		const handleWheel = (event: WheelEvent) => {
			event.preventDefault()
		}

		const addWheelListener = (id: string) => {
			const element = document.getElementById(id)
			if (element) {
				element.addEventListener('wheel', handleWheel)
			}
		}

		const removeWheelListener = (id: string) => {
			const element = document.getElementById(id)
			if (element) {
				element.removeEventListener('wheel', handleWheel)
			}
		}

		elementIds.forEach((id) => {
			addWheelListener(id)
		})

		return () => {
			elementIds.forEach((id) => {
				removeWheelListener(id)
			})
		}
	}, [elementIds])
}

export default useDisableScroll
