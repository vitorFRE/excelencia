import { Star } from 'lucide-react'
import Heading from '../Heading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const Feedbacks = () => {
	return (
		<section className='mt-32'>
			<Heading
				title='O Feedback dos Nossos Clientes'
				subtitle='O Que Dizem Sobre Nossos Serviços'
			/>
			<div className='pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8'>
				<div className='w-full min-h-full rounded-xl dark:bg-[#191A1E] px-4 pt-4 pb-7 border'>
					<div className='flex gap-6 mb-6'>
						<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
						<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
						<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
						<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
						<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
					</div>
					<h3 className='dark:text-slate-50 font-bold text-lg mb-2'>
						Investimento Inteligente
					</h3>
					<p className='text-sm font-medium line-clamp-3 text-slate-400 mb-8'>
						Encontrei um ótimo investimento graças a essa imobiliária. Eles entenderam
						minhas metas e me orientaram para a melhor opção. Satisfeito com o resultado
					</p>
					<div className='flex gap-3 items-center'>
						<Avatar>
							<AvatarImage src='https://github.com/shadcn.png' alt='usuario' />
							<AvatarFallback>US</AvatarFallback>
						</Avatar>
						<div className='flex flex-col'>
							<h4 className='font-medium text-slate-50'>Pedro Alves</h4>
							<span className='text-slate-500 text-xs'>Coxim-ms</span>
						</div>
					</div>
				</div>
				<div className='w-full min-h-full rounded-xl dark:bg-[#191A1E] px-4 pt-4 pb-7 border'>
					<div className='flex gap-6 mb-6'>
						<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
						<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
						<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
						<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
						<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
					</div>
					<h3 className='dark:text-slate-50 font-bold text-lg mb-2'>
						Facilitando Minha Mudança
					</h3>
					<p className='text-sm font-medium line-clamp-3 text-slate-400 mb-8'>
						Esta imobiliária tornou o processo de compra de minha nova casa uma
						experiência tranquila e sem estresse. A equipe de corretores foi excepcional
						em atender às minhas necessidades.
					</p>
					<div className='flex gap-3 items-center'>
						<Avatar>
							<AvatarImage src='https://github.com/shadcn.png' alt='usuario' />
							<AvatarFallback>US</AvatarFallback>
						</Avatar>
						<div className='flex flex-col'>
							<h4 className='font-medium text-slate-50'>Sofia Ribeiro</h4>
							<span className='text-slate-500 text-xs'>Coxim-ms</span>
						</div>
					</div>
				</div>
				<div className='w-full min-h-full rounded-xl dark:bg-[#191A1E] px-4 pt-4 pb-7 border'>
					<div className='flex gap-6 mb-6'>
						<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
						<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
						<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
						<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
						<Star size={24} fill='rgb(37 99 235)' className='text-blue-600' />
					</div>
					<h3 className='dark:text-slate-50 font-bold text-lg mb-2'>
						Corretora de Confiança
					</h3>
					<p className='text-sm font-medium line-clamp-3 text-slate-400 mb-8'>
						A corretora desta imobiliária encontrou o imóvel perfeito para mim. Sua
						paciência e conhecimento fizeram toda a diferença na minha busca. Recomendo a
						todos!
					</p>
					<div className='flex gap-3 items-center'>
						<Avatar>
							<AvatarImage src='https://github.com/shadcn.png' alt='usuario' />
							<AvatarFallback>US</AvatarFallback>
						</Avatar>
						<div className='flex flex-col'>
							<h4 className='font-medium text-slate-50'>Lucas Mendes</h4>
							<span className='text-slate-500 text-xs'>Coxim-ms</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
