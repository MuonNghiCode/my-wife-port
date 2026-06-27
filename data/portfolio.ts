import { Project, Skill, Experience, Education, Certificate, Achievement, FolderData } from '@/types/portfolio.types'

export const OWNER = {
  name: 'Nguyen Ngoc Phuong',
  nameVi: 'Nguyễn Ngọc Phương',
  role: 'Marketing Manager',
  roleAlt: 'Brand Storyteller',
  bio: 'Passionate about building meaningful brand stories and connecting people with what they love. I turn insights into impactful campaigns that move hearts and drive results.',
  location: 'Vietnam',
  available: true,
  email: 'phuong@example.com',
  usbLabel: 'PHUONG.usb',
}

export const FOLDERS: FolderData[] = [
  { id: 'about', label: 'About Me', icon: 'User', component: 'AboutWindow', defaultSize: { width: 700, height: 560 } },
  { id: 'projects', label: 'My Work', icon: 'Layers', component: 'ProjectsWindow', defaultSize: { width: 840, height: 600 } },
  { id: 'skills', label: 'Expertise', icon: 'Sparkles', component: 'SkillsWindow', defaultSize: { width: 660, height: 520 } },
  { id: 'experience', label: 'Experience', icon: 'Briefcase', component: 'ExperienceWindow', defaultSize: { width: 700, height: 560 } },
  { id: 'education', label: 'Education', icon: 'GraduationCap', component: 'EducationWindow', defaultSize: { width: 660, height: 480 } },
  { id: 'certificates', label: 'Certificates', icon: 'Award', component: 'CertificatesWindow', defaultSize: { width: 700, height: 520 } },
  { id: 'achievements', label: 'Achievements', icon: 'Star', component: 'AchievementsWindow', defaultSize: { width: 660, height: 480 } },
  { id: 'contact', label: 'Contact', icon: 'Mail', component: 'ContactWindow', defaultSize: { width: 680, height: 520 } },
  { id: 'resume', label: 'Resume', icon: 'FileText', component: 'ResumeWindow', defaultSize: { width: 740, height: 560 } },
  { id: 'music', label: 'SoundCloud', icon: 'Music', component: 'MusicWindow', defaultSize: { width: 720, height: 500 } },
  { id: 'browser', label: 'Browser', icon: 'Globe', component: 'BrowserWindow', defaultSize: { width: 880, height: 600 } },
  { id: 'secret', label: '???', icon: 'Lock', component: 'SecretWindow', defaultSize: { width: 600, height: 460 } },
]

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Brand Relaunch Campaign',
    description: 'Full brand refresh strategy that increased brand awareness by 65% in 3 months.',
    longDescription: 'Led the complete relaunch of a heritage fashion brand for the Vietnamese Gen-Z market. Developed brand narrative, visual identity guidelines, and a 360-degree campaign spanning TikTok, Instagram, and OOH. Result: 65% awareness increase and 3x social engagement.',
    technologies: ['Brand Strategy', 'Social Media', 'TikTok', 'OOH', 'Content Creation'],
    githubUrl: undefined,
    liveUrl: 'https://example.com',
    image: '/images/projects/brand.jpg',
    category: 'web',
  },
  {
    id: 'p2',
    title: 'Product Launch — Beauty Line',
    description: 'Go-to-market strategy for new skincare collection, 10,000 units sold in launch week.',
    longDescription: 'Crafted and executed the full go-to-market strategy for a premium skincare line. Included influencer seeding (45 KOLs), press kit design, launch event, and paid social campaign. Achieved 10,000 units sold in the first 7 days.',
    technologies: ['GTM Strategy', 'KOL Marketing', 'Event Management', 'Meta Ads', 'PR'],
    liveUrl: 'https://example.com',
    image: '/images/projects/launch.jpg',
    category: 'web',
  },
  {
    id: 'p3',
    title: 'Social Media Transformation',
    description: 'Grew brand Instagram from 12K to 150K followers in 8 months through content strategy.',
    longDescription: 'Revamped a lifestyle brand\'s social media presence from scratch. Developed a content calendar, visual identity system, and community management playbook. Grew Instagram from 12K to 150K organic followers in 8 months.',
    technologies: ['Content Strategy', 'Instagram', 'Community Management', 'Analytics'],
    liveUrl: 'https://example.com',
    image: '/images/projects/social.jpg',
    category: 'web',
  },
  {
    id: 'p4',
    title: 'Integrated Marketing Campaign',
    description: 'Multi-channel holiday campaign reaching 2M+ people with 8% conversion rate.',
    longDescription: 'Designed and managed a fully integrated holiday campaign across email, social, paid media, and in-store activation. Campaign reached over 2 million people, generated 180,000 website visits, and converted at 8% — 3x industry average.',
    technologies: ['Integrated Marketing', 'Email Marketing', 'Paid Media', 'In-store Activation'],
    liveUrl: 'https://example.com',
    image: '/images/projects/campaign.jpg',
    category: 'web',
  },
]

export const SKILLS: Skill[] = [
  // Branding & Strategy (using frontend as category key)
  { name: 'Brand Strategy', level: 92, category: 'frontend' },
  { name: 'Storytelling', level: 95, category: 'frontend' },
  { name: 'Campaign Planning', level: 90, category: 'frontend' },
  { name: 'Market Research', level: 85, category: 'frontend' },
  // Social Media (using backend)
  { name: 'Content Creation', level: 90, category: 'backend' },
  { name: 'Social Media Strategy', level: 88, category: 'backend' },
  { name: 'KOL / Influencer Marketing', level: 84, category: 'backend' },
  { name: 'Community Management', level: 86, category: 'backend' },
  // Digital Advertising (using database)
  { name: 'Meta Ads', level: 80, category: 'database' },
  { name: 'Google Ads', level: 76, category: 'database' },
  { name: 'TikTok Ads', level: 82, category: 'database' },
  // Events & PR (using cloud)
  { name: 'Event Management', level: 78, category: 'cloud' },
  { name: 'Public Relations', level: 80, category: 'cloud' },
  { name: 'Press & Media', level: 75, category: 'cloud' },
  // Tools (using tools)
  { name: 'Canva / Adobe', level: 82, category: 'tools' },
  { name: 'Analytics & Data', level: 78, category: 'tools' },
  { name: 'CRM & Email Tools', level: 74, category: 'tools' },
]

export const SKILL_CATEGORIES_LABELS: Record<string, string> = {
  frontend: 'Brand & Strategy',
  backend: 'Social & Content',
  database: 'Digital Advertising',
  cloud: 'Events & PR',
  tools: 'Tools & Analytics',
}

export const SKILL_COLORS: Record<string, string> = {
  frontend: '#f9a8d4',
  backend: '#93c5fd',
  database: '#c4b5fd',
  cloud: '#6ee7b7',
  tools: '#fcd34d',
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'e1',
    company: 'Creative Agency VN',
    role: 'Senior Marketing Manager',
    period: '2023 — Present',
    description: [
      'Led end-to-end marketing for 12 brand clients across fashion, beauty, and lifestyle sectors',
      'Managed a team of 6 including designers, content writers, and media buyers',
      'Delivered 3 award-winning campaigns recognized by Vietnam Marketing Association',
      'Grew average client social following by 120% year-over-year',
    ],
    technologies: ['Brand Strategy', 'Team Leadership', 'Social Media', 'Campaign Management'],
  },
  {
    id: 'e2',
    company: 'Beauty Brand Co.',
    role: 'Brand & Content Manager',
    period: '2021 — 2023',
    description: [
      'Developed the brand\'s first comprehensive content strategy across all platforms',
      'Managed partnerships with 60+ KOLs generating 15M+ reach per quarter',
      'Launched 4 major product collections with sell-out results in week 1',
      'Built in-house content studio reducing production costs by 40%',
    ],
    technologies: ['Content Strategy', 'KOL Marketing', 'Product Launch', 'Brand Identity'],
  },
  {
    id: 'e3',
    company: 'Digital Marketing Studio',
    role: 'Marketing Specialist',
    period: '2019 — 2021',
    description: [
      'Executed digital campaigns for 20+ brands in F&B, fashion, and lifestyle',
      'Managed monthly ad budgets up to $50K with 4x average ROAS',
      'Created viral content achieving 10M+ organic views on TikTok',
    ],
    technologies: ['Digital Marketing', 'Meta Ads', 'TikTok', 'Content Creation'],
  },
]

export const EDUCATION: Education[] = [
  {
    id: 'ed1',
    institution: 'University of Economics',
    degree: 'Bachelor of Business Administration',
    field: 'Marketing & Brand Management',
    period: '2015 — 2019',
    gpa: '3.65 / 4.0',
    activities: ['Marketing Club President', 'Student Brand Competition Winner', 'Event Coordinator'],
  },
]

export const CERTIFICATES: Certificate[] = [
  { id: 'c1', name: 'Meta Certified Digital Marketer', issuer: 'Meta', year: '2024', credentialId: 'META-DM-2024' },
  { id: 'c2', name: 'Google Digital Marketing', issuer: 'Google', year: '2023', credentialId: 'GDM-2023' },
  { id: 'c3', name: 'HubSpot Content Marketing', issuer: 'HubSpot', year: '2023', credentialId: 'HS-CM-2023' },
  { id: 'c4', name: 'TikTok Marketing Science', issuer: 'TikTok', year: '2023', credentialId: 'TT-MS-2023' },
  { id: 'c5', name: 'Brand Strategy Certification', issuer: 'CIM UK', year: '2022', credentialId: 'CIM-BS-2022' },
  { id: 'c6', name: 'Project Management (PMP)', issuer: 'PMI', year: '2021', credentialId: 'PMP-2021' },
]

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', title: 'Best Digital Campaign — Vietnam Marketing Awards 2023', description: 'Won Gold at the VMA for the "Beauty for Everyone" inclusive campaign that reached 5M people.', year: '2023' },
  { id: 'a2', title: 'Top 30 Under 30 — Marketing Leaders', description: 'Recognized by Marketing Magazine Vietnam as one of the top emerging marketing leaders in the country.', year: '2023' },
  { id: 'a3', title: 'Campaign of the Year — TikTok APAC', description: '"Summer Stories" campaign was selected as TikTok\'s regional case study in APAC for organic growth strategy.', year: '2022' },
  { id: 'a4', title: 'Speaker — Vietnam Marketing Summit', description: 'Delivered keynote on "Authentic Brand Storytelling in the Age of Short-Form Video" to 800+ attendees.', year: '2023' },
]

export const SOCIAL_LINKS = [
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/quan-code1610/', icon: 'Linkedin' },
  { platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
  { platform: 'Facebook', url: 'https://facebook.com', icon: 'Facebook' },
  { platform: 'Behance', url: 'https://behance.net', icon: 'Globe' },
]

export const INTERESTS = [
  { label: 'Photography', icon: 'Camera' },
  { label: 'Fashion', icon: 'ShoppingBag' },
  { label: 'Travel', icon: 'MapPin' },
  { label: 'Coffee', icon: 'Coffee' },
  { label: 'Storytelling', icon: 'BookOpen' },
  { label: 'Design', icon: 'Palette' },
]

export const ABOUT_TIMELINE = [
  { year: '2015', label: 'Started my journey', detail: 'Enrolled in Marketing at University of Economics — fell in love with the power of brands' },
  { year: '2017', label: 'First campaign', detail: 'Ran my first student marketing campaign for a local cafe — 3x their followers in 2 months' },
  { year: '2019', label: 'Graduated & launched', detail: 'Graduated with honors and joined a digital studio managing my first real brand clients' },
  { year: '2021', label: 'Brand Manager', detail: 'Moved to Beauty Brand Co. to lead brand strategy and content — best years of growth' },
  { year: '2022', label: 'First major award', detail: 'Won TikTok APAC Campaign of the Year — a moment I will never forget' },
  { year: '2023', label: 'Top 30 Under 30', detail: 'Named one of Vietnam\'s top marketing leaders — now leading a team of 6 at Creative Agency VN' },
  { year: '2024', label: 'Building forward', detail: 'Expanding into brand consulting and helping Vietnamese brands tell their stories to the world' },
]
