import Footer from './Footer'
import ChatWidget from '../ai/ChatWidget'
import { Outlet } from 'react-router-dom'

export default function Layout() {
	return (
		<div className='flex flex-col min-h-screen'>
			<main className="flex-grow">
				<Outlet />
			</main>
			<Footer />
			<ChatWidget />
		</div>
	)
}
