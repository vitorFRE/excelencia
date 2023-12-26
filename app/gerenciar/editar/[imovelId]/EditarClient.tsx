'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FormDataSchema } from '@/app/libs/schema'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useDisableScroll from '@/app/hooks/useDisableScroll'
import { Textarea } from '@/components/ui/textarea'
import CounterT from '@/app/components/inputs/CounterTest'
import dynamic from 'next/dynamic'
import { LatLng } from '@/app/components/MapWithMarker'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { ArrowUpIcon, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Property } from '@/app/actions/getPropertyById'

type Inputs = z.infer<typeof FormDataSchema>

const steps = [
	{
		id: 'Step 1',
		name: 'Informações da propriedade',
		fields: [
			'title',
			'description',
			'price',
			'area',
			'buildingArea',
			'roomCount',
			'bedroomCount',
			'bathroomCount'
		]
	},
	{
		id: 'Step 2',
		name: 'Endereço',
		fields: ['city', 'state', 'locationValue', 'latitude', 'longitude']
	},
	{ id: 'Step 3', name: 'Completo' }
]

interface EditarCLientPropsIParams {
	property: Property
}

export const EditarClient: React.FC<EditarCLientPropsIParams> = ({ property }) => {
	useDisableScroll(['price', 'area', 'buildingArea'])

	const [previousStep, setPreviousStep] = useState(0)
	const [currentStep, setCurrentStep] = useState(0)
	const router = useRouter()
	const delta = currentStep - previousStep

	const Map = dynamic(() => import('../../../components/MapWithMarker'), {
		ssr: false
	})

	const [deletedImageIds, setDeletedImageIds] = useState<string[]>([])

	const [previews, setPreviews] = useState<(string | ArrayBuffer)[]>(
		property.images ? property.images.map((image) => image.imageUrl) : []
	)

	const onDrop = useCallback((acceptedFiles: File[]) => {
		acceptedFiles.forEach((file: File) => {
			const reader = new FileReader()

			reader.onload = () => {
				const result = reader.result
				if (result) {
					setPreviews((prevPreviews) => [...prevPreviews, result])
				}
			}

			reader.readAsDataURL(file)
		})
	}, [])

	const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop
	})

	const setCustomValue = (id: any, value: any) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true
		})
	}

	const [permanentMarkerPosition, setPermanentMarkerPosition] = useState<LatLng | null>(
		property.latitude && property.longitude
			? { lat: property.latitude, lng: property.longitude }
			: null
	)

	const handleLatLngSelect = (lat: number, lng: number) => {
		setCustomValue('latitude', lat)
		setCustomValue('longitude', lng)
		setPermanentMarkerPosition({ lat, lng })
	}

	const {
		register,
		handleSubmit,
		watch,
		reset,
		trigger,
		setValue,
		getValues,
		formState: { errors }
	} = useForm<Inputs>({
		resolver: zodResolver(FormDataSchema),
		defaultValues: {
			latitude: property.latitude,
			longitude: property.longitude
		}
	})

	const [isSubmitting, setIsSubmitting] = useState(false)

	const processForm: SubmitHandler<Inputs> = async (data) => {
		let results = []
		try {
			setIsSubmitting(true)
			const imageIds = deletedImageIds

			if (imageIds.length > 0) {
				await axios
					.post(`/api/imageDelete`, { imageIds })
					.then(() => {
						toast.success('Imagens deletas')
					})
					.catch(() => {
						toast.error('Erro ao deletar imagens')
					})
			}

			const uploadPromises = acceptedFiles.map(async (file) => {
				const formData = new FormData()
				formData.append('file', file)
				formData.append(
					'upload_preset',
					process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
				)
				formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string)

				const result = await fetch(
					`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
					{
						method: 'POST',
						body: formData
					}
				).then((r) => r.json())

				return result
			})

			results = await Promise.all(uploadPromises)

			const propertyData = {
				...data,
				propertyId: property.id,
				deletedImageIds,
				images: [
					...results.map((image: any) => ({
						id: image.public_id,
						url: image.secure_url
					})),
					...(property.images?.filter(
						(image: any) => !deletedImageIds.includes(image.id)
					) || [])
				]
			}

			await axios.patch('/api/property', propertyData)

			toast.success('Propriedade Editada')
			router.refresh()
			reset()
		} catch (error) {
			console.log(error)
			if (results.length > 0) {
				const publicIdsToDelete = results.map((image) => image.public_id)
				const imageIds = publicIdsToDelete
				await axios
					.post(`/api/imageDelete`, { imageIds })
					.then(() => {
						console.log('imagens deletadas')
					})
					.catch(() => {})
			}

			setIsSubmitting(false)
			toast.error('Algo deu ao editar a propriedade!')
		} finally {
			setIsSubmitting(false)
		}
	}

	const roomCounterValue = watch('roomCount', 0)
	const bedroomCounterValue = watch('bedroomCount', 0)
	const bathroomCounterValue = watch('bathroomCount', 0)

	useEffect(() => {
		setValue('roomCount', property.roomCount)
		setValue('bedroomCount', property.bedroomCount)
		setValue('bathroomCount', property.bathroomCount)
	}, [property.roomCount, property.bedroomCount, property.bathroomCount, setValue])

	type FieldName = keyof Inputs

	const next = async () => {
		const fields = steps[currentStep].fields
		const output = await trigger(fields as FieldName[], { shouldFocus: true })

		if (!output) return

		if (currentStep < steps.length - 1) {
			if (currentStep === steps.length - 2) {
				await handleSubmit(processForm)()
			}
			setPreviousStep(currentStep)
			setCurrentStep((step) => step + 1)
		}
	}

	const prev = () => {
		if (currentStep > 0) {
			setPreviousStep(currentStep)
			setCurrentStep((step) => step - 1)
		}
	}

	const removeImage = (indexToRemove: number) => {
		const images = property.images || []
		const deletedImageId = images[indexToRemove]?.imageId
		if (deletedImageId) {
			setDeletedImageIds((prevIds) => [...prevIds, deletedImageId])
		}
		const updatedPreviews = previews.filter((_, index) => index !== indexToRemove)
		setPreviews(updatedPreviews)
	}

	return (
		<section className='inset-0 flex flex-col justify-between'>
			{/* steps */}
			<nav aria-label='Progress'>
				<ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
					{steps.map((step, index) => (
						<li key={step.name} className='md:flex-1'>
							{currentStep > index ? (
								<div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
									<span className='text-sm font-medium text-sky-600 transition-colors '>
										{step.id}
									</span>
									<span className='text-sm font-medium'>{step.name}</span>
								</div>
							) : currentStep === index ? (
								<div
									className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
									aria-current='step'>
									<span className='text-sm font-medium text-sky-600'>{step.id}</span>
									<span className='text-sm font-medium'>{step.name}</span>
								</div>
							) : (
								<div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
									<span className='text-sm font-medium text-gray-500 transition-colors'>
										{step.id}
									</span>
									<span className='text-sm font-medium'>{step.name}</span>
								</div>
							)}
						</li>
					))}
				</ol>
			</nav>

			{/* Form */}
			<form className='py-12' onSubmit={handleSubmit(processForm)}>
				{currentStep === 0 && (
					<motion.div
						initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}>
						<h2 className='text-base font-semibold leading-7'>
							Informações da propriedade
						</h2>
						<p className='mt-1 text-sm leading-6 text-muted-foreground'>
							Coloque as informações sobre a propriedade
						</p>
						<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
							<div className='sm:col-span-3'>
								<Label htmlFor='title'>Titulo</Label>
								<div className='mt-2'>
									<Input
										type='text'
										id='title'
										placeholder='Casa 2 quartos...'
										{...register('title', { value: property.title })}
									/>

									{errors.title?.message && (
										<p className='mt-2 text-sm text-red-400'>{errors.title.message}</p>
									)}
								</div>
							</div>

							<div className='sm:col-span-3 '>
								<Label htmlFor='description'>Descrição</Label>
								<div className='mt-2'>
									<Textarea
										id='description'
										placeholder='Descrição da propriedade'
										{...register('description', { value: property.description })}
									/>
									{errors.description?.message && (
										<p className='mt-2 text-sm text-red-400'>
											{errors.description.message}
										</p>
									)}
								</div>
							</div>

							<div className='sm:col-span-3 xl:col-span-2'>
								<Label htmlFor='price'>Preço</Label>

								<div className='mt-2'>
									<Input
										id='price'
										type='number'
										inputMode='numeric'
										pattern='^\d{5}(-\d{4})?$'
										className='no-spin'
										{...register('price', { valueAsNumber: true, value: property.price })}
									/>
									{errors.price?.message && (
										<p className='mt-2 text-sm text-red-400'>{errors.price.message}</p>
									)}
								</div>
							</div>

							<div className='sm:col-span-3 xl:col-span-2'>
								<Label htmlFor='area'>Area total</Label>

								<div className='mt-2'>
									<Input
										id='area'
										type='number'
										inputMode='numeric'
										pattern='^\d{5}(-\d{4})?$'
										className='no-spin'
										{...register('area', { valueAsNumber: true, value: property.area })}
									/>
									{errors.area?.message && (
										<p className='mt-2 text-sm text-red-400'>{errors.area.message}</p>
									)}
								</div>
							</div>

							<div className='sm:col-span-3 xl:col-span-2'>
								<Label htmlFor='buildingArea'>Area Contruida</Label>

								<div className='mt-2'>
									<Input
										id='buildingArea'
										type='number'
										inputMode='numeric'
										pattern='^\d{5}(-\d{4})?$'
										className='no-spin'
										{...register('buildingArea', {
											valueAsNumber: true,
											value: property.buildingArea
										})}
									/>
									{errors.buildingArea?.message && (
										<p className='mt-2 text-sm text-red-400'>
											{errors.buildingArea.message}
										</p>
									)}
								</div>
							</div>
							<div className='sm:col-span-3 xl:col-span-2'>
								<CounterT
									title='Cômodos'
									subTitle='Número Total de Cômodos'
									value={roomCounterValue}
									onValueChange={(value) => setValue('roomCount', value)}
								/>
							</div>
							<div className='sm:col-span-3 xl:col-span-2'>
								<CounterT
									title='Quartos'
									subTitle='Quantidade de quartos'
									value={bedroomCounterValue}
									onValueChange={(value) => setValue('bedroomCount', value)}
								/>
							</div>
							<div className='sm:col-span-3 xl:col-span-2'>
								<CounterT
									title='Banheiros'
									subTitle='Número de Banheiros'
									value={bathroomCounterValue}
									onValueChange={(value) => setValue('bathroomCount', value)}
								/>
							</div>

							<div className='col-span-full '>
								<Label htmlFor='buildingArea'>Imagens</Label>
								<div
									className='border border-dashed border-gray-300 p-4 rounded-lg cursor-pointer mt-2'
									{...getRootProps()}>
									<input {...getInputProps()} />
									<div className='flex flex-col items-center justify-center gap-4'>
										<ArrowUpIcon className='h-5 w-5 fill-current' />
										{isDragActive ? (
											<p>Arraste os arquivos aqui...</p>
										) : (
											<p>
												Arraste e solte os arquivos aqui, ou clique para selecionar os
												arquivos
											</p>
										)}
									</div>
								</div>
							</div>

							{previews.length > 0 && (
								<div className='grid col-span-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
									{previews.map((preview, index) => (
										<div key={index} className='flex flex-col relative h-64 w-64'>
											<Image
												src={preview as string}
												alt={`Upload preview ${index}`}
												fill
												className='bg-cover'
												sizes='256'
											/>
											<Button
												className='absolute top-1 right-2'
												onClick={() => removeImage(index)}
												variant={'outline'}>
												<X size={18} className='text-primary' />
											</Button>
										</div>
									))}
								</div>
							)}
						</div>
					</motion.div>
				)}

				{currentStep === 1 && (
					<motion.div
						initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}>
						{isSubmitting ? (
							<>
								<section className='bg-background z-50 relative place-items-center grid h-screen w-screen gap-4'>
									<div className='bg-blue-500 w-48 h-48  absolute animate-ping rounded-full delay-5s shadow-xl'></div>
									<div className='bg-blue-400 w-32 h-32 absolute animate-ping rounded-full shadow-xl'></div>
									<div className='bg-white w-24 h-24 absolute animate-pulse rounded-full shadow-xl'></div>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='text-blue-900 filter mix-blend-overlay h-16 w-16'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										stroke-width='2'>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											d='M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z'
										/>
									</svg>
								</section>
							</>
						) : (
							<>
								<h2 className='text-base font-semibold leading-7'>Endereço</h2>
								<p className='mt-1 text-sm leading-6 text-muted-foreground'>
									Informações sobre a localização da propriedade
								</p>

								<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
									<div className='sm:col-span-3 xl:col-span-2'>
										<Label htmlFor='city'>Cidade</Label>
										<div className='mt-2'>
											<Input
												type='text'
												id='city'
												placeholder='Campo grande'
												{...register('city', { value: property.city })}
											/>

											{errors.city?.message && (
												<p className='mt-2 text-sm text-red-400'>{errors.city.message}</p>
											)}
										</div>
									</div>
									<div className='sm:col-span-3 xl:col-span-2'>
										<Label htmlFor='state'>Estado</Label>
										<div className='mt-2'>
											<Input
												type='text'
												id='state'
												placeholder='MS'
												{...register('state', { value: property.state })}
											/>

											{errors.state?.message && (
												<p className='mt-2 text-sm text-red-400'>
													{errors.state.message}
												</p>
											)}
										</div>
									</div>
									<div className='sm:col-span-3 xl:col-span-2'>
										<Label htmlFor='locationValue'>Informações adicionais</Label>
										<div className='mt-2'>
											<Input
												type='text'
												id='locationValue'
												placeholder='Proximo ao parque...'
												{...register('locationValue', {
													value: property.locationValue
												})}
											/>

											{errors.locationValue?.message && (
												<p className='mt-2 text-sm text-red-400'>
													{errors.locationValue.message}
												</p>
											)}
										</div>
									</div>

									<div className='col-span-full'>
										<h1>Selecione um local no mapa</h1>
										<Map
											onLatLngSelect={handleLatLngSelect}
											initialMarkerPosition={permanentMarkerPosition}
										/>
										{permanentMarkerPosition && (
											<p>
												Local selecionado: Latitude {permanentMarkerPosition.lat},
												Longitude {permanentMarkerPosition.lng}
											</p>
										)}
									</div>
								</div>
							</>
						)}
					</motion.div>
				)}

				{currentStep === 2 && (
					<>
						<h2 className='text-base font-semibold leading-7'>Completo</h2>
						<p className='mt-1 text-sm leading-6'>A casa foi editada.</p>
					</>
				)}
			</form>

			{/* Navigation */}
			<div className='mt-8 pt-5'>
				<div className='flex justify-between'>
					<Button type='button' onClick={prev} disabled={currentStep === 0}>
						Anterior
					</Button>

					<Button
						type='button'
						onClick={next}
						disabled={currentStep === steps.length - 1 || isSubmitting}>
						{currentStep === steps.length - 2 ? 'Editar' : 'Próximo'}
					</Button>
				</div>
			</div>
		</section>
	)
}
