'use client'

import { CreditCard, LogOut, Plus, Settings, User, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { SafeUser } from '@/app/types'
import useAddPropertyModal from '@/app/hooks/useAddPropertyModal'
import { signOut } from 'next-auth/react'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface UserMenuProps {
	currentUser?: SafeUser | null
}

export const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	const router = useRouter()
	const addPropertyModal = useAddPropertyModal()
	const registerModal = useRegisterModal()
	const loginModal = useLoginModal()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='cursor-pointer' asChild>
				<Avatar>
					<AvatarImage src='/images/user.svg' alt='Imagem de usuario' />
					<AvatarFallback>US</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>Acessos rapido</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => router.push('/imoveis')}>
						<User className='mr-2 h-4 w-4' />
						<span>Imóveis à venda</span>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => router.push('/contato')}>
						<CreditCard className='mr-2 h-4 w-4' />
						<span>Contato</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				{currentUser ? (
					<DropdownMenuItem onClick={() => router.push('/favoritos')}>
						<Settings className='mr-2 h-4 w-4' />
						<span>Favoritos</span>
					</DropdownMenuItem>
				) : null}

				<DropdownMenuSeparator />

				{currentUser && currentUser.role === 'ADMIN' ? (
					<>
						<DropdownMenuItem onClick={() => router.push('/propriedades')}>
							<LogOut className='mr-2 h-4 w-4' />
							<span>Propriedades</span>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={addPropertyModal.onOpen}>
							<LogOut className='mr-2 h-4 w-4' />
							<span>Adicionar</span>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => signOut()}>
							<LogOut className='mr-2 h-4 w-4' />
							<span>Sair</span>
						</DropdownMenuItem>
					</>
				) : (
					<DropdownMenuGroup>
						<DropdownMenuItem onClick={loginModal.onOpen}>
							<Users className='mr-2 h-4 w-4' />
							<span>Entrar</span>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={registerModal.onOpen}>
							<Plus className='mr-2 h-4 w-4' />
							<span>Registre-se</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
