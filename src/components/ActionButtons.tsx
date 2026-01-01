export default function ActionButtons({
	sectionName = "",
	link = "",
} : {
	sectionName: string
	link: string
}) {
	const handleNav = (id: string) => {
		if (window.location.pathname !== "/") {
			window.location.href = `/#${id}`
			return
		}
		
		const section = document.getElementById(id)
		if (section) {
			section.scrollIntoView({ behavior: "smooth"})
		}
	}
	
	return (
		<div className="flex gap-[1rem]">
			<button 
				className="cta btn" 
				onClick={() => handleNav("join-section")}
			>
					Join SUM
			</button>
			<button 
				className="btn"
			>
				Learn More: {sectionName}
			</button>
		</div>
	)
}