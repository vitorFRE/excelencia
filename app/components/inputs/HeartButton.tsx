'use client'

import useFavorite from '@/app/hooks/useFavorite'
import { SafeUser } from '@/app/types'
import { LuHeart } from 'react-icons/lu'

interface HeartButtonProps {
	propertyId: string
	currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({ propertyId, currentUser }) => {
	const { hasFavorited, toggleFavorite } = useFavorite({
		propertyId,
		currentUser
	})
	return (
		<div
			onClick={toggleFavorite}
			className='relative hover:opacity-80 transition cursor-pointer'>
			<LuHeart
				size={28}
				className={`text-white absolute -top-[2px] -right-[2px] ${
					hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'
				}`}
			/>
		</div>
	)
}

export default HeartButton
