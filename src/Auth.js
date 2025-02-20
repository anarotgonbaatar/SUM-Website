import { useState } from "react"
import { supabase } from './supabase'
import './styles/auth.css'

function Auth() {
	const[ email, setEmail ] = useState('')
	const[ password, setPassword ] = useState('')
	const[ error, setError ] = useState( null )

	const signUp = async () => {
		const { user, error } = await supabase.auth.signUp({
			email,
			password,
		})

		if ( error ) setError( error.message )
		else alert( "Check your email for confirmation" )
	}

	const signIn = async () => {
		const { user, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if ( error ) setError( error.message );
        else alert( 'Logged in successfully!' );
	}
	
	return (
		<div id="auth-page"></div>
	)
}

export default Auth