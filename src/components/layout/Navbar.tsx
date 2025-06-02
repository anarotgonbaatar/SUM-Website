import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { FaUser } from "react-icons/fa"

const sections = [
	{ id: "home-section", label: "Home" },
	{ id: "about-section", label: "About" },
	{ id: "stories-section", label: "Stories" },
	{ id: "mission-section", label: "Mission" },
	{ id: "gallery-section", label: "Gallery" },
	{ id: "events-section", label: "Events" },
	{ id: "besumone-section", label: "#beSUMone" },
]

export default function Navbar() {
	const [user, setUser] = useState<any>(null)

	useEffect(() => {
		const getUser = async () => {
			const { data: { user } } = await supabase.auth.getUser()
			setUser(user)
		}
		getUser()
	}, [])

	return (
		<nav
			id="navbar"
			className="
				fixed top-0 w-full z-50
				flex flex-row justify-center gap-[0.5rem]
				py-[0.5rem]
				backdrop-blur-[2rem]
				border-b-2 border-[var(--glass)]
				bg-[var(--glass-dark)]
			"
		>
			{sections.map(({ id, label }) => {
				return (
					<a
						key={id}
						href={`#${id}`}
						className="
							flex text-[white] px-[0.75rem] py-[0.5rem]
							border-2 border-[var(--glass)] rounded-ss-[0.5rem] rounded-ee-[0.5rem]
							hover:bg-[var(--crimson-light)] hover:shadow-[0_0_0.5rem_var(--shadow)]
							hover:bg-[var(--glass)] flex items-center justify-center
							
						"
					>
						{label}
					</a>
				)
			})}


			{/* ACCOUNT BUTTON */}
			<Link to={user ? "/admin/dashboard" : "/admin/auth"}>
				<FaUser className="
						flex text-[white]
						h-auto w-max px-[0.5rem] py-[0.25rem]
						border-2 border-[var(--glass)]
						rounded-ss-[0.5rem] rounded-ee-[0.5rem]
						hover:bg-[var(--glass)] hover:shadow-[0_0_0.5rem_var(--shadow)]
					"/>
			</Link>
		</nav>
	)
}
