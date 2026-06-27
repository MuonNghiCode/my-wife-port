'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { OWNER, ABOUT_TIMELINE, INTERESTS } from '@/data/portfolio'
import * as Icons from 'lucide-react'
import { MapPin, CheckCircle2, Sparkles } from 'lucide-react'

function TypingText({ texts }: { texts: string[] }) {
  const [displayed, setDisplayed] = useState('')
  const [textIdx, setTextIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplayed(current.slice(0, charIdx + 1))
          setCharIdx(c => c + 1)
        } else {
          setTimeout(() => setDeleting(true), 2000)
        }
      } else {
        if (charIdx > 0) {
          setDisplayed(current.slice(0, charIdx - 1))
          setCharIdx(c => c - 1)
        } else {
          setDeleting(false)
          setTextIdx(i => (i + 1) % texts.length)
        }
      }
    }, deleting ? 35 : 70)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, textIdx, texts])

  return (
    <span>
      <span style={{ color: 'var(--blue-vivid)', fontWeight: 600 }}>
        {displayed}
      </span>
      <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--pink-vivid)', fontWeight: 600 }}>|</span>
    </span>
  )
}

function getIcon(name: string, size = 13) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[name]
  return Icon ? <Icon size={size} /> : null
}

export default function AboutWindow() {
  return (
    <div style={{ padding: '28px 32px', fontFamily: 'var(--font-ui)', color: 'var(--text-primary)', height: '100%', overflowY: 'auto' }}>

      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 28,
          padding: 20, borderRadius: 16,
          background: 'var(--pink-soft)', /* Solid pastel pink */
          border: '1px solid var(--pink-bright)',
        }}
      >
        <div
          style={{
            width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
            background: 'var(--blue-soft)', /* Solid pastel blue */
            border: '1px solid var(--blue-bright)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 700,
            color: 'var(--blue-vivid)', fontSize: 22,
          }}
        >
          NP
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 5 }}>
            {OWNER.nameVi}
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', minHeight: 24, marginBottom: 12 }}>
            <TypingText texts={['Marketing Manager', 'Brand Storyteller', 'Campaign Strategist', 'Creative Director']} />
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)' }}>
              <MapPin size={12} color="#ec4899" /> Vietnam
            </span>
            {OWNER.available && (
              <span style={{
                display: 'flex', alignItems: 'center', gap: 5, fontSize: 12,
                color: '#047857', background: 'rgba(16, 185, 129, 0.1)',
                padding: '3px 10px', borderRadius: 99, border: '1px solid rgba(16, 185, 129, 0.3)',
                fontWeight: 600,
              }}>
                <CheckCircle2 size={11} /> Open to collaboration
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{ marginBottom: 28 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <Sparkles size={13} color="#ec4899" />
          <div style={{ fontSize: 11, fontWeight: 700, color: '#ec4899', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            My Story
          </div>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          {OWNER.bio}
        </p>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        style={{ marginBottom: 28 }}
      >
        <div style={{ fontSize: 11, fontWeight: 700, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
          My Journey
        </div>
        <div style={{ position: 'relative', paddingLeft: 22 }}>
          <div style={{
            position: 'absolute', left: 5, top: 8, bottom: 8,
            width: 1, background: 'var(--window-border)', /* Solid light gray timeline path */
          }} />
          {ABOUT_TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              style={{ display: 'flex', gap: 14, marginBottom: 18 }}
            >
              <div style={{
                width: 9, height: 9, borderRadius: '50%', flexShrink: 0, marginTop: 4,
                background: i % 2 === 0 ? '#0ea5e9' : '#ec4899',
                marginLeft: -24,
                zIndex: 1,
              }} />
              <div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 3 }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, color: i % 2 === 0 ? '#0ea5e9' : '#ec4899', letterSpacing: '0.05em' }}>{item.year}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Interests */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div style={{ fontSize: 11, fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
          Outside of Work
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {INTERESTS.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08, y: -2 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 99,
                background: i % 2 === 0 ? 'var(--pink-soft)' : 'var(--blue-soft)',
                border: i % 2 === 0 ? '1px solid var(--pink-bright)' : '1px solid var(--blue-bright)',
                fontSize: 12, color: 'var(--text-secondary)',
                cursor: 'none',
              }}
            >
              <span style={{ color: i % 2 === 0 ? '#ec4899' : '#0ea5e9' }}>{getIcon(item.icon, 12)}</span>
              {item.label}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
