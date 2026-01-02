import SectionHeader from "../components/SectionHeader"
import ActionButtons from "../components/ActionButtons"
import Milestone from "../components/Milestone"
import Carousel from "../components/Carousel"

// Images
import Info from '../assets/photos/IMG_8578.jpg'

const milestones = [
	{
		image: Info,
		title: "Bid Dinner",
		tagline: "Vice President",
		points: ["Gain", "Do", "Leave with",]
	},
	{
		image: Info,
		title: "Alumni Night",
		tagline: "Director of Finance",
		points: ["Gain", "Do", "Leave with",]
	},
	{
		image: Info,
		title: "Interviews",
		tagline: "Director of Finance",
		points: ["Gain", "Do", "Leave with",]
	},
	{
		image: Info,
		title: "Big & Little Reveal",
		tagline: "Director of Finance",
		points: ["Gain", "Do", "Leave with",]
	},
	{
		image: Info,
		title: "Retreat",
		tagline: "Director of Finance",
		points: ["Gain", "Do", "Leave with",]
	},
	{
		image: Info,
		title: "Induction",
		tagline: "Director of Finance",
		points: ["Gain", "Do", "Leave with",]
	},
	{
		image: Info,
		title: "Banquet",
		tagline: "Director of Finance",
		points: ["Gain", "Do", "Leave with",]
	},
	{
		image: Info,
		title: "Your Journey Continues...",
		tagline: "Director of Finance",
		points: ["Gain", "Do", "Leave with",]
	},
]
const milestoneSlides = milestones.map((m) => (
	<Milestone
		title={m.title}
		image={m.image}
		tagline={m.tagline}
		points={m.points}
	/>
))

export default function Journey() {
	return (
		<section id='journey-section'>
			<SectionHeader sectionName="Pledge Journey"/>
			
			<Carousel images={milestoneSlides}/>

			<span>In between: Networking, Learning, Events, Hands on Experience, and Socials!</span>

			<ActionButtons
				sectionName="Pledge Journey"
				link="#alumni"
			/>
		</section>
	)
}