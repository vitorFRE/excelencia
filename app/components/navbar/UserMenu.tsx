'use client'

import { useCallback, useState } from 'react'
import Avatar from '../Avatar'
import { useRouter } from 'next/navigation'
import MenuItem from './MenuItem'
import { signOut } from 'next-auth/react'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { SafeUser } from '@/app/types'
import useLoginModal from '@/app/hooks/useLoginModal'

interface UserMenuProps {
	currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	const registerModal = useRegisterModal()
	const loginModal = useLoginModal()
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()

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
								{currentUser && currentUser.role === 'ADMIN' ? (
									<>
										<hr />
										<MenuItem onClick={() => router.push('/')} label='Propriedades' />
									</>
								) : null}
								<hr />
								<MenuItem onClick={() => signOut()} label='Sair' />
							</>
						) : (
							<>
								<MenuItem onClick={() => router.push('/')} label='Imóveis à venda' />
								<MenuItem onClick={() => router.push('/')} label='Anuncie seu Imóvel' />
								<MenuItem onClick={() => router.push('/')} label='Contato' />
								<hr />
								<MenuItem onClick={loginModal.onOpen} label='Login' />
								<MenuItem onClick={registerModal.onOpen} label='Cadastrar' />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default UserMenu
