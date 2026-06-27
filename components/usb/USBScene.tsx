'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBootStore } from '@/store/bootStore'
import { playSynthSound } from '@/store/soundStore'
import { OWNER } from '@/data/portfolio'

/* ─── Keyboard key counts per row (module-level constant) ─── */
const KEYBOARD_ROWS = [14, 14, 13, 12, 8]

/* ─── Realistic Laptop on a Desk ─── */
function LaptopIllustration({ usbInserted }: { usbInserted: boolean }) {
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* ── Screen lid ── */}
      <div style={{
        width: 320, height: 210,
        background: '#334155',
        borderRadius: '12px 12px 0 0',
        border: '2px solid #1e293b',
        borderBottom: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Inner screen panel */}
        <div style={{
          position: 'absolute', inset: 8,
          background: usbInserted ? '#ffffff' : '#0f172a',
          border: `1px solid ${usbInserted ? '#cbd5e1' : '#1e293b'}`,
          borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 8,
          overflow: 'hidden',
          transition: 'background 0.6s ease',
        }}>
          <AnimatePresence mode="wait">
            {!usbInserted ? (
              /* ── Idle: dark screen with power icon ── */
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: 'center' }}
              >
                {/* Power circle */}
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: '2px solid #334155',
                  margin: '0 auto 12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: '50%',
                    border: '2px solid #475569',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)',
                      width: 2, height: 6, background: '#475569', borderRadius: 1,
                    }} />
                  </div>
                </div>
                <div style={{
                  fontSize: 9, color: '#475569',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.12em', fontWeight: 600,
                }}>
                  NO BOOT DEVICE
                </div>
              </motion.div>
            ) : (
              /* ── USB inserted: booting screen ── */
              <motion.div
                key="booting"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center' }}
              >
                {/* NP avatar */}
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: '#bae6fd',
                  border: '2px solid #7dd3fc',
                  margin: '0 auto 10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  color: '#0369a1', fontSize: 14,
                }}>
                  NP
                </div>
                <div style={{
                  fontSize: 10, color: '#ec4899',
                  fontFamily: 'var(--font-ui)',
                  letterSpacing: '0.08em', fontWeight: 600,
                }}>
                  {OWNER.usbLabel}
                </div>
                {/* Mini loading bar on screen */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 70 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                  style={{
                    height: 3, background: '#ec4899',
                    borderRadius: 99, margin: '8px auto 0',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Camera dot */}
        <div style={{
          position: 'absolute', top: 3, left: '50%', transform: 'translateX(-50%)',
          width: 4, height: 4, borderRadius: '50%',
          background: '#1e293b',
        }} />
      </div>

      {/* ── Hinge ── */}
      <div style={{
        width: 340,
        height: 7,
        background: '#475569',
        borderRadius: '0 0 3px 3px',
        borderTop: '1px solid #64748b',
        position: 'relative', zIndex: 2,
      }} />

      {/* ── Keyboard base ── */}
      <div style={{
        width: 360, height: 110,
        background: '#334155',
        borderRadius: '2px 2px 12px 12px',
        border: '1px solid #1e293b',
        borderTop: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Keyboard keys */}
        {KEYBOARD_ROWS.map((keyCount, row) => (
          <div key={row} style={{
            position: 'absolute',
            top: 10 + row * 16,
            left: 24 + row * 5,
            right: 24 + row * 5,
            height: 10,
            display: 'flex', gap: 3, justifyContent: 'center',
          }}>
            {Array.from({ length: keyCount }).map((_, i) => (
              <div key={i} style={{
                flex: 1, maxWidth: 16,
                height: '100%', borderRadius: 2,
                background: '#475569',
                border: '1px solid #374151',
              }} />
            ))}
          </div>
        ))}

        {/* Trackpad */}
        <div style={{
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          width: 80, height: 44, borderRadius: 6,
          background: '#3f4f63',
          border: '1px solid #1e293b',
        }} />

        {/* USB Port on right side */}
        <div style={{
          position: 'absolute', right: -1, top: '35%', transform: 'translateY(-50%)',
        }}>
          <div style={{
            width: 20, height: 12,
            background: '#9ca3af',
            borderRadius: '3px 0 0 3px',
            border: '1px solid #6b7280',
            borderRight: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 14, height: 7, background: '#4b5563', borderRadius: 1 }} />
          </div>
          {/* LED indicator */}
          <motion.div
            animate={usbInserted ? { opacity: [0.6, 1, 0.6] } : {}}
            transition={usbInserted ? { duration: 1.2, repeat: Infinity } : {}}
            style={{
              position: 'absolute', top: -5, left: 4,
              width: 5, height: 5, borderRadius: '50%',
              background: usbInserted ? '#10b981' : '#6b7280',
              transition: 'background 0.4s',
            }}
          />
        </div>
      </div>

      {/* ── Desk shadow ── */}
      <div style={{
        width: 320, height: 16, marginTop: 2,
        background: '#c4d0de',
        borderRadius: '50%',
        filter: 'blur(6px)',
        opacity: 0.7,
      }} />
    </div>
  )
}

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
        animate={isIdle ? { y: [0, -8, 0], rotate: [-2, 0, -2] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'center center' }}
      >
        {/* USB body */}
        <div style={{
          width: 150, height: 54,
          borderRadius: 10,
          background: '#bae6fd',
          border: '2px solid #7dd3fc',
          display: 'flex', alignItems: 'center',
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
  const [usbInserted, setUsbInserted] = useState(false)
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
    setTimeout(() => {
      setUsbInserted(true)
    }, 900)
    setTimeout(() => setPhase('powering-on'), 1400)
    setTimeout(() => setPhase('bios'), 3000)
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
          {/* ── Scene: desk surface hint (Desktop only) ── */}
          {!isMobile && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: 80,
              background: '#c4d0de',
              borderTop: '1px solid #b8c5d4',
            }} />
          )}

          {/* ── Laptop + USB layout ── */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? 0 : 0,
            position: 'relative',
            zIndex: 1,
          }}>
            {/* Laptop (Desktop only) */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.7, type: 'spring', stiffness: 180 }}
              >
                <LaptopIllustration usbInserted={usbInserted} />
              </motion.div>
            )}

            {/* USB — animates to port on desktop, scales up and fades out on mobile */}
            <motion.div
              initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, x: 60 }}
              animate={
                phase === 'inserting'
                  ? (isMobile
                      ? { y: -20, opacity: 0, scale: 0.85 }
                      : { x: -16, y: -28, opacity: 1, scale: 0.55, rotate: 0 })
                  : { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }
              }
              transition={
                phase === 'inserting'
                  ? { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
                  : { delay: 0.5, duration: 0.6, type: 'spring' }
              }
              style={isMobile ? {} : { marginLeft: 24, marginTop: 50 }}
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
                  {isMobile ? 'Tap USB to Boot' : 'Click USB to Insert'}
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
                  {isMobile ? 'Starting up...' : 'USB connected — starting up...'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
