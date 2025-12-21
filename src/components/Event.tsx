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
		<div>
			<h2>{title}</h2>
			<p>{description}</p>
			<span>{location}</span>
			<span>{time}</span>
		</div>
	)
}