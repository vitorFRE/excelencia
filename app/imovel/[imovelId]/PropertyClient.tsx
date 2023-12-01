'use client'
import ImageGrid from '@/app/components/imovel/ImageGrid'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { SafeUser } from '@/app/types'
import { Property, PropertyImage } from '@prisma/client'
import { Property as PropertyArraw } from '../../actions/getPropertys'
import { LuBath, LuBedDouble, LuBuilding, LuLamp, LuArrowRight } from 'react-icons/lu'
/* import MapWithLocation from '@/app/components/MapWithLocation' */
import RecentPropertiesCard from '@/app/components/imovel/RecentPropertiesCard'
import { zodResolver } from '@hookform/resolvers/zod'

import dynamic from 'next/dynamic'
import Heading from '@/app/components/Heading'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SendHorizonal } from 'lucide-react'

const MapWithLocation = dynamic(() => import('@/app/components/MapWithLocation'), {
	ssr: false
})

const formaSchema = z.object({
	username: z.string().min(2, {
		message: 'O nome deve conter no minimo 2 letras.'
	}),
	email: z
		.string()
		.min(1, { message: 'Esse campo deve ser preenchido.' })
		.email('Deve ser um email valido'),
	descricao: z.string().min(1, 'Escreva sua menssagem ou duvida!'),
	phone: z.string().refine(
		(value) => {
			const phoneNumberRegex = /^\d{11}$/
			return phoneNumberRegex.test(value)
		},
		{
			message: 'Deve ser um número de telefone válido no formato brasileiro.'
		}
	)
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
	const form = useForm<z.infer<typeof formaSchema>>({
		resolver: zodResolver(formaSchema),
		defaultValues: {
			username: '',
			email: '',
			descricao: '',
			phone: ''
		}
	})

	function onSubmit(values: z.infer<typeof formaSchema>) {
		console.log(values)
	}

	return (
		<>
			<div className=''>
				<div className='flex justify-between mt-[45px]'>
					<div>
						<h1 className='text-4xl font-semibold'>{property.title}</h1>
						<p className='text-2xl font-medium  mt-1'>
							<span className=''>R$</span> {property.price}
						</p>
					</div>
					<Link href={'/'} className='flex gap-1'>
						<Button>
							Entre em contato <AiOutlineWhatsApp size={16} />
						</Button>
					</Link>

					{/* <HeartButton propertyId={property.id} currentUser={currentUser} /> */}
				</div>

				<ImageGrid images={property.images} />

				<div className='grid grid-cols-1 lg:grid-cols-imovel gap-4 '>
					<div>
						<div className='mt-6 border  py-3 pl-4 pr-6 rounded-lg'>
							<h2 className='text-2xl font-bold mb-3'>Descrição</h2>
							<p className='font-medium max-w-[600px]'>{property.description}</p>
						</div>

						<div className='gap-4 mt-6 grid grid-cols-2 md:grid-cols-3'>
							<div className='flex flex-col gap-4 border py-3 pl-4 pr-6 rounded-lg'>
								<LuBedDouble size={24} />
								<p className='font-medium'>{property.bedroomCount} Quartos</p>
							</div>
							<div className='flex flex-col gap-4 border py-3 pl-4 pr-6 rounded-lg'>
								<LuBath size={24} />
								<p className='font-medium'>{property.bathroomCount} Banheiros</p>
							</div>
							<div className='flex flex-col gap-4 border py-3 pl-4 pr-6 rounded-lg'>
								<LuBuilding size={24} />
								<p className='font-medium'>{property.area}mt área total</p>
							</div>
							<div className='flex flex-col gap-4 border py-3 pl-4 pr-6 rounded-lg'>
								<LuBuilding size={24} />
								<p className='font-medium'>{property.buildingArea}mt área construida</p>
							</div>
							<div className='flex flex-col gap-4 border py-3 pl-4 pr-6 rounded-lg'>
								<LuLamp size={24} />
								<p className='font-medium'>{property.roomCount} total de cômodos</p>
							</div>
						</div>

						<div className='mt-7 border py-4 pl-4 pr-6 rounded-lg'>
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

							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className='space-y-8 mt-6 sm:mt-0 border rounded-md py-5 px-4'>
									<FormField
										control={form.control}
										name='username'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Nome</FormLabel>
												<FormControl>
													<Input placeholder='nome' {...field} />
												</FormControl>
												<FormDescription>Nome para entrar em contato.</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input placeholder='nome@email.com' {...field} />
												</FormControl>
												<FormDescription>
													Email que entraremos em contato.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='phone'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Telefone</FormLabel>
												<FormControl>
													<Input
														className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
														type='number'
														onWheel={(event) => event.currentTarget.blur()}
														placeholder='(00) 99999-9999'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='descricao'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Descrição</FormLabel>
												<FormControl>
													<Textarea
														placeholder='Sobre o que você quer falar ?'
														{...field}
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
									<Button className='flex gap-2' type='submit'>
										Enviar <SendHorizonal size={16} />
									</Button>
								</form>
							</Form>
						</div>
						<h2 className='text-2xl font-bold mt-10 mb-4'>Propriedade recentes</h2>
						<div className='flex flex-col gap-4 space-y-8 mt-6 sm:mt-0 border rounded-md py-5 px-4'>
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
