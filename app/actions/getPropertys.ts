import prisma from '@/app/libs/prismadb'

export interface IPropertysParams {
	take?: number
	orderBy?: 'asc' | 'desc'
}

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

export interface PropertyImage {
	id: string
	property: Property
	propertyId: string
	imageUrl: string
	imageId: string
	createdAt: Date
	updatedAt: Date
}

export default async function getPropertys(
	params: IPropertysParams
): Promise<Property[]> {
	try {
		const { take, orderBy = 'desc' } = params

		const queryOptions: any = {
			orderBy: {
				createdAt: orderBy
			},
			include: {
				images: true
			}
		}

		if (take !== undefined) {
			queryOptions.take = take
		}

		const propertys = await prisma.property.findMany(queryOptions)

		return propertys
	} catch (error: any) {
		throw new Error(error)
	}
}
