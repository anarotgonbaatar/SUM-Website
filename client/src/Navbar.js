import React from 'react'
import './styles/navbar.css'

function Navbar() {
    return (
        <div className='' id='navbar'>
            <button className='icon-btn nav-btn'>Home</button>
            <button className='nav-btn'>About</button>
            <button className='nav-btn'>Stories</button>
            <button className='nav-btn'>Mission</button>
            <button className='nav-btn'>Gallery</button>
            <button className='nav-btn'>Testimonials</button>
            <button className='nav-btn'>Events</button>
            <button className='nav-btn'>#beSUMone</button>
        </div>
    )
}

export default Navbar