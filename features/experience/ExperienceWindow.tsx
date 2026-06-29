'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Calendar, CheckCircle2 } from 'lucide-react'
import { playSynthSound } from '@/store/soundStore'

const CHAPTERS = [
  {
    id: 'e3',
    chapter: 1,
    companyAbbr: 'FPT Projects',
    role: 'Project Manager & Content Creator',
    company: 'Freelance & FPT Projects',
    period: '2022 — 2025',
    narrative: "Every journey begins with a spark of initiative. Between 2022 and 2025, I laid my professional foundation by managing FPT community projects like 'Tâm Giới' and executing local seeding campaigns. This chapter was defined by learning project management from the ground up, writing engaging copy, and understanding how to engage local audiences.",
    description: [
      'Led the "Tâm Giới" project, organizing a highly successful community event for over 100 participants',
      'Managed social media channels and executed digital seeding strategies for local restaurant brands',
      'Began professional journey writing engaging copy and articles for lifestyle and digital clients',
    ],
    technologies: ['Project Management', 'Fanpage Management', 'Seeding Campaigns', 'Copywriting'],
    color: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.03)',
    border: 'rgba(139, 92, 246, 0.2)',
    badgeBg: 'rgba(139, 92, 246, 0.1)',
  },
  {
    id: 'e2',
    chapter: 2,
    companyAbbr: 'Viettel Group',
    role: 'SEO Intern',
    company: 'Viettel Group',
    period: '2025',
    narrative: "Entering a major telecommunications enterprise marked a significant step forward. At Viettel, I transitioned into technical digital marketing, focusing on keyword research, competitor analysis, and on-page optimization. Working inside a massive system taught me the value of data-driven decisions and enterprise-grade SEO tools.",
    description: [
      'Conducted keyword research and competitive analysis for telecom and digital services',
      'Optimized on-page SEO components including meta-data, heading structures, and internal links',
      'Monitored website traffic metrics and keyword rankings using Google Search Console',
    ],
    technologies: ['On-page SEO', 'Google Search Console', 'Competitor Analysis', 'Telecom Marketing'],
    color: '#eab308',
    bg: 'rgba(234, 179, 8, 0.03)',
    border: 'rgba(234, 179, 8, 0.2)',
    badgeBg: 'rgba(234, 179, 8, 0.1)',
  },
  {
    id: 'e1',
    chapter: 3,
    companyAbbr: 'CellphoneS',
    role: 'SEO Content Writer',
    company: 'CellphoneS',
    period: '2025 — 2026',
    narrative: "Applying my skills at scale in retail e-commerce. At CellphoneS, I authored search-optimized technology and finance articles. Collaborating closely with design and media teams, I learned to align search intent with active retail promotions, driving measurable organic traffic growth.",
    description: [
      'Authored search-optimized technology and finance articles, mastering advanced SEO and analytics tools',
      'Increased organic traffic to target retail product categories through high-intent keyword positioning',
      'Collaborated with media and design teams to align content with CellphoneS campaign promotions',
    ],
    technologies: ['SEO Writing', 'Keyword Research', 'Google Analytics', 'Tech & Finance Content'],
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.03)',
    border: 'rgba(239, 68, 68, 0.2)',
    badgeBg: 'rgba(239, 68, 68, 0.1)',
  }
]

export default function ExperienceWindow() {
  const [activeIdx, setActiveIdx] = useState(2) // Default to latest (Chapter 3)
  const currentChapter = CHAPTERS[activeIdx]

  return (
    <div style={{
      padding: '24px 28px',
      fontFamily: 'var(--font-ui)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      background: 'transparent',
      overflow: 'hidden',
    }}>
      {/* Main Chapter Showcase Card */}
      <div style={{
        flex: 1,
        minHeight: 340,
        position: 'relative',
        display: 'flex',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter.chapter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{
              width: '100%',
              background: 'var(--bg-glass)',
              border: `1.5px solid ${currentChapter.color}35`,
              borderRadius: 24,
              boxShadow: `0 12px 30px rgba(0,0,0,0.03), 0 0 20px ${currentChapter.color}05`,
              backdropFilter: 'blur(20px)',
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              overflowY: 'auto',
            }}
          >
            {/* Header section inside card: Year, Title, Company */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <span style={{
                  fontSize: 11,
                  fontWeight: 900,
                  color: currentChapter.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}>
                  {currentChapter.period} Timeline
                </span>
                <h2 style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  margin: '6px 0 0 0',
                  lineHeight: 1.25,
                }}>
                  {currentChapter.role}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                  <Building2 size={14} color="var(--text-muted)" />
                  <span style={{ fontSize: 13.5, color: 'var(--text-secondary)', fontWeight: 600 }}>{currentChapter.company}</span>
                </div>
              </div>

              {/* Period Badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 12, fontWeight: 800, color: currentChapter.color,
                background: currentChapter.badgeBg,
                border: `1px solid ${currentChapter.color}35`,
                padding: '6px 14px', borderRadius: 10,
              }}>
                <Calendar size={13} />
                <span>{currentChapter.period}</span>
              </div>
            </div>

            {/* Narrative Story Quote Banner */}
            <div style={{
              background: `${currentChapter.color}06`,
              borderLeft: `4px solid ${currentChapter.color}`,
              padding: '16px 20px',
              borderRadius: '0 16px 16px 0',
              fontStyle: 'italic',
              fontSize: 13.5,
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              margin: '6px 0',
            }}>
              &ldquo;{currentChapter.narrative}&rdquo;
            </div>

            {/* Achievements Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <h4 style={{
                fontSize: 11,
                fontWeight: 900,
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: 0,
              }}>
                Key Responsibilities & Impact
              </h4>
              <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {currentChapter.description.map((d, di) => (
                  <li key={di} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <CheckCircle2 size={15} color={currentChapter.color} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies Footer inside card */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              borderTop: '1.5px solid var(--window-border)',
              paddingTop: 16,
              marginTop: 'auto',
            }}>
              {currentChapter.technologies.map(t => (
                <span key={t} style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 8,
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--window-border)',
                  color: 'var(--text-secondary)',
                }}>{t}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Row: Minimalist Chapter Tab Switcher */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        flexShrink: 0,
        paddingTop: 4,
      }}>
        {CHAPTERS.map((ch, idx) => {
          const isActive = activeIdx === idx
          const textActiveColor = isActive ? ch.color : 'var(--text-secondary)'

          return (
            <motion.button
              key={ch.chapter}
              onClick={() => {
                playSynthSound('click')
                setActiveIdx(idx)
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="pointer"
              style={{
                background: isActive ? ch.bg : 'var(--bg-glass)',
                border: `1.5px solid ${isActive ? ch.color : 'var(--window-border)'}`,
                borderRadius: 16,
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                cursor: 'none',
                boxShadow: isActive ? `0 4px 14px ${ch.color}15` : 'none',
                transition: 'border-color 0.25s, background-color 0.25s, box-shadow 0.25s',
              }}
            >
              <span style={{
                fontSize: 10,
                fontWeight: 900,
                color: isActive ? ch.color : 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {ch.period}
              </span>
              <span style={{
                fontSize: 12,
                fontWeight: 800,
                color: textActiveColor,
                marginTop: 2,
              }}>
                {ch.companyAbbr}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
