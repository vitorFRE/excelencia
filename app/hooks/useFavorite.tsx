import axios from 'axios'
import { useRouter } from 'next/navigation'

import useLoginModal from './useLoginModal'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { SafeUser } from '../types'

interface IUseFavorite {
	propertyId: string
	currentUser?: SafeUser | null
}

const useFavorite = ({ propertyId, currentUser }: IUseFavorite) => {
	const router = useRouter()
	const loginModal = useLoginModal()

	const hasFavorited = useMemo(() => {
		const list = currentUser?.favorites || []

		return list.some((favorite) => favorite.propertyId === propertyId)
	}, [currentUser, propertyId])

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation()

			if (!currentUser) {
				return loginModal.onOpen()
			}

			try {
				let request

				if (hasFavorited) {
					request = () => axios.delete(`/api/favorites/${propertyId}`)
				} else {
					request = () => axios.post(`/api/favorites/${propertyId}`)
				}

				await request()
				router.refresh()
				toast.success(
					hasFavorited ? 'Desfavoritado com sucesso' : 'Favoritado com sucesso'
				)
			} catch (error) {
				toast.error('Algo deu errado')
			}
		},
		[currentUser, hasFavorited, propertyId, loginModal, router]
	)

	return { hasFavorited, toggleFavorite }
}

export default useFavorite
