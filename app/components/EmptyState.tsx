'use client'

import { useRouter } from 'next/navigation'
import Heading from './Heading'
import Button from './Button'

interface EmptyState {
	title?: string
	subtitle?: string
	showBack?: boolean
}

const EmptyState: React.FC<EmptyState> = ({
	title = 'Não encontrado',
	subtitle = 'Tente remover ou modificar algum filtro',
	showBack
}) => {
	const router = useRouter()
	return (
		<div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
			<Heading center title={title} subtitle={subtitle} />
			<div className='w-48 mt-4'>
				{showBack && (
					<Button outline label='Voltar para a home' onClick={() => router.push('/')} />
				)}
			</div>
		</div>
	)
}

export default EmptyState
