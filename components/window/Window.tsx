'use client'
import { useState, useEffect } from 'react'
import { motion, useDragControls } from 'framer-motion'
import { X, Minus, Maximize2, ChevronLeft } from 'lucide-react'
import { useDesktopStore } from '@/store/desktopStore'
import { WindowState } from '@/types/portfolio.types'

interface WindowProps {
  window: WindowState
  children: React.ReactNode
}

export default function Window({ window: win, children }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition } = useDesktopStore()
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
        top: isMobile ? 36 : 0,
        left: 0,
        right: 0,
        bottom: isMobile ? 0 : 56,
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
      initial={{ scale: 0.88, opacity: 0, y: 12 }}
      animate={win.isMinimized
        ? { scale: 0.82, opacity: 0, y: 24, pointerEvents: 'none' as const, transitionEnd: { display: 'none' } }
        : { scale: 1, opacity: 1, y: 0, pointerEvents: 'auto' as const, display: 'flex' }
      }
      transition={{ type: 'spring', stiffness: 350, damping: 32 }}
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
            y: Math.max(0, win.position.y + info.offset.y),
          })
        }
      }}
      onPointerDown={() => focusWindow(win.id)}
      style={{
        ...containerStyle,
        zIndex: win.zIndex,
        background: 'var(--window-bg)',
        border: `1px solid ${isDragging ? 'var(--pink-vivid)' : 'var(--window-border)'}`,
        boxShadow: isDragging
          ? '0 16px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.02)'
          : 'var(--window-shadow)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        willChange: 'transform',
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
              height: 46,
              background: 'var(--window-title-bg)',
              borderBottom: '1px solid var(--window-border)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 14px',
              gap: 10,
              cursor: win.isMaximized ? 'default' : 'grab',
              userSelect: 'none',
              flexShrink: 0,
            }}
          >
            {/* Traffic light buttons — stopPropagation on ALL events */}
            {isMobile ? (
              /* Mobile Header: Back Button + Centered Title + Hide Button */
              <>
                <button
                  style={{
                    background: 'none', border: 'none',
                    display: 'flex', alignItems: 'center', gap: 2,
                    color: 'var(--blue-vivid)', cursor: 'pointer',
                    padding: '6px 12px 6px 0',
                    fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600,
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    closeWindow(win.id)
                  }}
                >
                  <ChevronLeft size={22} />
                  <span>Back</span>
                </button>
                
                <div style={{
                  flex: 1, textAlign: 'center',
                  fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 700,
                  color: 'var(--text-primary)',
                  pointerEvents: 'none',
                  letterSpacing: '0.01em',
                }}>
                  {win.title}
                </div>

                <button
                  style={{
                    background: 'none', border: 'none',
                    display: 'flex', alignItems: 'center',
                    color: 'var(--blue-vivid)', cursor: 'pointer',
                    padding: '6px 0 6px 12px',
                    fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600,
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    minimizeWindow(win.id)
                  }}
                >
                  <span>Hide</span>
                </button>
              </>
            ) : (
              /* Desktop Header: Traffic light buttons + Title */
              <>
                <div
                  style={{ display: 'flex', gap: 7, alignItems: 'center' }}
                  onPointerDown={e => e.stopPropagation()}
                >
                  {/* Close */}
                  <button
                    style={{
                      width: 14, height: 14, borderRadius: '50%',
                      background: 'rgba(252,165,165,0.75)',
                      border: '1px solid rgba(239,68,68,0.35)',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: 0, flexShrink: 0,
                      transition: 'background 0.15s, transform 0.1s',
                    }}
                    onPointerDown={(e) => {
                      e.stopPropagation()
                      closeWindow(win.id)
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      closeWindow(win.id)
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#fca5a5'
                      e.currentTarget.style.transform = 'scale(1.15)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(252,165,165,0.75)'
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <X size={8} color="rgba(127,29,29,0.9)" strokeWidth={2.5} />
                  </button>

                  {/* Minimize */}
                  <button
                    style={{
                      width: 14, height: 14, borderRadius: '50%',
                      background: 'rgba(253,230,138,0.75)',
                      border: '1px solid rgba(245,158,11,0.35)',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: 0, flexShrink: 0,
                      transition: 'background 0.15s, transform 0.1s',
                    }}
                    onPointerDown={(e) => {
                      e.stopPropagation()
                      minimizeWindow(win.id)
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      minimizeWindow(win.id)
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#fde68a'
                      e.currentTarget.style.transform = 'scale(1.15)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(253,230,138,0.75)'
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <Minus size={8} color="rgba(120,53,15,0.9)" strokeWidth={2.5} />
                  </button>

                  {/* Maximize */}
                  <button
                    style={{
                      width: 14, height: 14, borderRadius: '50%',
                      background: 'rgba(187,247,208,0.75)',
                      border: '1px solid rgba(52,211,153,0.35)',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: 0, flexShrink: 0,
                      transition: 'background 0.15s, transform 0.1s',
                    }}
                    onPointerDown={(e) => {
                      e.stopPropagation()
                      maximizeWindow(win.id)
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      maximizeWindow(win.id)
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#bbf7d0'
                      e.currentTarget.style.transform = 'scale(1.15)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(187,247,208,0.75)'
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <Maximize2 size={7} color="rgba(6,78,59,0.9)" strokeWidth={2.5} />
                  </button>
                </div>

                {/* Title */}
                <div style={{
                  flex: 1, textAlign: 'center',
                  fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600,
                  color: 'var(--text-primary)',
                  pointerEvents: 'none',
                  letterSpacing: '0.02em',
                }}>
                  {win.title}
                </div>

                <div style={{ width: 60 }} />
              </>
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
            {children}
          </div>
        </motion.div>
  )
}
