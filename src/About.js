import React from 'react'
import './styles/about.css'

function About() {
    return (
        <div className='section' id='about-section'>
            
            <span className='section-title'>ABOUT</span>
            <p className='about-p'>
                Sigma Upsilon Mu (SUM) is a co-ed entrepreneurship business fraternity established in March 2014.
            </p>
            
            <span className='about-header'>Our Motto</span>
            <span id='motto'>"Facta Non Verba" (Deeds, Not Words)</span>
            <p className='about-p'>This reflects our belief in taking action over words, transforming the lives of college students to help them reach their fullest potential.</p>
            
            <span className='about-header'>What We Do</span>
            <ul>
                <li>We empower students to become lifelong learners and future entrepreneurs, executives, and financially independent individuals.</li>
                <li>We organize a variety of events each semester, such as:</li>
                <li>8-hour business challenges</li>
                <li>Networking events</li>
                <li>Guest speaker sessions from industry professionals</li>
                <li>Workshops and hands-on entrepreneurial projects</li>
            </ul>

            <span className='about-header'>Our Process</span>
            <ul>
                <li>New members go through a pledging process and join a chapter class.</li>
                <li>Members participate in workshops, projects, and events that teach entrepreneurship.</li>
                <li>They apply the principles learned during the semester to build businesses or pursue career paths aligned with their goals.</li>
            </ul>

            <span className='about-header'>Our 4 Pillars: A.B.L.E.</span>
            <ul>
                <li>Achievement</li>
                <li>Brotherhood</li>
                <li>Leadership</li>
                <li>Entrepreneurship</li>
            </ul>
        </div>
    )
}

export default About