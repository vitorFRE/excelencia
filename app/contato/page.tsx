'use client'

import Container from '../components/Container'
import Heading from '../components/Heading'
import { LuMapPin, LuMail, LuPhone } from 'react-icons/lu'
import Textarea from '../components/inputs/TextArea'
import Input from '../components/inputs/Input'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '../components/Button'

import { LuDollarSign, LuHome, LuWallet } from 'react-icons/lu'

const infos = [
	{
		icon: <LuDollarSign className='text-primary mb-6' size={45} />,
		titulo: 'Financiamento habitacional',
		descrição:
			'Oferecemos empréstimos com condições vantajosas e sem a necessidade de avalista para funcionários de órgãos conveniados e aposentados do INSS. Aproveite nossas excelentes condições de crédito.'
	},
	{
		icon: <LuHome className='text-primary mb-6' size={45} />,
		titulo: 'Anuncie seu Imóvel',
		descrição:
			'Divulgue o seu imóvel conosco! Temos as melhores opções de anúncios para você que deseja vender ou alugar a sua propriedade. Conte com a nossa equipe especializada e alcance um público maior.'
	},
	{
		icon: <LuWallet className='text-primary mb-6' size={45} />,
		titulo: 'Empréstimos Consignado',
		descrição:
			'Precisando de dinheiro? Faça um empréstimo consignado! Com taxas de juros reduzidas e pagamento facilitado, o empréstimo consignado é a solução ideal para quem precisa de dinheiro rápido e sem burocracia.'
	}
]

const ContactPage = () => {
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			message: ''
		}
	})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		//setIsLoading(true)

		console.log(data)
	}
	return (
		<Container>
			<div className='mt-[75px]'>
				<Heading
					title='Entre em contato'
					subtitle='Entre em contato conosco para receber um atendimento personalizado e descobrir as melhores oportunidades no mundo imobiliário.'
				/>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-11'>
				<div className='flex flex-col gap-4'>
					<div className='flex gap-4'>
						<LuMapPin className='text-primary' size={24} />
						<div>
							<p className='uppercase text-primary font-medium'>endereço</p>
							<p>Rua do reis, Jardim</p>
							<p>São Paulo, SP</p>
						</div>
					</div>
					<hr />
					<div className='flex gap-4'>
						<LuPhone className='text-primary' size={24} />
						<div>
							<p className='uppercase text-primary font-medium'>telefone</p>
							<p>(00) 00000-0000</p>
							<p>(00) 00000-0000</p>
						</div>
					</div>
					<hr />
					<div className='flex gap-4'>
						<LuMail className='text-primary' size={24} />
						<div>
							<p className='uppercase text-primary font-medium'>email</p>
							<p>excelencia@gmail.com</p>
							<p>excelencia@gmail.com</p>
						</div>
					</div>
				</div>

				<div className='defaultBorder h-max'>
					<form className='flex flex-col gap-4'>
						<Input
							id='name'
							label='Nome'
							disabled={isLoading}
							register={register}
							errors={errors}
							required
						/>
						<Input
							id='email'
							type='email'
							label='Email'
							disabled={isLoading}
							register={register}
							errors={errors}
							required
						/>
						<Input
							id='phone'
							type='number'
							label='Número'
							disabled={isLoading}
							register={register}
							errors={errors}
							required
						/>
						<Textarea
							id='message'
							label='Mensagem'
							disabled={isLoading}
							register={register}
							errors={errors}
							required
						/>
						<Button label='Enviar Mensagem' maxContent onClick={handleSubmit(onSubmit)} />
					</form>
				</div>
			</div>

			<section className='pt-[75px]'>
				<Heading title='Nossos serviços' subtitle='Confira alguns de nossos serviços' />

				<div className='pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8'>
					{infos.map((i) => (
						<div
							key={i.titulo}
							className='bg-white/70 border border-cBorder rounded-lg py-5 px-4'>
							{i.icon}
							<h2 className='font-semibold text-2xl mb-2'>{i.titulo}</h2>
							<p className='text-[#374151]'>{i.descrição}</p>
						</div>
					))}
				</div>
			</section>
		</Container>
	)
}

export default ContactPage
