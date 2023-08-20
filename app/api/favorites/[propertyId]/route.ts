import { NextResponse } from 'next/server'

import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'

interface IParams {
	propertyId?: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return NextResponse.error()
	}

	const { propertyId } = params

	if (!propertyId || typeof propertyId !== 'string') {
		throw new Error('Invalid ID')
	}

	const existingFavorite = await prisma.favorite.findUnique({
		where: {
			user_id_propertyId: {
				user_id: currentUser.id,
				propertyId: propertyId
			}
		}
	})

	if (existingFavorite) {
		return NextResponse.json({ error: 'Projeto já favoritado' }, { status: 400 })
	}

	const newFavorite = await prisma.favorite.create({
		data: {
			user: { connect: { id: currentUser.id } },
			property: { connect: { id: propertyId } }
		}
	})

	return NextResponse.json(newFavorite)
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return NextResponse.error()
	}

	const { propertyId } = params

	if (!propertyId || typeof propertyId !== 'string') {
		throw new Error('Invalid ID')
	}

	const existingFavorite = await prisma.favorite.findUnique({
		where: {
			user_id_propertyId: {
				user_id: currentUser.id,
				propertyId: propertyId
			}
		}
	})

	if (!existingFavorite) {
		return NextResponse.json({ error: 'Projeto não está favoritado' }, { status: 400 })
	}

	await prisma.favorite.delete({
		where: { id: existingFavorite.id }
	})

	return NextResponse.json({ message: 'Favorito removido com sucesso' })
}
