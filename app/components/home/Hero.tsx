'use client'

import Button from '../Button'

const Hero = () => {
	return (
		<section className='h-[500px] relative bg-center bg-cover bg-hero-bg'>
			<div className='absolute inset-0 bg-black opacity-80'></div>
			<div className='max-w-[670px] text-center text-white flex flex-col justify-center items-center h-full mx-auto relative z-10'>
				<h1 className='text-4xl md:text-6xl font-bold'>
					Encontre Seu Lugar, em um Único Lugar
				</h1>
				<p className='text-lg font-normal pt-4 pb-6'>
					Descubra as Melhores Opções de Casas, Apartamentos e Terrenos com a Nossa Ajuda
				</p>
				<Button maxContent label='Quero o meu lugar!' onClick={() => {}} />
			</div>
		</section>
	)
}

export default Hero
