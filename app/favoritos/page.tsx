import getCurrentUser from '../actions/getCurrentUser'
import getFavoriteListings from '../actions/getFavoriteListings'
import EmptyState from '../../components/EmptyState'
import FavoritesClient from './FavoritesClient'
import { redirect } from 'next/navigation'

const FavoritesPage = async () => {
	const listings = await getFavoriteListings()
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		redirect('/')
	}

	if (listings.length === 0) {
		return (
			<EmptyState
				title='Não encontrado'
				subtitle='Parece que você mão tem nem um favorito'
			/>
		)
	}

	return (
		<div>
			<FavoritesClient listings={listings} currentUser={currentUser} />
		</div>
	)
}

export default FavoritesPage
