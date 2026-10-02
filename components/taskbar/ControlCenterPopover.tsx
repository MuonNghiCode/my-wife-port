'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Wifi, Volume2, VolumeX, Moon, Sun, Sliders, Music, Coffee, CloudRain, Sparkles } from 'lucide-react'
import { useDesktopStore } from '@/store/desktopStore'
import { useSoundStore, playSynthSound } from '@/store/soundStore'

interface ControlCenterPopoverProps {
  onClose: () => void
}

export default function ControlCenterPopover({ onClose }: ControlCenterPopoverProps) {
  const { language } = useDesktopStore()
  const { volume, setVolume, isMuted, toggleMute } = useSoundStore()

  const [isDark, setIsDark] = React.useState(false)
  const [activeVibe, setActiveVibe] = React.useState<'music' | 'coffee' | 'rain'>('music')

  React.useEffect(() => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'absolute',
        top: 34,
        right: -110,
        width: 320,
        background: 'var(--window-bg)',
        border: '1.5px solid var(--window-border)',
        borderRadius: 20,
        boxShadow: 'var(--window-shadow)',
        padding: 16,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        fontFamily: 'var(--font-ui)',
        color: 'var(--text-primary)',
        userSelect: 'none',
      }}
    >
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Sliders size={14} color="var(--blue-vivid)" />
          <span>{language === 'vi' ? 'Trung tâm điều khiển' : 'Control Center'}</span>
        </div>
        <span style={{ fontSize: 9.5, fontWeight: 800, padding: '2px 6px', borderRadius: 6, background: 'var(--blue-soft)', color: 'var(--blue-vivid)' }}>macOS</span>
      </div>

      {/* Top 2 Quick Toggles Grid - Optimized Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {/* Wifi Toggle */}
        <div style={{
          background: 'var(--bg-elevated)', border: '1px solid var(--window-border)',
          borderRadius: 14, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8,
          minHeight: 52, boxSizing: 'border-box',
        }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--blue-soft)', color: 'var(--blue-vivid)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Wifi size={15} />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Wi-Fi</div>
            <div style={{ fontSize: 9.5, color: 'var(--green-vivid)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>PortfolioOS_5G</div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div
          onClick={toggleTheme}
          data-cursor="pointer"
          style={{
            background: 'var(--bg-elevated)', border: '1px solid var(--window-border)',
            borderRadius: 14, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8,
            minHeight: 52, boxSizing: 'border-box', cursor: 'none',
          }}
        >
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--orange-soft)', color: 'var(--orange-vivid)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{isDark ? 'Dark Mode' : 'Light Mode'}</div>
            <div style={{ fontSize: 9.5, color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{language === 'vi' ? 'Chuyển chủ đề' : 'Toggle Theme'}</div>
          </div>
        </div>
      </div>

      {/* Volume Slider Section */}
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--window-border)', borderRadius: 14, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontWeight: 700 }}>
          <span style={{ color: 'var(--text-muted)' }}>{language === 'vi' ? 'Âm lượng hệ thống' : 'System Volume'}</span>
          <span style={{ color: 'var(--blue-vivid)', fontWeight: 800 }}>{isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={toggleMute} style={{ background: 'none', border: 'none', color: 'var(--blue-vivid)', padding: 0, cursor: 'none' }}>
            {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            style={{ flex: 1, accentColor: 'var(--blue-vivid)', height: 4, borderRadius: 2, outline: 'none' }}
          />
        </div>
      </div>

      {/* Vibe / Soundscape Ambience Selector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {language === 'vi' ? 'Bầu không khí (Vibe Check)' : 'Ambience Vibe'}
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          <button
            onClick={() => { setActiveVibe('music'); playSynthSound('click') }}
            style={{
              padding: '8px 6px', borderRadius: 10,
              background: activeVibe === 'music' ? 'var(--orange-soft)' : 'var(--bg-elevated)',
              border: `1.5px solid ${activeVibe === 'music' ? 'var(--orange-bright)' : 'var(--window-border)'}`,
              color: activeVibe === 'music' ? 'var(--orange-vivid)' : 'var(--text-secondary)',
              fontSize: 10.5, fontWeight: 800, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'none',
            }}
          >
            <Music size={14} />
            <span>Lo-Fi Music</span>
          </button>

          <button
            onClick={() => { setActiveVibe('coffee'); playSynthSound('click') }}
            style={{
              padding: '8px 6px', borderRadius: 10,
              background: activeVibe === 'coffee' ? 'var(--gold-soft)' : 'var(--bg-elevated)',
              border: `1.5px solid ${activeVibe === 'coffee' ? 'var(--gold)' : 'var(--window-border)'}`,
              color: activeVibe === 'coffee' ? 'var(--gold)' : 'var(--text-secondary)',
              fontSize: 10.5, fontWeight: 800, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'none',
            }}
          >
            <Coffee size={14} />
            <span>Coffee Shop</span>
          </button>

          <button
            onClick={() => { setActiveVibe('rain'); playSynthSound('click') }}
            style={{
              padding: '8px 6px', borderRadius: 10,
              background: activeVibe === 'rain' ? 'var(--blue-soft)' : 'var(--bg-elevated)',
              border: `1.5px solid ${activeVibe === 'rain' ? 'var(--blue-bright)' : 'var(--window-border)'}`,
              color: activeVibe === 'rain' ? 'var(--blue-vivid)' : 'var(--text-secondary)',
              fontSize: 10.5, fontWeight: 800, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'none',
            }}
          >
            <CloudRain size={14} />
            <span>Cozy Rain</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
