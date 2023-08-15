import getPropertys from '@/app/actions/getPropertys'
import Container from '../Container'
import Heading from '../Heading'
import Link from 'next/link'
import PropertyCard from '../property/PropertyCard'
import EmptyState from '../EmptyState'

const ProjectsHome = async () => {
	const casas = await getPropertys({})
	return (
		<Container>
			<div className='pt-[75px] flex flex-row justify-between'>
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
					<div className='flex gap-4'>
						{casas.map((property) => (
							<PropertyCard
								image={property.images[0]?.imageUrl}
								key={property.title}
								title={property.title}
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
