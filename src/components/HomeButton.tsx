import Phoenix from "../assets/logos/phoenix-white.png"
import SUM from "../assets/logos/sum-white.png"

export default function homeButton() {
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
		<button
			className="flex h-[1.5rem] gap-[0.5rem]"
			onClick={() => handleNav("home-section")}
			type="button"
		>
			<img src={Phoenix} alt="Phoenix logo" />
			<img src={SUM} alt="SUM logo" />
		</button>
	)
}