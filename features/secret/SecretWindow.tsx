'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Eye } from 'lucide-react'

const FUN_FACTS = [
  "I once spent 6 hours analyzing a client campaign only to realize the tracking code was missing.",
  "I've spent more time picking a slide template than actually drafting the proposal content.",
  "My first campaign budget was $50, and I got a 6x ROAS — I was hooked.",
  "I have 37 browser tabs of copywriting templates and design references open at all times.",
  "My favorite design tool is Canva for speed, and Figma for pixel-perfect branding.",
]

export default function SecretWindow() {
  const [unlocked, setUnlocked] = useState(false)
  const [input, setInput] = useState('')
  const [factIdx, setFactIdx] = useState(0)

  const handleUnlock = () => {
    if (input.toLowerCase() === 'portfolio') {
      setUnlocked(true)
    }
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, fontFamily: 'var(--font-ui)', gap: 24, background: 'transparent' }}>
      {!unlocked ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ textAlign: 'center', maxWidth: 320 }}
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ marginBottom: 20 }}
          >
            <Lock size={48} color="#ec4899" style={{ margin: '0 auto' }} />
          </motion.div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
            You found the secret room
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 24, fontWeight: 500 }}>
            Nice detective work. Enter the password to proceed.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleUnlock()}
              placeholder="Password..."
              type="password"
              style={{
                flex: 1, padding: '10px 14px', borderRadius: 8,
                background: 'var(--bg-surface)', border: '1px solid var(--window-border)',
                color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: 13, outline: 'none',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--pink-vivid)')}
              onBlur={e => (e.target.style.borderColor = 'var(--window-border)')}
            />
            <motion.button
              data-cursor="pointer"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={handleUnlock}
              style={{
                padding: '10px 16px', borderRadius: 8,
                background: 'var(--pink-vivid)', /* Solid pink */
                border: 'none', color: '#ffffff', fontWeight: 600, fontSize: 13, cursor: 'none',
              }}
            >
              <Eye size={15} />
            </motion.button>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 12, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
            Hint: think about this website&apos;s purpose... (password: portfolio)
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ width: '100%', maxWidth: 420, textAlign: 'center' }}
        >
          <motion.div
            animate={{ y: [-8, 0, -8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: 48, marginBottom: 16 }}
          >
            <Eye size={48} color="#7c3aed" style={{ margin: '0 auto' }} />
          </motion.div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
            You&apos;re in the secret room
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 24, fontWeight: 500 }}>
            Here are some things I&apos;d never put on my actual resume:
          </p>

          {/* Fun fact card */}
          <motion.div
            key={factIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'var(--blue-soft)', /* Solid soft blue card */
              border: '1px solid var(--blue-bright)',
              borderRadius: 12, padding: '16px 20px', marginBottom: 16,
              fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic',
            }}
          >
            &quot;{FUN_FACTS[factIdx]}&quot;
          </motion.div>

          <motion.button
            data-cursor="pointer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setFactIdx(i => (i + 1) % FUN_FACTS.length)}
            style={{
              padding: '8px 20px', borderRadius: 99,
              background: 'var(--bg-surface)', border: '1px solid var(--window-border)',
              color: 'var(--text-secondary)', fontSize: 12, fontWeight: 600, cursor: 'none', fontFamily: 'var(--font-ui)',
            }}
          >
            Next fun fact
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
