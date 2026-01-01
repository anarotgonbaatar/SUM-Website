import PillarTop from '../assets/logos/pillar-top.png'
import PillarBottom from '../assets/logos/pillar-bottom.png'
import type { ReactNode } from 'react'

export default function Pillar({
	pillarName,
	tagline,
	description,
	custom,
	link,
}: {
	pillarName: string
	tagline: string
	description: string
	custom: ReactNode
	link?: string
}) {
	return (
		<div
			className='
				flex flex-col items-center justify-center gap-[1rem]
				bg-gradient-to-b from-black/5 to-black/40
				p-[1rem]! rounded-[1rem] shadow-(--shadow)
			'
		>
			<img
				src={PillarTop}
				alt="Top of Pillar"
				className='mix-blend-screen max-w-[12rem]'
			/>
			<div
				className='
					mt-[-4rem]! py-[0.25rem]! w-full backdrop-blur-xs
					bg-gradient-to-r from-transparent via-black/80 to-transparent
				'
			>
				<h2>{pillarName}</h2>
			</div>

			<span>{tagline}</span>

			<p>{description}</p>

			{/* Insert custom content here */}
			{custom}

			<button
				className="btn mb-[-1rem]!"
				type="button"
			>
				Learn More: {pillarName}
			</button>
			<img 
				src={PillarBottom}
				alt="Bottom of Pillar"
				className='mix-blend-screen max-w-[11rem]'
			/>
		</div>
	)
}