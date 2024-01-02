'use client'

interface HeadingProps {
	title: string
	subtitle?: string
	center?: boolean
}

const Heading: React.FC<HeadingProps> = ({ title, center, subtitle }) => {
	return (
		<div className={center ? 'text-center' : 'text-start'}>
			<div className='text-3xl font-bold dark:text-white'>{title}</div>
			<div className='font-medium dark:text-gray-400  mt-2 max-w-[370px]'>{subtitle}</div>
		</div>
	)
}
export default Heading
