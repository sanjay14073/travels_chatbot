import { useState, useRef, useEffect } from 'react'
import { marked } from 'marked'

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! 🌏 Ask me about travel itineraries, costs, or tips!' }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg = { from: 'user', text: input }
    setMessages(prev => [...prev, userMsg])

    try {
      const res = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: input })
      })

      const data = await res.json()
      const botMsg = {
        from: 'bot',
        text: data.response || "Sorry, I couldn't understand that."
      }

      setMessages(prev => [...prev, botMsg])
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: 'Error contacting server.' }
      ])
    }

    setInput('')
  }

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#f9f9f9',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%'
      }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '12px'
            }}
          >
            <div
              style={{
                background: msg.from === 'user' ? '#4caf50' : '#e0e0e0',
                color: msg.from === 'user' ? '#fff' : '#000',
                padding: '12px',
                borderRadius: '8px',
                maxWidth: '80%',
                whiteSpace: 'pre-wrap'
              }}
              dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
            />
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div style={{
        padding: '20px',
        borderTop: '1px solid #ddd',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%',
        background: '#fff'
      }}>
        <textarea
          style={{
            width: '100%',
            resize: 'none',
            borderRadius: '8px',
            padding: '12px',
            border: '1px solid #ccc',
            fontSize: '14px',
            outline: 'none'
          }}
          rows={2}
          placeholder="Type your message and press Enter..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  )
}

export default ChatPage
