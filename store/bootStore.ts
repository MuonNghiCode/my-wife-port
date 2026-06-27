import { create } from 'zustand'
import { BootPhase } from '@/types/portfolio.types'

interface BootStore {
  phase: BootPhase
  biosLines: string[]
  bootProgress: number
  setPhase: (phase: BootPhase) => void
  addBiosLine: (line: string) => void
  setBootProgress: (progress: number) => void
  advance: () => void
}

const phaseOrder: BootPhase[] = [
  'idle', 'inserting', 'powering-on', 'bios', 'loading', 'login', 'desktop'
]

export const useBootStore = create<BootStore>((set, get) => ({
  phase: 'idle',
  biosLines: [],
  bootProgress: 0,
  setPhase: (phase) => set({ phase }),
  addBiosLine: (line) => set((s) => ({ biosLines: [...s.biosLines, line] })),
  setBootProgress: (bootProgress) => set({ bootProgress }),
  advance: () => {
    const current = get().phase
    const idx = phaseOrder.indexOf(current)
    if (idx < phaseOrder.length - 1) {
      set({ phase: phaseOrder[idx + 1] })
    }
  },
}))
