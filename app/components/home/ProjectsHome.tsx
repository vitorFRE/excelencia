import getPropertys from '@/app/actions/getPropertys'
import Container from '../Container'
import Heading from '../Heading'
import Link from 'next/link'
import PropertyCard from '../property/PropertyCard'
import EmptyState from '../EmptyState'

const ProjectsHome = async () => {
	const casas = await getPropertys({ take: 6 })
	return (
		<Container>
			<div className='pt-[75px] flex flex-col gap-2 md:gap-0 md:flex-row justify-between'>
				<Heading
					title='Imóveis que talvez você goste!'
					subtitle='Confira nossa seleção de imóveis que podem ser perfeitos para você'
				/>
				<Link href='/' className='text-primary font-semibold'>
					Veja todos os imóveis
				</Link>
			</div>
			<>
				{casas.length === 0 ? (
					<EmptyState subtitle='Parece que houve um erro' />
				) : (
					<div className='pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-8'>
						{casas.map((property) => (
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

export default ProjectsHome
