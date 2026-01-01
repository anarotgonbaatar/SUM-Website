export default function Event({
	title = "",
	description = "",
	location = "TBD",
	month = "TBD",
	day = "TBD",
	time = "TBD",
} : {
	title: string
	description: string
	location: string
	month: string
	day: string
	time: string
}) {
	return (
		<div 
			className="
				flex max-w-[25rem] w-full
				bg-gradient-to-b from-(--gold)/95 to-(--gold)/70
				rounded-[1.5rem] overflow-hidden shadow-(--shadow)
			"
		>
			{/* Date */}
			<div className="flex flex-col bg-gradient-to-t from-black to-black/75 p-[1rem]! min-w-[8rem] max-w-[8rem] text-shadow-[0_0_1rem_var(--gold)]">
				<span>{month}</span>
				<span className="text-[3rem]!">{day}</span>
			</div>
			{/* Details */}
			<div className="flex flex-col text-start p-[0.5rem]! text-black w-full">
				<h2>{title}</h2>
				<p>{description}</p>
				<span>Location: {location} @ {time}</span>
				<button
					className="btn text-white ml-auto!"
					type="button"
				>
					RSVP
				</button>
			</div>
		</div>
	)
}