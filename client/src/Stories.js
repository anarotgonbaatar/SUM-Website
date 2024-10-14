import React from 'react'
import './styles/stories.css'

import { FaEnvelope, FaEnvelopeSquare, FaInstagram, FaLinkedin } from 'react-icons/fa'

import Boomer from './images/Boomer Baker.jpeg'
import Alex from './images/Alex Munayyer.png'
import Gaury from './images/Gaury Verma.png'
import Sukhjinder from './images/Sukhjinder Singh.png'

function Stories() {
  return (
    <div className='section' id='stories-section'>
        <span className='section-title'>SUCCESS STORIES</span>
        
        <div className='story-container'>
            <img src={ Boomer } className='portrait story-portrait'/>
            <div className='story-details'>
                <span className='story-name'>Boomer Baker</span>
                <span className='story-title'>CEO of THINK66, BIOLETIC Technologies, AYLI</span>
                <ul className='story-achievements'>
                    <li className='story-achievement'>Made a whol lotta cash</li>
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
            <img src={ Alex } className='portrait story-portrait'/>
            <div className='story-details'>
                <span className='story-name'>Alex Munayyer</span>
                <span className='story-title'>CO-Founder of Hyperscale Media</span>
                <ul className='story-achievements'>
                    <li className='story-achievement'>Made a whol lotta cash</li>
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
            <img src={ Gaury } className='portrait story-portrait'/>
            <div className='story-details'>
                <span className='story-name'>Gaury Verma</span>
                <span className='story-title'>CEO of Gaury Verma Photography</span>
                <ul className='story-achievements'>
                    <li className='story-achievement'>Made a whol lotta cash</li>
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
            <img src={ Sukhjinder } className='portrait story-portrait'/>
            <div className='story-details'>
                <span className='story-name'>Sukhjinder Singh</span>
                <span className='story-title'>CEO of Yin.Social</span>
                <ul className='story-achievements'>
                    <li className='story-achievement'>Made a whol lotta cash</li>
                    <li className='story-achievement'>Owns a whole lotta businesses</li>
                </ul>
                <div className='icons'>
                    <a href='none'><FaLinkedin className='icon'/></a>
                    <a href='none'><FaInstagram className='icon'/></a>
                    <a href='none'><FaEnvelopeSquare className='icon'/></a>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Stories