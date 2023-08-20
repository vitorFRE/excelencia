import { Favorite, Property, PropertyImage, User } from '@prisma/client'

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
	createdAt: string
	updatedAt: string
	emailVerified: string | null
	favorites: Favorite[]
}

export interface FullFavoriteInfo {
	id: string
	user_id: string
	propertyId: string
	property: Property & {
		images: PropertyImage[]
	}
}
