export default function ActionButtons({
	button = "Learn More: ",
	sectionName = "",
	link = "",
} : {
	button?: string
	sectionName?: string
	link?: string
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

	const handleLinkClick = () => {
		if (!link) return

		// hash navigation: "#join-section" or "join-section"
		if (link.startsWith("#")) {
			handleNav(link.slice(1))
			return
		}
		if (!link.includes("://") && !link.startsWith("/")) {
			// treat as section id
			handleNav(link)
			return
		}

		// internal route "/events" or external "https://..."
		window.location.href = link
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
				onClick={handleLinkClick}
				disabled={!link}
			>
				{button} {sectionName}
			</button>
		</div>
	)
}