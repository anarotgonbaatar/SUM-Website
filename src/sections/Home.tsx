import { useEffect, useRef, useState } from "react"
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa"
import PhoenixLogo from "../assets/logos/pheonix-sum-white.png"
import FullertonLogo from "../assets/logos/fullerton-logo.png"
import SignUpForm from "../components/common/SignUpForm"

export default function Home() {
	const loggedVisit = useRef< boolean >( false )
	const [openSignup, setOpenSignup] = useState<boolean>( false )
	const panelRef = useRef<HTMLDivElement>( null )

	useEffect(() => {
		if (!loggedVisit.current) {
			fetch(
				"https://script.google.com/macros/s/AKfycbx6JTX6HnHyUW_lMmOlpNBKUoCFU7bWZDiU5QamSLn0O5kNwI20I-DlUo1pnMd-hbiL6g/exec",
				{
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body: new URLSearchParams({ eventType: "visit" }),
				}
			)
			loggedVisit.current = true
		}
	}, [])

	// Open the panel if URL is ...#signup or ?target=signup (for QR)
	useEffect(() => {
		const tryOpenFromURL = () => {
			const targetFromHash = location.hash === "#signup"
			const params = new URLSearchParams(location.search)
			const targetFromQuery = params.get("target") === "signup"
			if ((targetFromHash || targetFromQuery) && !openSignup) {
				setOpenSignup(true)
				// scroll after it renders
				setTimeout(() => {
					panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
				}, 0)
			}
		}
		tryOpenFromURL()
		window.addEventListener("hashchange", tryOpenFromURL)
		return () => window.removeEventListener("hashchange", tryOpenFromURL)
	}, [openSignup])

	return (
		<section className="min-h-[100vh]" id="home-section">
			
			{/* <img id="home-logo" src={ PhoenixLogo } alt="SUM Logo" className="w-full max-w-[28rem]" />

			<span className="text-xl font-semibold">
				Build World Class Business Skills While In College
			</span> */}
			
			<div className="flex flex-col text-center text-[5rem]">
				<span>FACTA</span>
				<span className="text-[4rem]">NON</span>
				<span>VERBA</span>
				<span className="text-[1rem]">Deeds Not Words</span>
			</div>

			<div className="flex gap-[1rem]">
				<button className="btn cta-btn">
					Join SUM
				</button>

				<a
					className="btn"
					href="https://sumclothing.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					SUM Merch
				</a>
			</div>

			<div className="icons mt-[1rem]">
				<a
					title="Sigma Upsilon Mu Instagram Page"
					href="https://www.instagram.com/sigmaupsilonmu/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaInstagram className="icon" />
				</a>
				<a
					title="Sigma Upsilon Mu Facebook Page"
					href="https://www.facebook.com/SigmaUpsilonMu"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaFacebookSquare className="icon" />
				</a>
				<a
					title="Sigma Upsilon Mu LinkedIn Page"
					href="https://www.linkedin.com/company/sigmaupsilonmu/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaLinkedin className="icon" />
				</a>
				<a
					href="https://www.fullerton.edu/"
					target="_blank"
					rel="noopener noreferrer"
				>
				<img
					id="home-csuf-logo"
					className="icon"
					src={ FullertonLogo }
					alt="California State University Fullerton"
				/>
				</a>
			</div>
		</section>
	)
}
