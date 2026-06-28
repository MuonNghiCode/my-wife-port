'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PROJECTS } from '@/data/portfolio'
import { Code2, ExternalLink, ArrowLeft, Layers, Sparkles } from 'lucide-react'

type Category = 'all' | 'web' | 'mobile' | 'oss' | 'other'

interface ProjectDetailProps {
  project: typeof PROJECTS[0]
  onBack?: () => void
}

// Detail View Component declared outside the render loop
function ProjectDetailView({ project, onBack }: ProjectDetailProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflowY: 'auto',
      padding: 24,
      gap: 20,
    }}>
      {/* Mobile Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'var(--bg-glass)',
            border: '1.5px solid var(--window-border)',
            borderRadius: 12,
            padding: '8px 16px',
            color: 'var(--text-primary)',
            fontSize: 12,
            fontWeight: 700,
            width: 'fit-content',
            cursor: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to list</span>
        </button>
      )}

      {/* Large Mockup Image */}
      <div style={{
        width: '100%',
        height: 180,
        borderRadius: 16,
        overflow: 'hidden',
        border: '1.5px solid var(--window-border)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
        background: 'var(--bg-surface)',
        position: 'relative',
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
      </div>

      {/* Info Header */}
      <div>
        <span style={{
          fontSize: 9,
          fontWeight: 800,
          color: 'var(--pink-vivid)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          background: 'var(--pink-soft)',
          border: '1px solid var(--pink-bright)',
          padding: '3px 8px',
          borderRadius: 6,
        }}>
          {project.category}
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 20,
          fontWeight: 800,
          color: 'var(--text-primary)',
          margin: '10px 0 6px 0',
          letterSpacing: '-0.3px',
        }}>
          {project.title}
        </h2>
      </div>

      {/* Description */}
      <p style={{
        fontSize: 13,
        color: 'var(--text-secondary)',
        lineHeight: 1.7,
        margin: 0,
      }}>
        {project.longDescription}
      </p>

      {/* Technologies */}
      <div>
        <h3 style={{
          fontSize: 10,
          fontWeight: 800,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 10,
        }}>
          Technologies Used
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.technologies.map(t => (
            <span
              key={t}
              style={{
                fontSize: 11,
                padding: '4px 10px',
                borderRadius: 99,
                background: 'var(--bg-glass)',
                border: '1.5px solid var(--window-border)',
                color: 'var(--text-secondary)',
                fontWeight: 600,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div style={{
        display: 'flex',
        gap: 12,
        borderTop: '1px solid var(--window-border)',
        paddingTop: 20,
        marginTop: 'auto',
      }}>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="pointer"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '10px 16px',
              borderRadius: 12,
              fontSize: 12,
              background: 'var(--bg-glass)',
              border: '1.5px solid var(--window-border)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontWeight: 700,
              cursor: 'none',
              textAlign: 'center',
            }}
          >
            <Code2 size={14} />
            <span>GitHub Code</span>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="pointer"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '10px 16px',
              borderRadius: 12,
              fontSize: 12,
              background: 'var(--pink-vivid)',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 700,
              cursor: 'none',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(236,72,153,0.15)',
            }}
          >
            <ExternalLink size={14} />
            <span>Live Campaign</span>
          </a>
        )}
      </div>
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
  const categories: Category[] = ['all', 'web', 'mobile', 'oss', 'other']

  // Compute active selected project purely on render
  const isSelectedInFiltered = selected && filtered.some(p => p.id === selected.id)
  const activeProject = isSelectedInFiltered
    ? selected
    : (!isMobile && filtered.length > 0 ? filtered[0] : null)

  const handleFilterClick = (cat: Category) => {
    setFilter(cat)
    // Clear custom user selection when switching filters to allow auto-select first of new filter
    setSelected(null)
  }

  // Mobile navigation check: if mobile and a project is selected, show detail screen only
  if (isMobile && activeProject) {
    return (
      <div style={{ height: '100%', background: 'transparent' }}>
        <ProjectDetailView project={activeProject} onBack={() => setSelected(null)} />
      </div>
    )
  }

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-ui)',
      color: 'var(--text-primary)',
      background: 'transparent',
    }}>
      
      {/* ── Category Filter Bar ── */}
      <div style={{
        padding: '12px 20px',
        display: 'flex',
        gap: 6,
        borderBottom: '1px solid var(--window-border)',
        flexShrink: 0,
        flexWrap: 'wrap',
        background: 'var(--window-title-bg)',
      }}>
        {categories.map(cat => (
          <motion.button
            key={cat}
            data-cursor="pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleFilterClick(cat)}
            style={{
              padding: '4px 14px',
              borderRadius: 99,
              background: filter === cat ? 'var(--blue-soft)' : 'var(--bg-glass)',
              border: `1.5px solid ${filter === cat ? 'var(--blue-bright)' : 'var(--window-border)'}`,
              color: filter === cat ? 'var(--blue-vivid)' : 'var(--text-secondary)',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'none',
              transition: 'all 0.15s',
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* ── Split Layout Workspace ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
        alignItems: 'stretch',
      }}>
        
        {/* Left Master List */}
        <div style={{
          flex: '1.1',
          overflowY: 'auto',
          padding: 16,
          borderRight: isMobile ? 'none' : '1px solid var(--window-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
          {filtered.length > 0 ? (
            filtered.map((project, i) => {
              const isCurrent = activeProject?.id === project.id
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.01 }}
                  data-cursor="pointer"
                  onClick={() => setSelected(project)}
                  style={{
                    background: isCurrent ? 'var(--blue-soft)' : 'var(--bg-glass)',
                    border: `1.5px solid ${isCurrent ? 'var(--blue-bright)' : 'var(--window-border)'}`,
                    borderRadius: 16,
                    overflow: 'hidden',
                    cursor: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.01)',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'row',
                    height: 100,
                    flexShrink: 0,
                  }}
                >
                  {/* Thumbnail Mockup */}
                  <div style={{
                    width: 100,
                    height: '100%',
                    position: 'relative',
                    flexShrink: 0,
                    borderRight: '1px solid var(--window-border)',
                    background: 'var(--bg-surface)',
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
                  </div>

                  {/* Info block */}
                  <div style={{
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minWidth: 0,
                    flex: 1,
                  }}>
                    <div style={{
                      fontSize: 13,
                      fontWeight: 850,
                      color: isCurrent ? 'var(--blue-vivid)' : 'var(--text-primary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      marginBottom: 4,
                    }}>
                      {project.title}
                    </div>
                    <p style={{
                      fontSize: 11,
                      color: 'var(--text-secondary)',
                      lineHeight: 1.4,
                      margin: '0 0 6px 0',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      {project.description}
                    </p>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {project.technologies.slice(0, 2).map(t => (
                        <span key={t} style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: 'var(--text-muted)',
                        }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })
          ) : (
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              fontSize: 12,
              gap: 8,
            }}>
              <Layers size={24} />
              <span>No projects found in this category</span>
            </div>
          )}
        </div>

        {/* Right Detail Pane (Desktop only) */}
        {!isMobile && (
          <div style={{
            flex: '0.9',
            background: 'var(--bg-glass)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {activeProject ? (
              <ProjectDetailView project={activeProject} />
            ) : (
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                fontSize: 12,
                gap: 12,
                padding: 24,
                textAlign: 'center',
              }}>
                <Sparkles size={32} color="var(--pink-vivid)" className="animate-pulse" />
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: 4 }}>
                    Select a Project
                  </strong>
                  <span>Choose any project from the left panel to review strategy details and live demos.</span>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
