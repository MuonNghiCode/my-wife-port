'use client'
import { motion } from 'framer-motion'
import { EDUCATION } from '@/data/portfolio'
import { GraduationCap, Star } from 'lucide-react'

export default function EducationWindow() {
  return (
    <div style={{ padding: '20px 24px', fontFamily: 'var(--font-ui)', height: '100%', overflowY: 'auto', background: 'transparent' }}>
      {EDUCATION.map((edu, i) => (
        <motion.div
          key={edu.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--window-border)',
            borderRadius: 16, padding: 24, marginBottom: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 16 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 12, flexShrink: 0,
              background: 'var(--blue-soft)', /* Solid pastel blue */
              border: '1px solid var(--blue-bright)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <GraduationCap size={24} color="var(--blue-vivid)" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                {edu.degree}
              </div>
              <div style={{ fontSize: 14, color: 'var(--blue-vivid)', fontWeight: 600, marginTop: 2 }}>
                {edu.field}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                {edu.institution} · {edu.period}
              </div>
            </div>
          </div>

          {/* GPA */}
          {edu.gpa && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'var(--gold-soft)', /* Solid yellow/gold tag */
              border: '1px solid #fde68a',
              borderRadius: 8, padding: '6px 12px', marginBottom: 16,
            }}>
              <Star size={13} color="var(--gold)" fill="var(--gold)" />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)' }}>GPA: {edu.gpa}</span>
            </div>
          )}

          {/* Activities */}
          {edu.activities && (
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, fontWeight: 700 }}>
                Activities & Achievements
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {edu.activities.map((act, ai) => (
                  <motion.div
                    key={ai}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + ai * 0.06 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '5px 12px', borderRadius: 99,
                      background: 'var(--pink-soft)', /* Solid pink tag */
                      border: '1px solid var(--pink-bright)',
                      fontSize: 12, color: 'var(--pink-vivid)',
                      fontWeight: 500,
                    }}
                  >
                    {act}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
