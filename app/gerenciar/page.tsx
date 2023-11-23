import getCurrentUser from '../actions/getCurrentUser'

import EmptyState from '../components/EmptyState'

import { redirect } from 'next/navigation'
import { GerenciarClient } from './GerenciarClient'
import getPropertys from '../actions/getPropertys'

const FavoritesPage = async () => {
	const currentUser = await getCurrentUser()
	const listings = await getPropertys({})

	if (!currentUser) {
		redirect('/')
	}

	if (currentUser.role !== 'ADMIN') {
		redirect('/')
	}

	if (listings.length === 0) {
		return (
			<EmptyState
				title='Não encontrado'
				subtitle='Parece que a lista de propriedades esta vazia'
			/>
		)
	}

	return (
		<>
			<GerenciarClient listings={listings} currentUser={currentUser} />
		</>
	)
}

export default FavoritesPage
