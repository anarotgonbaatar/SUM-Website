import React from 'react'
import './styles/footer.css'
import Logo from './images/pheonix-logo.png'

function Footer() {
    return (
        <div className='section' id='footer-section'>
            <img id='footer-logo' src={ Logo } alt='SUM Logo'></img>
            
            <span className='section-title'>READY TO #beSUMone?</span>

            <div id='footer-signup-form-container'>
                <form className='signup-form'>
                    <input type='text' placeholder='First Name' required />
                    <input type='text' placeholder='Last Name' required />
                    <input type='email' placeholder='Email' required />
                    <input type='tel' placeholder='Phone Number' required />
                    <input type='text' placeholder='Referred By' required />
                    <button type='submit' className='btn'>JOIN TODAY</button>
                </form>
            </div>

            <img id='footer-csuf-logo' src={`${process.env.PUBLIC_URL}/CSUF.png`} alt="California State University Fullerton" />
            <span>800 N State College Blvd, Fullerton, CA 92831</span>

        </div>
    )
}

export default Footer