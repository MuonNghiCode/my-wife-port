'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDesktopStore } from '@/store/desktopStore'
import { useSoundStore, playSynthSound, TRACKS } from '@/store/soundStore'
import { useBootStore } from '@/store/bootStore'
import { OWNER } from '@/data/portfolio'
import { FOLDER_LABELS } from '@/data/translations'
import { Volume2, VolumeX, Moon, Sun, Play, Pause, Power, Sliders, Calendar as CalendarIcon } from 'lucide-react'
import CalendarPopover from './CalendarPopover'
import ControlCenterPopover from './ControlCenterPopover'

export default function TopMenuBar() {
  const { windows, focusedWindowId, language, toggleLanguage, restoreWindow } = useDesktopStore()
  const { isMuted, toggleMute, isPlaying, currentTrackIdx, setIsPlaying } = useSoundStore()
  const { setPhase } = useBootStore()

  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [isDark, setIsDark] = useState(false)
  const [isAppleMenuOpen, setIsAppleMenuOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false)

  // Initialize theme on mount
  useEffect(() => {
    const isDarkTheme = document.documentElement.classList.contains('dark')
    setIsDark(isDarkTheme)
  }, [])

  // Track real-time clock
  useEffect(() => {
    const update = () => {
      const now = new Date()
      const locale = language === 'vi' ? 'vi-VN' : 'en-US'
      setTime(now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }))
      setDate(now.toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' }))
    }
    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [language])

  // Get active window title
  const activeWin = focusedWindowId ? windows[focusedWindowId] : null
  const isAppFocused = activeWin && activeWin.isOpen && !activeWin.isMinimized
  const activeAppTitle = isAppFocused
    ? (FOLDER_LABELS[language][activeWin.folderId] || activeWin.title)
    : 'PortfolioOS'

  const currentTrack = TRACKS[currentTrackIdx]
  const musicWin = windows['music']
  const isMusicRunningBg = musicWin && musicWin.isOpen && musicWin.isMinimized

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

  const handleSleep = () => {
    playSynthSound('sleep')
    setIsAppleMenuOpen(false)
    setIsPlaying(false)
    setPhase('login')
  }

  const handleShutdown = () => {
    playSynthSound('shutdown')
    setIsAppleMenuOpen(false)
    setIsPlaying(false)
    setPhase('shutting-down')
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 32,
        zIndex: 9000,
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--window-border)',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--text-primary)',
        userSelect: 'none',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Left Menu Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Apple / OS Brand Icon */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              playSynthSound('click')
              setIsAppleMenuOpen(!isAppleMenuOpen)
              setIsCalendarOpen(false)
              setIsControlCenterOpen(false)
            }}
            data-cursor="pointer"
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 3,
              borderRadius: 6,
              cursor: 'none',
              color: 'var(--blue-vivid)',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 5V11L8 14L2 11V5L8 2Z" fill="var(--blue-vivid)" />
              <path d="M8 5L11 6.5V9.5L8 11L5 9.5V6.5L8 5Z" fill="#ffffff" />
            </svg>
          </button>

          {/* Apple Dropdown Menu */}
          <AnimatePresence>
            {isAppleMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                style={{
                  position: 'absolute',
                  top: 36,
                  left: 0,
                  width: 220,
                  borderRadius: 14,
                  background: 'var(--window-bg)',
                  border: '1.5px solid var(--window-border)',
                  padding: 8,
                  boxShadow: 'var(--window-shadow)',
                  zIndex: 9999,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: 8,
                  borderBottom: '1px solid var(--window-border)', marginBottom: 4,
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: 'var(--blue-soft)', border: '1px solid var(--blue-bright)',
                    color: 'var(--blue-vivid)', fontWeight: 800, fontSize: 13,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    NP
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: 'var(--text-primary)' }}>{OWNER.nameVi}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{OWNER.role}</div>
                  </div>
                </div>

                <button
                  onClick={handleSleep}
                  data-cursor="pointer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 10px', borderRadius: 8,
                    background: 'none', border: 'none', textAlign: 'left',
                    color: 'var(--text-primary)', fontSize: 12, fontWeight: 600,
                    cursor: 'none',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-soft)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  <Moon size={14} />
                  <span>Sleep System</span>
                </button>

                <button
                  onClick={handleShutdown}
                  data-cursor="pointer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 10px', borderRadius: 8,
                    background: 'none', border: 'none', textAlign: 'left',
                    color: 'var(--error)', fontSize: 12, fontWeight: 600,
                    cursor: 'none',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  <Power size={14} />
                  <span>Shutdown OS</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Active App Title */}
        <span style={{ fontWeight: 800, fontSize: 12.5, letterSpacing: '-0.2px', color: 'var(--text-primary)' }}>
          {activeAppTitle}
        </span>

        {/* Top Navigation Options */}
        <div style={{ display: 'flex', gap: 14, color: 'var(--text-muted)', fontSize: 11, fontWeight: 600 }}>
          <span style={{ cursor: 'pointer' }}>File</span>
          <span style={{ cursor: 'pointer' }}>Edit</span>
          <span style={{ cursor: 'pointer' }}>View</span>
          <span style={{ cursor: 'pointer' }}>Window</span>
          <span style={{ cursor: 'pointer' }}>Help</span>
        </div>
      </div>

      {/* Right System Tray Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Background Music Pill Indicator */}
        {isMusicRunningBg && currentTrack && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => restoreWindow('music')}
            data-cursor="pointer"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'var(--orange-soft)', border: '1px solid var(--orange-bright)',
              padding: '2px 10px', borderRadius: 12,
              color: 'var(--orange-vivid)', fontSize: 11, fontWeight: 700,
              cursor: 'none',
            }}
          >
            <span style={{ maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentTrack.title}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsPlaying(!isPlaying)
              }}
              style={{ background: 'none', border: 'none', color: 'var(--orange-vivid)', padding: 0, cursor: 'none' }}
            >
              {isPlaying ? <Pause size={10} fill="var(--orange-vivid)" /> : <Play size={10} fill="var(--orange-vivid)" />}
            </button>
          </motion.div>
        )}

        {/* Control Center Toggle Button with Anchored Popover */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              playSynthSound('click')
              setIsControlCenterOpen(!isControlCenterOpen)
              setIsCalendarOpen(false)
              setIsAppleMenuOpen(false)
            }}
            data-cursor="pointer"
            style={{
              background: isControlCenterOpen ? 'var(--blue-soft)' : 'none',
              border: 'none', borderRadius: 6, padding: '3px 6px',
              color: isControlCenterOpen ? 'var(--blue-vivid)' : 'var(--text-secondary)',
              display: 'flex', alignItems: 'center', cursor: 'none',
            }}
            title="Control Center"
          >
            <Sliders size={14} />
          </button>

          {/* Control Center Popover */}
          <AnimatePresence>
            {isControlCenterOpen && (
              <ControlCenterPopover onClose={() => setIsControlCenterOpen(false)} />
            )}
          </AnimatePresence>
        </div>

        {/* Volume Toggle */}
        <button
          onClick={toggleMute}
          data-cursor="pointer"
          style={{
            background: 'none', border: 'none', cursor: 'none',
            color: isMuted ? 'var(--text-muted)' : 'var(--blue-vivid)',
            display: 'flex', alignItems: 'center', padding: 2,
          }}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          data-cursor="pointer"
          style={{
            background: 'none', border: 'none', cursor: 'none',
            color: 'var(--text-secondary)',
            display: 'flex', alignItems: 'center', padding: 2,
          }}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        {/* Language Switcher Button */}
        <button
          onClick={toggleLanguage}
          data-cursor="pointer"
          style={{
            background: 'var(--blue-soft)',
            border: '1px solid var(--blue-bright)',
            borderRadius: 6,
            color: 'var(--blue-vivid)',
            fontSize: 10,
            fontWeight: 800,
            padding: '2px 7px',
            fontFamily: 'var(--font-mono), monospace',
            cursor: 'none',
          }}
        >
          {language.toUpperCase()}
        </button>

        {/* Interactive Time & Date Section (Click to Open Calendar Dropdown) */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              playSynthSound('click')
              setIsCalendarOpen(!isCalendarOpen)
              setIsControlCenterOpen(false)
              setIsAppleMenuOpen(false)
            }}
            data-cursor="pointer"
            style={{
              display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600,
              color: 'var(--text-secondary)', background: isCalendarOpen ? 'var(--blue-soft)' : 'none',
              border: 'none', borderRadius: 6, padding: '3px 8px', cursor: 'none',
            }}
          >
            <span>{date}</span>
            <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{time}</span>
          </button>

          {/* Calendar Popover */}
          <AnimatePresence>
            {isCalendarOpen && (
              <CalendarPopover onClose={() => setIsCalendarOpen(false)} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
