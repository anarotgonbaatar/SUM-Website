import { useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'
import Phoenix from '../../assets/logos/phoenix-white.png'  // your logo path here

export default function ChatWidget() {
	const [isOpen, setIsOpen] = useState(false)
	const [messages, setMessages] = useState<{ sender: string, text: string }[]>([])
	const [userInput, setUserInput] = useState('')
	const [isTyping, setIsTyping] = useState(false)

	const sendMessage = async () => {
		if (!userInput.trim()) return

		const userMsg = { sender: 'user', text: userInput }
		setMessages(prev => [...prev, userMsg])
		setUserInput('')
		setIsTyping(true)

		const res = await fetch('/.netlify/functions/chat', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ messages: [{ role: 'user', content: userInput }] })
		})
		if (!res.ok) {
			console.error("Server error:", res.status)
			return
		}

		let data
		try {
			data = await res.json()
		} catch (err) {
			console.error("Failed to parse JSON:", err)
			return
		}
		const botMsg = { sender: 'bot', text: data.reply }

		setMessages(prev => [...prev, botMsg])
		setIsTyping(false)
	}

	return (
		<div
			id="chat-window"
			className={`fixed bottom-[1rem] right-[1rem] z-50 flex flex-col p-[0.5rem] bg-[var(--shadow)] border-3 border-[var(--glass)] rounded-ss-[1.5rem] rounded-ee-[1.5rem] backdrop-blur-[2rem] shadow-[0_0_1rem_var(--shadow)] ${
				isOpen ? 'max-w-[calc(100vw-2rem)] w-[28rem] h-[32rem] bg-[var(--glass-dark)]!' : ''
			}`}
		>
			{/* Phoenix profile section */}
			{isOpen && (
				<span className="text-[var(--glass)] text-[0.75rem] text-center">
					Phoenix the chatbot | Powered by OpenAI GPT-4o-mini
				</span>
			)}

			{/* Conversation */}
			{isOpen && (
				<div className="flex flex-col my-[0.5rem] gap-[0.5rem] overflow-y-auto h-full">
					{messages.map((msg, idx) => (
						<div
							key={idx}
							className={`p-[0.5rem] rounded-ss-[0.5rem] rounded-ee-[0.5rem] max-w-[75%] ${
								msg.sender === 'user'
									? 'bg-[var(--crimson-dark)] border-2 border-[var(--crimson)] self-end'
									: 'bg-[var(--gold)] border-2 border-[var(--gold-light)] self-start text-[black]'
							}`}
						>
							{msg.text}
						</div>
					))}
					{isTyping && (
						<div className="p-2 rounded bg-gray-200 text-black self-start mr-auto">Typing...</div>
					)}
				</div>
			)}

			<div className='flex gap-[0.5rem] w-full justify-between items-center'>
				{/* Input */}
				{isOpen && (
					<div className="flex items-center gap-[0.5rem] w-full h-full">
						<input
							type="text"
							value={userInput}
							onChange={e => setUserInput(e.target.value)}
							placeholder="Ask questions about SUM"
							onKeyDown={e => {
								if (e.key === 'Enter') sendMessage()
							}}
							className="border-2! border-[var(--gold-light)] text-[white] bg-[var(--shadow)] h-full!"
						/>
						<button
							onClick={sendMessage}
							title='Send message' type='button'
							className="btn h-full"
						>
							<FaArrowUp />
						</button>
					</div>
				)}

				{/* Floating icon */}
				<div
					id="chatbot-icon-container"
					onClick={() => setIsOpen(!isOpen)}
					className="
						w-[2.75rem] h-[2.75rem] flex items-center justify-center
						rounded-ss-[1rem] rounded-ee-[1rem]
						bg-[var(--crimson-dark)]
						border-3 border-[var(--gold-light)]
						shadow-[0_0_1rem_var(--gold)]
						cursor-pointer
					"
				>
					<img
						src={Phoenix}
						alt="Phoenix"
						className="w-auto h-[3rem]"
					/>
				</div>
			</div>
		</div>
	)
}
