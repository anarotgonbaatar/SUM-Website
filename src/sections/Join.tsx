import ContactForm from '../components/ContactForm'
import SectionHeader from '../components/SectionHeader'

export default function Join() {
	return (
		<section id='join-section' className='pb-[1rem]!'>
			
			<SectionHeader sectionName="Join ΣYM"/>

			<h2 className="flex flex-wrap gap-[0.4rem]">
				<span>Be</span>
				<span className="text-(--gold)">ABLE</span>
				<span>.</span>
				<span>Be</span>
				<span className="text-(--gold)">SUM</span>
				<span>one.</span>
			</h2>

			<ContactForm/>
			
		</section>
	)
}