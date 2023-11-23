'use client'

import {
	Building,
	Building2,
	CreditCard,
	Home,
	LogOut,
	Phone,
	Plus,
	Settings,
	Star,
	User,
	Users
} from 'lucide-react'

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
						<Home className='mr-2 h-4 w-4' />
						<span>Imóveis à venda</span>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => router.push('/contato')}>
						<Phone className='mr-2 h-4 w-4' />
						<span>Contato</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				{currentUser ? (
					<>
						<DropdownMenuItem onClick={() => router.push('/favoritos')}>
							<Star className='mr-2 h-4 w-4' />
							<span>Favoritos</span>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						{currentUser && currentUser.role === 'ADMIN' ? (
							<>
								<DropdownMenuItem onClick={() => router.push('/gerenciar')}>
									<Building className='mr-2 h-4 w-4' />
									<span>Gerenciar</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={addPropertyModal.onOpen}>
									<Plus className='mr-2 h-4 w-4' />
									<span>Adicionar</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
							</>
						) : null}
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
						<DropdownMenuSeparator />
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
