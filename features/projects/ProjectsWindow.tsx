'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PROJECTS } from '@/data/portfolio'
import { PROJECTS_VI } from '@/data/translations'
import { useDesktopStore } from '@/store/desktopStore'
import { ArrowLeft, Image as ImageIcon, Maximize2, ExternalLink, Award, CheckCircle2, Video, Play } from 'lucide-react'
import { playSynthSound } from '@/store/soundStore'

type Category = 'all' | 'strategy' | 'heritage' | 'campaign' | 'event' | 'media'

const CATEGORY_LABELS: Record<'en' | 'vi', Record<Category, string>> = {
  en: {
    all: 'All Activities',
    strategy: 'Brand Strategy',
    heritage: 'Cultural Heritage',
    campaign: 'Campaigns',
    event: 'Event Management',
    media: 'Media Production',
  },
  vi: {
    all: 'Tất cả hoạt động',
    strategy: 'Chiến lược thương hiệu',
    heritage: 'Di sản & Văn hóa',
    campaign: 'Chiến dịch',
    event: 'Quản lý sự kiện',
    media: 'Sản xuất truyền thông',
  }
}

interface BrandStyle {
  borderColor: string
  badgeColor: string
  badgeBg: string
}

const BRAND_STYLES: Record<string, BrandStyle> = {
  p1: { // Sơn Mài Tư Bốn
    borderColor: '#f59e0b',
    badgeColor: '#fbbf24',
    badgeBg: 'rgba(245, 158, 11, 0.18)',
  },
  p2: { // Gen Z Cultural Heritage
    borderColor: '#ec4899',
    badgeColor: '#f472b6',
    badgeBg: 'rgba(236, 72, 153, 0.18)',
  },
  p3: { // Plastic After U
    borderColor: '#10b981',
    badgeColor: '#34d399',
    badgeBg: 'rgba(16, 185, 129, 0.18)',
  },
  p4: { // Lê Lực Production - Họa Sắc
    borderColor: '#8b5cf6',
    badgeColor: '#a78bfa',
    badgeBg: 'rgba(139, 92, 246, 0.18)',
  },
  p5: { // Tâm Giới
    borderColor: '#c084fc',
    badgeColor: '#e879f9',
    badgeBg: 'rgba(192, 132, 252, 0.18)',
  },
}

export interface MediaItem {
  url: string
  type: 'image' | 'video'
  name: string
}

const PROJECT_FOLDER_KEYS: Record<string, string[]> = {
  p1: ['sonmai', 'son mài mỹ nghệ tư bốn', 'sonmaimynghetubon'],
  p2: ['genz', 'gen z & cultural heritage', 'gen z'],
  p3: ['platics', 'plastic after u', 'plastic', 'plastics'],
  p4: ['leluc', 'lê lực production — "họa sắc" short film', 'le luc production', 'leluc production'],
  p5: ['tamgioi', 'tâm giới', 'tam gioi']
}

interface MediaCarouselProps {
  mediaItems: MediaItem[]
  title: string
  height?: string | number
  onImageClick: (idx: number) => void
}

function MediaCarousel({ mediaItems, title, height = '100%', onImageClick }: MediaCarouselProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const { language } = useDesktopStore()

  const currentMedia = mediaItems[activeIdx] || mediaItems[0]

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    playSynthSound('click')
    setActiveIdx(prev => (prev === 0 ? mediaItems.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    playSynthSound('click')
    setActiveIdx(prev => (prev === mediaItems.length - 1 ? 0 : prev + 1))
  }

  return (
    <div style={{
      width: '100%',
      height: height,
      position: 'relative',
      background: '#070a12',
      overflow: 'hidden',
    }}>
      {/* Current Slide Media (Video or Image) */}
      {currentMedia.type === 'video' ? (
        <video
          key={currentMedia.url}
          src={currentMedia.url}
          controls
          preload="metadata"
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            background: '#000000',
          }}
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={currentMedia.url}
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
      )}

      {/* Click to expand overlay hint for images */}
      {currentMedia.type === 'image' && (
        <div style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1.5px solid rgba(255, 255, 255, 0.18)',
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
          <span>{language === 'vi' ? 'Nhấn để xem ảnh lớn' : 'Click to view full image'}</span>
        </div>
      )}

      {/* Media Status Badge */}
      <div style={{
        position: 'absolute',
        top: 16,
        right: 16,
        background: 'rgba(15, 23, 42, 0.85)',
        border: '1.5px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(12px)',
        color: '#ffffff',
        fontSize: 11,
        fontWeight: 800,
        padding: '5px 12px',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        zIndex: 5,
        fontFamily: 'var(--font-ui), system-ui, sans-serif',
      }}>
        {currentMedia.type === 'video' ? <Video size={13} color="#f43f5e" /> : <ImageIcon size={13} />}
        <span>{currentMedia.type === 'video' ? 'VIDEO TRAILER' : `${activeIdx + 1}/${mediaItems.length}`}</span>
      </div>

      {/* Navigation Buttons */}
      {mediaItems.length > 1 && (
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
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1.5px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'none',
              color: '#ffffff',
              fontSize: 18,
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
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
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1.5px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'none',
              color: '#ffffff',
              fontSize: 18,
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
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
            background: 'rgba(15, 23, 42, 0.7)',
            padding: '6px 12px',
            borderRadius: 20,
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            {mediaItems.map((m, idx) => (
              <div
                key={idx}
                onClick={(e) => {
                  e.stopPropagation()
                  playSynthSound('click')
                  setActiveIdx(idx)
                }}
                style={{
                  width: m.type === 'video' ? 10 : 7,
                  height: 7,
                  borderRadius: m.type === 'video' ? 3 : '50%',
                  background: activeIdx === idx ? (m.type === 'video' ? '#f43f5e' : '#ffffff') : 'rgba(255, 255, 255, 0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

interface ProjectDetailProps {
  project: typeof PROJECTS[0]
  mediaItems: MediaItem[]
  onBack: () => void
  isMobile: boolean
}

function ProjectDetailView({ project, mediaItems, onBack, isMobile }: ProjectDetailProps) {
  const { language } = useDesktopStore()
  const brand = BRAND_STYLES[project.id] || BRAND_STYLES.p1

  // Lightbox View State
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIdx, setLightboxIdx] = useState(0)

  const handleImageClick = (idx: number) => {
    if (mediaItems[idx]?.type === 'image') {
      playSynthSound('click')
      setLightboxIdx(idx)
      setLightboxOpen(true)
    }
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
      {/* Left Panel: Media Carousel Display */}
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
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1.5px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 99,
            padding: '8px 16px',
            color: '#ffffff',
            fontSize: 12,
            fontWeight: 800,
            backdropFilter: 'blur(12px)',
            cursor: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            fontFamily: 'var(--font-ui), system-ui, sans-serif',
          }}
        >
          <ArrowLeft size={13} />
          <span>{language === 'vi' ? 'Quay lại danh sách' : 'Back to Grid'}</span>
        </button>

        <MediaCarousel
          mediaItems={mediaItems}
          title={project.title}
          height="100%"
          onImageClick={handleImageClick}
        />
      </div>

      {/* Right Panel: Scrollable Activity Details */}
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
            <span style={{
              fontSize: 9.5,
              fontWeight: 800,
              color: brand.badgeColor,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              background: brand.badgeBg,
              border: `1.5px solid ${brand.borderColor}40`,
              padding: '4px 10px',
              borderRadius: 8,
              fontFamily: 'var(--font-ui), system-ui, sans-serif',
            }}>
              {CATEGORY_LABELS[language][project.category as Category] || project.category}
            </span>

            {project.role && (
              <span style={{
                fontSize: 9.5,
                fontWeight: 800,
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--window-border)',
                padding: '4px 10px',
                borderRadius: 8,
                fontFamily: 'var(--font-ui), system-ui, sans-serif',
              }}>
                Role: {project.role}
              </span>
            )}
          </div>
          
          <h2 style={{
            fontFamily: 'var(--font-ui), system-ui, -apple-system, sans-serif',
            fontSize: 20,
            fontWeight: 900,
            color: 'var(--text-primary)',
            margin: '6px 0 0 0',
            letterSpacing: '-0.4px',
            lineHeight: 1.25,
          }}>
            {project.title}
          </h2>
        </div>

        {/* Detailed Overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h4 style={{
            fontSize: 10,
            fontWeight: 900,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            margin: 0,
            fontFamily: 'var(--font-ui), system-ui, sans-serif',
          }}>
            {language === 'vi' ? 'Tổng quan dự án & Vai trò' : 'Overview & Role'}
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

        {/* Key Results Section */}
        {project.keyResults && project.keyResults.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <h4 style={{
              fontSize: 10,
              fontWeight: 900,
              color: brand.borderColor,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <Award size={13} color={brand.borderColor} />
              <span>{language === 'vi' ? 'Kết quả then chốt (Key Results)' : 'Key Results'}</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {project.keyResults.map((kr, kIdx) => (
                <div key={kIdx} style={{
                  background: 'var(--bg-surface)',
                  border: `1.5px solid ${brand.borderColor}30`,
                  borderRadius: 14,
                  padding: '12px 14px',
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
                }}>
                  <CheckCircle2 size={16} color={brand.borderColor} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
                    {kr.title && (
                      <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                        {kr.title}
                      </span>
                    )}
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {kr.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Channel / Project Link */}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 12,
              background: brand.badgeBg,
              border: `1.5px solid ${brand.borderColor}`,
              color: brand.badgeColor,
              fontSize: 12.5,
              fontWeight: 800,
              textDecoration: 'none',
              width: 'fit-content',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = `${brand.borderColor}30`}
            onMouseLeave={e => e.currentTarget.style.background = brand.badgeBg}
          >
            <span>{language === 'vi' ? 'Xem kênh / Trang chính thức' : 'Visit Official Channel / Link'}</span>
            <ExternalLink size={14} />
          </a>
        )}

        {/* Technologies / Skills Pills */}
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
            {language === 'vi' ? 'Kỹ năng & Lĩnh vực' : 'Skills & Domains'}
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
      {lightboxOpen && mediaItems[lightboxIdx]?.type === 'image' && (
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
              {project.title} &mdash; {language === 'vi' ? 'Ảnh chất lượng cao' : 'Uncropped High-Res View'}
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
              {language === 'vi' ? 'Đóng' : 'Close'}
            </button>
          </div>

          {/* Full Screen Image Frame */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mediaItems[lightboxIdx].url}
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
          {mediaItems.length > 1 && (
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
                  setLightboxIdx(prev => (prev === 0 ? mediaItems.length - 1 : prev - 1))
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
                {language === 'vi' ? '‹ Trước' : '‹ Prev'}
              </button>
              
              <span style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: 'var(--font-ui), system-ui, sans-serif',
              }}>
                {lightboxIdx + 1} / {mediaItems.length}
              </span>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  playSynthSound('click')
                  setLightboxIdx(prev => (prev === mediaItems.length - 1 ? 0 : prev + 1))
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
                {language === 'vi' ? 'Tiếp ›' : 'Next ›'}
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
  const [mediaByFolder, setMediaByFolder] = useState<Record<string, MediaItem[]>>({})
  const { language } = useDesktopStore()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-discover media files dynamically from /api/mywork-media
  useEffect(() => {
    fetch('/api/mywork-media')
      .then(res => res.json())
      .then(data => {
        if (data.mediaByFolder) {
          setMediaByFolder(data.mediaByFolder)
        }
      })
      .catch(() => {})
  }, [])

  // Helper to get media items for a project
  const getProjectMedia = (projectId: string, fallbackImages: string[] = []): MediaItem[] => {
    const folderKeys = PROJECT_FOLDER_KEYS[projectId] || []
    for (const key of folderKeys) {
      if (mediaByFolder[key] && mediaByFolder[key].length > 0) {
        return mediaByFolder[key]
      }
    }
    return fallbackImages.map(imgUrl => ({
      url: imgUrl,
      type: 'image',
      name: imgUrl
    }))
  }

  // Localized projects mapping
  const projectsData = PROJECTS.map(p => {
    if (language === 'vi') {
      const translation = PROJECTS_VI.find(t => t.id === p.id)
      if (translation) {
        return {
          ...p,
          title: translation.title,
          role: translation.role || p.role,
          description: translation.description,
          longDescription: translation.longDescription,
          result: translation.result,
          keyResults: translation.keyResults || p.keyResults
        }
      }
    }
    return p
  })

  const filtered = projectsData.filter(p => filter === 'all' || p.category === filter)
  const categories: Category[] = ['all', 'strategy', 'heritage', 'campaign', 'event', 'media']

  const handleFilterClick = (cat: Category) => {
    playSynthSound('click')
    setFilter(cat)
    setSelected(null)
  }

  // Active view check: if an activity is selected, load the full room
  if (selected) {
    const selectedMedia = getProjectMedia(selected.id, selected.images || [selected.image])
    return (
      <div style={{ height: '100%', background: 'transparent' }}>
        <ProjectDetailView
          project={selected}
          mediaItems={selectedMedia}
          onBack={() => setSelected(null)}
          isMobile={isMobile}
        />
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
            {CATEGORY_LABELS[language][cat]}
          </motion.button>
        ))}
      </div>

      {/* ── Interactive Activities Exhibition Grid ── */}
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
              const projectMedia = getProjectMedia(project.id, project.images || [project.image])
              
              // Pick cover image (prefer static image over raw video for clean card thumbnail)
              const imageMedia = projectMedia.find(m => m.type === 'image')
              const hasVideo = projectMedia.some(m => m.type === 'video')
              const coverUrl = imageMedia?.url || project.image

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
                    background: '#0f172a', // Deep Slate Dark Glass
                    border: `1.5px solid ${brand.borderColor}40`,
                    borderRadius: 20,
                    overflow: 'hidden',
                    cursor: 'none',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: 250,
                    padding: '20px 24px',
                    color: '#ffffff',
                    position: 'relative',
                  }}
                >
                  {/* Crisp Cover Image Background */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverUrl}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    {/* Ultra-clean Dark Vignette Gradient for 100% Readability */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.96) 0%, rgba(15, 23, 42, 0.6) 55%, rgba(15, 23, 42, 0.25) 100%)',
                    }} />
                  </div>

                  {/* Top row: High-contrast Category & Video Badge */}
                  <div style={{ alignSelf: 'flex-start', zIndex: 2, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 900,
                      color: brand.badgeColor,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      background: 'rgba(15, 23, 42, 0.85)',
                      border: `1.5px solid ${brand.borderColor}60`,
                      padding: '4px 10px',
                      borderRadius: 8,
                      backdropFilter: 'blur(8px)',
                      fontFamily: 'var(--font-ui), system-ui, sans-serif',
                    }}>
                      {CATEGORY_LABELS[language][project.category as Category] || project.category}
                    </span>

                    {hasVideo && (
                      <span style={{
                        fontSize: 10,
                        fontWeight: 900,
                        color: '#ffffff',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        background: 'rgba(244, 63, 94, 0.85)',
                        border: '1.5px solid rgba(244, 63, 94, 0.9)',
                        padding: '4px 10px',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        backdropFilter: 'blur(8px)',
                        fontFamily: 'var(--font-ui), system-ui, sans-serif',
                        boxShadow: '0 2px 8px rgba(244, 63, 94, 0.3)',
                      }}>
                        <Play size={10} fill="#ffffff" />
                        <span>VIDEO</span>
                      </span>
                    )}
                  </div>

                  {/* Bottom row: Info brief */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, zIndex: 2 }}>
                    <h3 style={{
                      fontFamily: 'var(--font-ui), system-ui, -apple-system, sans-serif',
                      fontSize: 16.5,
                      fontWeight: 900,
                      color: '#ffffff',
                      margin: 0,
                      letterSpacing: '-0.3px',
                      textShadow: '0 2px 6px rgba(0,0,0,0.5)',
                      lineHeight: 1.3,
                    }}>
                      {project.title}
                    </h3>
                    
                    <p style={{
                      fontFamily: 'var(--font-ui), system-ui, sans-serif',
                      fontSize: 12,
                      color: 'rgba(241, 245, 249, 0.88)',
                      lineHeight: 1.45,
                      margin: 0,
                      textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'var(--text-muted)',
            fontSize: 14,
            fontWeight: 600,
          }}>
            {language === 'vi' ? 'Không có hoạt động nào trong danh mục này.' : 'No activities found in this category.'}
          </div>
        )}
      </div>

      {/* Grid CSS style override for mobile responsive */}
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
