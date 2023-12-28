'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export const HeroSection = () => {
	const router = useRouter()
	return (
		<section className='h-[350px] relative bg-center bg-cover bg-hero-bg'>
			<div className='absolute inset-0 bg-black opacity-80'></div>
			<div className='max-w-[670px] text-center text-white flex flex-col gap-4 justify-center items-center h-full mx-auto relative z-10'>
				<h1 className='text-4xl font-bold text-slate-50'>
					Encontre Seu Lugar, em um Único Lugar
				</h1>
				<p className='text-lg text-slate-200 max-w-md'>
					Descubra as Melhores Opções de Casas, Apartamentos e Terrenos com a Nossa Ajuda
				</p>
				<Button
					className='bg-blue-600 text-white hover:bg-blue-700'
					onClick={() => router.push('/imoveis')}>
					Quero o meu lugar
				</Button>
			</div>
		</section>
	)
}
