import Container from '../Container'
import Heading from '../Heading'
import Link from 'next/link'

const ProjectsHome = () => {
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
		</Container>
	)
}

export default ProjectsHome
