'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBootStore } from '@/store/bootStore'
import { playSynthSound, useSoundStore } from '@/store/soundStore'
import { useDesktopStore } from '@/store/desktopStore'
import { OWNER } from '@/data/portfolio'
import { ArrowRight, Power, Wifi, Battery, Moon } from 'lucide-react'

export default function LoginScreen() {
  const { phase, setPhase } = useBootStore()
  
  // Real-time Clock states
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  // Clock updater
  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false }))
      setDate(now.toLocaleDateString('vi-VN', { weekday: 'long', month: 'long', day: 'numeric' }))
    }
    update()
    const t = setInterval(update, 1000)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      clearInterval(t)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const handleLogin = useCallback(() => {
    playSynthSound('login')
    setPhase('desktop')
    useSoundStore.getState().setIsPlaying(true)

    // Open SoundCloud app in minimized state silently
    const newZ = useDesktopStore.getState().topZIndex + 1
    useDesktopStore.setState((s) => ({
      windows: {
        ...s.windows,
        music: {
          id: 'music',
          title: 'SoundCloud',
          folderId: 'music',
          isOpen: true,
          isMinimized: true,
          isMaximized: true,
          zIndex: newZ,
          position: { x: 0, y: 0 },
          size: { width: 720, height: 500 },
        },
      },
      topZIndex: newZ,
    }))
  }, [setPhase])

  const handleShutdown = () => {
    playSynthSound('shutdown')
    useSoundStore.getState().setIsPlaying(false)
    setPhase('shutting-down')
  }

  const handleSleep = () => {
    playSynthSound('sleep')
    useSoundStore.getState().setIsPlaying(false)
    setPhase('idle')
  }

  // Listen to Enter key globally to login instantly
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (phase === 'login' && e.key === 'Enter') {
        handleLogin()
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [phase, handleLogin])

  if (phase !== 'login') return null

  return (
    <AnimatePresence>
      {phase === 'login' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'absolute', inset: 0,
            overflow: 'hidden',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          {/* Blurred Wallpaper Background */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url("/marketing_desktop_wallpaper.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }} />
          
          {/* Frosted Glass Overlay */}
          <div className="login-frosted-overlay" style={{
            position: 'absolute', inset: 0,
          }} />

          {/* ── Mobile Top Status Bar ── */}
          {isMobile && (
            <div className="login-status-bar-text" style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: 38, padding: '0 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              zIndex: 10, userSelect: 'none',
              fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600,
            }}>
              <span>PortfolioOS</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Wifi size={13} />
                <Battery size={13} />
                <span>100%</span>
              </div>
            </div>
          )}

          {/* Top Clock & Date */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8, type: 'spring' }}
            style={{
              position: 'absolute',
              top: isMobile ? '10%' : '12%',
              left: 0,
              right: 0,
              marginLeft: 'auto',
              marginRight: 'auto',
              width: 'fit-content',
              textAlign: 'center',
              userSelect: 'none',
              zIndex: 2,
            }}
          >
            <div className="login-clock-text" style={{
              fontSize: isMobile ? 64 : 76,
              fontWeight: 200,
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}>
              {time}
            </div>
            <div className="login-date-text" style={{
              fontSize: isMobile ? 13 : 15,
              fontWeight: 600,
              marginTop: 8,
              letterSpacing: '0.05em',
              textTransform: 'capitalize',
            }}>
              {date}
            </div>
          </motion.div>

          {/* Centered Profile & Input Container */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 20,
            zIndex: 3,
            paddingTop: isMobile ? '20%' : '8%',
          }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 220, damping: 22 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 20,
                width: '100%',
                maxWidth: 320,
              }}
            >
              {/* Profile Avatar */}
              <div style={{
                width: isMobile ? 84 : 96, height: isMobile ? 84 : 96,
                borderRadius: '50%',
                background: '#fbcfe8',
                border: '3px solid #ffffff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: isMobile ? 32 : 36,
                fontWeight: 800,
                color: 'var(--pink-vivid)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
                userSelect: 'none',
              }}>
                NP
              </div>

              {/* Display Name */}
              <div style={{ textAlign: 'center', userSelect: 'none' }}>
                <h2 className="login-username-text" style={{
                  fontSize: isMobile ? 22 : 24,
                  fontWeight: 700,
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}>
                  {OWNER.nameVi}
                </h2>
                <p className="login-date-text" style={{
                  fontSize: isMobile ? 12 : 13,
                  fontWeight: 600,
                  margin: '4px 0 0 0',
                }}>
                  {OWNER.role}
                </p>
              </div>

              {/* Action Button: Sign In Directly */}
              <motion.button
                onClick={handleLogin}
                whileHover={{ scale: 1.04, background: '#0f172a', color: '#ffffff', borderColor: '#0f172a' }}
                whileTap={{ scale: 0.96 }}
                data-cursor="pointer"
                style={{
                  height: 40,
                  borderRadius: 20,
                  background: 'rgba(255, 255, 255, 0.85)',
                  border: '1.5px solid #ffffff',
                  color: '#0f172a',
                  fontWeight: 700,
                  fontSize: 13,
                  padding: '0 36px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.2s ease',
                  marginTop: 6,
                }}
              >
                <span>Đăng nhập</span>
                <ArrowRight size={14} />
              </motion.button>

              {!isMobile && (
                <div style={{
                  fontSize: 10,
                  color: '#64748b',
                  textAlign: 'center',
                  userSelect: 'none',
                  fontWeight: 500,
                  marginTop: 2,
                }}>
                  Bấm nút Đăng nhập hoặc nhấn phím Enter để tiếp tục
                </div>
              )}
            </motion.div>
          </div>

          {/* ── Bottom controls ── */}
          {isMobile ? (
            /* Mobile iOS-style lock screen quick shortcuts */
            <>
              {/* Sleep Shortcut Button - Bottom Left */}
              <motion.button
                onClick={handleSleep}
                whileTap={{ scale: 0.9 }}
                style={{
                  position: 'absolute', bottom: 44, left: 40,
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#1e293b',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'none', zIndex: 10,
                }}
              >
                <Moon size={18} fill="#1e293b" />
              </motion.button>

              {/* Power Shortcut Button - Bottom Right */}
              <motion.button
                onClick={handleShutdown}
                whileTap={{ scale: 0.9 }}
                style={{
                  position: 'absolute', bottom: 44, right: 40,
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ef4444',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'none', zIndex: 10,
                }}
              >
                <Power size={18} strokeWidth={2.5} />
              </motion.button>

              {/* iOS Bottom Home Indicator Bar */}
              <div style={{
                position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
                width: 130, height: 5, borderRadius: 10,
                background: 'rgba(0, 0, 0, 0.15)',
                zIndex: 10,
              }} />
            </>
          ) : (
            /* Desktop Bottom Elements */
            <>
              {/* Bottom-Right Lockscreen Control Panel */}
              <div style={{
                position: 'absolute',
                bottom: 24,
                right: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                zIndex: 10,
                userSelect: 'none',
              }}>
                <div style={{ display: 'flex', gap: 10, color: '#475569' }}>
                  <Wifi size={16} />
                  <Battery size={16} />
                </div>
                <div style={{ width: 1, height: 16, background: '#cbd5e1' }} />
                <motion.button
                  onClick={handleShutdown}
                  whileHover={{ scale: 1.1, color: '#ef4444' }}
                  whileTap={{ scale: 0.9 }}
                  data-cursor="pointer"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 4,
                    cursor: 'none',
                    transition: 'color 0.2s',
                  }}
                  title="Shutdown System"
                >
                  <Power size={18} />
                </motion.button>
              </div>

              {/* Bottom-Left Version Info */}
              <div style={{
                position: 'absolute',
                bottom: 24,
                left: 24,
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: '#64748b',
                zIndex: 10,
                userSelect: 'none',
              }}>
                PortfolioOS v2.0
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
