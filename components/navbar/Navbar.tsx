'use client'
import Container from '../Container'
import FavoritesHeartCount from './FavoritesHeartCount'
import Logo from './Logo'
import Navitems from './Navitems'
import Topbar from './Topbar'
import { SafeUser } from '@/app/types'
import { ModeToggle } from './toggle-darkmode'
import { UserMenu } from './user-menu'
import React from 'react'
import { cn } from '@/lib/utils'
import { useAnimation, motion } from 'framer-motion'

interface NavBarProps {
	currentUser?: SafeUser | null
}

const Navbar: React.FC<NavBarProps> = ({ currentUser }) => {
	const [isSticky, setIsSticky] = React.useState(false)

	const handleScroll = () => {
		if (window.pageYOffset > 0) {
			setIsSticky(true)
		} else {
			setIsSticky(false)
		}
	}

	React.useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<motion.div
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
			className={cn('fixed top-0 left-0 right-0 z-50', {
				'bg-opacity-80 bg-white dark:bg-bgblack backdrop-blur-sm fixed': isSticky,
				'dark:bg-bgblack bg-white sticky': !isSticky
			})}>
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
		</motion.div>
	)
}

export default Navbar
