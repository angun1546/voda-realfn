import { useState, useRef, useEffect } from 'react'
import ChatBubble from '../components/ChatBubble'
import useUI from '../hooks/useUI'

const BACKEND = 'https://vodamovie.onrender.com/chat'

const AskPage = () => {
  const ui = useUI()

  const initMessages = () => [
    { id: 1, role: 'ai', text: ui.askGreeting },
  ]

  const [messages, setMessages] = useState(initMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesRef = useRef(null)

  // 언어 변경 시 첫 메시지 갱신 (대화 진행 중이 아닐 때만)
  useEffect(() => {
    if (messages.length <= 1) {
      setMessages([{ id: 1, role: 'ai', text: ui.askGreeting }])
    }
  }, [ui.askGreeting])

  useEffect(() => {
    if (messages.length <= 1 && !loading) return
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, loading])

  const handleSend = async (text) => {
    const trimmed = (typeof text === 'string' ? text : input).trim()
    if (!trimmed || loading) return

    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: trimmed }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(BACKEND, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed }),
      })
      if (!res.ok) throw new Error('서버 응답 오류')
      const data = await res.json()
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'ai', text: data.reply }])
    } catch {
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'ai', text: ui.askError }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const quickPrompts = [ui.askPrompt1, ui.askPrompt2, ui.askPrompt3, ui.askPrompt4]

  return (
    <div className='flex flex-col h-[calc(100vh-80px)] px-12 py-10 bg-zinc-950'>
      <div className='max-w-3xl w-full mx-auto mb-10' />

      <div
        ref={messagesRef}
        className='flex-1 min-h-0 max-w-3xl w-full mx-auto flex flex-col gap-6 pb-10 overflow-y-auto no-scrollbar'
      >
        {messages.map((msg) => (
          <ChatBubble key={msg.id} msg={msg.text} isAi={msg.role === 'ai'} />
        ))}
        {loading && <ChatBubble msg={ui.loading || '...'} isAi={true} />}
      </div>

      <div className='sticky bottom-0 pb-10 pt-4 max-w-3xl w-full mx-auto flex flex-col gap-5 bg-zinc-950'>
        {messages.length < 3 && (
          <div className='grid grid-cols-2 gap-2'>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className='px-4 py-3 rounded-lg border border-white/5 bg-zinc-900/50 text-zinc-400 text-sm hover:border-primary-400/30 hover:text-primary-400 transition-all cursor-pointer text-center disabled:opacity-50'
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        <div className='backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-2 flex items-center gap-4 shadow-2xl focus-within:border-primary-400/50 transition-all'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={ui.askPlaceholder}
            disabled={loading}
            className='bg-transparent outline-none text-white h-14 w-full placeholder-zinc-500 disabled:opacity-50 font-serif text-lg'
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className='shrink-0 px-6 h-10 rounded-xl bg-primary-500 text-white font-serif font-bold hover:bg-primary-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed'
          >
            {ui.askSend}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AskPage
