import { Routes, Route } from 'react-router'
import AppLayout from './components/layout/Layout'
import Landing from './pages/Landing'
import Auth from './pages/admin/Auth'
import Dashboard from './pages/admin/Dashboard'
import EventsManager from './pages/admin/EventsManager'
import GalleryManager from './pages/admin/GalleryManager'
import StoryManager from './pages/admin/StoriesManager'

export default function AppRoutes() {
    return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route index element={<Landing />} />
				<Route path="admin/auth" element={<Auth />} />
				<Route path="admin/dashboard" element={<Dashboard />} />
				<Route path="admin/events" element={<EventsManager />} />
				<Route path="admin/gallery" element={<GalleryManager />} />
				<Route path="admin/stories" element={<StoryManager />} />
			</Route>
		</Routes>
    )
}