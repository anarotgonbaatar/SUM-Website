import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Link } from 'react-router'

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleAuth = async () => {
		setError('')
		setSuccess('')

		if (isSignUp) {
			// Validate member by email first
			const { data: memberCheck, error: memberError } = await supabase
				.from('members')
				.select('*')
				.eq('email', form.email)
				.single()

			if (memberError || !memberCheck) {
				setError('You are not a registered SUM member.')
				return
			}

			// Validate names and position match
			if (
				memberCheck.first_name.trim().toLowerCase() !== form.first_name.trim().toLowerCase() ||
				memberCheck.last_name.trim().toLowerCase() !== form.last_name.trim().toLowerCase() ||
				memberCheck.position.trim().toLowerCase() !== form.position.trim().toLowerCase()
			) {
				setError('Not a registered SUM member.')
				return
			}

			// Try Sign Up
			const { error: signUpError } = await supabase.auth.signUp({
				email: form.email,
				password: form.password,
				options: {
					data: {
						first_name: form.first_name,
						last_name: form.last_name,
						position: form.position,
						role: memberCheck.role || 'editor'
					},
					emailRedirectTo: `${window.location.origin}/admin/dashboard`
				}
			})

			if (signUpError) {
				// Special case for already signed up
				if (signUpError.message.includes('User already registered')) {
					setError('This email is already signed up. Please sign in instead.')
				} else {
					setError(signUpError.message)
				}
			} else {
				setSuccess('Confirmation email sent! Please check your inbox.')
			}
		} else {
			// Sign In
			const { error: signInError } = await supabase.auth.signInWithPassword({
				email: form.email,
				password: form.password
			})

			if (signInError) {
				setError('Email or password is incorrect.')
			} else {
				setSuccess('Sign in successful! Redirecting...')
				window.location.href = '/admin/dashboard'
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