'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavItem = [
	{ href: '/', label: 'Inicio' },
	{ href: '/imoveis', label: 'Imóveis à venda' },
	{ href: '/contato', label: 'Contato' }
]

const Navitems = () => {
	const pathname = usePathname()
	return (
		<nav className='hidden md:flex flex-row items-center gap-2'>
			{NavItem.map((i) => {
				return (
					<Link
						href={i.href}
						key={i.label}
						className={`text-sm ${
							pathname === i.href
								? 'font-bold dark:text-white'
								: 'dark:text-gray-400 font-semibold'
						} `}>
						<Button
							variant={pathname === i.href ? 'outline' : 'ghost'}
							className={pathname === i.href ? 'bg-transparent' : ''}>
							{i.label}
						</Button>
					</Link>
				)
			})}
		</nav>
	)
}

export default Navitems
