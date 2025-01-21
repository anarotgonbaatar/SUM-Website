import React from 'react'
import './styles/events.css'

function Events() {
    return (
        <div className='section' id='events-section'>
            <span className='section-title'>EVENTS</span>

            {/* Info Sessions */}
            <div className='event-box'>
                <div className='event-date'>
                    <span className='day'>24</span>
                    <span className='month'>January</span>
                    <span className='year'>2025</span>
                </div>

                <div className='event-details'>
                    <span className='event-name'>Info Session #1</span>
                    <span className='event-description'>Learn more about Sigma Upsilon Mu.</span>
                    <span className='event-time'>6:15 PM @ the TSU</span>
                </div>
            </div>
            <div className='event-box'>
                <div className='event-date'>
                    <span className='day'>31</span>
                    <span className='month'>January</span>
                    <span className='year'>2025</span>
                </div>

                <div className='event-details'>
                    <span className='event-name'>Info Session #2</span>
                    <span className='event-description'>Learn more about Sigma Upsilon Mu</span>
                    <span className='event-time'>6:15 PM @ the TSU</span>
                </div>
            </div>

            {/* Bid Dinner */}
            <div className='event-box'>
                <div className='event-date'>
                    <span className='day'>28</span>
                    <span className='month'>February</span>
                    <span className='year'>2025</span>
                </div>

                <div className='event-details'>
                    <span className='event-name'>Bid Dinner</span>
                    <span className='event-description'>Invite only</span>
                    <span className='event-time'>7 PM</span>
                </div>
            </div>

            {/* Alumni Night */}
            <div className='event-box'>
                <div className='event-date'>
                    <span className='day'>19</span>
                    <span className='month'>April</span>
                    <span className='year'>2025</span>
                </div>

                <div className='event-details'>
                    <span className='event-name'>Alumni Night</span>
                    <span className='event-description'>Connect and network with our Alumni</span>
                    <span className='event-time'>6:30 PM</span>
                </div>
            </div>

            {/* Retreat */}
            <div className='event-box'>
                <div className='event-date'>
                    <span className='day'>2-4</span>
                    <span className='month'>May</span>
                    <span className='year'>2024</span>
                </div>

                <div className='event-details'>
                    <span className='event-name'>Spring Retreat</span>
                    <span className='event-description'>TBD</span>
                    <span className='event-time'>TBD</span>
                </div>
            </div>
            
            {/* Banquet */}
            <div className='event-box'>
                <div className='event-date'>
                    <span className='day'>16</span>
                    <span className='month'>May</span>
                    <span className='year'>2024</span>
                </div>

                <div className='event-details'>
                    <span className='event-name'>Banquet</span>
                    <span className='event-description'>TBD</span>
                    <span className='event-time'>TBD</span>
                </div>
            </div>
        </div>
    )
}

export default Events