'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
	const router = useRouter()
	return (
		<Image
			onClick={() => router.push('/')}
			alt='Logo'
			className='cursor-pointer'
			width={178}
			height={45}
			src={'/images/logo.svg'}
		/>
	)
}

export default Logo
