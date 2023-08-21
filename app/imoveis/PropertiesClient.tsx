import EmptyState from '../components/EmptyState'
import Container from '../components/Container'
import Heading from '../components/Heading'
import PropertyCard from '../components/property/PropertyCard'
import { Property } from '../actions/getPropertys'
import { SafeUser } from '../types'
import DeleteProperty from '../components/deleteProperty/DeleteProperty'

interface PropertiesCleintProps {
	listings: Property[]
	currentUser?: SafeUser | null
}

const PropertiesClient: React.FC<PropertiesCleintProps> = ({ listings, currentUser }) => {
	return (
		<Container>
			<div className='pt-[75px]'>
				<Heading
					title='Propriedades'
					subtitle='Lista de nossas propriedades disponíveis'
				/>
			</div>
			<>
				{listings.length === 0 ? (
					<EmptyState subtitle='Parece que houve um erro' />
				) : (
					<div className='pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-8'>
						{listings.map((property) => (
							<div key={property.title}>
								<PropertyCard
									image={
										property.images && property.images[0]
											? property.images[0].imageUrl
											: ''
									}
									city={property.city}
									state={property.state}
									title={property.title}
									locationValue={property.locationValue}
									description={property.description}
									id={property.id}
									currentUser={currentUser}
								/>
								{property.images && property.images.length > 0 && (
									<DeleteProperty
										propertyId={property.id}
										imageIds={property.images.map((image) => image.imageId)}
									/>
								)}
							</div>
						))}
					</div>
				)}
			</>
		</Container>
	)
}

export default PropertiesClient
