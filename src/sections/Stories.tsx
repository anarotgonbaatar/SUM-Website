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
        <section id="stories-section" className="">
            
			<h2 className="section-title">SUCCESS STORIES</h2>

            <div className="w-full gap-[1rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                {stories.map((s, i) => (
                    <div
                        key={i}
						id='story'
                        className="
							flex flex-row items-center
							bg-[white]
							p-[0.5rem] gap-[0.75rem]
							rounded-[1.5rem_0.25rem]
							overflow-hidden
						"
                    >
						<div className='flex flex-col h-full'>
							{/* Image */}
							<img
								id='story-portrait'
								src={s.img}
								alt={s.name}
								className="w-[12rem] h-full object-cover rounded-[1rem_0.25rem]"
							/>
							{/* Name */}
							<span id='name' className="text-[1.25rem] text-[black]">{s.name}</span>
						</div>

                        <div className='flex flex-col text-left gap-[0.75rem]'>
							{/* Quote */}
							<p id='quote' className="italic text-[var(--crimson-dark)]">"{s.quote}"</p>
							{/* Achievements */}
							<ul className="list-disc list-inside text-[black]">
								{s.achievements.map((a, j) => (
									<li key={j}>{a}</li>
								))}
							</ul>
							{/* Links */}
							{s.links.length > 0 && (
								<div className="icons bg-(--crimson)!">
									{s.links.map((link, k) => (
										<a
											key={k}
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											className=""
										>
											{link.icon}
										</a>
									))}
								</div>
							)}
						</div>

                    </div>
                ))}
            </div>

            <a href="#besumone-section" className='btn cta-btn'>
				{ctaText}
			</a>
        </section>
    )
}
