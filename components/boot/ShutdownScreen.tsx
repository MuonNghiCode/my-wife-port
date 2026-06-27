'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useBootStore } from '@/store/bootStore'
import { Power } from 'lucide-react'

export default function ShutdownScreen() {
  const { phase, setPhase } = useBootStore()

  useEffect(() => {
    if (phase === 'shutting-down') {
      const timer = setTimeout(() => {
        // Return back to idle (USB unplugged/landing scene)
        setPhase('idle')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [phase, setPhase])

  if (phase !== 'shutting-down') return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#1e293b', /* Dark slate slate-800 */
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        zIndex: 99999, /* Above all other layers */
        color: '#f8fafc',
        userSelect: 'none',
      }}
    >
      <motion.div
        animate={{ scale: [1, 0.9, 1.1, 1], rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '2px solid rgba(239, 68, 68, 0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#ef4444',
        }}
      >
        <Power size={32} />
      </motion.div>
      
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 20,
        fontWeight: 600,
        letterSpacing: '0.02em',
      }}>
        Shutting down...
      </div>
      
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: '#94a3b8',
      }}>
        Saving session and ejecting USB drive safely
      </div>
    </motion.div>
  )
}
