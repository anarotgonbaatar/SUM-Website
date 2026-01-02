export default function BoardImage({
	fullName = "",
	position = "",
	image = "",
} : {
	image: string
	fullName: string
	position: string
}) {
	
	return (
		<div
			className="
				flex flex-col overflow-hidden
				rounded-(--radius) border-[0.25rem] border-(--gold)
				text-black bg-(--gold)
			"
		>
			<img src={image} alt={fullName}/>
			<div className="mt-[-1.75rem]! bg-black/20 h-[1.75rem] backdrop-blur-xs">
				<span className="text-white font-[Georgia]! tracking-wider">
					{fullName}
				</span>
			</div>
			<span>{position}</span>
		</div>
	)
}