import React, { useState, useRef } from 'react'
import './styles/home.css'
import Logo from './images/pheonix-logo.png'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'

function Home() {
    const [ showForm, setShowForm ] = useState( false );
    const [ buttonText, setButtonText ] = useState( 'SUBMIT' );
    const [ buttonDisabled, setButtonDisabled ] = useState( false );
    const formRef = useRef( null );

    // Shows and hides the submission form
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const form = document.querySelector( "form" );
        const formDatabase = new FormData( form );

        setButtonDisabled( true )
        setButtonText( 'Submitting...' )

        try {
            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbx0_L-j-2o5KJq8B3dxc13zrwoova6EG6JFBYNhxuBvGuueIVm4MlS1N8EZHxXyNivrcQ/exec",
                {
                    method: "POST",
                    body: formDatabase,
                }
            )
            
            if ( response.ok ) {
                setButtonText( 'Submission Successful!' )
                const data = await response.text()
                console.log( "Submitted successfully:", data )
            } else {
                throw new Error( 'Submission failed' )
            }

        } catch ( error ) {
            console.error( "Error submitting:", error )
            setButtonText( 'Error, Try Again' )
            setButtonDisabled( false )
        }
    };

    return (
        <div className='section' id='home-section'>
            
            <img id='logo' src={ Logo } alt='Pheonix Logo'></img>
            
            <span>Build World Class Business Skills While In College</span>
            
            <button className='btn' id='sign-up-btn' type='button' onClick={ handleClick }>
                SUM (Sign Up, Mate!)
            </button>

            <div id='home-signup-form-container' ref={ formRef }>
                <form className='signup-form' onSubmit={ handleSubmit }>
                    <input name='FirstName' type='text' placeholder='First Name' required/>
                    <input name='LastName' type='text' placeholder='Last Name' required/>
                    <input name='Email' type='email' placeholder='Email' required/>
                    <input name='Number' type='tel' placeholder='Phone Number' required/>
                    <input name='ReferredBy' type='text' placeholder='Referred By' required/>

                    <button type='submit' className='btn' disabled={ buttonDisabled }>{ buttonText }</button>
                </form>
            </div>

            <div className='icons'>
                <a href='https://www.instagram.com/sigmaupsilonmu/' target='_blank' rel='noopener noreferrer'>
                    <FaInstagram className='icon' />
                </a>
                <a href='https://www.facebook.com/SigmaUpsilonMu' target='_blank' rel='noopener noreferrer'>
                    <FaFacebookSquare className='icon' />
                </a>
                <a href='https://www.fullerton.edu/' target='_blank' rel='noopener noreferrer'>
                <img id='home-csuf-logo' className='icon' src={`${process.env.PUBLIC_URL}/F-logo.png`} alt="California State University Fullerton" />
                </a>
            </div>

        </div>
    )
}

export default Home