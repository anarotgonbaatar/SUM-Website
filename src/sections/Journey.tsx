import { useEffect, useRef, useState } from "react"
import SectionHeader from "../components/SectionHeader"
import ActionButtons from "../components/ActionButtons"
import { FaPlus, FaMinus } from "react-icons/fa6"

// Images
import Info from "../assets/logos/sum-white.png"
import AlumniNight from "../assets/photos/Alumni Night.jpg"
import Interviews from "../assets/logos/sum-white.png"
import BigAndLittleReveal from "../assets/photos/Big_and_Little_Reveal.jpg"
import Retreat from "../assets/photos/Retreat.jpg"
import Induction from "../assets/logos/sum-white.png"
import Banquet from "../assets/logos/sum-white.png"
import Continues from "../assets/logos/sum-white.png"

type MilestoneItem = {
    image: string
    title: string
    tagline: string
    points: string[]
}

const milestones: MilestoneItem[] = [
    {
        image: Info,
        title: "Bid Dinner",
        tagline: "Kickoff + expectations",
        points: [
            "Meet the chapter and get the full roadmap",
            "Understand what you’ll build and how you’ll grow",
            "Start forming your pledge class bond",
        ],
    },
    {
        image: AlumniNight,
        title: "Alumni Night",
        tagline: "Network with people who did it",
        points: [
            "Get real career + life advice from alumni",
            "Learn how members used SUM to level up",
            "Make connections that last beyond the semester",
        ],
    },
    {
        image: Interviews,
        title: "Interviews",
        tagline: "High-pressure reps, low-risk setting",
        points: [
            "Practice interviews and get direct feedback",
            "Sharpen your story, resume talk-track, and confidence",
            "Learn how to stand out without being fake",
        ],
    },
    {
        image: BigAndLittleReveal,
        title: "Big & Little Reveal",
        tagline: "Mentorship + accountability",
        points: [
            "Get a mentor who actually checks in",
            "Build a stronger sense of belonging",
            "Start building your long-term network inside SUM",
        ],
    },
    {
        image: Retreat,
        title: "Retreat",
        tagline: "Bond fast, build trust",
        points: [
            "Memories + inside jokes you’ll keep forever",
            "Team challenges that build real brotherhood",
            "Reset your mindset and lock in for the semester",
        ],
    },
    {
        image: Induction,
        title: "Induction",
        tagline: "You’re officially in",
        points: [
            "Celebrate the work you put in",
            "Step into leadership and opportunities",
            "Start contributing as an active member",
        ],
    },
    {
        image: Banquet,
        title: "Banquet",
        tagline: "Recognition + legacy",
        points: [
            "Awards, appreciation, and closure to the journey",
            "Connect with actives + alumni in one room",
            "Leave inspired and plugged in for what’s next",
        ],
    },
    {
        image: Continues,
        title: "Your Journey Continues...",
        tagline: "Alumni network + real opportunities",
        points: [
            "Stay involved through alumni events and mentorship",
            "Help the next generation and build your legacy",
            "Keep the network alive long-term",
        ],
    },
]

export default function Journey() {
    const [activeIndex, setActiveIndex] = useState(0)

    // Desktop scroll tracking
    const desktopItemRefs = useRef<Array<HTMLDivElement | null>>([])

    // Mobile accordion refs (for smooth scroll to opened panel)
    const mobileItemRefs = useRef<Array<HTMLDivElement | null>>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return
                    }

                    const idxRaw = entry.target.getAttribute("data-index")
                    const idx = idxRaw ? Number(idxRaw) : 0
                    if (!Number.isNaN(idx)) {
                        setActiveIndex(idx)
                    }
                })
            },
            {
                root: null,
                rootMargin: "-45% 0px -45% 0px",
                threshold: 0.01,
            }
        )

        desktopItemRefs.current.forEach((el) => {
            if (el) {
                observer.observe(el)
            }
        })

        return () => observer.disconnect()
    }, [])

    const scrollToDesktopIndex = (index: number) => {
        const el = desktopItemRefs.current[index]
        if (!el) {
            return
        }

        el.scrollIntoView({ behavior: "smooth", block: "start" })
        setActiveIndex(index)
    }

    const openMobileIndex = (index: number) => {
        setActiveIndex(index)

        const el = mobileItemRefs.current[index]
        if (!el) {
            return
        }

        // Let state update flush first so the panel expands before scrolling
        window.setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "center" })
        }, 0)
    }

    const goToNextMobile = (currentIndex: number) => {
        const nextIndex = Math.min(currentIndex + 1, milestones.length - 1)
        openMobileIndex(nextIndex)
    }

    return (
        <section id="journey-section" className="scroll-mt-[6rem]!">
            <SectionHeader sectionName="Pledge Journey" />

            {/* Mobile: accordion stepper */}
            <div className="lg:hidden flex flex-col gap-[0.75rem]">
                {milestones.map((m, idx) => {
                    const isOpen = idx === activeIndex
                    const isLast = idx === milestones.length - 1

                    return (
                        // Step Card
						<div
                            key={m.title}
                            ref={(el) => {
                                mobileItemRefs.current[idx] = el
                            }}
                            className={[
                                "rounded-(--radius)! glass-card p-[0.75rem]! border-[1px] transition",
                                isOpen ? "border-(--gold) shadow-(--gold-glow)!" : "border-(--gold)/50",
                            ].join(" ")}
                        >
                            <button
                                type="button"
                                onClick={() => openMobileIndex(idx)}
                                className="w-full"
                                aria-expanded={isOpen}
                            >
                                <div className="flex gap-[1rem] text-left items-center">
                                    <span
                                        className={[
                                            "flex h-[2.5rem] w-[2.5rem] shrink-0 items-center justify-center rounded-[0.5rem_0.25rem] transition",
                                            isOpen ? "bg-(--gold) text-black" : "bg-white/10 text-white",
                                        ].join(" ")}
                                    >
                                        {String(idx + 1).padStart(2, "0")}
                                    </span>

                                    <div className="flex flex-col">
                                        <div className="font-semibold!">{m.title}</div>
                                        <div className="opacity-70">{m.tagline}</div>
                                    </div>

                                    <div className="ml-auto!">
                                        {isOpen ? <FaMinus/> : <FaPlus/>}
                                    </div>
                                </div>
                            </button>
							
							{/* Card Details */}
                            {isOpen && (
								<div className="flex flex-col gap-[0.5rem]">
									<div className="overflow-hidden rounded-(--radius)">
										<img
											src={m.image}
											alt={m.title}
											className="h-auto max-h-[20rem] w-full object-cover"
											loading="lazy"
										/>
									</div>

									<ul className="flex flex-col text-left">
										{m.points.map((p) => (
											<li key={p} className="flex gap-2 items-center text-[0.9rem]!">
												<span className="h-2! w-2! rounded-full bg-(--gold)/75" />
												<span>{p}</span>
											</li>
										))}
									</ul>

									<button
										type="button"
										onClick={() => goToNextMobile(idx)}
										disabled={isLast}
										className={[
											"btn",
											isLast
												? "cursor-not-allowed opacity-50"
												: "",
										].join(" ")}
									>
										{isLast ? "End" : "Next Step"}
									</button>

								</div>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Desktop: sticky stepper + scrolling cards */}
            <div className="hidden lg:grid gap-[1rem] lg:grid-cols-[25rem_1fr]">
                <aside>
                    <div className="sticky top-[5rem] rounded-(--radius)! glass-card">
                        <div className="flex flex-col">
                            <div className="font-semibold tracking-wide">The Journey</div>
                            <div className="opacity-75">
                                Scroll the milestones. The current step highlights automatically.
                            </div>
                        </div>

						<div className="flex flex-col gap-[0.5rem]">
							{milestones.map((m, idx) => {
								const isActive = idx === activeIndex
								return (
									<button
										key={m.title}
										type="button"
										onClick={() => scrollToDesktopIndex(idx)}
										className={[
											"group relative flex gap-[0.75rem] rounded-(--radius) border-1 p-[0.25rem]! px-[0.5rem]! shadow-(--shadow) text-left items-center transition",
											isActive ? "border-(--gold) shadow-(--gold-glow)!" : "hover:bg-(--gold)/25 border-(--gold)/50",
										].join(" ")}
									>
										<span
											className={[
												"flex w-[2.5rem] h-[2.5rem] items-center justify-center rounded-[0.5rem_0.25rem] transition",
												isActive ? "bg-(--gold) text-black" : "bg-white/10 text-white",
											].join(" ")}
										>
											{String(idx + 1).padStart(2, "0")}
										</span>

										<div className="min-w-0">
											<div
												className={[
													"truncate text-sm font-semibold! transition",
													isActive ? "text-white" : "text-white/80 group-hover:text-white",
												].join(" ")}
											>
												{m.title}
											</div>
											<div className="truncate opacity-70">{m.tagline}</div>
										</div>

										{isActive && (
											<span className="absolute -left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gold" />
										)}
									</button>
								)
							})}
						</div>

                        <div className="glass-card rounded-(--radius)! gap-[0.5rem]!">
                            <div className="font-semibold!">In between milestones</div>
                            <div className="mt-1 opacity-85">
                                Networking, learning, socials, hands-on experience, and more.
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="flex flex-col gap-[1rem]">
                    {milestones.map((m, idx) => (
                        <div
                            key={m.title}
                            ref={(el) => {
                                desktopItemRefs.current[idx] = el
                            }}
                            data-index={idx}
                            className={[
                                "rounded-(--radius)! glass-card max-w-[40rem]! border-1 transition",
                                idx === activeIndex ? "border-(--gold) shadow-(--gold-glow)!" : "border-(--gold)/50",
                            ].join(" ")}
                        >
                            <div className="grid gap-[1rem] md:grid-cols-[180px_1fr]">
                                <div className="overflow-hidden rounded-(--radius)">
                                    <img
                                        src={m.image}
                                        alt={m.title}
                                        className="h-40 w-full object-cover md:h-full"
                                        loading="lazy"
                                    />
                                </div>

                                <div className="flex flex-col text-left gap-[0.5rem]">
                                    <div className="flex items-start justify-between gap-[1rem]">
                                        <div>
                                            <h3 className="mt-1 text-xl font-semibold">{m.title}</h3>
                                            <p className="mt-1 text-sm opacity-80">{m.tagline}</p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => scrollToDesktopIndex(idx)}
                                            className="hidden md:inline-flex rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold transition hover:border-white/20"
                                        >
                                            Jump to step
                                        </button>
                                    </div>

                                    <ul className="mt-4 space-y-2 text-sm">
                                        {m.points.map((p) => (
                                            <li key={p} className="flex gap-2">
                                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60" />
                                                <span className="opacity-90">{p}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="pt-2">
                        <ActionButtons sectionName="Pledge Journey" link="#alumni" />
                    </div>
                </main>
            </div>
        </section>
    )
}
