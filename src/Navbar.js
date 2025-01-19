import React from 'react'
import './styles/navbar.css'

function Navbar() {
    // Scroll to section with an offset:
    const scrollToSection = ( sectionId, offset = 40 ) => {
        const section = document.getElementById( sectionId );
        if ( section ) {
            const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = sectionPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    };

    return (
        <div className='' id='navbar'>
            <button className='nav-btn' onClick={() => scrollToSection( 'home-section' )}>Home</button>
            <button className='nav-btn' onClick={() => scrollToSection( 'about-section' )}>About</button>
            <button className='nav-btn' onClick={() => scrollToSection( 'stories-section' )}>Stories</button>
            <button className='nav-btn' onClick={() => scrollToSection( 'mission-section' )}>Mission</button>
            <button className='nav-btn' onClick={() => scrollToSection( 'gallery-section' )}>Gallery</button>
            {/* <button className='nav-btn' onClick={() => scrollToSection( 'testimonials-section' )}>Testimonials</button> */}
            <button className='nav-btn' onClick={() => scrollToSection( 'events-section' )}>Events</button>
            <button className='nav-btn' onClick={() => scrollToSection( 'footer-section' )}>#beSUMone</button>
        </div>
    )
}

export default Navbar