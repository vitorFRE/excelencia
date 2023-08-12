import Link from 'next/link'

const NavItem = [
	{ href: '/', label: 'Imóveis à venda' },
	{ href: '/', label: 'Anuncie seu Imóvel' },
	{ href: '/', label: 'Contato' }
]

const Navitems = () => {
	return (
		<nav className='hidden md:flex flex-row items-center gap-2'>
			{NavItem.map((i) => {
				return (
					<Link href={i.href} key={i.label} className='text-sm font-semibold'>
						{i.label}
					</Link>
				)
			})}
		</nav>
	)
}

export default Navitems
