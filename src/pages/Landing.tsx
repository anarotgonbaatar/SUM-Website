import Navbar from "../components/layout/Navbar"
import Home from "../sections/Home"
import About from "../sections/About"
import Stories from "../sections/Stories"
import Mission from "../sections/Mission"
import Gallery from "../sections/Gallery"
import Events from "../sections/Events"
import BeSumOne from "../sections/BeSumOne"

export default function Landing() {
	return (
		<>
			<Navbar />
			<main>
				<Home />
				<About />
				<Stories />
				<Mission />
				<Gallery />
				<Events />
				<BeSumOne />
			</main>
		</>
	)
}
