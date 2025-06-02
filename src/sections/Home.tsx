import { useEffect, useRef } from "react"
import { FaFacebookSquare, FaInstagram } from "react-icons/fa"
import PhoenixLogo from "../assets/logos/pheonix-sum-white.png"
import FullertonLogo from "../assets/logos/fullerton-logo.png"

export default function Home() {
	const loggedVisit = useRef< boolean >( false )

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

	return (
		<section className="section min-h-[100vh] pt-[4rem]" id="home-section">
			<img id="home-logo" src={ PhoenixLogo } alt="SUM Logo" className="w-full max-w-[28rem]" />

			<span className="text-xl font-semibold">
				Build World Class Business Skills While In College
			</span>

			<a href="#besumone-section" className="btn cta-btn">
				SUM (Sign Up, Mate!)
			</a>

			<div className="icons">
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
