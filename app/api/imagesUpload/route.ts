import { NextResponse, NextRequest } from 'next/server'

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(request: NextRequest) {
	const body = await request.formData()
	const items = body.getAll('image') as File[]
	const data = await Promise.all(items.map(async (item: File) => await Uploader(item)))

	return NextResponse.json({
		data
	})
}

async function Uploader(pinga: File) {
	try {
		const [mime, type] = pinga.type.split('/')

		const bomba = await pinga.arrayBuffer()
		const buffer = Buffer.from(bomba).toString('base64')

		const dale = `data:${mime}/${type};base64,${buffer}`
		return await cloudinary.uploader.upload(dale, {
			upload_preset: 'excelencia',
			overwrite: true,
			invalidate: true
		})
	} catch (err) {
		console.log('DEBUG(pinga)', err)
	}
}
