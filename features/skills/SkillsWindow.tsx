'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

import { CheckCircle2, TrendingUp, Search, PenTool, Laptop, Globe, Star } from 'lucide-react'

type Category = 'frontend' | 'backend' | 'database' | 'cloud' | 'tools'
const CATEGORIES: Category[] = ['frontend', 'backend', 'database', 'cloud', 'tools']

const CONSTELLATION_DATA: Record<Category, {
  label: string
  color: string
  x: string
  y: string
  skills: Array<{ label: string; x: string; y: string }>
}> = {
  frontend: {
    label: 'Strategic Planning',
    color: 'var(--orange-vivid)',
    x: '28%', y: '28%',
    skills: [
      { label: 'Strategic Planning', x: '12%', y: '16%' },
      { label: 'Project & Event Management', x: '15%', y: '42%' },
      { label: 'Brand & Visual Identity', x: '36%', y: '16%' }
    ]
  },
  backend: {
    label: 'SEO & Content Marketing',
    color: 'var(--blue-vivid)',
    x: '72%', y: '28%',
    skills: [
      { label: 'SEO Content Writing', x: '58%', y: '16%' },
      { label: 'Social Media Management', x: '88%', y: '16%' },
      { label: 'Community Engagement & Seeding', x: '60%', y: '42%' },
      { label: 'On-page Optimization & SEO Tools', x: '86%', y: '42%' }
    ]
  },
  database: {
    label: 'Design & Design Thinking',
    color: 'var(--pink-vivid)',
    x: '50%', y: '56%',
    skills: [
      { label: 'UI / UX Design', x: '35%', y: '68%' },
      { label: 'Graphic & Print Design', x: '65%', y: '68%' }
    ]
  },
  cloud: {
    label: 'Tools & Analytics',
    color: '#10b981',
    x: '24%', y: '72%',
    skills: [
      { label: 'Canva / Microsoft PowerPoint', x: '10%', y: '84%' },
      { label: 'Office Productivity (Word/Excel)', x: '38%', y: '84%' }
    ]
  },
  tools: {
    label: 'Languages & Interpersonal',
    color: '#8b5cf6',
    x: '76%', y: '72%',
    skills: [
      { label: 'Customer & Community Relations', x: '58%', y: '84%' },
      { label: 'Foreign Languages (English & Chinese)', x: '88%', y: '84%' }
    ]
  }
}

export default function SkillsWindow() {
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null)

  const getCategoryIcon = (cat: Category, color: string) => {
    const size = 16
    switch (cat) {
      case 'frontend': return <TrendingUp size={size} color={color} />
      case 'backend': return <Search size={size} color={color} />
      case 'database': return <PenTool size={size} color={color} />
      case 'cloud': return <Laptop size={size} color={color} />
      case 'tools': return <Globe size={size} color={color} />
    }
  }

  return (
    <div style={{
      padding: '24px 28px',
      fontFamily: 'var(--font-ui)',
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
      background: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>


      {/* Main Interactive Canvas Area */}
      <div className="constellation-canvas-wrapper" style={{
        flex: 1,
        position: 'relative',
        minHeight: 460,
        marginTop: 16,
        borderRadius: 20,
        background: 'rgba(255, 255, 255, 0.01)',
        overflow: 'hidden',
      }}>
        {/* Background Constellation Lines (SVG) */}
        <svg style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}>
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Central Star to Categories Connections */}
          {CATEGORIES.map((cat) => {
            const catData = CONSTELLATION_DATA[cat]
            const isHighlighted = hoveredCategory === null || hoveredCategory === cat
            const color = isHighlighted ? catData.color : 'var(--window-border)'
            const opacity = hoveredCategory === cat ? 0.8 : hoveredCategory === null ? 0.35 : 0.1

            return (
              <line
                key={`center-${cat}`}
                x1="50%" y1="8%"
                x2={catData.x} y2={catData.y}
                stroke={color}
                strokeWidth={hoveredCategory === cat ? 2 : 1.2}
                className={hoveredCategory === cat ? "constellation-line-active" : "constellation-line"}
                style={{
                  opacity,
                  transition: 'stroke 0.3s, stroke-width 0.3s, opacity 0.3s',
                }}
                filter={hoveredCategory === cat ? "url(#glow)" : undefined}
              />
            )
          })}

          {/* Categories to Skills Connections */}
          {CATEGORIES.map((cat) => {
            const catData = CONSTELLATION_DATA[cat]
            return catData.skills.map((skill, si) => {
              const isHighlighted = hoveredCategory === null || hoveredCategory === cat
              const color = isHighlighted ? catData.color : 'var(--window-border)'
              const opacity = hoveredCategory === cat ? 0.85 : hoveredCategory === null ? 0.4 : 0.08

              return (
                <line
                  key={`line-${cat}-${si}`}
                  x1={catData.x} y1={catData.y}
                  x2={skill.x} y2={skill.y}
                  stroke={color}
                  strokeWidth={hoveredCategory === cat ? 2.2 : 1.2}
                  className={hoveredCategory === cat ? "constellation-line-active" : "constellation-line"}
                  style={{
                    opacity,
                    transition: 'stroke 0.3s, stroke-width 0.3s, opacity 0.3s',
                  }}
                  filter={hoveredCategory === cat ? "url(#glow)" : undefined}
                />
              )
            })
          })}
        </svg>

        {/* Nodes Layer */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          {/* Central Anchor Node (Precisely centered without vertical layout offsets) */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '8%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--orange-vivid)',
              boxShadow: '0 0 20px var(--orange-vivid)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2.5px solid #ffffff',
            }}>
              <Star size={14} color="#ffffff" fill="#ffffff" />
            </div>
            <span style={{
              position: 'absolute',
              top: 38,
              fontSize: 10.5, fontWeight: 800, color: 'var(--text-primary)',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              background: 'var(--bg-glass)', padding: '2px 8px', borderRadius: 6,
              border: '1px solid var(--window-border)',
              whiteSpace: 'nowrap',
            }}>
              Core
            </span>
          </div>

          {/* Render Category Nodes (Static positioning for pixel-perfect line alignment) */}
          {CATEGORIES.map((cat) => {
            const catData = CONSTELLATION_DATA[cat]
            const isHighlighted = hoveredCategory === null || hoveredCategory === cat
            const opacity = hoveredCategory === cat ? 1 : hoveredCategory === null ? 0.95 : 0.35

            return (
              <div
                key={`cat-${cat}`}
                onMouseEnter={() => setHoveredCategory(cat)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{
                  position: 'absolute',
                  left: catData.x,
                  top: catData.y,
                  transform: 'translate(-50%, -50%)',
                  zIndex: hoveredCategory === cat ? 10 : 5,
                  opacity,
                  transition: 'opacity 0.3s',
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{
                    background: 'var(--bg-surface)',
                    border: `1.5px solid ${isHighlighted ? catData.color : 'var(--window-border)'}`,
                    borderRadius: 16,
                    padding: '8px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: hoveredCategory === cat
                      ? `0 10px 24px rgba(0,0,0,0.05), 0 0 15px ${catData.color}20`
                      : 'var(--window-shadow)',
                    cursor: 'default',
                    whiteSpace: 'nowrap',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}
                >
                  <div style={{
                    width: 24, height: 24, borderRadius: 8,
                    background: `${catData.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {getCategoryIcon(cat, catData.color)}
                  </div>
                  <span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--text-primary)' }}>
                    {catData.label}
                  </span>
                </motion.div>
              </div>
            )
          })}

          {/* Render Skill Nodes (Static positioning for pixel-perfect line alignment) */}
          {CATEGORIES.map((cat) => {
            const catData = CONSTELLATION_DATA[cat]
            return catData.skills.map((skill) => {
              const skillIsHighlighted = hoveredCategory === null || hoveredCategory === cat
              const skillOpacity = hoveredCategory === cat ? 1 : hoveredCategory === null ? 0.9 : 0.15

              return (
                <div
                  key={`skill-${skill.label}`}
                  style={{
                    position: 'absolute',
                    left: skill.x,
                    top: skill.y,
                    transform: 'translate(-50%, -50%)',
                    zIndex: hoveredCategory === cat ? 8 : 4,
                    opacity: skillOpacity,
                    transition: 'opacity 0.3s',
                    pointerEvents: hoveredCategory === cat ? 'auto' : 'none',
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    style={{
                      background: 'var(--bg-glass)',
                      border: `1px solid ${skillIsHighlighted ? catData.color : 'var(--window-border)'}`,
                      borderRadius: 99,
                      padding: '6px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      whiteSpace: 'nowrap',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                    }}
                  >
                    <CheckCircle2 size={12} color={catData.color} />
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-secondary)' }}>
                      {skill.label}
                    </span>
                  </motion.div>
                </div>
              )
            })
          })}
        </div>
      </div>

      {/* Fallback CSS for mobile layouts to guarantee clean stack instead of constellations */}
      <style>{`
        @keyframes line-flow {
          to {
            stroke-dashoffset: -20;
          }
        }
        .constellation-line {
          stroke-dasharray: 6, 6;
          animation: line-flow 2.5s linear infinite;
        }
        .constellation-line-active {
          stroke-dasharray: 6, 6;
          animation: line-flow 1.2s linear infinite;
        }
        @media (max-width: 768px) {
          .constellation-canvas-wrapper {
            display: none !important;
          }
          .expertise-mobile-list {
            display: flex !important;
            flex-direction: column;
            gap: 16px;
            margin-top: 16px;
          }
        }
        .expertise-mobile-list {
          display: none;
        }
      `}</style>

      {/* Mobile Stack fallback (only visible on mobile width) */}
      <div className="expertise-mobile-list">
        {CATEGORIES.map((cat) => {
          const catData = CONSTELLATION_DATA[cat]
          return (
            <div key={cat} style={{
              background: 'var(--bg-glass)',
              border: '1.5px solid var(--window-border)',
              borderRadius: 18,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--window-border)', paddingBottom: 8 }}>
                {getCategoryIcon(cat, catData.color)}
                <h3 style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{catData.label}</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {catData.skills.map((skill) => (
                  <div key={skill.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: 'var(--text-secondary)', fontWeight: 600 }}>
                    <CheckCircle2 size={13} color={catData.color} />
                    <span>{skill.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
