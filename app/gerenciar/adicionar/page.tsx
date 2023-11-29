'use client'

import { useCallback, useState } from 'react'
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

export default function Form() {
	useDisableScroll(['price', 'area', 'buildingArea'])

	const [previousStep, setPreviousStep] = useState(0)
	const [currentStep, setCurrentStep] = useState(0)
	const router = useRouter()
	const delta = currentStep - previousStep

	const Map = dynamic(() => import('../../components/MapWithMarker'), { ssr: false })

	//testando

	const [previews, setPreviews] = useState<(string | ArrayBuffer)[]>([])

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

	//fim

	const setCustomValue = (id: any, value: any) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true
		})
	}

	const [permanentMarkerPosition, setPermanentMarkerPosition] = useState<LatLng | null>(
		null
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
		resolver: zodResolver(FormDataSchema)
	})

	const processForm: SubmitHandler<Inputs> = async (data) => {
		try {
			if (acceptedFiles.length === 0) return

			const uploadPromises = acceptedFiles.map(async (file) => {
				const formData = new FormData()
				formData.append('file', file)
				formData.append(
					'upload_preset',
					process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as any
				)
				formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as any)

				const result = await fetch(
					`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
					{
						method: 'POST',
						body: formData
					}
				).then((r) => r.json())

				return result
			})

			const results = await Promise.all(uploadPromises)

			const propertyData = {
				...data,
				images: results.map((image: any) => ({
					id: image.public_id,
					url: image.secure_url
				}))
			}

			await axios.post('/api/property', propertyData)

			toast.success('Propriedade Criada')
			router.refresh()
			reset()
		} catch {
			toast.error('Algo deu ao criar a propriedade!')
		}
	}

	const roomCounterValue = watch('roomCount', 0)
	const bedroomCounterValue = watch('bedroomCount', 0)
	const bathroomCounterValue = watch('bathroomCount', 0)

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
										{...register('title')}
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
										{...register('description')}
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
										{...register('price', { valueAsNumber: true, value: 0 })}
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
										{...register('area', { valueAsNumber: true, value: 0 })}
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
										{...register('buildingArea', { valueAsNumber: true, value: 0 })}
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

							<div>
								<div className='bg-yellow-200' {...getRootProps()}>
									<input {...getInputProps()} />
									{isDragActive ? (
										<p>Drop the files here ...</p>
									) : (
										<p>Drag n drop some files here, or click to select files</p>
									)}
								</div>

								{previews.length > 0 && (
									<div className='mb-5'>
										{previews.map((preview, index) => (
											<div key={index}>
												<img src={preview as string} alt={`Upload preview ${index}`} />
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					</motion.div>
				)}

				{currentStep === 1 && (
					<motion.div
						initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}>
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
										{...register('city')}
									/>

									{errors.city?.message && (
										<p className='mt-2 text-sm text-red-400'>{errors.city.message}</p>
									)}
								</div>
							</div>
							<div className='sm:col-span-3 xl:col-span-2'>
								<Label htmlFor='state'>Estado</Label>
								<div className='mt-2'>
									<Input type='text' id='state' placeholder='MS' {...register('state')} />

									{errors.state?.message && (
										<p className='mt-2 text-sm text-red-400'>{errors.state.message}</p>
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
										{...register('locationValue')}
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
										Local selecionado: Latitude {permanentMarkerPosition.lat}, Longitude{' '}
										{permanentMarkerPosition.lng}
									</p>
								)}
							</div>
						</div>
					</motion.div>
				)}

				{currentStep === 2 && (
					<>
						<h2 className='text-base font-semibold leading-7'>Complete</h2>
						<p className='mt-1 text-sm leading-6'>Thank you for your submission.</p>
					</>
				)}
			</form>

			{/* Navigation */}
			<div className='mt-8 pt-5'>
				<div className='flex justify-between'>
					<button
						type='button'
						onClick={prev}
						disabled={currentStep === 0}
						className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='h-6 w-6'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 19.5L8.25 12l7.5-7.5'
							/>
						</svg>
					</button>
					<button
						type='button'
						onClick={next}
						disabled={currentStep === steps.length - 1}
						className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='h-6 w-6'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M8.25 4.5l7.5 7.5-7.5 7.5'
							/>
						</svg>
					</button>
				</div>
			</div>
		</section>
	)
}
