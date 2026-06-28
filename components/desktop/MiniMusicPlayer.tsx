import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipForward, Maximize2, Music } from 'lucide-react'
import { useSoundStore, TRACKS } from '@/store/soundStore'
import { useDesktopStore } from '@/store/desktopStore'

export default function MiniMusicPlayer() {
  const { windows, restoreWindow } = useDesktopStore()
  const { isPlaying, currentTrackIdx, setIsPlaying, setCurrentTrackIdx } = useSoundStore()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const musicWin = windows['music']
  const showMiniPlayer = musicWin && musicWin.isOpen && musicWin.isMinimized

  if (!showMiniPlayer || isMobile) return null

  const currentTrack = TRACKS[currentTrackIdx]
  const openWins = Object.values(windows)
  const isAnyAppActive = openWins.some(win => win.isOpen && !win.isMinimized)

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlaying(!isPlaying)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    const next = (currentTrackIdx + 1) % TRACKS.length
    setCurrentTrackIdx(next)
    setIsPlaying(true)
  }

  const handleRestore = (e: React.MouseEvent) => {
    e.stopPropagation()
    restoreWindow('music')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{
        opacity: isAnyAppActive ? 0 : 1,
        scale: isAnyAppActive ? 0.92 : 1,
        y: isAnyAppActive ? 20 : 0,
        bottom: isAnyAppActive ? 12 : 76,
        zIndex: isAnyAppActive ? 8000 : 9999,
        pointerEvents: isAnyAppActive ? 'none' : 'auto',
      }}
      exit={{ opacity: 0, scale: 0.9, y: 30 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleRestore}
      data-cursor="pointer"
      style={{
        position: 'fixed',
        left: isMobile ? 16 : 'auto',
        right: isMobile ? 16 : 24,
        width: isMobile ? 'calc(100% - 32px)' : 280,
        height: 76,
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        border: '1.5px solid var(--window-border)',
        borderRadius: 20,
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 12,
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Spinning Disc / Album Cover */}
      <div style={{ position: 'relative', width: 44, height: 44, flexShrink: 0 }}>
        <motion.div
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '100%', height: '100%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--pink-bright) 0%, var(--blue-bright) 100%)',
            border: '2px solid #ffffff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 3px 8px rgba(0,0,0,0.06)',
          }}
        >
          <Music size={18} color="#ffffff" strokeWidth={2.5} />
        </motion.div>
        
        {/* Vinyl center pin */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 8, height: 8, borderRadius: '50%',
          background: '#ffffff',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        }} />
      </div>

      {/* Track Info */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{
          fontSize: 11, fontWeight: 700, color: 'var(--text-primary)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {currentTrack.title}
        </div>
        <div style={{ fontSize: 9, color: 'var(--text-secondary)', fontWeight: 600 }}>
          {currentTrack.artist}
        </div>
        
        {/* Tiny visualizer */}
        <div style={{ display: 'flex', gap: 2, height: 10, alignItems: 'flex-end', marginTop: 4 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 2.5,
                height: isPlaying ? '100%' : 2,
                background: 'var(--pink-vivid)',
                borderRadius: 1,
                animation: isPlaying ? `miniBounce 0.6s ease-in-out ${i * 0.12}s infinite alternate` : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* Control Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
        <button onClick={handlePlayPause} style={{
          width: 28, height: 28, borderRadius: '50%',
          background: '#f97316', color: '#ffffff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: 'none', cursor: 'none',
          boxShadow: '0 2px 6px rgba(249,115,22,0.2)',
          transition: 'transform 0.1s',
        }}>
          {isPlaying ? <Pause size={12} fill="#ffffff" /> : <Play size={12} fill="#ffffff" style={{ marginLeft: 1 }} />}
        </button>

        <button onClick={handleNext} style={{ background: 'none', border: 'none', color: '#4b5563', cursor: 'none', padding: 0 }}>
          <SkipForward size={14} />
        </button>

        <button onClick={handleRestore} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'none', padding: 0 }}>
          <Maximize2 size={13} />
        </button>
      </div>

      {/* Mini Visualizer CSS Keyframes */}
      <style>{`
        @keyframes miniBounce {
          0% { height: 2px; }
          100% { height: 10px; }
        }
      `}</style>
    </motion.div>
  )
}
