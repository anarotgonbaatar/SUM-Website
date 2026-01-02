import Nav from './components/Nav'
import Home from './sections/Home'
import ABLE from './sections/ABLE'
import Journey from './sections/Journey'
import Events from './sections/Events'
import Alumni from './sections/Alumni'
import About from './sections/About'
import Join from './sections/Join'
import Footer from './components/Footer'

export default function App() {
	return (
		<>
			<Nav />
			<Home />
			<About />
			<ABLE />
			<Journey />
			<Alumni />
			<Events />
			<Join />
			<Footer/>
		</>
	)
}