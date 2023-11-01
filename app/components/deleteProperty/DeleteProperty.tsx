'use client'

import { PropertyImage } from '@prisma/client'
import Button from '../Button'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface deletePropertyProps {
	propertyId: string
	imageIds: string[]
}

const DeleteProperty: React.FC<deletePropertyProps> = ({ imageIds, propertyId }) => {
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const handleDelete = async () => {
		try {
			setLoading(true)

			await axios.delete(`/api/property`, {
				data: {
					propertyId: propertyId
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
		<div>
			<Button onClick={handleDelete} label='Deletar propriedade' disabled={loading} />
		</div>
	)
}

export default DeleteProperty
