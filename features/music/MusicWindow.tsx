'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useDesktopStore } from '@/store/desktopStore'
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

const LYRICS_EN: Record<string, LyricLine[]> = {
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

const LYRICS_VI: Record<string, LyricLine[]> = {
  t1: [
    { time: 0, text: "[Guitar lo-fi mộc mạc thư giãn]" },
    { time: 6, text: "Chúng ta có thể uống một ly cà phê hay gì đó không?" },
    { time: 14, text: "Gió thổi xào xạc qua hàng cây quán cà phê" },
    { time: 23, text: "Tiếng đàn piano điện Rhodes ấm áp vang lên hòa nhịp" },
    { time: 35, text: "Ký ức chiều yên bình của hai người xa lạ" },
    { time: 48, text: "Tiếng xè xè của đĩa than cổ điển chạy ở nền" },
    { time: 60, text: "Tiếng chim hót líu lo ngoài khu vườn nhỏ" },
    { time: 78, text: "Hương vị cà phê mới pha lan tỏa khắp không gian..." },
    { time: 96, text: "Các hợp âm lặp lại chậm rãi rồi nhỏ dần..." },
    { time: 110, text: "[Nhạc dạo kết thúc]" }
  ],
  t2: [
    { time: 0, text: "[Tiếng dương cầm nhẹ nhàng dẫn dắt giai điệu]" },
    { time: 12, text: "Tuyệt tác kinh điển của nhạc sĩ Ryuichi Sakamoto bắt đầu" },
    { time: 24, text: "Dàn vĩ cầm hòa nhịp, sưởi ấm bầu không khí" },
    { time: 42, text: "Làn gió đông vang vọng qua các dây đàn" },
    { time: 60, text: "Phím đàn piano nhảy múa như những bông tuyết rơi" },
    { time: 85, text: "Cao trào cảm xúc: Sự hòa quyện của Cello và Violin" },
    { time: 110, text: "Ký ức đêm mùa đông yên bình, đậm chất điện ảnh" },
    { time: 140, text: "Tiếng dương cầm dạo kết nhỏ dần vào tĩnh lặng" }
  ],
  t3: [
    { time: 0, text: "[Mở đầu bằng dàn dây giao hưởng]" },
    { time: 8, text: "Vì em, tôi có thể giả vờ hạnh phúc lúc buồn thương" },
    { time: 18, text: "Vì em, tôi có thể giả vờ mạnh mẽ lúc tổn thương" },
    { time: 28, text: "Ước gì tình yêu này hoàn hảo như chính bản chất của nó" },
    { time: 38, text: "Ước gì mọi điểm yếu của tôi đều được giấu kín" },
    { time: 48, text: "Tôi đã nuôi dưỡng một đóa hoa không thể nở trong giấc mơ không thể thành hiện thực" },
    { time: 58, text: "Tôi đã quá mệt mỏi với tình yêu giả tạo này rồi" },
    { time: 68, text: "Tôi xin lỗi nhưng đây chỉ là tình yêu giả tạo mà thôi" },
    { time: 78, text: "Giai điệu giao hưởng dồn dập cùng tiếng trống kịch tính" },
    { time: 98, text: "Yêu em thật nhiều, yêu em thật nhiều" },
    { time: 108, text: "Dệt nên một lời nói dối ngọt ngào cho em..." }
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
  const { language } = useDesktopStore()

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
  const lyricsData = language === 'vi' ? LYRICS_VI : LYRICS_EN
  const trackLyrics = lyricsData[currentTrack.id] || []

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

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
  }

  const handlePrevTrack = () => {
    playSynthSound('click')
    setCurrentTrackIdx((currentTrackIdx === 0 ? TRACKS.length - 1 : currentTrackIdx - 1))
    setIsPlaying(true)
  }

  const handleNextTrack = () => {
    playSynthSound('click')
    setCurrentTrackIdx((currentTrackIdx === TRACKS.length - 1 ? 0 : currentTrackIdx + 1))
    setIsPlaying(true)
  }

  const handlePlayToggle = () => {
    playSynthSound('click')
    setIsPlaying(!isPlaying)
  }

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'transparent',
      fontFamily: 'var(--font-ui), system-ui, sans-serif',
      color: 'var(--text-primary)',
    }}>
      {/* Upper Main Player Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        overflow: 'hidden',
      }}>
        {/* Left Console Panel (Controls & Visualizer) */}
        <div style={{
          width: isMobile ? '100%' : '340px',
          borderRight: isMobile ? 'none' : '1.5px solid var(--window-border)',
          borderBottom: isMobile ? '1.5px solid var(--window-border)' : 'none',
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(20px)',
          flexShrink: 0,
        }}>
          {/* Top segment: Title details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span style={{
              fontSize: 10,
              fontWeight: 800,
              color: 'var(--orange-vivid)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              background: 'rgba(249, 115, 22, 0.08)',
              border: '1.5px solid rgba(249, 115, 22, 0.25)',
              padding: '4px 10px',
              borderRadius: 8,
              width: 'fit-content',
            }}>
              SoundCloud Workstation
            </span>

            <div>
              <h2 style={{
                fontSize: 18,
                fontWeight: 900,
                color: 'var(--text-primary)',
                margin: 0,
                letterSpacing: '-0.3px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {currentTrack.title}
              </h2>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginTop: 4 }}>
                {currentTrack.artist}
              </span>
            </div>
          </div>

          {/* Middle segment: Interactive Waveform Visualizer */}
          <div style={{
            height: 60,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 2,
            margin: '28px 0',
            padding: '0 8px',
          }}>
            {visualizerBars.map((bar, idx) => (
              <motion.div
                key={idx}
                animate={isPlaying ? {
                  height: [4, bar.maxH, 4],
                } : { height: 4 }}
                transition={isPlaying ? {
                  duration: bar.duration,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                } : {}}
                style={{
                  flex: 1,
                  background: isPlaying ? 'var(--orange-vivid)' : 'var(--text-muted)',
                  borderRadius: 1.5,
                  minWidth: 4,
                  maxWidth: 6,
                }}
              />
            ))}
          </div>

          {/* Bottom segment: Progress sliders and Primary buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Timeline Slider */}
            <div>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleProgressChange}
                style={{
                  width: '100%',
                  accentColor: 'var(--orange-vivid)',
                  height: 4,
                  borderRadius: 2,
                  outline: 'none',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, fontWeight: 700, color: 'var(--text-muted)', marginTop: 6 }}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Button Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevTrack}
                data-cursor="pointer"
                style={{
                  background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'none',
                  padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <SkipBack size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayToggle}
                data-cursor="pointer"
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'var(--orange-vivid)', border: 'none',
                  color: '#ffffff', cursor: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(249, 115, 22, 0.25)',
                }}
              >
                {isPlaying ? <Pause size={18} fill="#ffffff" /> : <Play size={18} fill="#ffffff" style={{ marginLeft: 3 }} />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNextTrack}
                data-cursor="pointer"
                style={{
                  background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'none',
                  padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <SkipForward size={18} />
              </motion.button>
            </div>

            {/* Volume sliders */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
              <button
                onClick={toggleMute}
                data-cursor="pointer"
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'none', padding: 2 }}
              >
                {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={{
                  flex: 1,
                  accentColor: 'var(--orange-vivid)',
                  height: 3,
                  borderRadius: 1.5,
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Scrollable Panel: Live Lyrics (Dynamic high-fidelity transcript feed) */}
        {(!isMobile || mobileTab === 'lyrics') && (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-glass)30',
            backdropFilter: 'blur(10px)',
          }}>
            {/* Lyrics Header bar */}
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid var(--window-border)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--window-title-bg)',
              flexShrink: 0,
            }}>
              <Music size={14} color="var(--orange-vivid)" />
              <h3 style={{
                fontSize: 10,
                fontWeight: 900,
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                margin: 0,
              }}>
                {language === 'vi' ? 'LỜI BÀI HÁT' : 'LIVE LYRICS SCRIPT'}
              </h3>
            </div>

            {/* Lyrics Feed */}
            <div
              ref={lyricContainerRef}
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
                scrollBehavior: 'smooth',
              }}
            >
              {trackLyrics.map((lyric, idx) => {
                const isActive = idx === activeLyricIdx
                return (
                  <motion.div
                    key={idx}
                    data-active={isActive}
                    animate={{
                      opacity: isActive ? 1 : 0.28,
                      scale: isActive ? 1.015 : 0.98,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontSize: isActive ? 20 : 16.5,
                      fontWeight: isActive ? 800 : 600,
                      color: isActive ? 'var(--orange-vivid)' : 'var(--text-primary)',
                      lineHeight: 1.5,
                      cursor: 'none',
                      transformOrigin: 'left center',
                    }}
                  >
                    {lyric.text}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Right Scrollable Panel: Playlist Tracks Queue (Mobile only when toggle is on) */}
        {(!isMobile || mobileTab === 'queue') && (
          <div style={{
            width: isMobile ? '100%' : '300px',
            borderLeft: isMobile ? 'none' : '1.5px solid var(--window-border)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            background: 'var(--bg-glass)50',
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
              {language === 'vi' ? `Danh sách phát (${TRACKS.length})` : `Tracks Queue (${TRACKS.length})`}
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
              {language === 'vi' ? 'Lời bài hát' : 'Lyrics Script'}
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
              {language === 'vi' ? 'Danh sách phát' : 'Tracks Queue'}
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
