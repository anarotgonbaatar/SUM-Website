import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Link, useNavigate } from 'react-router'

export default function Auth() {
    const [isSignUp, setIsSignUp] = useState(false)
	const [form, setForm] = useState({
		email: '',
		password: '',
		first_name: '',
		last_name: '',
		position: ''
	})
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const navigate = useNavigate()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleAuth = async () => {
		setError('')
		setSuccess('')
		const email = form.email.trim().toLowerCase()

		if (isSignUp) {
			// Check membership via RPC
			const { data: rows, error: rpcError } = await supabase.rpc('is_member', { _email: email })
			if (rpcError || !rows || rows.length === 0) {
				setError('You are not a SUM Board member.')
				return
			}
			const member = rows[0]

			const meta = {
				first_name: member.first_name,
				last_name: member.last_name,
				position: form.position || '',
				role: member.role || 'editor'
			}

			// Sign up (no confirmation required now)
			const { error: signUpError } = await supabase.auth.signUp({
				email,
				password: form.password,
				options: { data: meta }
			})

			if (signUpError) {
				if (signUpError.message.includes('User already registered')) {
					setError('This email is already signed up. Please sign in instead.')
				} else {
					setError(signUpError.message)
				}
				return
			}

			// Immediately sign in after successful sign up
			const { error: signInError } = await supabase.auth.signInWithPassword({ email, password: form.password })
			if (signInError) {
				setError('Could not sign in after registration.')
				return
			}

			setSuccess('Registration successful! Redirecting...')
			navigate('/admin/dashboard')
		} else {
			// Sign In
			const { error: signInError } = await supabase.auth.signInWithPassword({
				email,
				password: form.password
			})
			if (signInError) {
				setError('Email or password is incorrect.')
			} else {
				setSuccess('Sign in successful! Redirecting...')
				navigate('/admin/dashboard')
			}
		}
	}


    return (
        <div className="flex flex-col w-screen mx-auto mt-[5rem] items-center justify-center gap-[1rem] px-[1rem]">
            <h1 className="text-[2rem] font-[600]">{isSignUp ? 'Sign Up' : 'Sign In'} to SUM</h1>
			<Link
				to="/"
				className="btn text-[black]"
			>
				← Back to Dashboard
			</Link>
            <div className="max-w-md flex flex-col gap-[0.75rem] items-center">
                {isSignUp && (
                    <>
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            onChange={handleChange}
                            className="input"
                        />
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            onChange={handleChange}
                            className="input"
                        />
                        <select
                            name="position"
							title='Position'
                            className="input px-[1rem] py-[0.5rem] rounded-ss-[0.5rem] rounded-ee-[0.5rem] outline-none"
                            onChange={handleChange}
                        >
                            <option value="">Select Position</option>
                            <option value="President">President</option>
                            <option value="Vice President">Vice President</option>
                            <option value="Treasurer">Treasurer</option>
                            <option value="Director of Pledges">Director of Pledges</option>
                            <option value="Director of Finance">Director of Finance</option>
                            <option value="Director of Marketing">Director of Marketing</option>
                            <option value="Director of BICC">Director of BICC</option>
                            <option value="Director of Actives">Director of Actives</option>
                            <option value="Director of Alumni">Director of Alumni</option>
                            <option value="Member">Active Member</option>
                        </select>
                    </>
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="input"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="input"
                />

				{/* Error or success messages */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="">{success}</p>}

                <button onClick={handleAuth} className="btn w-full">
                    {isSignUp ? 'Register' : 'Sign In'}
                </button>

                <p className="flex items-center gap-[0.5rem]">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                        className="btn bg-transparent! text-[white]! border-[var(--gold)]! shadow-none!"
                        onClick={() => {
                            setIsSignUp(!isSignUp)
                            setError('')
                            setSuccess('')
                        }}
                    >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    )
}