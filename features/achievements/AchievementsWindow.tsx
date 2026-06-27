'use client'
import { motion } from 'framer-motion'
import { ACHIEVEMENTS } from '@/data/portfolio'
import { Trophy, Medal, Star, Mic } from 'lucide-react'

const ICONS = [Trophy, Medal, Star, Mic]

export default function AchievementsWindow() {
  return (
    <div style={{ padding: '20px 24px', fontFamily: 'var(--font-ui)', height: '100%', overflowY: 'auto', background: 'transparent' }}>
      {ACHIEVEMENTS.map((ach, i) => {
        const Icon = ICONS[i % ICONS.length]
        const colors = ['var(--blue-vivid)', 'var(--pink-vivid)', 'var(--lavender-bright)', 'var(--gold)']
        const bgColors = ['var(--blue-soft)', 'var(--pink-soft)', 'var(--lavender)', 'var(--gold-soft)']
        const borderColors = ['var(--blue-bright)', 'var(--pink-bright)', 'var(--lavender)', 'var(--gold-soft)']
        
        const color = colors[i % colors.length]
        const bgColor = bgColors[i % bgColors.length]
        const borderColor = borderColors[i % borderColors.length]

        return (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 25 }}
            whileHover={{ x: 4 }}
            style={{
              display: 'flex', gap: 16, alignItems: 'flex-start',
              padding: '16px 18px', borderRadius: 12, marginBottom: 12,
              background: 'var(--bg-surface)',
              border: '1px solid var(--window-border)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = color)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--window-border)')}
          >
            {/* Icon */}
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: bgColor,
              border: `1px solid ${borderColor}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={22} color={color} />
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3, flex: 1, marginRight: 12 }}>
                  {ach.title}
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, color,
                  background: bgColor, border: `1px solid ${borderColor}`,
                  padding: '2px 8px', borderRadius: 99, flexShrink: 0,
                  fontWeight: 600,
                }}>
                  {ach.year}
                </span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {ach.description}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
