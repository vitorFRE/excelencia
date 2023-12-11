'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { LuMapPin } from 'react-icons/lu'
import HeartButton from '../inputs/HeartButton'
import { SafeUser } from '@/app/types'
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
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface PropertyCardProps {
	id: string
	image: string
	imageIds: string[]
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
	imageIds
}) => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	const handleDelete = async () => {
		try {
			setLoading(true)

			await axios.delete(`/api/property`, {
				data: {
					propertyId: id
				}
			})

			await axios
				.post(`/api/imageDelete`, { imageIds })
				.then(() => {
					toast.success('Imagens deletas')
				})
				.catch(() => {
					toast.error('Erro ao deletar imagens')
				})

			router.refresh()
			toast.success('propriedade deletada')
		} catch (error) {
			toast.error('Erro ao deletar propriedade')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='col-span-1 group '>
			<div className='flex flex-col gap-2  rounded-xl border border-cBorder '>
				<div className='aspect-square w-full h-full relative overflow-hidden rounded-t-xl'>
					<Image
						onClick={() => router.push(`/imovel/${id}`)}
						fill
						alt='Listing'
						src={image}
						className='object-cover cursor-pointer w-full hover:scale-105 transition'
					/>
					<div className='absolute top-3 right-3'>
						<HeartButton propertyId={id} currentUser={currentUser} />
					</div>
				</div>
				<section className='flex flex-col gap-2 px-4 pt-4 pb-7'>
					<h3 className='dark:text-slate-50 font-bold text-lg'>{title}</h3>
					<span className='text-base font-medium dark:text-slate-500 flex items-center'>
						<LuMapPin size={18} />
						{city} - {state}
					</span>
					<p className='text-sm font-medium line-clamp-3 text-slate-400'>{description}</p>
				</section>
				{deleteButton ? (
					<AlertDialog>
						<AlertDialogTrigger className='bg-red-700 py-2 rounded-b-xl'>
							{loading ? 'Deletando...' : 'Deletar'}
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Você tem certeza que deseja deletar?</AlertDialogTitle>
								<AlertDialogDescription>
									Esta ação é irreversível. Isso resultará na exclusão permanente da
									propriedade do site e dos servidores.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancelar</AlertDialogCancel>
								<AlertDialogAction onClick={handleDelete} disabled={loading}>
									Confirmar
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				) : null}
			</div>
		</div>
	)
}

export default PropertyCard
