import Link from 'next/link'

interface PropertyCardProps {
	id?: string
	image: string
	title: string
	description: string
}

const PropertyCard: React.FC<PropertyCardProps> = ({ title, description, image }) => {
	return (
		<article className='relative z-40 h-full w-full max-w-md'>
			<Link passHref href={`/`}>
				<article className='h-full rounded-md border border-border bg-secondary'>
					<figure className='h-[180px] overflow-hidden rounded-t-md'>
						<img
							src={image}
							alt={title}
							className='h-full w-full rounded-t-md object-cover transition hover:scale-110'
						/>
					</figure>
					<section className='flex flex-col gap-5 px-6 py-[40px]'>
						<h3 className='text-[20px] font-bold leading-normal'>{title}</h3>
						{description && (
							<p className='font-medium leading-6 text-[#8C8C8C]'>{description}</p>
						)}
					</section>
				</article>
			</Link>
		</article>
	)
}

export default PropertyCard
