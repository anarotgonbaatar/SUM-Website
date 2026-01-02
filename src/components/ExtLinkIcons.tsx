import { FaInstagram, FaLinkedin, FaBagShopping } from 'react-icons/fa6'

export default function ExtLinkIcons() {
	return (
		<div
			className='
				flex gap-[1rem]
				bg-gradient-to-b from-black/5 to-black/10
				p-[0.5rem]! rounded-(--radius)
			'
		>
			<a href="https://www.instagram.com/sigmaupsilonmu/" title='SUM Instagram Link'>
				<FaInstagram className='icon'/>
			</a>
			<a href="https://www.linkedin.com/company/sigmaupsilonmu/" title='SUM LinkedIn Link'>
				<FaLinkedin className='icon'/>
			</a>
			<a href="" title='https://sumclothing.com/'>
				<FaBagShopping className='icon'/>
			</a>
		</div>
	)
}