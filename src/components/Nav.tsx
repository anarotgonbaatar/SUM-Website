import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { FaBars, FaXmark } from "react-icons/fa6"
import { FaChevronLeft } from "react-icons/fa"
import HomeButton from "./HomeButton"

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
            className="fixed top-0 w-full z-1000 text-white p-[0.5rem]!"
        >
			{/* ===== Desktop Navigation ===== */}
            <div
				className="nav-comp hidden md:flex backdrop-blur-md"
			>
				<HomeButton />

				<div className="flex items-center gap-[1rem]">
					<a onClick={() => handleNav("able-section")}>A.B.L.E.</a>
					<a onClick={() => handleNav("journey-section")}>Journey</a>
					<a onClick={() => handleNav("alumni-section")}>Alumni</a>
					<a onClick={() => handleNav("events-section")}>Events</a>
					<a onClick={() => handleNav("about-section")}>About</a>
				</div>

				<button
					className="hidden md:inline-flex cta btn py-[0.25rem]!"
					onClick={() => handleNav("join-section")}
					type="button"
				>
					JOIN SUM
				</button>
			</div>

            {/* ===== Mobile Navigation ===== */}
            <div className="flex md:hidden nav-comp backdrop-blur-md">
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
			</div>

			{/* Mobile menu */}
			<div
				id="mobile-menu"
				className={`
					flex md:hidden fixed
					bg-gradient-to-t from-[black]/40 to-[black]/5
					inset-x-0
					gap-[1rem] p-[1rem]! mx-[1rem]! mt-[0.5rem]! justify-between
					shadow-(--shadow)
					rounded-[1rem]
					transition-all duration-250 ease-out
					${open ? "opacity-100 pointer-events-auto backdrop-blur-md" : "opacity-0 pointer-events-none"}
				`}
			>
				<div className="flex flex-col justify-center opacity-70">
					<h1 className="text-[3rem]!">FACTA</h1>
					<h1 className="text-[3rem]!">NON</h1>
					<h1 className="text-[3rem]!">VERBA</h1>
				</div>

				<div className="flex flex-col gap-[1rem] items-center">
					<a onClick={() => {handleNav("able-section"); setOpen(false)}}>A.B.L.E.</a>
					<a onClick={() => {handleNav("journey-section"); setOpen(false)}}>Journey</a>
					<a onClick={() => {handleNav("alumni-section"); setOpen(false)}}>Alumni</a>
					<a onClick={() => {handleNav("events-section"); setOpen(false)}}>Events</a>
					<a onClick={() => {handleNav("about-section"); setOpen(false)}}>About</a>
					
					<button
						onClick={() => {handleNav("join-section"); setOpen(false)}}
						className="cta btn"
						type="button"
					>
						Join SUM
					</button>
				</div>

			</div> 
            
        </nav>
    )
}
