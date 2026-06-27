import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FOLDERS } from '@/data/portfolio'
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

function FolderIcon({ folder, index, isMobile }: FolderIconProps) {
  const { openWindow } = useDesktopStore()

  const handleOpen = () => {
    openWindow(folder.id, folder.label, folder.id, folder.defaultSize)
  }

  const isSecret = folder.id === 'secret'

  return (
    <motion.div
      custom={index}
      initial={{ scale: 0, opacity: 0, y: 15 }}
      animate={{ scale: 1, opacity: isSecret ? 0.25 : 1, y: 0 }}
      transition={{
        delay: 0.03 * index,
        type: 'spring',
        stiffness: 350,
        damping: 22,
      }}
      whileHover={isMobile ? {} : {
        scale: 1.1,
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
      {/* Icon container */}
      <motion.div
        whileHover={isMobile ? {} : {
          borderColor: isSecret ? 'var(--pink-vivid)' : 'var(--blue-vivid)',
          background: isSecret ? 'var(--pink-bright)' : 'var(--blue-bright)',
        }}
        style={{
          width: isMobile ? 54 : 58, height: isMobile ? 54 : 58,
          borderRadius: 14,
          background: isSecret ? 'var(--pink-soft)' : 'var(--blue-soft)',
          border: `1px solid ${isSecret ? 'var(--pink-bright)' : 'var(--blue-bright)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: isSecret ? 'var(--pink-vivid)' : 'var(--blue-vivid)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.03)',
          transition: 'all 0.2s ease',
        }}
      >
        {getIcon(folder.icon)}
      </motion.div>

      {/* Label */}
      <div style={{
        fontFamily: 'var(--font-ui)',
        fontSize: isMobile ? 10 : 11, fontWeight: 600,
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
        textShadow: isMobile ? '0 1px 2px var(--window-title-bg)' : 'none',
      }}>
        {folder.label}
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

  // On mobile, the dock contains: about, music, browser, contact.
  // We exclude them from the home grid.
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
