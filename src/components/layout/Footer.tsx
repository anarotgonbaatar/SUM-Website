export default function Footer() {
    return (
        <footer
			className="
				flex flex-col gap-[0.75rem]
				bg-[black] border-t-1 border-[var(--glass)] p-[1rem] text-center text-[gray]
				hover:text-[var(--gold-light)]
			"
		>
            <div>
                © {new Date().getFullYear()} Sigma Upsilon Mu. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-[1rem]">
                <a href="/terms" className="text-[var(--gold)] hover:text-[white] underline">Terms of Service</a>
                <a href="/privacy" className="text-[var(--gold)] hover:text-[white] underline">Privacy Policy</a>
                <a href="/contact" className="text-[var(--gold)] hover:text-[white] underline">Contact</a>
            </div>

            <div className="">
                Developed by Anar Otgonbaatar.
            </div>
        </footer>
    )
}
