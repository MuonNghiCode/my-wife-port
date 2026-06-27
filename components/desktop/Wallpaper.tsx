'use client'

export default function Wallpaper() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'url("/marketing_desktop_wallpaper.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#f3f4f6',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: -1,
    }}>
      {/* A very soft warm overlay to reduce glare and harmonize colors */}
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
