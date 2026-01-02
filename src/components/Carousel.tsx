import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"

type CarouselItem =
	| ReactNode
	| {
			src: string
			alt?: string
		}

type CarouselProps = {
	images: CarouselItem[]
	className?: string
	containerClassName?: string
	itemClassName?: string
	imgClassName?: string
	dotsClassName?: string
	dotsWrapperClassName?: string
	navButtonClassName?: string
}

export default function Carousel({ images, className = "", containerClassName = "", itemClassName = "", imgClassName = "", dotsClassName = "", dotsWrapperClassName = "", navButtonClassName = "" }: CarouselProps) {
	const items = useMemo(() => images, [images])

	const containerRef = useRef<HTMLDivElement | null>(null)
	const itemRefs = useRef<Array<HTMLDivElement | null>>([])
	const [activeIndex, setActiveIndex] = useState(0)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		container.scrollTo({ left: 0, behavior: "auto" })
		setActiveIndex(0)

		itemRefs.current = itemRefs.current.slice(0, items.length)

		let raf = 0

		const updateActive = () => {
			const cRect = container.getBoundingClientRect()
			const cCenter = cRect.left + cRect.width / 2

			let bestIndex = 0
			let bestDist = Number.POSITIVE_INFINITY

			for (let i = 0; i < items.length; i++) {
				const el = itemRefs.current[i]
				if (!el) continue

				const r = el.getBoundingClientRect()
				const center = r.left + r.width / 2
				const dist = Math.abs(center - cCenter)

				if (dist < bestDist) {
					bestDist = dist
					bestIndex = i
				}
			}

			setActiveIndex(bestIndex)
		}

		const onScroll = () => {
			cancelAnimationFrame(raf)
			raf = requestAnimationFrame(updateActive)
		}

		updateActive()
		container.addEventListener("scroll", onScroll, { passive: true })
		window.addEventListener("resize", updateActive)

		return () => {
			cancelAnimationFrame(raf)
			container.removeEventListener("scroll", onScroll)
			window.removeEventListener("resize", updateActive)
		}
	}, [items.length])

	const scrollToIndex = (i: number) => {
		if (items.length === 0) return
		const clamped = Math.max(0, Math.min(i, items.length - 1))
		const el = itemRefs.current[clamped]
		if (!el) return

		el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
	}

	const goPrev = () => scrollToIndex(activeIndex - 1)
	const goNext = () => scrollToIndex(activeIndex + 1)

	const canGoPrev = activeIndex > 0
	const canGoNext = activeIndex < items.length - 1

	return (
		<div className="w-full">
			<div
				ref={containerRef}
				className={`
					flex gap-[1rem] items-center
					overflow-x-auto overflow-y-auto!
					snap-x snap-mandatory
					scroll-smooth
					max-w-min
					px-[3rem]!
					[-webkit-overflow-scrolling:touch]
					[scrollbar-width:none]
					${className} ${containerClassName}
				`}
			>
				{/* Images */}
				{items.map((item, i) => (
					<div
						key={i}
						ref={(el) => { itemRefs.current[i] = el }}
						className={`
							snap-center shrink-0
							w-[15rem]
							${itemClassName}
						`}
					>
						{typeof item === "object" && item !== null && "src" in item ? (
							<img
								src={item.src}
								alt={item.alt ?? ""}
								loading="lazy"
								className={`
									${imgClassName}
								`}
							/>
						) : (
							item
						)}
					</div>
				))}
			</div>
			
			{/* Carousel Navigation */}
			{items.length > 1 && (
				<div className={`flex items-center justify-between gap-[0.75rem] mt-[0.5rem]! ${dotsWrapperClassName}`}>
					
					{/* Left button */}
					<button
						type="button" onClick={goPrev} disabled={!canGoPrev} title="Left"
						className={`btn rounded-full! px-[1rem]! transition disabled:opacity-40 disabled:cursor-not-allowed ${navButtonClassName}`}
					>
						<FaChevronLeft/>
					</button>

					{/* Dots */}
					<div className="flex items-center justify-center gap-[0.5rem]">
						{items.map((_, i) => {
							const isActive = i === activeIndex
							return (
								<button
									key={`dot-${i}`}
									type="button"
									onClick={() => scrollToIndex(i)}
									title="dot"
									className={`
										p-0! border-0!
										h-[0.75rem] w-[0.75rem] rounded-full
										transition-all
										${isActive ? "bg-(--gold) opacity-100 size-[1.25rem]!" : "bg-(--gold-light) opacity-70 hover:opacity-70"}
										${dotsClassName}
									`}
								/>
							)
						})}
					</div>
					
					{/* Right button */}
					<button
						type="button" onClick={goNext} disabled={!canGoNext} title="Right"
						className={`btn rounded-full! px-[1rem]! transition disabled:opacity-40 disabled:cursor-not-allowed ${navButtonClassName}`}
					>
						<FaChevronRight/>
					</button>
				</div>
			)}
		</div>
	)
}