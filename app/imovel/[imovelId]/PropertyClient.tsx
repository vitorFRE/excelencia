import ImageGrid from '@/app/components/imovel/ImageGrid'
import HeartButton from '@/app/components/inputs/HeartButton'
import Link from 'next/link'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { SafeUser } from '@/app/types'
import { Property, PropertyImage } from '@prisma/client'
import { LuBedDouble } from 'react-icons/lu'
import MapWithLocation from '@/app/components/MapWithLocation'

interface PropertyClientProps {
	currentUser?: SafeUser | null
	property: Property & {
		images: PropertyImage[]
	}
}

const PropertyClient: React.FC<PropertyClientProps> = ({ property, currentUser }) => {
	return (
		<>
			<div className='flex justify-between mt-[45px]'>
				<div>
					<h1 className='text-4xl font-semibold'>Parque das nações</h1>
					<p className='text-2xl font-medium text-[#1C1917CC] mt-1'>
						<span className='text-black'>R$</span> {property.price}
					</p>
				</div>

				<HeartButton propertyId={property.id} currentUser={currentUser} />
			</div>

			<ImageGrid images={property.images} />

			<div className='mt-6 flex justify-between'>
				<div className='max-w-[600px]'>
					<h2 className='text-2xl font-bold'>Descrição</h2>
					<p className='font-medium'>{property.description}</p>
				</div>
				<Link
					href={'/'}
					className='flex gap-1 w-max h-max bg-primary py-3 px-5 rounded-lg text-white mt-4'>
					<AiOutlineWhatsApp size={24} />
					Entre em contato
				</Link>
			</div>

			<div className='flex gap-4 mt-6'>
				<div className='flex flex-col gap-4 bg-white/70 border border-cBorder py-3 pl-4 pr-6 rounded-lg'>
					<LuBedDouble size={24} />
					<p className='font-medium'>{property.bedroomCount} Quartos</p>
				</div>
				<div className='flex flex-col gap-4 bg-white/70 border border-cBorder py-3 pl-4 pr-6 rounded-lg'>
					<LuBedDouble size={24} />
					<p className='font-medium'>{property.bathroomCount} Banheiros</p>
				</div>
				<div className='flex flex-col gap-4 bg-white/70 border border-cBorder py-3 pl-4 pr-6 rounded-lg'>
					<LuBedDouble size={24} />
					<p className='font-medium'>{property.area}mt área total</p>
				</div>
				<div className='flex flex-col gap-4 bg-white/70 border border-cBorder py-3 pl-4 pr-6 rounded-lg'>
					<LuBedDouble size={24} />
					<p className='font-medium'>{property.buildingArea}mt área construida</p>
				</div>
				<div className='flex flex-col gap-4 bg-white/70 border border-cBorder py-3 pl-4 pr-6 rounded-lg'>
					<LuBedDouble size={24} />
					<p className='font-medium'>{property.roomCount} total de cômodos</p>
				</div>
			</div>

			<div className='mt-7'>
				<h2 className='text-2xl font-bold mb-4'>Onde fica</h2>
				<MapWithLocation lat={property.latitude} lng={property.longitude} />
			</div>
		</>
	)
}

export default PropertyClient
