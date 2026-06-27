'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBootStore } from '@/store/bootStore'

export default function BootLoader() {
  const { phase, bootProgress, setBootProgress, setPhase } = useBootStore()
  const [dots, setDots] = useState('')

  useEffect(() => {
    if (phase !== 'loading') return
    setBootProgress(0)

    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 8 + 2
      if (progress >= 100) {
        progress = 100
        setBootProgress(100)
        clearInterval(interval)
        setTimeout(() => setPhase('login'), 500)
      } else {
        setBootProgress(Math.round(progress))
      }
    }, 60)

    const dotsInterval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.')
    }, 400)

    return () => {
      clearInterval(interval)
      clearInterval(dotsInterval)
    }
  }, [phase, setBootProgress, setPhase])

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', inset: 0,
            background: '#d2e0f0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 40,
          }}
        >
          {/* OS Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 200 }}
            style={{ textAlign: 'center' }}
          >
            {/* Logo mark */}
            <div style={{
              width: 80, height: 80,
              borderRadius: '50%',
              background: '#fbcfe8',
              border: '2px solid #f9a8d4',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 4px 12px rgba(236,72,153,0.1)',
            }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 4L36 12V28L20 36L4 28V12L20 4Z" fill="#ffffff" />
                <path d="M20 10L30 15V25L20 30L10 25V15L20 10Z" fill="#0ea5e9" />
              </svg>
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 28, fontWeight: 700,
              color: '#111827',
              letterSpacing: '-0.5px',
            }}>
              PortfolioOS
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12, color: '#6b7280',
              marginTop: 4,
            }}>
              Version 2026 · by Nguyen Ngoc Phuong
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ width: 280 }}
          >
            <div style={{
              height: 4,
              background: '#cbd5e1',
              borderRadius: 999,
              overflow: 'hidden',
            }}>
              <motion.div
                style={{
                  height: '100%',
                  background: '#ec4899',
                  borderRadius: 999,
                  width: `${bootProgress}%`,
                }}
                transition={{ duration: 0.05 }}
              />
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginTop: 8,
              fontFamily: 'var(--font-mono)',
              fontSize: 11, color: '#6b7280',
              fontWeight: 500,
            }}>
              <span>Loading{dots}</span>
              <span>{bootProgress}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
