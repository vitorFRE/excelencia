'use client'
import { format, parse } from 'date-fns'
import { useRouter } from 'next/navigation'

interface RecentPropertiesCardProps {
	image: string
	id: string
	title: string
	date: Date
	location: string
}

const RecentPropertiesCard: React.FC<RecentPropertiesCardProps> = ({
	image,
	id,
	title,
	date,
	location
}) => {
	const router = useRouter()

	const dateObject = new Date(date)
	const dayOfMonth = format(dateObject, 'd')
	const monthNumber = format(dateObject, 'M')

	return (
		<div
			onClick={() => router.push(`/imovel/${id}`)}
			className='border rounded-lg flex gap-4 cursor-pointer group '>
			<picture>
				<img
					className='w-[111px] h-[96px] rounded-lg group-hover:scale-110 transition'
					src={image}
					alt='Card imagem'
				/>
			</picture>
			<div>
				<h4 className='font-semibold text-xl'>{title}</h4>
				<span className='text-base font-medium'>{`${dayOfMonth} / ${monthNumber}`}</span>
				<p className='font-medium text-[#898989] text-lg'>{location}</p>
			</div>
		</div>
	)
}

export default RecentPropertiesCard
