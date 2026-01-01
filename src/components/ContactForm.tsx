export default function ContactForm() {
	return (
		<form
			action=""
			className="
				bg-gradient-to-b from-black/5 to-black/40
				rounded-[1rem]
				p-[1rem]!
			"
		>
			<div>
				<h2>Join Us</h2>
				<span>Learn World Class Business Skills.</span>
			</div>
			
			<div className="flex gap-[1rem]">
				<div className="input-div">
					<label htmlFor="firstName">First Name</label>
					<input type="text" name="firstName" placeholder="First name" maxLength={50}/>
				</div>
				<div className="input-div">
					<label htmlFor="lastName">Last Name</label>
					<input type="text" name="lastName" placeholder="Last name" maxLength={50}/>
				</div>
			</div>
			<div className="input-div">
				<label htmlFor="phone">Phone</label>
				<input type="phone" name="phone" placeholder="Phone" maxLength={50}/>
			</div>
			<div className="input-div">
				<label htmlFor="email">Email</label>
				<input type="email" name="email" placeholder="Email" maxLength={50}/>
			</div>
			<div className="input-div">
				<label htmlFor="referredBy">Referred By</label>
				<input type="text" name="referredBy" placeholder="Referred By" maxLength={50}/>
				<span className="opacity-60">How did you hear about SUM?</span>
			</div>
			<div className="input-div">
				<label htmlFor="type">You are...</label>
				<select name="type" id="type">
					<option value="prospect">Prospect</option>
					<option value="professor">Professor</option>
					<option value="alumni">Alumni</option>
					<option value="professional">Professional</option>
				</select>
			</div>
			<div className="input-div">
				<label htmlFor="comments">Comments and/or Questions</label>
				<textarea name="comments" placeholder="Are you open to any major? (Yes)" maxLength={255}/>
			</div>

			<button className="cta btn">
				SUBMIT
			</button>
		</form>
	)
}