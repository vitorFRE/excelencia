import { Star } from 'lucide-react'
import Heading from '../Heading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import FeatureCard from '../Cards'

const infos = [
	{
		title: 'Investimento Inteligente',
		rating: 5,
		testimonial:
			'Encontrei um ótimo investimento graças a essa imobiliária. Eles entenderam minhas metas e me orientaram para a melhor opção. Satisfeito com o resultado',
		author: {
			name: 'Pedro Alves',
			location: 'Coxim-ms',
			avatarURL: 'https://github.com/shadcn.png'
		}
	},
	{
		title: 'Facilitando Minha Mudança',
		rating: 5,
		testimonial:
			'Esta imobiliária tornou o processo de compra de minha nova casa uma experiência tranquila e sem estresse. A equipe de corretores foi excepcional em atender às minhas necessidades.',
		author: {
			name: 'Sofia Ribeiro',
			location: 'Coxim-ms',
			avatarURL: 'https://github.com/shadcn.png'
		}
	},
	{
		title: 'Corretora de Confiança',
		rating: 5,
		testimonial:
			'A corretora desta imobiliária encontrou o imóvel perfeito para mim. Sua paciência e conhecimento fizeram toda a diferença na minha busca. Recomendo a todos!',
		author: {
			name: 'Lucas Mendes',
			location: 'Coxim-ms',
			avatarURL: 'https://github.com/shadcn.png'
		}
	}
]

export const Feedbacks = () => {
	return (
		<section className='mt-32'>
			<Heading
				title='O Feedback dos Nossos Clientes'
				subtitle='O Que Dizem Sobre Nossos Serviços'
			/>
			<div className='pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8'>
				{infos.map((i) => (
					<FeatureCard key={i.title} bgClass='bg-red'>
						<div className='flex gap-6 mb-6'>
							<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
							<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
							<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
							<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
							<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
						</div>
						<h3 className='dark:text-white font-bold text-lg mb-2'>{i.title}</h3>
						<p className='text-sm font-medium line-clamp-3 dark:text-gray-400 mb-8'>
							{i.testimonial}
						</p>
						<div className='flex gap-3 items-center'>
							<Avatar>
								<AvatarImage src='https://github.com/shadcn.png' alt='usuario' />
								<AvatarFallback>US</AvatarFallback>
							</Avatar>
							<div className='flex flex-col'>
								<h4 className='font-medium text-slate-600 dark:text-white'>
									{i.author.name}
								</h4>
								<span className='text-slate-500 dark:text-gray-500 text-xs'>
									{i.author.location}
								</span>
							</div>
						</div>
					</FeatureCard>
				))}
			</div>
		</section>
	)
}
