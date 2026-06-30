'use client'
import { useEffect, useRef, useState } from 'react'

export default function Wallpaper() {
  const [isDark, setIsDark] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInitial = useRef(true)

  // Listen to theme class on document element
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  // Control video playback based on theme transitions (including smooth seeked-based reverse)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let isDestroyed = false
    let targetTime = video.currentTime

    // Handle initial state immediately on load without playing the transition
    if (isInitial.current) {
      if (isDark) {
        video.currentTime = 5
      } else {
        video.currentTime = 0
      }
      video.pause()
      isInitial.current = false
      return
    }

    const checkForward = () => {
      if (isDestroyed) return
      if (video.currentTime >= 5) {
        video.currentTime = 5
        video.pause()
      } else {
        requestAnimationFrame(checkForward)
      }
    }

    const handleSeeked = () => {
      if (isDestroyed || isDark) return
      if (targetTime <= 0) {
        video.currentTime = 0
        video.pause()
      } else {
        // Step backward by 0.15s, synchronized with decoder performance
        targetTime = Math.max(0, targetTime - 0.15)
        video.currentTime = targetTime
      }
    }

    if (isDark) {
      video.playbackRate = 2.5
      video.play().catch(() => {
        // Prevent autoplay policy exceptions
      })
      requestAnimationFrame(checkForward)
    } else {
      video.pause()
      video.addEventListener('seeked', handleSeeked)
      // Trigger the first step backward
      targetTime = Math.max(0, video.currentTime - 0.15)
      video.currentTime = targetTime
    }

    return () => {
      isDestroyed = true
      video.removeEventListener('seeked', handleSeeked)
    }
  }, [isDark])

  // Canvas Particles Animation Effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Generate particle structures
    const particleCount = 45
    const particles: Array<{
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      opacity: number
      pulseSpeed: number
      pulsePhase: number
    }> = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.25 + 0.1),
        opacity: Math.random() * 0.35 + 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      const r = isDark ? 236 : 14
      const g = isDark ? 72 : 165
      const b = isDark ? 153 : 233

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.pulsePhase += p.pulseSpeed

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) {
          p.y = height
          p.x = Math.random() * width
        }

        const currentOpacity = p.opacity + Math.sin(p.pulsePhase) * 0.08
        const finalOpacity = Math.max(0.05, Math.min(0.45, currentOpacity))

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`
        ctx.shadowBlur = p.radius * 2
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`
        ctx.fill()
      }

      ctx.shadowBlur = 0
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isDark])

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: -1,
      backgroundColor: '#f3f4f6',
    }}>
      <video
        ref={videoRef}
        src="/video-background.mp4"
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      {/* Dynamic Floating Particles overlay layer */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          mixBlendMode: 'screen',
        }}
      />
      {/* Soft warm overlay to reduce glare */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'var(--wallpaper-overlay)',
        backdropFilter: 'blur(var(--wallpaper-blur))',
        transition: 'all 0.3s ease',
      }} />
    </div>
  )
}
