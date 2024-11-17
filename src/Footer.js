import React, { useState, useRef } from 'react'
import './styles/footer.css'
import Logo from './images/pheonix-logo.png'

function Footer() {
    const formRef = useRef( null )
    const [ buttonText, setButtonText ] = useState( 'SUBMIT' );
    const [ buttonDisabled, setButtonDisabled ] = useState( false );

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const form = formRef.current;
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
        <div className='section' id='footer-section'>
            <img id='footer-logo' src={ Logo } alt='SUM Logo'></img>
            
            <span className='section-title'>READY TO #beSUMone?</span>

            <div id='footer-signup-form-container'>
                <form className='signup-form' onSubmit={ handleSubmit } ref={ formRef }>
                    <input name='FirstName' type='text' placeholder='First Name' required/>
                    <input name='LastName' type='text' placeholder='Last Name' required/>
                    <input name='Email' type='email' placeholder='Email' required/>
                    <input name='Number' type='tel' placeholder='Phone Number' required/>
                    <input name='ReferredBy' type='text' placeholder='Referred By' required/>

                    <button type='submit' className='btn' disabled={ buttonDisabled }>{ buttonText }</button>
                </form>
            </div>

            <img id='footer-csuf-logo' src={`${process.env.PUBLIC_URL}/CSUF.png`} alt="California State University Fullerton" />
            <span>800 N State College Blvd, Fullerton, CA 92831</span>

        </div>
    )
}

export default Footer