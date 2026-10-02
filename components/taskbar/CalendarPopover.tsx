'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles } from 'lucide-react'
import { useDesktopStore } from '@/store/desktopStore'
import { playSynthSound } from '@/store/soundStore'

interface CalendarPopoverProps {
  onClose: () => void
}

export default function CalendarPopover({ onClose }: CalendarPopoverProps) {
  const { language } = useDesktopStore()
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const today = new Date()
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month

  const monthNamesEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const monthNamesVi = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']

  const dayLabelsEn = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const dayLabelsVi = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

  const monthName = language === 'vi' ? monthNamesVi[month] : monthNamesEn[month]
  const dayLabels = language === 'vi' ? dayLabelsVi : dayLabelsEn

  const handlePrevMonth = () => {
    playSynthSound('click')
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    playSynthSound('click')
    setCurrentDate(new Date(year, month + 1, 1))
  }

  // Generate calendar grid matrix (42 cells: 6 weeks x 7 days)
  const calendarCells = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(null)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(d)
  }

  const events = language === 'vi' ? [
    { day: today.getDate(), title: 'Ra mắt PortfolioOS v2.0', tag: 'Cột mốc' },
    { day: 15, title: 'Họp chiến lược nội dung SEO', tag: 'CellphoneS' },
    { day: 22, title: 'Đánh giá chiến dịch MÀI', tag: 'Dự án' },
  ] : [
    { day: today.getDate(), title: 'PortfolioOS v2.0 Launch', tag: 'Milestone' },
    { day: 15, title: 'SEO Content Strategy Review', tag: 'CellphoneS' },
    { day: 22, title: 'MÀI Campaign Evaluation', tag: 'Project' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'absolute',
        top: 36,
        right: 16,
        width: 320,
        background: 'var(--window-bg)',
        border: '1.5px solid var(--window-border)',
        borderRadius: 20,
        boxShadow: 'var(--window-shadow)',
        padding: 20,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        fontFamily: 'var(--font-ui)',
        color: 'var(--text-primary)',
        userSelect: 'none',
      }}
    >
      {/* Header Month & Year Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CalendarIcon size={16} color="var(--blue-vivid)" />
          <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)' }}>
            {monthName} {year}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button
            onClick={handlePrevMonth}
            data-cursor="pointer"
            style={{
              width: 26, height: 26, borderRadius: 8,
              background: 'var(--bg-elevated)', border: '1px solid var(--window-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-primary)', cursor: 'none',
            }}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={handleNextMonth}
            data-cursor="pointer"
            style={{
              width: 26, height: 26, borderRadius: 8,
              background: 'var(--bg-elevated)', border: '1px solid var(--window-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-primary)', cursor: 'none',
            }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Days of Week Headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center' }}>
        {dayLabels.map((dayLabel, idx) => (
          <span key={idx} style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)' }}>
            {dayLabel}
          </span>
        ))}
      </div>

      {/* Month Days Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center' }}>
        {calendarCells.map((day, idx) => {
          const isToday = isCurrentMonth && day === today.getDate()
          const hasEvent = day && events.some(e => e.day === day)

          return (
            <div
              key={idx}
              style={{
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: isToday ? 800 : 600,
                color: isToday ? '#ffffff' : day ? 'var(--text-primary)' : 'transparent',
                background: isToday ? 'var(--blue-vivid)' : 'transparent',
                borderRadius: 10,
                position: 'relative',
                boxShadow: isToday ? '0 4px 12px rgba(14, 165, 233, 0.3)' : 'none',
              }}
            >
              {day}
              {hasEvent && !isToday && (
                <div style={{
                  position: 'absolute', bottom: 3, width: 4, height: 4, borderRadius: '50%',
                  background: 'var(--orange-vivid)',
                }} />
              )}
            </div>
          )
        })}
      </div>

      <div style={{ height: 1, background: 'var(--window-border)' }} />

      {/* Upcoming Events Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          <Sparkles size={12} color="var(--orange-vivid)" />
          <span>{language === 'vi' ? 'Sự kiện sắp tới' : 'Upcoming Milestones'}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {events.map((ev, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '6px 10px', borderRadius: 10,
                background: 'var(--bg-elevated)', border: '1px solid var(--window-border)',
                fontSize: 11.5,
              }}
            >
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{ev.title}</span>
              <span style={{ fontSize: 9.5, fontWeight: 800, padding: '2px 6px', borderRadius: 6, background: 'var(--orange-soft)', color: 'var(--orange-vivid)', border: '1px solid var(--orange-bright)' }}>
                {ev.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
