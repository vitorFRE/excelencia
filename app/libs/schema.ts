import { z } from 'zod'

export const FormDataSchema = z.object({
	title: z.string().min(6, 'Deve conter no minimo 6 caracteres!!'),

	description: z
		.string()
		.min(6, 'Deve conter no minimo 6 caracteres!')
		.max(600, 'Pode ter no maximo 600 caracteres'),

	price: z
		.number()
		.positive({ message: 'Deve ser um numero positivo' })
		.min(100, 'Deve ser no mínimo um número de três dígitos'),

	area: z
		.number()
		.positive({ message: 'Deve ser um numero positivo' })
		.min(100, 'Deve ser no mínimo um número de três dígitos'),

	buildingArea: z
		.number()
		.positive({ message: 'Deve ser um numero positivo' })
		.min(100, 'Deve ser no mínimo um número de três dígitos'),

	roomCount: z.number().int(),
	bedroomCount: z.number().int(),
	bathroomCount: z.number().int(),

	city: z.string().min(1, 'Deve ter uma cidade'),
	state: z.string().min(1, 'Deve ter um estado'),
	locationValue: z.string(),

	latitude: z.number().nullable(),
	longitude: z.number().nullable()
})
