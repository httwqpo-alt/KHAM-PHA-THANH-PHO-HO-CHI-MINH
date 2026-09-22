export interface CuisineDishItem {
  id: string;
  name: string;
  desc: string;
  image: string;
  alt: string;
  originBadge?: string;
}

export interface CuisineHandbookPage {
  pageNumber: number;
  type: 'cover' | 'page-vung-tau' | 'page-nam-bo' | 'page-binh-duong' | 'page-sai-gon';
  title: string;
  subtitle?: string;
  dishes: CuisineDishItem[];
  coverImage?: string;
}

export interface CuisineHandbookLanguageData {
  lang: 'vi' | 'en';
  title: string;
  badge: string;
  pages: CuisineHandbookPage[];
}

export const BILINGUAL_CUISINE_DATA: Record<'vi' | 'en', CuisineHandbookLanguageData> = {
  vi: {
    lang: 'vi',
    title: 'ẨM THỰC HỒ CHÍ MINH',
    badge: 'Cẩm nang Song ngữ Ẩm thực Nam Bộ & Sài Gòn',
    pages: [
      {
        pageNumber: 1,
        type: 'cover',
        title: 'ẨM THỰC',
        subtitle: 'Hồ Chí Minh',
        coverImage: '/images/cuisine/cuisine-cover.jpg',
        dishes: []
      },
      {
        pageNumber: 2,
        type: 'page-vung-tau',
        title: 'ĐẶC SẢN BIỂN VÀ MÓN NGON VŨNG TÀU',
        subtitle: 'Các món ngon nổi tiếng từ vùng biển ôn hòa và các loại bánh đặc sản',
        dishes: [
          {
            id: 'banh-khot',
            name: 'BÁNH KHỌT',
            desc: 'Món bánh tròn nhỏ, vỏ giòn rụm, nhân tôm tươi và ăn kèm nhiều rau sống.',
            image: '/images/cuisine/banh-khot.jpg',
            alt: 'Bánh khọt Vũng Tàu giòn rụm nhân tôm tươi',
            originBadge: 'Vũng Tàu'
          },
          {
            id: 'banh-bong-lan-trung-muoi',
            name: 'BÁNH BÔNG LAN TRỨNG MUỐI',
            desc: 'Món bánh ngọt đặc sản vô cùng nổi tiếng của Vũng Tàu, nổi bật với cốt bánh bông lan mềm xốp, ngọt dịu kết hợp cùng vị mặn béo của trứng muối và sốt phô mai hoặc chà bông.',
            image: '/images/cuisine/banh-bong-lan.jpg',
            alt: 'Bánh bông lan trứng muối mềm xốp sốt phô mai',
            originBadge: 'Vũng Tàu'
          },
          {
            id: 'hai-san-vung-tau',
            name: 'HẢI SẢN VŨNG TÀU',
            desc: 'Hải sản Vũng Tàu nổi tiếng nhờ nguồn hải sản đánh bắt trực tiếp từ vùng biển ôn hòa, luôn tươi sống và có giá thành hợp lý hơn so với các thành phố lớn.',
            image: '/images/cuisine/hai-san-vung-tau.jpg',
            alt: 'Mâm hải sản tươi sống Vũng Tàu đa dạng',
            originBadge: 'Vũng Tàu'
          },
          {
            id: 'lau-ca-duoi',
            name: 'LẨU CÁ ĐUỐI',
            desc: 'Lẩu cá đuối là món đặc sản nổi tiếng tại Vũng Tàu với nước lẩu chua thanh, đậm đà từ măng chua và thịt cá đuối tươi giòn, sần sật.',
            image: '/images/cuisine/lau-ca-duoi.jpg',
            alt: 'Nồi lẩu cá đuối măng chua đậm đà giòn ngọt',
            originBadge: 'Vũng Tàu'
          }
        ]
      },
      {
        pageNumber: 3,
        type: 'page-nam-bo',
        title: 'MÓN NGON ĐỒNG QUÊ & NAM BỘ',
        subtitle: 'Sự sáng tạo tinh tế từ các nguyên liệu thiên nhiên Nam Bộ trù phú',
        dishes: [
          {
            id: 'ga-quay-xoi-phong',
            name: 'GÀ QUAY XÔI PHỒNG',
            desc: 'Đĩa xôi chiên phồng to tròn như một quả bóng, ruột rỗng, bên ngoài vàng ươm giòn rụm, ăn kèm với thịt gà ta quay da bánh mật ngọt lịm, mọng nước và chắc thịt.',
            image: '/images/cuisine/ga-xoi-phong.jpg',
            alt: 'Gà quay xôi phồng vàng ươm giòn rụm',
            originBadge: 'Nam Bộ'
          },
          {
            id: 'goi-ngo-luc-binh',
            name: 'GỎI NGÓ LỤC BÌNH',
            desc: 'Ngó lục bình bào mỏng có đặc trưng xốp nhẹ, mọng nước, giữ độ giòn sần sật tự nhiên, không bị dai và thấm đượm vị chua ngọt thanh mát của nước trộn, ăn kèm với tôm và thịt luộc.',
            image: '/images/cuisine/goi-luc-binh.jpg',
            alt: 'Gỏi ngó lục bình tôm thịt chua ngọt thanh mát',
            originBadge: 'Miền Tây - Nam Bộ'
          },
          {
            id: 'goi-ga-mang-cut',
            name: 'GỎI GÀ MĂNG CỤT',
            desc: 'Ruột măng cụt xanh đạt độ giòn rôm rốp, vị chua ngọt thanh tao, không chát, kết hợp với thịt gà thả vườn xé phay săn chắc, da giòn sần sật',
            image: '/images/cuisine/goi-mang-cut.jpg',
            alt: 'Gỏi gà măng cụt xanh giòn rôm rốp da gà sần sật',
            originBadge: 'Lái Thiêu - Nam Bộ'
          }
        ]
      },
      {
        pageNumber: 4,
        type: 'page-binh-duong',
        title: 'MÓN NGON ĐẶC TRƯNG BÌNH DƯƠNG',
        subtitle: 'Nét văn hóa ẩm thực truyền thống kết nối vùng phụ cận Đông Nam Bộ',
        dishes: [
          {
            id: 'banh-beo-bi',
            name: 'BÁNH BÈO BÌ',
            desc: 'Bánh bèo chén đúc đặc bùi mướt, phủ ngập lớp bì heo xắt mảnh như sợi chỉ, thấm thính thơm lừng, chấm nước mắm chua ngọt pha loãng cay nhẹ.',
            image: '/images/cuisine/banh-beo-bi.jpg',
            alt: 'Bánh bèo bì chén đúc bùi béo bì heo thơm thính',
            originBadge: 'Bình Dương'
          },
          {
            id: 'banh-chi',
            name: 'BÁNH CHỊ',
            desc: 'Một món ăn đặc trưng được làm từ những nguyên liệu đơn giản như bột năng và hành lá, và được chế biến một cách khéo léo bởi người dân Bình Dương.',
            image: '/images/cuisine/banh-chi.jpg',
            alt: 'Bánh chị chiên hành lá đặc trưng người Bình Dương',
            originBadge: 'Bình Dương'
          },
          {
            id: 'lau-bo-mam-ruoc',
            name: 'LẨU BÒ MẮM RUỐC',
            desc: 'Nước lẩu dậy mùi mắm ruốc nồng nàn, đậm đà, béo ngậy vị tóp mỡ và sả băm; thịt bò nhúng vào mềm tan, thấm vị, ăn kèm rau lang, rau muống sông rất hợp.',
            image: '/images/cuisine/lau-bo-ruoc.jpg',
            alt: 'Nồi lẩu bò mắm ruốc nồng nàn tóp mỡ sả băm',
            originBadge: 'Bình Dương'
          }
        ]
      },
      {
        pageNumber: 5,
        type: 'page-sai-gon',
        title: 'ẨM THỰC BIỂU TƯỢNG SÀI GÒN',
        subtitle: 'Những món ăn đường phố nức tiếng gắn liền với nhịp sống năng động',
        dishes: [
          {
            id: 'com-tam-sai-gon',
            name: 'CƠM TẤM SÀI GÒN',
            desc: 'Món ăn biểu tượng của Sài Gòn với hạt tấm tơi xốp, sườn nướng mỡ hành thơm phức, bì, chả và nước mắm chua ngọt',
            image: '/images/cuisine/com-tam.jpg',
            alt: 'Đĩa cơm tấm sườn nướng mỡ hành bì chả Sài Gòn',
            originBadge: 'Sài Gòn - TP.HCM'
          },
          {
            id: 'banh-mi-sai-gon',
            name: 'BÁNH MÌ SÀI GÒN',
            desc: 'Ổ bánh mì vỏ giòn tan nhân pate, chả lụa, thịt nguội và đồ chua đậm đà.',
            image: '/images/cuisine/banh-mi.jpg',
            alt: 'Ổ bánh mì Sài Gòn vỏ giòn tan nhân pate chả lụa',
            originBadge: 'Sài Gòn - TP.HCM'
          },
          {
            id: 'pha-lau',
            name: 'PHÁ LẤU',
            desc: 'Món nội tạng nấu với ngũ vị hương, nước cốt dừa béo ngậy, ăn kèm bánh mì hoặc mì tôm.',
            image: '/images/cuisine/pha-lau.jpg',
            alt: 'Tô phá lấu bò nước cốt dừa ngũ vị ăn kèm bánh mì',
            originBadge: 'Sài Gòn - TP.HCM'
          }
        ]
      }
    ]
  },
  en: {
    lang: 'en',
    title: 'CUISINE HO CHI MINH',
    badge: 'Bilingual Culinary Guide: Saigon & Southern Vietnam',
    pages: [
      {
        pageNumber: 1,
        type: 'cover',
        title: 'CUISINE',
        subtitle: 'Ho Chi Minh',
        coverImage: '/images/cuisine/cuisine-cover.jpg',
        dishes: []
      },
      {
        pageNumber: 2,
        type: 'page-vung-tau',
        title: 'VUNG TAU COASTAL SPECIALTIES',
        subtitle: 'Famous delicacies from the temperate coastline and beloved cakes',
        dishes: [
          {
            id: 'banh-khot',
            name: 'BÁNH KHỌT',
            desc: 'A small, round cake with a crisp shell, fresh shrimp filling, and plenty of fresh herbs.',
            image: '/images/cuisine/banh-khot.jpg',
            alt: 'Crispy Vietnamese mini savory pancakes Banh Khot with shrimp',
            originBadge: 'Vung Tau'
          },
          {
            id: 'banh-bong-lan-trung-muoi',
            name: 'BÁNH BÔNG LAN TRỨNG MUỐI',
            desc: 'A beloved Vung Tau specialty with a soft, airy sponge cake, gently sweetened and paired with the rich, savory flavor of salted egg and cheese sauce or pork floss.',
            image: '/images/cuisine/banh-bong-lan.jpg',
            alt: 'Salted egg yolk sponge cake with cheese sauce and pork floss',
            originBadge: 'Vung Tau'
          },
          {
            id: 'hai-san-vung-tau',
            name: 'HẢI SẢN VŨNG TÀU',
            desc: 'Vung Tau seafood is famous for its fresh catch from the temperate sea, served fresh and at more affordable prices than in larger cities.',
            image: '/images/cuisine/hai-san-vung-tau.jpg',
            alt: 'Freshly harvested Vung Tau seafood platter',
            originBadge: 'Vung Tau'
          },
          {
            id: 'lau-ca-duoi',
            name: 'LẨU CÁ ĐUỐI',
            desc: 'Stingray hot pot is a famous Vung Tau specialty, with a bright, tangy broth enriched by sour bamboo shoots and fresh, pleasantly chewy stingray.',
            image: '/images/cuisine/lau-ca-duoi.jpg',
            alt: 'Tangy and savory stingray hot pot with pickled bamboo shoots',
            originBadge: 'Vung Tau'
          }
        ]
      },
      {
        pageNumber: 3,
        type: 'page-nam-bo',
        title: 'SOUTHERN HOMELAND SPECIALTIES',
        subtitle: 'Ingenious delicacies born from bountiful Southern ingredients',
        dishes: [
          {
            id: 'ga-quay-xoi-phong',
            name: 'GÀ QUAY XÔI PHỒNG',
            desc: 'A large, round plate of puffed sticky rice, hollow inside and golden-crisp outside, served with honey-glazed roast chicken that is juicy and tender.',
            image: '/images/cuisine/ga-xoi-phong.jpg',
            alt: 'Golden puffed fried sticky rice served with roast chicken',
            originBadge: 'Southern Vietnam'
          },
          {
            id: 'goi-ngo-luc-binh',
            name: 'GỎI NGÓ LỤC BÌNH',
            desc: 'Thinly shaved water hyacinth stems are lightly porous and juicy, naturally crisp and springy rather than tough, and coated in a cool, delicately sweet-and-sour dressing with shrimp and boiled pork.',
            image: '/images/cuisine/goi-luc-binh.jpg',
            alt: 'Crisp water hyacinth salad with shrimp and sliced pork',
            originBadge: 'Mekong Delta'
          },
          {
            id: 'goi-ga-mang-cut',
            name: 'GỎI GÀ MĂNG CỤT',
            desc: 'Green mangosteen flesh is delightfully crisp, delicately sweet and sour, and not astringent, paired with firm shredded free-range chicken and wonderfully crunchy skin.',
            image: '/images/cuisine/goi-mang-cut.jpg',
            alt: 'Green mangosteen salad with shredded chicken and herbs',
            originBadge: 'Lai Thieu - South'
          }
        ]
      },
      {
        pageNumber: 4,
        type: 'page-binh-duong',
        title: 'DISTINCTIVE BINH DUONG DELICACIES',
        subtitle: 'Traditional culinary heritage connecting the greater southeastern region',
        dishes: [
          {
            id: 'banh-beo-bi',
            name: 'BÁNH BÈO BÌ',
            desc: 'Bánh bèo chén is tender and rich, topped with finely shredded pork skin fragrant with toasted rice powder, then dipped in a lightly spicy, diluted sweet-and-sour fish sauce.',
            image: '/images/cuisine/banh-beo-bi.jpg',
            alt: 'Savory steamed rice cake topped with shredded pork skin',
            originBadge: 'Binh Duong'
          },
          {
            id: 'banh-chi',
            name: 'BÁNH CHỊ',
            desc: 'A local specialty made from simple ingredients such as tapioca starch and scallions, skillfully prepared by the people of Bình Dương.',
            image: '/images/cuisine/banh-chi.jpg',
            alt: 'Hand dipping pan-fried tapioca scallion cake into chili sauce',
            originBadge: 'Binh Duong'
          },
          {
            id: 'lau-bo-mam-ruoc',
            name: 'LẨU BÒ MẮM RUỐC',
            desc: 'The hot pot broth is richly fragrant with shrimp paste, rounded out by the buttery richness of pork cracklings and minced lemongrass; the beef becomes tender and flavorful, especially with sweet potato leaves and water spinach.',
            image: '/images/cuisine/lau-bo-ruoc.jpg',
            alt: 'Claypot beef hot pot with fermented shrimp paste and lemongrass',
            originBadge: 'Binh Duong'
          }
        ]
      },
      {
        pageNumber: 5,
        type: 'page-sai-gon',
        title: 'ICONIC SAIGON CUISINE',
        subtitle: 'World-renowned street food defining Saigon’s energetic rhythm',
        dishes: [
          {
            id: 'com-tam-sai-gon',
            name: 'CƠM TẤM SÀI GÒN',
            desc: 'Saigon’s iconic dish of fluffy broken rice, fragrant grilled pork chop with scallion oil, pork skin, steamed pork pâté, and sweet-and-sour fish sauce.',
            image: '/images/cuisine/com-tam.jpg',
            alt: 'Classic Saigon broken rice plate with grilled pork chop and scallion oil',
            originBadge: 'Saigon - HCMC'
          },
          {
            id: 'banh-mi-sai-gon',
            name: 'BÁNH MÌ SÀI GÒN',
            desc: 'A crisp baguette filled with pâté, chả lụa, cold cuts, and richly seasoned pickles.',
            image: '/images/cuisine/banh-mi.jpg',
            alt: 'Crisp Vietnamese Saigon baguette with cold cuts and pate',
            originBadge: 'Saigon - HCMC'
          },
          {
            id: 'pha-lau',
            name: 'PHÁ LẤU',
            desc: 'A dish of offal simmered with five-spice, rich coconut milk, and served with bánh mì or instant noodles.',
            image: '/images/cuisine/pha-lau.jpg',
            alt: 'Saigon braised offal in coconut five-spice curry with baguette',
            originBadge: 'Saigon - HCMC'
          }
        ]
      }
    ]
  }
};
