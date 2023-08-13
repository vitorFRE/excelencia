'use client'

import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import axios from 'axios'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { signIn } from 'next-auth/react'

const RegisterModal = () => {
	const registerModal = useRegisterModal()
	const [isLoading, setIsloading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsloading(true)

		axios
			.post('/api/register', data)
			.then(() => {
				toast.success('Conta criada')
				registerModal.onClose()
			})
			.catch((error) => {
				toast.error('Alguma coisa foi de F')
			})
			.finally(() => {
				setIsloading(false)
			})
	}

	const toggle = useCallback(() => {
		registerModal.onClose()
	}, [registerModal])

	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<Heading title='Bem-vindo ao Devlar' subtitle='Crie uma conta' />
			<Input
				id='email'
				label='Email'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id='name'
				label='Nome'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id='password'
				type='password'
				label='Senha'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	)

	const footerContent = (
		<div className='flex flex-col gap-4 mt-3'>
			<hr />
			<Button
				outline
				label='Registre-se com o Google'
				icon={FcGoogle}
				onClick={() => signIn('google')}
			/>

			<div className='text-neutral-500 text-center mt-4 font-light'>
				<div className='justify-center flex flex-row items-center gap-2'>
					<div>Já tem uma conta ?</div>
					<div
						onClick={toggle}
						className='text-neutral-800 cursor-pointer hover:underline'>
						Entre
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title='Registrar'
			actionLabel='Continue'
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	)
}

export default RegisterModal
