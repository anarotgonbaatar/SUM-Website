import SectionHeader from '../components/SectionHeader'
import Pillar from '../components/Pillar'
import ActionButtons from '../components/ActionButtons'
// Achievement
import Story from '../components/Story'
import Boomer from '../assets/stories/William Boomer Baker.jpg'
import DanielC from '../assets/stories/Daniel Cazares.jpg'
import Erick from '../assets/stories/Erick Ojeda.jpeg'
import WeBuilt from '../assets/images/We Built.png'
import WeWent from '../assets/images/We Went.png'
// Brotherhood

// Leadership
import Carousel from '../components/Carousel'
import BoardImage from '../components/BoardImage'
import Marcel from '../assets/board images/Marcel Marable.webp'
import Anar from '../assets/board images/Anar Otgonbaatar.webp'
// import Hikari from '../assets/board images/Hikari.webp'
import Amanjot from '../assets/board images/Amanjot.jpg'
// Entrepreneurship

const boardMembers = [
	{ image: Marcel, fullName: "Marcel Marable", position: "President" },
	{ image: Anar, fullName: "Anar Otgonbaatar", position: "Vice President" },
	// { image: Hikari, fullName: "Hikari Yoshioka", position: "Director of Pledges" },
	{ image: Amanjot, fullName: "Amanjot Singh", position: "Director of Finance" },
]
const boardImages = boardMembers.map((m) => (
	<BoardImage
		key={m.fullName}
		image={m.image}
		fullName={m.fullName}
		position={m.position}
	/>
))

export default function ABLE() {
	return (
		<section id="able-section" className=''>
			<SectionHeader sectionName="Our Pillars"/>
			
			<div className='grid grid-cols-1 lg:grid-cols-4 gap-[1rem] w-full'>
				<Pillar
					pillarName='ACHIEVEMENT'
					tagline='Turn discipline into results.'
					description='We acknowledge our progress toward our goals and measure our personal growth. We celebrate our large accomplishments, as well as our small milestones. We do this all while maintaining focus and optimism in the face of adversity.'
					custom={
						<>
							<div className='flex flex-col gap-[0.5rem] bg-gradient-to-b from-black/10 to-black/30 rounded-(--radius) p-[0.5rem]!'>
								<h3>What We've <span className='text-(--gold)'>Built</span></h3>
								<img src={WeBuilt} alt="Our Startups" className="mix-blend-screen" />
								<div className='flex flex-col'>
									<span>Over $8 billion in business value created.</span>
									<span>Over $1 billion in venture capital raised.</span>
								</div>
							</div>
							<div className='flex flex-col gap-[0.5rem] bg-gradient-to-b from-black/10 to-black/30 rounded-(--radius) p-[0.5rem]!'>
								<h3>Where We've <span className='text-(--gold)'>Been</span></h3>
								<img src={WeWent} alt="Our Employers" className="mix-blend-screen" />
								<span>1 out of every 3 SUM members work at a Fortune 500 or a funded startup.</span>
							</div>
						</>
					}
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
					tagline='Grow together. Win together.'
					description='We are a family that supports each other. We are competitive at heart, but we are cooperative and wish for the success of our fellow brothers and sisters. We prioritize helping our family professionally and personally, always aiming to give first before we receive.'
					custom={
						<>
						
						</>
					}
					more={
						<>
						</>
					}
				/>

				<Pillar
					pillarName='LEADERSHIP'
					tagline='Lead with action, not titles.'
					description='We lead by example. We expect the best and keep each other accountable. We inspire others through our actions and optimism. We choose to lead, even without a title, to work toward infecting others with optimism in their ability to succeed.'
					custom={
						<>
							<h3>The <span className='text-(--gold)'>Board</span></h3>
							<Carousel images={boardImages}/>
						</>
					}
					more={
						<>
						</>
					}
				/>

				<Pillar
					pillarName='ENTREPRENEURSHIP'
					tagline='Build boldly. Rise stronger.'
					description='We are self-starters who take initiative towards our goals. We take calculated risks and do not fear failure; yet we embrace it. Like a phoenix, we are reborn after every failure. Failure is an unavoidable learning step in our path to greatness. We seek to innovate and excel in life; most importantly, looking to be able to pass it forward.'
					custom={
						<>
						
						</>
					}
					more={
						<>
						</>
					}
				/>
			</div>

			<ActionButtons
				sectionName="A.B.L.E."
				link="#alumni"
			/>
		</section>
	)
}