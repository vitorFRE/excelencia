import { BsTelephoneFill, BsFacebook, BsLinkedin, BsInstagram } from 'react-icons/bs'
import Container from '../Container'

interface TopbarProps {
	phoneNumber: string
}

const Topbar: React.FC<TopbarProps> = ({ phoneNumber }) => {
	return (
		<div className='border-b-[1px] pb-4 md:pb-4'>
			<Container>
				<div className='flex pt-4 flex-row justify-between items-center'>
					<div className='flex gap-2 items-center'>
						<BsTelephoneFill className='text-blue-600' size={24} />{' '}
						<p className='font-semibold'>{phoneNumber}</p>
					</div>

					<div className='flex items-center gap-4'>
						<BsFacebook size={24} className='text-blue-600 cursor-pointer' />
						<BsLinkedin size={24} className='text-blue-600 cursor-pointer' />
						<BsInstagram size={24} className=' text-blue-600 cursor-pointer' />
					</div>
				</div>
			</Container>
		</div>
	)
}

export default Topbar
