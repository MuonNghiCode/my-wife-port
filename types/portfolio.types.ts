// Types for the portfolio
export type BootPhase =
  | 'idle'
  | 'inserting'
  | 'powering-on'
  | 'bios'
  | 'loading'
  | 'login'
  | 'desktop'
  | 'shutting-down'


export interface WindowState {
  id: string
  title: string
  folderId: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
}

export interface FolderData {
  id: string
  label: string
  icon: string
  component: string
  defaultSize: { width: number; height: number }
  defaultPosition?: { x: number; y: number }
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  image: string
  images?: string[]
  category: string
  result?: string
}

export interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'tools'
  icon?: string
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  description: string[]
  technologies: string[]
  logo?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  period: string
  gpa?: string
  activities?: string[]
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  year: string
  credentialId?: string
  verifyUrl?: string
  image?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  year: string
  icon?: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}
