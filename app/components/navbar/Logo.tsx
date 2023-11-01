'use client'

import { useRouter } from 'next/navigation'

const Logo = () => {
	const router = useRouter()

	return (
		<picture className='cursor-pointer' onClick={() => router.push('/')}>
			<img src='/images/logo.svg' className='block dark:hidden' alt='Logo Excelencia' />
			<img
				src='/images/logo-dark.svg'
				className='hidden dark:block'
				alt='Logo Excelencia'
			/>
		</picture>
	)
}


export default Logo
