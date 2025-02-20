import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/navbar.css'
// import { FaUser } from "react-icons/fa"

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

	// const navigate = useNavigate()
	// const handlePortal = () => {
	// 	navigate('/auth')
	// }

    return (
        <div className='' id='navbar'>
            <button className='nav-btn' onClick={() => scrollToSection( 'home-section' )}>Home</button>
            <button className='nav-btn' onClick={() => scrollToSection( 'about-section' )}>About</button>
            <button className='nav-btn' onClick={() => scrollToSection( 'stories-section' )}>Stories</button>
            <button className='nav-btn' onClick={() => scrollToSection( 'mission-section' )}>Mission</button>
            <button className='nav-btn' onClick={() => scrollToSection( 'gallery-section' )}>Gallery</button>
            <button className='nav-btn' onClick={() => scrollToSection( 'events-section' )}>Events</button>
            <button className='nav-btn' onClick={() => scrollToSection( 'footer-section' )}>#beSUMone</button>
			{/* <div className='nav-btn' id='auth-btn' onClick={ handlePortal }><FaUser/></div> */}
        </div>
    )
}

export default Navbar