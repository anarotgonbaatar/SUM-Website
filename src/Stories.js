import React from 'react'
import './styles/stories.css'

import { FaEnvelopeSquare, FaInstagram, FaLinkedin, FaCamera } from 'react-icons/fa'

import Boomer from './images/Boomer Baker.jpeg'
import Alex from './images/Alex Munayyer.png'
import Gaury from './images/Gaury Verma.png'
import Sukhjinder from './images/Sukhjinder Singh.png'
import Erick from './images/Erick Ojeda.jpeg'
import Daniel from './images/Daniel Cazares.jpg'
import { IoDiamond } from 'react-icons/io5'

function Stories() {
  return (
    <div className='section' id='stories-section'>
        <span className='section-title'>SUCCESS STORIES</span>
        
        <div className='story-container'>
            <img src={ Boomer } className='portrait story-portrait' alt='Boomer Baker'/>
            <div className='story-details'>
                <span className='story-name'>Boomer Baker</span>
                <span className='story-title'>CEO of THINK66, BIOLETIC Technologies, AYLI</span>
                <ul className='story-achievements'>
                    <li className='story-achievement'>Owns a million AI businesses</li>
                    <li className='story-achievement'>Owns a whole lotta businesses</li>
                </ul>
                <div className='icons'>
                    <a href='none'><FaLinkedin className='icon'/></a>
                    <a href='none'><FaInstagram className='icon'/></a>
                    <a href='none'><FaEnvelopeSquare className='icon'/></a>
                </div>
            </div>
        </div>

        <div className='story-container'>
            <img src={ Daniel } className='portrait story-portrait' alt='Alex Munayyer'/>
            <div className='story-details'>
                <span className='story-name'>Daniel Cazares</span>
                <span className='story-title'>Co-Owner of Don Victor Jewelers</span>
                <span className='quote'>"Being involved may be just as important or more important than your degree."</span>
                <ul className='story-achievements'>
                    <li className='story-achievement'>Made it on the Inc. 5000 list for fastest growing companies in America.</li>
                    <li className='story-achievement'>Made multiple 7 figures</li>
                </ul>
                <div className='icons'>
                    <a href='https://donvictorjewelers.com/pages/about-us' target='_blank' rel='noopener noreferrer'>
                        <IoDiamond className='icon' />
                    </a>
                </div>
            </div>
        </div>

        <div className='story-container'>
            <img src={ Erick } className='portrait story-portrait' alt='Gaury Verma'/>
            <div className='story-details'>
                <span className='story-name'>Erick R. OjedaGarcia</span>
                <span className='story-title'>CEO of OMGee PIX! LLC / Honorary Mayor of Wilmington, CA / Veteran of the Year</span>
                <span className='quote'>"If you’re ready to challenge yourself, build lifelong connections, and unlock new opportunities, I highly recommend joining Sigma Upsilon Mu! ... it’s a launchpad for future leaders, innovators, and game-changers."</span>
                <ul className='story-achievements'>
                    <li className='story-achievement'>Founded and operates OMGee PIX! LLC, a community-oriented business supporting local nonprofits and events.</li>
                    <li className='story-achievement'>Created the Wilmington California Information Network, connecting residents with businesses, nonprofits, and local resources.</li>
                </ul>
                <div className='icons'>
                    <a href='https://omgeepix.com/'><FaCamera className='icon'/></a>
                    <a href='https://www.instagram.com/omgeepix/?hl=en'><FaInstagram className='icon'/></a>
                </div>
            </div>
        </div>

        

    </div>
  )
}

export default Stories