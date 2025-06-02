import { useEffect, useState } from 'react'
import { FaInstagram, FaCamera } from 'react-icons/fa'
import { IoDiamond } from 'react-icons/io5'

import Boomer from '../assets/stories/Boomer Baker.jpeg'
import Erick from '../assets/stories/Erick Ojeda.jpeg'
import Daniel from '../assets/stories/Daniel Cazares.jpg'

export default function Stories() {

    const [ctaText, setCtaText] = useState('Want to be Featured?')

    useEffect(() => {
        const interval = setInterval(() => {
            setCtaText((prev) =>
                prev === 'Want to be Featured?' ? 'Ready to be SUMone?' : 'Want to be Featured?'
            )
        }, 1500)
        return () => clearInterval(interval)
    }, [])

    const stories = [
        {
            name: 'Boomer Baker',
            img: Boomer,
            quote:
                "You are the SUM of 5 people around you or something like that and I'll be teaching your workshops.",
            achievements: [
                'CEO of Neuralquant',
                'Investor in Ayli, Bioletic, & Think 66',
                'Made $2+ billions in sales'
            ],
            links: []
        },
        {
            name: 'Daniel Cazares',
            img: Daniel,
            quote:
                'Being involved may be just as important or more important than your degree.',
            achievements: [
                'Co-Owner of Don Victor Jewelers',
                'Made it on the Inc. 5000 list for fastest growing companies in America',
                'Made multiple 7 figures'
            ],
            links: [
                {
                    href: 'https://donvictorjewelers.com/pages/about-us',
                    icon: <IoDiamond className="icon" />
                }
            ]
        },
        {
            name: 'Erick R. OjedaGarcia',
            img: Erick,
            quote:
                'If you’re ready to challenge yourself, build lifelong connections, and unlock new opportunities, I highly recommend joining Sigma Upsilon Mu! ... it’s a launchpad for future leaders, innovators, and game-changers.',
            achievements: [
                'Mayor of Wilmington, CA',
                'CEO of OMGee PIX! LLC, a community-oriented business supporting local nonprofits and events.',
                'Created the Wilmington California Information Network, connecting residents with businesses, nonprofits, and local resources.'
            ],
            links: [
                {
                    href: 'https://omgeepix.com/',
                    icon: <FaCamera className="icon" />
                },
                {
                    href: 'https://www.instagram.com/omgeepix/?hl=en',
                    icon: <FaInstagram className="icon" />
                }
            ]
        }
    ]

    return (
        <section id="stories-section" className="section bg-[var(--gold)] text-[black]">
            
			<h2 className="section-title">SUCCESS STORIES</h2>

            <div className="w-full max-w-screen-xl mx-auto flex flex-wrap justify-center gap-[1rem]">
                {stories.map((s, i) => (
                    <div
                        key={i}
						id='story'
                        className="
							w-[350px] bg-[var(--gold-light)] p-[0.5rem]
							rounded-ss-[2rem] rounded-ee-[2rem]
							overflow-hidden
						"
                    >
                        <div className="
								w-full bg-[white] border-[0.25rem] border-[white]
								rounded-ss-[1.5rem] rounded-ee-[1.5rem]
								overflow-hidden
							"
						>
                            <img
								id='story-portrait'
                                src={s.img}
                                alt={s.name}
                                className="w-full h-full object-cover"
                            />
                        	<h3 id='name' className="text-[1.25rem] font-[600] my-[0.25rem]">{s.name}</h3>
                        </div>

                        <p id='quote' className="italic text-[var(--crimson-dark)] my-[0.5rem]">{s.quote}</p>

                        <ul className="list-disc list-inside text-sm mt-2">
                            {s.achievements.map((a, j) => (
                                <li key={j}>{a}</li>
                            ))}
                        </ul>

                        {s.links.length > 0 && (
                            <div className="flex gap-3 mt-2">
                                {s.links.map((link, k) => (
                                    <a
                                        key={k}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-crimson hover:scale-110 transition-transform"
                                    >
                                        {link.icon}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <a href="#besumone-section" className='btn cta-btn'>
				{ctaText}
			</a>
        </section>
    )
}
