import { FaChevronRight } from "react-icons/fa6"

export default function Milestone({
	title = "",
	image = "",
	tagline = "",
	points = [],
} : {
	title: string
	image: string
	tagline: string
	points: string[]
}) {
	return (
		<div className="relative flex items-center gap-[1rem] w-full">
			<div 
				className="
					flex flex-col w-full overflow-hidden
					border-[0.25rem] border-black rounded-(--radius)
					bg-gradient-to-b from-black/50 to-black/95 backdrop-blur-xs text-white
					gap-[0.5rem] shadow-(--shadow)
				"
			>
				<img src={image} alt="" />
				<h2 className="text-(--gold)">{title}</h2>
				<span>{tagline}</span>
				
				<ul>
					{points.map((p) => (
						<li key={p}>{p}</li>
					))}
				</ul>
			</div>
			<FaChevronRight/>
		</div>
	)
}