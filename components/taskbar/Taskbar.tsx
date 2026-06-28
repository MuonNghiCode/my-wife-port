'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDesktopStore } from '@/store/desktopStore'
import { useSoundStore, playSynthSound, TRACKS } from '@/store/soundStore'
import { useBootStore } from '@/store/bootStore'
import { FOLDERS, OWNER } from '@/data/portfolio'
import { Volume2, VolumeX, Power, Moon, Sun, Play, Pause, SkipForward } from 'lucide-react'
import * as Icons from 'lucide-react'

function Clock() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }))
      setDate(now.toLocaleDateString('vi-VN', { weekday: 'short', month: 'short', day: 'numeric' }))
    }
    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ textAlign: 'right' }}>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{time}</div>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--text-secondary)', marginTop: 1 }}>{date}</div>
    </div>
  )
}

function getIcon(name: string) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[name]
  return Icon ? <Icon size={14} /> : null
}

export default function Taskbar() {
  const { windows, restoreWindow, focusWindow, focusedWindowId, minimizeWindow } = useDesktopStore()
  const { isMuted, toggleMute, isPlaying, currentTrackIdx, setIsPlaying, setCurrentTrackIdx } = useSoundStore()
  const { setPhase } = useBootStore()
  
  const [isStartOpen, setIsStartOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const startMenuRef = useRef<HTMLDivElement>(null)

  const openWins = Object.values(windows)
  const isAnyAppActive = openWins.some(win => win.isOpen && !win.isMinimized)
  const musicWin = windows['music']
  const isMusicRunningBg = musicWin && musicWin.isOpen && musicWin.isMinimized
  const currentTrack = TRACKS[currentTrackIdx]

  // Initialize theme on mount
  useEffect(() => {
    const isDarkTheme = localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    if (isDarkTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setTimeout(() => {
      setIsDark(isDarkTheme)
    }, 0)
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

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isStartOpen && startMenuRef.current && !startMenuRef.current.contains(e.target as Node)) {
        setIsStartOpen(false)
      }
    }
    window.addEventListener('click', handleOutsideClick)
    return () => window.removeEventListener('click', handleOutsideClick)
  }, [isStartOpen])

  const handleShutdown = () => {
    playSynthSound('shutdown')
    setIsStartOpen(false)
    useSoundStore.getState().setIsPlaying(false)
    setPhase('shutting-down')
  }

  const handleSleep = () => {
    playSynthSound('sleep')
    setIsStartOpen(false)
    useSoundStore.getState().setIsPlaying(false)
    setPhase('login')
  }

  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        height: 52,
        background: 'var(--window-bg)',
        borderTop: '1px solid var(--window-border)',
        display: 'flex', alignItems: 'center',
        padding: '0 16px',
        gap: 8,
        zIndex: 9000,
        boxShadow: 'var(--window-shadow)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* OS Logo / Start Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-cursor="pointer"
        onClick={(e) => {
          e.stopPropagation()
          setIsStartOpen(!isStartOpen)
        }}
        style={{
          width: 32, height: 32, borderRadius: '50%',
          background: '#fbcfe8', /* Solid pastel pink */
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          cursor: 'none',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2L14 5V11L8 14L2 11V5L8 2Z" fill="#ec4899" />
          <path d="M8 5L11 6.5V9.5L8 11L5 9.5V6.5L8 5Z" fill="#ffffff" />
        </svg>
      </motion.div>

      {/* Divider */}
      <div style={{ width: 1, height: 24, background: 'var(--window-border)', flexShrink: 0 }} />

      {/* Open windows */}
      <div style={{ display: 'flex', gap: 4, flex: 1, overflow: 'hidden' }}>
        <AnimatePresence>
          {openWins.map((win) => {
            const folder = FOLDERS.find(f => f.id === win.folderId)
            const isFocused = win.id === focusedWindowId && !win.isMinimized
            return (
              <motion.button
                key={win.id}
                data-cursor="pointer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                onPointerDown={(e) => {
                  e.stopPropagation()
                  if (win.isMinimized) {
                    restoreWindow(win.id)
                  } else if (win.id === focusedWindowId) {
                    minimizeWindow(win.id)
                  } else {
                    focusWindow(win.id)
                  }
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '0 10px', height: 36, borderRadius: 8,
                  background: isFocused
                    ? 'var(--blue-soft)'
                    : 'transparent',
                  border: `1.5px solid ${isFocused ? 'var(--blue-vivid)' : 'var(--window-border)'}`,
                  color: isFocused ? 'var(--blue-vivid)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600,
                  cursor: 'none', flexShrink: 0,
                  maxWidth: 140,
                  transition: 'all 0.15s',
                  position: 'relative',
                }}
              >
                {folder && getIcon(folder.icon)}
                <span style={{
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {win.title}
                </span>
                {/* Indicator dot */}
                {isFocused && (
                  <motion.div
                    layoutId="taskbar-indicator"
                    style={{
                      position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)',
                      width: 4, height: 4, borderRadius: '50%',
                      background: 'var(--blue-vivid)',
                    }}
                  />
                )}
                {win.isMinimized && (
                  <div style={{
                    width: 4, height: 4, borderRadius: '50%',
                    background: '#f59e0b',
                    flexShrink: 0,
                  }} />
                )}
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Taskbar Music Control Pill (Desktop only, when minimized and app active) */}
      <AnimatePresence>
        {isMusicRunningBg && currentTrack && isAnyAppActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 10 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--bg-glass)',
              border: '1.5px solid var(--window-border)',
              borderRadius: 10,
              height: 36,
              padding: '0 10px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
              pointerEvents: 'auto',
            }}
          >
            {/* Small Bouncing Visualizer */}
            <div style={{ display: 'flex', gap: 1.5, height: 8, alignItems: 'flex-end' }}>
              {[0, 1, 2].map((n) => (
                <div
                  key={n}
                  style={{
                    width: 1.5,
                    height: isPlaying ? '100%' : 2,
                    background: 'var(--orange-vivid)',
                    borderRadius: 0.5,
                    animation: isPlaying ? 'miniBounce 0.5s ease-in-out infinite alternate' : 'none',
                    animationDelay: `${n * 0.15}s`,
                  }}
                />
              ))}
            </div>

            {/* Title */}
            <span
              onClick={() => restoreWindow('music')}
              data-cursor="pointer"
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--text-primary)',
                maxWidth: 120,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                cursor: 'none',
              }}
            >
              {currentTrack.title}
            </span>

            {/* Divider */}
            <div style={{ width: 1, height: 16, background: 'var(--window-border)' }} />

            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                background: 'none', border: 'none', color: 'var(--orange-vivid)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 4, cursor: 'none'
              }}
            >
              {isPlaying ? <Pause size={12} fill="var(--orange-vivid)" /> : <Play size={12} fill="var(--orange-vivid)" />}
            </button>

            {/* Next */}
            <button
              onClick={() => {
                const nextIdx = (currentTrackIdx + 1) % TRACKS.length
                setCurrentTrackIdx(nextIdx)
                setIsPlaying(true)
              }}
              style={{
                background: 'none', border: 'none', color: 'var(--text-secondary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 4, cursor: 'none'
              }}
            >
              <SkipForward size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bounce Keyframes Style */}
      <style>{`
        @keyframes miniBounce {
          0% { height: 2px; }
          100% { height: 8px; }
        }
      `}</style>

      {/* System tray */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
        {/* Volume Mute Button */}
        <motion.button
          data-cursor="pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          style={{
            background: 'none', border: 'none', cursor: 'none',
            color: isMuted ? 'var(--text-muted)' : 'var(--blue-vivid)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 4,
          }}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </motion.button>

        {/* Dark / Light Theme Toggle Button */}
        <motion.button
          data-cursor="pointer"
          whileHover={{ scale: 1.1, color: 'var(--blue-vivid)' }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          style={{
            background: 'none', border: 'none', cursor: 'none',
            color: 'var(--text-secondary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 4,
          }}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </motion.button>

        <Clock />
      </div>

      {/* Start Menu Popover */}
      <AnimatePresence>
        {isStartOpen && (
          <motion.div
            ref={startMenuRef}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            style={{
              position: 'absolute',
              bottom: 60,
              left: 16,
              width: 280,
              background: 'var(--window-bg)',
              border: '1px solid var(--window-border)',
              borderRadius: 16,
              boxShadow: 'var(--window-shadow)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              zIndex: 9999,
              transition: 'all 0.3s ease',
            }}
          >
            {/* User Profile Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'var(--blue-bright)',
                color: 'var(--blue-vivid)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 16
              }}>
                NP
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{OWNER.nameVi}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{OWNER.role}</div>
              </div>
            </div>

            <div style={{ height: 1, background: 'var(--window-border)' }} />

            {/* Quick Actions / Shortcuts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>System</div>
              
              {/* Sleep option */}
              <button 
                onClick={handleSleep}
                data-cursor="pointer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 10,
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'none',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: 13,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--pink-soft)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <Moon size={16} />
                <span>Sleep System</span>
              </button>

              {/* Shutdown option */}
              <button 
                onClick={handleShutdown}
                data-cursor="pointer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 10,
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'none',
                  color: '#ef4444',
                  fontWeight: 600,
                  fontSize: 13,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <Power size={16} />
                <span>Shutdown System</span>
              </button>
            </div>
            
            <div style={{ fontSize: 9, color: 'var(--text-muted)', textAlign: 'center', marginTop: 4 }}>
              PortfolioOS v2.0
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
