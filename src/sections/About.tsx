import SectionHeader from "../components/SectionHeader"
import ActionButtons from "../components/ActionButtons"

export default function About() {
	
	return (
		<section id="about-section">
			<SectionHeader sectionName="About ΣYM"/>
			<div className="glass-card">
				<h2>Sigma Upsilon Mu (SUM)</h2>
				<p>is a co-ed entrepreneurship fraternity founded in March 2014 at California State University, Fullerton. We’re a community built for people who want to do, not just talk — our motto is “Facta Non Verba” (Deeds, Not Words).</p>
				<p>Our symbol is the phoenix, representing rebirth — entrepreneurs fail, iterate, learn, and rise stronger. Our colors crimson, gold, and black reflect the fire, trials, and the ashes we rise from.</p>
			</div>

			<div className="glass-card">
				<h2>Mission</h2>
				<p>We believe human potential is limitless. Through a continuous cycle of Achievement, Brotherhood, Leadership, and Entrepreneurship, we develop members who build or join great companies and push the limits of what’s possible.</p>
			</div>

			<div className="glass-card">
				<h2>Vision</h2>
				<p>To be the leading collegiate organization for developing the highest achieving individuals through entrepreneurship principles.</p>
			</div>
			
			<ActionButtons
				sectionName="About"
				link="#alumni"
			/>
		</section>
	)
}