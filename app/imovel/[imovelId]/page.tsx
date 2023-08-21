import getPropertyById from '@/app/actions/getPropertyById'
import EmptyState from '@/app/components/EmptyState'
import PropertyClient from './PropertyClient'
import Container from '@/app/components/Container'
import getCurrentUser from '@/app/actions/getCurrentUser'

interface IParams {
	imovelId?: string
}

const PropertyPage = async ({ params }: { params: IParams }) => {
	const { imovelId } = params

	const property = imovelId ? await getPropertyById(imovelId) : null
	const currentUser = await getCurrentUser()

	if (!property) {
		return <EmptyState />
	}

	return (
		<Container>
			<PropertyClient property={property} currentUser={currentUser} />
		</Container>
	)
}

export default PropertyPage
