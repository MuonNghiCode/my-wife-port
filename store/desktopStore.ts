import { create } from 'zustand'
import { WindowState } from '@/types/portfolio.types'
import { playSynthSound, useSoundStore } from './soundStore'


interface DesktopStore {
  windows: Record<string, WindowState>
  focusedWindowId: string | null
  topZIndex: number
  openWindow: (id: string, title: string, folderId: string, size?: { width: number; height: number }) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  focusWindow: (id: string) => void
  updatePosition: (id: string, pos: { x: number; y: number }) => void
  updateSize: (id: string, size: { width: number; height: number }) => void
}

const getDefaultPosition = (index: number) => ({
  x: Math.min(60 + index * 30, window?.innerWidth ? window.innerWidth - 500 : 200),
  y: Math.min(40 + index * 30, window?.innerHeight ? window.innerHeight - 400 : 200),
})

export const useDesktopStore = create<DesktopStore>((set, get) => ({
  windows: {},
  focusedWindowId: null,
  topZIndex: 100,

  openWindow: (id, title, folderId, size) => {
    playSynthSound('open')
    const existing = get().windows[id]
    const { topZIndex } = get()
    const newZ = topZIndex + 1
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    if (existing) {
      set((s) => {
        const updated = { ...s.windows }
        if (isMobile) {
          Object.keys(updated).forEach(key => {
            if (key !== id) {
              if (key === 'music') {
                updated[key] = { ...updated[key], isMinimized: true }
              } else {
                delete updated[key]
              }
            }
          })
        }
        return {
          windows: {
            ...updated,
            [id]: { ...updated[id], isOpen: true, isMinimized: false, isMaximized: true, zIndex: newZ },
          },
          focusedWindowId: id,
          topZIndex: newZ,
        }
      })
      return
    }

    const openCount = Object.keys(get().windows).length
    const defaultPos = isMobile
      ? { x: 0, y: 0 }
      : getDefaultPosition(openCount)

    const defaultSize = isMobile
      ? { width: window.innerWidth, height: window.innerHeight - 64 }
      : size ?? { width: 700, height: 500 }

    set((s) => {
      const updated = { ...s.windows }
      if (isMobile) {
        Object.keys(updated).forEach(key => {
          if (key !== id) {
            if (key === 'music') {
              updated[key] = { ...updated[key], isMinimized: true }
            } else {
              delete updated[key]
            }
          }
        })
      }
      return {
        windows: {
          ...updated,
          [id]: {
            id,
            title,
            folderId,
            isOpen: true,
            isMinimized: false,
            isMaximized: true,
            zIndex: newZ,
            position: defaultPos,
            size: defaultSize,
          },
        },
        focusedWindowId: id,
        topZIndex: newZ,
      }
    })
  },

  closeWindow: (id) => {
    playSynthSound('close')
    if (id === 'music') {
      useSoundStore.getState().setIsPlaying(false)
    }
    set((s) => {
      const rest = { ...s.windows }
      delete rest[id]
      const remaining = Object.keys(rest)
      return {
        windows: rest,
        focusedWindowId: remaining[remaining.length - 1] ?? null,
      }
    })
  },

  minimizeWindow: (id) => {
    playSynthSound('close')
    set((s) => ({
      windows: { ...s.windows, [id]: { ...s.windows[id], isMinimized: true } },
      focusedWindowId: null,
    }))
  },

  restoreWindow: (id) => {
    playSynthSound('open')
    const { topZIndex } = get()
    const newZ = topZIndex + 1
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    set((s) => {
      const updated = { ...s.windows }
      if (isMobile) {
        Object.keys(updated).forEach(key => {
          if (key !== id) {
            if (key === 'music') {
              updated[key] = { ...updated[key], isMinimized: true }
            } else {
              delete updated[key]
            }
          }
        })
      }
      return {
        windows: {
          ...updated,
          [id]: { ...updated[id], isMinimized: false, zIndex: newZ },
        },
        focusedWindowId: id,
        topZIndex: newZ,
      }
    })
  },

  maximizeWindow: (id) => {
    set((s) => ({
      windows: {
        ...s.windows,
        [id]: { ...s.windows[id], isMaximized: !s.windows[id].isMaximized },
      },
    }))
  },

  focusWindow: (id) => {
    const { topZIndex } = get()
    const newZ = topZIndex + 1
    set((s) => ({
      windows: { ...s.windows, [id]: { ...s.windows[id], zIndex: newZ } },
      focusedWindowId: id,
      topZIndex: newZ,
    }))
  },

  updatePosition: (id, pos) => {
    set((s) => ({
      windows: { ...s.windows, [id]: { ...s.windows[id], position: pos } },
    }))
  },

  updateSize: (id, size) => {
    set((s) => ({
      windows: { ...s.windows, [id]: { ...s.windows[id], size } },
    }))
  },
}))
