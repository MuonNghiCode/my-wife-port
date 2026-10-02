'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FOLDERS } from '@/data/portfolio'
import { FOLDER_LABELS } from '@/data/translations'
import { useDesktopStore } from '@/store/desktopStore'
import { playSynthSound } from '@/store/soundStore'
import { ICON_COLOR_THEMES } from '@/components/desktop/IconGrid'
import * as Icons from 'lucide-react'

function getIcon(name: string) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[name]
  return Icon ? <Icon size={24} /> : <Icons.Folder size={24} />
}

export default function Dock3D() {
  const { windows, openWindow, focusWindow, restoreWindow, focusedWindowId, language } = useDesktopStore()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [isNearBottom, setIsNearBottom] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Check if any app window is currently open in foreground
  const openWins = Object.values(windows)
  const isAnyAppActive = openWins.some(win => win.isOpen && !win.isMinimized)

  // Auto-hide trigger: Hide when an app is active UNLESS mouse is near bottom edge
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerHeight - e.clientY <= 36) {
        setIsNearBottom(true)
      } else if (window.innerHeight - e.clientY > 100) {
        setIsNearBottom(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const shouldShowDock = !isAnyAppActive || isNearBottom || hoveredId !== null

  return (
    <>
      {/* Invisible Hover Trigger Zone at bottom edge */}
      {isAnyAppActive && (
        <div
          onMouseEnter={() => setIsNearBottom(true)}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: 20,
            zIndex: 8999,
            pointerEvents: 'auto',
          }}
        />
      )}

      {/* Floating macOS Auto-Hiding 3D Dock */}
      <div style={{
        position: 'fixed',
        bottom: 14,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9000,
        pointerEvents: shouldShowDock ? 'auto' : 'none',
      }}>
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={shouldShowDock
            ? { y: 0, opacity: 1, scale: 1 }
            : { y: 90, opacity: 0, scale: 0.95 }
          }
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          style={{
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1.5px solid var(--window-border)',
            borderRadius: 22,
            padding: '8px 14px',
            boxShadow: 'var(--window-shadow)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          {FOLDERS.map((app) => {
            const win = windows[app.id]
            const isOpen = win && win.isOpen
            const isFocused = win && win.isOpen && !win.isMinimized && focusedWindowId === win.id
            const isHovered = hoveredId === app.id
            const label = FOLDER_LABELS[language][app.id] || app.label

            const theme = ICON_COLOR_THEMES[app.id] || ICON_COLOR_THEMES.about
            const isSecret = app.id === 'secret'

            const iconBg = isDark ? theme.darkBg : theme.lightBg
            const iconBorder = isDark ? theme.darkBorder : theme.lightBorder
            const iconColor = isDark ? theme.darkText : theme.lightText

            return (
              <div key={app.id} style={{ position: 'relative' }}>
                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, x: '-50%', scale: 0.9 }}
                      animate={{ opacity: 1, y: -45, x: '-50%', scale: 1 }}
                      exit={{ opacity: 0, y: 10, x: '-50%', scale: 0.9 }}
                      style={{
                        position: 'absolute',
                        left: '50%',
                        whiteSpace: 'nowrap',
                        padding: '4px 10px',
                        fontSize: 11,
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--window-border)',
                        borderRadius: 8,
                        boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                        pointerEvents: 'none',
                        zIndex: 50,
                      }}
                    >
                      {label}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* App Button with rich multi-color signature palette */}
                <motion.button
                  onMouseEnter={() => setHoveredId(app.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  whileHover={{ scale: 1.25, y: -10 }}
                  whileTap={{ scale: 0.88 }}
                  onClick={() => {
                    playSynthSound('click')
                    if (!win || !win.isOpen) {
                      openWindow(app.id, label, app.id, app.defaultSize)
                    } else if (win.isMinimized) {
                      restoreWindow(app.id)
                    } else {
                      focusWindow(app.id)
                    }
                  }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: iconBg,
                    border: `1.5px solid ${iconBorder}`,
                    color: iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'none',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.03)',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    opacity: isSecret ? 0.4 : 1,
                  }}
                >
                  {getIcon(app.icon)}

                  {/* Active Glowing Dot Indicator */}
                  {isOpen && (
                    <motion.div
                      layoutId={`dock-dot-${app.id}`}
                      style={{
                        position: 'absolute',
                        bottom: -5,
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: isFocused ? iconColor : 'var(--text-muted)',
                        boxShadow: isFocused ? `0 0 8px ${iconColor}` : 'none',
                      }}
                    />
                  )}
                </motion.button>
              </div>
            )
          })}
        </motion.div>
      </div>
    </>
  )
}
