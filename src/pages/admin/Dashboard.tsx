import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../../lib/supabaseClient'

import { Link } from 'react-router'

export default function AdminDashboard() {
    const [user, setUser] = useState<any>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                navigate('/admin/auth')
            } else {
                setUser(user)
            }
        }

        getUser()
    }, [navigate])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        navigate('/')
    }

    if (!user) return <div className="text-center m-[1rem] text-[2rem]">Loading...</div>

    return (
        <div id='dashboard-section' className="flex flex-col m-[1rem] gap-[1rem]">
            <h1 className="dashboard-title text-center">Admin Dashboard</h1>

            <div className="flex flex-col md:flex-row justify-between items-center gap-[0.5rem]">
                <h2 className="text-[1.5rem]">
                    Welcome, <span className="font-semibold">{user.user_metadata.first_name}</span>!
                </h2>
                <div id='buttons' className="flex gap-[1rem]">
                    <button
                        onClick={() => navigate('/')}
                        className="btn"
                    >
                        Back to Landing Page
                    </button>
                    <button
                        onClick={handleSignOut}
                        className="btn"
                    >
                        Sign Out
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-[1rem] items-center justify-center">
				<button className='btn'>
					<Link
						to="/admin/stories"
						className="text-[black]"
					>
						Stories Manager
					</Link>
				</button>

				<button className='btn'>
					<Link
						to="/admin/gallery"
						className="text-[black]"
					>
						Gallery Manager
					</Link>
				</button>

                <button className='btn'>
					<Link
						to="/admin/events"
						className="text-[black]"
					>
						Events Manager
					</Link>
				</button>


            </div>
        </div>
    )
}
