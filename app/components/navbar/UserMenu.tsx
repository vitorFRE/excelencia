'use client'

import { useCallback, useState } from 'react'
import Avatar from '../Avatar'
import { useRouter } from 'next/navigation'
import MenuItem from './MenuItem'

const UserMenu = () => {
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()

	const currentUser = true

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value)
	}, [])
	return (
		<div className='relative'>
			<div className='flex flex-row items-center gap-3'>
				<div onClick={toggleOpen} className='cursor-pointer'>
					<Avatar />
				</div>
			</div>

			{isOpen && (
				<div className='absolute rounded-xl shadow-md w-[40vw] md:w-[15vw] bg-white overflow-hidden right-0 top-14 text-sm'>
					<div className='flex flex-col cursor-pointer'>
						{currentUser ? (
							<>
								<MenuItem onClick={() => router.push('/')} label='Imóveis à venda' />
								<MenuItem onClick={() => router.push('/')} label='Anuncie seu Imóvel' />
								<MenuItem onClick={() => router.push('/')} label='Contato' />
								<MenuItem onClick={() => router.push('/favoritos')} label='Favoritos' />
								<hr />
								<MenuItem onClick={() => router.push('/')} label='Propriedades' />
								<hr />
								<MenuItem onClick={() => {}} label='Sair' />
							</>
						) : (
							<>
								<MenuItem onClick={() => router.push('/')} label='Imóveis à venda' />
								<MenuItem onClick={() => router.push('/')} label='Anuncie seu Imóvel' />
								<MenuItem onClick={() => router.push('/')} label='Contato' />
								<hr />
								<MenuItem onClick={() => {}} label='Login' />
								<MenuItem onClick={() => {}} label='Cadastrar' />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default UserMenu
