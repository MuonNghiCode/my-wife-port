'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBootStore } from '@/store/bootStore'
import { playSynthSound } from '@/store/soundStore'
import USBScene from '@/components/usb/USBScene'
import BIOSScreen from '@/components/boot/BIOSScreen'
import BootLoader from '@/components/boot/BootLoader'
import LoginScreen from '@/components/boot/LoginScreen'
import Desktop from '@/components/desktop/Desktop'
import CursorGlow from '@/components/ui/CursorGlow'
import ShutdownScreen from '@/components/boot/ShutdownScreen'

export default function PortfolioApp() {
  const { phase } = useBootStore()

  // Register keyboard & global sound listeners
  useEffect(() => {
    const handleKeyDown = () => {
      // Allow pressing any key on BIOS screen to continue
    }
    
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('button, a, [data-cursor="pointer"], [role="button"], input, textarea, select')) {
        playSynthSound('click')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('click', handleGlobalClick, { capture: true })
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('click', handleGlobalClick, { capture: true })
    }
  }, [])

  const showMonitor = ['bios', 'loading', 'login', 'desktop'].includes(phase)
  const showPowerEffect = phase === 'powering-on'

  return (
    <div style={{
      width: '100vw', height: '100vh', overflow: 'hidden',
      background: 'var(--bg-base)', position: 'relative',
    }}>
      <CursorGlow />

      {/* USB Landing */}
      <USBScene />

      {/* Power on flash */}
      <AnimatePresence>
        {showPowerEffect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 0.5, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, times: [0, 0.1, 0.3, 0.6, 1] }}
            style={{
              position: 'absolute', inset: 0,
              background: 'white',
              pointerEvents: 'none', zIndex: 50,
            }}
          />
        )}
      </AnimatePresence>

      {/* Monitor / OS screen */}
      <AnimatePresence>
        {showMonitor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute', inset: 0,
              background: 'var(--bg-base)',
              overflow: 'hidden',
            }}
          >
            {/* Boot screens */}
            <BIOSScreen />
            <BootLoader />
            <LoginScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop */}
      <Desktop />

      {/* Shutdown overlay screen */}
      <ShutdownScreen />
    </div>
  )
}
