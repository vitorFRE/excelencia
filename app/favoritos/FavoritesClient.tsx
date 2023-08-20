import { FullFavoriteInfo, SafeUser } from '@/app/types'

import Heading from '@/app/components/Heading'
import Container from '@/app/components/Container'
import PropertyCard from '../components/property/PropertyCard'

interface FavoritesClientProps {
	listings: FullFavoriteInfo[]
	currentUser?: SafeUser | null
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({ listings, currentUser }) => {
	return (
		<Container>
			<div className='mt-[75px]'>
				<Heading title='Favoritos' subtitle='Lista de seus lugares favoritos!' />
			</div>
			<div className='pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-8'>
				{listings.map((listing) => (
					<PropertyCard
						image={listing.property.images[0].imageUrl}
						key={listing.id}
						city={listing.property.city}
						state={listing.property.state}
						title={listing.property.title}
						locationValue={listing.property.locationValue}
						description={listing.property.description}
						id={listing.property.id}
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}

export default FavoritesClient
