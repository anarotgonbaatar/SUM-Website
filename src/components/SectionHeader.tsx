import LeavesLeft from '../assets/logos/leaves-left.png'
import LeavesRight from '../assets/logos/leaves-right.png'

export default function SectionHeader({
	sectionName
}: {
	sectionName: string
}) {
	return (
		<div
			className='
				flex items-center justify-center gap-[0.75rem] mb-[2rem]!
			'
		>
			<img
				src={LeavesLeft}
				alt="Top of Pillar"
				className='mix-blend-screen max-h-[3rem]'
			/>
			<h1>{sectionName}</h1>
			<img 
				src={LeavesRight}
				alt="Bottom of Pillar"
				className='mix-blend-screen max-h-[3rem]'
			/>
		</div>
	)
}