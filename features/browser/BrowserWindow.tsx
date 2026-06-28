'use client'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, RotateCw, Home, ExternalLink, Lock, Globe } from 'lucide-react'
import { SOCIAL_LINKS } from '@/data/portfolio'

export default function BrowserWindow() {
  const linkedinLink = SOCIAL_LINKS.find(s => s.platform === 'LinkedIn')?.url || 'https://www.linkedin.com'
  
  // Browser state
  const [urlInput, setUrlInput] = useState(linkedinLink)
  const [url, setUrl] = useState(linkedinLink)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    const currentUrl = url
    setUrl('') // trigger reload
    setTimeout(() => {
      setUrl(currentUrl)
      setIsRefreshing(false)
    }, 600)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--bg-base)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    }}>
      {/* 1. Browser Toolbar (Safari/Chrome style) */}
      <div style={{
        height: 42,
        background: 'var(--window-title-bg)',
        borderBottom: '1px solid var(--window-border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: 12,
        flexShrink: 0,
        userSelect: 'none',
      }}>
        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <button style={{
            background: 'none', border: 'none', color: '#9ca3af', padding: 4, borderRadius: 6,
            display: 'flex', alignItems: 'center', cursor: 'none'
          }}>
            <ArrowLeft size={16} />
          </button>
          <button style={{
            background: 'none', border: 'none', color: '#9ca3af', padding: 4, borderRadius: 6,
            display: 'flex', alignItems: 'center', cursor: 'none'
          }}>
            <ArrowRight size={16} />
          </button>
          <button 
            onClick={handleRefresh}
            style={{
              background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 4, borderRadius: 6,
              display: 'flex', alignItems: 'center', cursor: 'none',
              animation: isRefreshing ? 'spin 0.6s linear' : 'none'
            }}
          >
            <RotateCw size={14} />
          </button>
          <button 
            onClick={() => {
              setUrl(linkedinLink)
              setUrlInput(linkedinLink)
            }}
            style={{
              background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 4, borderRadius: 6,
              display: 'flex', alignItems: 'center', cursor: 'none'
            }}
          >
            <Home size={14} />
          </button>
        </div>

        {/* URL Input Bar */}
        <div style={{
          flex: 1,
          height: 28,
          background: 'var(--bg-surface)',
          borderRadius: 8,
          border: '1px solid var(--window-border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          gap: 6,
          fontSize: 12,
          color: 'var(--text-primary)',
        }}>
          <span style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Lock size={12} /> Secure
          </span>
          <span style={{ color: '#9ca3af' }}>|</span>
          <input 
            type="text" 
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                let target = urlInput.trim()
                if (target && !/^https?:\/\//i.test(target)) {
                  target = 'https://' + target
                }
                setUrl(target)
                setUrlInput(target)
              }
            }}
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: 12,
              background: 'transparent',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        {/* Live button */}
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          data-cursor="pointer"
          style={{
            height: 28,
            background: 'var(--blue-bright)',
            border: '1.5px solid var(--blue-vivid)',
            color: 'var(--blue-vivid)',
            fontWeight: 700,
            fontSize: 11,
            borderRadius: 8,
            padding: '0 10px',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            textDecoration: 'none',
            cursor: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
          }}
        >
          <span>Open Link</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* 2. Webpage Viewport */}
      <div style={{
        flex: 1,
        position: 'relative',
        background: 'var(--bg-base)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Connecting Helper Banner */}
        <div style={{
          background: 'var(--blue-soft)',
          borderBottom: '1px solid var(--blue-bright)',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 12,
          color: 'var(--blue-vivid)',
          fontWeight: 550,
          userSelect: 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Globe size={13} />
            <span>Browsing real address: <strong style={{ fontWeight: 700 }}>{url}</strong></span>
          </div>
          <a 
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            style={{
              background: '#0ea5e9',
              color: '#ffffff',
              border: 'none',
              borderRadius: 6,
              padding: '4px 12px',
              fontWeight: 700,
              fontSize: 11,
              textDecoration: 'none',
              cursor: 'none',
              boxShadow: '0 2px 4px rgba(14, 165, 233, 0.2)',
            }}
          >
            Open in New Tab
          </a>
        </div>

        {/* Real Iframe viewport */}
        <div style={{ flex: 1, position: 'relative', background: 'var(--window-bg)' }}>
          {url && (
            <iframe 
              src={url}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="Web Browser Viewport"
            />
          )}
          
          {/* Overlay card for LinkedIn frame warnings */}
          {url.toLowerCase().includes('linkedin.com') && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--bg-glass)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
              textAlign: 'center',
              zIndex: 5,
              userSelect: 'none',
            }}>
              {/* Premium LinkedIn Icon */}
              <div style={{
                width: 54, height: 54, borderRadius: 8,
                background: '#0a66c2', color: '#ffffff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 32, marginBottom: 16,
                fontFamily: 'system-ui, sans-serif'
              }}>
                in
              </div>
              
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
                LinkedIn Security Shield Active
              </h3>
              
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: 440, lineHeight: 1.5, margin: '0 0 20px 0' }}>
                For security reasons, LinkedIn does not allow its official website to be loaded inside third-party application frames (via frame blocking policies). 
                Please click the button below to view the official profile directly on the real LinkedIn website.
              </p>
              
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                data-cursor="pointer"
                style={{
                  height: 38,
                  borderRadius: 19,
                  background: '#0a66c2',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: 14,
                  padding: '0 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  textDecoration: 'none',
                  cursor: 'none',
                  boxShadow: '0 4px 12px rgba(10, 102, 194, 0.25)',
                }}
              >
                <span>View LinkedIn Profile</span>
                <span>➔</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Embedded CSS */}
      <style>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
