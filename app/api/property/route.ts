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

export async function DELETE(request: Request) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return NextResponse.error()
	}

	if (currentUser.role !== 'ADMIN') {
		return NextResponse.error()
	}

	const body = await request.json()
	const { propertyId } = body

	const property = await prisma.property.findUnique({
		where: {
			id: propertyId
		}
	})

	if (!property) {
		return NextResponse.error()
	}

	if (currentUser.role !== 'ADMIN') {
		return NextResponse.error()
	}

	await prisma.property.delete({
		where: {
			id: propertyId
		}
	})

	return NextResponse.json({ message: 'propriedade deletada' })
}

export async function PATCH(request: Request) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return NextResponse.error()
	}

	if (currentUser.role !== 'ADMIN') {
		return NextResponse.error()
	}

	const body = await request.json()
	const {
		propertyId,
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
		images,
		deletedImageIds
	} = body

	const property = await prisma.property.findUnique({
		where: {
			id: propertyId
		},
		include: {
			images: true
		}
	})

	if (!property) {
		return NextResponse.error()
	}

	const updatedProperty = await prisma.property.update({
		where: {
			id: propertyId
		},
		data: {
			title: title,
			description: description,
			price: price,
			area: area,
			buildingArea: buildingArea,
			bedroomCount: bedroomCount,
			bathroomCount: bathroomCount,
			city: city,
			state: state,
			roomCount: roomCount,
			locationValue: locationValue,
			latitude: latitude,
			longitude: longitude,
			updatedAt: new Date()
		},
		include: {
			images: true
		}
	})

	const updatedImages = images.map(
		(image: { id: any; url: any; imageUrl: any; imageId: any }) => {
			if (image.id && image.url) {
				return {
					imageUrl: image.url,
					imageId: image.id
				}
			} else {
				return {
					imageUrl: image.imageUrl,
					imageId: image.imageId
				}
			}
		}
	)

	// Adiciona novas imagens
	if (images && images.length > 0) {
		for (const image of updatedImages) {
			// Verifica se a imagem já está associada à propriedade pelo ID da imagem
			const existingImage = property.images.find((img) => img.imageId === image.imageId)

			if (!existingImage) {
				await prisma.propertyImage.create({
					data: {
						propertyId: propertyId,
						imageUrl: image.imageUrl,
						imageId: image.imageId
					}
				})
			}
		}
	}

	// Remove imagens existentes
	if (deletedImageIds && deletedImageIds.length > 0) {
		await prisma.propertyImage.deleteMany({
			where: {
				imageId: {
					in: deletedImageIds
				}
			}
		})
	}

	const propertyWithImages = await prisma.property.findUnique({
		where: {
			id: propertyId
		},
		include: {
			images: true
		}
	})

	return NextResponse.json(propertyWithImages)
}
