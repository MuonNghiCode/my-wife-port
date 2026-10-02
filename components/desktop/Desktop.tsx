'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBootStore } from '@/store/bootStore'
import { useDesktopStore } from '@/store/desktopStore'
import { FOLDERS, OWNER } from '@/data/portfolio'
import { FOLDER_LABELS, UI_STRINGS } from '@/data/translations'
import { playSynthSound, useSoundStore, TRACKS } from '@/store/soundStore'
import Wallpaper from './Wallpaper'
import TopMenuBar from '@/components/taskbar/TopMenuBar'
import Dock3D from './Dock3D'
import WindowManager from '@/components/window/WindowManager'
import MiniMusicPlayer from './MiniMusicPlayer'
import { User, Music, Globe, Mail, Wifi, Battery, Power, Moon, Sun, ArrowRight, CheckCircle2 } from 'lucide-react'

// Simple Mobile Clock
function MobileClock() {
  const [time, setTime] = useState('')
  const { language } = useDesktopStore()

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const locale = language === 'vi' ? 'vi-VN' : 'en-US'
      setTime(now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false }))
    }
    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [language])
  return <span>{time}</span>
}

// ── Desktop Widget 1: Profile & Quick Info Card ──
function DesktopProfileWidget() {
  const { openWindow, language } = useDesktopStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
      whileHover={{ scale: 1.02, y: -2 }}
      style={{
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        border: '1.5px solid var(--window-border)',
        borderRadius: 24,
        padding: '24px 28px',
        boxShadow: 'var(--window-shadow)',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        width: 300,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'var(--pink-bright)',
          border: '2px solid var(--pink-vivid)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 18, color: 'var(--pink-vivid)',
          boxShadow: '0 4px 12px rgba(236, 72, 153, 0.15)',
          flexShrink: 0,
        }}>
          NP
        </div>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.25 }}>
            {OWNER.nameVi}
          </h3>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', margin: '3px 0 0 0' }}>
            {OWNER.role}
          </p>
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 11, fontWeight: 700, color: 'var(--green-vivid)',
        background: 'var(--green-soft)', border: '1px solid var(--green-bright)',
        padding: '5px 12px', borderRadius: 10, width: 'fit-content',
      }}>
        <CheckCircle2 size={13} />
        <span>{language === 'vi' ? 'Sẵn sàng tiếp nhận cơ hội' : 'Available for Work'}</span>
      </div>

      <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
        {language === 'vi'
          ? 'Kế thừa tư duy chiến lược & sáng tạo nội dung chuẩn SEO hàng đầu.'
          : 'Combining brand strategy with high-impact SEO content optimization.'}
      </p>

      <button
        onClick={() => {
          playSynthSound('click')
          openWindow('about', 'Giới thiệu', 'about', { width: 700, height: 560 })
        }}
        data-cursor="pointer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '10px 16px', borderRadius: 12,
          background: 'var(--blue-soft)', border: '1.5px solid var(--blue-bright)',
          color: 'var(--blue-vivid)', fontSize: 12, fontWeight: 800,
          cursor: 'none', transition: 'all 0.2s', marginTop: 2,
        }}
      >
        <span>{language === 'vi' ? 'Xem hồ sơ năng lực' : 'Explore Profile'}</span>
        <ArrowRight size={13} />
      </button>
    </motion.div>
  )
}

// ── Desktop Widget 2: Clock & Date Widget ──
function DesktopWidgetClock() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const { language } = useDesktopStore()
  
  useEffect(() => {
    const update = () => {
      const now = new Date()
      const locale = language === 'vi' ? 'vi-VN' : 'en-US'
      setTime(now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false }))
      setDate(now.toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric' }))
    }
    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [language])

  return (
    <div style={{
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(20px)',
      border: '1.5px solid var(--window-border)',
      borderRadius: 24,
      padding: '22px 26px',
      boxShadow: 'var(--window-shadow)',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      width: 270,
    }}>
      <div style={{
        fontFamily: 'var(--font-ui)',
        fontSize: 10,
        fontWeight: 800,
        color: 'var(--text-muted)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        {UI_STRINGS[language].systemTime}
      </div>
      <div style={{
        fontSize: 38,
        fontWeight: 200,
        color: 'var(--text-primary)',
        letterSpacing: '-1px',
        lineHeight: 1.1,
      }}>
        {time}
      </div>
      <div style={{
        fontSize: 12,
        fontWeight: 700,
        color: 'var(--orange-vivid)',
        textTransform: 'capitalize',
      }}>
        {date}
      </div>
    </div>
  )
}

// ── Desktop Widget 3: Sticky Note Todo Widget ──
function DesktopStickyNote() {
  const { language } = useDesktopStore()
  const todos = language === 'vi' ? [
    { done: true, text: 'Ra mắt chiến dịch thương hiệu' },
    { done: true, text: 'Thu thập seeding influencer' },
    { done: false, text: 'Bản thảo sáng tạo nội dung' },
    { done: false, text: 'Họp cà phê cùng đội ngũ' },
    { done: false, text: 'Làm Mài (Quan trọng!!!)' },
  ] : [
    { done: true, text: 'Launch brand relaunch campaign' },
    { done: true, text: 'Influencer seeding collection' },
    { done: false, text: 'Creative storytelling draft' },
    { done: false, text: 'Coffee meeting with team' },
    { done: false, text: 'Make Mài (Important!!!)' },
  ]

  return (
    <motion.div
      whileHover={{ rotate: 0, scale: 1.02 }}
      style={{
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        border: '1.5px solid var(--window-border)',
        borderRadius: 24,
        padding: '22px 26px',
        boxShadow: 'var(--window-shadow)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: 270,
        transform: 'rotate(1.5deg)',
        transition: 'transform 0.3s ease',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-ui)',
        fontSize: 10,
        fontWeight: 800,
        color: 'var(--text-muted)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        {UI_STRINGS[language].workspaceTasks}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {todos.map((todo, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
            <div style={{
              width: 14, height: 14, borderRadius: 4,
              border: `1.5px solid ${todo.done ? 'var(--orange-vivid)' : 'var(--text-muted)'}`,
              background: todo.done ? 'var(--orange-soft)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--orange-vivid)', fontSize: 9, fontWeight: 900,
              flexShrink: 0,
            }}>
              {todo.done && '✓'}
            </div>
            <span style={{
              color: todo.done ? 'var(--text-muted)' : 'var(--text-primary)',
              textDecoration: todo.done ? 'line-through' : 'none',
              fontWeight: 600,
            }}>
              {todo.text}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Desktop() {
  const { phase, setPhase } = useBootStore()
  const { windows, openWindow, restoreWindow, language } = useDesktopStore()
  const { isPlaying, currentTrackIdx } = useSoundStore()
  const [isDark, setIsDark] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    if (nextDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    playSynthSound('click')
  }

  const dockApps = FOLDERS.filter(f => ['about', 'music', 'browser', 'contact'].includes(f.id))

  const handleDockClick = (id: string, label: string, size: { width: number; height: number }) => {
    openWindow(id, label, id, size)
  }

  const handleMobileSleep = () => {
    playSynthSound('sleep')
    setPhase('login')
  }

  const currentTrack = TRACKS[currentTrackIdx]
  const musicWin = windows['music']
  const isMusicPlayingBg = musicWin && musicWin.isOpen && musicWin.isMinimized

  const openWins = Object.values(windows)
  const isAnyAppActive = openWins.some(win => win.isOpen && !win.isMinimized)

  return (
    <AnimatePresence>
      {phase === 'desktop' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed', inset: 0,
            background: 'var(--bg-base)',
            overflow: 'hidden',
            userSelect: 'none',
          }}
        >
          {/* Background Wallpaper Layer (100% Sharp & Unblurred on Desktop) */}
          <Wallpaper />

          {/* ── Desktop Top macOS Menu Bar ── */}
          {!isMobile && <TopMenuBar />}

          {/* ── Mobile Top Status Bar ── */}
          {isMobile && (
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: 36, padding: '0 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              zIndex: 9000, userSelect: 'none',
              fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600,
              color: 'var(--text-primary)',
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid var(--window-border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MobileClock />
                <Wifi size={13} />
              </div>

              {isMusicPlayingBg && currentTrack && (
                <motion.div
                  onClick={() => restoreWindow('music')}
                  whileTap={{ scale: 0.92 }}
                  style={{
                    background: 'var(--orange-soft)',
                    border: '1px solid var(--orange-bright)',
                    borderRadius: 12,
                    height: 22,
                    padding: '0 10px',
                    display: 'flex', alignItems: 'center', gap: 6,
                    cursor: 'none',
                  }}
                >
                  <span style={{ fontSize: 9.5, fontWeight: 800, color: 'var(--orange-vivid)', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentTrack.title}
                  </span>
                </motion.div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button onClick={toggleTheme} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', padding: 2 }}>
                  {isDark ? <Sun size={13} /> : <Moon size={13} />}
                </button>
                <Battery size={13} />
                <button onClick={handleMobileSleep} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', padding: 2 }}>
                  <Power size={13} />
                </button>
              </div>
            </div>
          )}

          {/* Main Desktop Workspace Area (No desktop app grid on PC, dock handles app launches) */}
          <div style={{
            position: 'absolute',
            inset: isMobile ? '36px 0 80px 0' : '32px 0 0 0',
            overflow: 'hidden',
          }}>
            {/* Desktop Left Side Profile Widget */}
            {!isMobile && (
              <div style={{
                position: 'absolute',
                top: 40,
                left: 48,
                pointerEvents: 'auto',
                zIndex: 1,
              }}>
                <DesktopProfileWidget />
              </div>
            )}

            {/* Desktop Right Side Cozy Background Widgets */}
            {!isMobile && (
              <div style={{
                position: 'absolute',
                top: 40,
                right: 48,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                pointerEvents: 'auto',
                zIndex: 1,
              }}>
                <DesktopWidgetClock />
                <DesktopStickyNote />
              </div>
            )}
          </div>

          {/* All Open Windows Layer */}
          <WindowManager />

          {/* SoundCloud Floating Mini Player */}
          <MiniMusicPlayer />

          {/* ── Bottom Floating macOS Dock (Desktop) vs Mobile Dock (Mobile) ── */}
          {!isMobile ? (
            <Dock3D />
          ) : (
            !isAnyAppActive && (
              <div style={{
                position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
                width: 'calc(100% - 32px)', maxWidth: 360, height: 72,
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(20px)',
                border: '1.5px solid var(--window-border)',
                borderRadius: 24,
                boxShadow: 'var(--window-shadow)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-evenly',
                zIndex: 9000,
              }}>
                {dockApps.map((app) => {
                  const isAbout = app.id === 'about'
                  const isMusic = app.id === 'music'
                  const isBrowser = app.id === 'browser'
                  const appLabel = FOLDER_LABELS[language][app.id] || app.label

                  return (
                    <motion.button
                      key={app.id}
                      onClick={() => handleDockClick(app.id, appLabel, app.defaultSize)}
                      whileTap={{ scale: 0.88 }}
                      style={{
                        width: 48, height: 48, borderRadius: 14,
                        background: isAbout ? 'var(--blue-soft)' : isMusic ? 'var(--orange-soft)' : isBrowser ? 'var(--green-soft)' : 'var(--pink-soft)',
                        border: `1.5px solid ${isAbout ? 'var(--blue-bright)' : isMusic ? 'var(--orange-bright)' : isBrowser ? 'var(--green-bright)' : 'var(--pink-bright)'}`,
                        color: isAbout ? 'var(--blue-vivid)' : isMusic ? 'var(--orange-vivid)' : isBrowser ? 'var(--green-vivid)' : 'var(--pink-vivid)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'none',
                      }}
                    >
                      {isAbout && <User size={22} />}
                      {isMusic && <Music size={22} />}
                      {isBrowser && <Globe size={22} />}
                      {app.id === 'contact' && <Mail size={22} />}
                    </motion.button>
                  )
                })}
              </div>
            )
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
