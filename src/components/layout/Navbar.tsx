import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { FaUser } from "react-icons/fa"
import Phoenix from '../../assets/logos/phoenix-white.png'
import SUM from '../../assets/logos/sum-white.png'

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
				flex flex-row justify-between gap-[0.5rem]
				py-[0.5rem] px-[1rem]
				backdrop-blur-[2rem]
				border-b-2 border-[var(--glass)]
				bg-[var(--glass-dark)]
			"
		>
			<div className="flex items-center gap-[0.5rem]">
				<img src={Phoenix} alt="Phoenix Logo" className="h-[2.5rem]"/>
				<img src={SUM} alt="Sigma Upsilon Mu" className="h-[2rem]"/>
			</div>

			{sections.map(({ id, label }) => {
				return (
					<a
						key={id}
						href={`#${id}`}
						className="
							text-[white]
							hover:text-(--gold)
						"
					>
						{label}
					</a>
				)
			})}


			{/* ACCOUNT BUTTON */}
			<Link to={user ? "/admin/dashboard" : "/admin/auth"} className="">
				<FaUser
					className="
						flex text-[white]
						h-full w-[2.5rem] p-[0.5rem]!
						border-2 border-[var(--glass)]
						rounded-ss-[0.5rem] rounded-ee-[0.5rem]
						hover:bg-[var(--glass)] hover:shadow-[0_0_0.5rem_var(--shadow)]
					"/>
			</Link>
		</nav>
	)
}
