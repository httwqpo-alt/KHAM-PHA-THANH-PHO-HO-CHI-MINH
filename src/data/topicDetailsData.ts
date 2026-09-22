export interface TopicDetailLesson {
  id: string;
  modules: {
    title: string;
    subtitle: string;
    content: string[];
    highlight?: string;
  }[];
  fieldTripGuide: {
    name: string;
    address: string;
    significance: string;
    studentTasks: string[];
    tips: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  reflectionPrompt: string;
}

export const TOPIC_LESSON_DETAILS: Record<string, TopicDetailLesson> = {
  // KHỐI 10
  "topic-10-01": {
    id: "topic-10-01",
    modules: [
      {
        title: "1. Hiện trạng ngập úng đô thị và triều cường tại TP.HCM",
        subtitle: "Đặc điểm địa hình trũng thấp và tác động của biến đổi khí hậu",
        content: [
          "TP.HCM nằm ở hạ lưu lưu vực sông Đồng Nai - Sài Gòn, có hơn 60% diện tích nằm dưới cao độ +1.5m so với mực nước biển, chịu ảnh hưởng trực tiếp của chế độ bán nhật triều biển Đông.",
          "Biến đổi khí hậu làm gia tăng tần suất các trận mưa cực đoan (lượng mưa trên 100mm trong 1 giờ) kết hợp triều cường đạt đỉnh trên +1.7m, gây ngập nặng tại các quận ven sông và khu vực trũng như Nhà Bè, Quận 7, Quận 8, Bình Thạnh.",
          "Hiện tượng xâm nhập mặn sâu vào các sông Sài Gòn, sông Đồng Nai vào mùa khô đe dọa an ninh nguồn nước sinh hoạt của hơn 10 triệu dân thành phố."
        ],
        highlight: "Quy hoạch chống ngập TP.HCM hướng tới mô hình đô thị bọt biển (Sponge City) và công trình kiểm soát triều đa mục tiêu."
      },
      {
        title: "2. Giải pháp công trình và phi công trình thích ứng",
        subtitle: "Hệ thống cống ngăn triều và hành động của cộng đồng",
        content: [
          "Dự án giải quyết ngập do triều khu vực TP.HCM gồm 6 cống ngăn triều lớn (Bến Nghé, Tân Thuận, Phú Xuân, Mương Chuối, Cây Khô, Phú Định) và tuyến đê kè dài gần 8km.",
          "Giải pháp phi công trình: Phục hồi và bảo vệ rừng ngập mặn Cần Giờ ('lá phổi xanh' và tấm chắn sóng bão tự nhiên); tăng cường diện tích thấm nước bề mặt trong công viên, trường học.",
          "Học sinh và công dân trẻ tham gia tích cực: Không xả rác vào cống thoát nước, tham gia phong trào 'Thành phố không rác thải nhựa', cài đặt ứng dụng cảnh báo ngập nước UDI Maps."
        ]
      }
    ],
    fieldTripGuide: {
      name: "Công trình Cống ngăn triều Bến Nghé & Trạm Khí tượng Thủy văn Nam Bộ",
      address: "Đoạn hợp lưu rạch Bến Nghé và sông Sài Gòn (Quận 1 - Quận 4)",
      significance: "Công trình ngăn triều hiện đại bảo vệ trung tâm kinh tế - văn hóa TP.HCM khỏi triều cường kết hợp nước dâng do bão.",
      studentTasks: [
        "Quan sát cơ chế đóng/mở van van ngăn triều và trạm bơm tiêu thoát nước.",
        "Ghi chép số liệu mực nước đỉnh triều so với mốc cốt chuẩn quốc gia Hòn Dấu.",
        "Chụp ảnh ghi nhận tình trạng rác thải trôi dạt tại cửa cống và đề xuất giải pháp."
      ],
      tips: "Mang sổ tay ghi chép, giày đế bám chắc và tuân thủ tuyệt đối chỉ dẫn an toàn hành lang bảo vệ công trình đường thủy."
    },
    quiz: [
      {
        question: "Đặc điểm tự nhiên nào khiến TP.HCM dễ bị ảnh hưởng bởi triều cường và ngập nước?",
        options: [
          "Địa hình vùng cao nguyên và dốc",
          "Hơn 60% diện tích có cao độ dưới +1.5m, chịu bán nhật triều biển Đông",
          "Khí hậu lạnh quanh năm với băng tuyết tan",
          "Thành phố không có mạng lưới kênh rạch tự nhiên"
        ],
        correctIndex: 1,
        explanation: "Hơn 60% diện tích TP.HCM nằm ở cao độ dưới +1.5m, chịu ảnh hưởng mạnh của bán nhật triều không đều từ Biển Đông."
      },
      {
        question: "Công trình nào sau đây đóng vai trò là 'tấm chắn xanh' tự nhiên giảm nhẹ thiên tai cho TP.HCM?",
        options: [
          "Hầm Thủ Thiêm",
          "Rừng ngập mặn Cần Giờ (Khu Dự trữ sinh quyển thế giới)",
          "Công viên Đầm Sen",
          "Cầu Ba Son"
        ],
        correctIndex: 1,
        explanation: "Khu dự trữ sinh quyển rừng ngập mặn Cần Giờ có vai trò lọc nước, chắn sóng bão, điều hòa vi khí hậu cho toàn TP.HCM."
      },
      {
        question: "Hành động thiết thực nhất của học sinh THPT để hạn chế ngập nước đô thị là gì?",
        options: [
          "Tự ý tháo dỡ nắp cống thoát nước",
          "Không xả rác xuống lòng đường, miệng cống và tích cực trồng cây xanh",
          "Xây đê bao quanh trường học",
          "Chỉ đi học khi trời không mưa"
        ],
        correctIndex: 1,
        explanation: "Ý thức giữ gìn vệ sinh, không vứt rác làm tắc nghẽn hệ thống cống rãnh là đóng góp trực tiếp và thiết thực nhất của mỗi học sinh."
      }
    ],
    reflectionPrompt: "Theo em, học sinh trường THPT của em có thể triển khai dự án nhỏ nào để giảm thiểu rác thải nhựa và tăng mảng xanh thích ứng với biến đổi khí hậu tại khuôn viên trường?"
  },

  "topic-10-02": {
    id: "topic-10-02",
    modules: [
      {
        title: "1. Ý nghĩa đạo lí 'Uống nước nhớ nguồn' ở đất Nam Bộ",
        subtitle: "Truyền thống tri ân tiền nhân khai phá và bảo vệ bờ cõi",
        content: [
          "Vùng đất Gia Định - Sài Gòn hình thành hơn 320 năm qua nhờ công lao mở cõi bền bỉ của lớp lớp lưu dân tứ xứ và chính sách chiêu mộ khẩn hoang của các bậc tiền hiền triều Nguyễn.",
          "Đạo lí 'Uống nước nhớ nguồn' được thể chế hóa và tâm linh hóa qua việc thờ cúng Thành hoàng Bổn Cảnh, các anh hùng dân tộc và bậc Tiền hiền, Hậu hiền tại mỗi thôn xóm, làng đình.",
          "Nếp sống hiếu nghĩa, trọng tình, thảo thơm đã trở thành căn tính tinh thần sâu sắc của cư dân TP.HCM qua mọi thời kỳ."
        ]
      },
      {
        title: "2. Lễ Kỳ Yên tại các đình làng TP.HCM",
        subtitle: "Không gian sinh hoạt văn hóa dân gian và cố kết cộng đồng",
        content: [
          "Lễ Kỳ Yên (cầu an) là nghi lễ dân gian quan trọng nhất trong năm tại các ngôi đình cổ TP.HCM (như Đình Thông Tây Hội, Đình Bình Hòa, Đình Phong Phú).",
          "Tiến trình lễ gồm: Lễ rước sắc thần, Túc yết, Đàn cả, Tiền hiền - Hậu hiền, phát lộc và hát tuồng bội cúng Thần.",
          "Lễ hội quy tụ các thế hệ cư dân về tề tựu, bày tỏ lòng biết ơn các bậc tiền nhân có công khai phá vùng đất và cầu mong mưa thuận gió hòa, quốc thái dân an."
        ]
      }
    ],
    fieldTripGuide: {
      name: "Đình Thông Tây Hội (Gò Vấp) & Khu tưởng niệm các Vua Hùng",
      address: "Đường Thống Nhất, Phường 11, Quận Gò Vấp, TP.HCM",
      significance: "Ngôi đình cổ nhất vùng đất Gia Định xưa (xây dựng khoảng năm 1679), bảo tồn kiến trúc gỗ truyền thống và nghi thức cúng tế cổ truyền.",
      studentTasks: [
        "Khảo sát cấu trúc tam quan, chính điện, nhà tiền tế và võ ca của ngôi đình.",
        "Phỏng vấn Ban Quản lý đình về nguồn gốc các vị thần được phụng thờ và lễ Kỳ Yên.",
        "Ghi chép cảm nghĩ về việc thế hệ trẻ gìn giữ di sản đình làng giữa lòng đô thị hiện đại."
      ],
      tips: "Trang phục trang nghiêm, lịch sự khi vào chốn linh thiêng; xin phép trước khi chụp ảnh di vật, đồ tế tự."
    },
    quiz: [
      {
        question: "Lễ hội dân gian lớn nhất trong năm tại các đình làng Nam Bộ nhằm cầu bình an, mưa thuận gió hòa là gì?",
        options: ["Lễ Kỳ Yên", "Lễ Tịch Điền", "Lễ Thất Tịch", "Lễ Đua Thuyền"],
        correctIndex: 0,
        explanation: "Lễ Kỳ Yên là lễ cúng Thần Thành hoàng và tri ân tiền nhân lớn nhất trong năm tại các ngôi đình Nam Bộ."
      },
      {
        question: "Đình Thông Tây Hội ở TP.HCM nổi tiếng với đặc điểm lịch sử nào?",
        options: [
          "Là ngôi chùa phật giáo đầu tiên",
          "Là ngôi đình cổ nhất đất Gia Định còn lưu giữ nguyên vẹn kiến trúc truyền thống",
          "Là công trình kiến trúc phong cách Gothic",
          "Được xây dựng vào thế kỷ 21"
        ],
        correctIndex: 1,
        explanation: "Đình Thông Tây Hội (Gò Vấp) có lịch sử từ cuối thế kỷ 17, là di tích kiến trúc nghệ thuật cấp quốc gia cổ bậc nhất vùng đất Sài Gòn - Gia Định."
      }
    ],
    reflectionPrompt: "Em hãy viết một đoạn văn ngắn (150-200 từ) về cảm nhận của bản thân trước tấm lòng tri ân tiền hiền khai hoang mở cõi của cư dân TP.HCM qua lễ hội đình làng."
  },

  "topic-10-03": {
    id: "topic-10-03",
    modules: [
      {
        title: "1. Diện mạo di sản văn hóa phong phú của TP.HCM",
        subtitle: "Hệ thống gần 200 di tích lịch sử - văn hóa và kiến trúc nghệ thuật",
        content: [
          "TP.HCM hiện có gần 200 di tích được xếp hạng (gồm di tích quốc gia đặc biệt, di tích quốc gia và cấp thành phố) cùng hàng chục bảo tàng chuyên đề phong phú.",
          "Di sản kiến trúc kết tinh qua các thời kỳ: di tích khảo cổ Giồng Cá Vồ (Cần Giờ), di tích Nam Bộ cổ truyền (Chùa Giác Lâm), di tích Pháp - Đông Dương (Nhà thờ Đức Bà, Bưu điện, Dinh Độc Lập) và hội quán người Hoa (Chợ Lớn).",
          "Di sản phi vật thể đặc sắc: Nghệ thuật Đờn ca tài tử Nam Bộ (UNESCO), Lễ hội Nghinh Ông Cần Giờ, nghệ thuật Lân Sư Rồng."
        ]
      },
      {
        title: "2. Chuyển đổi số và bảo tồn di sản bền vững",
        subtitle: "Học sinh thành phố với công nghệ số hóa di sản",
        content: [
          "Ứng dụng công nghệ quét 3D, thực tế ảo VR360, mã QR thuyết minh đa ngôn ngữ giúp đưa di sản đến gần hơn với du khách quốc tế và giới trẻ.",
          "Bảo tồn gắn liền với phát huy giá trị: biến di sản thành không gian giáo dục lịch sử sống động, điểm đến du lịch văn hóa bền vững.",
          "Trách nhiệm thanh niên: không xâm hại di tích, chủ động sáng tạo nội dung số (podcast, video ngắn) lan tỏa nét đẹp di sản thành phố."
        ]
      }
    ],
    fieldTripGuide: {
      name: "Bảo tàng Lịch sử TP.HCM & Di tích Trụ sở HĐND - UBND Thành phố",
      address: "Số 2 Nguyễn Bỉnh Khiêm, Quận 1, TP.HCM",
      significance: "Bảo tàng đầu tiên ở Nam Kỳ với kiến trúc Đông Dương tuyệt mỹ, nơi lưu giữ hơn 40.000 hiện vật lịch sử văn hóa vô giá.",
      studentTasks: [
        "Tìm hiểu phòng trưng bày Văn hóa Óc Eo và thời kỳ khai hoang lập ấp Gia Định.",
        "Trải nghiệm quét mã QR tìm hiểu thông tin cổ vật.",
        "Thiết kế 1 infographic hoặc poster giới thiệu về 1 hiện vật tiêu biểu em yêu thích nhất."
      ],
      tips: "Mang tai nghe để trải nghiệm audio guide nếu có; không chạm tay vào tủ kính và hiện vật trưng bày."
    },
    quiz: [
      {
        question: "Di sản nào của Nam Bộ gắn liền với TP.HCM đã được UNESCO ghi danh là Di sản văn hóa phi vật thể đại diện của nhân loại?",
        options: [
          "Dân ca Quan họ",
          "Nghệ thuật Đờn ca tài tử Nam Bộ",
          "Hát Xoan Phú Thọ",
          "Ca trù"
        ],
        correctIndex: 1,
        explanation: "Nghệ thuật Đờn ca tài tử Nam Bộ được UNESCO chính thức ghi danh vào năm 2013."
      },
      {
        question: "Giải pháp công nghệ nào đang được TP.HCM đẩy mạnh để bảo tồn và quảng bá di sản văn hóa?",
        options: [
          "Thay thế hoàn toàn di tích bằng công trình bê tông mới",
          "Số hóa 3D, bảo tàng ảo và mã QR thuyết minh đa ngữ",
          "Đóng cửa di tích không cho du khách tham quan",
          "Dỡ bỏ các biển thuyết minh lịch sử"
        ],
        correctIndex: 1,
        explanation: "Số hóa dữ liệu di tích bằng 3D/VR và mã QR giúp bảo tồn dữ liệu gốc và tạo điều kiện cho công chúng tiếp cận di sản thuận tiện."
      }
    ],
    reflectionPrompt: "Nếu được phân công làm đại sứ di sản trường học, em sẽ chọn di tích nào ở TP.HCM để làm clip ngắn giới thiệu cho bạn bè quốc tế? Nêu lý do vì sao."
  },

  // KHỐI 11 - TOPIC 03 TO 08
  "topic-11-03": {
    id: "topic-11-03",
    modules: [
      {
        title: "1. Bậc tiền hiền khai hoang mở cõi Gia Định",
        subtitle: "Dấu ấn Lễ Thành Hầu Nguyễn Hữu Cảnh và các danh tướng mở cõi",
        content: [
          "Năm Mậu Dần (1698), Thống suất Lễ Thành Hầu Nguyễn Hữu Cảnh vâng lệnh chúa Nguyễn Phúc Chu vào kinh lược đất phương Nam, chính thức thiết lập đơn vị hành chính đầu tiên: Phủ Gia Định với hai huyện Phước Long và Tân Bình.",
          "Chính sách chiêu dân lập ấp, định rõ cương giới, thu thuế công minh đã đặt nền móng vững chắc cho sự hưng thịnh của Sài Gòn - TP.HCM ngày nay.",
          "Công đức mở mang bờ cõi của ông được nhân dân đời đời ghi nhớ, lập đền thờ tại nhiều nơi ở TP.HCM, Đồng Nai, An Giang."
        ]
      },
      {
        title: "2. Các chí sĩ yêu nước và danh nhân văn hóa Sài Gòn",
        subtitle: "Từ học giả Trương Vĩnh Ký đến nhà chí sĩ Nguyễn An Ninh",
        content: [
          "Petrus Trương Vĩnh Ký (1837 - 1898): Nhà bác học, nhà ngôn ngữ học uyên bác thông thạo hơn 20 thứ tiếng, Tổng biên tập người Việt đầu tiên của tờ Gia Định Báo, có công lớn phổ biến chữ Quốc ngữ.",
          "Nguyễn An Ninh (1900 - 1943): Nhà trí thức yêu nước lỗi lạc, nhà báo kiên trung với tờ 'La Cloche Fêlée' (Chuông rè), linh hồn của các phong trào đấu tranh đòi tự do dân chủ của thanh niên Sài Gòn đầu thế kỷ 20.",
          "Các danh nhân văn hóa, lịch sử đã tạo dựng bản lĩnh can trường, tinh thần khai phóng và nghĩa khí của người dân đất phương Nam."
        ]
      }
    ],
    fieldTripGuide: {
      name: "Đền thờ Nguyễn Hữu Cảnh & Khu Tưởng niệm Các Vua Hùng (TP. Thủ Đức)",
      address: "Công viên Lịch sử - Văn hóa Dân tộc, TP. Thủ Đức, TP.HCM",
      significance: "Nơi tôn vinh vị Thống suất có công định danh đơn vị hành chính Sài Gòn - Gia Định năm 1698.",
      studentTasks: [
        "Đọc bia ký ghi lại hành trình kinh lược đất Nam năm 1698 của Nguyễn Hữu Cảnh.",
        "Khảo sát các hiện vật, văn bản lịch sử liên quan đến sự hình thành Phủ Gia Định.",
        "Viết thu hoạch về bài học tinh thần trách nhiệm và lòng yêu nước từ tấm gương tiền nhân."
      ],
      tips: "Chuẩn bị sổ tay và bút viết; giữ trật tự trang nghiêm trong khu vực dâng hương tưởng niệm."
    },
    quiz: [
      {
        question: "Năm 1698, vị danh tướng nào được chúa Nguyễn cử vào kinh lược đất phương Nam, chính thức lập nên Phủ Gia Định?",
        options: [
          "Nguyễn Tri Phương",
          "Lễ Thành Hầu Nguyễn Hữu Cảnh",
          "Võ Tánh",
          "Trần Thượng Xuyên"
        ],
        correctIndex: 1,
        explanation: "Năm 1698, Thống suất Nguyễn Hữu Cảnh vâng mệnh chúa Nguyễn Phúc Chu vào kinh lược, xác lập chủ quyền và lập ra Phủ Gia Định."
      },
      {
        question: "Nhà báo, chí sĩ yêu nước nổi tiếng Sài Gòn đầu thế kỷ 20 sáng lập tờ báo tiếng Pháp 'La Cloche Fêlée' là ai?",
        options: [
          "Nguyễn An Ninh",
          "Phan Châu Trinh",
          "Trần Chánh Chiếu",
          "Lê Văn Duyệt"
        ],
        correctIndex: 0,
        explanation: "Nguyễn An Ninh là nhà cách mạng trí thức xuất sắc của Sài Gòn, người sáng lập và chỉ đạo tờ báo 'La Cloche Fêlée'."
      }
    ],
    reflectionPrompt: "Từ cuộc đời và sự nghiệp của các danh nhân lịch sử TP.HCM, em rút ra bài học gì về lý tưởng sống và trách nhiệm của thế hệ trẻ học sinh đối với thành phố quê hương?"
  },

  "topic-11-04": {
    id: "topic-11-04",
    modules: [
      {
        title: "1. Sức sống của nghệ thuật âm nhạc cổ truyền",
        subtitle: "Đờn ca tài tử và Sân khấu Cải lương giữa đô thị sôi động",
        content: [
          "TP.HCM là trung tâm thực hành và lan tỏa mạnh mẽ của Đờn ca tài tử Nam Bộ - loại hình nghệ thuật thính phòng dân gian với 20 bài bản tổ và tiếng đòn kìm, đờn tranh réo rắt.",
          "Cải lương Sài Gòn từng có thời kỳ hoàng kim rực rỡ với các gánh hát lừng danh (Thanh Minh Thanh Nga, Dạ Lý Hương) và các nghệ sĩ huyền thoại (NSND Năm Châu, NSND Phùng Há, Soạn giả Viễn Châu).",
          "Ngày nay, các mô hình 'Sân khấu học đường' và đêm nhạc tài tử ven sông đang đưa âm nhạc truyền thống tiếp cận tự nhiên với giới trẻ thành phố."
        ]
      },
      {
        title: "2. Âm nhạc hiện đại và trào lưu sáng tạo trẻ",
        subtitle: "Giao thoa giữa dân gian và hiện đại trên các sân khấu công cộng",
        content: [
          "TP.HCM là chiếc nôi của nền công nghiệp âm nhạc hiện đại Việt Nam, nơi khởi phát các xu hướng pop, hip-hop, Indie và EDM kết hợp chất liệu âm nhạc dân tộc.",
          "Các lễ hội âm nhạc quốc tế (như HOZO Music Festival) và không gian âm nhạc cộng đồng tại phố đi bộ Nguyễn Huệ, công viên Bến Bạch Đằng tạo nên bản sắc đô thị trẻ trung, sôi động và cởi mở."
        ]
      }
    ],
    fieldTripGuide: {
      name: "Nhà hát Thành phố & Sân khấu Âm nhạc Phố đi bộ Nguyễn Huệ",
      address: "Số 7 Công Trường Lam Sơn, Bến Nghé, Quận 1, TP.HCM",
      significance: "Kiến trúc nhà hát Tây phương cổ kính khánh thành năm 1900, trung tâm biểu diễn nghệ thuật hàn lâm và đương đại của thành phố.",
      studentTasks: [
        "Quan sát kiến trúc mặt đứng và các phù điêu trang trí âm nhạc của Nhà hát Thành phố.",
        "Thưởng thức 1 tiết mục biểu diễn hoặc xem triển lãm nhạc cụ dân tộc.",
        "Ghi nhận cảm xúc về nhịp sống âm nhạc đô thị giữa không gian phố đi bộ ban đêm."
      ],
      tips: "Tuân thủ quy định trang phục khi vào khán phòng nhà hát; không quay phim chụp ảnh trong lúc nghệ sĩ biểu diễn."
    },
    quiz: [
      {
        question: "Loại nhạc cụ nào được ví như 'linh hồn' trong dàn nhạc Đờn ca tài tử Nam Bộ?",
        options: ["Đàn Nguyệt (Đờn Kìm)", "Đàn Piano", "Kèn Saxophone", "Trống Cajon"],
        correctIndex: 0,
        explanation: "Đờn Kìm (Đàn Nguyệt) giữ vai trò lĩnh xướng, chỉ huy nhịp điệu và là linh hồn trong dàn nhạc tài tử Nam Bộ."
      },
      {
        question: "Lễ hội âm nhạc quốc tế thường niên quy mô lớn hàng đầu tại trung tâm TP.HCM mang tên là gì?",
        options: ["Hò Dô (HOZO)", "Coachella", "Monsoon", "Tomorrowland"],
        correctIndex: 0,
        explanation: "HOZO (Hò Dô) là Lễ hội Âm nhạc Quốc tế thường niên lớn bậc nhất do TP.HCM tổ chức, thu hút hàng chục vạn khán giả."
      }
    ],
    reflectionPrompt: "Theo em, làm thế nào để âm nhạc truyền thống (như Cải lương, Đờn ca tài tử) có thể thu hút và chinh phục được thị hiếu của các bạn học sinh thế hệ Gen Z tại TP.HCM?"
  },

  "topic-11-05": {
    id: "topic-11-05",
    modules: [
      {
        title: "1. Dấu ấn phong cách kiến trúc Pháp - Đông Dương",
        subtitle: "Sự kết hợp tinh tế giữa mỹ thuật châu Âu và khí hậu nhiệt đới",
        content: [
          "Kiến trúc Đông Dương (Indochine) hình thành tại Sài Gòn cuối thế kỷ 19 - đầu thế kỷ 20 với mái ngói dốc, hành lang rộng che mưa nắng, cửa sổ lá sách thông gió và họa tiết chạm trổ tinh xảo.",
          "Các công trình biểu tượng tiêu biểu: Bưu điện Trung tâm Sài Gòn (vòm sắt thanh thoát do Gustave Eiffel phác thảo), Trụ sở HĐND - UBND Thành phố (phong cách Phục hưng Pháp), Nhà thờ Tân Định (màu hồng độc đáo).",
          "Kiến trúc di sản là 'chứng nhân lịch sử' phản ánh ký ức đô thị và diện mạo hội nhập quốc tế sớm của Sài Gòn."
        ]
      },
      {
        title: "2. Kiến trúc Hội quán người Hoa và Biểu tượng Đô thị Hiện đại",
        subtitle: "Đa dạng phong cách từ Chợ Lớn cổ kính đến Landmark 81",
        content: [
          "Khu vực Chợ Lớn nổi bật với các hội quán người Hoa (Hội quán Nghĩa An, Tuệ Thành...) mang kiến trúc cung đình truyền thống: mái ngói âm dương gắn tượng gốm Cây Mai, giếng trời thiên tỉnh thoáng khí.",
          "Thời kỳ đương đại ghi dấu ấn với Dinh Độc Lập (kiến trúc sư Ngô Viết Thụ - giải Khôi nguyên La Mã), tòa tháp Bitexco (hình búp sen) và Landmark 81 (hình tượng bó tre vươn cao, top tòa nhà cao nhất Đông Nam Á)."
        ]
      }
    ],
    fieldTripGuide: {
      name: "Bưu điện Trung tâm TP.HCM & Dinh Độc Lập",
      address: "Số 2 Công xã Paris, Bến Nghé, Quận 1, TP.HCM",
      significance: "Hai công trình di tích kiến trúc nghệ thuật cấp quốc gia ghi dấu ấn hai giai đoạn kiến trúc vàng son của thành phố.",
      studentTasks: [
        "Phác thảo hoặc chụp ảnh chi tiết vòm trần và các bản đồ cổ bên trong Bưu điện Trung tâm.",
        "Phân tích triết lý phong thủy 'Cát tường - Hưng thịnh' trong mặt bằng kiến trúc Dinh Độc Lập.",
        "So sánh vật liệu và giải pháp thông gió tự nhiên giữa kiến trúc cổ và nhà kính hiện đại."
      ],
      tips: "Có thể mang sổ ký họa để vẽ phác nét kiến trúc; giữ trật tự khi vào các phòng khánh tiết."
    },
    quiz: [
      {
        question: "Kiến trúc sư người Việt Nam nào đã thiết kế công trình Dinh Độc Lập (Dinh Thống Nhất)?",
        options: ["Ngô Viết Thụ", "Huỳnh Tấn Phát", "Võ Trọng Nghĩa", "Hoàng Đạo Kính"],
        correctIndex: 0,
        explanation: "Kiến trúc sư Ngô Viết Thụ (người từng đạt giải Khôi nguyên La Mã) là tác giả thiết kế công trình Dinh Độc Lập khánh thành năm 1966."
      },
      {
        question: "Đặc điểm nhận diện kiến trúc tiêu biểu của các Hội quán người Hoa tại khu Chợ Lớn là gì?",
        options: [
          "Mái nhà kính hoàn toàn theo phong cách Scandinavia",
          "Mái ngói âm dương gắn phù điêu tiểu tượng gốm Cây Mai và giếng trời 'thiên tỉnh'",
          "Tháp chuông nhọn kiểu Gothic châu Âu",
          "Tường bằng gỗ tròn phong cách Bắc Mỹ"
        ],
        correctIndex: 1,
        explanation: "Các hội quán Chợ Lớn đặc trưng với mái ngói gắn tượng gốm men nhiều màu (gốm Cây Mai) và giếng trời thông gió, lấy sáng."
      }
    ],
    reflectionPrompt: "Theo em, làm sao để TP.HCM vừa bảo tồn được các công trình kiến trúc di sản cổ xưa, vừa có thể xây dựng các tòa cao ốc hiện đại mà không phá vỡ cảnh quan đô thị?"
  },

  "topic-11-06": {
    id: "topic-11-06",
    modules: [
      {
        title: "1. Thách thức môi trường từ sự phát triển kinh tế nhanh",
        subtitle: "Áp lực công nghiệp hóa, đô thị hóa và giao thông cơ giới",
        content: [
          "Là trung tâm kinh tế đầu tàu đóng góp hơn 20% GDP cả nước, TP.HCM đối mặt với áp lực môi trường khổng lồ: phát thải khí nhà kính từ gần 10 triệu phương tiện xe máy và ô tô.",
          "Chất lượng nước mặt tại các hệ thống kênh rạch (Nhiêu Lộc - Thị Nghè, Tàu Hủ - Bến Nghé, Tham Lương) chịu tác động từ nước thải sinh hoạt và công nghiệp.",
          "Thành phố đang quyết liệt thực hiện mục tiêu 'Net Zero' và Đề án chuyển đổi phương tiện giao thông công cộng sang xe buýt điện, xe đạp công cộng."
        ]
      },
      {
        title: "2. Hệ sinh thái Rừng ngập mặn Cần Giờ - Lá chắn sinh quyển",
        subtitle: "Khu Dự trữ sinh quyển thế giới đầu tiên của Việt Nam",
        content: [
          "Rừng sác Cần Giờ có diện tích hơn 75.000 ha, được UNESCO công nhận năm 2000. Đây là 'lá phổi xanh' hấp thụ CO2, lọc sạch nước thải và bảo vệ TP.HCM khỏi triều cường, bão biển.",
          "Hành động của học sinh: Thực hành lối sống xanh (Zero Waste), tham gia các chiến dịch trồng rừng ngập mặn và đề xuất sáng kiến giảm phát thải carbon trong trường học."
        ]
      }
    ],
    fieldTripGuide: {
      name: "Tuyến kênh Nhiêu Lộc – Thị Nghè & Rừng sác Cần Giờ",
      address: "Tuyến kênh Nhiêu Lộc (Quận 1, 3, Bình Thạnh, Phú Nhuận, Tân Bình)",
      significance: "Minh chứng sống động cho hành trình hồi sinh dòng kênh đen thành dải lụa xanh đô thị của TP.HCM.",
      studentTasks: [
        "Khảo sát chất lượng nước và hệ thống thu gom rác tự động trên kênh Nhiêu Lộc.",
        "Tìm hiểu các loài cây ngập mặn đặc trưng (đước, mắm, bần) tại Cần Giờ.",
        "Lập kế hoạch hành động phân loại rác thải tại nguồn cho lớp học của em."
      ],
      tips: "Chuẩn bị nón, nước uống cá nhân trong bình giữ nhiệt; tuyệt đối không xả rác xuống lòng kênh."
    },
    quiz: [
      {
        question: "Khu dự trữ sinh quyển thế giới đầu tiên của Việt Nam được UNESCO công nhận thuộc địa bàn TP.HCM là khu vực nào?",
        options: [
          "Vườn quốc gia Cát Tiên",
          "Khu dự trữ sinh quyển Rừng ngập mặn Cần Giờ",
          "Bán đảo Thủ Thiêm",
          "Công viên Tao Đàn"
        ],
        correctIndex: 1,
        explanation: "Rừng ngập mặn Cần Giờ được UNESCO công nhận là Khu dự trữ sinh quyển thế giới vào năm 2000."
      },
      {
        question: "Dự án cải tạo môi trường đô thị tiêu biểu bậc nhất giúp 'hồi sinh' dòng kênh ô nhiễm tại TP.HCM là dự án nào?",
        options: [
          "Cải tạo kênh Nhiêu Lộc - Thị Nghè",
          "Xây dựng sân golf",
          "Lấp toàn bộ kênh rạch làm bãi đỗ xe",
          "Khai thác khoáng sản"
        ],
        correctIndex: 0,
        explanation: "Dự án vệ sinh môi trường lưu vực kênh Nhiêu Lộc - Thị Nghè đã biến 'dòng kênh đen' thành biểu tượng cảnh quan xanh sạch của thành phố."
      }
    ],
    reflectionPrompt: "Hãy nêu 3 thói quen hằng ngày mà em và các bạn học sinh có thể thực hiện ngay để giảm thiểu 'dấu chân carbon' và bảo vệ môi trường TP.HCM."
  },

  "topic-11-07": {
    id: "topic-11-07",
    modules: [
      {
        title: "1. Hệ sinh thái đổi mới sáng tạo và STEM tại TP.HCM",
        subtitle: "Thành phố thông minh và chuyển đổi số trong giáo dục",
        content: [
          "TP.HCM là trung tâm công nghệ hàng đầu cả nước với Khu Công nghệ cao TP.HCM (SHTP), Công viên phần mềm Quang Trung (QTSC) và Trung tâm Đổi mới Sáng tạo Quốc gia.",
          "Giáo dục STEM (Khoa học, Công nghệ, Kỹ thuật, Toán học) được đưa vào trường phổ thông giúp học sinh rèn luyện tư duy thiết kế, chế tạo robot, lập trình AI và giải quyết các bài toán thực tiễn đô thị.",
          "Học sinh THPT TP.HCM liên tục đạt thành tích xuất sắc tại các cuộc thi Khoa học Kỹ thuật quốc gia và quốc tế (ISEF)."
        ]
      },
      {
        title: "2. Định hướng nghề nghiệp trong kỉ nguyên Trí tuệ Nhân tạo",
        subtitle: "Chuẩn bị hành trang kỹ năng số và nghề nghiệp tương lai",
        content: [
          "Xu hướng các nhóm ngành phát triển mạnh tại TP.HCM: Công nghệ bán dẫn, Trí tuệ nhân tạo (AI), Năng lượng tái tạo, Logistics thông minh, Tài chính số (Fintech) và Kinh tế xanh.",
          "Bộ kỹ năng thế kỷ 21 cần trang bị: Tư duy phản biện, kỹ năng giải quyết vấn đề phức tạp, năng lực ngoại ngữ (tiếng Anh chuẩn quốc tế), khả năng thích ứng linh hoạt và học tập suốt đời."
        ]
      }
    ],
    fieldTripGuide: {
      name: "Khu Công nghệ Cao TP.HCM (SHTP) & Trung tâm Đổi mới Sáng tạo",
      address: "Đường Xa lộ Hà Nội, TP. Thủ Đức, TP.HCM",
      significance: "Cái nôi công nghệ vi mạch, tự động hóa và đào tạo nhân lực kỹ thuật cao hàng đầu Việt Nam.",
      studentTasks: [
        "Trải nghiệm không gian trưng bày vi mạch bán dẫn và dây chuyền sản xuất tự động hóa.",
        "Tham gia buổi chia sẻ với các kỹ sư công nghệ về lộ trình chọn ngành kỹ thuật.",
        "Thực hiện bài test trắc nghiệm xu hướng nghề nghiệp Holland/MBTI."
      ],
      tips: "Mang sổ tay ghi lại các câu hỏi thắc mắc về ngành nghề để trao đổi trực tiếp với chuyên gia."
    },
    quiz: [
      {
        question: "Thuật ngữ STEM trong giáo dục viết tắt của 4 lĩnh vực nào?",
        options: [
          "Science, Technology, Engineering, Mathematics",
          "Space, Travel, Economy, Management",
          "Society, Teaching, Ecology, Music",
          "Sport, Tourism, Entertainment, Marketing"
        ],
        correctIndex: 0,
        explanation: "STEM là viết tắt của Khoa học (Science), Công nghệ (Technology), Kỹ thuật (Engineering) và Toán học (Mathematics)."
      },
      {
        question: "Lĩnh vực công nghệ cao nào đang được TP.HCM đặc biệt ưu tiên đầu tư phát triển thành trung tâm mũi nhọn?",
        options: [
          "Khai thác than đá",
          "Vi mạch bán dẫn, Trí tuệ Nhân tạo (AI) và Công nghệ sinh học",
          "Đóng tàu gỗ cổ truyền",
          "Sản xuất gạch nung thủ công"
        ],
        correctIndex: 1,
        explanation: "TP.HCM đang tập trung nguồn lực lớn để phát triển công nghệ bán dẫn, vi mạch, trí tuệ nhân tạo và kinh tế số."
      }
    ],
    reflectionPrompt: "Em mong muốn theo đuổi ngành nghề nào trong tương lai? Ngành nghề đó sẽ đóng góp như thế nào vào sự phát triển của TP.HCM trong kỷ nguyên 4.0?"
  },

  "topic-11-08": {
    id: "topic-11-08",
    modules: [
      {
        title: "1. Nếp sống văn minh và phong tục nghĩa tình của đất Nam Bộ",
        subtitle: "Đặc trưng văn hóa ứng xử đô thị Sài Gòn - TP.HCM",
        content: [
          "Con người TP.HCM nổi tiếng với phong thái hào sảng, bộc trực, nghĩa hiệp, 'thấy việc nghĩa thì làm'. Nét đẹp 'bình trà đá miễn phí', 'bánh mì 0 đồng' là biểu tượng của tinh thần tương thân tương ái đô thị.",
          "Phong tục truyền thống: Tôn trọng người lớn tuổi, hiếu thảo với cha mẹ, giữ gìn hòa khí chòm xóm và tinh thần cởi mở, bao dung đón nhận bạn bè bốn phương.",
          "Xây dựng nếp sống văn minh đô thị: Giữ gìn trật tự công cộng, không lấn chiếm vỉa hè, ứng xử văn hóa trên không gian mạng xã hội."
        ]
      },
      {
        title: "2. Ý thức thượng tôn pháp luật của công dân trẻ",
        subtitle: "Tuân thủ luật pháp và trách nhiệm xã hội của học sinh",
        content: [
          "Thượng tôn pháp luật là nền tảng của xã hội tiến bộ: Tuân thủ nghiêm túc Luật Giao thông đường bộ (đội mũ bảo hiểm, không điều khiển xe phân khối lớn khi chưa đủ tuổi).",
          "Phòng chống bạo lực học đường, chấp hành Luật An ninh mạng (không đăng tin giả, không xúc phạm danh dự người khác trên mạng).",
          "Tích cực tham gia các phiên tòa giả định, câu lạc bộ pháp luật và hoạt động tuyên truyền phổ biến pháp luật trong nhà trường."
        ]
      }
    ],
    fieldTripGuide: {
      name: "Tòa án Nhân dân TP.HCM & Trung tâm Trợ giúp Pháp lý",
      address: "Số 131 Nam Kỳ Khởi Nghĩa, Bến Thành, Quận 1, TP.HCM",
      significance: "Công trình kiến trúc tư pháp tiêu biểu hơn 130 năm tuổi, nơi thực thi công lý và giáo dục pháp luật nghiêm minh.",
      studentTasks: [
        "Tham dự một phiên tòa xét xử hoặc phiên tòa tập sự giáo dục học đường.",
        "Tìm hiểu các quyền và nghĩa vụ pháp lý cơ bản của người dưới 18 tuổi theo Luật Trẻ em.",
        "Viết cam kết cá nhân về việc chấp hành văn hóa giao thông và ứng xử văn minh."
      ],
      tips: "Tuân thủ nội quy phiên tòa: tắt chuông điện thoại, giữ im lặng tuyệt đối và đứng dậy khi Hội đồng xét xử vào phòng xử án."
    },
    quiz: [
      {
        question: "Độ tuổi tối thiểu để công dân được phép điều khiển xe gắn máy có dung tích xi lanh dưới 50cm3 theo Luật Giao thông là bao nhiêu?",
        options: ["Đủ 14 tuổi", "Đủ 16 tuổi", "Đủ 18 tuổi", "Đủ 20 tuổi"],
        correctIndex: 1,
        explanation: "Người đủ 16 tuổi trở lên được phép điều khiển xe gắn máy có dung tích xi-lanh dưới 50 cm3."
      },
      {
        question: "Hành vi nào sau đây vi phạm Luật An ninh mạng trên không gian mạng xã hội?",
        options: [
          "Chia sẻ bài giảng học tập trực tuyến chính thống",
          "Đăng tải, phát tán tin tức sai sự thật, xúc phạm danh dự người khác",
          "Tham gia nhóm trao đổi kiến thức học đường",
          "Đọc sách điện tử có bản quyền"
        ],
        correctIndex: 1,
        explanation: "Hành vi tung tin giả mạo, vu khống, bôi nhọ danh dự người khác trên mạng vi phạm nghiêm trọng Luật An ninh mạng."
      }
    ],
    reflectionPrompt: "Em hãy nêu quan điểm của mình về văn hóa ứng xử của học sinh trên mạng xã hội hiện nay: Chúng ta cần làm gì để xây dựng không gian mạng văn minh và an toàn?"
  },

  // KHỐI 12 - TOPIC 01 TO 08
  "topic-12-01": {
    id: "topic-12-01",
    modules: [
      {
        title: "1. Cơ cấu nguồn nhân lực và thị trường việc làm tại TP.HCM",
        subtitle: "Đòi hỏi chất lượng cao trong bối cảnh hội nhập quốc tế",
        content: [
          "TP.HCM có lực lượng lao động hơn 4,8 triệu người, là thị trường việc làm năng động nhất cả nước với nhu cầu cao về lao động qua đào tạo chuyên môn kỹ thuật.",
          "Chuyển dịch cơ cấu lao động: Tăng nhanh tỷ trọng ngành dịch vụ chất lượng cao (tài chính, công nghệ thông tin, logistics, du lịch, y tế chuyên sâu) và công nghiệp chế biến, chế tạo công nghệ cao.",
          "Thách thức: Tình trạng thừa lao động phổ thông, thiếu lao động có tay nghề cao, chuyên gia kỹ thuật và kỹ năng chuyển đổi số."
        ]
      },
      {
        title: "2. Tác phong công nghiệp và quyền lợi người lao động",
        subtitle: "Hành trang cần thiết cho học sinh sau khi tốt nghiệp THPT",
        content: [
          "Tác phong công nghiệp hiện đại: Đúng giờ, tôn trọng kỷ luật lao động, làm việc nhóm hiệu quả, an toàn vệ sinh lao động và trách nhiệm bảo vệ môi trường.",
          "Hiểu biết pháp luật lao động: Hợp đồng lao động, tiền lương, thời giờ làm việc, bảo hiểm xã hội, quyền bình đẳng và phòng chống quấy rối nơi làm việc theo Bộ luật Lao động.",
          "Tư duy khởi nghiệp và năng lực thích ứng với môi trường làm việc đa văn hóa tại các tập đoàn đa quốc gia đóng tại TP.HCM."
        ]
      }
    ],
    fieldTripGuide: {
      name: "Khu Chế xuất Tân Thuận & Trung tâm Dịch vụ Việc làm TP.HCM",
      address: "Phường Tân Thuận Đông, Quận 7, TP.HCM",
      significance: "Khu chế xuất đầu tiên của Việt Nam (thành lập 1991), biểu tượng mở đường thu hút FDI và đào tạo nhân lực công nghiệp của TP.HCM.",
      studentTasks: [
        "Khảo sát quy trình làm việc và trang bị bảo hộ lao động tại 1 doanh nghiệp công nghệ cao.",
        "Phỏng vấn bộ phận nhân sự về tiêu chí tuyển dụng học sinh, sinh viên mới ra trường.",
        "Lập hồ sơ lý lịch nghề nghiệp cá nhân (CV) định hướng nghề tương lai."
      ],
      tips: "Tuân thủ quy định tham quan nhà xưởng, mang giày bít mũi và đeo thẻ khách tham quan."
    },
    quiz: [
      {
        question: "Khu Chế xuất đầu tiên của Việt Nam được xây dựng tại TP.HCM vào năm 1991 là khu chế xuất nào?",
        options: ["KCX Linh Trung", "KCX Tân Thuận", "KCN Tân Bình", "KCN Hiệp Phước"],
        correctIndex: 1,
        explanation: "Khu Chế xuất Tân Thuận (Quận 7) thành lập năm 1991 là khu chế xuất đầu tiên của cả nước, mở đầu thời kỳ thu hút vốn đầu tư nước ngoài mạnh mẽ."
      },
      {
        question: "Yếu tố nào sau đây là biểu hiện tiêu biểu của 'tác phong công nghiệp' trong lao động hiện đại?",
        options: [
          "Đi làm tùy tiện không theo giờ giấc",
          "Tuân thủ nghiêm ngặt quy trình an toàn, đúng giờ và có tinh thần hợp tác nhóm",
          "Làm việc không cần kế hoạch cụ thể",
          "Tránh né các khóa đào tạo kỹ năng số"
        ],
        correctIndex: 1,
        explanation: "Đúng giờ, kỷ luật, an toàn và tinh thần hợp tác đồng đội là những trụ cột căn bản của tác phong công nghiệp hiện đại."
      }
    ],
    reflectionPrompt: "Để chuẩn bị tham gia thị trường lao động tương lai của TP.HCM, em nhận thấy bản thân cần rèn luyện thêm kỹ năng mềm nào nhất ngay từ khi còn học THPT?"
  },

  "topic-12-02": {
    id: "topic-12-02",
    modules: [
      {
        title: "1. Hệ thống hạ tầng giao thông đa phương thức của TP.HCM",
        subtitle: "Huyết mạch kết nối vùng kinh tế trọng điểm phía Nam",
        content: [
          "TP.HCM giữ vị trí trung tâm đầu mối giao thông của cả vùng Nam Bộ với đầy đủ 5 phương thức: Đường bộ, đường sắt, đường thủy nội địa, đường biển và đường hàng không.",
          "Hạ tầng chiến lược đang triển khai bứt phá: Tuyến đường Vành đai 3, Vành đai 4 kết nối liên vùng Đồng Nai - Bình Dương - Long An; các tuyến cao tốc TP.HCM - Mộc Bài, TP.HCM - Chơn Thành.",
          "Cụm cảng biển quốc tế Cát Lái, Hiệp Phước và dự án Cảng trung chuyển quốc tế Cần Giờ khẳng định vị thế cảng biển hàng đầu khu vực."
        ]
      },
      {
        title: "2. Giao thông công cộng xanh và Tuyến Metro số 1",
        subtitle: "Bước ngoặt hiện đại hóa đô thị bền vững",
        content: [
          "Tuyến đường sắt đô thị (Metro) số 1 Bến Thành - Suối Tiên dài gần 20km là dấu mốc lịch sử mở ra kỷ nguyên vận tải hành khách khối lượng lớn hiện đại cho TP.HCM.",
          "Chiến lược giao thông xanh: Phủ sóng xe buýt điện thông minh VinBus, hệ thống xe đạp công cộng TNGO, buýt sông Saigon Waterbus giảm tải áp lực ùn tắc giao thông cá nhân.",
          "Học sinh THPT là lực lượng tiên phong hình thành văn hóa đi lại bằng phương tiện giao thông công cộng văn minh."
        ]
      }
    ],
    fieldTripGuide: {
      name: "Tuyến Metro số 1 (Ga ngầm Bến Thành - Ga Ba Son - Ga Suối Tiên)",
      address: "Quảng trường Ga Bến Thành, Quận 1, TP.HCM",
      significance: "Công trình hạ tầng giao thông thế kỷ đánh dấu bước chuyển mình hiện đại của giao thông đô thị TP.HCM.",
      studentTasks: [
        "Khảo sát quy trình mua vé tự động, quẹt thẻ và cơ chế hướng dẫn người khuyết tật tại ga ngầm.",
        "Trải nghiệm tuyến hành trình và đo thời gian di chuyển so với xe buýt thông thường.",
        "Đề xuất ý tưởng tuyên truyền văn hóa ứng xử văn minh trên tàu điện đô thị cho giới trẻ."
      ],
      tips: "Xếp hàng trật tự khi lên xuống tàu; nhường ghế cho người lớn tuổi, phụ nữ có thai và người khuyết tật."
    },
    quiz: [
      {
        question: "Tuyến đường sắt đô thị (Metro) đầu tiên của TP.HCM kết nối hai đầu mối nào?",
        options: [
          "Bến Thành - Suối Tiên",
          "Bến Thành - Tham Lương",
          "Sân bay Tân Sơn Nhất - Cần Giờ",
          "Chợ Lớn - Thủ Đức"
        ],
        correctIndex: 0,
        explanation: "Tuyến Metro số 1 của TP.HCM kết nối từ ga ngầm trung tâm Bến Thành (Quận 1) đến Bến xe Miền Đông mới / Ga Suối Tiên."
      },
      {
        question: "Mục tiêu chính của TP.HCM trong việc phát triển hệ thống xe buýt điện và tuyến Metro là gì?",
        options: [
          "Tăng lượng phương tiện cá nhân trên đường",
          "Giảm ùn tắc giao thông, giảm thiểu khí thải ô nhiễm và tiến tới đô thị xanh bền vững",
          "Ngừng hoàn toàn việc đi bộ của người dân",
          "Thu hẹp mạng lưới đường bộ liên vùng"
        ],
        correctIndex: 1,
        explanation: "Phát triển giao thông công cộng xanh giúp giải quyết triệt để vấn nạn kẹt xe và giảm phát thải khí nhà kính bảo vệ môi trường."
      }
    ],
    reflectionPrompt: "Em hãy đề xuất một giải pháp để khuyến khích học sinh THPT tại trường em ưu tiên sử dụng xe buýt điện, xe đạp công cộng hoặc tuyến Metro khi đi học."
  },

  "topic-12-03": {
    id: "topic-12-03",
    modules: [
      {
        title: "1. TP.HCM - Đầu tàu kinh tế và bản lĩnh năng động từ năm 1991",
        subtitle: "Đột phá thể chế và những quyết sách dám nghĩ, dám làm",
        content: [
          "Từ Đại hội Đảng toàn quốc lần thứ VII (1991) đến nay, TP.HCM không ngừng phát huy truyền thống năng động, sáng tạo, là 'nơi khởi xướng và thử nghiệm' nhiều chính sách kinh tế mới của đất nước.",
          "Thành phố duy trì tốc độ tăng trưởng kinh tế bình quân cao, đóng góp khoảng 27% ngân sách quốc gia, thu hút vốn đầu tư nước ngoài (FDI) và kiều hối hàng đầu cả nước.",
          "Cơ cấu kinh tế chuyển dịch mạnh mẽ theo hướng công nghiệp công nghệ cao, dịch vụ giá trị gia tăng và kinh tế tri thức."
        ]
      },
      {
        title: "2. Không gian đô thị mới Thủ Thiêm và Trung tâm Tài chính Quốc tế",
        subtitle: "Tầm vóc đô thị văn minh, hiện đại, nghĩa tình",
        content: [
          "Quy hoạch Khu Đô thị mới Thủ Thiêm bên sông Sài Gòn và thành lập TP. Thủ Đức (mô hình 'thành phố trong thành phố' đầu tiên) tạo động lực phát triển mới.",
          "Đề án xây dựng TP.HCM thành Trung tâm Tài chính Quốc tế cạnh tranh trong khu vực Đông Nam Á.",
          "Thành phố luôn kiên định mục tiêu: Phát triển kinh tế gắn liền với tiến bộ, công bằng xã hội và gìn giữ nét đẹp văn hóa 'nghĩa tình' của người dân thành phố."
        ]
      }
    ],
    fieldTripGuide: {
      name: "Bảo tàng TP.HCM & Khu Đô thị mới Thủ Thiêm",
      address: "Số 65 Lý Tự Trọng, Bến Nghé, Quận 1, TP.HCM",
      significance: "Nơi lưu giữ toàn bộ tư liệu hiện vật về sự phát triển kinh tế, văn hóa của thành phố qua các thời kỳ đổi mới.",
      studentTasks: [
        "Khảo sát sa bàn quy hoạch phát triển không gian đô thị TP.HCM đến năm 2030 - 2045.",
        "Thu thập số liệu về sự thay đổi tỷ trọng các ngành kinh tế của thành phố từ 1991 đến nay.",
        "Viết bài chia sẻ cảm xúc về sự đổi thay ngoạn mục của thành phố mang tên Bác."
      ],
      tips: "Mang sổ tay ghi lại các mốc thời gian lịch sử quan trọng trong phòng trưng bày thời kỳ Đổi Mới."
    },
    quiz: [
      {
        question: "Mô hình 'thành phố trong thành phố' đầu tiên của cả nước được thành lập tại TP.HCM vào năm 2021 là thành phố nào?",
        options: ["TP. Dĩ An", "TP. Thủ Đức", "TP. Bà Rịa", "TP. Biên Hòa"],
        correctIndex: 1,
        explanation: "Thành phố Thủ Đức được thành lập trên cơ sở sáp nhập Quận 2, Quận 9 và Quận Thủ Đức, là đô thị sáng tạo phía Đông của TP.HCM."
      },
      {
        question: "Cụm từ nào sau đây thể hiện đầy đủ nhất đặc trưng cốt lõi trong mục tiêu phát triển của TP.HCM?",
        options: [
          "Chỉ tập trung phát triển công nghiệp nặng",
          "Văn minh, hiện đại, nghĩa tình",
          "Khép kín và hạn chế giao thương",
          "Đô thị thuần nông nghiệp"
        ],
        correctIndex: 1,
        explanation: "Mục tiêu xuyên suốt được Đảng bộ và nhân dân TP.HCM khẳng định là xây dựng thành phố: Văn minh, Hiện đại, Nghĩa tình."
      }
    ],
    reflectionPrompt: "Là công dân trẻ của thành phố, em cảm thấy tự hào nhất về điều gì ở sự đổi mới của TP.HCM và em sẽ đóng góp gì cho thành phố trong giai đoạn tới?"
  }
};
