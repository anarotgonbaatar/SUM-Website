import { useState } from "react"

export default function ContactForm() {
	const [loading, setLoading] = useState(false)
	const [status, setStatus] = useState<"idle" | "ok" | "error">("idle")
	const [errorMsg, setErrorMsg] = useState("")

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		setErrorMsg("")

		const form = e.currentTarget
		const fd = new FormData(form)

		const payload = {
			firstName: String(fd.get("firstName") || ""),
			lastName: String(fd.get("lastName") || ""),
			phone: String(fd.get("phone") || ""),
			email: String(fd.get("email") || ""),
			referredBy: String(fd.get("referredBy") || ""),
			type: String(fd.get("type") || "prospect"),
			comments: String(fd.get("comments") || ""),
		}

		try {
			const r = await fetch("/.netlify/functions/ghl-create-contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			})

			const data = await r.json().catch(() => ({}))

			if (!r.ok) {
				setStatus("error")
				setErrorMsg(data?.message || "Something went wrong. Try again.")
				return
			}

			setStatus("ok")
			setErrorMsg("")
			form.reset()
		} catch {
			setErrorMsg("error")
		} finally {
			setLoading(false)
		}
	}

	return (
		<form
			onSubmit={onSubmit}
			className="
				bg-gradient-to-b from-black/5 to-black/40
				rounded-[2rem_1rem]
				p-[1rem]!
			"
		>	
			<div className="flex gap-[1rem] w-full">
				<div className="input-div">
					<label htmlFor="firstName">First Name <span className="text-(--gold)">*</span></label>
					<input required type="text" name="firstName" placeholder="First name" maxLength={50}/>
				</div>
				<div className="input-div">
					<label htmlFor="lastName">Last Name <span className="text-(--gold)">*</span></label>
					<input required type="text" name="lastName" placeholder="Last name" maxLength={50}/>
				</div>
			</div>
			<div className="input-div">
				<label htmlFor="phone">Phone <span className="text-(--gold)">*</span></label>
				<input required type="tel" name="phone" placeholder="Phone" inputMode="tel"/>
			</div>
			<div className="input-div">
				<label htmlFor="email">Email <span className="text-(--gold)">*</span></label>
				<input required type="email" name="email" placeholder="Email" maxLength={50}/>
			</div>
			<div className="input-div">
				<label htmlFor="referredBy">Referred By <span className="text-(--gold)">*</span></label>
				<input required type="text" name="referredBy" placeholder="Referred By" maxLength={50}/>
				<span className="opacity-60">How did you hear about SUM?</span>
			</div>
			<div className="input-div">
				<label htmlFor="type">You are ... <span className="text-(--gold)">*</span></label>
				<select required name="type" id="type">
					<option value="prospect">Potential Pledge</option>
					<option value="alumni">Alumni</option>
					<option value="professor">Professor</option>
					<option value="professional">Professional</option>
				</select>
			</div>
			<div className="input-div">
				<label htmlFor="comments">Comments and/or Questions</label>
				<textarea name="comments" placeholder="Are we open to any major? (Yes)" maxLength={255}/>
			</div>
			
			{status === "ok" && (
				<p className="text-(--gold)">
					Submitted! We’ll reach out soon.
				</p>
			)}
			{status === "error" && (
				<p className="text-white bg-(--crimson) p-[0.25rem]! rounded-(--radius)">
					{errorMsg}
				</p>
			)}
			{/* Submit button */}
			<button className="cta btn" type="submit" disabled={loading}>
				{loading ? "SUBMITTING..." : "SUBMIT"}
			</button>

			<p className="text-white/90 mt-[-0.5rem]! text-[0.8rem]!">
				By submitting this form, you consent to Sigma Upsilon Mu collecting your name and contact information to follow up about recruitment. We do NOT sell your data.
			</p>
		</form>
	)
}