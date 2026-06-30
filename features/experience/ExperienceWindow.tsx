'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Calendar, CheckCircle2 } from 'lucide-react'
import { playSynthSound } from '@/store/soundStore'

const CHAPTERS = [
  {
    id: 'e1',
    chapter: 1,
    companyAbbr: 'Chị Gái Tân Thời',
    role: 'Fanpage Manager',
    company: 'Chị Gái Tân Thời & Ăn Vặt Shin',
    period: '2022 — 2024',
    narrative: "During this period, I was mainly responsible for the brand's content and imagery on social media. From planning content, running seeding campaigns, and taking care of customers, to collaborating on promotional designs. This role helped me understand how to operate and build a community for a local brand.",
    description: [
      "Managed all social media channels of the brand, from brainstorming content ideas and planning the post schedule to interacting daily with followers.",
      "Ran seeding campaigns on local community groups to increase brand awareness and attract new customers to the shop.",
      "Collaborated closely with the designer to brainstorm ideas, ensuring all marketing materials like posters and banners matched the promotional campaigns.",
      "Handled customer inquiries and feedback online promptly to maintain a good brand reputation and build strong community relationships."
    ],
    technologies: ['Social Media Marketing', 'Community Management', 'Content Planning', 'Team Collaboration', 'Customer Engagement'],
    color: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.03)',
    border: 'rgba(139, 92, 246, 0.2)',
    badgeBg: 'rgba(139, 92, 246, 0.1)',
  },
  {
    id: 'e2',
    chapter: 2,
    companyAbbr: 'Viettel',
    role: 'SEO Intern',
    company: 'Viettel',
    period: '2025',
    narrative: "Learning and growing in a corporate environment. At Viettel, I focused on writing search-optimized articles for the travel and finance sectors. By researching keywords carefully and working with the design team for post images, I helped multiple articles reach the hot search pages and increase web traffic.",
    description: [
      "Wrote and optimized SEO articles for the travel and finance sectors, using keyword research to help the brand reach more readers on Google.",
      "Helped multiple articles reach the Top Search pages by creating clear content structures that answered user questions.",
      "Collaborated with the design team to plan and create relevant images for each article, ensuring the posts looked professional.",
      "Supported the team in checking keyword rankings and updating content to keep the website traffic growing steadily."
    ],
    technologies: ['SEO Content', 'Keyword Research', 'Hot Search', 'Travel & Finance Content', 'Team Collaboration'],
    color: '#eab308',
    bg: 'rgba(234, 179, 8, 0.03)',
    border: 'rgba(234, 179, 8, 0.2)',
    badgeBg: 'rgba(234, 179, 8, 0.1)',
  },
  {
    id: 'e3',
    chapter: 3,
    companyAbbr: 'CellphoneS',
    role: 'SEO Content Writer',
    company: 'CellphoneS',
    period: '2025 — Present',
    narrative: "Applying my skills in retail e-commerce. At CellphoneS, I wrote search-optimized articles about technology and finance. By understanding what users look for and designing the post images myself, many of my articles successfully reached Top Trending and Top Search, helping to increase website traffic.",
    description: [
      "Wrote SEO articles about technology and finance, using basic SEO keywords and tools to help the website get higher rankings on Google.",
      "Helped many articles reach the Top Trending and Top Search pages by choosing the right topics and structuring the content clearly.",
      "Increased organic traffic for targeted product groups by writing content that matched the store's sales and promotion campaigns.",
      "Directly designed and edited images for the articles to make the posts look clean, engaging, and easy for readers to follow."
    ],
    technologies: ['SEO Writing', 'Keyword Research', 'Making Post Images', 'Top Search', 'Tech & Finance Content'],
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
