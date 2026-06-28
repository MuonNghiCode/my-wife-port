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
      <span style={{ color: 'var(--blue-vivid)', fontWeight: 700 }}>
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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div style={{
      padding: isMobile ? '20px' : '28px 32px',
      fontFamily: 'var(--font-ui)',
      color: 'var(--text-primary)',
      height: '100%',
      overflowY: 'auto',
      background: 'transparent',
    }}>
      {/* Split Layout Container */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 24 : 36,
        alignItems: 'flex-start',
      }}>
        
        {/* Left Side: Portrait & Main Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: isMobile ? '100%' : 240,
            background: 'var(--bg-glass)',
            border: '1.5px solid var(--window-border)',
            borderRadius: 24,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.02)',
            backdropFilter: 'blur(20px)',
            flexShrink: 0,
          }}
        >
          {/* Portrait Photo Container */}
          <div style={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #ffffff',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            background: 'var(--bg-surface)',
            flexShrink: 0,
            position: 'relative',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/np.jpg"
              alt="Nguyen Ngoc Phuong"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 90%',
              }}
            />
          </div>

          {/* Name & Title */}
          <div style={{ textAlign: 'center', width: '100%', overflow: 'hidden' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 19,
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: '0 0 6px 0',
              letterSpacing: '-0.3px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}>
              {OWNER.nameVi}
            </h2>
            <div style={{
              fontSize: 14,
              fontWeight: 750,
              color: 'var(--orange-vivid)',
              marginBottom: 4,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Marketing Executive
            </div>
            <div style={{ fontSize: 13, minHeight: 20, marginBottom: 12 }}>
              <TypingText texts={['SEO Content Writer', 'Strategic Planner', 'Creative Problem Solver']} />
            </div>
          </div>

          <div style={{
            width: '100%',
            borderTop: '1px solid var(--window-border)',
            paddingTop: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}>
            {/* Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--text-secondary)' }}>
              <MapPin size={14} color="var(--pink-vivid)" />
              <span>{OWNER.location}</span>
            </div>

            {/* Availability */}
            {OWNER.available && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 12,
                color: '#059669',
                background: 'rgba(5, 150, 105, 0.08)',
                border: '1px solid rgba(5, 150, 105, 0.2)',
                padding: '6px 12px',
                borderRadius: 99,
                fontWeight: 700,
                width: 'fit-content',
              }}>
                <CheckCircle2 size={13} color="#059669" />
                <span>Open to collaboration</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Side: Detailed Story, Journey & Interests */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28, width: '100%' }}>
          
          {/* Bio Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{
              background: 'var(--bg-glass)',
              border: '1.5px solid var(--window-border)',
              borderRadius: 24,
              padding: 24,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.02)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <Sparkles size={14} color="var(--pink-vivid)" />
              <h3 style={{ fontSize: 11, fontWeight: 800, color: 'var(--pink-vivid)', textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>
                My Story
              </h3>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>
              As someone who is constantly striving for improvement, I consider myself a professional who seamlessly blends strategy with creativity. I am seeking a challenging role where I can apply my skills in <strong style={{ fontWeight: 800, color: 'var(--text-primary)' }}>strategic planning</strong> and <strong style={{ fontWeight: 800, color: 'var(--text-primary)' }}>creative problem-solving</strong>, while gaining valuable experience in customer and market insights as well as strategic development.
            </p>
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{
              background: 'var(--bg-glass)',
              border: '1.5px solid var(--window-border)',
              borderRadius: 24,
              padding: 24,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.02)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <h3 style={{ fontSize: 10, fontWeight: 800, color: 'var(--blue-vivid)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20 }}>
              My Journey
            </h3>
            
            <div style={{ position: 'relative', paddingLeft: 22 }}>
              {/* Vertical line */}
              <div style={{
                position: 'absolute', left: 5, top: 8, bottom: 8,
                width: 1.5, background: 'var(--window-border)',
              }} />
              
              {ABOUT_TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  style={{ display: 'flex', gap: 14, marginBottom: 20 }}
                >
                  {/* Bullet */}
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%', flexShrink: 0, marginTop: 4,
                    background: i % 2 === 0 ? 'var(--blue-vivid)' : 'var(--pink-vivid)',
                    marginLeft: -27,
                    zIndex: 1,
                    boxShadow: `0 0 0 3px var(--bg-surface)`,
                  }} />
                  
                  <div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: i % 2 === 0 ? 'var(--blue-vivid)' : 'var(--pink-vivid)', letterSpacing: '0.05em' }}>
                        {item.year}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                        {item.label}
                      </span>
                    </div>
                    <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interests Section */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{
              background: 'var(--bg-glass)',
              border: '1.5px solid var(--window-border)',
              borderRadius: 24,
              padding: 24,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.02)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <h3 style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
              Outside of Work
            </h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {INTERESTS.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 16px', borderRadius: 99,
                    background: i % 2 === 0 ? 'var(--pink-soft)' : 'var(--blue-soft)',
                    border: i % 2 === 0 ? '1px solid var(--pink-bright)' : '1px solid var(--blue-bright)',
                    fontSize: 13, color: 'var(--text-secondary)',
                    cursor: 'none',
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: i % 2 === 0 ? 'var(--pink-vivid)' : 'var(--blue-vivid)', display: 'flex', alignItems: 'center' }}>
                    {getIcon(item.icon, 13)}
                  </span>
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
