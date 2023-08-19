import getPropertys, { Property } from '../actions/getPropertys'
import EmptyState from '../components/EmptyState'
import PropertiesClient from './PropertiesClient'

const PropertiesPage = async () => {
	const listings: Property[] = await getPropertys({})

	if (listings.length === 0) {
		return (
			<EmptyState
				title='Nem uma propriedade encontrada'
				subtitle='Parece que não tem propriedades disponíveis.'
			/>
		)
	}

	return <PropertiesClient listings={listings} />
}

export default PropertiesPage
