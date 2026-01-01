import ContactForm from '../components/ContactForm'
import SectionHeader from '../components/SectionHeader'

export default function Home() {
	return (
		<section id='join-section'>
			
			<SectionHeader sectionName="Join ΣYM"/>
			<span>Be ABLE. Be SUM one.</span>
			<h2>Achievement. Brotherhood. Leadership. Entrepreneurship.</h2>
			<p>We build high-achievers through real projects, real standards, and real community.</p>

			<ContactForm/>
		</section>
	)
}