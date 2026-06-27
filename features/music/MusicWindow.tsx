'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, CloudRain, Flame, Bird, Sparkles } from 'lucide-react'
import { useSoundStore, playSynthSound, TRACKS } from '@/store/soundStore'

const visualizerBars = Array.from({ length: 18 }).map(() => ({
  duration: 0.5 + Math.random() * 0.7,
  maxH: 20 + Math.random() * 35,
}))

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Ambient Sounds state (kept local since it runs in background when mounted but hidden)
  const [rainVolume, setRainVolume] = useState(0)
  const [fireVolume, setFireVolume] = useState(0)
  const [birdVolume, setBirdVolume] = useState(0)

  // Ref to hold current volume values to avoid stale closures in Web Audio intervals
  const volumesRef = useRef({ rainVolume, fireVolume, birdVolume })
  useEffect(() => {
    volumesRef.current = { rainVolume, fireVolume, birdVolume }
  }, [rainVolume, fireVolume, birdVolume])

  // Web Audio Context for synthesized ambient noise
  const audioCtxRef = useRef<AudioContext | null>(null)
  const rainGainRef = useRef<GainNode | null>(null)
  const fireGainRef = useRef<GainNode | null>(null)
  const birdGainRef = useRef<GainNode | null>(null)

  const currentTrack = TRACKS[currentTrackIdx]

  // Initialize audio when window mounts
  useEffect(() => {
    initAudioIfNeeded()
  }, [initAudioIfNeeded])

  // Extended interface for AudioContext to track active intervals
  interface ExtendedAudioContext extends AudioContext {
    intervals?: NodeJS.Timeout[]
  }

  // Initialize Web Audio API for Ambient Synthesizer
  const initAmbientSynth = useCallback(() => {
    if (audioCtxRef.current) return
    const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return

    const ctx = new AudioContextClass() as ExtendedAudioContext
    audioCtxRef.current = ctx

    // 1. Synthesize Rain (Pink noise with Lowpass Filter)
    const bufferSize = 2 * ctx.sampleRate
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    
    // Pink noise generation algorithm
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      b3 = 0.86650 * b3 + white * 0.3104856
      b4 = 0.55000 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.0168980
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
      output[i] *= 0.11 // keep volume moderate
      b6 = white * 0.115926
    }

    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = noiseBuffer
    noiseSource.loop = true

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 600

    const rainGain = ctx.createGain()
    rainGain.gain.value = 0

    noiseSource.connect(filter)
    filter.connect(rainGain)
    rainGain.connect(ctx.destination)
    noiseSource.start()

    rainGainRef.current = rainGain

    // 2. Campfire Crackle (Low frequency rumble + periodic noise clicks)
    const fireGain = ctx.createGain()
    fireGain.gain.value = 0
    fireGain.connect(ctx.destination)
    fireGainRef.current = fireGain

    // Campfire rumble node (Lowpass filtered pink noise)
    const rumbleSource = ctx.createBufferSource()
    rumbleSource.buffer = noiseBuffer
    rumbleSource.loop = true
    const rumbleFilter = ctx.createBiquadFilter()
    rumbleFilter.type = 'lowpass'
    rumbleFilter.frequency.value = 150
    const rumbleGain = ctx.createGain()
    rumbleGain.gain.value = 0.7
    rumbleSource.connect(rumbleFilter)
    rumbleFilter.connect(rumbleGain)
    rumbleGain.connect(fireGain)
    rumbleSource.start()

    // Periodical crackle generator
    const interval = setInterval(() => {
      if (!fireGainRef.current || volumesRef.current.fireVolume === 0 || ctx.state === 'suspended') return
      const crackleOsc = ctx.createOscillator()
      const crackleGain = ctx.createGain()
      crackleOsc.type = 'triangle'
      crackleOsc.frequency.setValueAtTime(100 + Math.random() * 400, ctx.currentTime)
      crackleGain.gain.setValueAtTime(Math.random() * 0.15, ctx.currentTime)
      crackleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02 + Math.random() * 0.03)
      crackleOsc.connect(crackleGain)
      crackleGain.connect(fireGain)
      crackleOsc.start()
      crackleOsc.stop(ctx.currentTime + 0.06)
    }, 150)

    // 3. Bird Chirp Synthesizer
    const birdGain = ctx.createGain()
    birdGain.gain.value = 0
    birdGain.connect(ctx.destination)
    birdGainRef.current = birdGain

    const chirpInterval = setInterval(() => {
      if (!birdGainRef.current || volumesRef.current.birdVolume === 0 || ctx.state === 'suspended') return
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(2000 + Math.random() * 800, now)
      osc.frequency.exponentialRampToValueAtTime(4000 + Math.random() * 500, now + 0.15)
      g.gain.setValueAtTime(0, now)
      g.gain.linearRampToValueAtTime(0.05, now + 0.03)
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.18)
      osc.connect(g)
      g.connect(birdGain)
      osc.start(now)
      osc.stop(now + 0.2)
    }, 2800)

    ctx.intervals = [interval, chirpInterval]
  }, [])

  // Handle ambient volume adjustments
  useEffect(() => {
    if (rainVolume > 0 || fireVolume > 0 || birdVolume > 0) {
      initAmbientSynth()
    }
    const ctx = audioCtxRef.current
    if (ctx && ctx.state === 'suspended') {
      ctx.resume()
    }

    if (rainGainRef.current) rainGainRef.current.gain.value = rainVolume * 0.8
    if (fireGainRef.current) fireGainRef.current.gain.value = fireVolume * 0.6
    if (birdGainRef.current) birdGainRef.current.gain.value = birdVolume * 0.5
  }, [rainVolume, fireVolume, birdVolume, initAmbientSynth])

  // Cleanup synthesizer on unmount
  useEffect(() => {
    return () => {
      const ctx = audioCtxRef.current as ExtendedAudioContext | null
      if (ctx) {
        if (ctx.intervals) {
          ctx.intervals.forEach(clearInterval)
        }
        ctx.close()
      }
    }
  }, [])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    const nextIdx = (currentTrackIdx + 1) % TRACKS.length
    setCurrentTrackIdx(nextIdx)
    setIsPlaying(true)
  }

  const handlePrev = () => {
    const prevIdx = (currentTrackIdx - 1 + TRACKS.length) % TRACKS.length
    setCurrentTrackIdx(prevIdx)
    setIsPlaying(true)
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
      flexDirection: 'row',
      height: '100%',
      background: 'transparent',
      fontFamily: 'var(--font-ui)',
      color: 'var(--text-secondary)',
    }}>
      {/* Sidebar (Desktop only) */}
      {!isMobile && (
        <div style={{
          width: 220,
          background: 'var(--window-title-bg)',
          borderRight: '1px solid var(--window-border)',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          flexShrink: 0,
        }}>
          {/* Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f97316' }}>
            <Music size={20} strokeWidth={2.5} />
            <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '0.05em' }}>SOUNDCLOUD MINI</span>
          </div>

          {/* Tracks List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Discover Tracks</div>
            {TRACKS.map((t, idx) => {
              const isCurrent = idx === currentTrackIdx
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setCurrentTrackIdx(idx)
                    setIsPlaying(true)
                  }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                    padding: '10px 12px', borderRadius: 10,
                    background: isCurrent ? 'rgba(249,115,22,0.08)' : 'transparent',
                    border: `1px solid ${isCurrent ? 'rgba(249,115,22,0.18)' : 'transparent'}`,
                    color: isCurrent ? '#f97316' : 'var(--text-secondary)',
                    textAlign: 'left',
                    cursor: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                    {String(idx + 1).padStart(2, '0')}. {t.title}
                  </span>
                  <span style={{ fontSize: 9, color: isCurrent ? '#f97316' : '#9ca3af', marginTop: 2 }}>{t.artist}</span>
                </button>
              )
            })}
          </div>

          {/* System Sound Effects Test */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Sparkles size={10} /> SFX Test Panel
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              <button onClick={() => playSynthSound('click')} style={{ fontSize: 9, fontWeight: 600, padding: '6px', background: 'var(--bg-elevated)', border: '1px solid var(--window-border)', color: 'var(--text-secondary)', borderRadius: 6, cursor: 'none' }}>Click</button>
              <button onClick={() => playSynthSound('open')} style={{ fontSize: 9, fontWeight: 600, padding: '6px', background: 'var(--bg-elevated)', border: '1px solid var(--window-border)', color: 'var(--text-secondary)', borderRadius: 6, cursor: 'none' }}>Open</button>
              <button onClick={() => playSynthSound('close')} style={{ fontSize: 9, fontWeight: 600, padding: '6px', background: 'var(--bg-elevated)', border: '1px solid var(--window-border)', color: 'var(--text-secondary)', borderRadius: 6, cursor: 'none' }}>Close</button>
              <button onClick={() => playSynthSound('boot')} style={{ fontSize: 9, fontWeight: 600, padding: '6px', background: 'var(--bg-elevated)', border: '1px solid var(--window-border)', color: 'var(--text-secondary)', borderRadius: 6, cursor: 'none' }}>Boot</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Area */}
      <div style={{
        flex: 1,
        padding: isMobile ? '16px' : '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? 20 : 32,
        overflowY: 'auto',
      }}>
        {/* Track Info Card */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--window-border)',
          borderRadius: 20,
          padding: isMobile ? '20px' : '24px 32px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: isMobile ? 20 : 16,
          boxShadow: '0 8px 24px rgba(249,115,22,0.04)',
        }}>
          <div style={isMobile ? { textAlign: 'center' } : {}}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f97316', color: '#ffffff', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 99, width: 'fit-content', textTransform: 'uppercase', letterSpacing: '0.05em', margin: isMobile ? '0 auto' : '0' }}>
              SoundCloud Stream
            </div>
            <h2 style={{ fontSize: isMobile ? 18 : 20, fontWeight: 800, color: 'var(--text-primary)', marginTop: 12, letterSpacing: '-0.3px' }}>{currentTrack.title}</h2>
            <p style={{ fontSize: 13, color: '#f97316', fontWeight: 600, marginTop: 4 }}>{currentTrack.artist}</p>
          </div>

          {/* Animated Visualizer (Bouncing bars) */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 3,
            height: isMobile ? 40 : 60,
            width: isMobile ? '100%' : 140,
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            {visualizerBars.slice(0, isMobile ? 14 : 18).map((bar, i) => {
              return (
                <div
                  key={i}
                  style={{
                    width: 4,
                    height: isPlaying ? (isMobile ? bar.maxH * 0.7 : bar.maxH) : 6,
                    background: 'var(--pink-vivid)',
                    borderRadius: 2,
                    animation: isPlaying ? `bounceVisualizer ${bar.duration}s ease-in-out infinite alternate` : 'none',
                    animationDelay: `${i * 0.04}s`,
                    transition: 'height 0.3s ease',
                  }}
                />
              )
            })}
          </div>
        </div>

        {/* Discover Tracks (Mobile Only, since sidebar is hidden) */}
        {isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Discover Tracks</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {TRACKS.map((t, idx) => {
                const isCurrent = idx === currentTrackIdx
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setCurrentTrackIdx(idx)
                      setIsPlaying(true)
                    }}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '12px 16px', borderRadius: 12,
                      background: isCurrent ? 'rgba(249,115,22,0.06)' : 'var(--bg-surface)',
                      border: `1px solid ${isCurrent ? '#f97316' : 'var(--window-border)'}`,
                      color: isCurrent ? '#f97316' : 'var(--text-secondary)',
                      textAlign: 'left',
                      cursor: 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>
                        {String(idx + 1).padStart(2, '0')}. {t.title}
                      </div>
                      <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 2 }}>{t.artist}</div>
                    </div>
                    <span style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600 }}>{t.duration}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Sound FX & Ambient Mixer Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h3 style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ambient Noise Mixer</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: 12,
          }}>
            {/* Rain Node */}
            <div style={{
              background: 'var(--bg-surface)', border: '1px solid var(--window-border)', borderRadius: 16, padding: '14px 18px',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, color: '#0284c7' }}>
                <CloudRain size={15} /> Rain Generator
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={rainVolume}
                onChange={(e) => setRainVolume(parseFloat(e.target.value))}
                style={{ width: '100%', cursor: 'none', accentColor: '#0ea5e9' }}
              />
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 600 }}>Volume: {Math.round(rainVolume * 100)}%</span>
            </div>

            {/* Fire Node */}
            <div style={{
              background: 'var(--bg-surface)', border: '1px solid var(--window-border)', borderRadius: 16, padding: '14px 18px',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, color: '#d97706' }}>
                <Flame size={15} /> Campfire crackles
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={fireVolume}
                onChange={(e) => setFireVolume(parseFloat(e.target.value))}
                style={{ width: '100%', cursor: 'none', accentColor: '#ec4899' }}
              />
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 600 }}>Volume: {Math.round(fireVolume * 100)}%</span>
            </div>

            {/* Bird Node */}
            <div style={{
              background: 'var(--bg-surface)', border: '1px solid var(--window-border)', borderRadius: 16, padding: '14px 18px',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, color: '#16a34a' }}>
                <Bird size={15} /> Forest birds
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={birdVolume}
                onChange={(e) => setBirdVolume(parseFloat(e.target.value))}
                style={{ width: '100%', cursor: 'none', accentColor: '#10b981' }}
              />
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 600 }}>Volume: {Math.round(birdVolume * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Music Player Controls Bottom */}
        <div style={{
          marginTop: isMobile ? 12 : 'auto',
          borderTop: '1px solid var(--window-border)',
          paddingTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          {/* Progress track */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', width: 32 }}>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleProgressChange}
              style={{
                flex: 1,
                cursor: 'none',
                accentColor: '#f97316',
                height: 4,
                borderRadius: 2,
              }}
            />
            <span style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', width: 32 }}>{formatTime(duration)}</span>
          </div>

          {/* Controls Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}>
            {/* Skip Back / Play / Skip Forward */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button onClick={handlePrev} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'none' }}>
                <SkipBack size={20} />
              </button>

              <button
                onClick={handlePlayPause}
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: '#f97316',
                  color: '#ffffff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(249,115,22,0.3)',
                  cursor: 'none',
                  transition: 'transform 0.1s',
                }}
              >
                {isPlaying ? <Pause size={20} fill="#ffffff" /> : <Play size={20} fill="#ffffff" style={{ marginLeft: 3 }} />}
              </button>

              <button onClick={handleNext} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'none' }}>
                <SkipForward size={20} />
              </button>
            </div>

            {/* Visualizer CSS style helper */}
            <style>{`
              @keyframes bounceVisualizer {
                0% { height: 6px; }
                100% { height: 48px; }
              }
            `}</style>

            {/* Mute & Sound Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={toggleMute}
                style={{ background: 'none', border: 'none', color: '#f97316', cursor: 'none', display: 'flex', alignItems: 'center' }}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              
              {/* Volume Slider */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value))
                }}
                style={{
                  width: 80,
                  cursor: 'none',
                  accentColor: '#f97316',
                  height: 4,
                  borderRadius: 2,
                }}
              />
              
              <div style={{ fontSize: 11, fontWeight: 700, color: '#f97316', whiteSpace: 'nowrap' }}>
                {isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
