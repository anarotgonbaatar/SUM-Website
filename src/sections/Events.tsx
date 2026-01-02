import Event from '../components/Event'
import SectionHeader from '../components/SectionHeader'

const events = [
	{
		id: 1,
		title: 'Info Session 1',
		description: 'Come learn what we are about.',
		location: 'TSU',
		month: 'January', day: '23', time: '7 PM', weekday: 'Friday',
	},
	{
		id: 2,
		title: 'Info Session 2 & Bowling',
		description: 'Come learn what we are about. Have fun after.',
		location: 'TSU',
		month: 'January', day: '30', time: '7 PM', weekday: 'Friday',
	},
	{
		id: 3,
		title: 'Workshop 1',
		description: 'Learn your why.',
		location: 'TSU',
		month: 'February', day: '6', time: '7 PM', weekday: 'Friday',
	},
	{
		id: 4,
		title: 'Workshop 2',
		description: 'Work on your why.',
		location: 'TSU',
		month: 'February', day: '13', time: '7 PM', weekday: 'Friday',
	},
	{
		id: 5,
		title: 'Bid Dinner',
		description: 'Come have dinner with us. Invite only.',
		location: 'TSU',
		month: 'February', day: '20', time: '7 PM', weekday: 'Friday',
	},
]

export default function Home() {
	return (
		<section id="events-section">
			<SectionHeader sectionName="Events"/>
			<span>Earn trust, lead by example.</span>
			<p>We lead by example. We expect the best and keep each other accountable. We inspire others through our actions and optimism. We choose to lead, even without a title, to work toward infecting others with optimism in their ability to succeed.</p>

			<div className='grid gap-[1rem]! grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
				{ events.map(e => (
					<Event
						month={e.month}
						day={e.day}
						weekday={e.weekday}
						title={e.title}
						description={e.description}
						location={e.location}
						time={e.time}
					/>
				))}
			</div>
		</section>
	)
}