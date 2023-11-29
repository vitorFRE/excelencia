import { Property } from '../actions/getPropertys'
import PropertyCard from '../components/property/PropertyCard'
import { SafeUser } from '../types'

interface GerenciarProps {
	listings: Property[]
	currentUser?: SafeUser | null
}

export const GerenciarClient: React.FC<GerenciarProps> = ({ listings, currentUser }) => {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8'>
			{listings.map((property) => (
				<PropertyCard
					image={property.images && property.images[0] ? property.images[0].imageUrl : ''}
					key={property.title}
					city={property.city}
					state={property.state}
					title={property.title}
					locationValue={property.locationValue}
					description={property.description}
					id={property.id}
					currentUser={currentUser}
					imageIds={property.images ? property.images.map((image) => image.imageId) : []}
					deleteButton
				/>
			))}
		</div>
	)
}
