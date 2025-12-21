import Phoenix from "../assets/logos/phoenix-white.png"
import SUM from "../assets/logos/sum-white.png"

export default function homeButton() {
	return (
		<button className="flex h-[1.5rem] gap-[0.5rem]">
			<img src={Phoenix} alt="Phoenix logo" />
			<img src={SUM} alt="SUM logo" />
		</button>
	)
}