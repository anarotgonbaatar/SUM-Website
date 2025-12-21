import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { FaBars, FaXmark } from "react-icons/fa6"
import { FaChevronLeft } from "react-icons/fa"
import HomeButton from "./HomeButton"
import Phoenix from "../assets/logos/phoenix-white.png"
import SUM from "../assets/logos/sum-white.png"

export default function Nav() {
	const location = useLocation()
	const navigate = useNavigate()
	const isHome = location.pathname === "/"

    const [open, setOpen] = useState(false)

	const handleNav = (id: string) => {
		if (window.location.pathname !== "/") {
			window.location.href = `/#${id}`
			return
		}
		
		const section = document.getElementById(id)
		if (section) {
			section.scrollIntoView({ behavior: "smooth"})
		}
	}

    return (
        <nav
            className="
                fixed top-0 left-0 right-0 z-1000 text-white
                bg-gradient-to-t from-transparent to-[black]/70
                p-[0.5rem_0.75rem]! flex items-center justify-between
				m-[0.5rem]! rounded-[1rem] backdrop-blur-xs shadow-lg
            "
        >
			{/* ===== Desktop Navigation ===== */}
            <div
				className="
					hidden md:flex items-center justify-between w-full
				"
			>
				<HomeButton />

				<div className="flex items-center gap-[1rem]">
					<a onClick={() => handleNav("home-section")}>A.B.L.E.</a>
					<a onClick={() => handleNav("gallery-section")}>Pledge Journey</a>
					<a onClick={() => handleNav("about-section")}>Events</a>
					<a onClick={() => handleNav("packages-section")}>Alumni</a>
					<a onClick={() => handleNav("faq-section")}>About</a>
				</div>

				<button
					className="hidden md:inline-flex"
					onClick={() => handleNav("contact-section")}
				>
					JOIN SUM
				</button>
			</div>

            {/* ===== Mobile Navigation ===== */}
            <div className="flex md:hidden items-center justify-between w-full">
				{/* Back to Home button */}
				{!isHome && (
					<button
						onClick={() => navigate("/")}
						className="nav-btn"
						title="Back to Home"
					>
						<FaChevronLeft className="nav-icon"/>
					</button>
				)}
				
				<HomeButton/>

				{/* Menu button */}
                <button
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                    className="nav-btn"
                >
                    <FaBars
						className={`
							nav-icon
							absolute transition-all duration-250
							${open ? "opacity-0 scale-75 rotate-90" : "opacity-100 scale-100 rotate-0"}
						`}
					/>
					<FaXmark
						className={`
							nav-icon
							transition-all duration-250
							${open ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-90"}
						`}
					/>
                </button>

				{/* Mobile menu */}
				<div
					id="mobile-menu"
					className={`
						backdrop-blur-xs bg-(--shadow)
						absolute top-full left-0 right-0
						flex flex-col items-center
						gap-[1rem] p-[1rem]! mt-[0.5rem]!
						shadow-lg
						border-[1px] border-(--shadow) rounded-[1rem]
						transition-all duration-250 ease-out
						${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
					`}
				>
					<a onClick={() => handleNav("home-section")}>A.B.L.E.</a>
					<a onClick={() => handleNav("gallery-section")}>Pledge Journey</a>
					<a onClick={() => handleNav("about-section")}>Events</a>
					<a onClick={() => handleNav("packages-section")}>Alumni</a>
					<a onClick={() => handleNav("faq-section")}>About</a>

					<button onClick={() => {handleNav("contact-section"); setOpen(false)}}>
						Join SUM
					</button>
				</div>
                
            </div>
        </nav>
    )
}
