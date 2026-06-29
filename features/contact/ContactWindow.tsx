'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { OWNER, SOCIAL_LINKS } from '@/data/portfolio'
import { Send, Mail, Globe, Phone, Check, MessageSquare, ShieldCheck, ChevronLeft } from 'lucide-react'
import { playSynthSound } from '@/store/soundStore'
import emailjs from '@emailjs/browser'

// Read EmailJS credentials from environment variables (.env.local)
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ''
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ''

const Linkedin = (props: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size ?? 24} height={props.size ?? 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
)

const Instagram = (props: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size ?? 24} height={props.size ?? 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
)

const Facebook = (props: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size ?? 24} height={props.size ?? 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
)

const ICON_MAP: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number }>> = {
  Linkedin, Instagram, Facebook, Globe,
}

interface Message {
  id: string
  sender: 'phuong' | 'user'
  text: string
}

export default function ContactWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'phuong', text: "Hi there! I'm Nguyen Ngoc Phuong. Let's collaborate!" },
    { id: '2', sender: 'phuong', text: "To start sending your message directly to my email, what is your name?" }
  ])
  const [inputValue, setInputValue] = useState('')
  const [chatStep, setChatStep] = useState(0) // 0: Name, 1: Email, 2: Subject, 3: Message, 4: Done
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null)
  const feedEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text)
    playSynthSound('click')
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2000)
  }

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!inputValue.trim() || chatStep >= 4) return

    playSynthSound('click')
    const userText = inputValue.trim()
    setInputValue('')

    // Append user message bubble
    const userMsgId = Math.random().toString()
    setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text: userText }])

    if (chatStep === 0) {
      setFormData(prev => ({ ...prev, name: userText }))
      setChatStep(1)
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Math.random().toString(),
          sender: 'phuong',
          text: `Nice to meet you, ${userText}! What is your email address so I can reply?`
        }])
      }, 700)
    } else if (chatStep === 1) {
      setFormData(prev => ({ ...prev, email: userText }))
      setChatStep(2)
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Math.random().toString(),
          sender: 'phuong',
          text: "Got it! What is the subject of your message?"
        }])
      }, 700)
    } else if (chatStep === 2) {
      setFormData(prev => ({ ...prev, subject: userText }))
      setChatStep(3)
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Math.random().toString(),
          sender: 'phuong',
          text: "Great. Now write your message description below. I will send it straight to my email in the background!"
        }])
      }, 700)
    } else if (chatStep === 3) {
      const finalFormData = { ...formData, message: userText }
      setFormData(prev => ({ ...prev, message: userText }))
      setChatStep(4)

      // Temporary sending bubble
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: 'sending-status',
          sender: 'phuong',
          text: "Perfect! Sending your message directly to ngocphuong070404@gmail.com..."
        }])
      }, 500)

      // Post in background to FormSubmit
      try {
        if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
          // Send using EmailJS library
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
              from_name: finalFormData.name,
              from_email: finalFormData.email,
              subject: finalFormData.subject,
              message: finalFormData.message,
              to_email: 'ngocphuong070404@gmail.com',
            },
            EMAILJS_PUBLIC_KEY
          )
        } else {
          // Fallback background API
          const response = await fetch('https://formsubmit.co/ajax/ngocphuong070404@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              name: finalFormData.name,
              email: finalFormData.email,
              subject: finalFormData.subject,
              message: finalFormData.message,
              _honey: '',
            }),
          })

          if (!response.ok) {
            throw new Error('Send failed')
          }
        }

        setTimeout(() => {
          setMessages(prev => prev.filter(m => m.id !== 'sending-status').concat([
            {
              id: Math.random().toString(),
              sender: 'phuong',
              text: "Message sent directly to my email! I have received it and will respond within 24 hours. Thank you!"
            }
          ]))
        }, 1000)
      } catch {
        setTimeout(() => {
          setMessages(prev => prev.filter(m => m.id !== 'sending-status').concat([
            {
              id: Math.random().toString(),
              sender: 'phuong',
              text: "Background send failed, but you can always reach me directly at ngocphuong070404@gmail.com. Thank you!"
            }
          ]))
        }, 1000)
      }
    }
  }

  const getPlaceholder = () => {
    switch (chatStep) {
      case 0: return 'Type your name...'
      case 1: return 'Type your email...'
      case 2: return 'Type the subject...'
      case 3: return 'Type your message...'
      default: return 'Message sent successfully.'
    }
  }

  return (
    <div className="contact-console-container" style={{
      height: '100%',
      display: 'flex',
      fontFamily: 'var(--font-ui)',
      background: 'transparent',
    }}>
      {/* Left Sidebar: Desktop only */}
      <div className="contact-console-sidebar" style={{
        width: 240,
        borderRight: '1.5px solid var(--window-border)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0,
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
      }}>
        {/* Sidebar Header */}
        <div style={{ padding: '18px 20px', borderBottom: '1.5px solid var(--window-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <MessageSquare size={16} color="var(--blue-vivid)" />
            <span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Conversations
            </span>
          </div>
        </div>

        {/* Chats List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
            borderRadius: 14, background: 'var(--bg-elevated)', border: '1px solid var(--window-border)',
          }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--blue-vivid)15', border: '1px solid var(--blue-vivid)30',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 900, color: 'var(--blue-vivid)',
              }}>
                NP
              </div>
              <span style={{
                position: 'absolute', right: 0, bottom: 0,
                width: 9, height: 9, borderRadius: '50%',
                background: '#10b981', border: '1.5px solid var(--bg-surface)',
                boxShadow: '0 0 6px #10b981',
              }} />
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {OWNER.name}
              </div>
              <div style={{ fontSize: 10, color: '#10b981', fontWeight: 700 }}>Active Now</div>
            </div>
          </div>

          <div style={{ height: 1, background: 'var(--window-border)', margin: '4px 8px' }} />

          {/* Social Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 9.5, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: 8, marginBottom: 4 }}>
              Social Channels
            </span>
            {SOCIAL_LINKS.map(link => {
              const Icon = ICON_MAP[link.icon] ?? Globe
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="pointer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px',
                    borderRadius: 8, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)',
                    textDecoration: 'none', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--bg-elevated)'
                    e.currentTarget.style.color = 'var(--text-primary)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                  }}
                >
                  <Icon size={12.5} color="var(--text-muted)" />
                  <span>{link.platform}</span>
                </a>
              )
            })}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div style={{ padding: '16px 20px', borderTop: '1.5px solid var(--window-border)', background: 'var(--bg-surface)50' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 700, color: '#10b981' }}>
            <ShieldCheck size={13} />
            <span>FormSubmit.co API</span>
          </div>
        </div>
      </div>

      {/* Right Content Area: iMessage Client */}
      <div className="contact-console-main" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
      }}>
        {/* iMessage Header Bar */}
        <div style={{
          padding: '12px 18px',
          borderBottom: '1px solid var(--window-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(25px)',
          flexShrink: 0,
        }}>
          {/* Back button (iMessage style) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, width: 60 }}>
            <span className="imessage-back-btn" style={{
              display: 'flex', alignItems: 'center', gap: 2,
              fontSize: 13.5, color: '#007aff', fontWeight: 600, cursor: 'none',
            }}>
              <ChevronLeft size={18} />
              <span>Back</span>
            </span>
          </div>

          {/* Center Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            {/* Round Avatar */}
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--bg-elevated)', border: '1px solid var(--window-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 900, color: 'var(--text-secondary)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
            }}>
              NP
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>
              Nguyen Ngoc Phuong
            </span>
          </div>

          {/* Quick Copy Action Shortcuts */}
          <div style={{ display: 'flex', gap: 6, width: 60, justifyContent: 'flex-end' }}>
            <button
              onClick={() => handleCopy(OWNER.email, 'email')}
              data-cursor="pointer"
              title="Copy Email"
              style={{
                border: 'none', background: 'transparent', padding: 4, cursor: 'none',
                color: copiedType === 'email' ? '#10b981' : '#007aff',
              }}
            >
              {copiedType === 'email' ? <Check size={15} /> : <Mail size={15} />}
            </button>
            <button
              onClick={() => handleCopy(OWNER.phone!, 'phone')}
              data-cursor="pointer"
              title="Copy Phone"
              style={{
                border: 'none', background: 'transparent', padding: 4, cursor: 'none',
                color: copiedType === 'phone' ? '#10b981' : '#007aff',
              }}
            >
              {copiedType === 'phone' ? <Check size={15} /> : <Phone size={15} />}
            </button>
          </div>
        </div>

        {/* iMessage Chat Bubble Feed */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
          {messages.map((msg) => {
            const isMe = msg.sender === 'user'
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: isMe ? 'flex-end' : 'flex-start',
                  width: '100%',
                }}
              >
                <div style={{
                  maxWidth: '70%',
                  background: isMe ? '#007aff' : 'var(--bg-elevated)',
                  border: isMe ? 'none' : '1px solid var(--window-border)',
                  color: isMe ? '#ffffff' : 'var(--text-primary)',
                  borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  padding: '10px 16px',
                  fontSize: 13,
                  lineHeight: 1.5,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.text}
                </div>
              </div>
            )
          })}
          <div ref={feedEndRef} />
        </div>

        {/* iMessage Input Bar */}
        <div style={{
          padding: '12px 16px',
          background: 'var(--bg-glass)',
          borderTop: '1px solid var(--window-border)',
          flexShrink: 0,
        }}>
          <form onSubmit={handleSend} style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-surface)',
            border: '1.5px solid var(--window-border)',
            borderRadius: 22,
            padding: '4px 6px 4px 14px',
            gap: 10,
          }}>
            <input
              type={chatStep === 1 ? 'email' : 'text'}
              placeholder={getPlaceholder()}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              disabled={chatStep >= 4}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-ui)',
                fontSize: 13,
                padding: '6px 0',
              }}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={chatStep >= 4 || !inputValue.trim()}
              style={{
                width: 28, height: 28, borderRadius: '50%',
                background: '#007aff', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#ffffff', cursor: 'none',
                opacity: (!inputValue.trim() || chatStep >= 4) ? 0.4 : 1,
                transition: 'opacity 0.2s',
                flexShrink: 0,
              }}
            >
              <Send size={12} color="#ffffff" fill="#ffffff" />
            </motion.button>
          </form>

          {/* Reset chat option for completed states */}
          {chatStep >= 4 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
              <button
                onClick={() => {
                  setChatStep(0)
                  setFormData({ name: '', email: '', subject: '', message: '' })
                  setMessages([
                    { id: '1', sender: 'phuong', text: "Hi there! I'm Nguyen Ngoc Phuong. Let's collaborate!" },
                    { id: '2', sender: 'phuong', text: "To start sending your message directly to my email, what is your name?" }
                  ])
                }}
                data-cursor="pointer"
                style={{
                  border: 'none', background: 'transparent', color: '#007aff',
                  fontSize: 11, fontWeight: 700, cursor: 'none',
                }}
              >
                Restart Conversation
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Style overrides for responsive stacking and iMessage look on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .contact-console-sidebar {
            display: none !important;
          }
          .imessage-back-btn {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .imessage-back-btn {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
