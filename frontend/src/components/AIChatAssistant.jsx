import React, { useState, useRef, useEffect } from 'react'
import { Bot, X, Send, User, Sprout } from 'lucide-react'
import { sendChatMessage } from '../services/api'
import { useLanguage } from '../context/LanguageContext'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export default function AIChatAssistant() {
    const { t } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { role: 'ai', content: t('chat.hello') }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        if (isOpen) {
            scrollToBottom()
        }
    }, [messages, isOpen, isTyping])

    const handleSend = async () => {
        if (!inputValue.trim()) return

        const userMsg = { role: 'user', content: inputValue.trim() }
        setMessages(prev => [...prev, userMsg])
        setInputValue('')
        setIsTyping(true)

        try {
            const res = await sendChatMessage({ message: t('chat.promptPrefix') + " " + userMsg.content })
            const aiMsg = { role: 'ai', content: res.data.reply }
            setMessages(prev => [...prev, aiMsg])
        } catch (error) {
            console.error("AI Chat Error:", error)
            setMessages(prev => [...prev, { role: 'ai', content: t('chat.error') }])
        } finally {
            setIsTyping(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="fixed bottom-24 right-24 z-50 flex flex-col items-end">

            {/* Chat Window */}
            {isOpen && (
                <div className="mb-16 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-black/5 animate-fade-in group">
                    {/* Header */}
                    <div className="bg-primary-600 text-white h-[56px] px-16 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-12">
                            <div className="w-[45px] h-[45px] bg-white/20 rounded-full flex items-center justify-center shrink-0">
                                <Sprout size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-[16px] leading-[1.2]">{t('chat.title')}</h3>
                                <p className="text-[12px] text-white/80 font-medium">{t('chat.subtitle')}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-[32px] h-[32px] rounded-full hover:bg-white/20 flex items-center justify-center transition-colors shrink-0"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-16 overflow-y-auto flex flex-col gap-16 bg-[#F8FAFC]">
                        {messages.map((msg, idx) => {
                            const isUser = msg.role === 'user'
                            return (
                                <div key={idx} className={`flex gap-8 max-w-[85%] animate-slide-in-bottom ${isUser ? 'self-end flex-row-reverse' : 'self-start'}`}>
                                    <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 mt-4 ${isUser ? 'bg-primary-100 text-primary-700' : 'bg-gray-200 text-gray-700'}`}>
                                        {isUser ? <User size={16} /> : <Bot size={16} />}
                                    </div>
                                    <div className={`p-[10px] rounded-2xl text-[14px] leading-[1.5] ${isUser ? 'bg-primary-500 text-white rounded-tr-none' : 'bg-gray-100 border border-black/5 text-appDarkText rounded-tl-none shadow-sm overflow-x-auto break-words'}`}>
                                        {isUser ? (
                                            msg.content
                                        ) : (
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                rehypePlugins={[rehypeRaw]}
                                                components={{
                                                    p: ({ node, ...props }) => <p className="text-[14px] mb-2 last:mb-0" {...props} />,
                                                    ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2 space-y-1 text-[14px]" {...props} />,
                                                    ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-2 space-y-1 text-[14px]" {...props} />,
                                                    li: ({ node, ...props }) => <li className="" {...props} />,
                                                    h1: ({ node, ...props }) => <h1 className="font-bold text-[18px] mb-3 mt-4 first:mt-0 text-gray-900 leading-tight" {...props} />,
                                                    h2: ({ node, ...props }) => <h2 className="font-bold text-[17px] mb-3 mt-4 first:mt-0 text-gray-800 leading-tight" {...props} />,
                                                    h3: ({ node, ...props }) => <h3 className="font-bold text-[16px] mb-2 mt-3 first:mt-0 text-gray-800 leading-tight" {...props} />,
                                                    h4: ({ node, ...props }) => <h4 className="font-semibold text-[15px] mb-1 mt-2 first:mt-0 text-gray-800 leading-tight" {...props} />,
                                                    table: ({ node, ...props }) => <div className="overflow-x-auto mb-2 border border-black/10 rounded"><table className="min-w-full divide-y divide-black/10 text-left" {...props} /></div>,
                                                    thead: ({ node, ...props }) => <thead className="bg-black/5" {...props} />,
                                                    tbody: ({ node, ...props }) => <tbody className="divide-y divide-black/5" {...props} />,
                                                    th: ({ node, ...props }) => <th className="px-3 py-2 text-[13px] font-semibold text-gray-700 bg-black/5" {...props} />,
                                                    td: ({ node, ...props }) => <td className="px-3 py-2 text-[13px] text-gray-700 align-top" {...props} />,
                                                    strong: ({ node, ...props }) => <strong className="font-semibold text-gray-900" {...props} />,
                                                    a: ({ node, ...props }) => <a className="text-primary-600 hover:underline" {...props} />,
                                                    code: ({ node, inline, ...props }) => inline ? <code className="bg-black/5 px-1 py-0.5 rounded text-[12px] font-mono text-gray-800" {...props} /> : <pre className="bg-gray-800 text-white p-3 rounded-lg overflow-x-auto text-[12px] font-mono mb-2"><code {...props} /></pre>,
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        )}
                                    </div>
                                </div>
                            )
                        })}

                        {isTyping && (
                            <div className="flex gap-8 max-w-[85%] self-start animate-slide-in-bottom">
                                <div className="w-[28px] h-[28px] rounded-full bg-gray-200 text-gray-700 flex items-center justify-center shrink-0 mt-4">
                                    <Bot size={16} />
                                </div>
                                <div className="shimmer-wrapper w-[140px] h-[40px] rounded-2xl rounded-tl-none mt-2 shadow-sm border border-black/5" />
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-[10px] bg-white border-t border-black/5 flex items-center gap-8 min-h-[50px] h-auto shrink-0">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={t('chat.placeholder')}
                            className="flex-1 h-[36px] min-h-[36px] bg-[#F1F5F9] border-transparent rounded-full px-16 py-[8px] text-[14px] text-appDarkText file:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none overflow-hidden"
                            rows={1}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim() || isTyping}
                            className="w-[32px] h-[32px] rounded-full bg-primary-500 text-white flex items-center justify-center shrink-0 hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={14} className="translate-x-[-1px] translate-y-[1px]" />
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-64 h-64 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-primary-500/30 hover:bg-primary-700 hover:scale-105 transition-all group"
                >
                    <Bot size={32} className="group-hover:animate-pulse" />
                </button>
            )}
        </div>
    )
}
