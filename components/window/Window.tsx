'use client'

import { useState, useEffect } from 'react'
import { motion, useDragControls } from 'framer-motion'
import { X, Minus, Maximize2, ChevronLeft } from 'lucide-react'
import { useDesktopStore } from '@/store/desktopStore'
import { WindowState } from '@/types/portfolio.types'
import { FOLDER_LABELS, UI_STRINGS } from '@/data/translations'

interface WindowProps {
  window: WindowState
  children: React.ReactNode
}

export default function Window({ window: win, children }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition, language } = useDesktopStore()
  const displayTitle = FOLDER_LABELS[language][win.folderId] || win.title
  const [isDragging, setIsDragging] = useState(false)
  const dragControls = useDragControls()

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const containerStyle = (win.isMaximized || isMobile)
    ? {
        position: 'fixed' as const,
        top: isMobile ? 36 : 32,
        left: 0,
        right: 0,
        bottom: 0,
        width: 'auto', height: 'auto',
        borderRadius: 0,
      }
    : {
        position: 'fixed' as const,
        width: win.size.width,
        height: win.size.height,
        left: win.position.x,
        top: win.position.y,
        borderRadius: 18,
      }

  return (
    <motion.div
      layoutId={`window-${win.id}`}
      key={win.id}
      initial={{ scale: 0.82, opacity: 0, y: 40 }}
      animate={win.isMinimized
        ? { scale: 0.6, opacity: 0, y: 120, pointerEvents: 'none' as const, transitionEnd: { display: 'none' } }
        : { scale: 1, opacity: 1, y: 0, pointerEvents: 'auto' as const, display: 'flex' }
      }
      exit={{ scale: 0.8, opacity: 0, y: 30 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28, mass: 0.8 }}
      drag={!win.isMaximized && !isMobile}
      dragControls={dragControls}
      dragMomentum={false}
      dragListener={false}
      dragElastic={0}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(_, info) => {
        setIsDragging(false)
        if (!win.isMaximized) {
          updatePosition(win.id, {
            x: Math.max(0, win.position.x + info.offset.x),
            y: Math.max(32, win.position.y + info.offset.y),
          })
        }
      }}
      onPointerDown={() => focusWindow(win.id)}
      style={{
        ...containerStyle,
        zIndex: win.zIndex,
        background: 'var(--window-bg)',
        border: `1.5px solid ${isDragging ? 'var(--blue-vivid)' : 'var(--window-border)'}`,
        boxShadow: 'var(--window-shadow)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Title Bar */}
      <div
        onPointerDown={(e) => {
          if (!win.isMaximized && !isMobile) {
            dragControls.start(e)
          }
        }}
        data-cursor={win.isMaximized ? 'default' : 'grab'}
        style={{
          height: 42,
          background: 'var(--window-title-bg)',
          borderBottom: '1px solid var(--window-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 14px',
          userSelect: 'none',
          flexShrink: 0,
          cursor: win.isMaximized ? 'default' : 'grab',
        }}
      >
        {isMobile ? (
          /* Mobile Header */
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeWindow(win.id)
              }}
              style={{
                background: 'none', border: 'none', color: 'var(--blue-vivid)',
                display: 'flex', alignItems: 'center', gap: 2, fontSize: 13, fontWeight: 700,
              }}
            >
              <ChevronLeft size={18} />
              <span>{UI_STRINGS[language].back}</span>
            </button>
            
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>
              {displayTitle}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                minimizeWindow(win.id)
              }}
              style={{
                background: 'none', border: 'none', color: 'var(--blue-vivid)',
                fontSize: 13, fontWeight: 700,
              }}
            >
              <span>{UI_STRINGS[language].hide}</span>
            </button>
          </>
        ) : (
          /* Desktop macOS Traffic Lights Header */
          <>
            <div
              style={{ display: 'flex', gap: 8, alignItems: 'center' }}
              onPointerDown={e => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  closeWindow(win.id)
                }}
                style={{
                  width: 13, height: 13, borderRadius: '50%',
                  background: '#ff5f56', border: '1px solid #e0443e',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 0, flexShrink: 0,
                }}
                title="Close"
              >
                <X size={8} color="#4c0000" strokeWidth={3} />
              </button>

              {/* Minimize */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  minimizeWindow(win.id)
                }}
                style={{
                  width: 13, height: 13, borderRadius: '50%',
                  background: '#ffbd2e', border: '1px solid #dea123',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 0, flexShrink: 0,
                }}
                title="Minimize"
              >
                <Minus size={8} color="#543b00" strokeWidth={3} />
              </button>

              {/* Maximize */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  maximizeWindow(win.id)
                }}
                style={{
                  width: 13, height: 13, borderRadius: '50%',
                  background: '#27c93f', border: '1px solid #1aab29',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 0, flexShrink: 0,
                }}
                title="Expand"
              >
                <Maximize2 size={7} color="#053b0a" strokeWidth={3} />
              </button>
            </div>

            {/* Title */}
            <div style={{
              flex: 1, textAlign: 'center',
              fontSize: 12.5, fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.2px',
            }}>
              {displayTitle}
            </div>

            <div style={{ width: 60 }} />
          </>
        )}
      </div>

      {/* Window Body Content */}
      <div style={{ flex: 1, overflow: 'auto', position: 'relative', background: 'var(--window-bg)' }}>
        {children}
      </div>
    </motion.div>
  )
}
