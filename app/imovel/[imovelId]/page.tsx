import getPropertyById from '@/app/actions/getPropertyById'
import EmptyState from '@/components/EmptyState'
import PropertyClient from './PropertyClient'
import Container from '@/components/Container'
import getCurrentUser from '@/app/actions/getCurrentUser'
import getPropertys from '@/app/actions/getPropertys'

interface IParams {
	imovelId?: string
}

const PropertyPage = async ({ params }: { params: IParams }) => {
	const { imovelId } = params

	const property = imovelId ? await getPropertyById(imovelId) : null
	const recentProperties = await getPropertys({ take: 3 })
	const currentUser = await getCurrentUser()

	if (!property) {
		return <EmptyState />
	}

	return (
		<Container>
			<PropertyClient
				property={property}
				currentUser={currentUser}
				recentProperties={recentProperties}
			/>
		</Container>
	)
}

export default PropertyPage
