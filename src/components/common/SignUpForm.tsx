export default function SignUpForm() {
	return (
		<div className="signup-card">
			{/* GHL form integration */}
			<iframe
				src="https://api.leadconnectorhq.com/widget/form/8LcR1Onlve8XsPTwA5OQ"
				style={{
					width: "100%",
					height: "34.2rem",
					border: "none",
					borderRadius: "0.5rem",
				}}
				id="inline-8LcR1Onlve8XsPTwA5OQ"
				data-layout="{'id':'INLINE'}"
				data-trigger-type="alwaysShow"
				data-trigger-value=""
				data-activation-type="alwaysActivated"
				data-activation-value=""
				data-deactivation-type="neverDeactivate"
				data-deactivation-value=""
				data-form-name="General Recruitment Form"
				data-height="538"
				data-layout-iframe-id="inline-8LcR1Onlve8XsPTwA5OQ"
				data-form-id="8LcR1Onlve8XsPTwA5OQ"
				title="General Recruitment Form"
			/>
			{/* required by GHL embed */}
			<script src="https://link.msgsndr.com/js/form_embed.js"></script>
		</div>
	)
}