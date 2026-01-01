import SectionHeader from "../components/SectionHeader"
import ActionButtons from "../components/ActionButtons"

export default function About() {
	
	return (
		<section id="about-section">
			<SectionHeader sectionName="About ΣYM"/>
			<span>Sigma Upsilon Mu</span>
			<h2>Achievement. Brotherhood. Leadership. Entrepreneurship.</h2>
			<p>We build high-achievers through real projects, real standards, and real community.</p>

			<ActionButtons
				sectionName="About"
				link="#alumni"
			/>
		</section>
	)
}