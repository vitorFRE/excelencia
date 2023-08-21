import prisma from '@/app/libs/prismadb'

export interface Property {
	id: string
	title: string
	description: string
	price: number
	area: number
	buildingArea: number
	bedroomCount: number
	bathroomCount: number
	city: string
	state: string
	roomCount: number
	locationValue: string
	createdAt: Date
	updatedAt: Date
	latitude?: number
	longitude?: number
	images?: PropertyImage[]
}

interface PropertyImage {
	id: string
	property: Property
	propertyId: string
	imageUrl: string
	imageId: string
	createdAt: Date
	updatedAt: Date
}

export default async function getPropertyById(propertyId: string) {
	try {
		const property = await prisma.property.findUnique({
			where: { id: propertyId },
			include: {
				images: true
			}
		})

		return property || null
	} catch (error: any) {
		throw new Error(error)
	}
}
