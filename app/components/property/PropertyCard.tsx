'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { LuMapPin } from 'react-icons/lu'
import HeartButton from '../inputs/HeartButton'
import { SafeUser } from '@/app/types'

interface PropertyCardProps {
	id: string
	image: string
	title: string
	description: string
	locationValue: string
	city: string
	state: string
	currentUser?: SafeUser | null
}

const PropertyCard: React.FC<PropertyCardProps> = ({
	title,
	description,
	image,
	id,
	locationValue,
	city,
	state,
	currentUser
}) => {
	const router = useRouter()

	return (
		<div
			onClick={() => router.push(`/imovel/${id}`)}
			className='col-span-1 cursor-pointer group '>
			<div className='flex flex-col gap-2 w-full min-h-full rounded-xl dark:bg-[#191A1E] border border-cBorder '>
				<div className='aspect-square w-full relative overflow-hidden rounded-t-xl'>
					<Image
						fill
						alt='Listing'
						src={image}
						className='object-cover h-full w-full group-hover:scale-110 transition'
					/>
					<div className='absolute top-3 right-3'>
						<HeartButton propertyId={id} currentUser={currentUser} />
					</div>
				</div>
				<section className='flex flex-col gap-2 px-4 pt-4 pb-7'>
					<h3 className='dark:text-slate-50 font-bold text-lg'>{title}</h3>
					<span className='text-base font-medium dark:text-slate-500 flex items-center'>
						<LuMapPin size={18} /> {locationValue},{city} - {state}
					</span>
					<p className='text-sm font-medium line-clamp-3 text-slate-400'>{description}</p>
				</section>
			</div>
		</div>
	)
}

export default PropertyCard
