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
			onClick={() => router.push(`/propriedades/${id}`)}
			className='col-span-1 cursor-pointer group '>
			<div className='flex flex-col gap-2 w-full min-h-full rounded-xl bg-white/70 border border-cBorder '>
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
					<h3 className='text-[20px] font-bold leading-normal'>{title}</h3>
					<span className='text-sm font-medium text-[#898989] flex gap-2 items-center'>
						<LuMapPin size={16} /> {locationValue},{city} - {state}
					</span>
					<p className='font-medium line-clamp-3 leading-6 text-[#374151]'>
						{description}
					</p>
				</section>
			</div>
		</div>
	)
}

export default PropertyCard
