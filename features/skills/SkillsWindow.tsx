'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { SKILLS, SKILL_CATEGORIES_LABELS, SKILL_COLORS } from '@/data/portfolio'

type Category = 'frontend' | 'backend' | 'database' | 'cloud' | 'tools'

const CATEGORIES: Category[] = ['frontend', 'backend', 'database', 'cloud', 'tools']

function SkillBar({ name, level, color, index }: { name: string; level: number; color: string; index: number }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.style.width = `${level}%`
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [level])

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      style={{ marginBottom: 14 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 600, fontFamily: 'var(--font-ui)' }}>{name}</span>
        <span style={{
          fontSize: 10, fontFamily: 'var(--font-ui)', fontWeight: 600,
          color, background: `${color}18`,
          padding: '1px 7px', borderRadius: 99,
          border: `1px solid ${color}30`,
        }}>{level}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: 'var(--bg-elevated)', overflow: 'hidden' }}>
        <div
          ref={barRef}
          style={{
            height: '100%', width: 0, borderRadius: 99,
            background: color, /* Solid color skill bar */
            transition: 'width 1.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
      </div>
    </motion.div>
  )
}

export default function SkillsWindow() {
  return (
    <div style={{ padding: '24px 28px', fontFamily: 'var(--font-ui)', height: '100%', overflowY: 'auto', background: 'transparent' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 28 }}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
          What I do best
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Skills built over years of real campaigns and brand work.
        </div>
      </motion.div>

      {CATEGORIES.map((cat, ci) => {
        const skills = SKILLS.filter(s => s.category === cat)
        const color = SKILL_COLORS[cat]
        const label = SKILL_CATEGORIES_LABELS[cat]
        return (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.08 }}
            style={{ marginBottom: 28 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{
                width: 3, height: 18, borderRadius: 99,
                background: color,
              }} />
              <div style={{
                fontSize: 11, fontWeight: 700, color,
                textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>
                {label}
              </div>
              <div style={{ flex: 1, height: 1, background: 'var(--window-border)' }} />
            </div>
            <div style={{ paddingLeft: 11 }}>
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} color={color} index={i} />
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
