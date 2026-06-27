'use client'
import { Download, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ResumeWindow() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 20, fontFamily: 'var(--font-ui)', background: 'transparent' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <FileText size={16} color="var(--blue-vivid)" />
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Nguyen_Ngoc_Phuong_Resume.pdf</span>
        </div>
        <motion.a
          href="/resume.pdf"
          download
          data-cursor="pointer"
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 16px', borderRadius: 8,
            background: 'var(--pink-vivid)',
            color: '#ffffff', fontSize: 12, fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          <Download size={13} /> Download PDF
        </motion.a>
      </div>

      {/* PDF Viewer placeholder */}
      <div style={{
        flex: 1,
        borderRadius: 12,
        border: '1px solid var(--window-border)',
        background: 'var(--bg-surface)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}>
        {/* Document Icon Graphic */}
        <div style={{
          width: 80, height: 80, borderRadius: 16,
          background: 'var(--blue-soft)',
          border: '1px solid var(--blue-bright)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 16,
        }}>
          <FileText size={36} color="var(--blue-vivid)" />
        </div>

        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
          Nguyen_Ngoc_Phuong_Resume.pdf
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16, fontWeight: 500 }}>
          Interactive Resume · PDF Document
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 24px', borderRadius: 8,
              background: 'var(--bg-surface)', border: '1px solid var(--window-border)',
              color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600,
            }}
          >
            Open in new tab
          </motion.a>
        </div>
      </div>
    </div>
  )
}
