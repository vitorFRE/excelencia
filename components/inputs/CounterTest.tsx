import { LuMinus, LuPlus } from 'react-icons/lu'
import { useCallback } from 'react'

interface CounterProps {
	title: string
	subTitle: string
	value: number
	onValueChange: (value: number) => void
}

const CounterT: React.FC<CounterProps> = ({ onValueChange, subTitle, title, value }) => {
	const onAdd = useCallback(() => {
		onValueChange(value + 1)
	}, [onValueChange, value])

	const onReduce = useCallback(() => {
		if (value === 0) {
			return
		}

		onValueChange(value - 1)
	}, [onValueChange, value])

	return (
		<div className='flex flex-row items-center justify-between'>
			<div className='flex flex-col'>
				<div className='font-medium'>{title}</div>
				<div className='font-light text-muted-foreground mt-2'>{subTitle}</div>
			</div>
			<div className='flex flex-row items-center gap-4'>
				<div
					onClick={onReduce}
					className='w-10 h-10 rounded-full border-[1px] border-primary flex items-center justify-center cursor-pointer hover:opacity-80 transition'>
					<LuMinus />
				</div>
				<div className='font-light text-xl'>{value}</div>
				<div
					onClick={onAdd}
					className='w-10 h-10 rounded-full border-[1px] border-primary flex items-center justify-center  cursor-pointer hover:opacity-80 transition'>
					<LuPlus />
				</div>
			</div>
		</div>
	)
}

export default CounterT
