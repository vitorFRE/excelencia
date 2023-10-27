'use client'
import { Button } from '@/components/ui/button'
import { Ghost } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavItem = [
	{ href: '/imoveis', label: 'Imóveis à venda' },
	{ href: '/contato', label: 'Anuncie seu Imóvel' },
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
								? 'font-bold dark:text-slate-200'
								: 'dark:text-slate-400 font-semibold'
						} `}>
						<Button variant={pathname === i.href ? 'outline' : 'ghost'}>{i.label}</Button>
					</Link>
				)
			})}
		</nav>
	)
}

export default Navitems
