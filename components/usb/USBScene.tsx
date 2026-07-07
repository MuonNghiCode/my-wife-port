'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBootStore } from '@/store/bootStore'
import { useDesktopStore } from '@/store/desktopStore'
import { playSynthSound } from '@/store/soundStore'
import { OWNER } from '@/data/portfolio'
import { UI_STRINGS } from '@/data/translations'

/* ─── USB Drive ─── */
function USBDrive({ onClick, phase }: { onClick: () => void; phase: string }) {
  const isIdle = phase === 'idle'

  return (
    <motion.div
      data-cursor="pointer"
      onClick={onClick}
      style={{ cursor: 'none', position: 'relative' }}
    >
      {/* Subtle shadow underneath USB */}
      <div style={{
        position: 'absolute', bottom: -8, left: 10, right: 10, height: 10,
        background: '#b0bcc9',
        borderRadius: '50%',
        filter: 'blur(6px)',
        opacity: isIdle ? 0.5 : 0,
        transition: 'opacity 0.4s',
      }} />

      <motion.div
        animate={isIdle ? { y: [0, -8, 0], rotate: [-1.5, 0, -1.5] } : {}}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'center center' }}
      >
        {/* USB body */}
        <div style={{
          width: 150,
          height: 54,
          borderRadius: 10,
          background: '#bae6fd',
          border: '2px solid #7dd3fc',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        }}>
          {/* Metal connector */}
          <div style={{
            width: 38, height: 26,
            background: '#d1d5db',
            border: '1px solid #9ca3af',
            borderRadius: '3px 0 0 3px',
            marginLeft: -5,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
          }}>
            <div style={{ width: 5, height: 16, background: '#9ca3af', borderRadius: 2 }} />
            <div style={{ width: 5, height: 16, background: '#9ca3af', borderRadius: 2 }} />
          </div>

          {/* Label */}
          <div style={{ flex: 1, padding: '0 12px' }}>
            <div style={{
              fontSize: 10, fontWeight: 700,
              color: '#0369a1',
              fontFamily: 'var(--font-ui)',
              letterSpacing: '0.03em',
            }}>
              {OWNER.usbLabel}
            </div>
            <div style={{
              fontSize: 8, color: '#0284c7',
              fontFamily: 'var(--font-ui)',
              marginTop: 2, fontWeight: 500,
            }}>
              Portfolio 2026
            </div>
          </div>

          {/* LED */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#10b981',
              marginRight: 12,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main Scene ─── */
export default function USBScene() {
  const { phase, setPhase } = useBootStore()
  const { language } = useDesktopStore()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleUSBClick = () => {
    if (phase !== 'idle') return
    playSynthSound('usb')
    setPhase('inserting')
    
    // Smooth transition timeouts to BIOS screen
    setTimeout(() => setPhase('powering-on'), 900)
    setTimeout(() => setPhase('bios'), 2500)
  }

  return (
    <AnimatePresence>
      {(phase === 'idle' || phase === 'inserting') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: '#d2e0f0',
            gap: 0,
          }}
        >
          {/* ── Laptop + USB layout (Laptop removed as requested, centering the USB) ── */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}>
            {/* USB drive with clean slide-up & fade-out animation on click */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                phase === 'inserting'
                  ? { y: -24, opacity: 0, scale: 0.85 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              transition={
                phase === 'inserting'
                  ? { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
                  : { delay: 0.3, duration: 0.6, type: 'spring' }
              }
            >
              <USBDrive onClick={handleUSBClick} phase={phase} />
            </motion.div>
          </div>

          {/* ── Hint text ── */}
          <div style={{ position: 'relative', zIndex: 1, marginTop: 48, height: 24 }}>
            <AnimatePresence mode="wait">
              {phase === 'idle' && (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: [0.4, 0.85, 0.4] }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatType: 'loop' }}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 13, fontWeight: 600,
                    color: '#ec4899',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  {isMobile ? UI_STRINGS[language].usbHintTap : UI_STRINGS[language].usbHintClick}
                </motion.div>
              )}

              {phase === 'inserting' && (
                <motion.div
                  key="connected"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    fontFamily: 'var(--font-ui)', fontSize: 12,
                    color: '#059669', letterSpacing: '0.08em',
                    fontWeight: 600,
                  }}
                >
                  {UI_STRINGS[language].starting}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
