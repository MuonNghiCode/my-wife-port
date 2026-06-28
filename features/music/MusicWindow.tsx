'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music } from 'lucide-react'
import { useSoundStore, playSynthSound, TRACKS } from '@/store/soundStore'

const visualizerBars = Array.from({ length: 24 }).map(() => ({
  duration: 0.6 + Math.random() * 0.8,
  maxH: 22 + Math.random() * 26,
}))

interface LyricLine {
  time: number
  text: string
}

const LYRICS: Record<string, LyricLine[]> = {
  t1: [
    { time: 0, text: "[Chill lo-fi guitar plucking]" },
    { time: 6, text: "Can we have a coffee or something?" },
    { time: 14, text: "Wind rustling gently through the coffee shop trees" },
    { time: 23, text: "Soft Fender Rhodes electric piano chords join in" },
    { time: 35, text: "A cozy, quiet evening memory of two strangers" },
    { time: 48, text: "Soft crackling vinyl static in the background" },
    { time: 60, text: "Humming bird sounds chirping in the garden" },
    { time: 78, text: "The aroma of fresh coffee fills the air..." },
    { time: 96, text: "Chords slowly repeat and fade away..." },
    { time: 110, text: "[Instrumental outro]" }
  ],
  t2: [
    { time: 0, text: "[Soft piano keys introducing the melody]" },
    { time: 12, text: "Ryuichi Sakamoto's iconic masterpiece begins" },
    { time: 24, text: "Violins gently enter, warming the atmosphere" },
    { time: 42, text: "A winter breeze echoes through the strings" },
    { time: 60, text: "The piano keys dance like snowflakes" },
    { time: 85, text: "Emotional climax: Cello and Violin harmony" },
    { time: 110, text: "A calm, cinematic winter evening memory" },
    { time: 140, text: "Soft piano outro fades into silence" }
  ],
  t3: [
    { time: 0, text: "[Orchestral string opening]" },
    { time: 8, text: "For you, I could pretend like I was happy when I was sad" },
    { time: 18, text: "For you, I could pretend like I was strong when I was hurt" },
    { time: 28, text: "I wish love was perfect as love itself" },
    { time: 38, text: "I wish all my weaknesses could be hidden" },
    { time: 48, text: "I grew a flower that can't be bloomed in a dream that can't come true" },
    { time: 58, text: "I'm so sick of this fake love, fake love, fake love" },
    { time: 68, text: "I'm so sorry but it's fake love, fake love, fake love" },
    { time: 78, text: "Orchestral melody builds with dramatic drums" },
    { time: 98, text: "Love you so bad, love you so bad" },
    { time: 108, text: "Mold a pretty lie for you..." }
  ]
}

export default function MusicWindow() {
  const {
    isPlaying,
    currentTrackIdx,
    currentTime,
    duration,
    setIsPlaying,
    setCurrentTrackIdx,
    setCurrentTime,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    initAudioIfNeeded,
  } = useSoundStore()

  const [isMobile, setIsMobile] = useState(false)
  const [mobileTab, setMobileTab] = useState<'lyrics' | 'queue'>('lyrics')
  const lyricContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    initAudioIfNeeded()
  }, [initAudioIfNeeded])

  const currentTrack = TRACKS[currentTrackIdx]
  const trackLyrics = LYRICS[currentTrack.id] || []

  // Find active lyric index
  const activeLyricIdx = trackLyrics.findIndex((lyric, idx) => {
    const nextLyric = trackLyrics[idx + 1]
    return currentTime >= lyric.time && (!nextLyric || currentTime < nextLyric.time)
  })

  // Auto-scroll active lyric
  useEffect(() => {
    if (lyricContainerRef.current) {
      const activeEl = lyricContainerRef.current.querySelector('[data-active="true"]')
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    }
  }, [activeLyricIdx])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    playSynthSound('click')
  }

  const handleNext = () => {
    const nextIdx = (currentTrackIdx + 1) % TRACKS.length
    setCurrentTrackIdx(nextIdx)
    setIsPlaying(true)
    playSynthSound('click')
  }

  const handlePrev = () => {
    const prevIdx = (currentTrackIdx - 1 + TRACKS.length) % TRACKS.length
    setCurrentTrackIdx(prevIdx)
    setIsPlaying(true)
    playSynthSound('click')
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseFloat(e.target.value))
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--bg-base)',
      fontFamily: 'var(--font-ui)',
      color: 'var(--text-secondary)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* ── Dynamic Ambient Glow Background Blobs ── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {/* Orange Glow */}
        <motion.div
          animate={{
            x: isPlaying ? [0, 40, -30, 0] : 0,
            y: isPlaying ? [0, -50, 30, 0] : 0,
            scale: isPlaying ? [1, 1.2, 0.9, 1] : 1,
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '10%', left: '20%',
            width: 300, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, rgba(249, 115, 22, 0) 70%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Pink Glow */}
        <motion.div
          animate={{
            x: isPlaying ? [0, -50, 40, 0] : 0,
            y: isPlaying ? [0, 30, -50, 0] : 0,
            scale: isPlaying ? [1, 0.9, 1.15, 1] : 1,
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: '15%', right: '25%',
            width: 350, height: 350, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, rgba(236, 72, 153, 0) 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Lavender Glow */}
        <motion.div
          animate={{
            x: isPlaying ? [-20, 20, 0, -20] : 0,
            y: isPlaying ? [30, -20, 20, 30] : 0,
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '40%', right: '10%',
            width: 250, height: 250, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.08) 0%, rgba(167, 139, 250, 0) 70%)',
            filter: 'blur(45px)',
          }}
        />
      </div>

      {/* Sleek App Title Bar */}
      <div style={{
        height: 40,
        background: 'var(--window-title-bg)',
        borderBottom: '1px solid var(--window-border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: 8,
        flexShrink: 0,
        color: 'var(--orange-vivid)',
        zIndex: 1,
      }}>
        <Music size={16} strokeWidth={2.5} />
        <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Portfolio Music Deck
        </span>
      </div>

      {/* Main Grid Wrapper */}
      <div style={{
        flex: 1,
        padding: isMobile ? 16 : 28,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 16 : 28,
        overflowY: 'auto',
        alignItems: 'stretch',
        zIndex: 1,
      }}>
        
        {/* COLUMN 1: Vinyl Deck & Player Controls */}
        <div style={{
          flex: isMobile ? 'none' : '1.1',
          width: '100%',
          maxWidth: isMobile ? 420 : 340,
          background: 'var(--bg-glass)',
          border: '1.5px solid var(--window-border)',
          borderRadius: 24,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.02)',
          backdropFilter: 'blur(20px)',
          justifyContent: 'space-between',
        }}>
          {/* Deck Vinyl Area */}
          <div style={{ position: 'relative', width: 170, height: 170, margin: '5px 0' }}>
            {/* Needle Arm */}
            <motion.div
              animate={{ rotate: isPlaying ? 24 : 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 15 }}
              style={{
                position: 'absolute',
                top: -12,
                right: 12,
                width: 44,
                height: 72,
                zIndex: 10,
                transformOrigin: 'top right',
                pointerEvents: 'none',
              }}
            >
              <svg width="44" height="72" viewBox="0 0 44 72" fill="none">
                <path d="M38 5 L16 36 L20 62" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round"/>
                <rect x="15" y="58" width="8" height="10" rx="1.5" fill="var(--orange-vivid)" transform="rotate(-15, 19, 63)" />
                <circle cx="38" cy="5" r="7" fill="var(--bg-elevated)" stroke="var(--window-border)" strokeWidth="1.5" />
                <circle cx="38" cy="5" r="2.5" fill="var(--text-secondary)" />
              </svg>
            </motion.div>

            {/* Vinyl Record */}
            <motion.div
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{ ease: 'linear', duration: 12, repeat: Infinity }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#090d16',
                border: '4px solid var(--window-border)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              }}
            >
              {/* Grooves */}
              <div style={{ position: 'absolute', inset: 6, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.03)' }} />
              <div style={{ position: 'absolute', inset: 16, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.03)' }} />
              <div style={{ position: 'absolute', inset: 30, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.03)' }} />
              <div style={{ position: 'absolute', inset: 48, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.03)' }} />

              {/* Center Label */}
              <div style={{
                width: 58,
                height: 58,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--pink-soft) 0%, var(--orange-soft) 100%)',
                border: '1.5px solid var(--orange-bright)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.1)',
              }}>
                <Music size={18} color="var(--orange-vivid)" strokeWidth={2.5} />
              </div>

              {/* Vinyl center pin hole */}
              <div style={{
                position: 'absolute',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--bg-surface)',
              }} />
            </motion.div>
          </div>

          {/* Title and Artist */}
          <div style={{ textAlign: 'center', width: '100%' }}>
            <h2 style={{
              fontSize: 17,
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.3px',
              fontFamily: 'var(--font-display)',
              margin: '0 0 3px 0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {currentTrack.title}
            </h2>
            <p style={{
              fontSize: 12,
              color: 'var(--orange-vivid)',
              fontWeight: 700,
              margin: 0,
            }}>
              {currentTrack.artist}
            </p>
          </div>

          {/* Visualizer */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 2.5,
            height: 32,
            justifyContent: 'center',
            width: '100%',
            overflow: 'hidden',
          }}>
            {visualizerBars.slice(0, 18).map((bar, i) => (
              <div
                key={i}
                style={{
                  width: 3,
                  height: isPlaying ? bar.maxH * 0.9 : 4,
                  background: 'var(--pink-vivid)',
                  borderRadius: 1,
                  animation: isPlaying ? `bounceVisualizer ${bar.duration}s ease-in-out ${i * 0.03}s infinite alternate` : 'none',
                  transition: 'height 0.3s ease',
                }}
              />
            ))}
          </div>

          {/* Player controls */}
          <div style={{
            width: '100%',
            borderTop: '1px solid var(--window-border)',
            paddingTop: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
            {/* Progress track */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-muted)', width: 30 }}>{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleProgressChange}
                style={{
                  flex: 1,
                  cursor: 'none',
                  accentColor: 'var(--orange-vivid)',
                  height: 4,
                  borderRadius: 2,
                }}
              />
              <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-muted)', width: 30 }}>{formatTime(duration)}</span>
            </div>

            {/* Controls panel */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={handlePrev} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'none', display: 'flex', padding: 4 }}>
                  <SkipBack size={16} />
                </button>

                <button
                  onClick={handlePlayPause}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'var(--orange-vivid)',
                    color: '#ffffff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: 'none',
                    boxShadow: '0 4px 10px rgba(249,115,22,0.25)',
                    cursor: 'none',
                    transition: 'transform 0.1s',
                  }}
                >
                  {isPlaying ? <Pause size={16} fill="#ffffff" /> : <Play size={16} fill="#ffffff" style={{ marginLeft: 2 }} />}
                </button>

                <button onClick={handleNext} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'none', display: 'flex', padding: 4 }}>
                  <SkipForward size={16} />
                </button>
              </div>

              {/* Volume */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button
                  onClick={toggleMute}
                  style={{ background: 'none', border: 'none', color: 'var(--orange-vivid)', cursor: 'none', display: 'flex', alignItems: 'center', padding: 4 }}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  style={{
                    width: 60,
                    cursor: 'none',
                    accentColor: 'var(--orange-vivid)',
                    height: 4,
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: Live Synced Lyrics (Desktop: Center column, Mobile: Tabbed below player) */}
        {(!isMobile || mobileTab === 'lyrics') && (
          <div style={{
            flex: 1,
            width: '100%',
            background: 'var(--bg-glass)',
            border: '1.5px solid var(--window-border)',
            borderRadius: 24,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.02)',
            backdropFilter: 'blur(20px)',
          }}>
            <h3 style={{
              fontSize: 10,
              fontWeight: 800,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              margin: 0,
            }}>
              Live Melodic Script
            </h3>

            {/* Lyrics Scroll Pane */}
            <div
              ref={lyricContainerRef}
              style={{
                flex: 1,
                overflowY: 'auto',
                paddingRight: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                scrollBehavior: 'smooth',
                height: isMobile ? 180 : 'none',
              }}
            >
              {trackLyrics.length > 0 ? (
                trackLyrics.map((line, idx) => {
                  const isActive = idx === activeLyricIdx
                  return (
                    <p
                      key={idx}
                      data-active={isActive ? 'true' : 'false'}
                      style={{
                        fontSize: isActive ? 15 : 12,
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? 'var(--orange-vivid)' : 'var(--text-muted)',
                        margin: 0,
                        lineHeight: 1.5,
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        transform: isActive ? 'scale(1.03)' : 'scale(1)',
                        textShadow: isActive ? '0 0 12px rgba(249, 115, 22, 0.15)' : 'none',
                      }}
                    >
                      {line.text}
                    </p>
                  )
                })
              ) : (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 12 }}>
                  Lyrics unavailable for this track
                </div>
              )}
            </div>
          </div>
        )}

        {/* COLUMN 3: Queue List (Desktop: Right column, Mobile: Tabbed below player) */}
        {(!isMobile || mobileTab === 'queue') && (
          <div style={{
            width: '100%',
            maxWidth: isMobile ? 420 : 280,
            background: 'var(--bg-glass)',
            border: '1.5px solid var(--window-border)',
            borderRadius: 24,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.02)',
            backdropFilter: 'blur(20px)',
          }}>
            <h3 style={{
              fontSize: 10,
              fontWeight: 800,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              margin: 0,
            }}>
              Tracks Queue ({TRACKS.length})
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              overflowY: 'auto',
              flex: 1,
              height: isMobile ? 180 : 'none',
            }}>
              {TRACKS.map((t, idx) => {
                const isCurrent = idx === currentTrackIdx
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setCurrentTrackIdx(idx)
                      setIsPlaying(true)
                      playSynthSound('click')
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: 12,
                      background: isCurrent ? 'var(--orange-soft)' : 'var(--bg-surface)',
                      border: `1.5px solid ${isCurrent ? 'var(--orange-bright)' : 'var(--window-border)'}`,
                      color: isCurrent ? 'var(--orange-vivid)' : 'var(--text-secondary)',
                      textAlign: 'left',
                      cursor: 'none',
                      transition: 'all 0.2s',
                      boxShadow: isCurrent ? 'none' : '0 2px 6px rgba(0,0,0,0.01)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                      {/* Bouncing tiny wave indicator */}
                      <div style={{
                        width: 22, height: 22, borderRadius: 6,
                        background: isCurrent ? 'rgba(249,115,22,0.08)' : 'var(--bg-elevated)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 9, fontWeight: 800,
                        color: isCurrent ? 'var(--orange-vivid)' : 'var(--text-muted)',
                        flexShrink: 0,
                      }}>
                        {isCurrent && isPlaying ? (
                          <div style={{ display: 'flex', gap: 1, height: 8, alignItems: 'flex-end' }}>
                            {[0, 1, 2].map((n) => (
                              <div
                                key={n}
                                style={{
                                  width: 1.5,
                                  height: '100%',
                                  background: 'var(--orange-vivid)',
                                  borderRadius: 0.5,
                                  animation: 'miniBounce 0.5s ease-in-out infinite alternate',
                                  animationDelay: `${n * 0.15}s`,
                                }}
                              />
                            ))}
                          </div>
                        ) : (
                          String(idx + 1).padStart(2, '0')
                        )}
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {t.title}
                        </div>
                        <div style={{ fontSize: 9, color: isCurrent ? 'var(--orange-vivid)' : 'var(--text-muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {t.artist}
                        </div>
                      </div>
                    </div>

                    <span style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 700, paddingLeft: 6 }}>
                      {t.duration}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile Segment Tab Control ── */}
      {isMobile && (
        <div style={{
          padding: '0 16px 16px',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 1,
        }}>
          <div style={{
            background: 'var(--bg-glass)',
            border: '1.5px solid var(--window-border)',
            borderRadius: 14,
            padding: 4,
            display: 'flex',
            gap: 4,
            width: '100%',
            maxWidth: 320,
          }}>
            <button
              onClick={() => { setMobileTab('lyrics'); playSynthSound('click') }}
              style={{
                flex: 1,
                padding: '8px 0',
                borderRadius: 10,
                border: 'none',
                background: mobileTab === 'lyrics' ? 'var(--orange-soft)' : 'transparent',
                color: mobileTab === 'lyrics' ? 'var(--orange-vivid)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: 11,
                cursor: 'none',
                transition: 'all 0.2s',
              }}
            >
              Lyrics Script
            </button>
            <button
              onClick={() => { setMobileTab('queue'); playSynthSound('click') }}
              style={{
                flex: 1,
                padding: '8px 0',
                borderRadius: 10,
                border: 'none',
                background: mobileTab === 'queue' ? 'var(--orange-soft)' : 'transparent',
                color: mobileTab === 'queue' ? 'var(--orange-vivid)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: 11,
                cursor: 'none',
                transition: 'all 0.2s',
              }}
            >
              Tracks Queue
            </button>
          </div>
        </div>
      )}

      {/* Visualizer & Wave CSS style helpers */}
      <style>{`
        @keyframes bounceVisualizer {
          0% { height: 4px; }
          100% { height: 24px; }
        }
        @keyframes miniBounce {
          0% { height: 2px; }
          100% { height: 8px; }
        }
      `}</style>
    </div>
  )
}
