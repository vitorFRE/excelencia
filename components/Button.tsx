'use client'
import { IconType } from 'react-icons'

interface ButtonProps {
	label: string
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
	disabled?: boolean
	outline?: boolean
	small?: boolean
	icon?: IconType
	maxContent?: boolean
}

const Button: React.FC<ButtonProps> = ({
	label,
	onClick,
	disabled,
	outline,
	small,
	icon: Icon,
	maxContent
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`relative disabled:opacity-70 dark:text-slate-900 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition ${
				maxContent ? 'w-max px-6' : 'w-full'
			} ${outline ? 'bg-white' : 'bg-primary'} ${
				outline ? 'border-black' : 'border-primary'
			} ${outline ? 'text-black' : 'text-white'} ${small ? 'py-1' : 'py-3'} ${
				small ? 'text-sm' : 'text-md'
			} ${small ? 'font-light' : 'font-semibold'} ${
				small ? 'border-[1px]' : 'border-2'
			}`}>
			{Icon && <Icon className='absolute left-4 top-3' size={24} />}
			{label}
		</button>
	)
}

export default Button
