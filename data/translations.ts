// Central translations dictionary for bilingual support (English & Vietnamese)

export const FOLDER_LABELS: Record<'en' | 'vi', Record<string, string>> = {
  en: {
    about: 'About Me',
    projects: 'My Work',
    skills: 'Expertise',
    experience: 'Experience',
    education: 'Education',
    certificates: 'Certificates',
    contact: 'Contact',
    resume: 'Resume',
    music: 'SoundCloud',
    secret: '???',
  },
  vi: {
    about: 'Giới thiệu',
    projects: 'Dự án',
    skills: 'Kỹ năng',
    experience: 'Kinh nghiệm',
    education: 'Học vấn',
    certificates: 'Chứng chỉ',
    contact: 'Liên hệ',
    resume: 'Hồ sơ',
    music: 'SoundCloud',
    secret: '???',
  }
}

export const UI_STRINGS: Record<'en' | 'vi', Record<string, string>> = {
  en: {
    // Desktop Widgets
    systemTime: 'System Time',
    workspaceTasks: 'Workspace Tasks',
    back: 'Back',
    hide: 'Hide',
    close: 'Close',
    
    // Boot and USB Screens
    usbHintClick: 'Click USB to Boot',
    usbHintTap: 'Tap USB to Boot',
    starting: 'Starting up...',
    
    // Resume window
    downloadPdf: 'Download PDF Resume',
    previewResume: 'Interactive Resume Preview',
    
    // Contact window
    contactHeader: 'Get in Touch',
    chatIntro: 'Hello! I am Phuong\'s Assistant. Let me know if you would like to send her a message!',
    nameLabel: 'Your Name',
    emailLabel: 'Your Email',
    msgLabel: 'Your Message',
    sendBtn: 'Send Message',
    sendingBtn: 'Sending...',
    msgSuccess: 'Thank you! Your message has been sent successfully.',
    msgError: 'Oops! Something went wrong. Please try again.',
    
    // SoundCloud Player
    tracklist: 'Tracklist',
    playing: 'Playing',
    paused: 'Paused',
    nowPlaying: 'Now Playing',

    // About Window
    biography: 'Biography',
    interests: 'Interests & Hobbies',
    careerTimeline: 'Career Journey',

    // Secret Room
    creatorIntro: 'I am MuonNghiCode, the engineer who designed and built this portfolio experience.',
    creatorNarrative: 'I created this interactive OS workstation simulator to present digital campaigns and web development projects in a memorable, hands-on format. My work focuses on building fast, responsive, and pixel-perfect applications using React, Next.js, and TypeScript.',
    coreFocus: 'Core Focus',
    selectedCreations: 'Selected Creations',
    starRepo: 'Star the repository if you love this portfolio!',
    craftedBy: 'Crafted by MuonNghiCode with',
    devVision: 'Developer Vision',
    quitCodingQuote: 'I want to quit coding... but only when I\'ve built something that truly changes lives and makes the world a little better!',
    growProject: 'Grow on every project',
    innovateChallenge: 'Innovate on challenge',
    excitedWorkOn: 'Excited to Work On',
  },
  vi: {
    // Desktop Widgets
    systemTime: 'Giờ hệ thống',
    workspaceTasks: 'Công việc cần làm',
    back: 'Quay lại',
    hide: 'Ẩn',
    close: 'Đóng',
    
    // Boot and USB Screens
    usbHintClick: 'Nhấp USB để Khởi động',
    usbHintTap: 'Chạm USB để Khởi động',
    starting: 'Đang khởi động...',
    
    // Resume window
    downloadPdf: 'Tải CV bản PDF',
    previewResume: 'Xem trước CV Tương tác',
    
    // Contact window
    contactHeader: 'Kết nối với tôi',
    chatIntro: 'Xin chào! Tôi là Trợ lý ảo của Phương. Hãy để lại thông tin nếu bạn muốn gửi tin nhắn cho cô ấy nhé!',
    nameLabel: 'Họ và tên',
    emailLabel: 'Địa chỉ Email',
    msgLabel: 'Nội dung tin nhắn',
    sendBtn: 'Gửi tin nhắn',
    sendingBtn: 'Đang gửi...',
    msgSuccess: 'Cảm ơn bạn! Tin nhắn đã được gửi đi thành công.',
    msgError: 'Đã xảy ra lỗi! Vui lòng thử lại sau.',
    
    // SoundCloud Player
    tracklist: 'Danh sách bài hát',
    playing: 'Đang phát',
    paused: 'Đã tạm dừng',
    nowPlaying: 'Đang phát bài',

    // About Window
    biography: 'Tiểu sử cá nhân',
    interests: 'Sở thích cá nhân',
    careerTimeline: 'Lộ trình sự nghiệp',

    // Secret Room
    creatorIntro: 'Tôi là MuonNghiCode, lập trình viên đã thiết kế và xây dựng trang portfolio này.',
    creatorNarrative: 'Tôi xây dựng trình mô phỏng máy trạm hệ điều hành này nhằm mục đích giới thiệu các chiến dịch tiếp thị số và các dự án phát triển web theo cách tương tác trực quan và đáng nhớ nhất. Định hướng chính của tôi là tạo ra các ứng dụng web tốc độ cao, mượt mà và chuẩn thiết kế sử dụng React, Next.js và TypeScript.',
    coreFocus: 'Lĩnh vực tập trung',
    selectedCreations: 'Sản phẩm chọn lọc',
    starRepo: 'Tặng 1 sao trên GitHub nếu bạn thích trang này nhé!',
    craftedBy: 'Được thiết kế bởi MuonNghiCode với',
    devVision: 'Tầm nhìn Phát triển',
    quitCodingQuote: 'Tôi muốn bỏ code... nhưng chỉ khi tôi đã tạo dựng được một sản phẩm thực sự thay đổi cuộc sống và làm thế giới tốt đẹp hơn!',
    growProject: 'Phát triển qua từng dự án',
    innovateChallenge: 'Đổi mới qua mọi thách thức',
    excitedWorkOn: 'Mong muốn làm việc',
  }
}

// Translated portfolio data content
export const OWNER_VI = {
  role: 'Chuyên viên Marketing',
  roleAlt: 'Chiến lược gia SEO & Thương hiệu',
  bio: 'Là một người luôn nỗ lực cải thiện bản thân, tôi tự hào là sự kết hợp hài hòa giữa tư duy chiến lược và sự sáng tạo. Tôi đang tìm kiếm cơ hội thử thách để áp dụng kỹ năng lập kế hoạch chiến lược và giải quyết vấn đề sáng tạo của mình, đồng thời tích lũy kinh nghiệm quý báu về insight khách hàng, thị trường và phát triển chiến lược.',
  location: 'Biên Hòa, Đồng Nai',
}

export const ABOUT_TIMELINE_VI = [
  { year: '2022', label: 'Tốt nghiệp THPT Trấn Biên & Bắt đầu viết lách', detail: 'Tốt nghiệp trường THPT Trấn Biên (Biên Hòa). Bắt đầu học Digital Marketing tại Đại học FPT và ngay lập tức tham gia viết bài chuẩn SEO với tư cách Content Writer.' },
  { year: '2023', label: 'Bước vào lĩnh vực Quản lý Fanpage', detail: 'Nâng cao năng lực bằng cách tiếp nhận các vai trò quản trị mạng xã hội. Quản lý tiếp thị trực tuyến, chạy chiến dịch seeding và chăm sóc khách hàng hàng ngày.' },
  { year: '2024', label: 'Quản lý dự án & Định hình thương hiệu', detail: 'Trở thành trưởng dự án cộng đồng "Tâm Giới", tổ chức sự kiện thành công thu hút hơn 100 người tham gia. Đồng thời điều phối kế hoạch tiếp thị và hình ảnh cho nhà hàng địa phương.' },
  { year: '2025', label: 'Tham gia các thương hiệu lớn (Viettel & CellphoneS)', detail: 'Gia nhập Viettel ở vai trò Thực tập sinh SEO và CellphoneS với tư cách Cộng tác viên viết bài SEO. Tích lũy kỹ năng viết bài công nghệ/tài chính và tối ưu công cụ SEO.' },
  { year: '2026', label: 'Tốt nghiệp & Hướng tới tương lai', detail: 'Tốt nghiệp GPA 3.1 Đại học FPT, tích lũy 5 chứng chỉ chuyên môn quốc tế. Sẵn sàng cho vai trò lập kế hoạch chiến lược và giải quyết vấn đề sáng tạo.' },
]

export const PROJECTS_VI = [
  {
    id: 'p1',
    title: 'Sơn Mài Mỹ Nghệ Tư Bốn (Lacquer Craftsmanship)',
    role: 'Trưởng nhóm dự án & Liên lạc doanh nghiệp',
    description: 'Xây dựng chiến lược thâm nhập thị trường cho doanh nghiệp sơn mài truyền thống, kết nối tư duy học thuật với thực thi doanh nghiệp.',
    longDescription: 'Dự án khóa luận tốt nghiệp cấp đại học tập trung vào việc xây dựng chiến lược thâm nhập thị trường cho một doanh nghiệp làng nghề sơn mài truyền thống. Dự án nhằm mục đích kết nối chiến lược học thuật với thực thi doanh nghiệp, bảo tồn di sản văn hóa Việt Nam đồng thời làm cho di sản trở nên gần gũi và hấp dẫn với thế hệ Gen Z.',
    result: 'Đạt điểm số đánh giá hàng đầu hội đồng khoa; xây dựng thành công các kênh bán hàng mới và chiến lược tung sản phẩm nhắm tới khách hàng trẻ.',
    keyResults: [
      { title: 'Thành tích học thuật xuất sắc', desc: 'Đạt điểm đánh giá cao nhất hội đồng bộ môn nhờ tính khả thi chiến lược cao và tác động văn hóa tích cực.' },
      { title: 'Mở rộng thị trường & Kênh phân phối', desc: 'Xây dựng thành công các kênh tiếp cận bán hàng mới và lập chiến lược thâm nhập thị trường cho dòng sản phẩm mới nhắm tới người tiêu dùng trẻ.' }
    ]
  },
  {
    id: 'p2',
    title: 'Gen Z & Di sản Văn hóa (Dự án Chính trị FPT)',
    role: 'Trưởng nhóm dự án & Quản lý nội dung truyền thông',
    description: 'Làm mới các giá trị văn hóa truyền thống cho sinh viên Gen Z trong thời đại số thông qua thảo luận, podcast và triển lãm.',
    longDescription: 'Dự án môn học chính trị chuyên biệt nhằm khơi dậy và làm mới các giá trị văn hóa truyền thống cho sinh viên Gen Z trong thời đại số. Đóng vai trò cầu nối chính giữa các giáo viên, giảng viên và sinh viên để tổ chức các buổi thảo luận tương tác và triển lãm các khái niệm di sản độc đáo.',
    result: 'Tổ chức thành công 1 triển lãm văn hóa, chuỗi phỏng vấn sinh viên và sản xuất chuỗi podcast độc quyền cùng giảng viên.',
    keyResults: [
      { title: 'Triển lãm văn hóa & Chuỗi truyền thông', desc: 'Tổ chức thành công 1 triển lãm văn hóa, thực hiện chuỗi phỏng vấn sinh viên và sản xuất các tập podcast độc quyền với sự tham gia của các giảng viên.' },
      { title: 'Tối ưu hóa kết nối', desc: 'Gắn kết hiệu quả thông tin giữa giảng viên và sinh viên, thúc đẩy sự hưởng ứng mạnh mẽ và phản hồi tích cực trên các kênh truyền thông trường.' }
    ]
  },
  {
    id: 'p3',
    title: 'Plastic After U (Chiến dịch Môi trường)',
    role: 'Hỗ trợ đối tác & Tài trợ',
    description: 'Chiến dịch nâng cao nhận thức về môi trường phối hợp với các phòng ban Đại học FPT và các nhà tài trợ ngoài.',
    longDescription: 'Chiến dịch nâng cao nhận thức về môi trường phối hợp cùng các phòng ban Đại học FPT và nhà tài trợ bên ngoài nhằm thúc đẩy lối sống xanh bền vững trong giới trẻ.',
    result: 'Gợi mở và gọi tài trợ thành công 100% mục tiêu; thu hút hơn 200+ sinh viên tham dự phối hợp với 5+ đối tác trường đại học/cao đẳng.',
    keyResults: [
      { title: 'Đạt 100% Mục tiêu Tài trợ', desc: 'Thuyết trình thuyết phục và huy động thành công 100% kinh phí tài trợ mục tiêu.' },
      { title: '200+ Sinh viên tham dự', desc: 'Điều phối vận hành sự kiện trơn tru cùng 5+ đối tác trường đại học và cao đẳng.' }
    ]
  },
  {
    id: 'p4',
    title: 'Lê Lực Production — Phim ngắn "Họa Sắc"',
    role: 'Trợ lý sản xuất & Trưởng bộ phận vận hành',
    description: 'Quản lý hậu cần diễn viên, vận hành tại hiện trường và đồng dẫn dắt chiến lược ra mắt lan tỏa trên mạng xã hội cho phim ngắn "Họa Sắc".',
    longDescription: 'Quản lý hậu cần diễn viên, vận hành trực tiếp tại hiện trường và đồng dẫn dắt chiến lược ra mắt truyền thông cho bộ phim ngắn đạt giải thưởng "Họa Sắc".',
    result: 'Đạt giải "Đạo diễn xuất sắc nhất" tại Giải thưởng Phim sinh viên; tạo ra hơn 53,700+ lượt tiếp cận và 3,450+ tương tác.',
    keyResults: [
      { title: 'Đạt Giải thưởng Lớn', desc: 'Được vinh danh giải "Đạo diễn xuất sắc nhất" tại giải thưởng phim sinh viên.' },
      { title: '53,700+ Lượt tiếp cận toàn mạng', desc: 'Tạo ra 3,450+ lượt tương tác và 1,360+ lượt xem cho bộ phim.' }
    ]
  },
  {
    id: 'p5',
    title: 'Dự án "Tâm Giới"',
    role: 'Quản lý dự án / Lập kế hoạch nội dung sự kiện',
    description: 'Chuỗi sự kiện hướng tới sinh viên tôn vinh sự đa dạng bản dạng giới thông qua các chiến dịch PR và hoạt động trải nghiệm thực tế.',
    longDescription: 'Chuỗi sự kiện hướng tới sinh viên tôn vinh sự đa dạng bản dạng giới thông qua các chiến dịch PR chiến lược và hoạt động trải nghiệm trực tiếp.',
    result: 'Thu hút hơn 100+ người tham dự; đạt 100% tỷ lệ phê duyệt từ Đoàn thanh niên & CTSV.',
    keyResults: [
      { title: '100+ Người tham dự trực tiếp', desc: 'Quản lý thành công toàn bộ nội dung PR và hậu cần sự kiện từ đầu đến cuối.' },
      { title: '100% Tỷ lệ Phê duyệt', desc: 'Hợp tác chặt chẽ với Đoàn Thanh niên & Phòng CTSV để hoàn tất phê duyệt địa điểm và truyền thông chéo.' }
    ]
  },
]

export const EXPERIENCES_VI = [
  {
    id: 'e1',
    companyAbbr: 'Chị Gái Tân Thời',
    role: 'Quản lý Fanpage',
    company: 'Chị Gái Tân Thời & Ăn Vặt Shin',
    narrative: 'Trong giai đoạn này, nhiệm vụ chính của tôi là phát triển nội dung và hình ảnh của thương hiệu trên mạng xã hội. Từ lên kế hoạch nội dung, chạy chiến dịch seeding, chăm sóc khách hàng trực tuyến, đến phối hợp thiết kế khuyến mãi. Công việc này giúp tôi hiểu rõ cách vận hành và gây dựng cộng đồng cho một thương hiệu địa phương.',
    description: [
      'Quản lý toàn bộ kênh truyền thông mạng xã hội của thương hiệu, lên ý tưởng nội dung, lập lịch đăng bài và tương tác hàng ngày với người theo dõi.',
      'Triển khai các chiến dịch seeding cộng đồng địa phương nhằm tăng nhận diện thương hiệu và kéo khách đến quán.',
      'Hợp tác chặt chẽ với nhà thiết kế để đồng bộ hóa hình ảnh banner/poster với các đợt khuyến mãi lớn.',
      'Giải đáp nhanh chóng các phản hồi trực tuyến để giữ vững uy tín thương hiệu và gắn kết khách hàng thân thiết.'
    ]
  },
  {
    id: 'e2',
    companyAbbr: 'Viettel',
    role: 'Thực tập sinh SEO',
    company: 'Viettel',
    narrative: 'Học hỏi và trưởng thành trong môi trường tập đoàn. Tại Viettel, tôi tập trung vào viết bài chuẩn SEO mảng du lịch và tài chính. Bằng cách nghiên cứu từ khóa kỹ lưỡng và phối hợp thiết kế ảnh bài đăng, tôi đã giúp nhiều bài viết đạt Top tìm kiếm, góp phần thúc đẩy lượt truy cập tự nhiên.',
    description: [
      'Viết và tối ưu hóa các bài viết SEO thuộc lĩnh vực du lịch và tài chính, hỗ trợ thương hiệu mở rộng tệp độc giả tự nhiên trên Google.',
      'Đưa nhiều bài viết lọt Top Search Google nhờ cấu trúc bài đăng khoa học, tập trung giải quyết đúng nhu cầu tìm kiếm của người dùng.',
      'Phối hợp thiết kế hình ảnh bài đăng đồng nhất và trực quan, nâng cao tính chuyên nghiệp cho từng trang blog.',
      'Đo lường thứ hạng từ khóa và cập nhật nội dung cũ để giữ lượng truy cập trang web ổn định.'
    ]
  },
  {
    id: 'e3',
    companyAbbr: 'CellphoneS',
    role: 'Cộng tác viên SEO Content',
    company: 'CellphoneS',
    narrative: 'Ứng dụng năng lực trong ngành bán lẻ thương mại điện tử. Tại CellphoneS, tôi trực tiếp lên nội dung chuẩn SEO mảng công nghệ & tài chính. Bằng cách hiểu tâm lý tìm kiếm khách hàng và tự thiết kế ảnh bài đăng, nhiều bài viết đã xuất sắc lọt Top Trending và Top Search thị trường.',
    description: [
      'Sản xuất nội dung chuẩn SEO mảng công nghệ & thiết bị điện tử tiêu dùng (bao gồm điện thoại thông minh, máy tính xách tay và các sản phẩm liên quan). Nghiên cứu chủ đề, xây dựng cấu trúc bài viết và tạo nội dung chuẩn ý định tìm kiếm (search intent) & tiêu chuẩn SEO.',
      'Đưa nhiều bài viết lên Top Trending thị trường và Top Search nhờ phát hiện các xu hướng mới và triển khai nội dung rõ ràng.',
      'Góp phần tăng lưu lượng truy cập tự nhiên (organic traffic) cho các nhóm sản phẩm bán hàng trọng điểm theo chiến dịch.',
      'Trực tiếp thiết kế và chỉnh sửa ảnh bài viết sạch đẹp, dễ nhìn, thu hút người đọc dừng chân lâu hơn.'
    ],
    proof: {
      badge: 'TOP TRENDING',
      title: 'Các bài viết SEO tiêu biểu xuất sắc đạt Top Trending.',
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
    }
  }
]

export const EDUCATION_VI = {
  institution: 'Đại học FPT',
  degree: 'Cử nhân Quản trị Kinh doanh',
  field: 'Chuyên ngành: Digital Marketing',
  activities: [
    {
      title: 'Trưởng dự án "Tâm Giới" (2024)',
      subtitle: 'Chiến lược PR · Gắn kết cộng đồng · Tổ chức sự kiện',
    },
    {
      title: 'Project Leader — Khóa luận tốt nghiệp MÀI',
      subtitle: 'Quản trị dự án · Lãnh đạo nhóm · Phát triển thương hiệu',
    },
    {
      title: 'Cuộc thi Torneo ACBSP — CompanyGame',
      subtitle: 'Mô phỏng kinh doanh · Làm việc nhóm · Ra quyết định chiến lược',
    },
  ],
}

export const INTERESTS_VI = [
  { label: 'Nhiếp ảnh', icon: 'Camera' },
  { label: 'Thời trang', icon: 'ShoppingBag' },
  { label: 'Du lịch', icon: 'MapPin' },
  { label: 'Cà phê', icon: 'Coffee' },
  { label: 'Sáng tạo nội dung', icon: 'BookOpen' },
  { label: 'Thiết kế đồ họa', icon: 'Palette' },
]

export const FOCUS_AREAS_VI = [
  { title: 'Kỹ thuật Front-end', desc: 'Next.js, React, TypeScript, Tailwind CSS' },
  { title: 'Kiến trúc Full-stack', desc: 'Node.js, Express, REST APIs, MongoDB' }
]

export const ACHIEVEMENTS_VI = [
  { id: 'a1', title: 'Trưởng dự án "Tâm Giới" — 2024', description: 'Tổ chức và định hình thương hiệu cho sự kiện cộng đồng từ con số 0, thu hút hơn 100 người tham gia và tương tác cao trên mạng xã hội.', year: '2024' },
  { id: 'a2', title: 'Giải nhất Marketing Hackathon Đại học FPT', description: 'Đạt giải nhất cuộc thi lập kế hoạch chiến lược thương hiệu và tiếp thị số quy mô toàn trường.', year: '2025' },
  { id: 'a3', title: 'Bài viết SEO hiệu suất cao — CellphoneS', description: 'Đưa hơn 20 từ khóa công nghệ và bán lẻ có tính cạnh tranh cao lọt Top 3 tìm kiếm Google, tăng đáng kể lượt xem trang tự nhiên.', year: '2025' },
]
