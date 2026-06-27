'use client'
import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let animId: number

    const updateCursorState = (target: HTMLElement | null) => {
      if (!target) return

      const textInput = target.closest('input[type="text"], input[type="email"], input[type="search"], textarea, [contenteditable="true"]')
      const grabbable = target.closest('[data-cursor="grab"], [data-cursor="grabbing"]')
      const pointer = target.closest('button, a, [data-cursor="pointer"], [role="button"]')

      if (textInput) {
        dot.style.transform = 'translate(-50%,-50%) scale(0)'
        dot.style.opacity = '0'
        ring.style.width = '4px'
        ring.style.height = '18px'
        ring.style.borderRadius = '2px'
        ring.style.borderColor = 'var(--blue-vivid)'
      } else if (grabbable) {
        dot.style.transform = 'translate(-50%,-50%) scale(1.2)'
        dot.style.opacity = '1'
        ring.style.width = '20px'
        ring.style.height = '20px'
        ring.style.borderRadius = '50%'
        ring.style.borderColor = 'var(--pink-vivid)'
      } else if (pointer) {
        dot.style.transform = 'translate(-50%,-50%) scale(1.6)'
        dot.style.opacity = '1'
        ring.style.width = '38px'
        ring.style.height = '38px'
        ring.style.borderRadius = '50%'
        ring.style.borderColor = 'var(--pink-vivid)'
      } else {
        dot.style.transform = 'translate(-50%,-50%) scale(1)'
        dot.style.opacity = '1'
        ring.style.width = '28px'
        ring.style.height = '28px'
        ring.style.borderRadius = '50%'
        ring.style.borderColor = 'var(--blue-vivid)'
      }
    }

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
      updateCursorState(e.target as HTMLElement)
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      animId = requestAnimationFrame(animate)
    }

    const onLeaveWindow = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const onEnterWindow = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeaveWindow)
    document.addEventListener('mouseenter', onEnterWindow)
    animate()

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeaveWindow)
      document.removeEventListener('mouseenter', onEnterWindow)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
