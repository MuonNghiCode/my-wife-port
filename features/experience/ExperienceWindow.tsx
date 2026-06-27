'use client'
import { motion } from 'framer-motion'
import { EXPERIENCES } from '@/data/portfolio'
import { Building2 } from 'lucide-react'

export default function ExperienceWindow() {
  return (
    <div style={{ padding: '20px 24px', fontFamily: 'var(--font-ui)', height: '100%', overflowY: 'auto', background: 'transparent' }}>
      <div style={{ position: 'relative', paddingLeft: 28 }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute', left: 7, top: 12, bottom: 12,
          width: 1,
          background: 'var(--window-border)', /* Solid light gray path */
        }} />

        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12, type: 'spring', stiffness: 300, damping: 25 }}
            style={{ position: 'relative', marginBottom: 32 }}
          >
            {/* Dot */}
            <div style={{
              position: 'absolute', left: -32, top: 12,
              width: 14, height: 14, borderRadius: '50%',
              background: i === 0 ? 'var(--pink-vivid)' : 'var(--window-border)',
              border: `2px solid ${i === 0 ? 'var(--pink-bright)' : 'var(--bg-elevated)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 1,
            }} />

            {/* Card */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--window-border)',
              borderRadius: 12, padding: '16px 18px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            }}>
              {/* Period badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                fontFamily: 'var(--font-mono)', fontSize: 10,
                color: i === 0 ? 'var(--blue-vivid)' : 'var(--text-muted)',
                background: i === 0 ? 'var(--blue-soft)' : 'transparent',
                border: i === 0 ? '1px solid var(--blue-bright)' : 'none',
                padding: i === 0 ? '2px 8px' : '0',
                borderRadius: 99, marginBottom: 8,
                fontWeight: 600,
              }}>
                {i === 0 && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />}
                {exp.period}
                {i === 0 && ' · Current'}
              </div>

              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                {exp.role}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <Building2 size={13} color="var(--text-muted)" />
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>{exp.company}</span>
              </div>

              <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: 12 }}>
                {exp.description.map((d, di) => (
                  <li key={di} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
                    <div style={{
                      width: 4, height: 4, borderRadius: '50%', marginTop: 7,
                      background: '#ec4899', flexShrink: 0,
                    }} />
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{d}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {exp.technologies.map(t => (
                  <span key={t} style={{
                    fontSize: 10, padding: '2px 8px', borderRadius: 99,
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--window-border)',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
