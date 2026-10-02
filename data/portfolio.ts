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
  { id: 'projects', label: 'Activities', icon: 'Layers', component: 'ProjectsWindow', defaultSize: { width: 840, height: 600 } },
  { id: 'skills', label: 'Expertise', icon: 'Sparkles', component: 'SkillsWindow', defaultSize: { width: 660, height: 520 } },
  { id: 'experience', label: 'Experience', icon: 'Briefcase', component: 'ExperienceWindow', defaultSize: { width: 700, height: 560 } },
  { id: 'education', label: 'Education', icon: 'GraduationCap', component: 'EducationWindow', defaultSize: { width: 660, height: 480 } },
  { id: 'certificates', label: 'Certificates', icon: 'Award', component: 'CertificatesWindow', defaultSize: { width: 700, height: 520 } },
  { id: 'contact', label: 'Contact', icon: 'Mail', component: 'ContactWindow', defaultSize: { width: 680, height: 520 } },
  { id: 'resume', label: 'Resume', icon: 'FileText', component: 'ResumeWindow', defaultSize: { width: 740, height: 560 } },
  { id: 'music', label: 'SoundCloud', icon: 'Music', component: 'MusicWindow', defaultSize: { width: 720, height: 500 } },
  { id: 'secret', label: '???', icon: 'Lock', component: 'SecretWindow', defaultSize: { width: 600, height: 460 } },
]

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Sơn Mài Mỹ Nghệ Tư Bốn (Lacquer Craftsmanship)',
    role: 'Project Leader & Enterprise Liaison',
    description: 'Formulated a market entry strategy for a traditional lacquer craft enterprise, bridging academic strategy with corporate execution.',
    longDescription: 'A university-level capstone project focused on formulating a market entry strategy for a traditional lacquer craft enterprise. The project aimed to bridge academic strategy with corporate execution, preserving traditional Vietnamese heritage while making it relevant and engaging for the Gen Z audience.',
    result: 'Top evaluation scores across the department board for high strategy feasibility and cultural impact; built new sales outreach channels.',
    technologies: ['Market Entry Strategy', 'Enterprise Liaison', 'Gen Z Branding', 'Heritage Preservation', 'TikTok Marketing'],
    githubUrl: undefined,
    liveUrl: 'https://www.tiktok.com/@sonmaimynghetubon',
    image: '/images/projects/brand.jpg',
    images: ['/images/projects/brand.jpg', '/images/projects/launch.jpg', '/images/projects/campaign.jpg'],
    category: 'strategy',
    keyResults: [
      { title: 'Top Academic Performance', desc: 'Achieved top-tier evaluation scores across the department board for high strategy feasibility and cultural impact.' },
      { title: 'Market & Channel Expansion', desc: "Successfully built new sales outreach channels and structured a go-to-market strategy for the enterprise's new product line targeting young consumers." }
    ]
  },
  {
    id: 'p2',
    title: 'Gen Z & Cultural Heritage (FPT Politics Project)',
    role: 'Project Leader & Media Content Manager',
    description: 'Revitalized traditional cultural values for Gen Z students through interactive discussions, podcasts, and heritage showcases.',
    longDescription: 'A specialized political science project designed to revitalize traditional cultural values for Gen Z students in the modern digital era. Acted as the main liaison between faculty professors and students to host interactive discussions and showcase original heritage concepts.',
    result: 'Hosted 1 cultural showcase, conducted student interviews, produced podcast episodes featuring faculty members.',
    technologies: ['Content Management', 'Faculty Liaison', 'Podcast Production', 'Gen Z Engagement', 'Cultural Showcase'],
    githubUrl: undefined,
    liveUrl: 'https://www.facebook.com/profile.php?id=61582972259335',
    image: '/images/projects/social.jpg',
    images: ['/images/projects/social.jpg', '/images/projects/campaign.jpg', '/images/projects/launch.jpg'],
    category: 'heritage',
    keyResults: [
      { title: 'Cultural Showcase & Media Series', desc: 'Successfully hosted 1 cultural showcase, conducted a series of student interviews, and produced exclusive podcast episodes featuring faculty members.' },
      { title: 'Streamlined Communication', desc: 'Streamlined communication between professors and the student body, driving strong participation and positive feedback across campus channels.' }
    ]
  },
  {
    id: 'p3',
    title: 'Plastic After U (Environmental Campaign)',
    role: 'Partnership Support',
    description: 'Environmental awareness campaign partnering with university departments and external sponsors to promote sustainable living.',
    longDescription: 'An environmental awareness campaign partnering with FPT University departments and external sponsors to promote sustainable living among youth.',
    result: 'Secured 100% target sponsorship funding; attracted 200+ student attendees with 5+ university partners.',
    technologies: ['Sponsorship Pitching', 'Partnership Operations', 'Event Logistics', 'Sustainability', 'Cross-campus PR'],
    githubUrl: undefined,
    liveUrl: undefined,
    image: '/images/projects/campaign.jpg',
    images: ['/images/projects/campaign.jpg', '/images/projects/brand.jpg', '/images/projects/social.jpg'],
    category: 'campaign',
    keyResults: [
      { title: '100% Funding Secured', desc: 'Pitched and successfully acquired full target sponsorship.' },
      { title: '200+ Student Attendees', desc: 'Coordinated event operations with 5+ university/college partners.' }
    ]
  },
  {
    id: 'p4',
    title: 'Lê Lực Production — "Họa Sắc" Short Film',
    role: 'Production Assistant & Operations Lead',
    description: 'Managed talent logistics, on-site operations, and co-led the viral social media launch strategy for the award-winning short film "Họa Sắc".',
    longDescription: 'Managed talent logistics, on-site operations, and co-led the viral social media launch strategy for the award-winning short film "Họa Sắc".',
    result: 'Honored with "Best Director" at student film awards; generated 53,700+ total reach and 3,450+ engagements.',
    technologies: ['Film Production', 'On-site Operations', 'Social Media Strategy', 'Talent Management', 'Viral Launch'],
    githubUrl: undefined,
    liveUrl: undefined,
    image: '/images/projects/launch.jpg',
    images: ['/images/projects/launch.jpg', '/images/projects/brand.jpg', '/images/projects/campaign.jpg'],
    category: 'media',
    keyResults: [
      { title: 'Award Winner', desc: 'Honored with "Best Director" at the student film awards.' },
      { title: '53,700+ Total Reach', desc: 'Generated 3,450+ engagements and 1,360+ views on the feature film.' }
    ]
  },
  {
    id: 'p5',
    title: 'Tâm Giới (Gender Diversity Event Series)',
    role: 'Project Manager / Event Content Planner',
    description: 'Student-centric event series honoring diverse gender identities through strategic PR campaigns and offline activations.',
    longDescription: 'Student-centric event series honoring diverse gender identities through strategic PR campaigns and offline activations.',
    result: 'Engaged over 100+ active attendees; achieved 100% venue and cross-promotional approval rate.',
    technologies: ['Event Planning', 'PR Content', 'Youth Union Partnership', 'Diversity & Inclusion', 'Community Outreach'],
    githubUrl: undefined,
    liveUrl: undefined,
    image: '/images/projects/social.jpg',
    images: ['/images/projects/social.jpg', '/images/projects/campaign.jpg', '/images/projects/launch.jpg'],
    category: 'event',
    keyResults: [
      { title: '100+ Active Attendees', desc: 'Successfully managed end-to-end PR content and event logistics.' },
      { title: '100% Approval Rate', desc: 'Partnered with Youth Union & CTSV for venue and cross-promotional approvals.' }
    ]
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
      "Produced SEO-optimized content focused on technology and consumer electronics, including smartphones, laptops and related products. Conducted topic research, developed content structures and created articles aligned with search intent and SEO requirements.",
      "Helped many articles reach the Top Trending and Top Search pages by choosing the right topics and structuring the content clearly.",
      "Increased organic traffic for targeted product groups by writing content that matched the store's sales and promotion campaigns.",
      "Directly designed and edited images for the articles to make the posts look clean, engaging, and easy for readers to follow."
    ],
    proof: {
      badge: 'TOP TRENDING',
      title: 'Selected SEO content reached Top Trending.',
      images: [
        '/images/cellphoneS/1.jpg',
        '/images/cellphoneS/2.jpg',
        '/images/cellphoneS/3.jpg',
        '/images/cellphoneS/4.jpg'
      ],
      links: [
        'https://cellphones.com.vn/macbook-pro-16-m5-max-18cpu-32-gpu-36gb-2tb.html',
        'https://cellphones.com.vn/do-choi-cong-nghe/dong-ho-dinh-vi-tre-em.html',
        'https://cellphones.com.vn/macbook-air-13-m5-10-cpu-8-gpu-16gb-512gb.html',
        'https://cellphones.com.vn/macbook-neo-13-a18-pro-6-cpu-5-gpu-8gb-256gb.html'
      ]
    },
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
    activities: [
      {
        title: 'Project Leader — "Tâm Giới" Project',
        subtitle: 'PR Strategy · Community Engagement · Event Execution',
      },
      {
        title: 'Project Leader — MÀI Graduation Thesis',
        subtitle: 'Project Management · Team Leadership · Brand Development',
      },
      {
        title: 'Torneo ACBSP — CompanyGame',
        subtitle: 'Business Simulation · Teamwork · Strategic Decision-Making',
      },
    ],
  },
]

export const CERTIFICATES: Certificate[] = [
  { id: 'c1', name: 'TOEIC — Score 680', issuer: 'ETS (Educational Testing Service)', year: '2024' },
  { id: 'c2', name: 'HSK4 & HSKK Intermediate', issuer: 'Hanban / Confucius Institute', year: '2024' },
  { id: 'c3', name: 'Human Resource Management and Leadership Specialization', issuer: 'Coursera', year: '2025', verifyUrl: 'https://coursera.org/share/fb9ccc6f351ca18c604b0bf10ec59593' },
  { id: 'c4', name: 'Information Systems Specialization', issuer: 'Coursera', year: '2025', verifyUrl: 'https://www.coursera.org/account/accomplishments/specialization/IIAHK60DI4GX?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=s12n' },
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
