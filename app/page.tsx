import Container from './components/Container'
import Heading from './components/Heading'
import ProjectsHome from './components/home/ProjectsHome'
import { LuDollarSign, LuHome, LuWallet } from 'react-icons/lu'
import { Feedbacks } from './components/home/feedbacks'
import { HeroSection } from './components/home/hero-section'

const infos = [
	{
		icon: <LuDollarSign className='text-blue-600 mb-6' size={45} />,
		titulo: 'Financiamento habitacional',
		descrição:
			'Oferecemos empréstimos com condições vantajosas e sem a necessidade de avalista para funcionários de órgãos conveniados e aposentados do INSS. Aproveite nossas excelentes condições de crédito.'
	},
	{
		icon: <LuHome className='text-blue-600 mb-6' size={45} />,
		titulo: 'Anuncie seu Imóvel',
		descrição:
			'Divulgue o seu imóvel conosco! Temos as melhores opções de anúncios para você que deseja vender ou alugar a sua propriedade. Conte com a nossa equipe especializada e alcance um público maior.'
	},
	{
		icon: <LuWallet className='text-blue-600 mb-6' size={45} />,
		titulo: 'Empréstimos Consignado',
		descrição:
			'Precisando de dinheiro? Faça um empréstimo consignado! Com taxas de juros reduzidas e pagamento facilitado, o empréstimo consignado é a solução ideal para quem precisa de dinheiro rápido e sem burocracia.'
	}
]

export default function Home() {
	return (
		<main className=''>
			<HeroSection />
			<ProjectsHome />
			<Container>
				<Feedbacks />
				<section className='pt-[75px]'>
					<Heading title='Nossos serviços' subtitle='Confira alguns de nossos serviços' />

					<div className='pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8'>
						{infos.map((i) => (
							<div key={i.titulo} className='border  rounded-lg py-5 px-4'>
								{i.icon}
								<h2 className='font-semibold text-xl dark:text-slate-50 mb-2'>
									{i.titulo}
								</h2>
								<p className='dark:text-slate-400'>{i.descrição}</p>
							</div>
						))}
					</div>
				</section>
			</Container>
		</main>
	)
}
