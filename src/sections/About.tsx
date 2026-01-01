import SectionHeader from "../components/SectionHeader"

export default function Home() {
	return (
		<section id="about-section">
			<SectionHeader sectionName="About ΣYM"/>
			<span>Sigma Upsilon Mu</span>
			<h2>Achievement. Brotherhood. Leadership. Entrepreneurship.</h2>
			<p>We build high-achievers through real projects, real standards, and real community.</p>

			<div className="flex gap-[1rem]">
				<button className="cta btn">Join SUM</button>
				<button className="btn">Learn More</button>
			</div>
		</section>
	)
}