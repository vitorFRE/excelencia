'use client'

import { useIsMobile } from '@/lib/useIsMobile'
import clsx from 'clsx'
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	type MotionStyle,
	type MotionValue
} from 'framer-motion'
import { useEffect, useState, type MouseEvent } from 'react'

type WrapperStyle = MotionStyle & {
	'--x': MotionValue<string>
	'--y': MotionValue<string>
}

interface CardProps {
	bgClass?: string
}

function FeatureCard({
	bgClass,
	children
}: CardProps & {
	children: React.ReactNode
}) {
	const [mounted, setMounted] = useState(false)
	const mouseX = useMotionValue(0)
	const mouseY = useMotionValue(0)
	const isMobile = useIsMobile()

	function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
		if (isMobile) return
		const { left, top } = currentTarget.getBoundingClientRect()
		mouseX.set(clientX - left)
		mouseY.set(clientY - top)
	}

	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		<motion.div
			className='animated-feature-cards relative w-full drop-shadow-[0_0_15px_rgba(49,49,49,0.2)] dark:drop-shadow-[0_0_15px_rgba(49,49,49,0.2)]'
			onMouseMove={handleMouseMove}
			style={
				{
					'--x': useMotionTemplate`${mouseX}px`,
					'--y': useMotionTemplate`${mouseY}px`
				} as WrapperStyle
			}>
			<div
				className={clsx(
					'group relative w-full overflow-hidden rounded-3xl border bg-gradient-to-b from-neutral-50/90 to-neutral-100/90 transition duration-300 dark:from-slate-950/90 dark:to-slate-900/90',
					'md:hover:border-transparent',
					bgClass
				)}>
				<div className='m-4 sm:m-6 '>{mounted ? children : null}</div>
			</div>
		</motion.div>
	)
}

export default FeatureCard

interface Props {
	icon: JSX.Element
	titulo: string
	descrição: string
}

export const ServicesCard: React.FC<Props> = ({ icon, titulo, descrição }) => {
	return (
		<FeatureCard bgClass='h-full'>
			<div className=''>
				{icon}
				<h2 className='font-semibold text-xl dark:text-slate-50 mb-2'>{titulo}</h2>
				<p className='dark:text-slate-400'>{descrição}</p>
			</div>
		</FeatureCard>
	)
}
