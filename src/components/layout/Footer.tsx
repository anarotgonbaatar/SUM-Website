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

            <div className="">
                Developed by Anar Otgonbaatar.
            </div>
        </footer>
    )
}
