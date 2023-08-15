import prisma from '@/app/libs/prismadb'

export interface IPropertysParams {
	take?: number
	orderBy?: 'asc' | 'desc'
}

export default async function getPropertys(params: IPropertysParams) {
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
