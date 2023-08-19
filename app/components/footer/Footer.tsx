import Link from 'next/link'
import Container from '../Container'
import {
	LuPhone,
	LuMail,
	LuMapPin,
	LuFacebook,
	LuLinkedin,
	LuInstagram
} from 'react-icons/lu'
import Logo from '../navbar/Logo'

const Footer = () => {
	return (
		<Container>
			<footer className='flex justify-between mb-11 flex-col items-center md:flex-row gap-10'>
				<div className='md:mx-0 mx-auto text-center md:text-left'>
					<a className='flex font-medium items-center md:justify-start justify-center text-gray-900 mb-4'>
						<Logo />
					</a>

					<a
						href='/'
						className='mt-2 text-sm text-gray-500 flex items-center gap-1 justify-center md:justify-start'>
						<LuPhone size={20} /> (00) 00000-0000
					</a>

					<a className='mt-2 text-sm text-gray-500 flex items-center gap-1 justify-center md:justify-start'>
						<LuPhone size={20} /> (00) 00000-0000
					</a>
					<a className='mt-2 text-sm text-gray-500 flex items-center gap-1 justify-center md:justify-start'>
						<LuMail size={20} /> excelencia@gmail.com
					</a>
					<a className='mt-2 mb-6 text-sm text-gray-500 flex gap-1 justify-center md:justify-start'>
						<LuMapPin size={20} /> 873 Campfire Ave. Meriden
					</a>
					<a className='text-sm text-[#010101] font-semibold justify-center md:justify-start'>
						© Excelência - Todos os direitos reservados.
					</a>
				</div>
				<div className='flex gap-6 md:gap-20'>
					<div className=''>
						<h2 className='font-bold text-lg text-gray-900 tracking-widest mb-3'>
							Serviços
						</h2>
						<nav className='list-none flex flex-col gap-4'>
							<li>
								<Link
									href={'/'}
									className='text-gray-600 hover:text-gray-800 cursor-pointer'>
									Abertura de conta
								</Link>
							</li>
							<li>
								<Link
									href={'/'}
									className='text-gray-600 hover:text-gray-800 cursor-pointer'>
									Cartões de credito
								</Link>
							</li>
							<li>
								<Link
									href={'/'}
									className='text-gray-600 hover:text-gray-800 cursor-pointer'>
									Financiamento habitacional
								</Link>
							</li>
							<li>
								<Link
									href={'/'}
									className='text-gray-600 hover:text-gray-800 cursor-pointer'>
									Venda de imóveis
								</Link>
							</li>
						</nav>
					</div>
					<div className=''>
						<h2 className='font-bold text-lg text-gray-900 tracking-widest mb-3'>
							Redes
						</h2>
						<nav className='list-none flex flex-col gap-4'>
							<li>
								<Link
									href={'/'}
									className='flex gap-1 text-gray-600 hover:text-gray-800 cursor-pointer'>
									<LuInstagram size={20} /> Instagram
								</Link>
							</li>
							<li>
								<Link
									href={'/'}
									className='flex gap-1 items-center text-gray-600 hover:text-gray-800 cursor-pointer'>
									<LuFacebook size={20} /> Facebook
								</Link>
							</li>
							<li>
								<Link
									href={'/'}
									className='flex gap-1 text-gray-600 hover:text-gray-800 cursor-pointer'>
									<LuLinkedin size={20} /> Linkedin
								</Link>
							</li>
						</nav>
					</div>
				</div>
			</footer>
		</Container>
	)
}

export default Footer
