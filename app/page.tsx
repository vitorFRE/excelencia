import Container from './components/Container'
import Heading from './components/Heading'
import Hero from './components/home/Hero'
import ProjectsHome from './components/home/ProjectsHome'
import { LuDollarSign, LuHome, LuWallet } from 'react-icons/lu'

const infos = [
	{
		icon: <LuDollarSign className='text-primary mb-6' size={45} />,
		titulo: 'Financiamento habitacional',
		descrição:
			'Oferecemos empréstimos com condições vantajosas e sem a necessidade de avalista para funcionários de órgãos conveniados e aposentados do INSS. Aproveite nossas excelentes condições de crédito.'
	},
	{
		icon: <LuHome className='text-primary mb-6' size={45} />,
		titulo: 'Anuncie seu Imóvel',
		descrição:
			'Divulgue o seu imóvel conosco! Temos as melhores opções de anúncios para você que deseja vender ou alugar a sua propriedade. Conte com a nossa equipe especializada e alcance um público maior.'
	},
	{
		icon: <LuWallet className='text-primary mb-6' size={45} />,
		titulo: 'Empréstimos Consignado',
		descrição:
			'Precisando de dinheiro? Faça um empréstimo consignado! Com taxas de juros reduzidas e pagamento facilitado, o empréstimo consignado é a solução ideal para quem precisa de dinheiro rápido e sem burocracia.'
	}
]

export default function Home() {
	return (
		<main className=''>
			<Hero />
			<ProjectsHome />
			<Container>
				<section className='pt-[75px]'>
					<Heading title='Nossos serviços' subtitle='Confira alguns de nossos serviços' />

					<div className='pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8'>
						{infos.map((i) => (
							<div
								key={i.titulo}
								className='bg-white/70 border border-cBorder rounded-lg py-5 px-4'>
								{i.icon}
								<h2 className='font-semibold text-2xl mb-2'>{i.titulo}</h2>
								<p className='text-[#374151]'>{i.descrição}</p>
							</div>
						))}
					</div>
				</section>
			</Container>
		</main>
	)
}
