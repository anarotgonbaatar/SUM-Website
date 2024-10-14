import React from 'react'
import './styles/navbar.css'
import { FaHouse } from "react-icons/fa6"
import { IoMdHome } from "react-icons/io"

function Navbar() {
    return (
        <div className='' id='navbar'>
            <a className='icon-btn nav-btn'>Home</a>
            <a className='nav-btn'>About</a>
            <a className='nav-btn'>Stories</a>
            <a className='nav-btn'>Mission</a>
            <a className='nav-btn'>Gallery</a>
            <a className='nav-btn'>Testimonials</a>
            <a className='nav-btn'>Events</a>
            <a className='nav-btn'>#beSUMone</a>
        </div>
    )
}

export default Navbar