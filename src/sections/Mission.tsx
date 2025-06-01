import Phoenix from '../assets/logos/phoenix-white.png'

export default function Mission() {
    return (
        <div className='section' id='mission-section'>

            {/* Background Phoenix */}
            <img
				src={Phoenix}
				alt='Phoenix logo'
				className='absolute left-1/2 -translate-x-1/2 object-contain opacity-25 z-0
					pointer-events-none select-none
				'
			/>

            <span className='section-title'>OUR MISSION</span>
            <p className='glass-card'>
                We believe that human potential is limitless, never settling for a mediocre life, and that actions speak louder than words.
                Through a continuous cycle of high achievement, brotherhood, leadership, and entrepreneurship principles, we create great members, that join great companies, that redefine the limits of what’s possible.
                Through deeds not words, together, our sole mission is to continuously cultivate an ecosystem that develops the highest achievers in the world.
            </p>
        </div>
    )
}
