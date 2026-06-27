'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '@/data/portfolio'
import { Code2, ExternalLink, X } from 'lucide-react'

type Category = 'all' | 'web' | 'mobile' | 'oss' | 'other'

export default function ProjectsWindow() {
  const [filter, setFilter] = useState<Category>('all')
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null)

  const filtered = PROJECTS.filter(p => filter === 'all' || p.category === filter)
  const categories: Category[] = ['all', 'web', 'mobile', 'oss', 'other']

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-ui)', color: 'var(--text-primary)' }}>
      {/* Filter bar */}
      <div style={{
        padding: '16px 20px 12px',
        display: 'flex', gap: 6,
        borderBottom: '1px solid var(--window-border)',
        flexShrink: 0, flexWrap: 'wrap',
        background: 'var(--window-title-bg)',
      }}>
        {categories.map(cat => (
          <motion.button
            key={cat}
            data-cursor="pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setFilter(cat)}
            style={{
              padding: '4px 14px', borderRadius: 99,
              background: filter === cat ? 'var(--blue-soft)' : 'var(--bg-surface)', /* Solid blue for active */
              border: `1px solid ${filter === cat ? 'var(--blue-vivid)' : 'var(--window-border)'}`,
              color: filter === cat ? 'var(--blue-vivid)' : 'var(--text-secondary)',
              fontSize: 12, fontWeight: 600,
              cursor: 'none', fontFamily: 'var(--font-ui)',
              transition: 'all 0.15s',
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, background: 'transparent' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 14,
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 400, damping: 30 }}
                whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.06), 0 0 0 1px var(--blue-vivid)' }}
                data-cursor="pointer"
                onClick={() => setSelected(project)}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--window-border)',
                  borderRadius: 12, overflow: 'hidden',
                  cursor: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s',
                }}
              >
                {/* Preview */}
                <div style={{
                  height: 120, padding: 16,
                  background: i % 2 === 0 ? 'var(--blue-soft)' : 'var(--pink-soft)', /* Solid pastel blue/pink */
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderBottom: '1px solid var(--window-border)',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    color: i % 2 === 0 ? 'var(--blue-vivid)' : 'var(--pink-vivid)',
                    textAlign: 'center',
                    lineHeight: 1.8,
                    fontWeight: 600,
                  }}>
                    {'</>'}
                    <br />
                    {project.title.split(' ')[0]}
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
                    {project.title}
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 10 }}>
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                    {project.technologies.slice(0, 3).map(t => (
                      <span key={t} style={{
                        fontSize: 10, padding: '2px 7px', borderRadius: 99,
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--window-border)',
                        color: 'var(--text-secondary)',
                        fontWeight: 500,
                      }}>{t}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>+{project.technologies.length - 3}</span>
                    )}
                  </div>

                  {/* Links */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer"
                        data-cursor="pointer"
                        onClick={e => e.stopPropagation()}
                        style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.15s', fontWeight: 500 }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue-vivid)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                      >
                        <Code2 size={12} /> Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer"
                        data-cursor="pointer"
                        onClick={e => e.stopPropagation()}
                        style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.15s', fontWeight: 500 }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--pink-vivid)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                      >
                        <ExternalLink size={12} /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', inset: 0,
              background: 'var(--wallpaper-overlay)',
              backdropFilter: 'blur(8px)',
              zIndex: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 20,
            }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--window-border)',
                borderRadius: 16, padding: 28,
                maxWidth: 500, width: '100%',
                boxShadow: '0 20px 48px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
                    {selected.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, textTransform: 'capitalize', fontWeight: 600 }}>
                    {selected.category}
                  </div>
                </div>
                <button data-cursor="pointer" onClick={() => setSelected(null)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'none', padding: 4 }}>
                  <X size={18} />
                </button>
              </div>

              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
                {selected.longDescription}
              </p>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, fontWeight: 700 }}>
                  Technologies
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {selected.technologies.map(t => (
                    <span key={t} style={{
                      fontSize: 11, padding: '4px 10px', borderRadius: 99,
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--window-border)',
                      color: 'var(--text-secondary)',
                      fontWeight: 500,
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                {selected.githubUrl && (
                  <a href={selected.githubUrl} target="_blank" rel="noreferrer" data-cursor="pointer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '8px 16px', borderRadius: 8, fontSize: 13,
                      background: 'var(--bg-elevated)', border: '1px solid var(--window-border)',
                      color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600,
                    }}>
                    <Code2 size={14} /> GitHub
                  </a>
                )}
                {selected.liveUrl && (
                  <a href={selected.liveUrl} target="_blank" rel="noreferrer" data-cursor="pointer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '8px 16px', borderRadius: 8, fontSize: 13,
                      background: '#ec4899', /* Solid pink button */
                      color: '#ffffff', textDecoration: 'none', fontWeight: 600,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#db2777')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#ec4899')}
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
