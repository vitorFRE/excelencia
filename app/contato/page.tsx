'use client'

import Container from '../components/Container'
import Heading from '../components/Heading'
import { LuMapPin, LuMail, LuPhone } from 'react-icons/lu'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { LuDollarSign, LuHome, LuWallet } from 'react-icons/lu'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SendHorizonal } from 'lucide-react'

const formaSchema = z.object({
	username: z.string().min(2, {
		message: 'O nome deve conter no minimo 2 letras.'
	}),
	email: z
		.string()
		.min(1, { message: 'Esse campo deve ser preenchido.' })
		.email('Deve ser um email valido'),
	descricao: z.string().min(1, 'Escreva sua menssagem ou duvida!'),
	phone: z.string().refine(
		(value) => {
			const phoneNumberRegex = /^\d{11}$/
			return phoneNumberRegex.test(value)
		},
		{
			message: 'Deve ser um número de telefone válido no formato brasileiro.'
		}
	)
})

const infos = [
	{
		icon: <LuDollarSign className='text-blue-600 mb-6' size={45} />,
		titulo: 'Financiamento habitacional',
		descrição:
			'Oferecemos empréstimos com condições vantajosas e sem a necessidade de avalista para funcionários de órgãos conveniados e aposentados do INSS. Aproveite nossas excelentes condições de crédito.'
	},
	{
		icon: <LuHome className='text-blue-600 mb-6' size={45} />,
		titulo: 'Anuncie seu Imóvel',
		descrição:
			'Divulgue o seu imóvel conosco! Temos as melhores opções de anúncios para você que deseja vender ou alugar a sua propriedade. Conte com a nossa equipe especializada e alcance um público maior.'
	},
	{
		icon: <LuWallet className='text-blue-600 mb-6' size={45} />,
		titulo: 'Empréstimos Consignado',
		descrição:
			'Precisando de dinheiro? Faça um empréstimo consignado! Com taxas de juros reduzidas e pagamento facilitado, o empréstimo consignado é a solução ideal para quem precisa de dinheiro rápido e sem burocracia.'
	}
]

const ContactPage = () => {
	const form = useForm<z.infer<typeof formaSchema>>({
		resolver: zodResolver(formaSchema),
		defaultValues: {
			username: '',
			email: '',
			descricao: '',
			phone: ''
		}
	})

	function onSubmit(values: z.infer<typeof formaSchema>) {
		console.log(values)
	}

	return (
		<Container>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-11'>
				<div>
					<Heading
						title='Entre em contato'
						subtitle='Entre em contato conosco para receber um atendimento personalizado e descobrir as melhores oportunidades no mundo imobiliário.'
					/>
					<div className='flex flex-col gap-4 mt-6'>
						<hr />
						<div className='flex gap-4'>
							<LuMapPin className='text-blue-600' size={24} />
							<div>
								<p className='uppercase text-blue-600 font-medium'>endereço</p>
								<p>Rua do reis, Jardim</p>
								<p>São Paulo, SP</p>
							</div>
						</div>
						<hr />
						<div className='flex gap-4'>
							<LuPhone className='text-blue-600' size={24} />
							<div>
								<p className='uppercase text-blue-600 font-medium'>telefone</p>
								<p>(00) 00000-0000</p>
								<p>(00) 00000-0000</p>
							</div>
						</div>
						<hr />
						<div className='flex gap-4'>
							<LuMail className='text-blue-600' size={24} />
							<div>
								<p className='uppercase text-blue-600 font-medium'>email</p>
								<p>excelencia@gmail.com</p>
								<p>excelencia@gmail.com</p>
							</div>
						</div>
					</div>
				</div>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-8 mt-6 sm:mt-0 border rounded-md py-5 px-4 dark:bg-[#191A1E]'>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input placeholder='nome' {...field} />
									</FormControl>
									<FormDescription>Nome para entrar em contato.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder='nome@email.com' {...field} />
									</FormControl>
									<FormDescription>Email que entraremos em contato.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Telefone</FormLabel>
									<FormControl>
										<Input
											className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
											type='number'
											onWheel={(event) => event.currentTarget.blur()}
											placeholder='(00) 99999-9999'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='descricao'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descrição</FormLabel>
									<FormControl>
										<Textarea placeholder='Sobre o que você quer falar ?' {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className='flex gap-2' type='submit'>
							Enviar <SendHorizonal size={16} />
						</Button>
					</form>
				</Form>
			</div>

			<section className='pt-[75px]'>
				<Heading title='Nossos serviços' subtitle='Confira alguns de nossos serviços' />

				<div className='pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8'>
					{infos.map((i) => (
						<div
							key={i.titulo}
							className='dark:bg-[#191A1E] border  rounded-lg py-5 px-4'>
							{i.icon}
							<h2 className='font-semibold text-xl dark:text-slate-50 mb-2'>
								{i.titulo}
							</h2>
							<p className='dark:text-slate-400'>{i.descrição}</p>
						</div>
					))}
				</div>
			</section>
		</Container>
	)
}

export default ContactPage
