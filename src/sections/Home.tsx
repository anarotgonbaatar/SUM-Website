import Phoenix from "../assets/logos/phoenix-white.png"
import SUM from "../assets/logos/sum-white.png"
import ActionButtons from "../components/ActionButtons"
import ExtLinkIcons from "../components/ExtLinkIcons"

export default function Home() {
	return (
		<section id="home-section" className="min-h-[100vh]">
			<div
				className="
					flex flex-col
					max-w-[16rem] gap-[0.5rem]
					items-center justify-center
					md:max-w-[20rem]
				"
			>
				<img src={Phoenix} alt="Phoenix logo"/>
				<img src={SUM} alt="SUM logo"/>
				<span className="tracking-[0.4rem]">SIGMA UPSILON MU</span>
			</div>
			<h2>Achievement. Brotherhood. Leadership. Entrepreneurship.</h2>
			<p>We build high-achievers through real projects, real standards, and real community.</p>

			<ActionButtons
				button="SUM Merch"
				link="https://sumclothing.com/"
			/>
			
			<ExtLinkIcons/>

		</section>
	)
}