import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import getCurrentUser from '@/app/actions/getCurrentUser'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(request: Request) {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return NextResponse.error()
	}

	if (currentUser.role !== 'ADMIN') {
		return NextResponse.error()
	}
	try {
		const body = await request.json()
		const { imageIds } = body

		const deleteResult = await deleteImage(imageIds)

		return NextResponse.json({ message: 'Images deleted successfully', deleteResult })
	} catch (error) {
		return NextResponse.error()
	}
}

async function deleteImage(publicIds: any) {
	return new Promise((resolve, reject) => {
		cloudinary.api.delete_resources(publicIds, (error, result) => {
			if (error) {
				reject(error)
			} else {
				resolve(result)
			}
		})
	})
}
