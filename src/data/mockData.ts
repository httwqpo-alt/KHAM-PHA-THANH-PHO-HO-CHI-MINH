import { TopicItem, RegionDetail, QuizQuestion, LeaderboardUser, AuthorProfile } from '../types';

export const ASSETS = {
  logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnTY8ek_5aTm6-4vDSQYVITHX4Pu8hnHDDTXcwsfiRUkbKpfIc0Oz-LujyYIxAxP8XMT3Hu9skpbbNUuGmlb_KicF6gdLP5_NSCsB0JNK1nnDLD-HExBfHr8R9HcvYd29Kmaq9Y26B9A-h3VsAHxgVbBVthRwcC-d7NJL1cp-y2-6rHmYfg6oSMpgKk7btzWZMsvA0KBcNKPbsdZ3aHgUwJsaq86C9mVk9gaMGAOVt_oIDv4BNC0aQ",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6-IRnavkb9ETjzj1mLyfB7Yj6Tcj6ruAA0wQ-EOYw9PbC8lyJ-wW8OzYxYhk5TOglXx1HMwVz_XHjzie4lLUVfEr47YJ_oB5MX4KSYDU01l_Rm5sgWnXLsH84bhJWn9jjjujdGxh2Ot4TmqdaF9ijGwXz2P44DfPSupwNxYqnIb4XFi3zJh-HehNKL8-BHIPbC7s5kh_4vMjHpU52-n4ytNIbBtHEsM2tEOw-G5HRjzmXQAzkQqWC",
  printingPress: "https://lh3.googleusercontent.com/aida-public/AB6AXuARMm7AzjkP0pGF1PbeHnhcRZ6kdG6e6_xXdo8qKSP6f2c0LZ6Ye1nGi3Rr_we6gdCB9fr7-yQBkwBMkjyqiTaMDy7W1DPPCGkT3ECKMKvGbSNixsfdZQVB9clUkbCnod3RmY5r-hg-Mr9wsArq6U8TOJho-llKAu0r4nMGbslnIK_8eVQI3gPLhOqPN57ZlZqq3cctsSIM8q96HX2V7h0hzeMuDW3LjQ1yeEeu2jZwt50yMoZQzgTD",
  sonNam: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCKxLApO6BS1q0v91jSubGVVG9NGvJOmiu-XO_9Qc2uwZaDRYmgWO6jHpaKKK4wWABEasYW4LRnUAFBNHV8y8UjLHAeBgF3R-d2UYrE-_-wzfLOb3wzjU1zcUaFRQ8rx-BPjvpX3iLsOnMk1MvdkH-LM_9uOU_4-1xqF_05yX86Dr30EluVYeIF55QX9fdUBiH7WQslRgNA3lfLNfjD6JRNt88XjyYHtjTwC-hqx05GkfJxzm3Efnj",
  binhNguyenLoc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgCVmAF5zhqvzJfk2GhXuY0QHA9GAITF415YLqlKKVKmoxwYWuqOPG1V8kiOhDz8viWes2D8V4Y0LEcC3BRXDnJHuHxc1KWoiAyeLAFnnNtfOtlGcxV5jkGFLcwUKD9rmP22YPtKCHtllQ4u6xbssWBFTNrnmMIMjtBbbrAsp8XA_eK0o1G3VBjpdpAUYixEmj-tMYZoK_h86dHzHuvtCQYx4zbEHAvDPCP8BdiyXAjmVQa1X9bcvE",
  truongVinhKy: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvf-X0qgi7-sdU4smsY9Ja1aB1UhYNOjMG71URi1EXUk7L2r5OqGoySoc0uFAhWeYOyHb_cW24_cJRNjmYI_F_xiLq9gj8QI5VngwZPMM1D847zj4VfRcijWPawIeRuMUs4SJc6i1amZb5y9zgLFZmx7uEBfo_eFXIQuoilwSu8PFmLenuDfh7FxQZJs2IsZN3ws9xvcDpeA0_qjO7i6AK7U1kL1-6cJkX-a5kGy7ce4J6B0bsaSpO",
  bachDinh: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80"
};

export const GRADE_11_TOPICS: TopicItem[] = [
  {
    id: "topic-11-01",
    code: "Chủ đề 01",
    grade: 11,
    title: "Văn học TPHCM trước năm 1975",
    shortDesc: "Báo chí quốc ngữ ban mai, phong trào yêu nước, văn chương đất Sài Gòn – Chợ Lớn.",
    learningGoal: "Khảo sát sự hình thành chữ Quốc ngữ, báo chí hiện đại (Gia Định Báo) và các tác phẩm khơi nguồn tình yêu quê hương phương Nam.",
    duration: "4 Tiết",
    fieldTrip: "1 Thực địa",
    destination: "Nhà thờ Tân Định & Bảo tàng Lịch sử TP.HCM",
    status: "active",
    period: "Đang học"
  },
  {
    id: "topic-11-02",
    code: "Chủ đề 02",
    grade: 11,
    title: "Phát triển du lịch ở TPHCM",
    shortDesc: "Tiềm năng du lịch văn hóa, du lịch đường thủy, di tích lịch sử và kinh tế đêm của đô thị.",
    learningGoal: "Phân tích các loại hình du lịch đặc trưng tại TP.HCM, đánh giá tiềm năng kinh tế du lịch và đề xuất giải pháp quảng bá điểm đến bền vững.",
    duration: "3 Tiết",
    fieldTrip: "1 Trải nghiệm",
    destination: "Tuyến buýt sông Saigon Waterbus & Bến Bạch Đằng",
    status: "locked",
    period: "Năm học 2026 - 2027"
  },
  {
    id: "topic-11-03",
    code: "Chủ đề 03",
    grade: 11,
    title: "Danh nhân lịch sử TPHCM",
    shortDesc: "Hành trình và cống hiến của các bậc tiền hiền, chí sĩ yêu nước và danh nhân văn hóa đất Gia Định.",
    learningGoal: "Tìm hiểu cuộc đời, sự nghiệp của Lễ Thành Hầu Nguyễn Hữu Cảnh, Trương Vĩnh Ký, Nguyễn An Ninh và các nhân vật lịch sử tiêu biểu gắn bó với Sài Gòn - TP.HCM.",
    duration: "4 Tiết",
    fieldTrip: "1 Thực địa",
    destination: "Khu tưởng niệm các Vua Hùng & Đền thờ Nguyễn Hữu Cảnh",
    status: "locked",
    period: "Năm học 2026 - 2027"
  },
  {
    id: "topic-11-04",
    code: "Chủ đề 04",
    grade: 11,
    title: "Âm nhạc trong đời sống hiện nay TPHCM",
    shortDesc: "Giao thoa giữa âm nhạc truyền thống (Đờn ca tài tử, Cải lương) và âm nhạc đương đại sôi động.",
    learningGoal: "Nhận diện vai trò của âm nhạc trong đời sống văn hóa cư dân thành phố; cảm nhận sức sống của các trào lưu âm nhạc trẻ kết hợp yếu tố dân gian Nam Bộ.",
    duration: "3 Tiết",
    fieldTrip: "1 Thưởng thức",
    destination: "Nhà hát Thành phố & Sân khấu Âm nhạc phố đi bộ Nguyễn Huệ",
    status: "locked",
    period: "Năm học 2026 - 2027"
  },
  {
    id: "topic-11-05",
    code: "Chủ đề 05",
    grade: 11,
    title: "Đặc trưng của một số công trình kiến trúc ở TPHCM",
    shortDesc: "Dấu ấn phong cách Đông Dương, kiến trúc Pháp, hội quán Hoa Chợ Lớn và các công trình hiện đại biểu tượng.",
    learningGoal: "Nhận biết các đặc điểm kiến trúc tiêu biểu (Trụ sở UBND Thành phố, Bưu điện Trung tâm, Dinh Độc Lập, Landmark 81) và ý thức bảo tồn di sản đô thị.",
    duration: "4 Tiết",
    fieldTrip: "2 Thực địa",
    destination: "Bưu điện Trung tâm TP.HCM & Dinh Độc Lập",
    status: "locked",
    period: "Năm học 2026 - 2027"
  },
  {
    id: "topic-11-06",
    code: "Chủ đề 06",
    grade: 11,
    title: "Tác động của hoạt động kinh tế đến môi trường tự nhiên ở TPHCM",
    shortDesc: "Ảnh hưởng của công nghiệp hóa, đô thị hóa, giao thông đến nguồn nước, không khí và hệ sinh thái Cần Giờ.",
    learningGoal: "Đánh giá các thách thức về ô nhiễm kênh rạch, triều cường, biến đổi khí hậu; đề xuất hành động bảo vệ môi trường tự nhiên cho công dân trẻ thành phố.",
    duration: "3 Tiết",
    fieldTrip: "1 Nghiên cứu",
    destination: "Kênh Nhiêu Lộc – Thị Nghè & Rừng sác Cần Giờ",
    status: "locked",
    period: "Năm học 2026 - 2027"
  },
  {
    id: "topic-11-07",
    code: "Chủ đề 07",
    grade: 11,
    title: "Giáo dục STEM và định hướng nghề nghiệp trong kỉ nguyên mới",
    shortDesc: "Ứng dụng khoa học kỹ thuật, tư duy số, chuyển đổi xanh và xu hướng phát triển ngành nghề tại TP.HCM.",
    learningGoal: "Khám phá các mô hình giáo dục STEM, hệ sinh thái khởi nghiệp đổi mới sáng tạo, nhận thức năng lực cá nhân và định hướng nghề nghiệp trong kỉ nguyên 4.0.",
    duration: "4 Tiết",
    fieldTrip: "1 Trải nghiệm",
    destination: "Khu Công nghệ Cao TP.HCM (SHTP) & Trung tâm Đổi mới sáng tạo",
    status: "locked",
    period: "Mở rộng"
  },
  {
    id: "topic-11-08",
    code: "Chủ đề 08",
    grade: 11,
    title: "Phong tục, luật tục và giáo dục pháp luật ở TPHCM",
    shortDesc: "Nếp sống văn minh đô thị, phong tục tập quán nghĩa tình của cư dân Nam Bộ và ý thức thượng tôn pháp luật.",
    learningGoal: "Tìm hiểu các phong tục truyền thống tốt đẹp, nếp sống văn minh đô thị cùng chuẩn mực và ý thức chấp hành pháp luật trong cộng đồng.",
    duration: "3 Tiết",
    fieldTrip: "1 Tọa đàm",
    destination: "Tòa án Nhân dân TP.HCM & Trung tâm Trợ giúp Pháp lý",
    status: "locked",
    period: "Dự án cuối khóa"
  }
];

export const GRADE_10_TOPICS: TopicItem[] = [
  {
    id: "topic-10-01",
    code: "Chủ đề 01",
    grade: 10,
    title: "Vùng đất Sài Gòn – Gia Định thời tiền – sơ sử",
    shortDesc: "Dấu tích cư dân cổ bên lưu vực sông Đồng Nai, văn hóa Óc Eo và khảo cổ học Cần Giờ.",
    learningGoal: "Nhận biết các nền văn hóa khảo cổ học Giồng Cá Vồ, Bến Đò và các tầng di tích tiền sử TP.HCM.",
    duration: "3 Tiết",
    fieldTrip: "1 Thực địa",
    destination: "Khu di chỉ Khảo cổ Cần Giờ",
    status: "completed",
    period: "Năm học 2026 - 2027"
  },
  {
    id: "topic-10-02",
    code: "Chủ đề 02",
    grade: 10,
    title: "Quá trình khai hoang, xác lập chủ quyền phương Nam",
    shortDesc: "Dấu ấn Lễ Thành Hầu Nguyễn Hữu Cảnh và công cuộc định danh vùng đất 1698.",
    learningGoal: "Hiểu rõ bối cảnh thành lập phủ Gia Định, chính sách khuyến khích khẩn hoang và lập làng xóm của chúa Nguyễn.",
    duration: "4 Tiết",
    fieldTrip: "1 Thực địa",
    destination: "Đền thờ Lễ Thành Hầu Nguyễn Hữu Cảnh",
    status: "active",
    period: "Năm học 2026 - 2027"
  },
  {
    id: "topic-10-03",
    code: "Chủ đề 03",
    grade: 10,
    title: "Địa lý tự nhiên và hệ sinh thái rừng ngập mặn Cần Giờ",
    shortDesc: "Khu dự trữ sinh quyển thế giới đầu tiên của Việt Nam – Lá phổi xanh thành phố.",
    learningGoal: "Khám phá địa hình sông ngòi chằng chịt, thảm thực vật đước mắm và giải pháp thích ứng biến đổi khí hậu.",
    duration: "4 Tiết",
    fieldTrip: "1 Sinh thái",
    destination: "Khu bảo tồn Sinh quyển Rừng sác Cần Giờ",
    status: "locked",
    period: "Năm học 2026 - 2027"
  }
];

export const GRADE_12_TOPICS: TopicItem[] = [
  {
    id: "topic-12-01",
    code: "Chủ đề 01",
    grade: 12,
    title: "TP. Hồ Chí Minh: Trung tâm kinh tế - tài chính đa giác quan",
    shortDesc: "Mạng lưới thương mại quốc tế, dịch vụ hiện đại và quy hoạch đại đô thị sông nước.",
    learningGoal: "Phân tích cơ cấu kinh tế dịch vụ, chuyển dịch số hóa và vị thế đầu tàu kinh tế của vùng Đông Nam Bộ.",
    duration: "4 Tiết",
    fieldTrip: "1 Thực địa",
    destination: "Trung tâm Đổi mới Sáng tạo Quốc gia & Cảng Cát Lái",
    status: "active",
    period: "Năm học 2026 - 2027"
  },
  {
    id: "topic-12-02",
    code: "Chủ đề 02",
    grade: 12,
    title: "Đô thị xanh, thông minh và bài toán phát triển bền vững",
    shortDesc: "Bảo vệ môi trường không khí, xử lý rác thải và giao thông công cộng metro xanh.",
    learningGoal: "Đề xuất giải pháp tuổi trẻ bảo vệ cảnh quan đô thị, tham gia giao thông xanh và xây dựng lối sống xanh.",
    duration: "3 Tiết",
    fieldTrip: "1 Trải nghiệm",
    destination: "Tuyến Metro số 1 Bến Thành - Suối Tiên",
    status: "locked",
    period: "Năm học 2026 - 2027"
  }
];

export const REGIONAL_DATA: Record<number, RegionDetail> = {
  1: {
    id: 1,
    name: "TP. Hồ Chí Minh",
    tag: "Khu Vực 1 (Trọng Tâm)",
    title: "TP.HCM (Khu Vực Trung Tâm & Nội Đô Lịch Sử)",
    area: "2.095 km²",
    population: "9.966.166 người (2024)",
    desc: "Cái nôi xuất hiện văn hóa chữ quốc ngữ, các nhà in báo chí đầu tiên (Gia Định Báo) và những con phố văn nghệ lừng lẫy của đất Sài Gòn xưa.",
    spotlight: {
      location: "TP. Hồ Chí Minh • Quận 1",
      name: "Bưu Điện Trung Tâm Sài Gòn & Trục Catinat Cổ",
      desc: "Công trình tiêu biểu kiến trúc giao thoa Đông - Tây khánh thành năm 1891, nơi lưu giữ hàng triệu bức thư tay và bước ngoặt viễn thông của đất Nam Kỳ.",
      quizHint: "Bưu điện Trung tâm TP.HCM do kiến trúc sư người Pháp nào phác thảo thiết kế ban đầu?",
      image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80"
    },
    topics: [
      {
        icon: "menu_book",
        color: "text-[#704f8d]",
        title: "Văn học đô thị & Báo chí quốc ngữ",
        detail: "Không gian Nhà in Tân Định, đường Catinat cổ kính, tiệm sách Chợ Quán."
      },
      {
        icon: "account_balance",
        color: "text-[#855300]",
        title: "Dấu ấn văn hóa Chợ Lớn đa sắc tộc",
        detail: "Giao lưu thi ca Việt - Hoa, các hội quán cổ truyền và văn hóa ẩm thực Nam Kỳ."
      },
      {
        icon: "theater_comedy",
        color: "text-[#70537b]",
        title: "Cái nôi các rạp Cải Lương Sài Gòn",
        detail: "Hệ thống rạp Hưng Đạo, Nguyễn Văn Hảo và thời hoàng kim sân khấu Nam Bộ."
      }
    ]
  },
  2: {
    id: 2,
    name: "BR - Vũng Tàu",
    tag: "Khu Vực 2: Liên Kết Vùng",
    title: "Tỉnh Bà Rịa – Vũng Tàu (Cửa Ngõ Hàng Hải & Di Sản Biển)",
    area: "1.982 km²",
    population: "1.313.905 người",
    desc: "Không gian kết nối giao thương hàng hải phương Nam, văn hóa tín ngưỡng cá Ông, thi ca kháng chiến miền Duyên hải và các cảng thị truyền thống.",
    spotlight: {
      location: "Bà Rịa – Vũng Tàu • TP. Vũng Tàu",
      name: "Bạch Dinh (Villa Blanche) & Hệ Thống Pháo Đài Núi Lớn",
      desc: "Di tích lịch sử văn hóa cấp quốc gia, công trình kiến trúc châu Âu cuối thế kỷ 19 phản ánh vị thế phòng thủ chiến lược cửa ngõ biển Đông của Sài Gòn.",
      quizHint: "Bạch Dinh từng là nơi giam lỏng vị vua yêu nước nào của triều Nguyễn?",
      image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1000&q=80"
    },
    topics: [
      {
        icon: "phishing",
        color: "text-[#6e652b]",
        title: "Thi ca gắn liền tín ngưỡng Lễ hội Nghinh Ông",
        detail: "Văn học dân gian miêu tả đời sống ngư dân bám biển, tục thờ thần Nam Hải."
      },
      {
        icon: "sailing",
        color: "text-[#704f8d]",
        title: "Hải trình kết nối Bến Nghé - Côn Đảo",
        detail: "Tập thơ ca tù Côn Đảo của các chí sĩ yêu nước và ngòi bút chiến đấu kiên cường."
      },
      {
        icon: "water",
        color: "text-[#70537b]",
        title: "Cảm hứng biển cả trong thơ ca hiện đại",
        detail: "Các tác phẩm ký họa không gian biển Long Hải, Vũng Tàu thế kỷ 20."
      }
    ]
  },
  3: {
    id: 3,
    name: "Bình Dương",
    tag: "Khu Vực 3: Không Gian Làng Nghề",
    title: "Tỉnh Bình Dương (Không Gian Sông Bé & Nghề Cổ)",
    area: "2.695 km²",
    population: "2.426.561 người",
    desc: "Cội nguồn không gian làng nghề truyền thống gốm sứ Lái Thiêu, sơn mài Tương Bình Hiệp và dòng chảy văn học phong thổ Sông Bé trù phú.",
    spotlight: {
      location: "Bình Dương • Thuận An",
      name: "Lò Gốm Cổ Đại Hưng & Vành Đai Gốm Lái Thiêu",
      desc: "Lò gốm cổ trên 150 năm tuổi sản xuất đồ gốm gia dụng Nam Bộ với kỹ thuật nung củi truyền thống, cung cấp cho toàn bộ thị trường Sài Gòn và Lục Tỉnh.",
      quizHint: "Kỹ thuật men màu đặc trưng của gốm Lái Thiêu xưa là loại men gì?",
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=80"
    },
    topics: [
      {
        icon: "format_paint",
        color: "text-[#70537b]",
        title: "Dấu ấn sơn mài, gốm sứ trong văn học Bình Nguyên Lộc",
        detail: "Nhà văn Bình Nguyên Lộc quê gốc Tân Uyên với nỗi nhớ tha thiết vườn xưa đất đỏ."
      },
      {
        icon: "forest",
        color: "text-[#704f8d]",
        title: "Văn học đồn điền cao su & Dòng sông Bé",
        detail: "Những thiên phóng sự chân thực ghi nhận cuộc sống thợ cạo cao su thời kỳ trước 1945."
      },
      {
        icon: "handyman",
        color: "text-[#855300]",
        title: "Bản sắc văn hóa thợ mộc - chạm trổ Nam Bộ",
        detail: "Hội ngộ thợ thủ công lành nghề ven sông Sài Gòn mở rộng."
      }
    ]
  },
  4: {
    id: 4,
    name: "Gia Định & Phụ Cận",
    tag: "Khu Vực 4: Vùng Phụ Cận Lịch Sử",
    title: "Gia Định & Các Vùng Phụ Cận Lịch Sử",
    area: "Vùng ven lịch sử",
    population: "Khu di tích lịch sử",
    desc: "Không gian 18 Thôn Vườn Trầu Hóc Môn - Bà Điểm, di tích vùng căn cứ Gia Định cổ xưa và hào khí khởi nghĩa kiên trung của nghĩa sĩ Lục Tỉnh.",
    spotlight: {
      location: "TP.HCM • Hóc Môn",
      name: "Di Tích Ngã Ba Giồng & 18 Thôn Vườn Trầu",
      desc: "Căn cứ địa của cuộc Khởi nghĩa Nam Kỳ 1940, mảnh đất kiên cường được ghi tạc trong các khúc tráng ca văn học cách mạng miền Nam.",
      quizHint: "Khởi nghĩa Nam Kỳ bùng nổ vào ngày tháng năm nào?",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80"
    },
    topics: [
      {
        icon: "grass",
        color: "text-[#855300]",
        title: "Văn học 18 Thôn Vườn Trầu & Tiếng trống Nam Kỳ",
        detail: "Thơ ca cổ vũ khởi nghĩa, tấm lòng trung kiên của bà con nông dân Hóc Môn."
      },
      {
        icon: "castle",
        color: "text-[#704f8d]",
        title: "Gia Định Thành Thông Chí & Trước tác tiền nhân",
        detail: "Bộ địa chí lừng danh của Trịnh Hoài Đức mở rộng tri thức về phong thổ Nam Kỳ."
      },
      {
        icon: "temple_buddhist",
        color: "text-[#70537b]",
        title: "Văn bia di tích miếu đình vùng Gia Định xưa",
        detail: "Hệ thống câu đối, văn tế nghĩa sĩ lưu giữ tâm hồn trượng nghĩa Lục Tỉnh."
      }
    ]
  }
};

export const WEEKLY_CHALLENGE: QuizQuestion = {
  id: 1801,
  week: "Thử Thách Tuần 18",
  questionNumber: "Câu 01/05",
  points: 50,
  subject: "Môn: Giáo dục địa phương (Chuyên đề Văn học Lớp 11)",
  question: "Nhà văn nào sau đây được mệnh danh là \"Người kể chuyện đất Sài Gòn\" với các tác phẩm nổi tiếng miêu tả nếp sống, ngôn từ và phong vị phương Nam trước năm 1975?",
  options: [
    { id: "A", text: "Nhà văn Nam Cao" },
    { id: "B", text: "Nhà văn Vương Hồng Sển & Bình Nguyên Lộc" },
    { id: "C", text: "Nhà thơ Tố Hữu" },
    { id: "D", text: "Nhà văn Thạch Lam" }
  ],
  correctAnswer: "B",
  explanation: "Vương Hồng Sển (với 'Sài Gòn năm xưa') và Bình Nguyên Lộc (với 'Hương quê', 'Đò dọc') là hai tác gia tiêu biểu khắc họa tinh tế và chân thực nhất phong vị văn hóa, lời ăn tiếng nói đất Sài Gòn – Gia Định."
};

export const MINI_QUIZ_GRADE_11: QuizQuestion[] = [
  {
    id: 1,
    week: "Ôn tập Bài 1",
    questionNumber: "Câu 1",
    points: 20,
    subject: "Chủ đề 1: Văn học TP.HCM trước 1975",
    question: "Tờ báo bằng chữ Quốc ngữ đầu tiên xuất bản tại Sài Gòn năm 1865 là tờ báo nào?",
    options: [
      { id: "A", text: "Nam Phong Tạp Chí" },
      { id: "B", text: "Gia Định Báo" },
      { id: "C", text: "Đông Dương Tạp Chí" },
      { id: "D", text: "Lục Tỉnh Tân Văn" }
    ],
    correctAnswer: "B",
    explanation: "Gia Định Báo ra số đầu tiên ngày 15/4/1865 tại Sài Gòn, là mốc son mở đầu cho báo chí chữ Quốc ngữ của Việt Nam."
  },
  {
    id: 2,
    week: "Ôn tập Bài 1",
    questionNumber: "Câu 2",
    points: 20,
    subject: "Chủ đề 1: Văn học TP.HCM trước 1975",
    question: "Tác phẩm văn học nào gắn liền với bút lực miêu tả phong thổ Nam Bộ của nhà văn Sơn Nam?",
    options: [
      { id: "A", text: "Tắt đèn" },
      { id: "B", text: "Số đỏ" },
      { id: "C", text: "Hương rừng Cà Mau" },
      { id: "D", text: "Vang bóng một thời" }
    ],
    correctAnswer: "C",
    explanation: "'Hương rừng Cà Mau' (1962) là tập truyện ngắn kinh điển của Sơn Nam tái hiện đậm nét đời sống khẩn hoang hào hùng của người dân phương Nam."
  },
  {
    id: 3,
    week: "Ôn tập Bài 1",
    questionNumber: "Câu 3",
    points: 20,
    subject: "Chủ đề 1: Văn học TP.HCM trước 1975",
    question: "Đặc điểm ngôn ngữ nổi bật nhất của văn học TP.HCM giai đoạn trước năm 1975 là gì?",
    options: [
      { id: "A", text: "Bình dị, khẩu ngữ mộc mạc Nam Kỳ" },
      { id: "B", text: "Sử dụng nhiều điển cố chữ Nho cầu kỳ" },
      { id: "C", text: "Toàn bộ bằng ngôn ngữ Pháp" },
      { id: "D", text: "Không có yếu tố địa phương" }
    ],
    correctAnswer: "A",
    explanation: "Văn học Nam Bộ mang đậm tính phóng khoáng, sử dụng tự nhiên khẩu ngữ bình dân, tạo cảm giác gần gũi, chân thành và tràn đầy hơi thở cuộc sống."
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Lê Hoàng Nam",
    schoolClass: "Lớp 11A2 • THPT Lê Hồng Phong",
    score: 1480
  },
  {
    rank: 2,
    name: "Trần Mai Phương",
    schoolClass: "Lớp 10 Chuyên Văn • THPT Gia Định",
    score: 1350
  },
  {
    rank: 3,
    name: "Nguyễn Minh Quân",
    schoolClass: "Lớp 12 Tin • THPT Mạc Đĩnh Chi",
    score: 1290
  },
  {
    rank: 4,
    name: "Vũ Bảo Châu",
    schoolClass: "Lớp 11 Hóa • THPT Chuyên Trần Đại Nghĩa",
    score: 1210
  }
];

export const AUTHORS_DATA: AuthorProfile[] = [
  {
    id: "son-nam",
    name: "Sơn Nam",
    years: "1926 – 2008",
    role: "Nhà văn Nam Bộ • Người chép sử bình dân",
    roleColor: "bg-[#f0e49c] text-[#201c00]",
    works: "\"Hương rừng Cà Mau\", \"Bến Nghé xưa\", \"Người Sài Gòn\"",
    quote: "Mỗi bước chân đi là một tấc lòng thương nhớ đồng bào, nhớ rừng tràm bưng biền thuở mở đất...",
    image: ASSETS.sonNam,
    bio: "Nhà văn Sơn Nam (tên thật là Phạm Minh Tày) sinh tại Kiên Giang nhưng cả đời gắn bó máu thịt với văn hóa Sài Gòn. Ông dành hơn nửa thế kỷ điền dã, ghi chép và tái hiện sinh động tập quán, cốt cách hào sảng, trọng nghĩa khinh tài của người phương Nam.",
    keyThemes: ["Khẩn hoang phương Nam", "Tâm thức sông nước", "Văn hóa Bến Nghé", "Ngôn ngữ bình dân mộc mạc"]
  },
  {
    id: "binh-nguyen-loc",
    name: "Bình Nguyên Lộc",
    years: "1914 – 1987",
    role: "Nhà văn & Nhà nhân chủng học",
    roleColor: "bg-[#f1dbff] text-[#2a0946]",
    works: "\"Hương quê\", \"Đò dọc\", \"Nguồn gốc Mã Lai của dân tộc Việt Nam\"",
    quote: "Cái tình quê hương đất rộng sông dài ngấm sâu vào máu thịt những con người tha hương tụ hội về Sài Gòn...",
    image: ASSETS.binhNguyenLoc,
    bio: "Bình Nguyên Lộc (tên thật Tô Văn Tuấn) sinh tại Tân Uyên, Biên Hòa (nay thuộc Bình Dương). Ông là tác giả kiệt xuất của văn xuôi hiện đại phương Nam với trên 50 tác phẩm truyện dài, tập truyện ngắn và khảo cứu ngôn ngữ - nhân chủng học uyên bác.",
    keyThemes: ["Di cư & hội tụ đất Sài Gòn", "Tình làng nghĩa xóm", "Khảo cứu nguồn cội", "Nỗi hoài hương đất đỏ"]
  },
  {
    id: "truong-vinh-ky",
    name: "Trương Vĩnh Ký",
    years: "1837 – 1898",
    role: "Bậc Tiền Hiền Chữ Quốc Ngữ",
    roleColor: "bg-[#eee4f7] text-[#4b444e]",
    works: "Chủ bút Gia Định Báo, tác giả \"Chuyến đi Bắc Kỳ năm Ất Hợi\"",
    quote: "Học tập cổ kim, giữ gìn tiếng mẹ đẻ, dùng chữ thông dụng để mở mang dân trí cho dân Nam Kỳ.",
    image: ASSETS.truongVinhKy,
    bio: "Pétrus Trương Vĩnh Ký là một trong 18 nhà bác học hàng đầu thế giới thế kỷ 19 theo bầu chọn của Viện Hàn lâm Pháp. Ông thông thạo hơn 20 thứ tiếng, là người đặt nền móng bền vững biến chữ Quốc ngữ La-tinh thành công cụ văn hóa, báo chí và văn học hiện đại của người Việt.",
    keyThemes: ["Thuở bình minh Quốc ngữ", "Gia Định Báo 1865", "Ký sự hiện đại", "Truyền bá dân trí"]
  }
];
