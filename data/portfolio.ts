import { Project, Skill, Experience, Education, Certificate, Achievement, FolderData } from '@/types/portfolio.types'

export const OWNER = {
  name: 'Nguyen Ngoc Phuong',
  nameVi: 'Nguyễn Ngọc Phương',
  role: 'Marketing Executive',
  roleAlt: 'SEO & Brand Strategist',
  bio: 'As someone who is constantly striving for improvement, I consider myself a professional who seamlessly blends strategy with creativity. I am seeking a challenging role where I can apply my skills in strategic planning and creative problem-solving, while gaining valuable experience in customer and market insights as well as strategic development.',
  location: 'Bien Hoa, Dong Nai',
  available: true,
  email: 'ngocphuong070404@gmail.com',
  phone: '0865407135',
  usbLabel: 'PHUONG.usb',
}

export const FOLDERS: FolderData[] = [
  { id: 'about', label: 'About Me', icon: 'User', component: 'AboutWindow', defaultSize: { width: 700, height: 560 } },
  { id: 'projects', label: 'My Work', icon: 'Layers', component: 'ProjectsWindow', defaultSize: { width: 840, height: 600 } },
  { id: 'skills', label: 'Expertise', icon: 'Sparkles', component: 'SkillsWindow', defaultSize: { width: 660, height: 520 } },
  { id: 'experience', label: 'Experience', icon: 'Briefcase', component: 'ExperienceWindow', defaultSize: { width: 700, height: 560 } },
  { id: 'education', label: 'Education', icon: 'GraduationCap', component: 'EducationWindow', defaultSize: { width: 660, height: 480 } },
  { id: 'certificates', label: 'Certificates', icon: 'Award', component: 'CertificatesWindow', defaultSize: { width: 700, height: 520 } },
  // { id: 'achievements', label: 'Achievements', icon: 'Star', component: 'AchievementsWindow', defaultSize: { width: 660, height: 480 } },
  { id: 'contact', label: 'Contact', icon: 'Mail', component: 'ContactWindow', defaultSize: { width: 680, height: 520 } },
  { id: 'resume', label: 'Resume', icon: 'FileText', component: 'ResumeWindow', defaultSize: { width: 740, height: 560 } },
  { id: 'music', label: 'SoundCloud', icon: 'Music', component: 'MusicWindow', defaultSize: { width: 720, height: 500 } },
  // { id: 'browser', label: 'Browser', icon: 'Globe', component: 'BrowserWindow', defaultSize: { width: 880, height: 600 } },
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
  // Strategic Planning (frontend)
  { name: 'Strategic Planning', level: 100, category: 'frontend' },
  { name: 'Project & Event Management', level: 100, category: 'frontend' },
  { name: 'Brand & Visual Identity', level: 100, category: 'frontend' },
  // SEO & Content Marketing (backend)
  { name: 'SEO Content Writing', level: 100, category: 'backend' },
  { name: 'Social Media Management', level: 100, category: 'backend' },
  { name: 'Community Engagement & Seeding', level: 100, category: 'backend' },
  { name: 'On-page Optimization & SEO Tools', level: 100, category: 'backend' },
  // Design & Design Thinking (database)
  { name: 'UI / UX Design', level: 100, category: 'database' },
  { name: 'Graphic & Print Design', level: 100, category: 'database' },
  // Tools & Analytics (cloud)
  { name: 'Canva / Microsoft PowerPoint', level: 100, category: 'cloud' },
  { name: 'Office Productivity (Word/Excel)', level: 100, category: 'cloud' },
  // Languages & Interpersonal (tools)
  { name: 'Customer & Community Relations', level: 100, category: 'tools' },
  { name: 'Foreign Languages (English & Chinese)', level: 100, category: 'tools' },
]

export const SKILL_CATEGORIES_LABELS: Record<string, string> = {
  frontend: 'Strategic Planning',
  backend: 'SEO & Content Marketing',
  database: 'Design & Design Thinking',
  cloud: 'Tools & Analytics',
  tools: 'Languages & Interpersonal',
}

export const SKILL_COLORS: Record<string, string> = {
  frontend: 'var(--orange-vivid)',
  backend: 'var(--blue-vivid)',
  database: 'var(--pink-vivid)',
  cloud: '#10b981',
  tools: '#8b5cf6',
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'e1',
    company: 'CellphoneS',
    role: 'SEO Content Writer',
    period: '2025 — 2026',
    description: [
      'Authored search-optimized technology and finance articles, mastering advanced SEO and analytics tools',
      'Increased organic traffic to target retail product categories through high-intent keyword positioning',
      'Collaborated with media and design teams to align content with CellphoneS campaign promotions',
    ],
    technologies: ['SEO Writing', 'Keyword Research', 'Google Analytics', 'Tech & Finance Content'],
  },
  {
    id: 'e2',
    company: 'Viettel Group',
    role: 'SEO Intern',
    period: '2025',
    description: [
      'Conducted keyword research and competitive analysis for telecom and digital services',
      'Optimized on-page SEO components including meta-data, heading structures, and internal links',
      'Monitored website traffic metrics and keyword rankings using Google Search Console',
    ],
    technologies: ['On-page SEO', 'Google Search Console', 'Competitor Analysis', 'Telecom Marketing'],
  },
  {
    id: 'e3',
    company: 'Freelance & FPT Projects',
    role: 'Project Manager & Content Creator',
    period: '2022 — 2025',
    description: [
      'Led the "Tâm Giới" project, organizing a highly successful community event for over 100 participants',
      'Managed social media channels and executed digital seeding strategies for local restaurant brands',
      'Began professional journey writing engaging copy and articles for lifestyle and digital clients',
    ],
    technologies: ['Project Management', 'Fanpage Management', 'Seeding Campaigns', 'Copywriting'],
  },
]

export const EDUCATION: Education[] = [
  {
    id: 'ed1',
    institution: 'FPT University',
    degree: 'Bachelor of Business Administration',
    field: 'Major: Digital Marketing',
    period: '2022 — 2026',
    gpa: '3.1',
    activities: ['Led the "Tâm Giới" Project', 'SEO Content Writing (Viettel & CellphoneS)', 'Social Media & Brand Seeding Campaigns'],
  },
]

export const CERTIFICATES: Certificate[] = [
  { id: 'c1', name: 'TOEIC — Score 680', issuer: 'ETS (Educational Testing Service)', year: '2024' },
  { id: 'c2', name: 'HSK4 & HSKK Intermediate', issuer: 'Hanban / Confucius Institute', year: '2024' },
  { id: 'c3', name: 'Human Resource Management and Leadership Specialization', issuer: 'Coursera', year: '2025', verifyUrl: 'https://coursera.org/share/fb9ccc6f351ca18c604b0bf10ec59593' },
  { id: 'c4', name: 'Information Systems Specialization', issuer: 'Coursera', year: '2025', verifyUrl: 'https://www.coursera.org/account/accomplishments/specialization/IIAHK60DI4GX' },
  { id: 'c5', name: 'UI / UX Design Specialization', issuer: 'Coursera', year: '2025', verifyUrl: 'https://coursera.org/share/547dd076c85a038954eda07eebe92265' },
  { id: 'c6', name: 'Social Media Marketing Specialization', issuer: 'Coursera', year: '2025', verifyUrl: 'https://coursera.org/share/e169c194ddcb633fb72b60cc8908d4ef' },
  { id: 'c7', name: 'Project Management Principles and Practices Specialization', issuer: 'Coursera', year: '2025', verifyUrl: 'https://coursera.org/share/d6185b88ec4b46e7e3aa337bc9d748ae' },
]

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', title: 'Led the "Tâm Giới" Project — 2024', description: 'Organized and branded a community event from scratch, achieving over 100 participants and high social engagement.', year: '2024' },
  { id: 'a2', title: 'FPT University Marketing Hackathon Winner', description: 'Awarded 1st place in the university-wide brand strategy and digital marketing hackathon.', year: '2025' },
  { id: 'a3', title: 'High-Performance SEO Articles — CellphoneS', description: 'Ranked 20+ competitive tech and retail keywords in the Google search top 3, increasing organic page views.', year: '2025' },
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
  { year: '2022', label: 'Graduated from Tran Bien High School & First Gigs', detail: 'Graduated from Tran Bien High School (Bien Hoa). Enrolled in Digital Marketing at FPT University and immediately started my professional journey as a Content Writer.' },
  { year: '2023', label: 'Stepping into Fanpage Management', detail: 'Advanced my skills by taking on social media management roles. Fully managed marketing, executed seeding campaigns, and handled community engagement for brands.' },
  { year: '2024', label: 'Project Management & Branding', detail: 'Led the "Tâm Giới" project, successfully building an impactful community event with over 100 participants. Concurrently managed social media and visual branding restaurant.' },
  { year: '2025', label: 'Stepping into Big Brands (Viettel & CellphoneS)', detail: 'Joined Viettel as an SEO Intern and CellphoneS as an SEO Content Writer. Gained hands-on experience writing optimized tech/finance articles and mastering advanced SEO tools.' },
  { year: '2026', label: 'Graduated & Looking Forward', detail: 'Graduated with a 3.1 GPA from FPT University, backed by 5 specialized certifications. Ready for a challenging role in strategic planning and creative problem-solving.' },
]
