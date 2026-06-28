'use client'
import { Download, FileText, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ResumeWindow() {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-ui)',
      background: 'transparent',
      overflow: 'hidden',
    }}>
      {/* Top Action Bar */}
      <div style={{
        height: 52,
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--window-title-bg)',
        borderBottom: '1px solid var(--window-border)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <FileText size={16} color="var(--blue-vivid)" />
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
            Nguyen_Ngoc_Phuong_Resume.pdf
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Open in new tab button */}
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              borderRadius: 8,
              background: 'var(--bg-glass)',
              border: '1.5px solid var(--window-border)',
              color: 'var(--text-secondary)',
              fontSize: 12,
              fontWeight: 700,
              textDecoration: 'none',
              cursor: 'none',
            }}
          >
            <ExternalLink size={13} />
            <span>Open Tab</span>
          </motion.a>

          {/* Download button */}
          <motion.a
            href="/resume.pdf"
            download="Nguyen_Ngoc_Phuong_Resume.pdf"
            data-cursor="pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              borderRadius: 8,
              background: 'var(--pink-vivid)',
              color: '#ffffff',
              fontSize: 12,
              fontWeight: 700,
              textDecoration: 'none',
              cursor: 'none',
              boxShadow: '0 4px 10px rgba(236,72,153,0.15)',
            }}
          >
            <Download size={13} />
            <span>Download</span>
          </motion.a>
        </div>
      </div>

      {/* Direct PDF Embed Viewport */}
      <div style={{
        flex: 1,
        padding: 16,
        background: 'transparent',
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1.5px solid var(--window-border)',
          background: 'var(--bg-surface)',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.02)',
        }}>
          <iframe
            src="/resume.pdf"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            title="Nguyen Ngoc Phuong CV"
          />
        </div>
      </div>
    </div>
  )
}
