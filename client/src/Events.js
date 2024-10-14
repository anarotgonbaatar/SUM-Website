import React from 'react'
import './styles/events.css'

function Events() {
    return (
        <div className='section' id='events-section'>
            <span className='section-title'>EVENTS</span>

            <div className='event-box'>

                <div className='event-date'>
                    <span className='day'>13</span>
                    <span className='month'>October</span>
                    <span className='year'>2024</span>
                </div>

                <div className='event-details'>
                    <span className='event-name'>Pledge Draft</span>
                    <span className='event-description'>Actives will fight each other for their littles.</span>
                    <span className='event-time'>7:00 PM</span>
                </div>

            </div>

            <div className='event-box'>

                <div className='event-date'>
                    <span className='day'>18</span>
                    <span className='month'>October</span>
                    <span className='year'>2024</span>
                </div>

                <div className='event-details'>
                    <span className='event-name'>UCI Nuclear Reactor Tour</span>
                    <span className='event-description'>RADIATION RAHHH!!!</span>
                    <span className='event-time'>9:00 AM</span>
                </div>

            </div>

            <div className='event-box'>

                <div className='event-date'>
                    <span className='day'>20</span>
                    <span className='month'>October</span>
                    <span className='year'>2024</span>
                </div>

                <div className='event-details'>
                    <span className='event-name'>Big and Little Reveal</span>
                    <span className='event-description'>The results of the draft will be revealed</span>
                    <span className='event-time'>7:00 PM</span>
                </div>

            </div>

            <div className='event-box'>

                <div className='event-date'>
                    <span className='day'>2</span>
                    <span className='month'>November</span>
                    <span className='year'>2024</span>
                </div>

                <div className='event-details'>
                    <span className='event-name'>Workshop</span>
                    <span className='event-description'>All kinds of workshops.</span>
                    <span className='event-time'>7:00 PM</span>
                </div>

            </div>

            <div className='event-box'>

                <div className='event-date'>
                    <span className='day'>22-24</span>
                    <span className='month'>November</span>
                    <span className='year'>2024</span>
                </div>

                <div className='event-details'>
                    <span className='event-name'>SUM Retreat</span>
                    <span className='event-description'>BIG BEAR YIPPEEE!!!</span>
                    <span className='event-time'>8:00 AM</span>
                </div>

            </div>
        </div>
    )
}

export default Events