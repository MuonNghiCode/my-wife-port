'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBootStore } from '@/store/bootStore'
import { playSynthSound } from '@/store/soundStore'
import { OWNER } from '@/data/portfolio'

const LOADING_MESSAGES = [
  'Loading your story...',
  'Brewing something beautiful...',
  'Arranging the details...',
  'Almost ready...',
]

export default function BIOSScreen() {
  const { phase, setPhase } = useBootStore()
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    if (phase !== 'bios') return
    playSynthSound('boot')
    setTimeout(() => {
      setMsgIdx(0)
    }, 0)

    const interval = setInterval(() => {
      setMsgIdx(i => {
        if (i < LOADING_MESSAGES.length - 1) return i + 1
        clearInterval(interval)
        return i
      })
    }, 500)

    const t = setTimeout(() => setPhase('loading'), 2400)
    return () => { clearTimeout(t); clearInterval(interval) }
  }, [phase, setPhase])

  return (
    <AnimatePresence>
      {phase === 'bios' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', inset: 0,
            background: '#d2e0f0',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 28,
          }}
        >
          {/* Logo Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7, type: 'spring', stiffness: 250, damping: 20 }}
            style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
          >
            {/* Avatar circle */}
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: '#bae6fd',
              border: '2px solid #7dd3fc',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
              fontFamily: 'var(--font-display)', fontWeight: 700,
              color: '#0369a1', fontSize: 22,
              boxShadow: '0 4px 12px rgba(14,165,233,0.12)',
            }}>
              NP
            </div>

            {/* Name */}
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 30, fontWeight: 700,
              color: '#111827',
              letterSpacing: '-0.5px', marginBottom: 6,
            }}>
              {OWNER.nameVi}
            </div>

            {/* Role */}
            <div style={{
              fontFamily: 'var(--font-ui)', fontSize: 13,
              color: '#ec4899',
              letterSpacing: '0.12em',
              textTransform: 'uppercase', fontWeight: 600,
            }}>
              {OWNER.role}
            </div>
          </motion.div>

          {/* Loading message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ position: 'relative', zIndex: 1, textAlign: 'center', height: 24 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={msgIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: 'var(--font-ui)', fontSize: 13,
                  color: '#6b7280',
                  letterSpacing: '0.05em',
                  fontWeight: 500,
                }}
              >
                {LOADING_MESSAGES[msgIdx]}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Dots loader */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ display: 'flex', gap: 8, position: 'relative', zIndex: 1 }}
          >
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: i === 0 ? '#0ea5e9' : i === 1 ? '#ec4899' : '#7c3aed',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
