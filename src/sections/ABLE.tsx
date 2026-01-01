import SectionHeader from '../components/SectionHeader'
import Pillar from '../components/Pillar'
import ActionButtons from '../components/ActionButtons'

export default function ABLE() {
	return (
		<section id="able-section" className=''>
			<SectionHeader sectionName="Our Pillars"/>
			
			<Pillar
				pillarName='ACHIEVEMENT'
				tagline='Turn discipline into results.'
				description='We acknowledge our progress toward our goals and measure our personal growth. We celebrate our large accomplishments, as well as our small milestones. We do this all while maintaining focus and optimism in the face of adversity.'
				custom={
					<>
					</>
				}
			/>

			<Pillar
				pillarName='BROTHERHOOD'
				tagline='Turn discipline into results.'
				description='We acknowledge our progress toward our goals and measure our personal growth. We celebrate our large accomplishments, as well as our small milestones. We do this all while maintaining focus and optimism in the face of adversity.'
				custom={
					<>
					</>
				}
			/>

			<Pillar
				pillarName='LEADERSHIP'
				tagline='Turn discipline into results.'
				description='We acknowledge our progress toward our goals and measure our personal growth. We celebrate our large accomplishments, as well as our small milestones. We do this all while maintaining focus and optimism in the face of adversity.'
				custom={
					<>
					</>
				}
			/>

			<Pillar
				pillarName='ENTREPRENEURSHIP'
				tagline='Turn discipline into results.'
				description='We acknowledge our progress toward our goals and measure our personal growth. We celebrate our large accomplishments, as well as our small milestones. We do this all while maintaining focus and optimism in the face of adversity.'
				custom={
					<>
					</>
				}
			/>

			<ActionButtons
				sectionName="A.B.L.E."
				link="#alumni"
			/>
		</section>
	)
}