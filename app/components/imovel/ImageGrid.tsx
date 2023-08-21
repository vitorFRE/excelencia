'use client'

import React from 'react'
import Image from 'next/image'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

interface ImageData {
	id: string
	imageUrl: string
}

interface ImageGridProps {
	images: ImageData[]
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
	return (
		<Swiper
			slidesPerView={'auto'}
			spaceBetween={30}
			loop={true}
			pagination={{
				clickable: true
			}}
			autoplay={{
				delay: 2500,
				disableOnInteraction: false
			}}
			modules={[Autoplay]}
			className='h-[450px] mt-4 select-none'
			breakpoints={{
				320: { slidesPerView: 1 },
				640: { slidesPerView: 2 },
				768: { slidesPerView: 2 },
				1024: { slidesPerView: 3 },
				1280: { slidesPerView: 3 },
				1440: { slidesPerView: 4 }
			}}>
			{images.map((image) => (
				<SwiperSlide
					key={image.id}
					className=' w-full h-[500px] overflow-hidden rounded-xl relative cursor-pointer'>
					<Image
						fill
						className='object-cover w-full'
						src={image.imageUrl}
						alt={`Image ${image.id}`}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	)
}

export default ImageGrid
