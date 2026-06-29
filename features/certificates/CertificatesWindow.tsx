'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CERTIFICATES } from '@/data/portfolio'
import { Award, ExternalLink, ShieldCheck, Languages, GraduationCap, Calendar } from 'lucide-react'
import { playSynthSound } from '@/store/soundStore'

export default function CertificatesWindow() {
  const [filter, setFilter] = useState<'all' | 'specialization' | 'language'>('all')

  // Sort certificates by year descending (2025 then 2024)
  const sortedCerts = [...CERTIFICATES].sort((a, b) => parseInt(b.year) - parseInt(a.year))

  // Filter certificates
  const filteredCerts = sortedCerts.filter(cert => {
    if (filter === 'all') return true
    const isLanguage = cert.name.toLowerCase().includes('toeic') || cert.name.toLowerCase().includes('hsk')
    if (filter === 'specialization') return !isLanguage
    if (filter === 'language') return isLanguage
    return true
  })

  return (
    <div className="certificates-container" style={{
      display: 'flex',
      gap: 24,
      height: '100%',
      fontFamily: 'var(--font-ui)',
      background: 'transparent',
      padding: 24,
    }}>
      {/* Left Panel: Verification Overview Card */}
      <div className="certificates-sidebar" style={{
        width: 280,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        flexShrink: 0,
      }}>
        <div style={{
          background: 'var(--bg-glass)',
          border: '1.5px solid var(--window-border)',
          borderRadius: 24,
          padding: 24,
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 14,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: 20,
            background: 'rgba(14, 165, 233, 0.08)',
            border: '1.5px solid rgba(14, 165, 233, 0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 16px rgba(14, 165, 233, 0.1)',
          }}>
            <Award size={32} color="var(--blue-vivid)" />
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Credential Verification
            </h3>
            <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.4 }}>
              All professional specializations and language certifications have been officially verified.
            </p>
          </div>

          <div style={{ width: '100%', height: 1, background: 'var(--window-border)' }} />

          {/* Stats / Interactive Filters */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Total Credentials Filter */}
            <motion.button
              onClick={() => { playSynthSound('click'); setFilter('all') }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="pointer"
              style={{
                width: '100%',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: filter === 'all' ? 'var(--blue-soft)' : 'var(--bg-surface)',
                padding: '12px 16px', borderRadius: 14,
                border: `1.5px solid ${filter === 'all' ? 'var(--blue-vivid)' : 'var(--window-border)'}`,
                cursor: 'none',
                boxShadow: filter === 'all' ? '0 4px 12px rgba(14, 165, 233, 0.15)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: 12.5, fontWeight: 700, color: filter === 'all' ? 'var(--blue-vivid)' : 'var(--text-secondary)' }}>Total Credentials</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--blue-vivid)' }}>7</span>
            </motion.button>

            {/* Specializations Filter */}
            <motion.button
              onClick={() => { playSynthSound('click'); setFilter('specialization') }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="pointer"
              style={{
                width: '100%',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: filter === 'specialization' ? 'var(--orange-soft)' : 'var(--bg-surface)',
                padding: '12px 16px', borderRadius: 14,
                border: `1.5px solid ${filter === 'specialization' ? 'var(--orange-vivid)' : 'var(--window-border)'}`,
                cursor: 'none',
                boxShadow: filter === 'specialization' ? '0 4px 12px rgba(249, 115, 22, 0.15)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: 12.5, fontWeight: 700, color: filter === 'specialization' ? 'var(--orange-vivid)' : 'var(--text-secondary)' }}>Specializations</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--orange-vivid)' }}>5</span>
            </motion.button>

            {/* Languages Filter */}
            <motion.button
              onClick={() => { playSynthSound('click'); setFilter('language') }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="pointer"
              style={{
                width: '100%',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: filter === 'language' ? 'var(--pink-soft)' : 'var(--bg-surface)',
                padding: '12px 16px', borderRadius: 14,
                border: `1.5px solid ${filter === 'language' ? 'var(--pink-vivid)' : 'var(--window-border)'}`,
                cursor: 'none',
                boxShadow: filter === 'language' ? '0 4px 12px rgba(236, 72, 153, 0.15)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: 12.5, fontWeight: 700, color: filter === 'language' ? 'var(--pink-vivid)' : 'var(--text-secondary)' }}>Languages</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--pink-vivid)' }}>2</span>
            </motion.button>
          </div>

          <div style={{ width: '100%', height: 1, background: 'var(--window-border)' }} />

          {/* Verification Badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 11.5, fontWeight: 700, color: '#10b981',
            background: 'rgba(16, 185, 129, 0.08)',
            padding: '8px 14px', borderRadius: 10,
            border: '1px solid rgba(16, 185, 129, 0.2)',
            width: '100%', justifyContent: 'center',
          }}>
            <ShieldCheck size={14} />
            <span>Verified digital records</span>
          </div>
        </div>
      </div>

      {/* Right Panel: Scrollable Vertical Timeline */}
      <div style={{
        flex: 1,
        height: '100%',
        overflowY: 'auto',
        position: 'relative',
        paddingLeft: 20,
        paddingBottom: 24,
      }}>
        {/* Vertical Timeline Line */}
        <div style={{
          position: 'absolute',
          left: 6,
          top: 8,
          bottom: 24,
          width: 2,
          borderLeft: '2px dashed var(--window-border)',
          pointerEvents: 'none',
        }} />

        {/* Timeline items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {filteredCerts.map((cert, idx) => {
            const isLanguage = cert.name.toLowerCase().includes('toeic') || cert.name.toLowerCase().includes('hsk')
            const colorTheme = isLanguage ? 'var(--pink-vivid)' : 'var(--blue-vivid)'
            const softBg = isLanguage ? 'var(--pink-soft)' : 'var(--blue-soft)'
            const borderTheme = isLanguage ? 'var(--pink-bright)' : 'var(--blue-bright)'

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08, type: 'spring', stiffness: 350, damping: 25 }}
                style={{
                  position: 'relative',
                  paddingLeft: 20,
                }}
              >
                {/* Timeline Node Dot */}
                <div style={{
                  position: 'absolute',
                  left: -19,
                  top: 24,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: colorTheme,
                  border: '2px solid var(--window-bg)',
                  boxShadow: `0 0 8px ${colorTheme}`,
                }} />

                {/* Certificate Card */}
                <motion.div
                  whileHover={{ y: -3, boxShadow: `0 10px 25px rgba(0,0,0,0.03), 0 0 0 1.5px ${colorTheme}` }}
                  style={{
                    background: 'var(--bg-glass)',
                    border: '1.5px solid var(--window-border)',
                    borderRadius: 20,
                    padding: 20,
                    backdropFilter: 'blur(20px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    cursor: 'none',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                  }}
                >
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    {/* Icon */}
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                      background: softBg,
                      border: `1px solid ${borderTheme}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {isLanguage ? (
                        <Languages size={20} color={colorTheme} />
                      ) : (
                        <GraduationCap size={20} color={colorTheme} />
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 14.5, fontWeight: 800,
                        color: 'var(--text-primary)', lineHeight: 1.35,
                      }}>
                        {cert.name}
                      </div>
                      <div style={{
                        fontSize: 12.5, color: 'var(--text-secondary)',
                        marginTop: 4, fontWeight: 600,
                      }}>
                        {cert.issuer}
                      </div>
                    </div>
                  </div>

                  {/* Footer block: Year Badge + Verify button */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid var(--window-border)',
                    paddingTop: 12,
                    marginTop: 4,
                  }}>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      fontSize: 11, fontWeight: 700, color: 'var(--text-muted)',
                    }}>
                      <Calendar size={12} />
                      <span>Issued in {cert.year}</span>
                    </span>

                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="pointer"
                        style={{
                          display: 'flex', alignItems: 'center', gap: 5,
                          fontSize: 11.5, fontWeight: 700,
                          color: colorTheme,
                          textDecoration: 'none',
                          padding: '5px 12px',
                          borderRadius: 8,
                          background: softBg,
                          border: `1px solid ${borderTheme}`,
                          cursor: 'none',
                          transition: 'opacity 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                      >
                        <ExternalLink size={12} />
                        <span>Verify Credentials</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* CSS Styles for responsive stacking */}
      <style>{`
        @media (max-width: 680px) {
          .certificates-container {
            flex-direction: column !important;
            overflow-y: auto !important;
          }
          .certificates-sidebar {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  )
}
