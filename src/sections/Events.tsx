import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Events() {
    const [events, setEvents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true)
            const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true })
            if (!error && data) {
                const today = new Date()
                const futureEvents = data.filter(event => {
					if (event.date === null) return true
					const eventDate = new Date(event.date)
					return eventDate >= today
				})
                setEvents(futureEvents)
            }
            setLoading(false)
        }
        fetchEvents()
    }, [])

    return (
        <div className='section' id='events-section'>
            <span className='section-title'>EVENTS</span>

            {loading ? (
                <div className='text-center py-8 text-gray-600'>Loading events...</div>
            ) : events.length === 0 ? (
                <div className='text-center py-8 text-gray-600'>No upcoming events</div>
            ) : (
                <div id='events-container' className="grid gap-[1rem] max-w-full grid-cols-2 justify-items-center">
                    {events.map((event, idx) => {
                        let eventDate, day, month, year

						if (event.date === null) {
							month = ''
							day = 'TBD'
							year = ''
						} else {
							eventDate = new Date(event.date)
							day = eventDate.getDate()
							month = eventDate.toLocaleString('default', { month: 'short' })
							year = eventDate.getFullYear()
						}

                        return (
                            <div key={idx}
								className="
									flex flex-col w-full overflow-hidden
									bg-[var(--crimson-dark)]
									border-[3px] border-[var(--glass)]
									rounded-ss-[1rem] rounded-ee-[1rem]
									shadow-[0_0_1rem_var(--shadow)]
									hover:border-[var(--gold)]
									hover:shadow-[0_0_1rem_var(--gold)]
								"
							>
                                <div id='event-date' className='flex flex-col items-center justify-center bg-[black] min-w-[8rem] p-[1rem]'>
                                    <span id='month' className='text-[2rem]'>{month}</span>
                                    <span id='day' className="text-[3rem]">{day}</span>
                                    <span id='year'>{year}</span>
                                </div>

                                <div id='event-details' className='flex flex-col text-start justify-center p-[1rem] gap-[0.5rem]'>
                                    <span id='event-name' className='text-[1.75rem]'>{event.name}</span>
                                    <span id='event-description'>{event.description}</span>
                                    <span id='event-location'>{event.location} @ <span id='event-time'>{event.time}</span></span>
                                    
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            <a href="#besumone-section" className='btn cta-btn'>
				JOIN US!
			</a>
        </div>
    )
}