'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { LuMapPin } from 'react-icons/lu'
import HeartButton from '../inputs/HeartButton'
import { SafeUser } from '@/app/types'
import DeleteProperty from '../deleteProperty/DeleteProperty'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'

interface PropertyCardProps {
	id: string
	image: string
	imagesId?: string[] | undefined
	title: string
	description: string
	locationValue: string
	city: string
	state: string
	currentUser?: SafeUser | null
	deleteButton?: boolean
}

const PropertyCard: React.FC<PropertyCardProps> = ({
	title,
	description,
	image,
	id,
	locationValue,
	city,
	state,
	currentUser,
	deleteButton,
	imagesId
}) => {
	const router = useRouter()

	return (
		<div className='col-span-1 group '>
			<div className='flex flex-col gap-2 w-full min-h-full rounded-xl dark:bg-[#191A1E] border border-cBorder '>
				<div className='aspect-square w-full relative overflow-hidden rounded-t-xl'>
					<Image
						onClick={() => router.push(`/imovel/${id}`)}
						fill
						alt='Listing'
						src={image}
						className='object-cover cursor-pointer h-full w-full hover:scale-105 transition'
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
				{deleteButton && id && imagesId && (
					<DeleteProperty propertyId={id} imageIds={imagesId} />
				)}
				<AlertDialog>
					<AlertDialogTrigger>Open</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete your account
								and remove your data from our servers.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction>Continue</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	)
}

export default PropertyCard
