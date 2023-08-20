import getCurrentUser from '../actions/getCurrentUser'
import getPropertys, { Property } from '../actions/getPropertys'
import EmptyState from '../components/EmptyState'
import PropertiesClient from './PropertiesClient'

const PropertiesPage = async () => {
	const listings: Property[] = await getPropertys({})
	const currentUser = await getCurrentUser()

	if (listings.length === 0) {
		return (
			<EmptyState
				title='Nem uma propriedade encontrada'
				subtitle='Parece que não tem propriedades disponíveis.'
			/>
		)
	}

	return <PropertiesClient listings={listings} currentUser={currentUser} />
}

export default PropertiesPage
