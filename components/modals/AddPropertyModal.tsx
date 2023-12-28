'use client'

import useAddPropertyModal from '@/app/hooks/useAddPropertyModal'
import Modal from './Modal'
import Heading from '../Heading'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useMemo, useState } from 'react'
import Input from '../inputs/Input'
import dynamic from 'next/dynamic'
import Counter from '../inputs/Counter'
import { LatLng } from '../MapWithMarker'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import ImagesUpload from '../inputs/ImagensUpload'

enum STEPS {
	INFO = 0,
	ADRESS = 1,
	COUNT = 2,
	LOCATION = 3,
	IMAGES = 4
}

const AddPropertyModal = () => {
	const addPropertyModal = useAddPropertyModal()
	const [step, setStep] = useState(STEPS.INFO)
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset
	} = useForm<FieldValues>({
		defaultValues: {
			title: '',
			description: '',
			price: 0,
			area: 0,
			buildingArea: 0,
			bedroomCount: 1,
			bathroomCount: 1,
			city: '',
			state: '',
			roomCount: 1,
			locationValue: '',
			latitude: null,
			longitude: null,
			images: []
		}
	})

	const bedroomCount = watch('bedroomCount')
	const bathroomCount = watch('bathroomCount')
	const roomCount = watch('roomCount')
	const images = watch('images')

	const Map = dynamic(() => import('../MapWithMarker'), { ssr: false })

	const setCustomValue = (id: string, value: any) => {
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

	const onBack = () => {
		setStep((value) => value - 1)
	}

	const onNext = () => {
		setStep((value) => value + 1)
	}

	const actionLabel = useMemo(() => {
		if (step === STEPS.IMAGES) {
			return 'Criar'
		}

		return 'Proximo'
	}, [step])

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.INFO) {
			return undefined
		}
		return 'Anterior'
	}, [step])

	let bodyContent = (
		<div className='flex flex-col gap-8'>
			<Heading
				title='Informações Básicas'
				subtitle='Informações básicas sobre a propriedade.'
			/>
			<Input
				id='title'
				label='Titulo'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id='description'
				label='Descrição'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id='price'
				type='number'
				label='Preço'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id='area'
				label='Área Total'
				type='number'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id='buildingArea'
				type='number'
				label='Área Construída'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	)

	if (step === STEPS.ADRESS) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading
					title='Detalhes do Endereço'
					subtitle='Informações sobre endereço da propriedade.'
				/>
				<Input
					id='city'
					label='Cidade'
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<Input
					id='state'
					label='Estato'
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<Input
					id='locationValue'
					label='Informações adicionais'
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		)
	}

	if (step === STEPS.COUNT) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading
					title='Detalhes do Quarto e Banheiro'
					subtitle='Informações sobre os quartos e banheiros na propriedade.'
				/>
				<Counter
					title='Quartos'
					subTitle='Número de Quartos'
					value={bedroomCount}
					onChange={(value) => setCustomValue('bedroomCount', value)}
				/>
				<Counter
					title='Banheiros'
					subTitle='Número de Banheiros'
					value={bathroomCount}
					onChange={(value) => setCustomValue('bathroomCount', value)}
				/>
				<Counter
					title='Cômodos'
					subTitle='Número Total de Cômodos'
					value={roomCount}
					onChange={(value) => setCustomValue('roomCount', value)}
				/>
			</div>
		)
	}

	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading
					title='Localização'
					subtitle='Detalhes sobre a localização da propriedade.'
				/>
				<Map
					onLatLngSelect={handleLatLngSelect}
					initialMarkerPosition={permanentMarkerPosition}
				/>
			</div>
		)
	}

	if (step === STEPS.IMAGES) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading
					title='Upload de Imagens'
					subtitle='Carregue imagens para a propriedade.'
				/>
				<ImagesUpload
					value={images}
					onChange={(value) => setCustomValue('images', value)}
				/>
			</div>
		)
	}

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		if (step !== STEPS.IMAGES) {
			return onNext()
		}

		try {
			setIsLoading(true)

			const formData = new FormData()
			const imageFiles = data.images as File[]
			imageFiles.forEach((file) => formData.append('image', file))

			const response = await axios.post('/api/imagesUpload', formData)
			const uploadedImages = response.data.data

			const propertyData = {
				...data,
				images: uploadedImages.map((image: any) => ({
					id: image.public_id,
					url: image.secure_url
				}))
			}

			await axios.post('/api/property', propertyData)

			toast.success('Propriedade publicada')
			router.refresh()
			reset()
			setStep(STEPS.INFO)
			addPropertyModal.onClose()
		} catch (error) {
			console.error('Error:', error)
			toast.error('Algo de errado não está certo')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Modal
			isOpen={addPropertyModal.isOpen}
			onClose={addPropertyModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			title='Adicionar propriedade'
			body={bodyContent}
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.INFO ? undefined : onBack}
		/>
	)
}

export default AddPropertyModal
