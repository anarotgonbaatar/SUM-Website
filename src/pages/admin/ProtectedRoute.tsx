import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router'
import { createClient } from '@supabase/supabase-js'
import type { ReactNode } from 'react'

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!
)

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const location = useLocation()

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setIsAuthenticated(!!user)
        }
        checkAuth()
    }, [])

    if (isAuthenticated === null) return <div>Loading...</div>
    if (!isAuthenticated) return <Navigate to="/admin/auth" state={{ from: location.pathname }} />

    return children
}