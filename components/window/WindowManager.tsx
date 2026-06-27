'use client'
import dynamic from 'next/dynamic'
import { useDesktopStore } from '@/store/desktopStore'
import Window from './Window'

const AboutWindow = dynamic(() => import('@/features/about/AboutWindow'), { ssr: false })
const ProjectsWindow = dynamic(() => import('@/features/projects/ProjectsWindow'), { ssr: false })
const SkillsWindow = dynamic(() => import('@/features/skills/SkillsWindow'), { ssr: false })
const ExperienceWindow = dynamic(() => import('@/features/experience/ExperienceWindow'), { ssr: false })
const EducationWindow = dynamic(() => import('@/features/education/EducationWindow'), { ssr: false })
const CertificatesWindow = dynamic(() => import('@/features/certificates/CertificatesWindow'), { ssr: false })
const AchievementsWindow = dynamic(() => import('@/features/achievements/AchievementsWindow'), { ssr: false })
const ContactWindow = dynamic(() => import('@/features/contact/ContactWindow'), { ssr: false })
const ResumeWindow = dynamic(() => import('@/features/resume/ResumeWindow'), { ssr: false })
const SecretWindow = dynamic(() => import('@/features/secret/SecretWindow'), { ssr: false })
const MusicWindow = dynamic(() => import('@/features/music/MusicWindow'), { ssr: false })
const BrowserWindow = dynamic(() => import('@/features/browser/BrowserWindow'), { ssr: false })

const WINDOW_MAP: Record<string, React.ComponentType> = {
  about: AboutWindow,
  projects: ProjectsWindow,
  skills: SkillsWindow,
  experience: ExperienceWindow,
  education: EducationWindow,
  certificates: CertificatesWindow,
  achievements: AchievementsWindow,
  contact: ContactWindow,
  resume: ResumeWindow,
  secret: SecretWindow,
  music: MusicWindow,
  browser: BrowserWindow,
}

export default function WindowManager() {
  const { windows } = useDesktopStore()

  return (
    <>
      {Object.values(windows).map((win) => {
        const Content = WINDOW_MAP[win.folderId]
        if (!Content) return null
        return (
          <Window key={win.id} window={win}>
            <Content />
          </Window>
        )
      })}
    </>
  )
}
