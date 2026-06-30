'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PROJECTS } from '@/data/portfolio'
import { ArrowLeft, Layers, Image as ImageIcon, Maximize2 } from 'lucide-react'
import { playSynthSound } from '@/store/soundStore'

type Category = 'all' | 'campaign' | 'strategy' | 'event'
const CATEGORY_LABELS: Record<Category, string> = {
  all: 'All Projects',
  campaign: 'Integrated Campaigns',
  strategy: 'Brand Strategy',
  event: 'Event Management',
}

interface BrandStyle {
  gradient: string
  borderColor: string
  badgeColor: string
  badgeBg: string
}

const BRAND_STYLES: Record<string, BrandStyle> = {
  p1: { // Heineken
    gradient: 'linear-gradient(to top, rgba(4, 106, 56, 0.98) 25%, rgba(4, 106, 56, 0.6) 75%, rgba(4, 106, 56, 0.2) 100%)',
    borderColor: '#00b060',
    badgeColor: '#00b060',
    badgeBg: 'rgba(0, 176, 96, 0.15)',
  },
  p2: { // Calvin Klein
    gradient: 'linear-gradient(to top, rgba(28, 28, 30, 0.98) 25%, rgba(28, 28, 30, 0.6) 75%, rgba(28, 28, 30, 0.2) 100%)',
    borderColor: '#a1a1aa',
    badgeColor: '#a1a1aa',
    badgeBg: 'rgba(161, 161, 170, 0.15)',
  },
  p3: { // Tâm Giới
    gradient: 'linear-gradient(to top, rgba(88, 28, 135, 0.98) 25%, rgba(88, 28, 135, 0.6) 75%, rgba(88, 28, 135, 0.2) 100%)',
    borderColor: '#c084fc',
    badgeColor: '#c084fc',
    badgeBg: 'rgba(167, 139, 250, 0.15)',
  },
  p4: { // Bún Đậu Hồng Thương
    gradient: 'linear-gradient(to top, rgba(234, 88, 12, 0.98) 25%, rgba(234, 88, 12, 0.6) 75%, rgba(234, 88, 12, 0.2) 100%)',
    borderColor: '#ff7a3c',
    badgeColor: '#ff7a3c',
    badgeBg: 'rgba(255, 122, 60, 0.15)',
  },
}

interface ImageCarouselProps {
  images: string[]
  title: string
  height?: string | number
  onImageClick: (idx: number) => void
}

function ImageCarousel({ images, title, height = '100%', onImageClick }: ImageCarouselProps) {
  const [activeIdx, setActiveIdx] = useState(0)

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    playSynthSound('click')
    setActiveIdx(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    playSynthSound('click')
    setActiveIdx(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div style={{
      width: '100%',
      height: height,
      position: 'relative',
      background: '#0a0f1d',
      overflow: 'hidden',
    }}>
      {/* Current Slide Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[activeIdx]}
        alt={`${title} - View ${activeIdx + 1}`}
        onClick={() => onImageClick(activeIdx)}
        data-cursor="pointer"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'all 0.35s ease-in-out',
          cursor: 'none',
        }}
      />

      {/* Click to expand overlay hint */}
      <div style={{
        position: 'absolute',
        bottom: 16,
        left: 16,
        background: 'rgba(15, 23, 42, 0.65)',
        border: '1.5px solid rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        color: '#ffffff',
        fontSize: 10,
        fontWeight: 800,
        padding: '5px 12px',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        pointerEvents: 'none',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      }}>
        <Maximize2 size={11} />
        <span>Click to view full image</span>
      </div>

      {/* Slide Navigation Overlay */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            data-cursor="pointer"
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1.5px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'none',
              color: '#ffffff',
              fontSize: 18,
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              zIndex: 10,
              outline: 'none',
              backdropFilter: 'blur(10px)',
            }}
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            data-cursor="pointer"
            style={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1.5px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'none',
              color: '#ffffff',
              fontSize: 18,
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              zIndex: 10,
              outline: 'none',
              backdropFilter: 'blur(10px)',
            }}
          >
            ›
          </button>

          {/* Bullet Indicators */}
          <div style={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 6,
            zIndex: 10,
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '6px 12px',
            borderRadius: 20,
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            {images.map((_, idx) => (
              <div
                key={idx}
                onClick={(e) => {
                  e.stopPropagation()
                  playSynthSound('click')
                  setActiveIdx(idx)
                }}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: activeIdx === idx ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Multi-image status badge */}
      <div style={{
        position: 'absolute',
        top: 16,
        right: 16,
        background: 'rgba(15, 23, 42, 0.65)',
        border: '1.5px solid rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        color: '#ffffff',
        fontSize: 11,
        fontWeight: 700,
        padding: '5px 12px',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        zIndex: 5,
        fontFamily: 'var(--font-ui), system-ui, sans-serif',
      }}>
        <ImageIcon size={12} />
        <span>{activeIdx + 1}/{images.length}</span>
      </div>
    </div>
  )
}

interface ProjectDetailProps {
  project: typeof PROJECTS[0]
  onBack: () => void
  isMobile: boolean
}

function ProjectDetailView({ project, onBack, isMobile }: ProjectDetailProps) {
  const imagesArray = project.images || [project.image]
  const brand = BRAND_STYLES[project.id] || BRAND_STYLES.p1

  // Lightbox View State
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIdx, setLightboxIdx] = useState(0)

  const handleImageClick = (idx: number) => {
    playSynthSound('click')
    setLightboxIdx(idx)
    setLightboxOpen(true)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      width: '100%',
      height: '100%',
      background: 'transparent',
      overflowY: isMobile ? 'auto' : 'hidden',
    }}>
      {/* Left Panel: Massive Image Carousel Display */}
      <div style={{
        width: isMobile ? '100%' : '58%',
        height: isMobile ? '260px' : '100%',
        position: 'relative',
        borderRight: isMobile ? 'none' : '1.5px solid var(--window-border)',
        borderBottom: isMobile ? '1.5px solid var(--window-border)' : 'none',
        flexShrink: 0,
      }}>
        {/* Floating Back Button */}
        <button
          onClick={onBack}
          data-cursor="pointer"
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1.5px solid rgba(255, 255, 255, 0.18)',
            borderRadius: 99,
            padding: '8px 16px',
            color: '#ffffff',
            fontSize: 12,
            fontWeight: 800,
            backdropFilter: 'blur(12px)',
            cursor: 'none',
            boxShadow: '0 4px 12 rgba(0,0,0,0.15)',
            fontFamily: 'var(--font-ui), system-ui, sans-serif',
          }}
        >
          <ArrowLeft size={13} />
          <span>Back to Grid</span>
        </button>

        <ImageCarousel
          images={imagesArray}
          title={project.title}
          height="100%"
          onImageClick={handleImageClick}
        />
      </div>

      {/* Right Panel: Scrollable Brief Info Details */}
      <div style={{
        width: isMobile ? '100%' : '42%',
        height: isMobile ? 'auto' : '100%',
        overflowY: isMobile ? 'visible' : 'auto',
        padding: isMobile ? '20px' : '24px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
      }}>
        {/* Header Block */}
        <div>
          <span style={{
            fontSize: 9.5,
            fontWeight: 800,
            color: brand.borderColor,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            background: brand.badgeBg,
            border: `1.5px solid ${brand.borderColor}30`,
            padding: '4px 10px',
            borderRadius: 8,
            fontFamily: 'var(--font-ui), system-ui, sans-serif',
          }}>
            {CATEGORY_LABELS[project.category as Category] || project.category}
          </span>
          
          <h2 style={{
            fontFamily: 'var(--font-ui), system-ui, -apple-system, sans-serif',
            fontSize: 20,
            fontWeight: 900,
            color: 'var(--text-primary)',
            margin: '12px 0 6px 0',
            letterSpacing: '-0.4px',
            lineHeight: 1.25,
          }}>
            {project.title}
          </h2>
        </div>

        {/* Detailed Brief Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h4 style={{
            fontSize: 10,
            fontWeight: 800,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            margin: 0,
            fontFamily: 'var(--font-ui), system-ui, sans-serif',
          }}>
            Strategic Briefing
          </h4>
          <p style={{
            fontSize: 13,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            margin: 0,
            fontFamily: 'var(--font-ui), system-ui, sans-serif',
          }}>
            {project.longDescription}
          </p>
        </div>

        {/* Results Highlight Box */}
        {project.result && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            borderLeft: `4px solid ${brand.borderColor}`,
            borderRadius: '0 16px 16px 0',
            padding: '14px 18px',
            fontSize: 13,
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            fontFamily: 'var(--font-ui), system-ui, sans-serif',
          }}>
            <strong style={{
              display: 'block',
              color: brand.borderColor,
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 4,
            }}>
              Outcomes & Key Deliverables
            </strong>
            {project.result}
          </div>
        )}

        {/* Technologies Pills */}
        <div>
          <h3 style={{
            fontSize: 10,
            fontWeight: 800,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 10,
            fontFamily: 'var(--font-ui), system-ui, sans-serif',
          }}>
            Marketing Stack
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.technologies.map(t => (
              <span
                key={t}
                style={{
                  fontSize: 11,
                  padding: '4px 12px',
                  borderRadius: 99,
                  background: 'var(--bg-glass)',
                  border: '1.5px solid var(--window-border)',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  fontFamily: 'var(--font-ui), system-ui, sans-serif',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Full-screen Image Lightbox Overlay ── */}
      {lightboxOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 7, 12, 0.96)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backdropFilter: 'blur(16px)',
        }}>
          {/* Close Header Bar */}
          <div style={{
            position: 'absolute',
            top: 20,
            right: 20,
            left: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10,
          }}>
            <span style={{ color: '#fff', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-ui), system-ui, sans-serif' }}>
              {project.title} &mdash; Uncropped High-Res View
            </span>
            <button
              onClick={() => {
                playSynthSound('click')
                setLightboxOpen(false)
              }}
              data-cursor="pointer"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 800,
                cursor: 'none',
                fontFamily: 'var(--font-ui), system-ui, sans-serif',
              }}
            >
              Close
            </button>
          </div>

          {/* Full Screen Image Frame */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagesArray[lightboxIdx]}
            alt="Full Screen Spec"
            style={{
              maxWidth: '90%',
              maxHeight: '75%',
              objectFit: 'contain',
              borderRadius: 12,
              boxShadow: '0 24px 50px rgba(0,0,0,0.6)',
              border: '1.5px solid rgba(255,255,255,0.08)',
            }}
          />

          {/* Bottom Navigation controls */}
          {imagesArray.length > 1 && (
            <div style={{
              display: 'flex',
              gap: 16,
              marginTop: 24,
              alignItems: 'center',
              zIndex: 10,
            }}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  playSynthSound('click')
                  setLightboxIdx(prev => (prev === 0 ? imagesArray.length - 1 : prev - 1))
                }}
                data-cursor="pointer"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.18)',
                  color: '#ffffff',
                  padding: '6px 16px',
                  borderRadius: 8,
                  cursor: 'none',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                ‹ Prev
              </button>
              
              <span style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: 'var(--font-ui), system-ui, sans-serif',
              }}>
                {lightboxIdx + 1} / {imagesArray.length}
              </span>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  playSynthSound('click')
                  setLightboxIdx(prev => (prev === imagesArray.length - 1 ? 0 : prev + 1))
                }}
                data-cursor="pointer"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.18)',
                  color: '#ffffff',
                  padding: '6px 16px',
                  borderRadius: 8,
                  cursor: 'none',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                Next ›
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function ProjectsWindow() {
  const [filter, setFilter] = useState<Category>('all')
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const filtered = PROJECTS.filter(p => filter === 'all' || p.category === filter)
  const categories: Category[] = ['all', 'campaign', 'strategy', 'event']

  const handleFilterClick = (cat: Category) => {
    playSynthSound('click')
    setFilter(cat)
    setSelected(null)
  }

  // Active view check: if a project is selected, load the full immersive room
  if (selected) {
    return (
      <div style={{ height: '100%', background: 'transparent' }}>
        <ProjectDetailView project={selected} onBack={() => setSelected(null)} isMobile={isMobile} />
      </div>
    )
  }

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-ui), system-ui, sans-serif',
      color: 'var(--text-primary)',
      background: 'transparent',
    }}>
      
      {/* ── Category Filter Bar ── */}
      <div style={{
        padding: '12px 20px',
        display: 'flex',
        gap: 8,
        borderBottom: '1px solid var(--window-border)',
        flexShrink: 0,
        flexWrap: 'wrap',
        background: 'var(--window-title-bg)',
      }}>
        {categories.map(cat => (
          <motion.button
            key={cat}
            data-cursor="pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleFilterClick(cat)}
            style={{
              padding: '6px 16px',
              borderRadius: 99,
              background: filter === cat ? 'var(--blue-soft)' : 'var(--bg-glass)',
              border: `1.5px solid ${filter === cat ? 'var(--blue-bright)' : 'var(--window-border)'}`,
              color: filter === cat ? 'var(--blue-vivid)' : 'var(--text-secondary)',
              fontSize: 12.5,
              fontWeight: 800,
              cursor: 'none',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-ui), system-ui, sans-serif',
            }}
          >
            {CATEGORY_LABELS[cat]}
          </motion.button>
        ))}
      </div>

      {/* ── Interactive Campaign Exhibition 2x2 Grid ── */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {filtered.length > 0 ? (
          <div className="campaign-exhibition-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 20,
            width: '100%',
          }}>
            {filtered.map((project, i) => {
              const brand = BRAND_STYLES[project.id] || BRAND_STYLES.p1
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  whileHover={{ y: -6, scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  data-cursor="pointer"
                  onClick={() => {
                    playSynthSound('click')
                    setSelected(project)
                  }}
                  style={{
                    background: '#0a0f1d',
                    border: `1.5px solid ${brand.borderColor}30`,
                    borderRadius: 20,
                    overflow: 'hidden',
                    cursor: 'none',
                    boxShadow: 'var(--window-shadow)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: 260, // Increased height from 200 to 260 to show much larger preview images
                    padding: 24,
                    color: '#ffffff',
                    position: 'relative',
                  }}
                >
                  {/* Full-bleed Project Image Background */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    {/* Translucent Brand Gradient Overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: brand.gradient,
                    }} />
                  </div>

                  {/* Top row: Category Badge */}
                  <div style={{ alignSelf: 'flex-start', zIndex: 2 }}>
                    <span style={{
                      fontSize: 9.5,
                      fontWeight: 800,
                      color: brand.borderColor,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      background: brand.badgeBg,
                      border: `1.5px solid ${brand.borderColor}35`,
                      padding: '4px 10px',
                      borderRadius: 8,
                      fontFamily: 'var(--font-ui), system-ui, sans-serif',
                    }}>
                      {CATEGORY_LABELS[project.category as Category] || project.category}
                    </span>
                  </div>

                  {/* Bottom row: Info brief */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, zIndex: 2 }}>
                    <h3 style={{
                      fontFamily: 'var(--font-ui), system-ui, -apple-system, sans-serif',
                      fontSize: 16,
                      fontWeight: 900,
                      color: '#ffffff',
                      margin: 0,
                      letterSpacing: '-0.3px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    }}>
                      {project.title}
                    </h3>
                    
                    <p style={{
                      fontFamily: 'var(--font-ui), system-ui, sans-serif',
                      fontSize: 11.5,
                      color: 'rgba(255, 255, 255, 0.85)',
                      lineHeight: 1.45,
                      margin: 0,
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      {project.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                      {project.technologies.slice(0, 3).map(t => (
                        <span key={t} style={{
                          fontSize: 9.5,
                          fontWeight: 700,
                          color: 'rgba(255, 255, 255, 0.5)',
                          fontFamily: 'var(--font-ui), system-ui, sans-serif',
                        }}>
                          #{t.replace(/\s+/g, '')}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            fontSize: 12.5,
            gap: 8,
            padding: 48,
          }}>
            <Layers size={24} />
            <span>No campaigns found in this category.</span>
          </div>
        )}
      </div>

      {/* Styled Responsive Media Layout Rules */}
      <style>{`
        @media (max-width: 768px) {
          .campaign-exhibition-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
