import SectionHeader from "../components/SectionHeader"
import ActionButtons from "../components/ActionButtons"

export default function Journey() {
	return (
		<section id='journey-section'>
			<SectionHeader sectionName="Pledge Journey"/>
			<span>Be ABLE. Be SUM one.</span>
			<h2>Achievement. Brotherhood. Leadership. Entrepreneurship.</h2>
			<p>We build high-achievers through real projects, real standards, and real community.</p>

			<ActionButtons
				sectionName="Pledge Journey"
				link="#alumni"
			/>
		</section>
	)
}