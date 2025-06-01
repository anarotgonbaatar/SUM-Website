import Phoenix from "../assets/logos/phoenix-white.png"

export default function About() {
	
	const pillars = ["Achievement", "Brotherhood", "Leadership", "Entrepreneurship"]
	
	return (
        <div className='
				section relative bg-[linear-gradient(to_bottom,white,var(--gold))]
				text-[black] text-[1.1rem]
			'
			id='about-section'
		>

            {/* Background Phoenix */}
            <img
				src={Phoenix}
				alt='Phoenix logo'
				className='absolute left-1/2 -translate-x-1/2 object-contain opacity-25 z-0
					pointer-events-none select-none
				'
			/>
            
            <span className='section-title'>ABOUT</span>
            <p className='about-p glass-card'>
                Sigma Upsilon Mu (SUM) is a co-ed entrepreneurship business fraternity established in March 2014.
            </p>
            
            <div className='glass-card'>
                <span className='text-[2rem] text-[var(--crimson-dark)]'>Our Motto</span>
                <span
					id='motto'
					className="
						bg-[var(--crimson)] text-[white]
						p-[0.75rem] font-[600] text-[1.25rem]
						border-3 boder-[white]
						rounded-ss-[0.75rem] rounded-ee-[0.75rem]
						shadow-[0_0_0.5rem_white]
					"
				>
					"Facta Non Verba": Deeds, Not Words
				</span>
                <p className='about-p'>This reflects our belief in taking action over words, transforming the lives of college students to help them reach their fullest potential.</p>
            </div>
            
            <div className='glass-card'>
                <span className='text-[2rem] text-[var(--crimson-dark)]'>What We Do</span>
                <ul className="ml-[1.5rem]">
                    <li>We empower students to become lifelong learners and future entrepreneurs, executives, and financially independent individuals.</li>
                    <li>We organize a variety of events each semester, such as:</li>
                    <li>8-hour business challenges</li>
                    <li>Networking events</li>
                    <li>Guest speaker sessions from industry professionals</li>
                    <li>Workshops and hands-on entrepreneurial projects</li>
                </ul>
            </div>

            <div className='glass-card'>
                <span className='text-[2rem] text-[var(--crimson-dark)]'>Our Process</span>
                <ul className="ml-[1.5rem]">
                    <li>New members go through a pledging process and join a chapter class.</li>
                    <li>Members participate in workshops, projects, and events that teach entrepreneurship.</li>
                    <li>They apply the principles learned during the semester to build businesses or pursue career paths aligned with their goals.</li>
                </ul>
            </div>

            <div className='glass-card'>
                <span className='text-[2rem] text-[var(--crimson-dark)]'>Our 4 Pillars: A.B.L.E.</span>
                <div className='flex grid grid gap-[0.5rem]'>
                    {pillars.map(pillar => (
						<p
							key={pillar}
							className="
								bg-[var(--crimson)] text-[white]
								text-[1.25rem] font-[600]
								border-3 border-[var(--gold)]
								rounded-ss-[0.5rem] rounded-ee-[0.5rem]
								p-[1rem] text-center
							"
						>
							{pillar}
						</p>
					))}
                </div>
            </div>
        </div>
    )
}