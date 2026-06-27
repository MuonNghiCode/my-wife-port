'use client'
import { motion } from 'framer-motion'
import { CERTIFICATES } from '@/data/portfolio'
import { Award, ExternalLink } from 'lucide-react'

export default function CertificatesWindow() {
  return (
    <div style={{ padding: '20px 24px', fontFamily: 'var(--font-ui)', height: '100%', overflowY: 'auto', background: 'transparent' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 14,
      }}>
        {CERTIFICATES.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07, type: 'spring', stiffness: 400, damping: 25 }}
            whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(0,0,0,0.04), 0 0 0 1px #0ea5e9' }}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--window-border)',
              borderRadius: 12, padding: 16,
              cursor: 'none',
              transition: 'all 0.2s',
            }}
          >
            {/* Icon */}
            <div style={{
              width: 44, height: 44, borderRadius: 10, marginBottom: 12,
              background: i % 3 === 0 ? 'var(--blue-soft)' : i % 3 === 1 ? 'var(--pink-soft)' : 'var(--window-bg)', /* Solid pastels */
              border: `1px solid ${i % 3 === 0 ? 'var(--blue-bright)' : i % 3 === 1 ? 'var(--pink-bright)' : 'var(--window-border)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Award size={22} color={i % 3 === 0 ? 'var(--blue-vivid)' : i % 3 === 1 ? 'var(--pink-vivid)' : '#7c3aed'} />
            </div>

            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 6 }}>
              {cert.name}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, fontWeight: 500 }}>{cert.issuer}</div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginTop: 12,
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                color: 'var(--blue-vivid)', background: 'var(--blue-soft)',
                padding: '2px 7px', borderRadius: 99, border: '1px solid var(--blue-bright)',
                fontWeight: 600,
              }}>
                {cert.year}
              </span>
              {cert.verifyUrl && (
                <a href={cert.verifyUrl} target="_blank" rel="noreferrer" data-cursor="pointer"
                  style={{ color: 'var(--text-muted)', display: 'flex', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue-vivid)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
            {cert.credentialId && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#9ca3af', marginTop: 8, fontWeight: 500 }}>
                ID: {cert.credentialId}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
