'use client'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import { SafeUser } from '@/app/types'
import Link from 'next/link'
import { LuHeart } from 'react-icons/lu'

interface FavoritesHeartCountProps {
	currentUser?: SafeUser | null
}

const FavoritesHeartCount: React.FC<FavoritesHeartCountProps> = ({ currentUser }) => {
	const registerModal = useRegisterModal()

	return (
		<>
			{currentUser ? (
				<Link href='/favoritos'>
					<div className='relative cursor-pointer'>
						<LuHeart size={24} className=' cursor-pointer' />
						<span className='absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white dark:text-slate-900'>
							{currentUser.favorites.length}
						</span>
					</div>
				</Link>
			) : (
				<div className='relative cursor-pointer' onClick={registerModal.onOpen}>
					<LuHeart size={24} className='text-primary cursor-pointer' />
					<span className='absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white dark:text-slate-900'>
						0
					</span>
				</div>
			)}
		</>
	)
}

export default FavoritesHeartCount
