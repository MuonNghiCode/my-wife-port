'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { OWNER, SOCIAL_LINKS } from '@/data/portfolio'
import { Send, Mail, MapPin, Globe } from 'lucide-react'

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

type FormState = { name: string; email: string; subject: string; message: string }

export default function ContactWindow() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSent(true)
      setSending(false)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 1200)
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--bg-surface)',
    border: '1px solid var(--window-border)',
    borderRadius: 10,
    padding: '11px 14px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-ui)',
    fontSize: 13,
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '24px 28px', fontFamily: 'var(--font-ui)', background: 'transparent' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
          Let&apos;s connect
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          I&apos;d love to hear about your brand and how we can work together.
        </div>
      </motion.div>

      {/* Quick info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '8px 14px', borderRadius: 10,
          background: 'var(--pink-soft)', /* Solid pastel pink bg */
          border: '1px solid var(--pink-bright)',
          fontSize: 12, color: 'var(--pink-vivid)',
          fontWeight: 600,
        }}>
          <Mail size={13} />
          {OWNER.email}
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '8px 14px', borderRadius: 10,
          background: 'var(--blue-soft)', /* Solid pastel blue bg */
          border: '1px solid var(--blue-bright)',
          fontSize: 12, color: 'var(--blue-vivid)',
          fontWeight: 600,
        }}>
          <MapPin size={13} />
          Vietnam
        </div>
        {OWNER.available && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '8px 14px', borderRadius: 10,
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            fontSize: 12, color: '#10b981',
            fontWeight: 600,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
            Open to collaboration
          </div>
        )}
      </motion.div>

      {/* Form */}
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              textAlign: 'center', padding: '48px 24px',
              background: 'var(--pink-soft)', /* Solid soft pink card */
              border: '1px solid var(--pink-bright)',
              borderRadius: 16,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: 16 }}
            >
              <Send size={40} color="var(--pink-vivid)" style={{ margin: '0 auto' }} />
            </motion.div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
              Message sent!
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              I&apos;ll get back to you within 24 hours.
            </div>
            <motion.button
              data-cursor="pointer"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => setSent(false)}
              style={{
                marginTop: 20, padding: '8px 20px', borderRadius: 99,
                background: 'var(--bg-surface)', border: '1px solid var(--window-border)',
                color: 'var(--text-secondary)', fontSize: 13, cursor: 'none', fontFamily: 'var(--font-ui)',
                fontWeight: 600,
              }}
            >
              Send another
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {['name', 'email'].map(field => (
                <div key={field}>
                  <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {field === 'name' ? 'Your Name' : 'Email Address'}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    value={form[field as keyof FormState]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    required
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--pink-vivid)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--window-border)')}
                    placeholder={field === 'name' ? 'Nguyễn Văn A' : 'hello@brand.vn'}
                  />
                </div>
              ))}
            </div>

            <div>
              <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Subject
              </label>
              <input
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                required
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--pink-vivid)')}
                onBlur={e => (e.target.style.borderColor = 'var(--window-border)')}
                placeholder="Brand campaign collaboration..."
              />
            </div>

            <div>
              <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Message
              </label>
              <textarea
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => (e.target.style.borderColor = 'var(--pink-vivid)')}
                onBlur={e => (e.target.style.borderColor = 'var(--window-border)')}
                placeholder="Tell me about your brand and what you're looking for..."
              />
            </div>

            <motion.button
              type="submit"
              data-cursor="pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={sending}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '13px 24px', borderRadius: 12,
                background: '#ec4899', /* Solid pink button */
                border: 'none', color: '#ffffff',
                fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 14,
                cursor: 'none', opacity: sending ? 0.7 : 1,
                boxShadow: '0 4px 12px rgba(236,72,153,0.15)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#db2777')}
              onMouseLeave={e => (e.currentTarget.style.background = '#ec4899')}
            >
              <Send size={15} />
              {sending ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Social */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--window-border)' }}
      >
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
          Find me on
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {SOCIAL_LINKS.map(link => {
            const Icon = ICON_MAP[link.icon] ?? Globe
            return (
              <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" data-cursor="pointer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 99, fontSize: 12,
                  background: 'var(--bg-elevated)', border: '1px solid var(--window-border)',
                  color: 'var(--text-secondary)', textDecoration: 'none',
                  transition: 'all 0.2s',
                  fontWeight: 600,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = 'var(--pink-vivid)'
                  el.style.borderColor = 'var(--pink-bright)'
                  el.style.background = 'var(--pink-soft)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = 'var(--text-secondary)'
                  el.style.borderColor = 'var(--window-border)'
                  el.style.background = 'var(--bg-elevated)'
                }}
              >
                <Icon size={13} /> {link.platform}
              </a>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
