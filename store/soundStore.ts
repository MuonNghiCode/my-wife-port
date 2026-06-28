import { create } from 'zustand'

export interface Track {
  id: string
  title: string
  artist: string
  url: string
  duration: string
}

export const TRACKS: Track[] = [
  {
    id: 't1',
    title: 'Merry Christmas Mr. Lawrence',
    artist: 'Ryuichi Sakamoto (Violin, Cello & Piano)',
    url: '/audio/Merry Christmas Mr. Lawrence_ Violin,Cello&Piano (Ryuichi Sakamoto).mp3',
    duration: '5:16',
  },
  {
    id: 't2',
    title: 'We are never met but, can we have a coffee or something?',
    artist: 'In Love With A Ghost',
    url: '/audio/in love with a ghost _ weve never met but, can we have a coffee or something_.mp3',
    duration: '3:18',
  },
  {
    id: 't3',
    title: 'FAKE LOVE (Orchestral Cover)',
    artist: 'BTS (방탄소년단)',
    url: '/audio/BTS (방탄소년단) FAKE LOVE Orchestral Cover.mp3',
    duration: '4:02',
  },
]

interface SoundStore {
  isMuted: boolean
  volume: number
  toggleMute: () => void
  setVolume: (v: number) => void

  // Music Player Shared State
  isPlaying: boolean
  currentTrackIdx: number
  currentTime: number
  duration: number
  setIsPlaying: (playing: boolean) => void
  setCurrentTrackIdx: (idx: number) => void
  setCurrentTime: (time: number) => void
  setDuration: (dur: number) => void
  initAudioIfNeeded: () => void
}

let globalAudio: HTMLAudioElement | null = null

export const useSoundStore = create<SoundStore>((set, get) => ({
  isMuted: false,
  volume: 0.5,
  toggleMute: () => {
    const muted = !get().isMuted
    set({ isMuted: muted })
    if (globalAudio) globalAudio.muted = muted
  },
  setVolume: (volume) => {
    set({ volume })
    if (globalAudio) globalAudio.volume = volume
  },

  // Music Player
  isPlaying: false,
  currentTrackIdx: 0,
  currentTime: 0,
  duration: 0,

  setIsPlaying: (isPlaying) => {
    get().initAudioIfNeeded()
    set({ isPlaying })
    if (globalAudio) {
      if (isPlaying) {
        globalAudio.play().catch(() => set({ isPlaying: false }))
      } else {
        globalAudio.pause()
      }
    }
  },

  setCurrentTrackIdx: (idx) => {
    set({ currentTrackIdx: idx, currentTime: 0, duration: 0 })
    if (typeof window !== 'undefined') {
      if (globalAudio) {
        globalAudio.pause()
      }
      const track = TRACKS[idx]
      globalAudio = new Audio(track.url)
      globalAudio.volume = get().isMuted ? 0 : get().volume
      globalAudio.muted = get().isMuted

      globalAudio.addEventListener('timeupdate', () => {
        if (globalAudio) set({ currentTime: globalAudio.currentTime })
      })
      globalAudio.addEventListener('loadedmetadata', () => {
        if (globalAudio) set({ duration: globalAudio.duration })
      })
      globalAudio.addEventListener('ended', () => {
        const nextIdx = (get().currentTrackIdx + 1) % TRACKS.length
        get().setCurrentTrackIdx(nextIdx)
        get().setIsPlaying(true)
      })

      if (get().isPlaying) {
        globalAudio.play().catch(() => set({ isPlaying: false }))
      }
    }
  },

  setCurrentTime: (time) => {
    set({ currentTime: time })
    if (globalAudio) globalAudio.currentTime = time
  },

  setDuration: (duration) => set({ duration }),

  initAudioIfNeeded: () => {
    if (!globalAudio && typeof window !== 'undefined') {
      const idx = get().currentTrackIdx
      const track = TRACKS[idx]
      globalAudio = new Audio(track.url)
      globalAudio.volume = get().isMuted ? 0 : get().volume
      globalAudio.muted = get().isMuted

      globalAudio.addEventListener('timeupdate', () => {
        if (globalAudio) set({ currentTime: globalAudio.currentTime })
      })
      globalAudio.addEventListener('loadedmetadata', () => {
        if (globalAudio) set({ duration: globalAudio.duration })
      })
      globalAudio.addEventListener('ended', () => {
        const nextIdx = (get().currentTrackIdx + 1) % TRACKS.length
        get().setCurrentTrackIdx(nextIdx)
        get().setIsPlaying(true)
      })
    }
  }
}))

let audioCtx: AudioContext | null = null

function getAudioContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)()
  }
  return audioCtx
}

export function playSynthSound(type: 'click' | 'open' | 'close' | 'boot' | 'login' | 'usb' | 'shutdown' | 'sleep') {
  const { isMuted, volume } = useSoundStore.getState()
  if (isMuted) return

  const ctx = getAudioContext()
  if (!ctx) return

  if (ctx.state === 'suspended') {
    ctx.resume()
  }

  const dest = ctx.destination

  switch (type) {
    case 'click': {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(900, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.05)

      gain.gain.setValueAtTime(volume * 0.15, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

      osc.connect(gain)
      gain.connect(dest)
      osc.start()
      osc.stop(ctx.currentTime + 0.06)
      break
    }
    case 'usb': {
      const playTick = (delay: number, pitch: number) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(pitch, ctx.currentTime + delay)
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + delay + 0.06)
        gain.gain.setValueAtTime(volume * 0.25, ctx.currentTime + delay)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.06)
        osc.connect(gain)
        gain.connect(dest)
        osc.start(ctx.currentTime + delay)
        osc.stop(ctx.currentTime + delay + 0.07)
      }
      playTick(0, 220)
      playTick(0.08, 140)
      break
    }
    case 'boot': {
      const playTone = (freq: number, delay: number, dur: number) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay)
        gain.gain.setValueAtTime(0, ctx.currentTime + delay)
        gain.gain.linearRampToValueAtTime(volume * 0.1, ctx.currentTime + delay + 0.15)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur)
        osc.connect(gain)
        gain.connect(dest)
        osc.start(ctx.currentTime + delay)
        osc.stop(ctx.currentTime + delay + dur + 0.2)
      }
      // Warm C Major 7th chord
      playTone(261.63, 0, 1.4)      // C4
      playTone(329.63, 0.06, 1.5)   // E4
      playTone(392.00, 0.12, 1.6)   // G4
      playTone(493.88, 0.18, 1.7)   // B4
      playTone(523.25, 0.24, 1.8)   // C5
      break
    }
    case 'login': {
      const playTone = (freq: number, delay: number, dur: number) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay)
        gain.gain.setValueAtTime(0, ctx.currentTime + delay)
        gain.gain.linearRampToValueAtTime(volume * 0.08, ctx.currentTime + delay + 0.06)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur)
        osc.connect(gain)
        gain.connect(dest)
        osc.start(ctx.currentTime + delay)
        osc.stop(ctx.currentTime + delay + dur + 0.08)
      }
      playTone(349.23, 0, 0.4)      // F4
      playTone(440.00, 0.06, 0.4)   // A4
      playTone(523.25, 0.12, 0.5)   // C5
      playTone(659.25, 0.18, 0.6)   // E5
      playTone(880.00, 0.24, 0.8)   // A5
      break
    }
    case 'shutdown': {
      const playTone = (freq: number, delay: number, dur: number) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay)
        gain.gain.setValueAtTime(0, ctx.currentTime + delay)
        gain.gain.linearRampToValueAtTime(volume * 0.08, ctx.currentTime + delay + 0.06)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur)
        osc.connect(gain)
        gain.connect(dest)
        osc.start(ctx.currentTime + delay)
        osc.stop(ctx.currentTime + delay + dur + 0.08)
      }
      playTone(880.00, 0, 0.5)      // A5
      playTone(659.25, 0.06, 0.5)   // E5
      playTone(523.25, 0.12, 0.6)   // C5
      playTone(440.00, 0.18, 0.6)   // A4
      playTone(349.23, 0.24, 0.7)   // F4
      break
    }
    case 'sleep': {
      const playTone = (freq: number, delay: number, dur: number) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay)
        gain.gain.setValueAtTime(0, ctx.currentTime + delay)
        gain.gain.linearRampToValueAtTime(volume * 0.06, ctx.currentTime + delay + 0.05)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur)
        osc.connect(gain)
        gain.connect(dest)
        osc.start(ctx.currentTime + delay)
        osc.stop(ctx.currentTime + delay + dur + 0.08)
      }
      playTone(523.25, 0, 0.4)      // C5
      playTone(392.00, 0.08, 0.4)   // G4
      playTone(329.63, 0.16, 0.5)   // E4
      break
    }
    case 'open': {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(587.33, ctx.currentTime) // D5
      osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.14) // D6
      gain.gain.setValueAtTime(volume * 0.12, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14)
      osc.connect(gain)
      gain.connect(dest)
      osc.start()
      osc.stop(ctx.currentTime + 0.15)
      break
    }
    case 'close': {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(880, ctx.currentTime) // A5
      osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 0.14) // E4
      gain.gain.setValueAtTime(volume * 0.12, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14)
      osc.connect(gain)
      gain.connect(dest)
      osc.start()
      osc.stop(ctx.currentTime + 0.15)
      break
    }
  }
}
