import Container from '../Container'
import FavoritesHeartCount from './FavoritesHeartCount'
import Logo from './Logo'
import Navitems from './Navitems'
import Topbar from './Topbar'
import { SafeUser } from '@/app/types'
import { ModeToggle } from './toggle-darkmode'
import { UserMenu } from './user-menu'

interface NavBarProps {
	currentUser?: SafeUser | null
}

const Navbar: React.FC<NavBarProps> = ({ currentUser }) => {
	return (
		<div className='dark:bg-bgblack w-full z-20'>
			{/* <Topbar phoneNumber='(00) 87129-7143' /> */}
			<header className='py-4 border-b-[1px]'>
				<Container>
					<div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
						<Logo />
						<Navitems />
						<div className='flex gap-3 items-center'>
							<ModeToggle />
							<FavoritesHeartCount currentUser={currentUser} />
							<UserMenu currentUser={currentUser} />
						</div>
					</div>
				</Container>
			</header>
		</div>
	)
}

export default Navbar
