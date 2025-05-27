import React, { useState } from 'react'
import './styles/chatbot.css'
import { ReactComponent as ChatbotIcon } from './images/SUM Phoenix SVG Logo.svg'
import { FaArrowUp } from "react-icons/fa6"
import axios from 'axios'

function Chatbot() {

	const [ isOpen, setIsOpen ] = useState( false )
	const [ messages, setMessages ] = useState([])
	const [ userInput, setUserInput] = useState('')
	const [ isTyping, setIsTyping ] = useState( false )

	const sendMessage = async () => {
		if ( !userInput.trim() ) return
		const newMessages = [ ...messages, { sender: 'user', text: userInput } ]
		setMessages( newMessages )
		setUserInput('')
		// Show Typing... message bubble
		setIsTyping( true )
		
		try {
			const response = await axios.post(
				"/.netlify/functions/chat",
				{ message: userInput },
    			{ headers: { 'Content-Type': 'application/json' } },
			)

			setMessages([ ...newMessages, { sender: 'bot', text: response.data.reply } ])
		} catch ( error ) {
			console.error( 'Error sending message:', error )
			setMessages([ ...newMessages, { sender: 'bot', text: 'Error getting response' } ])
		} finally {
			// Hide Typing... message bubble
			setIsTyping( false )
		}
	}

	return (
		<div id='chat-window' className={ isOpen ? 'open' : 'closed' }>
			{/* Phoenix profile section */}
			{ isOpen && (
				<span id='phoenix-profile'>Phoenix the chatbot | Powered by OpenAI gpt-4o-mini</span>
			)}

			{ isOpen && (
				<div id='conversation'>
					{/* Conversation here */}
					{ messages.map(( msg, idx ) => (
						<div key={idx} className={ `message ${ msg.sender }` }>
							{ msg.text }
						</div>
					))}
					{ isTyping && (
						<div className='message'>Typing...</div>
					)}
				</div>
			)}

			{ isOpen && (
				<div id='message-input-container'>
					<input
						id='message-input'
						type='text'
						value={ userInput }
						onChange={ (e) => setUserInput( e.target.value ) }
						placeholder='Ask questions about SUM'
						onKeyDown={ (e) => {
							if ( e.key === "Enter" ) {
								sendMessage()
							}
						} }
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