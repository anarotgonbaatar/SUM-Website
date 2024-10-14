import React, { useState, useRef } from 'react'
import './styles/home.css'
import Logo from './images/pheonix-logo.png'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'

function Home() {
    const [ showForm, setShowForm ] = useState( false )
    const formRef = useRef( null )

    const handleClick = () => {
        const form = formRef.current
        if ( !showForm ) {
            form.style.height = form.scrollHeight + 'px'
            form.style.opacity = 1
            form.style.marginBottom = '0'
        } else {
            form.style.height = '0px'
            form.style.opacity = 0
            form.style.marginBottom = '-1rem'
        }
        setShowForm( !showForm )
    }

    return (
        <div className='section' id='home-section'>
            
            <img id='logo' src={ Logo } alt='Pheonix Logo'></img>
            
            <span>Build World Class Business Skills While In College</span>
            
            <button className='btn' id='sign-up-btn' type='button' onClick={ handleClick }>
                SUM (Sign Up, Mate!)
            </button>

            <div id='home-signup-form-container' ref={ formRef }>
                <form className='signup-form'>
                    <input type='text' placeholder='First Name' required />
                    <input type='text' placeholder='Last Name' required />
                    <input type='email' placeholder='Email' required />
                    <input type='tel' placeholder='Phone Number' required />
                    <button type='submit' className='btn'>Submit</button>
                </form>
            </div>

            <div className='icons'>
                <FaInstagram className='icon'/>
                <FaFacebookSquare className='icon'/>
            </div>

        </div>
    )
}

export default Home