import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'
import { Favorite } from '@prisma/client'
import { FullFavoriteInfo } from '../types'

export default async function getFavoriteListings(): Promise<FullFavoriteInfo[]> {
	try {
		const currentUser = await getCurrentUser()

		if (!currentUser) {
			return []
		}

		const favorites = await prisma.favorite.findMany({
			where: {
				user_id: currentUser.id
			},
			include: {
				property: {
					include: {
						images: {
							orderBy: {
								createdAt: 'asc'
							}
						}
					}
				}
			}
		})

		return favorites
	} catch (error: any) {
		throw new Error(error)
	}
}
