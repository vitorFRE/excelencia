'use client'
import ImageGrid from '@/app/components/imovel/ImageGrid'
import HeartButton from '@/app/components/inputs/HeartButton'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { SafeUser } from '@/app/types'
import { Property, PropertyImage } from '@prisma/client'
import { Property as PropertyArraw } from '../../actions/getPropertys'
import { LuBath, LuBedDouble, LuBuilding, LuLamp, LuArrowRight } from 'react-icons/lu'
/* import MapWithLocation from '@/app/components/MapWithLocation' */
import Input from '@/app/components/inputs/Input'
import { useState } from 'react'
import Textarea from '@/app/components/inputs/TextArea'
import Button from '@/app/components/Button'
import RecentPropertiesCard from '@/app/components/imovel/RecentPropertiesCard'

import dynamic from 'next/dynamic'
import Heading from '@/app/components/Heading'

const MapWithLocation = dynamic(() => import('@/app/components/MapWithLocation'), {
	ssr: false
})

interface PropertyClientProps {
	currentUser?: SafeUser | null
	recentProperties: PropertyArraw[]
	property: Property & {
		images: PropertyImage[]
	}
}

const PropertyClient: React.FC<PropertyClientProps> = ({
	property,
	currentUser,
	recentProperties
}) => {
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			message: ''
		}
	})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		//setIsLoading(true)

		console.log(data)
	}

	return (
		<>
			<div className=''>
				<div className='flex justify-between mt-[45px]'>
					<div>
						<h1 className='text-4xl font-semibold'>{property.title}</h1>
						<p className='text-2xl font-medium text-[#1C1917CC] mt-1'>
							<span className='text-black'>R$</span> {property.price}
						</p>
					</div>
					<Link
						href={'/'}
						className='flex gap-1 w-max h-max bg-primary py-3 px-5 rounded-lg text-white mt-4'>
						<AiOutlineWhatsApp size={24} />
						Entre em contato
					</Link>

					{/* <HeartButton propertyId={property.id} currentUser={currentUser} /> */}
				</div>

				<ImageGrid images={property.images} />

				<div className='grid grid-cols-1 lg:grid-cols-imovel gap-4 '>
					<div>
						<div className='mt-6 bg-white/70 border border-cBorder py-3 pl-4 pr-6 rounded-lg'>
							<h2 className='text-2xl font-bold mb-3'>Descrição</h2>
							<p className='font-medium max-w-[600px]'>{property.description}</p>
						</div>

						<div className='gap-4 mt-6 grid grid-cols-2 md:grid-cols-3'>
							<div className='flex flex-col gap-4 bg-white/70 border border-cBorder py-3 pl-4 pr-6 rounded-lg'>
								<LuBedDouble size={24} />
								<p className='font-medium'>{property.bedroomCount} Quartos</p>
							</div>
							<div className='flex flex-col gap-4 bg-white/70 border border-cBorder py-3 pl-4 pr-6 rounded-lg'>
								<LuBath size={24} />
								<p className='font-medium'>{property.bathroomCount} Banheiros</p>
							</div>
							<div className='flex flex-col gap-4 bg-white/70 border border-cBorder py-3 pl-4 pr-6 rounded-lg'>
								<LuBuilding size={24} />
								<p className='font-medium'>{property.area}mt área total</p>
							</div>
							<div className='flex flex-col gap-4 bg-white/70 border border-cBorder py-3 pl-4 pr-6 rounded-lg'>
								<LuBuilding size={24} />
								<p className='font-medium'>{property.buildingArea}mt área construida</p>
							</div>
							<div className='flex flex-col gap-4 bg-white/70 border border-cBorder py-3 pl-4 pr-6 rounded-lg'>
								<LuLamp size={24} />
								<p className='font-medium'>{property.roomCount} total de cômodos</p>
							</div>
						</div>

						<div className='mt-7 bg-white/70 border border-cBorder py-4 pl-4 pr-6 rounded-lg'>
							<h2 className='text-2xl font-bold'>Onde fica</h2>
							<MapWithLocation lat={property.latitude} lng={property.longitude} />
						</div>
					</div>
					<div>
						<div className='defaultBorder mt-6 h-max'>
							<Heading
								title='Entre em contato'
								subtitle='Estamos sempre prontos para te ajudar'
							/>

							<form className='flex flex-col gap-4 mt-4'>
								<Input
									id='name'
									label='Nome'
									disabled={isLoading}
									register={register}
									errors={errors}
									required
								/>
								<Input
									id='email'
									type='email'
									label='Email'
									disabled={isLoading}
									register={register}
									errors={errors}
									required
								/>
								<Input
									id='phone'
									type='number'
									label='Número'
									disabled={isLoading}
									register={register}
									errors={errors}
									required
								/>
								<Textarea
									id='message'
									label='Mensagem'
									disabled={isLoading}
									register={register}
									errors={errors}
									required
								/>
								<Button
									label='Enviar Mensagem'
									maxContent
									onClick={handleSubmit(onSubmit)}
								/>
							</form>
						</div>
						<h2 className='text-2xl font-bold mt-10 mb-4'>Propriedade recentes</h2>
						<div className='flex flex-col gap-4'>
							{recentProperties.map((property) => (
								<RecentPropertiesCard
									key={property.title}
									date={property.createdAt}
									title={property.title}
									location={property.locationValue}
									image={property.images?.[0]?.imageUrl ?? '/images/notfound.png'}
									id={property.id}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default PropertyClient
