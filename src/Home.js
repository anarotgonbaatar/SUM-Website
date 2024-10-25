import React, { useState, useRef } from 'react'
import './styles/home.css'
import Logo from './images/pheonix-logo.png'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'

function Home() {
    const [ showForm, setShowForm ] = useState( false )
    const formRef = useRef( null )
    const [ formData, setFormData ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        referredBy: ''
    })

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
        
        const formData = {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phoneNumber: '1234567890',
          referredBy: 'Friend'
        };
      
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbxVy_yqlOGCWTBgmrdSFT37-3wXC8iCB4gAbzzd_aYYED7F4AUCbn1VkrpuFU08Y9KRiQ/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( formData ),
            });
        
            if ( !response.ok ) {
                throw new Error( 'Network response was not ok' );
            }
        
            alert( 'Form submitted successfully!' );
        } catch (error) {
            console.error( 'Error:', error );
            alert( 'There was an error submitting the form.' );
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
                    <input type='text' placeholder='First Name' required value={ formData.firstName }
                        onChange={ (e) => setFormData( { ...formData, firstName: e.target.value } ) }
                    />
                    <input type='text' placeholder='Last Name' required value={ formData.lastName }
                        onChange={ (e) => setFormData( { ...formData, lastName: e.target.value } ) }
                    />
                    <input type='email' placeholder='Email' required value={ formData.email }
                        onChange={ (e) => setFormData( { ...formData, email: e.target.value } ) }
                    />
                    <input type='tel' placeholder='Phone Number' required value={ formData.phoneNumber }
                        onChange={ (e) => setFormData( { ...formData, phoneNumber: e.target.value } ) }
                    />
                    <input type='text' placeholder='Referred By' required value={ formData.referredBy }
                        onChange={ (e) => setFormData( { ...formData, referredBy: e.target.value } ) }
                    />
                    <button type='submit' className='btn'>Submit</button>
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