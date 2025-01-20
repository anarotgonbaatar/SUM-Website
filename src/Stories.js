import React from 'react'
import './styles/stories.css'

import { FaInstagram, FaCamera } from 'react-icons/fa'
// import { FaEnvelopeSquare, FaLinkedin } from 'react-icons/fa'

import Boomer from './images/Boomer Baker.jpeg'
import Erick from './images/Erick Ojeda.jpeg'
import Daniel from './images/Daniel Cazares.jpg'
import { IoDiamond } from 'react-icons/io5'

function Stories() {
  return (
    <div className='section' id='stories-section'>
        <span className='section-title'>SUCCESS STORIES</span>
        
        <div className='story-container'>
            <div className='profile'>
                <img src={ Boomer } className='portrait story-portrait' alt='Boomer Baker'/>
                <span className='story-name'>Boomer Baker</span>
            </div>
            <div className='story-details'>
            <span className='quote'>"You are the SUM of 5 people around you or something like that and I'll be teaching your workshops."</span>
                <ul className='story-achievements'>
                    <li className='story-achievement'>CEO of Neuralquant</li>
                    <li className='story-achievement'>Investor in Ayli, Bioletic, & Think 66</li>
                    <li className='story-achievement'>Made $2+ billions in sales</li>
                </ul>
                {/* <div className='icons'>
                    <a href='none'><FaLinkedin className='icon'/></a>
                    <a href='none'><FaInstagram className='icon'/></a>
                    <a href='none'><FaEnvelopeSquare className='icon'/></a>
                </div> */}
            </div>
        </div>

        <div className='story-container'>
            <div className='profile'>
                <img src={ Daniel } className='portrait story-portrait' alt='Daniel Cazares'/>
                <span className='story-name'>Daniel Cazares</span>
            </div>
            <div className='story-details'>
                <span className='quote'>"Being involved may be just as important or more important than your degree."</span>
                <ul className='story-achievements'>
                    <li className='story-achievement'>Co-Owner of Don Victor Jewelers</li>
                    <li className='story-achievement'>Made it on the Inc. 5000 list for fastest growing companies in America</li>
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
            <div className='profile'>
                <img src={ Erick } className='portrait story-portrait' alt='Erick R. OjedaGarcia'/>
                <span className='story-name'>Erick R. OjedaGarcia</span>
            </div>
            <div className='story-details'>
                <span className='quote'>"If you’re ready to challenge yourself, build lifelong connections, and unlock new opportunities, I highly recommend joining Sigma Upsilon Mu! ... it’s a launchpad for future leaders, innovators, and game-changers."</span>
                <ul className='story-achievements'>
                    <li className='story-achievement'>Mayor of Wilmington, CA</li>
                    <li className='story-achievement'>CEO of OMGee PIX! LLC, a community-oriented business supporting local nonprofits and events.</li>
                    <li className='story-achievement'>Created the Wilmington California Information Network, connecting residents with businesses, nonprofits, and local resources.</li>
                    <li className='story-achievement'>Veteran of the Year</li>
                </ul>
                <div className='icons'>
                    <a href='https://omgeepix.com/'><FaCamera className='icon'/></a>
                    <a href='https://www.instagram.com/omgeepix/?hl=en'><FaInstagram className='icon'/></a>
                </div>
            </div>
        </div>

        <span>and many more!</span>

    </div>
  )
}

export default Stories