'use client'

import React, { useRef, useState } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

interface TactileCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
  tilt?: boolean
  glowColor?: string
}

export default function TactileCard({
  children,
  className = '',
  tilt = true,
  glowColor = 'rgba(59, 130, 246, 0.15)',
  style,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  ...props
}: TactileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onMouseMove) onMouseMove(e)
    if (!tilt || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Subtle 3D tilt angle (max +-6 deg)
    const rY = (mouseX / (rect.width / 2)) * 6
    const rX = (-mouseY / (rect.height / 2)) * 6

    setRotateX(rX)
    setRotateY(rY)
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onMouseEnter) onMouseEnter(e)
    if (tilt) setIsHovered(true)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onMouseLeave) onMouseLeave(e)
    if (!tilt) return
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isHovered ? 1.015 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        transformStyle: 'preserve-3d',
        boxShadow: isHovered
          ? `0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 20px 0 ${glowColor}`
          : '0 4px 16px -2px rgba(0, 0, 0, 0.25)',
        ...style,
      }}
      className={`relative rounded-xl border border-slate-700/50 bg-slate-900/90 text-slate-100 transition-colors duration-200 ${className}`}
      {...props}
    >
      {/* Subtle top highlights */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </motion.div>
  )
}
