type StoryProps = {
	fullName: string
	image: string
	quote: string
	achievements: string[]
}

export default function Story({
	fullName,
	image,
	quote,
	achievements,
}: StoryProps) {
	
	return (
		<div className="flex flex-col bg-white rounded-(--radius) overflow-hidden p-[0.5rem]! text-black">
			<div className="flex">
				<div className="flex flex-col min-w-[10rem] max-w-[10rem] bg-(--gold) p-[0.5rem]!">
					<img src={image} alt="" />
					<span>{fullName}</span>
				</div>
				<p className="text-(--crimson-dark) text-[0.9rem]!">"{quote}"</p>
			</div>
			<ul className="text-left">
				{achievements.map((item, i) => (
					<li key={`${fullName}-ach-${i}`}>{item}</li>
				))}
			</ul>
		</div>
	)
}