import { useState } from "react"
import type { ReactNode } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"
import PillarTop from "../assets/logos/pillar-top.png"
import PillarBottom from "../assets/logos/pillar-bottom.png"

type PillarProps = {
	pillarName: string
	tagline: string
	description: string
	custom: ReactNode
	link?: string
	defaultExpanded?: boolean
}

export default function Pillar({
	pillarName,
	tagline,
	description,
	custom,
	link,
	defaultExpanded = false,
}: PillarProps) {
	const [expanded, setExpanded] = useState(defaultExpanded)

	return (
		<div
			className="
				flex flex-col w-full overflow-hidden
				items-center justify-center gap-[1rem]
				bg-gradient-to-b from-black/5 to-black/40
				p-[1rem]! rounded-[1rem] shadow-(--shadow)
			"
		>
			<img
				src={PillarTop}
				alt="Top of Pillar"
				className="mix-blend-screen max-w-[12rem]"
			/>

			{/* Clickable header */}
			<button
				type="button"
				onClick={() => setExpanded((v) => !v)}
				className={`
					mt-[-4rem]! py-[0.25rem]! w-full
					backdrop-blur-xs
					bg-gradient-to-r from-transparent via-black/80 to-transparent
					flex items-center justify-center gap-[0.5rem]
					${expanded
						? ""
						: "mt-[-12rem]! mb-[2rem]!"
					}
				`}
				aria-expanded={expanded}
			>
				<h2>{pillarName}</h2>
				{expanded ? <FaChevronUp className="fixed right-[1rem]"/> : <FaChevronDown className="fixed right-[1rem]"/>}
			</button>

			{/* Collapsible content */}
			{expanded && (
				<>
					<span>{tagline}</span>

					<p>{description}</p>

					{custom}

					<button
						className="btn mb-[-1rem]!"
						type="button"
						onClick={() => {
							if (link) window.open(link, "_blank")
						}}
					>
						Learn More: {pillarName}
					</button>

					<img
						src={PillarBottom}
						alt="Bottom of Pillar"
						className="mix-blend-screen max-w-[11rem]"
					/>
				</>
			)}
		</div>
	)
}
