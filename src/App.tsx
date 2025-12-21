import Nav from './components/Nav'
import Home from './sections/Home'
import Acievement from './sections/Achievement'
import Brotherhood from './sections/Brotherhood'
import Leadership from './sections/Leadership'
import Entrepreneurship from './sections/Entrepreneurship'
import Events from './sections/Events'
import Alumni from './sections/Alumni'
import About from './sections/About'
import Join from './sections/Join'

export default function App() {
	return (
		<>
			<Nav />
			<Home />
			<Acievement />
			<Brotherhood />
			<Leadership />
			<Entrepreneurship />
			<Events />
			<Alumni />
			<About />
			<Join />
		</>
	)
}