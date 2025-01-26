import React, { useState } from 'react'
import './styles/chatbot.css'
import { ReactComponent as ChatbotIcon } from './images/SUM Phoenix SVG Logo.svg'
import { FaArrowUp } from "react-icons/fa6"

function Chatbot() {

	const [ isOpen, setIsOpen ] = useState( false )
	const [ messages, setMessages ] = useState([])
	const [ userInput, setUserInput] = useState('')

	const sendMessage = async () => {
		if ( !userInput.trim() ) return
		const newMessages = [ ...messages, { sender: 'user', text: userInput } ]
		setMessages( newMessages )
		setUserInput('')
		
		try {
			const response = await fetch( '/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: userInput }),
			} )
			const data = await response.json()
			setMessages([ ...newMessages, { sender: 'bot', text: data.reply } ])
		} catch ( error ) {
			setMessages([ ...newMessages, { sender: 'bot', text: 'Error getting response' } ])
		}
	}

	return (
		<div id='chat-window' className={ isOpen ? 'open' : 'closed' }>
			{ isOpen && (
				<div id='conversation'>
					{/* Conversation here */}
					<span>AI Chatbot coming soon...</span>
					{ messages.map(( msg, idx ) => (
						<div key={idx} className={ `message ${ msg.sender }` }>
							{ msg.text }
						</div>
					))}
				</div>
			)}

			{ isOpen && (
				<div id='message-container'>
					<input
						id='message-input'
						type='text'
						value={ userInput }
						onChange={ (e) => setUserInput( e.target.value ) }
						placeholder='Ask questions about SUM'
					/>
					<button id='send-btn-container' onClick={ sendMessage }>
						<FaArrowUp id='send-btn-icon'/>
					</button>
				</div>
			)}
			
			<div id='chatbot-icon-container' onClick={ () => setIsOpen( !isOpen ) }>
				<ChatbotIcon id='chatbot-icon'/>
			</div>

		</div>
	)
}

export default Chatbot