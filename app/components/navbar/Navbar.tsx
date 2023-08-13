import Container from '../Container'
import Logo from './Logo'
import Navitems from './Navitems'
import Topbar from './Topbar'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types'

interface NavBarProps {
	currentUser?: SafeUser | null
}

const Navbar: React.FC<NavBarProps> = ({ currentUser }) => {
	return (
		<div className='fixed w-full bg-white z-10'>
			<Topbar phoneNumber='(00) 87129-7143' />
			<header className='py-4 border-b-[1px]'>
				<Container>
					<div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
						<Logo />
						<Navitems />
						<UserMenu currentUser={currentUser} />
					</div>
				</Container>
			</header>
		</div>
	)
}

export default Navbar
