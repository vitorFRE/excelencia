import Link from 'next/link'

export default function NotFound() {
	return (
		<section className='h-screen w-full flex flex-col justify-center items-center bg-background'>
			<h1 className='text-9xl font-extrabold text-white tracking-widest'>404</h1>
			<div className='bg-blue-600 px-2 text-sm rounded rotate-12 absolute'>
				Página não encontrada
			</div>

			<button className='mt-5'>
				<a className='relative inline-block text-sm font-medium text-blue-600 group active:text-orange-500 focus:outline-none focus:ring'>
					<span className='absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-blue-600group-hover:translate-y-0 group-hover:translate-x-0'></span>

					<span className='relative block px-8 py-3 bg-background border border-current'>
						<Link href='/'>Voltar</Link>
					</span>
				</a>
			</button>
		</section>
	)
}
