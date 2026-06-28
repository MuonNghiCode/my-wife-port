'use client'
import { motion } from 'framer-motion'
import { CERTIFICATES } from '@/data/portfolio'
import { Award, ExternalLink, Globe, BookOpen, Languages } from 'lucide-react'

export default function CertificatesWindow() {
  const languageCerts = CERTIFICATES.filter(c => {
    const n = c.name.toLowerCase()
    return n.includes('toeic') || n.includes('hsk') || n.includes('ielts')
  })
  const specCerts = CERTIFICATES.filter(c => {
    const n = c.name.toLowerCase()
    return !(n.includes('toeic') || n.includes('hsk') || n.includes('ielts'))
  })

  return (
    <div style={{
      padding: 24,
      fontFamily: 'var(--font-ui)',
      height: '100%',
      overflowY: 'auto',
      background: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
    }}>
      {/* Language Proficiency Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <Globe size={16} color="var(--pink-vivid)" />
          <h3 style={{
            fontSize: 12, fontWeight: 800, color: 'var(--pink-vivid)',
            textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0,
          }}>
            Language Proficiency
          </h3>
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {languageCerts.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 350, damping: 25 }}
              whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.04), 0 0 0 1.5px var(--pink-vivid)' }}
              style={{
                flex: '1 1 220px',
                background: 'var(--bg-glass)',
                border: '1.5px solid var(--window-border)',
                borderRadius: 18,
                padding: 20,
                cursor: 'none',
                backdropFilter: 'blur(16px)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                background: 'var(--pink-soft)',
                border: '1px solid var(--pink-bright)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Languages size={22} color="var(--pink-vivid)" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                  {cert.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2, fontWeight: 500 }}>
                  {cert.issuer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Professional Specializations Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <BookOpen size={16} color="var(--blue-vivid)" />
          <h3 style={{
            fontSize: 12, fontWeight: 800, color: 'var(--blue-vivid)',
            textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0,
          }}>
            Professional Specializations
          </h3>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 14,
        }}>
          {specCerts.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, type: 'spring', stiffness: 350, damping: 25 }}
              whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.04), 0 0 0 1.5px var(--blue-vivid)' }}
              style={{
                background: 'var(--bg-glass)',
                border: '1.5px solid var(--window-border)',
                borderRadius: 18,
                padding: 20,
                cursor: 'none',
                backdropFilter: 'blur(16px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {/* Top Row */}
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: 'var(--blue-soft)',
                  border: '1px solid var(--blue-bright)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Award size={20} color="var(--blue-vivid)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                    {cert.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3, fontWeight: 500 }}>
                    {cert.issuer}
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderTop: '1px solid var(--window-border)',
                paddingTop: 12,
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: 'var(--blue-vivid)', background: 'var(--blue-soft)',
                  padding: '3px 10px', borderRadius: 99, border: '1px solid var(--blue-bright)',
                  fontWeight: 700,
                }}>
                  {cert.year}
                </span>
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="pointer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      fontSize: 11, fontWeight: 700,
                      color: 'var(--blue-vivid)',
                      textDecoration: 'none',
                      padding: '4px 10px',
                      borderRadius: 8,
                      background: 'var(--blue-soft)',
                      border: '1px solid var(--blue-bright)',
                      cursor: 'none',
                    }}
                  >
                    <ExternalLink size={11} />
                    <span>Verify</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
