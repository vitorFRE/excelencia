import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { imageIds } = body

		const deleteResult = await deleteImage(imageIds)

		return NextResponse.json({ message: 'Images deleted successfully', deleteResult })
	} catch (error) {
		console.error('Error:', error)
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

/* axios
			.post('/api/imageDelete', { imagesId })
			.then(() => {
				toast.success('Imagens excluidas')
			})
			.catch(() => {
				toast.error('Algo de errado não esta certo')
			})
			.finally(() => {
				setIsLoading(false)
			}) */
