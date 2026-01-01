import { time } from 'node:console'
import Event from '../components/Event'
import SectionHeader from '../components/SectionHeader'

const events = [
	{
		id: 1,
		title: 'Rush week',
		description: 'A week of getting to know you.',
		location: 'TSU',
		month: 'January', day: '15', time: '7 PM'
	},
	{
		id: 2,
		title: 'Info Session 1',
		description: 'Come learn what we are about.',
		location: 'TSU',
		month: 'September', day: '15', time: '7 PM'
	},
	{
		id: 3,
		title: 'Banquet',
		description: 'You have made it to the end.',
		location: 'TSU',
		month: 'December', day: '31', time: '7 PM'
	},
]

export default function Home() {
	return (
		<section id="events-section">
			<SectionHeader sectionName="Events"/>
			<span>Earn trust, lead by example.</span>
			<p>We lead by example. We expect the best and keep each other accountable. We inspire others through our actions and optimism. We choose to lead, even without a title, to work toward infecting others with optimism in their ability to succeed.</p>

			{ events.map(e => (
				<Event
					month={e.month}
					day={e.day}
					title={e.title}
					description={e.description}
					location={e.location}
					time={e.time}
				/>
			))}
		</section>
	)
}