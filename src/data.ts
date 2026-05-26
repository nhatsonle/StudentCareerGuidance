import { AssessmentQuestion, CareerPathData } from "./types";

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "q1",
    questionText: "Dự án CNTT lý tưởng mà bạn muốn bắt tay vào nghiên cứu hoặc phát triển nhất là gì?",
    options: [
      {
        text: "Một website thương mại điện tử giao diện đẹp mắt, tải trang siêu tốc cho triệu người mua sắm.",
        scoreValue: { web: 3, mobile: 1, ai: 0, embedded: 0, cyber: 0 }
      },
      {
        text: "Một ứng dụng di động độc đáo chăm sóc sức khỏe, hỗ trợ định vị GPS và thông báo tiện lợi.",
        scoreValue: { web: 1, mobile: 3, ai: 0, embedded: 0, cyber: 0 }
      },
      {
        text: "Một mô hình AI thông minh tự dự báo sự biến động thị trường tài chính dựa vào dữ liệu lớn.",
        scoreValue: { web: 0, mobile: 0, ai: 3, embedded: 0, cyber: 0 }
      },
      {
        text: "Hệ thống nhà thông minh tự điều khiển điều hòa, đèn chiếu sáng thông qua mắt đọc cảm biến.",
        scoreValue: { web: 0, mobile: 0, ai: 1, embedded: 3, cyber: 0 }
      },
      {
        text: "Một công cụ tự động quét, truy tìm các lỗ hổng hệ thống để dựng lá chắn chống hack dữ liệu.",
        scoreValue: { web: 0, mobile: 0, ai: 0, embedded: 0, cyber: 3 }
      }
    ]
  },
  {
    id: "q2",
    questionText: "Trong chu kỳ lập trình và phát triển sản phẩm, bạn thích can thiệp vào phân vùng nào nhất?",
    options: [
      {
        text: "Tầng hiển thị trực quan (giao diện UI/UX, nút bấm, bảng màu sinh động và hiệu ứng trượt cảnh mượt).",
        scoreValue: { web: 3, mobile: 3, ai: 0, embedded: 0, cyber: 0 }
      },
      {
        text: "Tầng máy chủ & Cơ sở dữ liệu (xử lý logic phía sau hệ thống, thiết kế API, cấu trúc lưu trữ bảo mật).",
        scoreValue: { web: 3, mobile: 1, ai: 1, embedded: 0, cyber: 1 }
      },
      {
        text: "Tầng mô hình & Thuật toán (viết mã huấn luyện mạng nơ-ron phức tạp để máy tự ra quyết định).",
        scoreValue: { web: 0, mobile: 0, ai: 3, embedded: 1, cyber: 0 }
      },
      {
        text: "Tầng bo mạch bán dẫn & Driver thấp (điều khiển trực tiếp cơ cấu phần cứng máy vật lý, tối ưu RAM/ROM cực hạn).",
        scoreValue: { web: 0, mobile: 0, ai: 0, embedded: 3, cyber: 1 }
      },
      {
        text: "Tầng phòng thủ & Giám sát bảo an (quét gói tin hệ thống mạng, mã hóa dữ liệu nhạy cảm chống nghe lén).",
        scoreValue: { web: 0, mobile: 0, ai: 0, embedded: 0, cyber: 3 }
      }
    ]
  },
  {
    id: "q3",
    questionText: "Khi tự học lập trình, bộ công cụ/Ngôn ngữ nào đem lại cảm hứng kích thích tư duy bạn nhất?",
    options: [
      {
        text: "Javascript, HTML/CSS, React, Tailwind CSS - những khối gạch xây thế giới web trực quan toàn cầu.",
        scoreValue: { web: 3, mobile: 1, ai: 0, embedded: 0, cyber: 0 }
      },
      {
        text: "Dart (Flutter), Kotlin, Swift - các ngôn ngữ gọn gàng đưa ứng dụng bay cao trên thiết bị thông minh cầm tay.",
        scoreValue: { web: 1, mobile: 3, ai: 0, embedded: 0, cyber: 0 }
      },
      {
        text: "Python, Jupyter Notebook, Pandas, PyTorch - tập trung vào trích xuất tri thức từ đại dương thông tin đồ sộ.",
        scoreValue: { web: 0, mobile: 0, ai: 3, embedded: 0, cyber: 1 }
      },
      {
        text: "Ngôn ngữ C/C++ thuần túy, tệp tin nhị phân điều hướng thanh ghi, lập trình trực tiếp các cổng vi điều khiển.",
        scoreValue: { web: 0, mobile: 0, ai: 0, embedded: 3, cyber: 1 }
      },
      {
        text: "Kiến trúc dòng lệnh terminal Linux, các bộ vi công cụ gỡ lỗi, kiểm định lỗ hổng bảo mật như Wireshark, Metasploit.",
        scoreValue: { web: 0, mobile: 0, ai: 0, embedded: 1, cyber: 3 }
      }
    ]
  },
  {
    id: "q4",
    questionText: "Khi đối mặt với một vấn đề kỹ thuật lớn (Bug) hóc búa, bạn thường có phong thái tìm tòi thế nào?",
    options: [
      {
        text: "Thử cấu hình lại mã render giao diện hoặc kiểm định phản hồi API phía máy chủ để gỡ sai ngay lập tức.",
        scoreValue: { web: 3, mobile: 2, ai: 0, embedded: 0, cyber: 0 }
      },
      {
        text: "Ghi chép nhật ký hành vi phần mềm trên điện thoại di động nhằm giải phóng dung lượng rò rỉ dung lượng RAM.",
        scoreValue: { web: 1, mobile: 3, ai: 0, embedded: 1, cyber: 0 }
      },
      {
        text: "Khảo sát kỹ thông số kỹ thuật của mô hình toán, tối ưu hóa lại giá trị siêu tham số (hyperparameters).",
        scoreValue: { web: 0, mobile: 0, ai: 3, embedded: 0, cyber: 0 }
      },
      {
        text: "Kiểm tra dao động nguồn của IC hoặc sơ đồ kết nối chân cắm vật lý để xem có bị nhiễu điện không.",
        scoreValue: { embedded: 3, web: 0, mobile: 0, ai: 0, cyber: 0 }
      },
      {
        text: "Phân tích lỗ hổng xem bug này có thể bị kẻ xấu khai thác để chèn mã độc hay chiếm tài khoản không.",
        scoreValue: { cyber: 3, web: 0, mobile: 0, ai: 0, embedded: 0 }
      }
    ]
  },
  {
    id: "q5",
    questionText: "Bạn tin vào xu hướng thay đổi mang tính cách mạng nhất trong 5-10 năm tới là gì?",
    options: [
      {
        text: "Trải nghiệm ranh giới các ứng dụng đều quy về Web App siêu mượt chạy trực tiếp hoàn toàn trên trình duyệt cloud.",
        scoreValue: { web: 3, mobile: 1, ai: 1, embedded: 0, cyber: 0 }
      },
      {
        text: "Các thiết bị di động, kính AR/VR thông minh sẽ là trung tâm tương tác cốt lõi gắn liền cuộc sống con người.",
        scoreValue: { mobile: 3, web: 1, ai: 1, embedded: 1, cyber: 0 }
      },
      {
        text: "AI thay thế hoàn toàn các thao tác dư thừa, các hệ thống tự động hóa sử dụng LLM sẽ thay đổi vận mệnh công nghệ thế giới.",
        scoreValue: { ai: 3, web: 0, mobile: 0, embedded: 1, cyber: 1 }
      },
      {
        text: "Xe tự lái điện thông minh, Internet of Things và thiết bị chip bán dẫn chiếm lĩnh không gian khoa học vật lý.",
        scoreValue: { embedded: 3, ai: 1, web: 0, mobile: 0, cyber: 0 }
      },
      {
        text: "Các chiến dịch gián điệp mạng và tống tiền số leo thang, đưa an ninh thông tin thành xương sống tối thượng của doanh nghiệp.",
        scoreValue: { cyber: 3, ai: 1, web: 0, mobile: 0, embedded: 0 }
      }
    ]
  },
  {
    id: "q6",
    questionText: "Niềm vui nào dưới đây mang lại cảm xúc đong đầy hứng khởi nghề nghiệp nhất cho bạn?",
    options: [
      {
        text: "Hiện thực hóa một bố cục giao diện mỹ thuật kết hợp logic cơ sở dữ liệu nhịp nhàng, thông thoáng.",
        scoreValue: { web: 3, mobile: 2, ai: 0, embedded: 0, cyber: 0 }
      },
      {
        text: "Chạy thử bản ứng dụng di động chính thức trên tay cực kỳ mượt mà, sẵn sàng tải lên chợ ứng dụng quốc tế.",
        scoreValue: { mobile: 3, web: 2, ai: 0, embedded: 0, cyber: 0 }
      },
      {
        text: "Độ chính xác (Accuracy) của một mô hình học sâu vừa lập trình xong tăng vọt sau đêm dài huấn luyện.",
        scoreValue: { ai: 3, web: 0, mobile: 0, embedded: 0, cyber: 0 }
      },
      {
        text: "Tiếp năng lượng thành công cho Kit vi điều khiển, nhìn bánh xe robot nhịp nhàng đo khoảng cách di chuyển.",
        scoreValue: { embedded: 3, ai: 0, web: 0, mobile: 0, cyber: 0 }
      },
      {
        text: "Giải mã thành công một đề bài CTF bảo mật hóc búa, rinh về cờ an ninh mạng trong vinh quang lập trình.",
        scoreValue: { cyber: 3, web: 0, mobile: 0, ai: 0, embedded: 0 }
      }
    ]
  }
];

export const careerPathsData: Record<string, CareerPathData> = {
  web: {
    id: "web",
    title: "Lập trình viên Web (Web Developer)",
    subTitle: "Kiến tạo các nền tảng số hóa mượt mà trên Cloud toàn cầu",
    description: "Nhà phát triển Web đảm đương việc đưa ý tưởng kinh doanh lên trình duyệt thông qua thiết kế giao diện tương tác bắt mắt (Frontend) kết hợp kiến trúc xử lý dữ liệu lưu trữ đám mây vững như bàn thạch (Backend).",
    colorTheme: "from-emerald-500 to-indigo-600",
    accentColor: "emerald",
    starsRate: 5,
    averageSalary: "12 - 35 Triệu VND / Tháng",
    outlook: "Bền vững & Tuyển dụng bùng nổ quanh năm",
    technologies: ["React", "Typescript", "Node.js", "Express", "Next.js", "PostgreSQL", "Docker", "Tailwind CSS"],
    phases: [
      {
        id: "web-p1",
        title: "Phase 1: Khởi đầu & Xương sống (Foundations)",
        description: "Rèn luyện tư duy lập trình cốt lõi và khả năng trực quan hóa cấu trúc của các trang web chuẩn chỉ.",
        milestones: [
          {
            id: "m-web-1",
            title: "HTML5 & CSS3 Chuyên sâu",
            duration: "3 - 4 Tuần",
            description: "Thấu hiểu cách thiết kế bố cục (Layouts), áp dụng Grid & Flexbox, tối ưu Responsive, và khả năng hỗ trợ nhãn phần tử chuẩn SEO.",
            checklist: ["Làm quen các thẻ ngữ nghĩa HTML Semantic", "Thiết kế layout Flexbox và CSS Grid tối ưu", "Responsive Web Design ứng dụng Media Queries", "Xây dựng giao diện Landing Page Profile cá nhân"],
            resources: [
              { title: "W3Schools HTML & CSS Tutorial", type: "Docs", link: "https://www.w3schools.com/html/" },
              { title: "Học HTML/CSS từ số 0 tại F8 Education (Học phí 0đ)", type: "Video", link: "https://fullstack.edu.vn/" },
              { title: "Project: Thiết kế Giao diện CV Cá Nhân đẹp mắt responsive", type: "Project", link: "#" }
            ]
          },
          {
            id: "m-web-2",
            title: "Lập trình Javascript (ES6+) từ Căn bản đến Nâng cao",
            duration: "4 - 5 Tuần",
            description: "Nắm vững luồng logic, điều khiển DOM, cơ chế bất đồng bộ, thao tác với Array/Object chất lượng cao.",
            checklist: ["Kiểu dữ liệu, biến, vòng lặp và câu lệnh rẽ nhánh", "Thao tác trực tiếp với DOM & Xử lý sự kiện (Events)", "Bất đồng bộ trong JS: Promise, Callbacks và Async/Await", "Làm việc chuyên thục cấu trúc JSON và nạp dữ liệu Fetch API"],
            resources: [
              { title: "javascript.info - Tài liệu học JS chuẩn thế giới", type: "Docs", link: "https://javascript.info/" },
              { title: "Lập trình JS cơ bản & nâng cao bởi Sơn Đặng (F8)", type: "Video", link: "https://fullstack.edu.vn/" }
            ]
          }
        ]
      },
      {
        id: "web-p2",
        title: "Phase 2: Làm chủ thư viện hiện đại (Frontend Master)",
        description: "Học cách thiết kế Single-Page Application mạnh mẽ, tốc độ phản hồi nhanh chóng cùng quản lý dữ liệu hiệu năng tốt.",
        milestones: [
          {
            id: "m-web-3",
            title: "React.js & Tailwind CSS",
            duration: "5 - 6 Tuần",
            description: "Mô hình hóa giao diện dưới dạng Components, quản lý State thông minh, vòng đời thành phần và thiết kế siêu tốc thông qua Tailwind utility class.",
            checklist: ["Nắm vững kiến trúc JSX, Component & Props", "Sử dụng hiệu thạo các React Hooks (useState, useEffect, useMemo)", "Cấu hình Router với React Router v6", "Quản lý trạng thái toàn cục bằng Context API hoặc Redux Toolkit"],
            resources: [
              { title: "React Official Documentation - Phiên bản mới", type: "Docs", link: "https://react.dev" },
              { title: "Tailwind CSS - Tài liệu tra cứu trau chuốt", type: "Docs", link: "https://tailwindcss.com" },
              { title: "Project: Xây dựng Dashboard Quản Lý Công Việc cá nhân hóa", type: "Project", link: "#" }
            ]
          }
        ]
      },
      {
        id: "web-p3",
        title: "Phase 3: Máy chủ & Kiến trúc lưu trữ (Backend Core)",
        description: "Xây dựng các API hiệu năng cao, cơ chế xác thực an toàn bảo mật, và tương tác bền bỉ với Cơ sở dữ liệu hữu quan.",
        milestones: [
          {
            id: "m-web-4",
            title: "Node.js & Express Framework",
            duration: "4 - 5 Tuần",
            description: "Hiểu sâu cơ chế Event Loop, tạo ứng dụng RESTful API, viết bộ lọc middleware, kiểm soát lỗi tập trung.",
            checklist: ["Hiểu cơ chế hoạt động bất đồng bộ phi chặn (Non-blocking IO) của Node.js", "Xây dựng kiến trúc định tuyến API bằng Express", "Tích hợp xác thực bảo mật tài khoản chuẩn hóa JWT (JSON Web Tokens)", "Viết các middleware gỡ lỗi và phân quyền thông minh"],
            resources: [
              { title: "Express.js - Sổ tay hướng dẫn phát triển API nhanh chóng", type: "Docs", link: "https://expressjs.com" }
            ]
          },
          {
            id: "m-web-5",
            title: "Cơ sở dữ liệu (PostgreSQL / MongoDB)",
            duration: "3 - 4 Tuần",
            description: "Thiết kế mô hình thực thể quan hệ, truy vấn dữ liệu hiệu năng cao, lập index tối ưu hoá tốc độ đọc ghi.",
            checklist: ["Thiết kế cấu trúc bảng, khóa ngoại và ràng buộc dữ liệu", "Viết câu lệnh truy vấn SQL nâng cao (Join, Group By)", "Sử dụng thư viện ORM như Prisma hoặc Mongoose", "Tối ưu hóa Index nâng cao tốc độ tải của SQL"],
            resources: [
              { title: "SQL Tutorial - Luyện tập truy vấn cơ bản trực quan", type: "Docs", link: "https://www.sqlbolt.com/" }
            ]
          }
        ]
      },
      {
        id: "web-p4",
        title: "Phase 4: Chuyên nghiệp hóa & Fullstack Project",
        description: "Tổng hợp toàn bộ kiến thức, đưa ứng dụng lên máy chủ Internet thực tế phục vụ các nhà tuyển dụng.",
        milestones: [
          {
            id: "m-web-6",
            title: "Học Next.js (SSR) & Container Docker",
            duration: "4 Tuần",
            description: "SEO tối ưu bằng cách Render phía Máy chủ (SSR), đóng gói hệ thống an toàn bằng Docker Container cách ly phần mềm ổn định.",
            checklist: ["Tìm hiểu mô hình App Router tinh tế của Next.js", "Tối ưu SEO và Core Web Vitals tối đa trên Search Engine", "Viết Dockerfile đóng gói an toàn mã nguồn Frontend & Backend", "Triển khai lên VPS hoặc Cloud Run của Google Cloud"],
            resources: [
              { title: "Next.js Learning Course - Trực quan từng bước chuyên sâu", type: "Docs", link: "https://nextjs.org/learn" },
              { title: "Project: Xây dựng Mạng Xã Hội Sinh Viên thu nhỏ (Fullstack Next.js + DB)", type: "Project", link: "#" }
            ]
          }
        ]
      }
    ]
  },
  mobile: {
    id: "mobile",
    title: "Kỹ sư Lập trình Di động (Mobile App Developer)",
    subTitle: "Phát triển ứng dụng mượt mà nằm trọn trên thiết bị bỏ túi",
    description: "Nhà phát triển ứng dụng di động tập trung cung cấp giải pháp, tiện ích mượt mà ngay trên các nền tảng cầm tay Android/iOS, mang sự tiện nghi tuyệt đối cùng trải nghiệm cảm ứng trực quan lý thú.",
    colorTheme: "from-cyan-500 to-blue-600",
    accentColor: "cyan",
    starsRate: 5,
    averageSalary: "15 - 40 Triệu VND / Tháng",
    outlook: "Bùng nổ cùng làn sóng chuyển đổi số & Thương mại điện thoại",
    technologies: ["Flutter", "React Native", "Kotlin", "Swift", "Dart", "Firebase", "SQLite", "Git"],
    phases: [
      {
        id: "mob-p1",
        title: "Phase 1: Ngôn ngữ nền tảng (Language Core)",
        description: "Xây dựng tư duy lập trình hướng đối tượng vững bền kết hợp cú pháp ngôn ngữ biên dịch hiện đại.",
        milestones: [
          {
            id: "m-mob-1",
            title: "Dart (Flutter) hoặc Javascript (React Native)",
            duration: "4 Tuần",
            description: "Thấu hiểu cách xử lý kiểu dữ liệu tĩnh nâng cao của Dart hoặc cơ chế động hướng sự kiện linh động của Javascript.",
            checklist: ["Lập trình hướng đối tượng nâng cao (OOP): Kế thừa, Đa hình, Trừu tượng", "Xử lý danh sách (Collections) nâng cao", "Cơ chế bất đồng bộ Future, Stream trong Dart hoặc Promises trong JS", "Thiết lập môi trường làm việc Android Studio & Xcode căn bản"],
            resources: [
              { title: "Dart Official Site - Hướng dẫn chi tiết", type: "Docs", link: "https://dart.dev" }
            ]
          }
        ]
      },
      {
        id: "mob-p2",
        title: "Phase 2: Giao diện ứng dụng & Cấu trúc Widget (UI & UX Core)",
        description: "Học cách tổ chức và vẽ giao diện ứng dụng đẹp mắt trên nhiều kích thước màn hình thiết bị khác nhau.",
        milestones: [
          {
            id: "m-mob-2",
            title: "Tạo dựng Giao diện với Cấu trúc Widget",
            duration: "4 - 5 Tuần",
            description: "Sử dụng mô hình Declarative UI để tùy biến từng chi tiết nhỏ mượt mà, định hình chuyển động tự nhiên.",
            checklist: ["Xây dựng bố cục sử dụng Row, Column, Stack, ListvView", "Tổ chức State: Stateless vs Stateful Widgets trong Flutter", "Tự vẽ custom canvas hoặc thiết kế Animation chuyển động đơn giản", "Responsive layout tự co giãn tương thích máy tính bảng và điện thoại nhỏ"],
            resources: [
              { title: "Flutter Widget Youtube Series - Xem học trực quan", type: "Video", link: "https://flutter.dev" }
            ]
          }
        ]
      },
      {
        id: "mob-p3",
        title: "Phase 3: Quản lý Trạng thái & Đồng bộ Cloud (State & APIs)",
        description: "Quản lý luồng dữ liệu trôi chảy xuyên suốt các trang của ứng dụng và thực hành gọi API tải thông tin thời gian thực.",
        milestones: [
          {
            id: "m-mob-3",
            title: "Trạng thái nâng cao & Gọi APIs dữ liệu",
            duration: "5 Tuần",
            description: "Học cách tổ chức dữ liệu tầng mô hình bằng các công cụ uy tín như Bloc, Provider, Riverpod cùng xử lý cache ngoại tuyến.",
            checklist: ["Áp dụng mô hình thiết kế quản lý trạng thái sạch: Riverpod hoặc Bloc", "Giao tiếp máy chủ: gọi Http, gỡ lỗi dữ liệu Json, xử lý ngoại lệ mất mạng", "Lưu trữ offline: SQLite, Room, Hive hoặc SharedPreferences", "Tích hợp tính năng Firebase Authentication & Firebase Cloud Messaging (FCM) gửi thông báo tức thời"],
            resources: [
              { title: "Riverpod docs - Quản lý state xuất sắc cho Flutter", type: "Docs", link: "https://riverpod.dev" },
              { title: "Project: Ứng dụng Sổ tay Khám Phá Địa Điểm Ăn Uống (Offline cache + Gọi API)", type: "Project", link: "#" }
            ]
          }
        ]
      },
      {
        id: "mob-p4",
        title: "Phase 4: Đóng gói và phát hành ứng dụng lên Store (Production)",
        description: "Học cách xuất các tệp tin cài đặt an toàn và vượt qua kiểm định khó nhằn của Google và Apple.",
        milestones: [
          {
            id: "m-mob-4",
            title: "Tối ưu hóa hiệu năng & Xuất bản tệp tin cài đặt",
            duration: "3 Tuần",
            description: "Cắt giảm dung lượng tệp tin cài đặt, tối ưu khung hình vẽ mượt 60fps và xuất bản lên kho ứng dụng trực tuyến.",
            checklist: ["Thực hành Obfuscate code bảo mật tệp cài đặt chống dịch ngược", "Tối ưu hóa dung lượng file APK/AAB cho Android và IPA cho iOS", "Quy trình đăng ký tài khoản lập trình viên và phát hành phiên bản thử nghiệm (Beta Testing)", "Thiết lập CI/CD tự động build app sử dụng Github Actions"],
            resources: [
              { title: "Flutter App Publishing Guide - Hướng dẫn từng bước", type: "Docs", link: "https://docs.flutter.dev/deployment/android" }
            ]
          }
        ]
      }
    ]
  },
  ai: {
    id: "ai",
    title: "Kỹ sư Trí tuệ Nhân tạo & ML (AI / Machine Learning Engineer)",
    subTitle: "Huấn luyện thuật toán thông minh, mở ra tương lai trí tuệ đột phá",
    description: "Nhà khoa học dữ liệu và kỹ sư học máy chịu trách nhiệm thu thập, tiền xử lý kho dữ liệu rộng lớn và triển khai các mô hình toán học giải quyết những quyết sách phức tạp nhất của nhân loại.",
    colorTheme: "from-violet-500 to-indigo-600",
    accentColor: "violet",
    starsRate: 5,
    averageSalary: "20 - 65 Triệu VND / Tháng",
    outlook: "Bùng nổ dữ dội nhất trong kỷ nguyên số hóa mới",
    technologies: ["Python", "Numpy", "Pandas", "Scikit-Learn", "PyTorch", "Tensorflow", "SQL", "LLM Fine-tuning"],
    phases: [
      {
        id: "ai-p1",
        title: "Phase 1: Ngôn ngữ & Toán học cốt lõi (Maths & Python)",
        description: "Nền móng quan trọng bậc nhất giúp bạn thấu hiểu bản chất toán học của học máy thay vì chỉ gọi thư viện vẹt.",
        milestones: [
          {
            id: "m-ai-1",
            title: "Toán học cho Machine Learning & Python cơ bản",
            duration: "5 - 6 Tuần",
            description: "Nạp cứng kiến thức Đại số tuyến tính, Xác suất thống kê, và kỹ nghệ lập trình Python nâng cao.",
            checklist: ["Củng cố Vectors, Ma trận, Các phép toán nhân ma trận", "Thấu hiểu Đạo hàm, Gradient Descent giúp mô hình tự tối ưu hóa", "Nắm vững lý thuyết Xác suất học, Kỳ vọng, Phân phối Gaussian", "Sử dụng thông thạo cú pháp Python, cấu trúc dữ liệu cơ bản List, Dict"],
            resources: [
              { title: "Khan Academy - Đại số tuyến tính & Xác suất thống kê", type: "Docs", link: "https://www.khanacademy.org" },
              { title: "Mathematics for Machine Learning - Sách chuẩn miễn phí", type: "Docs", link: "https://mml-book.github.io/" }
            ]
          }
        ]
      },
      {
        id: "ai-p2",
        title: "Phase 2: Xử lý dữ liệu & Học máy Cổ điển (Data Prep & Classical ML)",
        description: "Học cách thu thập dữ liệu thô, lọc nhiễu, trực quan biểu đồ hóa và đưa vào các thuật toán học có giám sát truyền thống.",
        milestones: [
          {
            id: "m-ai-2",
            title: "Thao tác dữ liệu (Pandas, Numpy) & Thư viện Scikit-Learn",
            duration: "5 Tuần",
            description: "Thành thạo nghệ thuật khai phá tri thức từ Big Data với các mô hình kinh điển như Hồi Quy Tuyến Tính, Cây Quyết Định.",
            checklist: ["Tiền xử lý dữ liệu khuyết thiếu, chuẩn hóa dữ liệu với Pandas", "Trực quan hóa dữ liệu với Matplotlib và Seaborn", "Làm chủ thuật toán Học có giám sát: Regression, Decision Trees, SVM", "Học kĩ thuật Học không giám sát: Phân cụm K-Means, Giảm chiều dữ liệu PCA"],
            resources: [
              { title: "Sổ tay Machine Learning cơ bản tại Kaggle Learn", type: "Docs", link: "https://www.kaggle.com/learn" },
              { title: "Project: Dự báo Giá Nhà đất dựa vào thông số vị trí địa lý", type: "Project", link: "#" }
            ]
          }
        ]
      },
      {
        id: "ai-p3",
        title: "Phase 3: Học sâu & Thị giác máy tính / NLP (Deep Learning)",
        description: "Huấn luyện các kiến trúc phức tạp bắt chước cách hoạt động của não bộ người nhằm xử lý văn bản, âm thanh và hình ảnh thực tế.",
        milestones: [
          {
            id: "m-ai-3",
            title: "Mạng nơ-ron nhân tạo & PyTorch Framework",
            duration: "6 - 7 Tuần",
            description: "Thiết kế các mô hình CNN cho phân loại ảnh, RNN/Transformer cho dịch ngôn ngữ tự động.",
            checklist: ["Nắm cốt lõi kiến trúc Multilayer Perceptron (MLP) hoạt động", "Xây dựng các lớp Convolutional Neural Networks (CNN) nhận dạng vật thể", "Thấu hiểu lớp học tự chú ý (Self-Attention) trong mạng Transformer", "Sử dụng bộ thư viện PyTorch huấn luyện mô hình thực tế mượt mà"],
            resources: [
              { title: "Deep Learning Specialization bởi giáo sư Andrew Ng tại Coursera", type: "Video", link: "https://www.coursera.org/specializations/deep-learning" }
            ]
          }
        ]
      },
      {
        id: "ai-p4",
        title: "Phase 4: Thế giới LLM hiện đại & Kỹ nghệ RAG (AI Engineering)",
        description: "Bắt kịp làn sóng AI mới nhất bằng cách tích hợp mô hình ngôn ngữ lớn (LLM), xây dựng các Agent tự động hóa thông minh.",
        milestones: [
          {
            id: "m-ai-4",
            title: "Generative AI, Prompt Engineering & RAG Systems",
            duration: "4 - 5 Tuần",
            description: "Phát triển ứng dụng hỏi đáp dựa trên tri thức riêng của doanh nghiệp sử dụng cơ sở dữ liệu Vector và các API LLM hiện đại.",
            checklist: ["Thành thạo kỹ nghệ thiết kế Prompt (Prompt Engineering) chất lượng cao", "Xây dựng hệ thống RAG (Retrieval-Augmented Generation) kết nối PDF riêng tư", "Sử dụng Vector Database như Pinecone hoặc ChromaDB để lưu trữ vector đặc trưng", "Tìm hiểu quy trình tinh chỉnh Fine-tuning LLM cơ bản"],
            resources: [
              { title: "DeepLearning.AI - Các khóa học ngắn hạn Generative AI cực hay", type: "Docs", link: "https://www.deeplearning.ai/" },
              { title: "Project: Xây dựng Chatbot hỏi đáp Quy chế Trường học thông minh (Next.js + LLM API)", type: "Project", link: "#" }
            ]
          }
        ]
      }
    ]
  },
  embedded: {
    id: "embedded",
    title: "Kỹ sư Hệ thống Nhúng & IoT (Embedded Systems Engineer)",
    subTitle: "Thắp sáng trí tuệ cho các thiết bị phần cứng vật lý",
    description: "Nhà phát triển hệ nhúng thổi hồn vào vi điều khiển, chip xử lý tích hợp để điều phối, điều khiển các thiết bị thông minh đời thực như oto tự lái, robot tự hành hay các thiết bị gia dụng IoT.",
    colorTheme: "from-amber-500 to-orange-600",
    accentColor: "amber",
    starsRate: 5,
    averageSalary: "14 - 38 Triệu VND / Tháng",
    outlook: "Gia tăng thần tốc cùng kỷ nguyên xe điện và cách mạng chip bán dẫn",
    technologies: ["C", "C++", "STM32", "ESP32", "Arduino", "RTOS", "I2C", "SPI", "Electronics"],
    phases: [
      {
        id: "emb-p1",
        title: "Phase 1: Ngôn ngữ cốt lõi & Điện tử căn bản (Hardware basics)",
        description: "Làm bạn với các kiến thức phần cứng vật lý, cách đọc giá trị điện thế và điều phối thông mạch cơ bản.",
        milestones: [
          {
            id: "m-emb-1",
            title: "Ngôn ngữ C chuyên sâu hệ nhúng & Điện tử cơ bản",
            duration: "5 Tuần",
            description: "Nắm giữ con trỏ máy tính ở mức nguyên thủy nhất, cơ chế bộ nhớ Stack và Heap, và các mạch lọc thông dụng.",
            checklist: ["Làm chủ kỹ nghệ thao tác bit (Bitwise manipulation)", "Hiểu sâu con trỏ (Pointer), kiến trúc bộ nhớ động", "Học cách đọc sơ đồ nguyên lý mạch điện (Schematic diagrams)", "Thực hành đo đạc giá trị phần cứng bằng đồng hồ đo vạn năng VOM"],
            resources: [
              { title: "Embedded C Programming Course - Chuyên sâu tối ưu bộ nhớ", type: "Docs", link: "https://www.udemy.com/" }
            ]
          }
        ]
      },
      {
        id: "emb-p2",
        title: "Phase 2: Vi điều khiển & Chuẩn giao tiếp (MCU Mastering)",
        description: "Học cách trực tiếp ghi đè xung nhịp điều phối và cấu hình chức năng các ngoại vi thông dụng.",
        milestones: [
          {
            id: "m-emb-2",
            title: "Thực hành dòng chip phổ cập: STM32 hoặc ESP32",
            duration: "6 Tuần",
            description: "Lập trình can thiệp ngoại vi GPIO, bộ ngắt Interrupt định kỳ, điều chế độ rộng xung PWM kiểm soát tốc độ motor vật lý.",
            checklist: ["Cấu hình và điều khiển GPIO căn bản", "Nắm vững cách hoạt động của Bộ ngắt (Interrupts) và Bộ định thời (Timers)", "Thực hành cấu hình chuyển đổi tín hiệu analog sang digital (ADC)", "Bắt nhịp kỹ nghệ giao tiếp I2C, SPI, UART kết nối cảm biến đo đạc kỹ thuật số"],
            resources: [
              { title: "Project: Thiết kế Trạm Đo Chất lượng Không khí thông minh hiển thị màn LCD", type: "Project", link: "#" }
            ]
          }
        ]
      },
      {
        id: "emb-p3",
        title: "Phase 3: Hệ điều hành thời gian thực (Real-time OS)",
        description: "Lập trình tối ưu đa nhiệm phức tạp cho các thiết bị điều khiển đòi hỏi phản hồi chính xác tính bằng mili-giây như phanh xe hay thiết bị y tế.",
        milestones: [
          {
            id: "m-emb-3",
            title: "Vận hành FreeRTOS nâng cao",
            duration: "4 - 5 Tuần",
            description: "Thấu hiểu về lập lịch tác vụ Task Scheduling, quản lý tài nguyên tránh các hiện tượng tranh giành xung đột khốc liệt.",
            checklist: ["Khởi tạo và phân thứ tự ưu tiên các tác vụ (Tasks Creation)", "Đồng bộ hóa luồng tác vụ sử dụng Semaphore và Mutex", "Truyền dữ liệu nhịp nhàng thông qua hàng đợi Task Queue", "Phân tích và gỡ lỗi deadlock, tràn bộ nhớ Heap vi xử lý"],
            resources: [
              { title: "FreeRTOS Official Documentation - Đầy đủ chi tiết nhất", type: "Docs", link: "https://www.freertos.org/" }
            ]
          }
        ]
      },
      {
        id: "emb-p4",
        title: "Phase 4: Ứng dụng tích hợp IoT & Embedded AI ( TinyML )",
        description: "Đưa trí tuệ nhân tạo nhúng chạy trực tiếp trên các dòng chip siêu nhỏ công suất thấp phục vụ công nghệ tương lai.",
        milestones: [
          {
            id: "m-emb-4",
            title: "Wifi/BLE IoT & TinyML học máy nhúng",
            duration: "4 Tuần",
            description: "Nhúng sâu các chuẩn không dây như MQTT gửi dữ liệu lên cloud, huấn luyện nạp các mô hình AI siêu thu nhỏ.",
            checklist: ["Kết nối mạng điều hướng điều khiển thiết bị thông qua Giao thức MQTT", "Xây dựng web dashboard điều khiển thiết bị thông qua ESP32 Web Server", "Nhúng mô hình mạng nơ-ron học máy tối giản chuyển từ Scikit-learn sang C mã nguồn", "Triển khai nhận dạng cử chỉ bằng gia tốc kế tích hợp mượt mà"],
            resources: [
              { title: "TinyML course bởi Đại học Harvard (Học miễn phí trên EdX)", type: "Docs", link: "https://www.edx.org" }
            ]
          }
        ]
      }
    ]
  },
  cyber: {
    id: "cyber",
    title: "Chuyên gia An ninh mạng (Cybersecurity Specialist)",
    subTitle: "Lá chắn thép bảo an không gian số quốc gia",
    description: "Nhà hành nghề bảo mật đóng vai trò thám tử an ninh thiết lập bức tường phòng ngự, phân tích và ngăn ngừa mọi nỗ lực khai thác thâm nhập nguy hiểm của tin tặc toàn cầu.",
    colorTheme: "from-rose-500 to-red-650",
    accentColor: "rose",
    starsRate: 5,
    averageSalary: "18 - 50 Triệu VND / Tháng",
    outlook: "Bảo an là tối thượng, khan hiếm trầm trọng nhân tài chất lượng cao",
    technologies: ["Linux", "Wireshark", "Nmap", "Metasploit", "Burp Suite", "OWASP v10", "Network Security", "Cryptography"],
    phases: [
      {
        id: "cyb-p1",
        title: "Phase 1: Gốc rễ Mạng & Hệ điều hành (Network & OS Core)",
        description: "Điểm khởi đầu bắt buộc để thấu hiểu cách thức từng bit dữ liệu di chuyển và các đặc quyền tối cao của OS.",
        milestones: [
          {
            id: "m-cyb-1",
            title: "Mạng máy tính chuyên sâu & Quản trị Hệ điều hành Linux",
            duration: "5 Tuần",
            description: "Nắm trọn mô hình 7 tầng mạng OSI, giao thức TCP/IP cấu thành mạng internet thế giới, cùng hệ lệnh Linux.",
            checklist: ["Thấu hiểu sâu sắc cấu trúc IPv4/IPv6, cơ chế định tuyến Routing & Subnetting", "Nắm cơ chế phân phối gói tin TCP, UDP, DNS, HTTP, SSL/TLS", "Sử dụng dòng lệnh shell Linux thành thạo, cấu hình đặc quyền sudo root", "Cơ bản về mã hóa số: Đối xứng (AES), không đối xứng (RSA) và Băm (SHA256)"],
            resources: [
              { title: "Computer Networking Course bởi Giáo sư Kurose - Youtube", type: "Video", link: "https://www.youtube.com" }
            ]
          }
        ]
      },
      {
        id: "emb-p2",
        title: "Phase 2: Thử nghiệm Thâm nhập Web (Web Testing & OWASP)",
        description: "Học cách suy nghĩ và hành động của hacker mũ đen nhằm tấn công tìm ra điểm yếu thiết kế website.",
        milestones: [
          {
            id: "m-cyb-2",
            title: "Tấn công thử nghiệm lỗ hổng web: OWASP Top 10",
            duration: "5 - 6 Tuần",
            description: "Thực hành phát hiện và bẻ gãy các rào cản thông dụng thông qua SQL Injection, XSS, lỗi xác thực logic.",
            checklist: ["Thực hành gác chặn truy quét gói tin bằng công cụ Burp Suite proxy", "Khai thác trực tiếp lỗi bảo mật cơ bản: SQL Injection (SQLi)", "Thực hành chèn mã script nguy hại phía client (Cross-Site Scripting - XSS)", "Tối ưu hóa các chính sách phòng thủ CORS, vá bảo mật mã nguồn phía máy chủ"],
            resources: [
              { title: "PortSwigger Web Security Academy - Trường dạy học cực đỉnh", type: "Docs", link: "https://portswigger.net/web-security" },
              { title: "TryHackMe - Các phòng lab rèn luyện bảo mật thực hành", type: "Docs", link: "https://tryhackme.com/" }
            ]
          }
        ]
      },
      {
        id: "cyb-p3",
        title: "Phase 3: Giám sát Phản ứng Sự cố (Defense / Blue Team)",
        description: "Thiết lập hệ thống giám sát thời gian thực phát hiện mưu đồ xâm nhập nguy hiểm.",
        milestones: [
          {
            id: "m-cyb-3",
            title: "Vận hành SOC, SIEM & Phát hiện mã độc",
            duration: "5 Tuần",
            description: "Học cách điều phối phân tích đăng nhập log hệ điều hành, vận hành luật lọc tường lửa chủ động chặn đòn tấn công.",
            checklist: ["Học cách sử dụng công cụ rà quét cổng mạng Nmap chuyên nghiệp", "Cấu hình hệ thống tìm kiếm quản lý Log tập trung (SIEM, Splunk)", "Tích hợp và tự viết luật Snort IPS/IDS phát hiện xâm nhập trái phép", "Phân tích và đọc vị mã độc của virus máy tính trong môi trường cách ly Sandbox"],
            resources: [
              { title: "CompTIA Security+ Blueprint - Giáo trình căn bản hữu ích", type: "Docs", link: "https://www.comptia.org" }
            ]
          }
        ]
      },
      {
        id: "cyb-p4",
        title: "Phase 4: Thực chiến Chứng chỉ & Săn tìm Lỗ hổng (Professional)",
        description: "Tham dự các cuộc thi hack an toàn, nỗ lực lấy các chứng chỉ danh giá để bước chân vào các tổ chức bảo mật.",
        milestones: [
          {
            id: "m-cyb-4",
            title: "Luyện tập Capture The Flag (CTF) & Săn Bug Bounty",
            duration: "4 Tuần",
            description: "Nâng cao toàn bộ giác quan lập trình, giải quyết các mê cung an ninh để tìm về chiếc cờ chiến thắng.",
            checklist: ["Tham gia thực chiến CTF trên CTFtime hoặc giải mật mật mã hữu cơ", "Tìm hiểu quy chế của các chương trình săn lỗi nhận tiền thưởng Bug Bounty (HackerOne)", "Bắt nhịp rèn luyện lấy chứng chỉ lập nghiệp uy tín quốc tế: CEH hoặc OSCP", "Tuân thủ chặt chẽ nguyên lý Đạo đức Hackers (Ethical Hacking Guide)"],
            resources: [
              { title: "Hack The Box - Phòng tập thăng hạng cho Hacker Mũ Trắng", type: "Docs", link: "https://www.hackthebox.com/" },
              { title: "Project: Dựng hệ thống Active Directory ảo lập mô hình tấn công & phòng thủ", type: "Project", link: "#" }
            ]
          }
        ]
      }
    ]
  }
};
