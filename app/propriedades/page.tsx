import { redirect } from 'next/navigation'
import getCurrentUser from '../actions/getCurrentUser'
import getPropertys from '../actions/getPropertys'
import EmptyState from '../components/EmptyState'
import PropertysPageClient from './PropertysPageClient'

const PropertysPage = async () => {
	const listings = await getPropertys({})
	const currentUser = await getCurrentUser()

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
				subtitle='Parece que você mão tem nem uma propriedade registrada'
			/>
		)
	}

	return (
		<div>
			<PropertysPageClient listings={listings} currentUser={currentUser} />
		</div>
	)
}

export default PropertysPage
