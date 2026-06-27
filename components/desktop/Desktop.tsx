'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBootStore } from '@/store/bootStore'
import { useDesktopStore } from '@/store/desktopStore'
import { FOLDERS } from '@/data/portfolio'
import { playSynthSound, useSoundStore, TRACKS } from '@/store/soundStore'
import Wallpaper from './Wallpaper'
import IconGrid from './IconGrid'
import Taskbar from '@/components/taskbar/Taskbar'
import WindowManager from '@/components/window/WindowManager'
import MiniMusicPlayer from './MiniMusicPlayer'
import { User, Music, Globe, Mail, Wifi, Battery, Power, Moon, Sun } from 'lucide-react'

// Simple Clock for Mobile Status Bar
function MobileClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false }))
    }
    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [])
  return <span>{time}</span>
}

export default function Desktop() {
  const { phase, setPhase } = useBootStore()
  const { windows, openWindow, restoreWindow } = useDesktopStore()
  const { isPlaying, currentTrackIdx } = useSoundStore()
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }
    return false
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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

  // Dock items
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

  // Check if any app is active in foreground
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
          }}
        >
          {/* Wallpaper layer */}
          <Wallpaper />

          {/* ── Mobile Top Status Bar ── */}
          {isMobile && (
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: 36, padding: '0 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              zIndex: 9000, userSelect: 'none',
              fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: 'var(--text-primary)',
            }}>
              {/* Left: Time & Wifi */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MobileClock />
                <Wifi size={13} />
              </div>

              {/* Center: Sleek Music Pill (Dynamic Island style when minimized) */}
              {isMusicPlayingBg && currentTrack && (
                <motion.div
                  onClick={() => restoreWindow('music')}
                  whileTap={{ scale: 0.92 }}
                  style={{
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--window-border)',
                    borderRadius: 12,
                    height: 22,
                    padding: '0 8px',
                    display: 'flex', alignItems: 'center', gap: 6,
                    cursor: 'none',
                    boxShadow: '0 2px 8px rgba(236,72,153,0.1)',
                  }}
                >
                  {/* Mini Visualizer */}
                  <div style={{ display: 'flex', gap: 1.5, height: 8, alignItems: 'flex-end' }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: 1.8,
                          height: isPlaying ? '100%' : 2,
                          background: 'var(--pink-vivid)',
                          borderRadius: 0.5,
                          animation: isPlaying ? `miniBounce 0.6s ease-in-out infinite alternate` : 'none',
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-primary)', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentTrack.title}
                  </span>
                </motion.div>
              )}

              {/* Right: Theme Toggle, Battery & Power */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <motion.button
                  onClick={toggleTheme}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: 'none', border: 'none', padding: 2,
                    color: 'var(--text-primary)', display: 'flex', alignItems: 'center',
                    cursor: 'none',
                  }}
                  title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {isDark ? <Sun size={13} /> : <Moon size={13} />}
                </motion.button>
                <Battery size={13} />
                <motion.button
                  onClick={handleMobileSleep}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: 'none', border: 'none', padding: 2,
                    color: 'var(--text-primary)', display: 'flex', alignItems: 'center',
                    cursor: 'none',
                  }}
                >
                  <Power size={13} />
                </motion.button>
              </div>

              {/* Bounce keyframes style */}
              <style>{`
                @keyframes miniBounce {
                  0% { height: 2px; }
                  100% { height: 8px; }
                }
              `}</style>
            </div>
          )}

          {/* Desktop icon grid */}
          <div style={{
            position: 'absolute',
            inset: isMobile ? '36px 0 92px 0' : '0 0 52px 0',
            overflow: 'hidden',
          }}>
            <IconGrid />
          </div>

          {/* All open windows */}
          <WindowManager />

          {/* Floating SoundCloud Mini Player */}
          <MiniMusicPlayer />

          {/* ── Bottom Navigation/Taskbar ── */}
          {isMobile ? (
            /* Immersive Phone App Dock (hidden if an app window is active in the foreground) */
            !isAnyAppActive && (
              <div style={{
                position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
                width: 'calc(100% - 32px)', maxWidth: 360, height: 76,
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(255, 255, 255, 0.35)',
                borderRadius: 24,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-evenly',
                zIndex: 9000,
              }}>
                {dockApps.map((app) => {
                  const isAbout = app.id === 'about'
                  const isMusic = app.id === 'music'
                  const isBrowser = app.id === 'browser'
                  const isContact = app.id === 'contact'

                  return (
                    <motion.button
                      key={app.id}
                      onClick={() => handleDockClick(app.id, app.label, app.defaultSize)}
                      whileTap={{ scale: 0.88 }}
                      style={{
                        width: 50, height: 50, borderRadius: 13,
                        background: isAbout
                          ? 'var(--blue-soft)'
                          : isMusic
                          ? 'var(--orange-soft)'
                          : isBrowser
                          ? 'var(--green-soft)'
                          : 'var(--pink-soft)',
                        border: `1.5px solid ${
                          isAbout
                            ? 'var(--blue-bright)'
                            : isMusic
                            ? 'var(--orange-bright)'
                            : isBrowser
                            ? 'var(--green-bright)'
                            : 'var(--pink-bright)'
                        }`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: isAbout
                          ? 'var(--blue-vivid)'
                          : isMusic
                          ? 'var(--orange-vivid)'
                          : isBrowser
                          ? 'var(--green-vivid)'
                          : 'var(--pink-vivid)',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                        cursor: 'none',
                      }}
                    >
                      {isAbout && <User size={22} />}
                      {isMusic && <Music size={22} />}
                      {isBrowser && <Globe size={22} />}
                      {isContact && <Mail size={22} />}
                    </motion.button>
                  )
                })}
              </div>
            )
          ) : (
            /* Traditional Desktop Taskbar */
            <Taskbar />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
