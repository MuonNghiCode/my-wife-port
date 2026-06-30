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
    title: 'Heineken Strategic Campaign',
    description: 'Led the "No Fears, Just Cheers" integrated campaign to shift gender perceptions in beer consumption through GESI insights.',
    longDescription: 'Led a team of 7 to analyze Heineken\'s market positioning and consumer insights. Developed a comprehensive, multi-platform communication plan (TVC, OOH, Social Media, and Events) centered around Gender Equality & Social Inclusion (GESI). Co-authored a collaborative brand partnership proposal with Dove for an impactful Women\'s Day campaign.',
    result: 'Successfully pitched a full-scale IMC roadmap, including a structured campaign timeline, budget allocation, and a creative TVC concept edited firsthand.',
    technologies: ['TVC Editing', 'Market Research', 'IMC Planning', 'Partner Proposal', 'Statista'],
    githubUrl: undefined,
    liveUrl: 'https://example.com',
    image: '/images/projects/campaign.jpg',
    images: ['/images/projects/campaign.jpg', '/images/projects/brand.jpg', '/images/projects/social.jpg'],
    category: 'campaign',
  },
  {
    id: 'p2',
    title: 'Calvin Klein Repositioning Plan',
    description: 'Conducted deep primary research and behavioral analysis to co-develop a full-scale repositioning strategy for male consumers.',
    longDescription: 'Served as Project Leader for a team of 6. Conducted extensive primary research via interviews and surveys to extract raw consumer insights. Applied advanced psychological decision-making models (Id, Ego, Superego) to decode male buyer behavior in urban areas (ages 16–50), mapping out the entire campaign timeline and budget distribution.',
    result: 'Delivered a comprehensive, data-backed marketing proposal utilizing verified databases like Statista and Fragrantica to validate new target touchpoints.',
    technologies: ['Project Leadership', 'Primary Research', 'Consumer Behavior Analysis', 'Budgeting', 'Google Forms'],
    githubUrl: undefined,
    liveUrl: 'https://example.com',
    image: '/images/projects/brand.jpg',
    images: ['/images/projects/brand.jpg', '/images/projects/launch.jpg', '/images/projects/social.jpg'],
    category: 'strategy',
  },
  {
    id: 'p3',
    title: '"Tâm Giới" Community Event',
    description: 'Executed the PR strategy and project coordination for a localized community event celebrating gender diversity.',
    longDescription: 'Co-managed the end-to-end PR and communication framework to ensure high-impact visibility and message alignment. Formulated and executed an offline community gathering designed to honor and celebrate the uniqueness of all gender identities.',
    result: 'Successfully gathered and engaged over 100+ active students and special guests, delivering a smooth, safe, and emotionally resonant event experience.',
    technologies: ['Project Management', 'PR Strategy', 'Cross-functional Coordination', 'Community Engagement'],
    githubUrl: undefined,
    liveUrl: 'https://example.com',
    image: '/images/projects/social.jpg',
    images: ['/images/projects/social.jpg', '/images/projects/campaign.jpg', '/images/projects/launch.jpg'],
    category: 'event',
  },
  {
    id: 'p4',
    title: 'Bún Đậu Hồng Thương Rebranding',
    description: 'Applied STP and 7Ps frameworks to drive brand awareness and optimize customer experience for a local culinary establishment.',
    longDescription: 'Spearheaded competitor research and hyper-local consumer behavior analysis following the restaurant\'s relocation. Developed a strategic 7Ps & STP service marketing framework, proposing actionable referral programs and localized social media content schedules to uplift both online and offline foot traffic.',
    result: 'Produced an optimized local rebranding strategy validated by cross-referencing user data from ShopeeFood, BeFood, and Google Maps reviews.',
    technologies: ['Service Marketing (7Ps)', 'STP Framework', 'Competitor Analysis', 'F&B Localization'],
    githubUrl: undefined,
    liveUrl: 'https://example.com',
    image: '/images/projects/launch.jpg',
    images: ['/images/projects/launch.jpg', '/images/projects/brand.jpg', '/images/projects/campaign.jpg'],
    category: 'strategy',
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
    company: 'Chị Gái Tân Thời & Ăn Vặt Shin',
    role: 'Fanpage Manager',
    period: '2022 — 2024',
    description: [
      "Managed all social media channels of the brand, from brainstorming content ideas and planning the post schedule to interacting daily with followers.",
      "Ran seeding campaigns on local community groups to increase brand awareness and attract new customers to the shop.",
      "Collaborated closely with the designer to brainstorm ideas, ensuring all marketing materials like posters and banners matched the promotional campaigns.",
      "Handled customer inquiries and feedback online promptly to maintain a good brand reputation and build strong community relationships."
    ],
    technologies: ['Social Media Marketing', 'Community Management', 'Content Planning', 'Team Collaboration', 'Customer Engagement'],
  },
  {
    id: 'e2',
    company: 'Viettel',
    role: 'SEO Intern',
    period: '2025',
    description: [
      "Wrote and optimized SEO articles for the travel and finance sectors, using keyword research to help the brand reach more readers on Google.",
      "Helped multiple articles reach the Top Search pages by creating clear content structures that answered user questions.",
      "Collaborated with the design team to plan and create relevant images for each article, ensuring the posts looked professional.",
      "Supported the team in checking keyword rankings and updating content to keep the website traffic growing steadily."
    ],
    technologies: ['SEO Content', 'Keyword Research', 'Hot Search', 'Travel & Finance Content', 'Team Collaboration'],
  },
  {
    id: 'e3',
    company: 'CellphoneS',
    role: 'SEO Content Writer',
    period: '2025 — Present',
    description: [
      "Wrote SEO articles about technology and finance, using basic SEO keywords and tools to help the website get higher rankings on Google.",
      "Helped many articles reach the Top Trending and Top Search pages by choosing the right topics and structuring the content clearly.",
      "Increased organic traffic for targeted product groups by writing content that matched the store's sales and promotion campaigns.",
      "Directly designed and edited images for the articles to make the posts look clean, engaging, and easy for readers to follow."
    ],
    technologies: ['SEO Writing', 'Keyword Research', 'Making Post Images', 'Top Search', 'Tech & Finance Content'],
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
