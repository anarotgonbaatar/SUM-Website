exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' }
    }

    const { messages } = JSON.parse(event.body)

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-4o-1106-preview',
            messages: [
                { role: 'system', content: 'You are the Phoenix chatbot for Sigma Upsilon Mu (SUM). You only answer questions related to SUM and its activities.' },
                ...messages
            ],
            temperature: 0.7
        })
    })

    const data = await response.json()

    const reply = data.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not process that.'

    return {
        statusCode: 200,
        body: JSON.stringify({ reply })
    }
}