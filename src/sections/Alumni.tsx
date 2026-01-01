import SectionHeader from "../components/SectionHeader"
import ActionButtons from "../components/ActionButtons"

export default function Alumni() {
	
	return (
		<section id="alumni-section">
			<SectionHeader sectionName="Alumni"/>
			<span>Earn trust, lead by example.</span>
			<p>We lead by example. We expect the best and keep each other accountable. We inspire others through our actions and optimism. We choose to lead, even without a title, to work toward infecting others with optimism in their ability to succeed.</p>

			<ActionButtons
				sectionName="Alumni"
				link="#alumni"
			/>
		</section>
	)
}