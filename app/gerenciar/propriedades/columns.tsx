'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Property, PropertyImage } from '@/app/actions/getPropertys'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const columns: ColumnDef<Property>[] = [
	{
		accessorKey: 'images',
		header: 'Image',
		cell: ({ row }) => {
			const img: PropertyImage[] = row.getValue('images')
			const propertyId = row.original.id

			return (
				<Link className='cursor-pointer' href={`/imovel/${propertyId}`}>
					<picture>
						<img
							src={img[0].imageUrl}
							alt='Imagem'
							style={{ width: '50px', height: '50px' }}
						/>
					</picture>
				</Link>
			)
		}
	},
	{
		accessorKey: 'title',
		header: 'Nome'
	},
	{
		accessorKey: 'price',
		header: 'Preço',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('price'))
			const formatted = new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL'
			}).format(amount)

			return <div className='font-medium'>{formatted}</div>
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<span className='sr-only'>Abrir menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Ações</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link href={`/gerenciar/editar/${row.original.id}`}>Editar</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>Excluir</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
	}
]
