'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Calendar, CheckCircle2, Flame, Eye, X, ExternalLink } from 'lucide-react'
import { playSynthSound } from '@/store/soundStore'
import { useDesktopStore } from '@/store/desktopStore'
import { EXPERIENCES_VI } from '@/data/translations'

interface ChapterProof {
  badge: string
  title: string
  images: string[]
  links?: string[]
}

interface Chapter {
  id: string
  chapter: number
  companyAbbr: string
  role: string
  company: string
  period: string
  narrative: string
  description: string[]
  proof?: ChapterProof
  technologies: string[]
  color: string
  bg: string
  border: string
  badgeBg: string
}

const CHAPTERS_EN: Chapter[] = [
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
      "Produced SEO-optimized content focused on technology and consumer electronics, including smartphones, laptops and related products. Conducted topic research, developed content structures and created articles aligned with search intent and SEO requirements.",
      "Helped many articles reach the Top Trending and Top Search pages by choosing the right topics and structuring the content clearly.",
      "Increased organic traffic for targeted product groups by writing content that matched the store's sales and promotion campaigns.",
      "Directly designed and edited images for the articles to make the posts look clean, engaging, and easy for readers to follow."
    ],
    proof: {
      badge: 'TOP TRENDING',
      title: 'Selected SEO content reached Top Trending.',
      images: [
        '/images/cellphoneS/1.jpg',
        '/images/cellphoneS/2.jpg',
        '/images/cellphoneS/3.jpg',
        '/images/cellphoneS/4.jpg'
      ],
      links: [
        'https://cellphones.com.vn/macbook-air-13-m5-10-cpu-8-gpu-16gb-512gb.html',
        'https://cellphones.com.vn/macbook-neo-13-a18-pro-6-cpu-5-gpu-8gb-256gb.html',
        'https://cellphones.com.vn/macbook-pro-16-m5-max-18cpu-32-gpu-36gb-2tb.html',
        'https://cellphones.com.vn/do-choi-cong-nghe/dong-ho-dinh-vi-tre-em.html',
      ]
    },
    technologies: ['SEO Writing', 'Keyword Research', 'Making Post Images', 'Top Search', 'Tech & Finance Content'],
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.03)',
    border: 'rgba(239, 68, 68, 0.2)',
    badgeBg: 'rgba(239, 68, 68, 0.1)',
  }
]

const CHAPTERS_VI: Chapter[] = [
  {
    id: 'e1',
    chapter: 1,
    companyAbbr: EXPERIENCES_VI[0].companyAbbr,
    role: EXPERIENCES_VI[0].role,
    company: EXPERIENCES_VI[0].company,
    period: '2022 — 2024',
    narrative: EXPERIENCES_VI[0].narrative,
    description: EXPERIENCES_VI[0].description,
    technologies: ['Social Media Marketing', 'Community Management', 'Content Planning', 'Team Collaboration', 'Customer Engagement'],
    color: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.03)',
    border: 'rgba(139, 92, 246, 0.2)',
    badgeBg: 'rgba(139, 92, 246, 0.1)',
  },
  {
    id: 'e2',
    chapter: 2,
    companyAbbr: EXPERIENCES_VI[1].companyAbbr,
    role: EXPERIENCES_VI[1].role,
    company: EXPERIENCES_VI[1].company,
    period: '2025',
    narrative: EXPERIENCES_VI[1].narrative,
    description: EXPERIENCES_VI[1].description,
    technologies: ['SEO Content', 'Keyword Research', 'Hot Search', 'Travel & Finance Content', 'Team Collaboration'],
    color: '#eab308',
    bg: 'rgba(234, 179, 8, 0.03)',
    border: 'rgba(234, 179, 8, 0.2)',
    badgeBg: 'rgba(234, 179, 8, 0.1)',
  },
  {
    id: 'e3',
    chapter: 3,
    companyAbbr: EXPERIENCES_VI[2].companyAbbr,
    role: EXPERIENCES_VI[2].role,
    company: EXPERIENCES_VI[2].company,
    period: '2025 — Present',
    narrative: EXPERIENCES_VI[2].narrative,
    description: EXPERIENCES_VI[2].description,
    proof: EXPERIENCES_VI[2].proof,
    technologies: ['SEO Writing', 'Keyword Research', 'Making Post Images', 'Top Search', 'Tech & Finance Content'],
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.03)',
    border: 'rgba(239, 68, 68, 0.2)',
    badgeBg: 'rgba(239, 68, 68, 0.1)',
  }
]

export default function ExperienceWindow() {
  const { language } = useDesktopStore()
  const [activeIdx, setActiveIdx] = useState(2) // Default to latest (Chapter 3)
  const [selectedProofImg, setSelectedProofImg] = useState<string | null>(null)
  const [autoImages, setAutoImages] = useState<string[]>([])

  const chapters = language === 'vi' ? CHAPTERS_VI : CHAPTERS_EN
  const currentChapter = chapters[activeIdx]

  // Auto-fetch all images from /api/cellphones-images dynamically
  useEffect(() => {
    fetch('/api/cellphones-images')
      .then(res => res.json())
      .then(data => {
        if (data.images && data.images.length > 0) {
          setAutoImages(data.images)
        }
      })
      .catch(() => {})
  }, [])

  // Use dynamically loaded images if available for CellphoneS (e3)
  const displayProofImages = (currentChapter.id === 'e3' && autoImages.length > 0)
    ? autoImages
    : currentChapter.proof?.images || []

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
            key={`${language}-${currentChapter.chapter}`}
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
                  {currentChapter.period} {language === 'vi' ? 'Lộ trình' : 'Timeline'}
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
                {language === 'vi' ? 'Nhiệm vụ trọng tâm & Tác động' : 'Key Responsibilities & Impact'}
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

            {/* Proof / Evidence Showcase Card */}
            {currentChapter.proof && (
              <div style={{
                background: 'var(--bg-surface)',
                border: `1.5px solid ${currentChapter.color}40`,
                borderRadius: 16,
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                marginTop: 4,
                boxShadow: `0 4px 16px ${currentChapter.color}08`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Flame size={15} color={currentChapter.color} />
                    <span style={{
                      fontSize: 11,
                      fontWeight: 900,
                      color: currentChapter.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                      {currentChapter.proof.badge}
                    </span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
                    {language === 'vi' ? 'Bằng chứng thực tế' : 'Verified Evidence'}
                  </span>
                </div>

                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>
                  {currentChapter.proof.title}
                </p>

                {/* Dynamic Auto-Loaded Proof Images Grid */}
                {displayProofImages.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12, marginTop: 4 }}>
                    {displayProofImages.map((imgSrc, imgIdx) => {
                      const linkUrl = currentChapter.proof?.links?.[imgIdx]

                      return (
                        <div
                          key={imgIdx}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6,
                          }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.04, y: -2 }}
                            onClick={() => {
                              playSynthSound('click')
                              setSelectedProofImg(imgSrc)
                            }}
                            data-cursor="pointer"
                            style={{
                              width: '100%',
                              height: 95,
                              borderRadius: 12,
                              overflow: 'hidden',
                              border: `1.5px solid ${currentChapter.color}40`,
                              cursor: 'none',
                              position: 'relative',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                              background: '#000',
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={imgSrc}
                              alt={`Proof ${imgIdx + 1}`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(0,0,0,0.45)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 4,
                                color: '#ffffff',
                                fontSize: 11,
                                fontWeight: 700,
                                backdropFilter: 'blur(2px)',
                                transition: 'opacity 0.2s',
                                opacity: 0,
                              }}
                              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                              onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                            >
                              <Eye size={14} />
                              <span>{language === 'vi' ? 'Xem ảnh' : 'View Image'}</span>
                            </div>
                          </motion.div>

                          {linkUrl && (
                            <a
                              href={linkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-cursor="pointer"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 4,
                                fontSize: 10.5,
                                fontWeight: 700,
                                color: currentChapter.color,
                                textDecoration: 'none',
                                background: `${currentChapter.color}08`,
                                border: `1px solid ${currentChapter.color}30`,
                                padding: '4px 6px',
                                borderRadius: 8,
                                transition: 'all 0.2s',
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = `${currentChapter.color}20`}
                              onMouseLeave={e => e.currentTarget.style.background = `${currentChapter.color}08`}
                            >
                              <span>{language === 'vi' ? 'Xem bài viết' : 'Open Link'}</span>
                              <ExternalLink size={10} />
                            </a>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Dedicated External Live Articles Links Section */}
                {currentChapter.proof.links && currentChapter.proof.links.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8, paddingTop: 12, borderTop: '1px dashed var(--window-border)' }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {language === 'vi' ? 'Liên kết bài viết thực tế (Live Links)' : 'Live Article Links'}
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {currentChapter.proof.links.map((linkUrl, lIdx) => {
                        const slug = linkUrl.split('/').pop()?.replace('.html', '') || linkUrl
                        const cleanTitle = slug
                          .split('-')
                          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                          .join(' ')

                        return (
                          <a
                            key={lIdx}
                            href={linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="pointer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: 10,
                              padding: '8px 12px',
                              borderRadius: 10,
                              background: 'var(--bg-glass)',
                              border: '1px solid var(--window-border)',
                              color: 'var(--text-primary)',
                              fontSize: 12,
                              fontWeight: 600,
                              textDecoration: 'none',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.borderColor = currentChapter.color
                              e.currentTarget.style.color = currentChapter.color
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.borderColor = 'var(--window-border)'
                              e.currentTarget.style.color = 'var(--text-primary)'
                            }}
                          >
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {lIdx + 1}. {cleanTitle}
                            </span>
                            <ExternalLink size={13} style={{ flexShrink: 0 }} />
                          </a>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

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
        {chapters.map((ch, idx) => {
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

      {/* Lightbox Modal for Proof Images */}
      <AnimatePresence>
        {selectedProofImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProofImg(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '85vh',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                background: '#000',
                border: '1.5px solid var(--window-border)',
              }}
            >
              <button
                onClick={() => setSelectedProofImg(null)}
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'none',
                  zIndex: 10,
                }}
              >
                <X size={18} />
              </button>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedProofImg}
                alt="Proof Evidence Full"
                style={{
                  maxWidth: '100%',
                  maxHeight: '85vh',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
