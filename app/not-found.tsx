'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Terminal, AlertTriangle, ArrowLeft, Activity, Wrench } from 'lucide-react'
import { playSynthSound } from '@/store/soundStore'

export default function NotFound() {
  const [logs, setLogs] = useState<string[]>([
    'System initialization...',
    'Error: 404_PATH_NOT_FOUND',
    'Ready for diagnostic commands.'
  ])
  const [diagnosing, setDiagnosing] = useState(false)
  const logEndRef = useRef<HTMLDivElement>(null)

  // Scroll terminal logs to bottom
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const printLog = (lines: string[]) => {
    lines.forEach((line, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, line])
      }, index * 250)
    })
  }

  const handleReturn = () => {
    playSynthSound('click')
    setLogs(prev => [...prev, '> cd /workspace', 'Redirecting to workstation root...'])
    setTimeout(() => {
      window.location.href = '/'
    }, 800)
  }

  const handlePing = () => {
    if (diagnosing) return
    playSynthSound('click')
    setLogs(prev => [...prev, '> ping -a ngocphuong070404@gmail.com'])
    printLog([
      'Pinging mail node: ngocphuong070404@gmail.com...',
      'Response from node [28ms]: status=200 OK',
      'Mail server is active.'
    ])
  }

  const handleDiagnose = () => {
    if (diagnosing) return
    playSynthSound('click')
    setDiagnosing(true)
    setLogs(prev => [...prev, '> sys_diagnose'])
    
    const steps = [
      'Scanning local directories...',
      'Checking: app/, components/, data/, features/...',
      'Verification complete: 48 modules inspected.',
      'Result: All central directories [HEALTHY].',
      'Anomaly: Current path query is unregistered.',
      'Recommendation: Execute "cd /workspace" to boot desktop shell.',
    ]

    steps.forEach((step, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step])
        if (index === steps.length - 1) {
          setDiagnosing(false)
        }
      }, index * 300)
    })
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'var(--bg-base)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-ui)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      boxSizing: 'border-box',
    }}>
      {/* Restore standard browser cursor specifically for 404 page */}
      <style>{`
        body, html, *, *::before, *::after {
          cursor: default !important;
        }
        button, a, [role="button"], [data-cursor="pointer"] {
          cursor: pointer !important;
        }
      `}</style>

      {/* Background Grid Accent */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.1,
        pointerEvents: 'none',
        backgroundImage: 'radial-gradient(var(--blue-vivid) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
      }} />

      {/* Retro scanlines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%)',
        backgroundSize: '100% 4px',
        opacity: 0.3,
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: 580,
          background: 'var(--bg-glass)',
          border: '1.5px solid var(--window-border)',
          borderRadius: 20,
          boxShadow: 'var(--window-shadow)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Window Header */}
        <div style={{
          padding: '12px 18px',
          background: 'var(--window-title-bg)',
          borderBottom: '1px solid var(--window-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Title and Icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Terminal size={14} color="var(--text-muted)" />
            <span style={{ fontSize: 11, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              System Warn: Node Not Found
            </span>
          </div>

          {/* Window Buttons */}
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
          </div>
        </div>

        {/* Window Body */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Main Alert Info */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'rgba(239, 68, 68, 0.08)', border: '1.5px solid rgba(239, 68, 68, 0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <AlertTriangle size={24} color="#ef4444" />
            </div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.3px' }}>
                404: PATH_UNRESOLVED
              </h2>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.5 }}>
                The workstation query you entered does not point to a registered client route. The directory might have been renamed or archived.
              </p>
            </div>
          </div>

          {/* Terminal Console Panel */}
          <div style={{
            background: '#0f172a',
            borderRadius: 14,
            border: '1.5px solid rgba(255,255,255,0.05)',
            padding: '16px 20px',
            height: 180,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.4)',
          }}>
            {logs.map((log, idx) => (
              <div
                key={idx}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12.5,
                  color: log.startsWith('>') ? '#38bdf8' : (log.includes('HEALTHY') || log.includes('200 OK') ? '#22c55e' : (log.includes('Error') ? '#f87171' : '#cbd5e1')),
                  lineHeight: 1.5,
                }}
              >
                {log}
              </div>
            ))}
            <div ref={logEndRef} />
          </div>

          {/* Control Actions / Diagnostic Tools */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Select Action Routine
            </span>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button
                onClick={handlePing}
                disabled={diagnosing}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center',
                  padding: '10px 14px', borderRadius: 10, fontSize: 12, fontWeight: 700,
                  background: 'var(--bg-surface)', border: '1px solid var(--window-border)',
                  color: 'var(--text-secondary)', cursor: 'pointer',
                  opacity: diagnosing ? 0.5 : 1, transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if(!diagnosing) { e.currentTarget.style.borderColor = 'var(--blue-vivid)'; e.currentTarget.style.color = 'var(--blue-vivid)'; } }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--window-border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                <Activity size={13} />
                <span>Ping Mail Node</span>
              </button>

              <button
                onClick={handleDiagnose}
                disabled={diagnosing}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center',
                  padding: '10px 14px', borderRadius: 10, fontSize: 12, fontWeight: 700,
                  background: 'var(--bg-surface)', border: '1px solid var(--window-border)',
                  color: 'var(--text-secondary)', cursor: 'pointer',
                  opacity: diagnosing ? 0.5 : 1, transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if(!diagnosing) { e.currentTarget.style.borderColor = 'var(--pink-vivid)'; e.currentTarget.style.color = 'var(--pink-vivid)'; } }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--window-border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                <Wrench size={13} />
                <span>Run Diagnostic</span>
              </button>
            </div>

            <button
              onClick={handleReturn}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center',
                padding: '12px 18px', borderRadius: 10, fontSize: 13, fontWeight: 800,
                background: 'var(--blue-vivid)', border: 'none',
                color: '#ffffff', cursor: 'pointer', marginTop: 4,
                boxShadow: '0 4px 10px rgba(14, 165, 233, 0.2)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-bright)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--blue-vivid)'}
            >
              <ArrowLeft size={14} />
              <span>Return to Workstation</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
