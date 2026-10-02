import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FOLDERS } from '@/data/portfolio'
import { FOLDER_LABELS } from '@/data/translations'
import { useDesktopStore } from '@/store/desktopStore'
import * as Icons from 'lucide-react'

interface FolderIconProps {
  folder: typeof FOLDERS[0]
  index: number
  isMobile: boolean
}

function getIcon(name: string) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[name]
  return Icon ? <Icon size={26} /> : <Icons.Folder size={26} />
}

// Signature multi-color themes for each desktop icon & window
export const ICON_COLOR_THEMES: Record<string, { lightBg: string; lightBorder: string; lightText: string; darkBg: string; darkBorder: string; darkText: string }> = {
  about: {
    lightBg: '#e0f2fe', lightBorder: '#7dd3fc', lightText: '#0284c7',
    darkBg: 'rgba(2, 132, 199, 0.2)', darkBorder: 'rgba(56, 189, 248, 0.4)', darkText: '#38bdf8',
  },
  projects: {
    lightBg: '#dcfce7', lightBorder: '#86efac', lightText: '#16a34a',
    darkBg: 'rgba(22, 163, 74, 0.2)', darkBorder: 'rgba(74, 222, 128, 0.4)', darkText: '#4ade80',
  },
  skills: {
    lightBg: '#f3e8ff', lightBorder: '#d8b4fe', lightText: '#9333ea',
    darkBg: 'rgba(147, 51, 234, 0.2)', darkBorder: 'rgba(192, 132, 252, 0.4)', darkText: '#c084fc',
  },
  experience: {
    lightBg: '#ffedd5', lightBorder: '#fdba74', lightText: '#ea580c',
    darkBg: 'rgba(234, 88, 12, 0.2)', darkBorder: 'rgba(251, 146, 60, 0.4)', darkText: '#fb923c',
  },
  education: {
    lightBg: '#ede9fe', lightBorder: '#c4b5fd', lightText: '#7c3aed',
    darkBg: 'rgba(124, 58, 237, 0.2)', darkBorder: 'rgba(167, 139, 250, 0.4)', darkText: '#a78bfa',
  },
  certificates: {
    lightBg: '#cffafe', lightBorder: '#67e8f9', lightText: '#0891b2',
    darkBg: 'rgba(8, 145, 178, 0.2)', darkBorder: 'rgba(34, 211, 238, 0.4)', darkText: '#22d3ee',
  },
  contact: {
    lightBg: '#ffe4e6', lightBorder: '#fda4af', lightText: '#e11d48',
    darkBg: 'rgba(225, 29, 72, 0.2)', darkBorder: 'rgba(251, 113, 133, 0.4)', darkText: '#fb7185',
  },
  resume: {
    lightBg: '#fef3c7', lightBorder: '#fde047', lightText: '#ca8a04',
    darkBg: 'rgba(202, 138, 4, 0.2)', darkBorder: 'rgba(250, 204, 21, 0.4)', darkText: '#facc15',
  },
  music: {
    lightBg: '#ffedd5', lightBorder: '#ff5500', lightText: '#ff5500',
    darkBg: 'rgba(255, 85, 0, 0.2)', darkBorder: 'rgba(255, 85, 0, 0.4)', darkText: '#ff7733',
  },
  secret: {
    lightBg: '#fae8ff', lightBorder: '#f0abfc', lightText: '#c026d3',
    darkBg: 'rgba(192, 38, 211, 0.2)', darkBorder: 'rgba(232, 121, 249, 0.4)', darkText: '#e879f9',
  }
}

function FolderIcon({ folder, index, isMobile }: FolderIconProps) {
  const { openWindow, language } = useDesktopStore()
  const label = FOLDER_LABELS[language][folder.id] || folder.label
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const handleOpen = () => {
    openWindow(folder.id, label, folder.id, folder.defaultSize)
  }

  const theme = ICON_COLOR_THEMES[folder.id] || ICON_COLOR_THEMES.about
  const isSecret = folder.id === 'secret'

  const iconBg = isDark ? theme.darkBg : theme.lightBg
  const iconBorder = isDark ? theme.darkBorder : theme.lightBorder
  const iconColor = isDark ? theme.darkText : theme.lightText

  return (
    <motion.div
      custom={index}
      initial={{ scale: 0, opacity: 0, y: 15 }}
      animate={{ scale: 1, opacity: isSecret ? 0.3 : 1, y: 0 }}
      transition={{
        delay: 0.03 * index,
        type: 'spring',
        stiffness: 350,
        damping: 22,
      }}
      whileHover={isMobile ? {} : {
        scale: 1.12,
        opacity: 1,
        y: -4,
        transition: { type: 'spring', stiffness: 500, damping: 20 },
      }}
      whileTap={{ scale: 0.92 }}
      onDoubleClick={handleOpen}
      onClick={handleOpen}
      data-cursor="pointer"
      style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 6,
        cursor: 'none', userSelect: 'none',
        width: '100%',
      }}
    >
      {/* Icon container with rich signature color */}
      <motion.div
        style={{
          width: isMobile ? 54 : 58, height: isMobile ? 54 : 58,
          borderRadius: 15,
          background: iconBg,
          border: `1.5px solid ${iconBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: iconColor,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.2s ease',
        }}
      >
        {getIcon(folder.icon)}
      </motion.div>

      {/* Label */}
      <div style={{
        fontFamily: 'var(--font-ui)',
        fontSize: isMobile ? 10 : 11, fontWeight: 700,
        color: 'var(--text-primary)',
        textAlign: 'center',
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
        lineHeight: 1.2,
        padding: isMobile ? '2px 0' : '3px 8px',
        background: isMobile ? 'transparent' : 'var(--bg-glass)',
        border: isMobile ? 'none' : '1px solid var(--window-border)',
        borderRadius: 8,
        backdropFilter: isMobile ? 'none' : 'blur(8px)',
        boxShadow: isMobile ? 'none' : '0 2px 6px rgba(0, 0, 0, 0.03)',
        marginTop: 2,
      }}>
        {label}
      </div>
    </motion.div>
  )
}

export default function IconGrid() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const dockAppIds = ['about', 'music', 'browser', 'contact']
  const filteredFolders = isMobile 
    ? FOLDERS.filter(f => !dockAppIds.includes(f.id))
    : FOLDERS

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(4, 1fr)' : 'repeat(auto-fill, 110px)',
      gridAutoFlow: isMobile ? 'row' : 'column',
      gridTemplateRows: isMobile ? 'auto' : 'repeat(auto-fill, 96px)',
      gap: isMobile ? '20px 10px' : '16px 20px',
      padding: isMobile ? '24px 16px' : '24px',
      justifyContent: isMobile ? 'center' : 'start',
      alignContent: 'start',
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
    }}>
      {filteredFolders.map((folder, i) => (
        <FolderIcon key={folder.id} folder={folder} index={i} isMobile={isMobile} />
      ))}
    </div>
  )
}
