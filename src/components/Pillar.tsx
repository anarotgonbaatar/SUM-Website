import { useState } from "react"
import type { ReactNode } from "react"
import { FaChevronDown, FaChevronUp, FaX } from "react-icons/fa6"
import PillarTop from "../assets/logos/pillar-top.png"
import PillarBottom from "../assets/logos/pillar-bottom.png"

type PillarProps = {
	pillarName: string
	tagline: string
	description: string
	custom: ReactNode
	more: ReactNode
}

export default function Pillar({
	pillarName,
	tagline,
	description,
	custom,
	more,
}: PillarProps) {
	const [expanded, setExpanded] = useState(false)
	const [showModal, setShowModal] = useState(false)

	return (
		<div
			className="
				flex flex-col w-full overflow-hidden
				items-center justify-center gap-[1rem]
				bg-gradient-to-b from-black/5 to-black/40
				p-[1rem]! rounded-[1rem] shadow-(--shadow)
				w-full lg:w-[] max-w-[30rem] ml-auto! mr-auto!
			"
		>
			<img
				src={PillarTop}
				alt="Top of Pillar"
				className="mix-blend-screen max-w-[12rem] opacity-85"
			/>

			{/* Clickable header */}
			<button
				type="button"
				onClick={() => setExpanded((v) => !v)}
				className={`
					mt-[-4rem]! py-[0.5rem]! w-full
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
				<div>
					<h2>{pillarName}</h2>
					<span className="text-[0.9rem]! opacity-90">{tagline}</span>
				</div>
				{expanded ? <FaChevronUp className="fixed right-[1rem]"/> : <FaChevronDown className="fixed right-[1rem]"/>}
			</button>

			{/* Collapsible content */}
			{expanded && (
				<>
					<p className="text-[0.9rem]!">{description}</p>

					{custom}

					<button
						className="btn mb-[-1rem]!"
						type="button"
						onClick={() => setShowModal(true)}
					>
						Learn More: {pillarName}
					</button>

					<img
						src={PillarBottom}
						alt="Bottom of Pillar"
						className="mix-blend-screen max-w-[11rem] opacity-85"
					/>
				</>
			)}

			{/* Learn More Modal */}
			{showModal && (
				<div
					className="
						fixed inset-0 z-2000
						flex items-center justify-center
						p-[3.5rem_0.5rem]!
						bg-black/50 backdrop-blur-xs
						transition-opacity duration-250
					"
					onClick={() => setShowModal(false)}
				>
					{/* Modal card */}
					<div
						onClick={(e) => e.stopPropagation()}
						className="
							relative
							w-full h-full
							bg-black/80
							rounded-[1.5rem]
							shadow-(--shadow)
							p-[0.5rem]!
							flex flex-col
							animate-fade-in
						"
					>
						<h2 className="my-[0.5rem]!">{pillarName}</h2>

						{/* Scrollable content */}
						<div className="flex-1 overflow-y-auto pr-[0.5rem]!">
							{more}
						</div>

						{/* Close button */}
						<button
							type="button"
							onClick={() => setShowModal(false)}
							className="
								btn ml-auto!
							"
							title="Close button"
						>
							<FaX/>
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
