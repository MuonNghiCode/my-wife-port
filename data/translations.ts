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
    title: 'Chiến dịch Chiến lược Heineken',
    description: 'Dẫn dắt chiến dịch truyền thông tích hợp "No Fears, Just Cheers" nhằm thay đổi định kiến giới về tiêu thụ bia thông qua các góc nhìn GESI.',
    longDescription: 'Dẫn dắt đội ngũ 7 thành viên phân tích định vị thị trường và insight người tiêu dùng của Heineken. Phát triển kế hoạch truyền thông đa nền tảng toàn diện (TVC, OOH, Mạng xã hội, Sự kiện) xoay quanh Bình đẳng giới & Hòa nhập xã hội (GESI). Đồng tác giả đề xuất hợp tác thương hiệu với Dove cho chiến dịch ngày Quốc tế Phụ nữ.',
    result: 'Trình bày thành công lộ trình IMC toàn diện, bao gồm tiến trình chiến dịch chi tiết, phân bổ ngân sách và ý tưởng TVC sáng tạo tự biên tập.',
  },
  {
    id: 'p2',
    title: 'Kế hoạch Tái định vị Calvin Klein',
    description: 'Thực hiện nghiên cứu sơ cấp sâu và phân tích hành vi để cùng xây dựng chiến lược tái định vị quy mô lớn nhắm tới người tiêu dùng nam.',
    longDescription: 'Đóng vai trò Trưởng nhóm dự án cho đội ngũ 6 thành viên. Thực hiện nghiên cứu sơ cấp quy mô lớn thông qua phỏng vấn và khảo sát để trích xuất insight khách hàng. Áp dụng các mô hình tâm lý học quyết định (Id, Ego, Superego) để giải mã hành vi mua hàng của nam giới đô thị (độ tuổi 16-50), lập tiến trình chiến dịch và phân bổ ngân sách.',
    result: 'Đưa ra đề xuất tiếp thị toàn diện dựa trên dữ liệu xác thực từ các cơ sở dữ liệu lớn như Statista và Fragrantica để chứng minh các điểm chạm mục tiêu mới.',
  },
  {
    id: 'p3',
    title: 'Sự kiện Cộng đồng "Tâm Giới"',
    description: 'Thực hiện chiến lược PR và điều phối dự án cho sự kiện cộng đồng tôn vinh sự đa dạng giới.',
    longDescription: 'Đồng quản lý khung PR và truyền thông toàn bộ dự án để đảm bảo mức độ hiển thị cao và thông điệp nhất quán. Thiết lập và tổ chức buổi gặp gỡ cộng đồng trực tiếp nhằm tri ân và tôn vinh sự độc bản của mọi bản dạng giới.',
    result: 'Thu hút và gắn kết thành công hơn 100+ sinh viên và khách mời đặc biệt tham gia tích cực, mang lại trải nghiệm sự kiện an toàn, trôi chảy và đầy cảm xúc.',
  },
  {
    id: 'p4',
    title: 'Tái định vị Thương hiệu Bún Đậu Hồng Thương',
    description: 'Áp dụng mô hình STP và 7Ps để nâng cao nhận diện thương hiệu và tối ưu hóa trải nghiệm khách hàng cho một quán ăn địa phương.',
    longDescription: 'Dẫn đầu nghiên cứu đối thủ cạnh tranh và phân tích hành vi người tiêu dùng địa phương sau khi nhà hàng chuyển địa điểm. Phát triển khung tiếp thị dịch vụ 7Ps & STP, đề xuất các chương trình giới thiệu và lịch trình nội dung mạng xã hội để tăng lưu lượng khách hàng trực tuyến lẫn trực tiếp.',
    result: 'Xây dựng chiến lược tái định vị thương hiệu địa phương được tối ưu hóa thông qua đối chiếu dữ liệu người dùng từ ShopeeFood, BeFood và đánh giá trên Google Maps.',
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
