import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(request: Request) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return NextResponse.error()
	}

	if (currentUser.role !== 'ADMIN') {
		return NextResponse.error()
	}

	const body = await request.json()
	const {
		title,
		description,
		price,
		area,
		buildingArea,
		bedroomCount,
		bathroomCount,
		city,
		state,
		roomCount,
		locationValue,
		latitude,
		longitude,
		images
	} = body

	const numericPrice = parseFloat(price)
	const numericArea = parseFloat(area)
	const numericBuildingArea = parseFloat(buildingArea)

	const property = await prisma.property.create({
		data: {
			title,
			description,
			price: numericPrice,
			area: numericArea,
			buildingArea: numericBuildingArea,
			bedroomCount,
			bathroomCount,
			city,
			state,
			roomCount,
			locationValue,
			latitude,
			longitude,
			owner: {
				connect: {
					id: currentUser.id
				}
			}
		}
	})

	if (images && images.length > 0) {
		for (const image of images) {
			await prisma.propertyImage.create({
				data: {
					propertyId: property.id,
					imageUrl: image.url,
					imageId: image.id
				}
			})
		}
	}

	return NextResponse.json(property)
}
