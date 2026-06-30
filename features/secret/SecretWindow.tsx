'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, Eye, ExternalLink, Mail, Heart } from 'lucide-react'
import { playSynthSound } from '@/store/soundStore'

// Custom SVG GitHub Icon for compatibility
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      stroke="currentColor"
      fill="none"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

export default function SecretWindow() {
  const [unlocked, setUnlocked] = useState(false)
  const [input, setInput] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  // 3D Mouse Tracker state
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    setIsHovered(true)
    const container = e.currentTarget
    const rect = container.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    // Calculate mouse position relative to center of the container
    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2
    
    // Map relative mouse position to rotation angles (max 20 degrees)
    const rX = -(mouseY / (height / 2)) * 20
    const rY = (mouseX / (width / 2)) * 20
    
    setRotateX(rX)
    setRotateY(rY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
  }

  const handleUnlock = () => {
    if (input.toLowerCase() === 'portfolio') {
      playSynthSound('click')
      setUnlocked(true)
    }
  }

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'transparent',
      fontFamily: 'var(--font-ui), system-ui, sans-serif',
      color: 'var(--text-primary)',
      overflow: 'hidden',
    }}>
      {!unlocked ? (
        /* Password Gate Panel */
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
        }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ textAlign: 'center', maxWidth: 330 }}
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ marginBottom: 20 }}
            >
              <Lock size={40} color="var(--text-primary)" style={{ margin: '0 auto', opacity: 0.8 }} />
            </motion.div>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.3px' }}>
              System Authentication
            </h2>
            <p style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 24, fontWeight: 500 }}>
              Enter the password to access the developer workstation dashboard.
            </p>
            
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleUnlock()}
                placeholder="Password..."
                type="password"
                style={{
                  flex: 1,
                  padding: '9px 14px',
                  borderRadius: 8,
                  background: 'var(--bg-surface)',
                  border: '1.5px solid var(--window-border)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 12.5,
                  outline: 'none',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--text-primary)')}
                onBlur={e => (e.target.style.borderColor = 'var(--window-border)')}
              />
              <motion.button
                data-cursor="pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUnlock}
                style={{
                  padding: '9px 16px',
                  borderRadius: 8,
                  background: 'var(--text-primary)',
                  border: 'none',
                  color: 'var(--bg-base)',
                  fontWeight: 800,
                  fontSize: 12.5,
                  cursor: 'none',
                }}
              >
                <Eye size={14} />
              </motion.button>
            </div>
            
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 14, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
              Hint: think about this website&apos;s purpose... 
            </div>
          </motion.div>
        </div>
      ) : (
        /* Editorial Magazine-Style Creator Workstation (Borderless, Interactive 3D Tilt Image, Minimalist Typography) */
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          height: '100%',
          overflowY: isMobile ? 'auto' : 'hidden',
          background: 'transparent',
        }}>
          {/* Left Side: Interactive 3D Tilt Portrait */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              width: isMobile ? '100%' : '42%',
              height: isMobile ? '320px' : '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              borderRight: isMobile ? 'none' : '1.5px solid var(--window-border)',
              borderBottom: isMobile ? '1.5px solid var(--window-border)' : 'none',
              flexShrink: 0,
              background: 'transparent',
              overflow: 'visible',
              perspective: 1000, // Establishes 3D space perspective
            }}
          >
            {/* 3D tilt & gentle float animation wrapper */}
            <motion.div
              animate={{
                y: isHovered ? 0 : [-5, 5, -5],
                rotateX: rotateX,
                rotateY: rotateY,
              }}
              transition={isHovered ? { type: 'spring', stiffness: 220, damping: 22 } : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                padding: '16px',
                transformStyle: 'preserve-3d', // Enables children to render in true 3D space
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/me.webp"
                alt="MuonNghiCode Portrait"
                style={{
                  maxWidth: '100%',
                  maxHeight: '90%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.45))',
                  pointerEvents: 'none',
                  transform: 'translateZ(60px)', // Pushes the portrait forward relative to parent tilt for deep 3D pop
                }}
              />
            </motion.div>
          </div>

          {/* Right Side: Clean Editorial Typography Briefing */}
          <div style={{
            width: isMobile ? '100%' : '58%',
            height: isMobile ? 'auto' : '100%',
            overflowY: isMobile ? 'visible' : 'auto',
            padding: isMobile ? '24px 20px' : '40px 48px',
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(24px)',
          }}>
            {/* Creator Intro Header */}
            <div>
              <span style={{
                fontSize: 9.5,
                fontWeight: 900,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                display: 'block',
                marginBottom: 6,
              }}>
                Workstation Creator
              </span>
              <h1 style={{
                fontSize: 23,
                fontWeight: 900,
                lineHeight: 1.25,
                letterSpacing: '-0.5px',
                color: 'var(--text-primary)',
                margin: 0,
              }}>
                I am MuonNghiCode, the engineer who designed and built this portfolio experience.
              </h1>
            </div>

            {/* Narrative Statement */}
            <p style={{
              fontSize: 13.5,
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              margin: 0,
            }}>
              I created this interactive OS workstation simulator to present digital campaigns and web development projects in a memorable, hands-on format. My work focuses on building fast, responsive, and pixel-perfect applications using React, Next.js, and TypeScript.
            </p>

            {/* Core Capabilities */}
            <div>
              <h3 style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 14 }}>
                Core Focus
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <strong style={{ fontSize: 13, color: 'var(--text-primary)' }}>Front-end Engineering</strong>
                  <span style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>Next.js, React, TypeScript, Tailwind CSS</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <strong style={{ fontSize: 13, color: 'var(--text-primary)' }}>Full-stack Solutions</strong>
                  <span style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>Node.js, Express, REST APIs, MongoDB</span>
                </div>
              </div>
            </div>

            {/* Selected Work List (Borderless links) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, borderTop: '1px solid var(--window-border)', paddingTop: 24 }}>
              <h3 style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                Selected Creations
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: 13.5, color: 'var(--text-primary)' }}>Personal Workstation Portfolio</strong>
                    <a
                      href="https://my-wife-port.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="pointer"
                      style={{
                        fontSize: 12,
                        color: 'var(--text-secondary)',
                        textDecoration: 'underline',
                        cursor: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                      }}
                    >
                      <span>Live</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                  <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                    An interactive OS simulator designed to showcase brand strategies and digital marketing materials. Next.js &bull; TypeScript &bull; Framer Motion
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: 13.5, color: 'var(--text-primary)' }}>Coway E-commerce</strong>
                    <a
                      href="https://coway-sigma.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="pointer"
                      style={{
                        fontSize: 12,
                        color: 'var(--text-secondary)',
                        textDecoration: 'underline',
                        cursor: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                      }}
                    >
                      <span>Live</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                  <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                    Modern e-commerce platform featuring intelligent product recommendations and seamless user experience. React &bull; TypeScript &bull; Tailwind
                  </p>
                </div>
              </div>
            </div>

            {/* Contacts & Tribute Footer */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              borderTop: '1px solid var(--window-border)',
              paddingTop: 24,
              marginTop: 'auto',
            }}>
              {/* Simple Text Contact Links */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, fontSize: 12.5 }}>
                <a
                  href="https://github.com/MuonNghiCode"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="pointer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: 'var(--text-secondary)',
                    textDecoration: 'underline',
                    cursor: 'none',
                  }}
                >
                  <GithubIcon style={{ width: 13, height: 13 }} />
                  <span>github.com/MuonNghiCode</span>
                </a>
                
                <a
                  href="mailto:minhquanpm1610@gmail.com"
                  data-cursor="pointer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: 'var(--text-secondary)',
                    textDecoration: 'underline',
                    cursor: 'none',
                  }}
                >
                  <Mail size={13} />
                  <span>minhquanpm1610@gmail.com</span>
                </a>
              </div>

              {/* Minimalist Tribute Line */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 11,
                color: 'var(--text-muted)',
                flexWrap: 'wrap',
                gap: 8,
              }}>
                <span>Master the fundamentals, embrace the new, never stop learning.</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span>Crafted by MuonNghiCode with</span>
                  <Heart size={10} style={{ fill: 'var(--text-muted)', stroke: 'none' }} />
                </span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
