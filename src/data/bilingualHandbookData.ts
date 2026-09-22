export interface HandbookPage {
  pageNumber: number;
  title: string;
  subtitle?: string;
  coverImage?: string;
  images: {
    url: string;
    caption?: string;
    alt: string;
  }[];
  content: {
    heading?: string;
    address?: string;
    badge?: string;
    descriptionPoints?: string[];
    paragraphs?: string[];
    quote?: {
      text: string;
      author: string;
    };
    poem?: {
      lines: string[];
      title: string;
      poet: string;
    };
    destinationsGrid?: {
      name: string;
      desc: string;
      image: string;
    }[];
  };
}

export interface HandbookLanguageData {
  language: 'vi' | 'en';
  languageName: string;
  flag: string;
  documentTitle: string;
  documentSubtitle: string;
  pageCount: number;
  pages: HandbookPage[];
}

export const BILINGUAL_HANDBOOK_DATA: Record<'vi' | 'en', HandbookLanguageData> = {
  vi: {
    language: 'vi',
    languageName: 'Tiếng Việt',
    flag: '🇻🇳',
    documentTitle: 'KHÁM PHÁ CÁC ĐỊA ĐIỂM THÀNH PHỐ HỒ CHÍ MINH',
    documentSubtitle: 'Bộ tư liệu trực quan văn hóa, kiến trúc & du lịch địa phương',
    pageCount: 6,
    pages: [
      {
        pageNumber: 1,
        title: 'KHÁM PHÁ CÁC ĐỊA ĐIỂM',
        subtitle: 'THÀNH PHỐ HỒ CHÍ MINH',
        coverImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1400&q=80',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1400&q=80',
            caption: 'Dinh Độc Lập - Di tích lịch sử quốc gia đặc biệt tại trung tâm Quận 1, TP.HCM',
            alt: 'Dinh Độc Lập TP. Hồ Chí Minh'
          }
        ],
        content: {
          heading: 'Hành trình di sản phương Nam',
          descriptionPoints: [
            'Bộ tư liệu trực quan giới thiệu các công trình kiến trúc biểu tượng, không gian văn hóa liên kết và di tích lịch sử tiêu biểu.',
            'Tích hợp trong chuyên đề Giáo dục địa phương TP.HCM - Định hướng phát triển du lịch bền vững và bồi đắp tình yêu quê hương.'
          ]
        }
      },
      {
        pageNumber: 2,
        title: 'NHÀ THỜ ĐỨC BÀ',
        subtitle: 'Biểu tượng kiến trúc và tôn giáo nổi tiếng bậc nhất Sài thành',
        images: [
          {
            url: '/images/handbook/duc-ba-1.jpg',
            caption: 'Hình 1: Nhà thờ Đức Bà Sài Gòn với tháp chuông uy nghiêm và tượng Đức Mẹ Hòa Bình',
            alt: 'Nhà thờ Đức Bà Sài Gòn ban ngày'
          },
          {
            url: '/images/handbook/duc-ba-2.jpg',
            caption: 'Hình 2: Kiến trúc tháp chuông cổ kính và dàn đèn rực sáng mừng lễ hội Giáng sinh',
            alt: 'Nhà thờ Đức Bà tháp chuông lung linh'
          }
        ],
        content: {
          address: 'Số 01 Công trường Công Xã Paris, phường Bến Nghé (Quận 1), Thành phố Hồ Chí Minh',
          badge: 'Kiến trúc Roman pha Gothic cổ điển Pháp',
          descriptionPoints: [
            'Biểu tượng kiến trúc và tôn giáo nổi tiếng bậc nhất Sài thành.',
            'Diện tích khuôn viên hơn 3.400 m², xây dựng kiên cố với toàn bộ vật liệu gạch ngói ngói Marseille chuyển từ Pháp sang.',
            'Nhà thờ Đức Bà Sài Gòn được thắp sáng lộng lẫy với dàn đèn LED dài 1.000km để mừng Giáng Sinh 2025.'
          ],
          poem: {
            lines: [
              'Chuông nhà thờ ngân tiếng xa huyền bí,',
              'Đức Bà ơi! Nét kỳ vĩ vô cùng.',
              'Tà áo dài bóng thiếu nữ bay tung,',
              'Chiều dịu dàng em bước chung cùng gió.'
            ],
            title: 'Chiều Sài Gòn',
            poet: 'Đặng Minh Mai'
          }
        }
      },
      {
        pageNumber: 3,
        title: 'QUẢNG TRƯỜNG TAM THẮNG',
        subtitle: 'Không gian mở biểu tượng và khát vọng vươn mình ra biển lớn',
        images: [
          {
            url: '/images/handbook/tam-thang-1.jpg',
            caption: 'Hình 3: Tháp Tam Thắng lung linh về đêm với 143 cột trụ vươn cao rực rỡ đón gió đại dương',
            alt: 'Quảng trường Tam Thắng về đêm'
          }
        ],
        content: {
          badge: 'Diện tích hơn 16.700 m²',
          descriptionPoints: [
            'Tháp Tam Thắng mang trong mình câu chuyện lịch sử gắn liền với ba làng cổ Thắng Nhất, Thắng Nhì và Thắng Tam thời vua Gia Long.',
            'Đây vốn là nền tảng hình thành nên đô thị biển Vũng Tàu ngày nay.',
            'Thiết kế công trình được lấy cảm hứng từ hình ảnh ba mũi thuyền hướng ra biển lớn, tượng trưng cho tinh thần đoàn kết và khát vọng vươn mình của người dân.',
            'Cung cấp không gian mở lý tưởng cho các hoạt động dạo chơi, giao lưu cộng đồng, thư giãn và chụp ảnh nghệ thuật.'
          ]
        }
      },
      {
        pageNumber: 4,
        title: 'BẢO TÀNG GỐM SỨ MINH LONG',
        subtitle: 'Hành trình kết tinh tinh hoa đất mẹ và văn hóa phương Nam',
        images: [
          {
            url: '/images/handbook/minh-long-1.png',
            caption: 'Hình 4: Không gian trưng bày hiện vật gốm sứ với tủ cúp và vách kính siêu trong hiện đại',
            alt: 'Không gian trưng bày bảo tàng gốm sứ Minh Long'
          },
          {
            url: '/images/handbook/minh-long-2.png',
            caption: 'Hình 5: Bộ sưu tập gốm sứ tinh xảo kết hợp nghệ thuật ánh sáng và kính kiến trúc',
            alt: 'Bộ sưu tập hiện vật gốm sứ Minh Long'
          }
        ],
        content: {
          address: 'Số 333, đường Hưng Định 24, khu phố Hưng Lộc, phường Thuận An, TP. Hồ Chí Minh (Bình Dương cũ)',
          badge: 'Không gian nghệ thuật & Di sản thủ công',
          descriptionPoints: [
            'Không gian trưng bày rộng rãi, kết hợp hài hòa giữa kiến trúc hiện đại, nghệ thuật gốm và thiên nhiên xanh mát.',
            'Nơi lưu giữ hàng nghìn hiện vật gốm sứ độc bản, thể hiện tinh hoa bàn tay tài hoa của nghệ nhân qua các thời kỳ.'
          ],
          quote: {
            text: 'Mỗi tác phẩm kết hợp kỹ thuật - nghệ thuật - mỹ thuật - văn hóa, là câu chuyện sống động về tinh thần sáng tạo, ẩn chứa triết lý nhân sinh của một người suốt đời đam mê gốm sứ cùng đội ngũ.',
            author: 'Lý Ngọc Minh - Nhà sáng lập, Chủ tịch Công ty TNHH Gốm sứ Minh Long I'
          }
        }
      },
      {
        pageNumber: 5,
        title: 'CÁC ĐIỂM ĐẾN NỔI TIẾNG KHÔNG THỂ BỎ QUA',
        subtitle: '4 tọa độ văn hóa - lịch sử ghi dấu ấn đô thị Sài Gòn - TP.HCM',
        images: [
          {
            url: '/images/handbook/buu-dien.jpg',
            caption: 'Hình 1: Bưu điện Thành phố Hồ Chí Minh',
            alt: 'Bưu điện thành phố'
          },
          {
            url: '/images/handbook/pho-di-bo.jpg',
            caption: 'Hình 2: Phố đi bộ Nguyễn Huệ',
            alt: 'Phố đi bộ Nguyễn Huệ'
          },
          {
            url: '/images/handbook/cho-ben-thanh.jpg',
            caption: 'Hình 3: Chợ Bến Thành',
            alt: 'Chợ Bến Thành'
          },
          {
            url: '/images/handbook/dinh-doc-lap.jpg',
            caption: 'Hình 4: Di tích lịch sử Dinh Độc Lập',
            alt: 'Dinh Độc Lập'
          }
        ],
        content: {
          badge: 'Tọa độ văn hóa kinh điển',
          destinationsGrid: [
            {
              name: 'BƯU ĐIỆN THÀNH PHỐ',
              desc: 'Công trình kiến trúc cổ kính với mái vòm độc đáo, biểu tượng check-in kinh điển của du khách trong và ngoài nước.',
              image: '/images/handbook/buu-dien.jpg'
            },
            {
              name: 'PHỐ ĐI BỘ NGUYỄN HUỆ',
              desc: 'Không gian công cộng hiện đại, tâm điểm tổ chức các lễ hội văn hóa, âm nhạc đường phố và sự kiện lớn của đô thị.',
              image: '/images/handbook/pho-di-bo.jpg'
            },
            {
              name: 'CHỢ BẾN THÀNH',
              desc: 'Ngôi chợ trăm tuổi sầm uất, nơi hội tụ trọn vẹn nhịp sống giao thương sôi động và ẩm thực văn hóa bản địa Nam Bộ.',
              image: '/images/handbook/cho-ben-thanh.jpg'
            },
            {
              name: 'DINH ĐỘC LẬP',
              desc: 'Di tích lịch sử quốc gia đặc biệt, nơi lưu giữ những ký ức quan trọng của dòng chảy thời gian và độc lập dân tộc.',
              image: '/images/handbook/dinh-doc-lap.jpg'
            }
          ]
        }
      },
      {
        pageNumber: 6,
        title: 'NHÀ TÙ CÔN ĐẢO',
        subtitle: '"Địa ngục trần gian" – Bản trường ca ý chí bất khuất của dân tộc',
        images: [
          {
            url: '/images/handbook/con-dao-1.webp',
            caption: 'Hình 8: Khu Chuồng Bò - Nơi lao động khổ sai và biệt giam đày ải các chiến sĩ cách mạng',
            alt: 'Khu Chuồng Bò Nhà tù Côn Đảo'
          },
          {
            url: '/images/handbook/con-dao-2.webp',
            caption: 'Hình 9: Hệ thống phòng giam xà lim, cùm chân kiên cố tại di tích lịch sử Côn Đảo',
            alt: 'Hệ thống phòng giam cùm chân Côn Đảo'
          },
          {
            url: '/images/handbook/con-dao-3.webp',
            caption: 'Hình 10: Tái hiện các hình thức tra tấn khốc liệt và tinh thần bất khuất của tù nhân yêu nước',
            alt: 'Hiện vật và hình thức giam cầm tại Côn Đảo'
          }
        ],
        content: {
          badge: 'Di tích Lịch sử Quốc gia Đặc biệt',
          descriptionPoints: [
            'Gắn liền về cuộc đời Chủ tịch Tôn Đức Thắng đầy tài năng và giàu lòng yêu nước khi bị thực dân Pháp bắt giam 15 năm. Tại đây, Bác đã biến nhà tù thực dân thành "trường học cách mạng".',
            'Một biểu tượng của sự tàn bạo và khốc liệt. Với mục đích giam giữ và tra tấn các tù nhân chính trị, các chiến sĩ cách mạng và những người dân yêu nước, Côn Đảo đã được xây dựng trở thành nhà tù nổi tiếng với các hình thức giam cầm, tra tấn dã man.',
            'Dù bị giam giữ trong điều kiện khắc nghiệt, những người yêu nước tại Côn Đảo không hề khuất phục. Họ biến nơi đây thành “trường học cách mạng”, nơi hun đúc ý chí, tổ chức các phong trào đấu tranh và nuôi dưỡng lý tưởng độc lập, tự do cho dân tộc.'
          ]
        }
      }
    ]
  },
  en: {
    language: 'en',
    languageName: 'English',
    flag: '🇬🇧',
    documentTitle: 'EXPLORE DESTINATIONS HO CHI MINH CITY',
    documentSubtitle: 'Visual Handbook of Heritage, Architecture & Local Tourism',
    pageCount: 6,
    pages: [
      {
        pageNumber: 1,
        title: 'EXPLORE DESTINATIONS',
        subtitle: 'HO CHI MINH CITY',
        coverImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1400&q=80',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1400&q=80',
            caption: 'Independence Palace - A special national historical monument in District 1, HCMC',
            alt: 'Independence Palace Ho Chi Minh City'
          }
        ],
        content: {
          heading: 'Southern Heritage Journey',
          descriptionPoints: [
            'A curated visual handbook showcasing iconic architectural wonders, linked cultural spaces, and renowned historical landmarks.',
            'Integrated into the HCMC Local Education Curriculum - Fostering sustainable tourism development and cultural appreciation.'
          ]
        }
      },
      {
        pageNumber: 2,
        title: 'NOTRE-DAME CATHEDRAL SAIGON',
        subtitle: 'A renowned architectural and religious symbol of Saigon',
        images: [
          {
            url: '/images/handbook/duc-ba-1.jpg',
            caption: 'Image 1: Notre-Dame Cathedral Saigon with its majestic bell towers and Virgin Mary statue',
            alt: 'Notre-Dame Cathedral Saigon by day'
          },
          {
            url: '/images/handbook/duc-ba-2.jpg',
            caption: 'Image 2: Historic bell tower architecture and brilliant illumination celebrating Christmas',
            alt: 'Notre-Dame Cathedral illuminated bell towers'
          }
        ],
        content: {
          address: 'No. 01 Paris Commune Square, Saigon Ward (old District 1), Ho Chi Minh City',
          badge: 'Classic French Romanesque-Gothic Architecture',
          descriptionPoints: [
            'A renowned architectural and religious symbol of Saigon.',
            'Over 3,400 m² in area, built in a distinctly classical French architectural style with original Marseille imported bricks.',
            'Notre-Dame Cathedral Saigon is brilliantly illuminated with a 1,000-km LED light system to celebrate Christmas 2025.'
          ],
          poem: {
            lines: [
              'The cathedral bell rings from afar, mysterious and clear,',
              'Notre-Dame! Your beauty is infinitely grand.',
              'The long áo dài of young women flutters in the air,',
              'On a gentle afternoon, you walk together with the breeze.'
            ],
            title: 'Saigon Afternoon',
            poet: 'Dang Minh Mai'
          }
        }
      },
      {
        pageNumber: 3,
        title: 'TAM THANG SQUARE',
        subtitle: 'An iconic open waterfront space embodying oceanward aspirations',
        images: [
          {
            url: '/images/handbook/tam-thang-1.jpg',
            caption: 'Image 3: Tam Thang Tower soaring with vibrant illuminated colors by the sea with 143 symbolic pillars',
            alt: 'Tam Thang Square by night'
          }
        ],
        content: {
          badge: 'Area of over 16,700 m²',
          descriptionPoints: [
            'Tam Thang Tower carries within it historical stories linked to three ancient villages, Thang Nhat, Thang Nhi, and Thang Tam, during King Gia Long’s reign.',
            'This was originally the foundation for forming Vung Tau City today.',
            'The project design draws inspiration from the image of three boat prows heading toward the open sea, symbolizing the spirit of unity and the aspirations of the people.',
            'Covering over 16,700 m², Tam Thang Square provides an ideal open space for strolling, relaxation, and photography.'
          ]
        }
      },
      {
        pageNumber: 4,
        title: 'MINH LONG CERAMIC MUSEUM',
        subtitle: 'A journey capturing the soul of clay and Southern craftsmanship',
        images: [
          {
            url: '/images/handbook/minh-long-1.png',
            caption: 'Image 4: Modern exhibition hall featuring ultra-clear architectural glass display cabinets',
            alt: 'Minh Long Ceramic Museum exhibition hall'
          },
          {
            url: '/images/handbook/minh-long-2.png',
            caption: 'Image 5: Exquisite porcelain collection enhanced by specialized architectural lighting',
            alt: 'Minh Long porcelain collection display'
          }
        ],
        content: {
          address: 'No. 333, Hung Minh 24 Street, Hung Loc Quarter, Thuan An Ward, Ho Chi Minh City (formerly Binh Duong Province).',
          badge: 'Artisan Heritage & Ceramic Art Space',
          descriptionPoints: [
            'A spacious exhibition space that harmoniously combines modern architecture, ceramic art, and fresh green nature.',
            'Home to thousands of one-of-a-kind porcelain masterpieces, reflecting centuries of Vietnamese ceramic mastery.'
          ],
          quote: {
            text: 'Each artwork combines technique, art, aesthetics, and culture, telling a vivid story of creative spirit and embodying the life philosophy of someone who has devoted a lifetime to ceramics alongside their team.',
            author: 'Lý Ngọc Minh - Founder and Chairman of Minh Long I Ceramic Company'
          }
        }
      },
      {
        pageNumber: 5,
        title: 'FAMOUS DESTINATIONS YOU CANNOT MISS',
        subtitle: '4 key historical and cultural landmarks shaping the pulse of Saigon - HCMC',
        images: [
          {
            url: '/images/handbook/buu-dien.jpg',
            caption: 'Image 1: Saigon Central Post Office',
            alt: 'Saigon Central Post Office'
          },
          {
            url: '/images/handbook/pho-di-bo.jpg',
            caption: 'Image 2: Nguyen Hue Walking Street',
            alt: 'Nguyen Hue Walking Street'
          },
          {
            url: '/images/handbook/cho-ben-thanh.jpg',
            caption: 'Image 3: Ben Thanh Market',
            alt: 'Ben Thanh Market'
          },
          {
            url: '/images/handbook/dinh-doc-lap.jpg',
            caption: 'Image 4: Independence Palace',
            alt: 'Independence Palace'
          }
        ],
        content: {
          badge: 'Classic Landmarks of Saigon',
          destinationsGrid: [
            {
              name: 'CITY POST OFFICE',
              desc: 'A classic architectural work with a unique vaulted roof, an iconic check-in destination for tourists.',
              image: '/images/handbook/buu-dien.jpg'
            },
            {
              name: 'NGUYEN HUE WALKING STREET',
              desc: 'A modern public space and focal point for cultural festivals and major events.',
              image: '/images/handbook/pho-di-bo.jpg'
            },
            {
              name: 'BEN THANH MARKET',
              desc: 'A hundred-year-old bustling market where authentic commerce and local cultural rhythms converge.',
              image: '/images/handbook/cho-ben-thanh.jpg'
            },
            {
              name: 'INDEPENDENCE PALACE',
              desc: 'A national historical monument preserving important memories across the flow of time.',
              image: '/images/handbook/dinh-doc-lap.jpg'
            }
          ]
        }
      },
      {
        pageNumber: 6,
        title: 'CON DAO PRISON',
        subtitle: '"Earthly Hell" – An Epic of Unbreakable Will and Patriotism',
        images: [
          {
            url: '/images/handbook/con-dao-1.webp',
            caption: 'Image 8: Cow Sheds area - Site of grueling forced labor and harsh solitary confinement for patriots',
            alt: 'Con Dao Cow Sheds historical prison'
          },
          {
            url: '/images/handbook/con-dao-2.webp',
            caption: 'Image 9: Fortified cells, solitary confinement blocks, and leg shackles at Con Dao historic site',
            alt: 'Con Dao prison cells and shackles'
          },
          {
            url: '/images/handbook/con-dao-3.webp',
            caption: 'Image 10: Depicting severe torture regimes and the unyielding revolutionary spirit of patriots',
            alt: 'Historic imprisonment artifacts at Con Dao'
          }
        ],
        content: {
          badge: 'Special National Historical Relic',
          descriptionPoints: [
            'Connected to the life of Chairman Ton Duc Thang, a talented and patriotic leader who was imprisoned by the French colonialists for 15 years. Here, Uncle Ho transformed the colonial prison into a ‘revolutionary school.’',
            'A symbol of cruelty and brutality. Built to imprison and torture political prisoners, revolutionary soldiers, and patriotic citizens, Con Dao became a notorious prison known for savage forms of imprisonment and torture.',
            'Despite being detained under harsh conditions, patriotic people in Con Dao never surrendered. They transformed this place into a ‘revolutionary school,’ forging their willpower, organizing resistance movements, and nurturing ideals of independence and freedom for the nation.'
          ]
        }
      }
    ]
  }
};
