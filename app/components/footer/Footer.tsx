import Container from '../Container'
import Logo from '../navbar/Logo'
import Navitems from '../navbar/Navitems'
import { Separator } from '@/components/ui/separator'
import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs'

const Footer = () => {
	return (
		<Container>
			<footer className=''>
				<div className='flex justify-center sm:justify-between'>
					<Logo />
					<Navitems />
				</div>
				<Separator className='my-4' />
				<div className='flex flex-col-reverse items-center gap-4 sm:flex-row justify-between mb-8'>
					<p className='text-slate-600 dark:text-slate-200 text-center sm:text-start'>
						© 2024 Instate. Todos os direitos reservados.
					</p>
					<div className='flex items-center gap-4'>
						<BsFacebook size={24} className='text-blue-600 cursor-pointer' />
						<BsLinkedin size={24} className='text-blue-600 cursor-pointer' />
						<BsInstagram size={24} className=' text-blue-600 cursor-pointer' />
					</div>
				</div>
			</footer>
		</Container>
	)
}

export default Footer
