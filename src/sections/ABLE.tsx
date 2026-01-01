import SectionHeader from '../components/SectionHeader'
import Pillar from '../components/Pillar'
import ActionButtons from '../components/ActionButtons'
import Story from '../components/Story'
import Boomer from '../assets/stories/William Boomer Baker.jpg'
import DanielC from '../assets/stories/Daniel Cazares.jpg'
import Erick from '../assets/stories/Erick Ojeda.jpeg'

export default function ABLE() {
	return (
		<section id="able-section" className=''>
			<SectionHeader sectionName="Our Pillars"/>
			
			<Pillar
				pillarName='ACHIEVEMENT'
				tagline='Turn discipline into results.'
				description='We acknowledge our progress toward our goals and measure our personal growth. We celebrate our large accomplishments, as well as our small milestones. We do this all while maintaining focus and optimism in the face of adversity.'
				more={
					<>
						<h2>Success Stories</h2>
						<div className='flex flex-col gap-[1rem]'>
							<Story
								fullName='William Boomer Baker'
								image={Boomer}
								quote="You are the SUM of 5 people around you or something like that and I'll be teaching your workshops."
								achievements={[
									"CEO of Neuralquant",
									"Investor in Ayli, Bioletic, & Think 66",
									"Made $2+ billions in sales"
								]}
							/>
							<Story
								fullName='Daniel Cazares'
								image={DanielC}
								quote='Being involved may be just as important or more important than your degree.'
								achievements={[
									"Co-Owner of Don Victor Jewelers",
									"Made it on the Inc. 5000 list for fastest growing companies in America",
									"Made multiple 7 figures"
								]}
							/>
							<Story
								fullName='Erick R. OjedaGarcia'
								image={Erick}
								quote='If you’re ready to challenge yourself, build lifelong connections, and unlock new opportunities, I highly recommend joining Sigma Upsilon Mu! ... it’s a launchpad for future leaders, innovators, and game-changers.'
								achievements={[
									"Mayor of Wilmington, CA",
									"CEO of OMGee PIX! LLC, a community-oriented business supporting local nonprofits and events.",
									"Created the Wilmington California Information Network, connecting residents with businesses, nonprofits, and local resources."
								]}
							/>
						</div>
					</>
				}
			/>

			<Pillar
				pillarName='BROTHERHOOD'
				tagline='Turn discipline into results.'
				description='We acknowledge our progress toward our goals and measure our personal growth. We celebrate our large accomplishments, as well as our small milestones. We do this all while maintaining focus and optimism in the face of adversity.'
				more={
					<>
					</>
				}
			/>

			<Pillar
				pillarName='LEADERSHIP'
				tagline='Turn discipline into results.'
				description='We acknowledge our progress toward our goals and measure our personal growth. We celebrate our large accomplishments, as well as our small milestones. We do this all while maintaining focus and optimism in the face of adversity.'
				more={
					<>
					</>
				}
			/>

			<Pillar
				pillarName='ENTREPRENEURSHIP'
				tagline='Turn discipline into results.'
				description='We acknowledge our progress toward our goals and measure our personal growth. We celebrate our large accomplishments, as well as our small milestones. We do this all while maintaining focus and optimism in the face of adversity.'
				more={
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