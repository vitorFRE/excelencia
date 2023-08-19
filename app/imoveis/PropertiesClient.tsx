import EmptyState from '../components/EmptyState'
import Container from '../components/Container'
import Heading from '../components/Heading'
import PropertyCard from '../components/property/PropertyCard'
import { Property } from '../actions/getPropertys'

interface PropertiesCleintProps {
	listings: Property[]
}

const PropertiesClient: React.FC<PropertiesCleintProps> = ({ listings }) => {
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
							<PropertyCard
								image={
									property.images && property.images[0] ? property.images[0].imageUrl : ''
								}
								key={property.title}
								city={property.city}
								state={property.state}
								title={property.title}
								locationValue={property.locationValue}
								description={property.description}
							/>
						))}
					</div>
				)}
			</>
		</Container>
	)
}

export default PropertiesClient
