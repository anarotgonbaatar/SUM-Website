import React from 'react'
import './styles/mission.css'
import Phoenix from './images/phoenix.png'

function Mission() {
    return (
        <div className='section' id='mission-section'>

            {/* Background Phoenix */}
            <div className='background-phoenix' style={{backgroundImage: `url(${Phoenix})`}}></div>

            <span className='section-title'>OUR MISSION</span>
            <p className='glass-card'>
                We believe that human potential is limitless, never settling for a mediocre life, and that actions speak louder than words.
                Through a continuous cycle of high achievement, brotherhood, leadership, and entrepreneurship principles, we create great members, that join great companies, that redefine the limits of what’s possible.
                Through deeds not words, together, our sole mission is to continuously cultivate an ecosystem that develops the highest achievers in the world.
            </p>
        </div>
    )
}

export default Mission