/* ==========================================================================
   MAIN JAVASCRIPT: TƯ VẤN SỨC KHỎE CHỦ ĐỘNG & Y HỌC LỐI SỐNG
   Architecture: Vanilla ES6+, Dual-Fetch (Server JSON + file:// Fallback)
   ========================================================================== */

/**
 * 1. CẤU HÌNH THƯƠNG HIỆU TẬP TRUNG (SITE_CONFIG)
 * Đã tích hợp sẵn thông tin và hình ảnh thực tế của BS. Nguyễn Thị Như Nguyện (Phong cách giản dị, khiêm nhường)
 */
const SITE_CONFIG = {
  brandName: "Sống Khỏe Chủ Động Cùng BS. Như Nguyện",
  tagline: "Chăm sóc sức khỏe từ gốc – Kiến tạo lối sống khoa học mỗi ngày",
  specialistName: "BS. Nguyễn Thị Như Nguyện",
  specialistRole: "Bác sĩ đồng hành Tư vấn Sức khỏe Chủ động & Lối sống Khoa học",
  zaloPhone: "0911011355", // Kết nối trực tiếp tới https://zalo.me/0911011355
  email: "miranhunguyen@gmail.com",
  address: "Tư vấn Trực tuyến Toàn quốc & Trực tiếp tại TP. Huế",
  logoImage: "",
  portraitImage: "./assets/images/chan-dung-bs-nhu-nguyen-cdyt-hue.jpg",
  showPortraitDefault: true
};

/**
 * 2. DỮ LIỆU DỰ PHÒNG NHÚNG SẴN (FALLBACK DATA)
 * Đảm bảo website hoạt động 100% ngay cả khi mở trực tiếp bằng giao thức file:// trên máy tính.
 */
const FALLBACK_CONTENT_DATA = {
  "meta": {
    "version": "1.0.0",
    "lastUpdated": "2026-10-26",
    "sourceNote": "Dữ liệu mẫu chuẩn Y học Lối sống & Y học Chứng cứ - Dễ dàng mở rộng và cập nhật"
  },
  "pillars": [
    {
      "id": "pillar-nutrition",
      "number": "01",
      "title": "Dinh dưỡng Cân bằng & Thực phẩm Toàn phần",
      "shortDesc": "Ưu tiên thực phẩm tự nhiên ít chế biến, cân đối đa lượng - vi lượng và phân bổ đủ đạm chất lượng cao cho từng bữa ăn.",
      "mechanism": "Ổn định đường huyết sau ăn, giảm phản ứng viêm mạn tính cấp độ thấp và cung cấp nguyên liệu tái tạo mô, duy trì khối cơ.",
      "icon": "nutrition",
      "sourceStatus": "Nội dung mẫu minh họa chuyên môn"
    },
    {
      "id": "pillar-movement",
      "number": "02",
      "title": "Vận động Thể chất Đều đặn & An toàn",
      "shortDesc": "Kết hợp tập kháng lực bảo vệ cơ xương khớp, Pilates kiểm soát trục cơ thể và vận động nhịp điệu (Cardio) phù hợp thể trạng.",
      "mechanism": "Kích hoạt kênh vận chuyển glucose GLUT4 tại màng tế bào cơ, cải thiện độ nhạy insulin và tăng cường sức bền tim mạch - hô hấp.",
      "icon": "movement",
      "sourceStatus": "Nội dung mẫu minh họa chuyên môn"
    },
    {
      "id": "pillar-sleep",
      "number": "03",
      "title": "Giấc ngủ Phục hồi Theo Nhịp Sinh học",
      "shortDesc": "Thiết lập đồng hồ sinh học (Circadian Rhythm) đồng bộ với ánh sáng tự nhiên, tối ưu chất lượng giấc ngủ sâu mỗi đêm.",
      "mechanism": "Điều hòa trục nội tiết Hạ đồi - Tuyến yên - Thượng thận (HPA), cân bằng hormone Leptin - Ghrelin và hỗ trợ hệ thống dọn dẹp thần kinh (Glymphatic).",
      "icon": "sleep",
      "sourceStatus": "Nội dung mẫu minh họa chuyên môn"
    },
    {
      "id": "pillar-hydration",
      "number": "04",
      "title": "Hydrat hóa Tế bào Đúng Cách",
      "shortDesc": "Bổ sung nước theo nhu cầu sinh lý cơ thể, chia nhỏ lượng uống đều đặn trong ngày thay vì đợi khát mới uống dồn dập.",
      "mechanism": "Duy trì áp suất thẩm thấu huyết tương ổn định, đảm bảo tưới máu mô và hỗ trợ quá trình trao đổi chất nội bào mà không gây quá tải lọc cầu thận.",
      "icon": "hydration",
      "sourceStatus": "Nội dung mẫu minh họa chuyên môn"
    },
    {
      "id": "pillar-stress",
      "number": "05",
      "title": "Quản lý Căng thẳng & Sức khỏe Tinh thần",
      "shortDesc": "Ứng dụng kỹ thuật thở cơ hoành, thư giãn chủ động và sắp xếp nhịp làm việc - nghỉ ngơi hợp lý cho người bận rộn.",
      "mechanism": "Kích hoạt hệ thần kinh đối giao cảm (dây thần kinh phế vị - Vagus nerve), giảm nồng độ cortisol kéo dài và ổn định nhịp tim.",
      "icon": "stress",
      "sourceStatus": "Nội dung mẫu minh họa chuyên môn"
    },
    {
      "id": "pillar-connection",
      "number": "06",
      "title": "Kết nối Cộng đồng & Thói quen Tích cực",
      "shortDesc": "Đồng hành trong môi trường văn minh, khích lệ nhau duy trì kỷ luật sống khỏe cùng gia đình và những người cùng chí hướng.",
      "mechanism": "Tăng cường gắn kết xã hội lành mạnh, củng cố động lực nội tại và duy trì hành vi sức khỏe bền vững qua từng giai đoạn cuộc sống.",
      "icon": "connection",
      "sourceStatus": "Nội dung mẫu minh họa chuyên môn"
    }
  ],
  "services": [
    {
      "id": "srv-assessment",
      "badge": "[NỘI DUNG MẪU - TÙY CHỈNH THEO THỰC TẾ]",
      "title": "Đánh giá Thói quen & Lối sống Tổng quát 1:1",
      "targetAudience": "Dành cho người mới bắt đầu muốn nhìn nhận toàn diện bức tranh sức khỏe hiện tại và xác định ưu tiên thay đổi.",
      "duration": "Buổi tư vấn chuyên sâu 45 - 60 phút (Trực tuyến hoặc Trực tiếp)",
      "fee": "[LIÊN HỆ TƯ VẤN]",
      "highlights": [
        "Phân tích thói quen ăn uống, lượng nước uống, giấc ngủ và mức độ vận động hàng ngày",
        "Đánh giá các yếu tố nguy cơ lối sống đối với chuyển hóa và năng lượng làm việc",
        "Xác định 3 mục tiêu thay đổi khả thi nhất trong 30 ngày đầu tiên",
        "Bàn giao bản tóm tắt định hướng lối sống cá nhân hóa sau buổi tư vấn"
      ],
      "sourceStatus": "Nội dung mẫu minh họa chuyên môn"
    },
    {
      "id": "srv-nutrition",
      "badge": "[NỘI DUNG MẪU - TÙY CHỈNH THEO THỰC TẾ]",
      "title": "Tư vấn Dinh dưỡng Cân bằng & Kiểm soát Chuyển hóa",
      "targetAudience": "Dành cho người làm việc văn phòng, người trung niên muốn cải thiện vóc dáng, kiểm soát cân nặng khoa học và duy trì khối cơ.",
      "duration": "Chương trình đồng hành theo lộ trình 4 - 12 tuần",
      "fee": "[LIÊN HỆ TƯ VẤN]",
      "highlights": [
        "Hướng dẫn cấu trúc đĩa ăn cân bằng (Đạm - Xơ - Tinh bột hấp thu chậm - Chất béo tốt)",
        "Cá nhân hóa lượng đạm (Protein) và nước theo cân nặng, độ tuổi và mức vận động",
        "Giải pháp lựa chọn bữa ăn linh hoạt khi đi làm, tiếp khách hoặc bận rộn",
        "Theo dõi sát sao cảm giác no, mức năng lượng và điều chỉnh thực đơn hàng tuần"
      ],
      "sourceStatus": "Nội dung mẫu minh họa chuyên môn"
    },
    {
      "id": "srv-movement",
      "badge": "[NỘI DUNG MẪU - TÙY CHỈNH THEO THỰC TẾ]",
      "title": "Thiết kế Lộ trình Vận động Cá nhân hóa tại nhà (Kháng lực, Pilates, Bạt nhún/Cardio an toàn)",
      "targetAudience": "Dành cho người ít vận động, người muốn tăng cơ giảm mỡ an toàn hoặc cần bài tập bảo vệ cột sống và khớp gối.",
      "duration": "Thiết kế lộ trình & hướng dẫn kỹ thuật định kỳ",
      "fee": "[LIÊN HỆ TƯ VẤN]",
      "highlights": [
        "Đánh giá tư thế cơ bản, độ linh hoạt khớp và sức mạnh nhóm cơ trọng tâm (Core)",
        "Kết hợp bài tập kháng lực chân - thân trên, Pilates căn chỉnh trục cơ thể và Cardio vừa sức",
        "Hướng dẫn kiểm soát nhịp thở và vùng nhịp tim an toàn trong suốt buổi tập",
        "Lịch tập ngắn gọn 20 - 30 phút/ngày, dễ thực hiện ngay tại nhà mà không cần thiết bị phức tạp"
      ],
      "sourceStatus": "Nội dung mẫu minh họa chuyên môn"
    },
    {
      "id": "srv-circadian",
      "badge": "[NỘI DUNG MẪU - TÙY CHỈNH THEO THỰC TẾ]",
      "title": "Đồng hành Xây dựng Nhịp sinh học, Giấc ngủ & Thói quen Sống khỏe Chủ động",
      "targetAudience": "Dành cho người hay mệt mỏi vào buổi chiều, khó vào giấc ngủ sâu hoặc gia đình muốn thiết lập nếp sống khoa học.",
      "duration": "Đồng hành 1:1 hoặc nhóm gia đình trong 21 - 60 ngày",
      "fee": "[LIÊN HỆ TƯ VẤN]",
      "highlights": [
        "Thiết lập quy trình Vệ sinh giấc ngủ (Sleep Hygiene) và tiếp xúc ánh sáng tự nhiên buổi sáng",
        "Xây dựng lịch uống nước sinh lý theo từng khung giờ hoạt động trong ngày",
        "Thực hành kỹ thuật thư giãn hệ thần kinh đối giao cảm trước giờ đi ngủ",
        "Đồng hành nhắc nhở nhẹ nhàng, tháo gỡ rào cản tâm lý để biến kiến thức thành thói quen tự nhiên"
      ],
      "sourceStatus": "Nội dung mẫu minh họa chuyên môn"
    }
  ],
  "articles": [
    {
      "id": "art-hydration-physiology",
      "title": "[Sinh lý học về nước] Uống nước thế nào để tế bào thực sự hấp thu và giảm tải cho thận?",
      "category": "Giấc ngủ & Nước",
      "readTime": "6 phút đọc",
      "publishDate": "15/10/2026",
      "author": "BS. Nguyễn Thị Như Nguyện",
      "summary": "Giải mã cơ chế cân bằng dịch nội bào - ngoại bào dưới góc nhìn sinh lý học: vì sao uống dồn một lượng nước lớn cùng lúc lại kích thích lợi tiểu nhanh thay vì cấp nước bền vững cho mô cơ thể.",
      "tags": [
        "Hydrat hóa",
        "Sinh lý thận",
        "Áp suất thẩm thấu",
        "Y học cơ sở"
      ],
      "sourceStatus": "Nội dung mẫu minh họa chuyên môn",
      "sections": [
        {
          "heading": "1. Phân bố dịch trong cơ thể và vai trò của áp suất thẩm thấu",
          "content": "Trong cơ thể người trưởng thành, nước chiếm khoảng 55% đến 60% trọng lượng cơ thể và được phân bố vào hai khu vực chính: dịch nội bào (chiếm khoảng 2/3 tổng lượng nước, nằm bên trong hàng chục nghìn tỷ tế bào) và dịch ngoại bào (chiếm 1/3 còn lại, bao gồm huyết tương trong lòng mạch và dịch kẽ bao quanh tế bào). Sự di chuyển của nước qua màng bán thấm tế bào được quyết định bởi sự chênh lệch áp suất thẩm thấu — chủ yếu phụ thuộc vào nồng độ các chất điện giải như Natri (Na+) ở dịch ngoại bào và Kali (K+) ở dịch nội bào."
        },
        {
          "heading": "2. Điều gì xảy ra khi chúng ta uống một lượng nước quá lớn trong thời gian ngắn?",
          "content": "Khi bạn đợi đến lúc thật khát mới uống dồn dập 500ml - 700ml nước lọc chỉ trong vài phút, lượng nước này nhanh chóng hấp thu qua niêm mạc ruột vào máu, làm pha loãng huyết tương tạm thời và gây giảm nhẹ áp suất thẩm thấu ngoại bào. Ngay lập tức, các thụ thể thẩm thấu tại vùng dưới đồi (Hypothalamus) nhận diện tín hiệu này và ức chế tiết hormone chống bài niệu ADH (Vasopressin) từ thùy sau tuyến yên. Khi nồng độ ADH giảm xuống, ống lượn xa và ống góp tại thận giảm tái hấp thu nước, khiến thận tăng bài tiết nước tiểu trong trẻo chỉ sau 30 - 45 phút. Kết quả là nước đi vào lòng mạch rồi nhanh chóng thoát ra ngoài trước khi kịp phân bố êm dịu vào khoảng kẽ và nội bào."
        },
        {
          "heading": "3. Nguyên tắc uống nước sinh lý giúp hydrat hóa tế bào bền vững",
          "content": "Để nước thực sự phục vụ cho các phản ứng sinh hóa nội bào và duy trì thể tích tuần hoàn ổn định, y học lối sống khuyến nghị nguyên tắc 'chia nhỏ và đều đặn':\n- Uống từng ngụm vừa phải (khoảng 150ml - 200ml mỗi lần), cách nhau 45 - 60 phút trong suốt thời gian thức.\n- Tổng lượng dịch khuyến nghị trung bình khoảng 30ml - 35ml trên mỗi kg cân nặng/ngày (tùy thuộc vào thời tiết, mức độ đổ mồ hôi khi tập luyện và tình trạng bệnh lý tim - thận nếu có).\n- Kết hợp thực phẩm giàu nước tự nhiên (rau xanh, trái cây tươi ít ngọt) vì nước trong cấu trúc thực phẩm đi kèm chất xơ, vitamin và khoáng chất giúp quá trình hấp thu tại ruột diễn ra từ từ, ổn định áp suất thẩm thấu."
        },
        {
          "heading": "4. Dấu hiệu nhận biết cơ thể đủ nước đơn giản nhất",
          "content": "Thay vì áp đặt một con số cứng nhắc cho mọi người, bạn có thể theo dõi màu sắc nước tiểu vào giữa ngày: màu vàng rơm nhạt, trong trẻo là tín hiệu cho thấy thận đang làm việc trong trạng thái cân bằng dịch tốt. Nếu nước tiểu sẫm màu như nước trà đặc, cơ thể đang thiếu nước và đang phải cô đặc nước tiểu tối đa."
        }
      ]
    },
    {
      "id": "art-muscle-glucose",
      "title": "[Chuyển hóa & Cơ xương] Vì sao nhóm cơ thân dưới là 'bể chứa đường huyết' quan trọng của cơ thể?",
      "category": "Vận động",
      "readTime": "7 phút đọc",
      "publishDate": "18/10/2026",
      "author": "BS. Nguyễn Thị Như Nguyện",
      "summary": "Khám phá cơ chế sinh học phân tử của kênh vận chuyển GLUT4 tại mô cơ xương: làm thế nào các bài tập kháng lực chân và đi bộ sau bữa ăn giúp ổn định đường huyết tự nhiên.",
      "tags": [
        "Kháng lực",
        "Đường huyết",
        "GLUT4",
        "Độ nhạy Insulin"
      ],
      "sourceStatus": "Nội dung mẫu minh họa chuyên môn",
      "sections": [
        {
          "heading": "1. Cơ xương - Cơ quan tiêu thụ glucose lớn nhất sau bữa ăn",
          "content": "Nhiều người thường chỉ nghĩ đến cơ bắp với vai trò tạo dáng vẻ săn chắc hoặc giúp nâng vác đồ vật. Tuy nhiên, dưới góc nhìn nội tiết và chuyển hóa, hệ cơ xương là một cơ quan chuyển hóa khổng lồ: ở người khỏe mạnh, mô cơ xương chịu trách nhiệm tiếp nhận từ 70% đến 80% lượng glucose được giải phóng vào máu sau bữa ăn (dưới tác động của insulin). Đặc biệt, nhóm cơ thân dưới (cơ tứ đầu đùi, cơ đùi sau, cơ mông và cơ bắp chân) chiếm hơn một nửa tổng khối lượng cơ toàn thân."
        },
        {
          "heading": "2. Hai con đường mở 'cánh cửa' GLUT4 đưa đường vào tế bào cơ",
          "content": "Glucose không thể tự do đi qua lớp màng lipid kép của tế bào cơ mà cần các protein vận chuyển chuyên biệt gọi là GLUT4. Bình thường, các túi chứa GLUT4 nằm dự trữ bên trong bào tương. Có hai cơ chế chính đưa GLUT4 tiến ra bề mặt màng tế bào để đón glucose:\n- Con đường phụ thuộc Insulin: Sau khi ăn, tuyến tụy tiết insulin gắn vào thụ thể trên màng tế bào cơ, kích hoạt chuỗi tín hiệu nội bào đưa GLUT4 ra màng.\n- Con đường độc lập với Insulin (Kích hoạt bởi sự co cơ): Khi bạn thực hiện các động tác co cơ chủ động (như Squat, bước chùng chân Lunge, nhón gót hoặc đi bộ nhanh), sự thay đổi tỷ lệ năng lượng AMP/ATP nội bào kích hoạt enzyme AMPK và giải phóng ion Canxi (Ca2+), trực tiếp thúc đẩy GLUT4 di chuyển ra màng tế bào ngay cả khi nồng độ insulin thấp hoặc khi cơ thể đang có tình trạng đề kháng insulin nhẹ."
        },
        {
          "heading": "3. Ứng dụng thực tế cho người làm việc văn phòng và người trung niên",
          "content": "Sự mất khối cơ theo tuổi tác (Sarcopenia) — thường bắt đầu âm thầm từ sau tuổi 35 nếu ít vận động — làm thu hẹp 'bể chứa glucose' tự nhiên này, khiến đường huyết sau ăn dễ tăng vọt và chuyển hóa thành mỡ nội tạng. Bạn có thể bảo vệ chuyển hóa mỗi ngày bằng 2 thói quen đơn giản:\n- Duy trì 2 - 3 buổi tập kháng lực mỗi tuần tập trung vào các nhóm cơ lớn ở chân, mông và lưng với kỹ thuật chuẩn xác.\n- Dành 10 - 15 phút vận động nhẹ nhàng (đi bộ thong thả, tập nhón gót Soleus push-up hoặc đứng dậy di chuyển) trong khoảng 30 phút sau bữa ăn chính để tận dụng cơ chế co cơ thu nhận glucose."
        }
      ]
    },
    {
      "id": "art-protein-pacing",
      "title": "[Dinh dưỡng khoa học] Phân bổ đạm (Protein) đều trong ngày: Chìa khóa bảo tồn khối cơ và kiểm soát cơn đói",
      "category": "Dinh dưỡng",
      "readTime": "6 phút đọc",
      "publishDate": "20/10/2026",
      "author": "BS. Nguyễn Thị Như Nguyện",
      "summary": "Thay vì ăn sáng qua loa với nhiều tinh bột tinh chế rồi dồn toàn bộ lượng đạm vào bữa tối, việc phân bổ đều protein vào cả 3 bữa ăn mang lại lợi ích vượt trội cho quá trình tổng hợp protein cơ và kiểm soát cảm giác thèm ăn.",
      "tags": [
        "Protein",
        "Dinh dưỡng cân bằng",
        "Kiểm soát cân nặng",
        "Tổng hợp cơ"
      ],
      "sourceStatus": "Nội dung mẫu minh họa chuyên môn",
      "sections": [
        {
          "heading": "1. Thực trạng bữa ăn lệch pha đạm ở người bận rộn",
          "content": "Một thói quen rất phổ biến là bữa sáng chỉ gồm bún, phở ít thịt, bánh mì trắng hoặc xôi (chứa nhiều carbohydrate hấp thu nhanh nhưng thiếu đạm và chất xơ), bữa trưa ăn vội tại văn phòng, và đến bữa tối mới ăn thật nhiều thịt, cá, hải sản. Cách phân bổ lệch này khiến cơ thể thiếu axit amin thiết yếu vào ban ngày — dẫn đến nhanh đói, buồn ngủ sau ăn trưa — nhưng lại dư thừa năng lượng vào buổi tối trước khi đi ngủ."
        },
        {
          "heading": "2. Ngưỡng kích hoạt tổng hợp Protein cơ (Muscle Protein Synthesis)",
          "content": "Cơ thể chúng ta liên tục diễn ra hai quá trình song song: tổng hợp protein cơ (MPS) và phân hủy protein cơ (MPB). Không giống như chất béo có thể tích trữ không giới hạn trong mô mỡ, cơ thể không có kho dự trữ axit amin tự do lâu dài. Các nghiên cứu sinh lý dinh dưỡng chỉ ra rằng việc cung cấp một lượng đạm vừa đủ trong mỗi bữa chính (thường khoảng 20g - 30g protein chất lượng cao tùy thể trạng, cung cấp đủ axit amin thiết yếu đặc biệt là Leucine) sẽ giúp kích hoạt hiệu quả quá trình tổng hợp và phục hồi mô cơ đều đặn suốt 24 giờ."
        },
        {
          "heading": "3. Tác động sinh lý của Protein đối với hormone báo no và hiệu ứng nhiệt thực phẩm",
          "content": "Trong ba nhóm chất sinh năng lượng (Đạm, Đường bột, Chất béo), Protein có hai đặc tính sinh lý quan trọng hỗ trợ kiểm soát cân nặng lành mạnh:\n- Kích thích tiết các hormone báo no từ đường tiêu hóa như PYY và GLP-1, đồng thời làm giảm hormone gây đói Ghrelin, giúp bạn giữ được sự tỉnh táo và không thèm đồ ngọt vặt vào xế chiều.\n- Hiệu ứng nhiệt của thực phẩm (Thermic Effect of Food - TEF) cao nhất: cơ thể cần tiêu hao khoảng 20% - 30% năng lượng của chính lượng đạm ăn vào chỉ để tiêu hóa, hấp thu và chuyển hóa các axit amin."
        },
        {
          "heading": "4. Gợi ý kết hợp đạm thực vật và đạm động vật lành mạnh",
          "content": "Một chế độ ăn bền vững theo định hướng Y học Lối sống khuyến khích sự cân bằng giữa nguồn đạm thực vật (đậu nành, đậu phụ, các loại hạt, đậu đỗ) và nguồn đạm động vật ít béo bão hòa (cá, ức gà, trứng, sữa chua Hy Lạp). Sự kết hợp này vừa cung cấp đủ phổ axit amin thiết yếu, vừa bổ sung chất xơ hòa tan và hạn chế cholesterol xấu (LDL-C)."
        }
      ]
    },
    {
      "id": "art-energy-expenditure",
      "title": "[Hiểu đúng về Năng lượng] Tiêu hao calo khi vận động: Đừng chỉ nhìn vào con số trên đồng hồ thông minh",
      "category": "Vận động",
      "readTime": "5 phút đọc",
      "publishDate": "22/10/2026",
      "author": "BS. Nguyễn Thị Như Nguyện",
      "summary": "Phân tích 4 thành phần của Tổng tiêu hao năng lượng hàng ngày (TDEE): BMR, NEAT, TEF và EAT. Hiểu đúng bản chất sinh học để không rơi vào bẫy tập luyện kiệt sức rồi ăn bù quá mức.",
      "tags": [
        "Chuyển hóa năng lượng",
        "TDEE",
        "NEAT",
        "Pilates & Cardio"
      ],
      "sourceStatus": "Nội dung mẫu minh họa chuyên môn",
      "sections": [
        {
          "heading": "1. Bốn mảnh ghép tạo nên Tổng tiêu hao năng lượng mỗi ngày (TDEE)",
          "content": "Nhiều người bắt đầu hành trình giảm mỡ thường đặt toàn bộ kỳ vọng vào số calo đốt được trong 1 giờ chạy bộ hoặc tập nhảy. Thực tế sinh lý học cho thấy Tổng tiêu hao năng lượng hàng ngày (Total Daily Energy Expenditure - TDEE) được cấu thành từ 4 nguồn:\n1. Chuyển hóa cơ bản (BMR - chiếm khoảng 60% - 70%): Năng lượng duy trì sự sống cho tim đập, phổi thở, não bộ hoạt động, gan thận lọc máu và duy trì nhiệt độ cơ thể ngay cả khi bạn nằm nghỉ hoàn toàn.\n2. Sinh nhiệt do vận động không phải tập luyện (NEAT - chiếm 15% - 25%): Năng lượng tiêu tốn cho việc đi lại trong nhà, đứng giảng bài, làm việc nhà, giữ tư thế ngồi thẳng.\n3. Hiệu ứng nhiệt của thực phẩm (TEF - chiếm khoảng 10%): Năng lượng dùng để tiêu hóa và hấp thu thức ăn.\n4. Sinh nhiệt do bài tập có chủ đích (EAT - thường chỉ chiếm 5% - 10% ở người tập phong trào)."
        },
        {
          "heading": "2. Vì sao tập quá sức nhưng ngồi bất động cả ngày lại giảm hiệu quả?",
          "content": "Khi một người chưa có nền tảng thể lực bỗng nhiên ép bản thân tập cường độ quá cao trong 60 phút, cơ thể mệt nhoài sẽ có xu hướng tự động giảm thiểu các chuyển động nhỏ trong suốt 23 giờ còn lại (giảm mạnh NEAT: nằm dài trên ghế, ngại đi bộ, uể oải) và tăng cảm giác đói sinh học khiến chúng ta dễ ăn bù vượt quá số calo vừa đốt được."
        },
        {
          "heading": "3. Chiến lược vận động thông minh và bền vững",
          "content": "Thay vì chạy theo những con số tiêu hao calo phóng đại, hãy tập trung vào chất lượng vận động:\n- Duy trì NEAT cao suốt ngày: Đứng dậy vươn vai sau mỗi 45 phút làm việc, đi cầu thang bộ, đi bộ ngắn sau bữa ăn.\n- Lựa chọn hình thức tập luyện bảo vệ khớp và nuôi dưỡng cơ: Kết hợp Pilates (tăng kiểm soát cơ lõi và trục cột sống), tập kháng lực (duy trì khối cơ để bảo vệ BMR) và các bài Cardio nhịp điệu vừa sức (như đi bộ nhanh, chạy bộ chậm, tập trên bạt nhún có kiểm soát) để trái tim khỏe mạnh và tinh thần sảng khoái."
        }
      ]
    },
    {
      "id": "art-circadian-sleep",
      "title": "[Nhịp sinh học & Giấc ngủ] Thiết lập lại đồng hồ sinh học cho người khó ngủ và hay mệt mỏi ban ngày",
      "category": "Giấc ngủ & Nước",
      "readTime": "6 phút đọc",
      "publishDate": "24/10/2026",
      "author": "BS. Nguyễn Thị Như Nguyện",
      "summary": "Cơ chế phối hợp giữa Áp lực ngủ Adenosine và Nhịp Cortisol - Melatonin 24 giờ: hướng dẫn quy trình vệ sinh giấc ngủ dựa trên bằng chứng khoa học thần kinh.",
      "tags": [
        "Nhịp sinh học",
        "Melatonin",
        "Vệ sinh giấc ngủ",
        "Phục hồi tế bào"
      ],
      "sourceStatus": "Nội dung mẫu minh họa chuyên môn",
      "sections": [
        {
          "heading": "1. Hai bánh răng điều khiển giấc ngủ tự nhiên của con người",
          "content": "Giấc ngủ sinh học không phải là một công tắc bật - tắt tức thời, mà được điều phối bởi mô hình hai quá trình (Two-Process Model of Sleep Regulation):\n- Quá trình S (Áp lực ngủ nội cân bằng - Homeostatic Sleep Drive): Ngay từ giây phút bạn thức dậy vào buổi sáng, quá trình tiêu thụ năng lượng ATP của tế bào não bắt đầu tích lũy phân tử Adenosine. Thức càng lâu, nồng độ Adenosine càng cao, tạo ra 'cơn buồn ngủ tự nhiên' vào buổi tối.\n- Quá trình C (Nhịp sinh học 24 giờ - Circadian Rhythm): Được điều khiển bởi nhân trên giao thoa thị giác (SCN) tại vùng dưới đồi, nhận tín hiệu ánh sáng từ võng mạc mắt để điều tiết nhịp tiết Cortisol (tăng tự nhiên vào sáng sớm giúp tỉnh táo) và Melatonin (bắt đầu tiết khi trời tối để mở cổng giấc ngủ)."
        },
        {
          "heading": "2. Những thói quen vô tình làm lệch pha đồng hồ sinh học",
          "content": "- Uống trà đậm hoặc cà phê sau 14h chiều: Caffeine có cấu trúc tương tự Adenosine, gắn tranh chấp vào thụ thể Adenosine tại não làm che lấp cảm giác buồn ngủ và có thời gian bán thải kéo dài từ 5 - 7 giờ.\n- Thiếu ánh sáng tự nhiên buổi sáng nhưng lại tiếp xúc ánh sáng xanh cường độ cao từ màn hình điện thoại sát giờ ngủ: Tín hiệu ánh sáng sóng ngắn chiếu vào võng mạc lúc 22h - 23h đêm đánh lừa nhân SCN rằng 'vẫn đang là ban ngày', làm ức chế tiết Melatonin và đẩy lùi chu kỳ ngủ sâu."
        },
        {
          "heading": "3. Quy trình 3 bước tái thiết lập giấc ngủ phục hồi",
          "content": "1. Buổi sáng (Trong vòng 60 phút sau khi thức dậy): Mở rèm đón ánh sáng tự nhiên ngoài trời 10 - 15 phút kết hợp vận động nhẹ và uống một cốc nước ấm để neo cố định mốc bắt đầu của đồng hồ sinh học.\n2. Buổi chiều: Ngừng sử dụng đồ uống chứa caffeine sau 14h00; nếu ngủ trưa, chỉ nên chợp mắt ngắn 15 - 20 phút trước 13h30 để không làm vơi mất áp lực Adenosine dành cho buổi tối.\n3. Buổi tối (60 phút trước giờ ngủ): Hạ thấp độ sáng đèn trong phòng (chuyển sang ánh sáng vàng ấm), rời xa màn hình công việc, thực hành 5 phút thở chậm bằng cơ hoành để đưa hệ thần kinh về trạng thái thư giãn sâu."
        }
      ]
    },
    {
      "id": "art-preventive-mindset",
      "title": "[Phòng ngừa chủ động] Từ 'chờ có bệnh mới chữa' sang 'chăm sóc sức khỏe chủ động từ gốc'",
      "category": "Phòng ngừa chủ động",
      "readTime": "5 phút đọc",
      "publishDate": "26/10/2026",
      "author": "BS. Nguyễn Thị Như Nguyện",
      "summary": "Hiểu rõ khoảng cách giữa trạng thái 'chưa có chẩn đoán bệnh lý' và 'sức khỏe tối ưu'. Vai trò phối hợp hài hòa giữa Y học lâm sàng hiện đại và Y học lối sống hàng ngày.",
      "tags": [
        "Y học lối sống",
        "Dự phòng cấp 1",
        "Khám sức khỏe định kỳ",
        "Thói quen bền vững"
      ],
      "sourceStatus": "Nội dung mẫu minh họa chuyên môn",
      "sections": [
        {
          "heading": "1. Phổ sức khỏe liên tục: Không chỉ là 'Có bệnh' hay 'Không bệnh'",
          "content": "Trong cuộc sống hiện đại, rất nhiều người rơi vào vùng xám của sức khỏe: kết quả khám tổng quát chưa đến ngưỡng phải kê đơn thuốc điều trị bệnh lý mạn tính, nhưng cơ thể thường xuyên uể oải, ngủ không sâu giấc, tăng vòng eo, cứng mỏi cổ vai gáy hoặc các chỉ số đường huyết, mỡ máu đã chạm ngưỡng giới hạn cao (tiền bệnh lý). Các rối loạn chuyển hóa mạn tính không xuất hiện sau một đêm mà là kết quả tích lũy của hàng nghìn bữa ăn, giấc ngủ và thói quen vận động qua nhiều năm tháng."
        },
        {
          "heading": "2. Vị trí của Y học Lối sống trong bức tranh chăm sóc sức khỏe toàn diện",
          "content": "Y học hiện đại (Lâm sàng, Cấp cứu, Ngoại khoa, Dược lý) đóng vai trò vô cùng quan trọng và không thể thay thế trong việc chẩn đoán chính xác, xử trí cấp cứu và điều trị bệnh lý. Song hành cùng y học lâm sàng, Y học Lối sống (Lifestyle Medicine) tập trung vào việc can thiệp có hệ thống vào các nguyên nhân gốc rễ thuộc về hành vi hàng ngày: dinh dưỡng, vận động, giấc ngủ, kiểm soát căng thẳng và hydrat hóa. Đây chính là nền tảng dự phòng cấp 1 và hỗ trợ nâng cao chất lượng sống bền vững."
        },
        {
          "heading": "3. Bắt đầu hành trình chủ động từ những thay đổi nhỏ nhất (Micro-habits)",
          "content": "Chăm sóc sức khỏe chủ động không đòi hỏi những chế độ ép xác khắc nghiệt hay những phương pháp truyền miệng thiếu căn cứ khoa học. Sự thay đổi bền vững bắt đầu từ sự thấu hiểu cơ thể mình: biết đọc nhãn dinh dưỡng, biết lắng nghe tín hiệu khát và mỏi của cơ thể, duy trì khám sức khỏe định kỳ và kiên trì tích lũy từng thói quen đúng đắn mỗi ngày."
        }
      ]
    }
  ],
  "faqs": [
    {
      "id": "faq-1",
      "question": "Tư vấn Sức khỏe Chủ động & Y học Lối sống khác gì với việc đi khám bệnh tại bệnh viện?",
      "answer": "Khám chữa bệnh tại bệnh viện tập trung vào việc chẩn đoán bệnh lý, xét nghiệm cận lâm sàng, kê đơn thuốc hoặc can thiệp y tế khi cơ thể đã có triệu chứng hoặc bệnh lý rõ ràng. Trong khi đó, Tư vấn Sức khỏe Chủ động & Y học Lối sống đồng hành cùng bạn trong đời sống hàng ngày để thiết lập chế độ dinh dưỡng cân bằng, lịch vận động an toàn, giấc ngủ theo nhịp sinh học và thói quen uống nước đúng cách — giúp dự phòng nguy cơ từ sớm và nâng cao nền tảng thể lực. Hai lĩnh vực này bổ trợ chặt chẽ cho nhau; tư vấn lối sống không thay thế việc khám định kỳ hay phác đồ điều trị của bác sĩ chuyên khoa."
    },
    {
      "id": "faq-2",
      "question": "Tôi rất bận rộn với công việc văn phòng và gia đình, liệu có theo được lộ trình không?",
      "answer": "Nguyên tắc cốt lõi của chương trình là 'Cá nhân hóa theo nhịp sống thực tế'. Bạn không cần phải dành hàng giờ trong phòng tập hay nấu những thực đơn cầu kỳ tách biệt với gia đình. Lộ trình sẽ được thiết kế từ những thay đổi nhỏ, khả thi (Micro-habits) như cách chọn lựa thực phẩm ngay trên mâm cơm gia đình, bài tập kháng lực/Pilates 20 phút tại nhà và lịch nhắc uống nước phù hợp với giờ làm việc của bạn."
    },
    {
      "id": "faq-3",
      "question": "Người trung niên có đau mỏi khớp gối hoặc cột sống có tham gia tư vấn vận động được không?",
      "answer": "Hoàn toàn được và rất cần thiết. Với người trung niên hoặc người có tiền sử mỏi khớp, việc lựa chọn bài tập đúng sinh cơ học là ưu tiên hàng đầu. Lộ trình sẽ ưu tiên các bài tập kiểm soát trục cơ thể (như Pilates cơ bản), bài tập tăng sức mạnh nhóm cơ nâng đỡ quanh khớp mà không gây áp lực dồn nén mạnh lên sụn khớp, kết hợp theo dõi sát phản hồi của cơ thể qua từng tuần."
    },
    {
      "id": "faq-4",
      "question": "Hình thức đồng hành tư vấn diễn ra Online hay Trực tiếp?",
      "answer": "Chương trình hỗ trợ linh hoạt cả hai hình thức: Tư vấn trực tuyến 1:1 qua Video Call / Zalo cho khách hàng ở mọi tỉnh thành, và tư vấn trực tiếp tại khu vực hoạt động (theo lịch hẹn trước). Trong suốt quá trình đồng hành, bạn luôn có thể nhắn tin trao đổi trực tiếp qua Zalo để được giải đáp thắc mắc về bữa ăn và bài tập hàng ngày."
    },
    {
      "id": "faq-5",
      "question": "Làm thế nào để bắt đầu đặt lịch tư vấn hoặc hỏi thêm thông tin?",
      "answer": "Bạn có thể thực hiện bài 'Tự khảo sát nhanh 5 thói quen sống khỏe' ngay trên trang web này để nhìn nhận điểm mạnh và điểm cần cải thiện của mình, sau đó bấm nút 'Kết nối tư vấn qua Zalo'. Hệ thống sẽ tổng hợp sẵn nội dung mối quan tâm của bạn thành lời nhắn rõ ràng để gửi trực tiếp đến người đồng hành."
    }
  ],
  "activities": [
    {
      "id": "act-cdyt-portrait",
      "category": "Giảng dạy Y khoa",
      "title": "Kỷ niệm những năm tháng giảng dạy tại Trường Cao đẳng Y tế Huế",
      "caption": "Bác sĩ Nguyễn Thị Như Nguyện trong trang phục blouse trắng tại ngôi trường từng gắn bó nhiều năm giảng dạy và đồng hành cùng các thế hệ sinh viên y tế.",
      "badge": "Kỷ niệm Giảng đường",
      "image": "./assets/images/chan-dung-bs-nhu-nguyen-cdyt-hue.jpg"
    },
    {
      "id": "act-anatomy-lab",
      "category": "Giảng dạy Y khoa",
      "title": "Kỷ niệm một buổi hướng dẫn sinh viên thực hành Giải phẫu – Sinh lý",
      "caption": "Trực tiếp hướng dẫn trên mô hình giải phẫu cho sinh viên — những năm tháng đứng lớp giúp việc chia sẻ kiến thức sinh lý cơ thể đến cộng đồng trở nên mộc mạc, gần gũi và dễ hiểu hơn.",
      "badge": "Hướng dẫn Thực hành",
      "image": "./assets/images/giang-day-thuc-hanh-giai-phau-cdyt-hue.jpg"
    },
    {
      "id": "act-marathon-10km",
      "category": "Chạy bộ & Marathon",
      "title": "Sải bước năng lượng trên cung đường VnExpress Marathon Hue 2026",
      "caption": "Rèn luyện sức bền tim mạch - hô hấp và lan tỏa niềm vui vận động chủ động qua giải chạy VnExpress Marathon Hue 2026 (BIB 60945).",
      "badge": "VnExpress Marathon 2026",
      "image": "./assets/images/chay-bo-vnexpress-marathon-hue-2026.jpg"
    },
    {
      "id": "act-jogging-medal",
      "category": "Chạy bộ & Marathon",
      "title": "Hoàn thành cự ly 10km – Chương trình 'Huế Luôn Luôn Mới'",
      "caption": "Chinh phục mục tiêu chạy bộ 10km Breaking cùng thông điệp ý nghĩa '#Nâng bước em đến trường' — duy trì thói quen rèn luyện thể lực bền bỉ mỗi ngày.",
      "badge": "Chinh phục 10KM",
      "image": "./assets/images/hoan-thanh-cu-ly-10km-hue-luon-luon-moi.jpg"
    },
    {
      "id": "act-le-loi-park",
      "category": "Chạy bộ & Marathon",
      "title": "Kết nối năng lượng buổi sáng cùng chị em tại Công viên Lê Lợi – Huế",
      "caption": "Đón ánh sáng tự nhiên buổi sớm bên bờ sông Hương, thiết lập nhịp sinh học và lan tỏa niềm vui vận động cùng cộng đồng chị em sống khỏe tại TP. Huế.",
      "badge": "Cộng đồng Sống khỏe",
      "image": "./assets/images/ket-noi-cong-dong-cong-vien-le-loi-hue.jpg"
    },
    {
      "id": "act-pilates-coaching",
      "category": "Thực hành Vận động",
      "title": "Cùng thực hành kiểm soát tư thế, Pilates & cơ trọng tâm (Core)",
      "caption": "Đồng hành hướng dẫn từng động tác trên thảm tập giúp mọi người kích hoạt nhóm cơ lõi, bảo vệ cột sống và khớp gối an toàn.",
      "badge": "Thực hành Vận động",
      "image": "./assets/images/huong-dan-thuc-hanh-pilates-khang-luc.jpg"
    },
    {
      "id": "act-cardio-boxing",
      "category": "Thực hành Vận động",
      "title": "Rèn luyện phản xạ, kháng lực & Cardio nhịp điệu cùng đội nhóm",
      "caption": "Trực tiếp tham gia tập luyện cường độ phù hợp, tăng tiêu hao năng lượng chủ động và kích hoạt kênh vận chuyển đường huyết GLUT4 tại mô cơ.",
      "badge": "Kháng lực & Cardio",
      "image": "./assets/images/luyen-tap-the-luc-nhip-dieu-nutrifort.jpg"
    },
    {
      "id": "act-100-pvd",
      "category": "Chia sẻ Cộng đồng",
      "title": "Buổi trò chuyện chia sẻ kiến thức Chăm sóc Sức khỏe Chủ động tại 100 Phạm Văn Đồng",
      "caption": "Giao lưu và cùng tìm hiểu về dinh dưỡng cân bằng, kiểm soát chuyển hóa dựa trên nền tảng khoa học cùng các anh chị em hội viên.",
      "badge": "Chia sẻ Sức khỏe",
      "image": "./assets/images/chia-se-chuyen-de-suc-khoe-100-pham-van-dong.jpg"
    },
    {
      "id": "act-phung-hung",
      "category": "Chia sẻ Cộng đồng",
      "title": "Trò chuyện sức khỏe cộng đồng tại điểm sinh hoạt Phùng Hưng",
      "caption": "Trò chuyện gần gũi cùng các cô chú, anh chị em về giá trị của việc chăm sóc sức khỏe từ gốc trước khi có bệnh: 'Lúc trẻ bán sức khỏe mua vàng – Về già bán vàng không mua được sức khỏe'.",
      "badge": "Lan tỏa Giá trị",
      "image": "./assets/images/chia-se-dinh-duong-loi-song-phung-hung.jpg"
    },
    {
      "id": "act-cu-lai",
      "category": "Chia sẻ Cộng đồng",
      "title": "Giao lưu & gắn kết cộng đồng sống khỏe tại Cự Lại – Dương Nỗ",
      "caption": "Xây dựng môi trường kết nối xã hội tích cực (Trụ cột thứ 6 của Y học Lối sống), khích lệ các gia đình cùng nhau duy trì nếp sống vui khỏe, lành mạnh.",
      "badge": "Gắn kết Cộng đồng",
      "image": "./assets/images/giao-luu-gan-ket-cong-dong-cu-lai-duong-no.jpg"
    }
  ]
};

/**
 * 3. BIỂU TƯỢNG SVG TRỰC QUAN CHO 6 TRỤ CỘT
 */
const PILLAR_ICONS = {
  nutrition: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>`,
  movement: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  sleep: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  hydration: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
  stress: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  connection: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
};

/**
 * 4. TRẠNG THÁI ỨNG DỤNG (APPLICATION STATE)
 */
const appState = {
  data: FALLBACK_CONTENT_DATA,
  selectedCategory: "Tất cả",
  selectedActivityCategory: "Tất cả",
  searchQuery: "",
  activeHeroPillarIndex: 0,
  currentArticle: null,
  showPortrait: SITE_CONFIG.showPortraitDefault,
  lastQuizSummary: ""
};

/**
 * 5. KHỞI TẠO KHI TRANG TẢI XONG
 */
document.addEventListener("DOMContentLoaded", async () => {
  applyBrandConfig();
  await loadContentData();
  renderHeroMiniPillars();
  renderPillarsSection();
  renderServicesSection();
  renderActivitiesSection();
  renderArticlesSection();
  renderFaqSection();
  initEventListeners();
  updateZaloMessagePreview();
});

/**
 * Áp dụng thông tin từ SITE_CONFIG lên toàn bộ các vị trí giữ chỗ trên HTML
 */
function applyBrandConfig() {
  document.querySelectorAll("[data-config='brandName']").forEach(el => {
    el.textContent = SITE_CONFIG.brandName;
  });
  document.querySelectorAll("[data-config='tagline']").forEach(el => {
    el.textContent = SITE_CONFIG.tagline;
  });
  document.querySelectorAll("[data-config='specialistName']").forEach(el => {
    el.textContent = SITE_CONFIG.specialistName;
  });
  document.querySelectorAll("[data-config='specialistRole']").forEach(el => {
    el.textContent = SITE_CONFIG.specialistRole;
  });
  document.querySelectorAll("[data-config='zaloPhone']").forEach(el => {
    el.textContent = SITE_CONFIG.zaloPhone;
  });
  document.querySelectorAll("[data-config='email']").forEach(el => {
    el.textContent = SITE_CONFIG.email;
  });
  document.querySelectorAll("[data-config='address']").forEach(el => {
    el.textContent = SITE_CONFIG.address;
  });

  const portraitContainer = document.getElementById("specialistPortraitContainer");
  if (portraitContainer && SITE_CONFIG.portraitImage && SITE_CONFIG.portraitImage.trim() !== "") {
    portraitContainer.innerHTML = `
      <img src="${SITE_CONFIG.portraitImage}" alt="Chân dung ${SITE_CONFIG.specialistName}" class="portrait-real-img" loading="lazy" />
      <span class="portrait-placeholder-label">${SITE_CONFIG.specialistName}</span>
      <p class="portrait-helper-note">Kỷ niệm những năm tháng giảng dạy tại Trường Cao đẳng Y tế Huế</p>
    `;
  }
}

/**
 * Tải dữ liệu từ ./data/content.json (khi chạy trên server/GitHub Pages)
 * hoặc tự động dùng FALLBACK_CONTENT_DATA (khi mở trực tiếp file://)
 */
async function loadContentData() {
  if (window.location.protocol === "file:" || window.location.protocol === "blob:" || window.location.protocol === "data:") {
    appState.data = FALLBACK_CONTENT_DATA;
    return;
  }
  try {
    const jsonPath = ["./data", "content.json"].join("/");
    const response = await fetch(jsonPath, { cache: "no-store" });
    if (response.ok) {
      const jsonData = await response.json();
      if (jsonData && Array.isArray(jsonData.articles)) {
        appState.data = jsonData;
      }
    }
  } catch (err) {
    appState.data = FALLBACK_CONTENT_DATA;
  }
}

/**
 * 6. RENDER KHUNG TƯƠNG TÁC NHANH 6 TRỤ CỘT TRÊN HERO
 */
function renderHeroMiniPillars() {
  const container = document.getElementById("heroMiniPillarsGrid");
  const detailBox = document.getElementById("heroMiniPillarDetail");
  if (!container || !detailBox) return;

  const pillars = appState.data.pillars || [];
  container.innerHTML = pillars.map((p, idx) => `
    <button type="button" class="hero-mini-card ${idx === appState.activeHeroPillarIndex ? 'is-active' : ''}" data-pillar-idx="${idx}" aria-label="Xem tóm tắt trụ cột ${p.title}">
      <div class="hero-mini-top">
        <span class="hero-mini-num">Trụ cột ${p.number}</span>
      </div>
      <div class="hero-mini-name">${p.title}</div>
    </button>
  `).join("");

  const activePillar = pillars[appState.activeHeroPillarIndex] || pillars[0];
  if (activePillar) {
    detailBox.innerHTML = `
      <div class="hero-mini-detail-title">Trụ cột ${activePillar.number}: ${activePillar.title}</div>
      <div>${activePillar.mechanism}</div>
    `;
  }

  container.querySelectorAll(".hero-mini-card").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-pillar-idx"), 10);
      if (!isNaN(idx)) {
        appState.activeHeroPillarIndex = idx;
        renderHeroMiniPillars();
      }
    });
  });
}

/**
 * 7. RENDER MỤC 1: 6 TRỤ CỘT Y HỌC LỐI SỐNG
 */
function renderPillarsSection() {
  const grid = document.getElementById("pillarsGrid");
  if (!grid) return;

  const pillars = appState.data.pillars || [];
  grid.innerHTML = pillars.map(p => `
    <article class="pillar-card">
      <div>
        <div class="pillar-card-top">
          <div class="pillar-icon-box">
            ${PILLAR_ICONS[p.icon] || PILLAR_ICONS.nutrition}
          </div>
          <span class="pillar-number">${p.number}</span>
        </div>
        <h3 class="pillar-title">${p.title}</h3>
        <p class="pillar-desc">${p.shortDesc}</p>
      </div>
      <div class="pillar-mechanism">
        <strong>Cơ chế sinh lý học:</strong>
        ${p.mechanism}
      </div>
    </article>
  `).join("");
}

/**
 * 8. RENDER MỤC 2: DỊCH VỤ & CHƯƠNG TRÌNH ĐỒNG HÀNH TƯ VẤN
 */
function renderServicesSection() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;

  const services = appState.data.services || [];
  grid.innerHTML = services.map(srv => `
    <article class="service-card">
      <div>
        <div class="service-badge-row">
          <span class="sample-status-badge">${srv.badge}</span>
          <span class="service-fee-badge">Mức phí: ${srv.fee}</span>
        </div>
        <h3 class="service-title">${srv.title}</h3>
        <p class="service-audience">${srv.targetAudience}</p>
        <div class="service-meta">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>${srv.duration}</span>
        </div>
        <ul class="service-list">
          ${srv.highlights.map(item => `<li>${item}</li>`).join("")}
        </ul>
      </div>
      <div>
        <button type="button" class="btn btn-zalo" style="width: 100%;" data-zalo-topic="Tư vấn chương trình: ${srv.title}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Nhận tư vấn mục này qua Zalo
        </button>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-zalo-topic]").forEach(btn => {
    btn.addEventListener("click", () => {
      const topic = btn.getAttribute("data-zalo-topic");
      openZaloModal(topic);
    });
  });
}

/**
 * 8B. RENDER MỤC HÌNH ẢNH & HOẠT ĐỘNG THỰC TẾ (#activities)
 */
function renderActivitiesSection() {
  const grid = document.getElementById("activitiesGrid");
  if (!grid) return;

  const activities = appState.data.activities || [];
  const cat = appState.selectedActivityCategory;

  const filtered = activities.filter(act => {
    return (cat === "Tất cả") || (act.category === cat);
  });

  grid.innerHTML = filtered.map(act => `
    <article class="activity-card">
      <div class="activity-img-wrap" data-view-activity="${act.id}" role="button" tabindex="0" aria-label="Phóng to hình ảnh: ${act.title}">
        <img src="${act.image}" alt="${act.title}" loading="lazy" />
        <span class="activity-badge-overlay">${act.badge}</span>
        <span class="activity-zoom-hint">🔍 Bấm xem ảnh lớn</span>
      </div>
      <div class="activity-content">
        <div class="activity-cat-label">${act.category}</div>
        <h3 class="activity-title">${act.title}</h3>
        <p class="activity-caption">${act.caption}</p>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-view-activity]").forEach(el => {
    el.addEventListener("click", () => {
      const actId = el.getAttribute("data-view-activity");
      openActivityLightbox(actId);
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const actId = el.getAttribute("data-view-activity");
        openActivityLightbox(actId);
      }
    });
  });
}

function openActivityLightbox(activityId) {
  const activities = appState.data.activities || [];
  const act = activities.find(a => a.id === activityId);
  if (!act) return;

  const modal = document.getElementById("articleModal");
  const titleEl = document.getElementById("readerModalTitle");
  const metaEl = document.getElementById("readerModalMeta");
  const bodyEl = document.getElementById("readerModalBody");
  const askZaloBtn = document.getElementById("readerAskZaloBtn");

  if (!modal || !titleEl || !metaEl || !bodyEl) return;

  titleEl.textContent = act.title;
  metaEl.innerHTML = `
    <span class="section-badge" style="margin-bottom:0;">${act.category}</span>
    <span>📸 Hình ảnh hoạt động thực tế của ${SITE_CONFIG.specialistName}</span>
  `;

  bodyEl.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${act.image}" alt="${act.title}" style="max-height: 62vh; width: auto; margin: 0 auto; border-radius: 12px; box-shadow: var(--shadow-md);" />
    </div>
    <p style="font-size: 1.05rem; color: var(--text-main); line-height: 1.65; background: var(--bg-subtle); padding: 16px 20px; border-radius: 12px; border-left: 4px solid var(--primary);">
      ${act.caption}
    </p>
  `;

  if (askZaloBtn) {
    askZaloBtn.onclick = () => {
      closeArticleModal();
      openZaloModal(`Tìm hiểu hoạt động: ${act.title}`);
    };
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

/**
 * 9. RENDER MỤC 3: GÓC CHUYÊN MÔN & BỘ LỌC BÀI VIẾT THỜI GIAN THỰC
 */
function renderArticlesSection() {
  const grid = document.getElementById("articlesGrid");
  const countEl = document.getElementById("articlesResultCount");
  const emptyBox = document.getElementById("articlesEmptyState");
  if (!grid || !countEl || !emptyBox) return;

  const allArticles = appState.data.articles || [];
  const query = appState.searchQuery.trim().toLowerCase();
  const cat = appState.selectedCategory;

  const filtered = allArticles.filter(art => {
    const matchCategory = (cat === "Tất cả") || (art.category === cat);
    if (!matchCategory) return false;
    if (!query) return true;

    const inTitle = art.title.toLowerCase().includes(query);
    const inSummary = art.summary.toLowerCase().includes(query);
    const inTags = (art.tags || []).some(t => t.toLowerCase().includes(query));
    const inSections = (art.sections || []).some(
      s => s.heading.toLowerCase().includes(query) || s.content.toLowerCase().includes(query)
    );
    return inTitle || inSummary || inTags || inSections;
  });

  countEl.textContent = `Hiển thị ${filtered.length} / ${allArticles.length} bài viết chuyên môn`;

  if (filtered.length === 0) {
    grid.style.display = "none";
    emptyBox.style.display = "block";
    return;
  }

  grid.style.display = "grid";
  emptyBox.style.display = "none";

  grid.innerHTML = filtered.map(art => `
    <article class="article-card">
      <div class="article-visual-banner">
        <span class="article-cat-pill">${art.category}</span>
        <div class="article-meta-row">
          <span>📅 ${art.publishDate}</span>
          <span>•</span>
          <span>⏱️ ${art.readTime}</span>
        </div>
      </div>
      <div class="article-body">
        <div style="margin-bottom: 8px;">
          <span class="sample-status-badge">${art.sourceStatus}</span>
        </div>
        <h3 class="article-title">${art.title}</h3>
        <p class="article-summary">${art.summary}</p>
        <div class="article-tags">
          ${(art.tags || []).map(tag => `<span class="article-tag">#${tag}</span>`).join("")}
        </div>
        <div class="article-card-footer">
          <button type="button" class="btn btn-primary btn-sm" data-read-article="${art.id}" style="width: 100%;">
            Đọc toàn bộ bài viết
          </button>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-read-article]").forEach(btn => {
    btn.addEventListener("click", () => {
      const artId = btn.getAttribute("data-read-article");
      openArticleModal(artId);
    });
  });
}

/**
 * 10. CỬA SỔ ĐỌC BÀI VIẾT CHI TIẾT (ARTICLE READER MODAL)
 */
function openArticleModal(articleId) {
  const articles = appState.data.articles || [];
  const art = articles.find(a => a.id === articleId);
  if (!art) return;

  appState.currentArticle = art;

  const modal = document.getElementById("articleModal");
  const titleEl = document.getElementById("readerModalTitle");
  const metaEl = document.getElementById("readerModalMeta");
  const bodyEl = document.getElementById("readerModalBody");
  const askZaloBtn = document.getElementById("readerAskZaloBtn");

  if (!modal || !titleEl || !metaEl || !bodyEl) return;

  titleEl.textContent = art.title;
  metaEl.innerHTML = `
    <span class="section-badge" style="margin-bottom:0;">${art.category}</span>
    <span>⏱️ ${art.readTime}</span>
    <span>•</span>
    <span>📅 Ngày đăng mẫu: ${art.publishDate}</span>
    <span>•</span>
    <span>✍️ Biên soạn: ${SITE_CONFIG.specialistName}</span>
  `;

  const tocItems = (art.sections || []).map((sec, idx) => `
    <li><a href="#reader-sec-${idx}">${sec.heading}</a></li>
  `).join("");

  const sectionsHtml = (art.sections || []).map((sec, idx) => `
    <section class="reader-section" id="reader-sec-${idx}">
      <h4>${sec.heading}</h4>
      <p>${sec.content}</p>
    </section>
  `).join("");

  bodyEl.innerHTML = `
    <div style="margin-bottom: 16px;">
      <span class="sample-status-badge">${art.sourceStatus}</span>
    </div>
    <p style="font-weight: 600; color: var(--primary-dark); margin-bottom: 20px; font-size: 1.08rem;">
      ${art.summary}
    </p>
    <nav class="reader-toc" aria-label="Mục lục bài viết">
      <div class="reader-toc-title">Mục lục nội dung</div>
      <ol class="reader-toc-list">
        ${tocItems}
      </ol>
    </nav>
    ${sectionsHtml}
    <div class="pillar-mechanism" style="margin-top: 28px;">
      <strong>Lưu ý Y khoa & Định hướng Sức khỏe Chủ động:</strong>
      Bài viết cung cấp kiến thức sinh lý học và y học lối sống nhằm mục đích giáo dục sức khỏe chủ động, không thay thế cho việc chẩn đoán hay chỉ định điều trị cá nhân tại cơ sở y tế.
    </div>
  `;

  if (askZaloBtn) {
    askZaloBtn.onclick = () => {
      closeArticleModal();
      openZaloModal(`Hỏi thêm về bài viết: ${art.title}`);
    };
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeArticleModal() {
  const modal = document.getElementById("articleModal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/**
 * 11. RENDER MỤC 6: CÂU HỎI THƯỜNG GẶP (FAQ ACCORDION)
 */
function renderFaqSection() {
  const container = document.getElementById("faqAccordionList");
  if (!container) return;

  const faqs = appState.data.faqs || [];
  container.innerHTML = faqs.map((item, idx) => `
    <div class="faq-item ${idx === 0 ? 'is-open' : ''}">
      <button type="button" class="faq-question-btn" aria-expanded="${idx === 0 ? 'true' : 'false'}">
        <span>${item.question}</span>
        <span class="faq-icon" aria-hidden="true">▼</span>
      </button>
      <div class="faq-answer">
        <p style="padding-top: 14px;">${item.answer}</p>
      </div>
    </div>
  `).join("");

  container.querySelectorAll(".faq-question-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".faq-item");
      if (!parent) return;
      const isOpen = parent.classList.contains("is-open");
      parent.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });
}

/**
 * 12. TRÌNH KẾT NỐI ZALO THÔNG MINH (SMART ZALO CONNECTOR)
 */
function openZaloModal(prefillTopic = "", customNote = "") {
  const modal = document.getElementById("zaloModal");
  const topicSelect = document.getElementById("zaloTopicSelect");
  const customTopicInput = document.getElementById("zaloCustomTopic");
  const noteInput = document.getElementById("zaloUserNote");
  const statusBanner = document.getElementById("zaloStatusBanner");

  if (!modal) return;

  if (statusBanner) {
    statusBanner.className = "zalo-status-banner";
    statusBanner.textContent = "";
  }

  if (prefillTopic && topicSelect && customTopicInput) {
    const matchingOption = Array.from(topicSelect.options).find(opt => opt.value === prefillTopic);
    if (matchingOption) {
      topicSelect.value = prefillTopic;
      customTopicInput.value = "";
    } else {
      topicSelect.value = "Mối quan tâm cụ thể khác";
      customTopicInput.value = prefillTopic;
    }
  }

  if (customNote && noteInput) {
    noteInput.value = customNote;
  }

  updateZaloMessagePreview();
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeZaloModal() {
  const modal = document.getElementById("zaloModal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function buildZaloMessageText() {
  const nameInput = document.getElementById("zaloUserName");
  const topicSelect = document.getElementById("zaloTopicSelect");
  const customTopicInput = document.getElementById("zaloCustomTopic");
  const noteInput = document.getElementById("zaloUserNote");

  const userName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : "[Tên của bạn]";
  const selectedTopic = topicSelect ? topicSelect.value : "Tư vấn Sức khỏe Chủ động tổng quát";
  const customTopic = (customTopicInput && customTopicInput.value.trim()) ? customTopicInput.value.trim() : "";
  const extraNote = (noteInput && noteInput.value.trim()) ? noteInput.value.trim() : "";

  const finalTopic = (selectedTopic === "Mối quan tâm cụ thể khác" && customTopic)
    ? customTopic
    : (customTopic ? `${selectedTopic} (${customTopic})` : selectedTopic);

  let msg = `Xin chào ${SITE_CONFIG.specialistName},\n`;
  msg += `Mình là ${userName}, biết đến thông tin qua website ${SITE_CONFIG.brandName}.\n`;
  msg += `Mối quan tâm chính của mình: ${finalTopic}.\n`;
  if (extraNote) {
    msg += `Thông tin chia sẻ thêm: ${extraNote}\n`;
  }
  msg += `Rất mong nhận được hướng dẫn và lịch hẹn tư vấn phù hợp. Xin cảm ơn!`;
  return msg;
}

function updateZaloMessagePreview() {
  const previewEl = document.getElementById("zaloMessagePreview");
  if (!previewEl) return;
  previewEl.textContent = buildZaloMessageText();
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      // Fallback
    }
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  let success = false;
  try {
    success = document.execCommand("copy");
  } catch (err) {
    success = false;
  }
  document.body.removeChild(textarea);
  return success;
}

async function handleCopyAndOpenZalo() {
  const message = buildZaloMessageText();
  await copyTextToClipboard(message);
  const statusBanner = document.getElementById("zaloStatusBanner");

  const rawPhone = (SITE_CONFIG.zaloPhone || "").trim();
  const digitsOnly = rawPhone.replace(/\D/g, "");
  const isConfiguredRealPhone = digitsOnly.length >= 9 && !rawPhone.includes("[");

  if (isConfiguredRealPhone) {
    if (statusBanner) {
      statusBanner.className = "zalo-status-banner is-visible is-success";
      statusBanner.innerHTML = `<strong>✓ Đã sao chép nội dung tin nhắn vào bộ nhớ tạm!</strong> Đang mở kết nối Zalo tới số <strong>${rawPhone}</strong>. Bạn chỉ cần dán (Paste) tin nhắn vào khung trò chuyện Zalo.`;
    }
    window.open(`https://zalo.me/${digitsOnly}`, "_blank", "noopener,noreferrer");
  } else {
    if (statusBanner) {
      statusBanner.className = "zalo-status-banner is-visible is-guide";
      statusBanner.innerHTML = `
        <strong>✓ Đã sao chép thành công lời nhắn tư vấn vào Clipboard!</strong><br/>
        <em>Chế độ hướng dẫn an toàn:</em> Hiện tại thông tin số Zalo đang để ở vị trí giữ chỗ <code>${rawPhone || "[SỐ_ĐIỆN_THOẠI_ZALO]"}</code>.
      `;
    }
  }
}

/**
 * 13. CÔNG CỤ TỰ KHẢO SÁT NHANH 5 THÓI QUEN SỐNG KHỎE
 */
function handleCalculateQuickCheck(event) {
  event.preventDefault();
  const form = document.getElementById("lifestyleQuizForm");
  const resultBox = document.getElementById("quizResultBox");
  const scoreBadge = document.getElementById("quizScoreBadge");
  const feedbackTitle = document.getElementById("quizFeedbackTitle");
  const feedbackDesc = document.getElementById("quizFeedbackDesc");

  if (!form || !resultBox || !scoreBadge || !feedbackTitle || !feedbackDesc) return;

  const qNames = ["q_water", "q_sleep", "q_movement", "q_nutrition", "q_energy"];
  let totalScore = 0;
  const details = [];

  for (const name of qNames) {
    const checked = form.querySelector(`input[name="${name}"]:checked`);
    if (checked) {
      totalScore += parseInt(checked.value, 10);
      const labelText = checked.getAttribute("data-label") || "";
      if (labelText) details.push(labelText);
    }
  }

  const maxScore = 15;
  scoreBadge.textContent = `Điểm thói quen hiện tại: ${totalScore} / ${maxScore} điểm`;

  let levelTitle = "";
  let levelAdvice = "";

  if (totalScore >= 13) {
    levelTitle = "Nền tảng Lối sống Chủ động Rất Tốt";
    levelAdvice = "Bạn đang duy trì nhịp sinh học, thói quen hydrat hóa, vận động và dinh dưỡng rất đáng khích lệ. Bạn có thể tối ưu sâu hơn về tỷ lệ cơ - mỡ và bài tập chuyên biệt để duy trì sức bền lâu dài.";
  } else if (totalScore >= 9) {
    levelTitle = "Nền tảng Khá – Cần Tinh chỉnh Một số Thói quen Chuyển hóa";
    levelAdvice = "Bạn đã có ý thức chăm sóc sức khỏe nhưng vẫn còn một vài mắt xích chưa đồng bộ (như uống nước chưa đều, thiếu bài tập kháng lực giữ cơ hoặc ngủ chưa sâu giấc). Chỉ cần điều chỉnh từng bước nhỏ trong 21 ngày tới, mức năng lượng ban ngày sẽ cải thiện rõ rệt.";
  } else {
    levelTitle = "Cơ thể Đang Cần Được Tái Thiết Lập Nhịp Sinh Học & Dinh Dưỡng";
    levelAdvice = "Nhịp sống bận rộn đang khiến cơ thể bạn thiếu hụt thời gian phục hồi, dễ mệt mỏi sau bữa ăn hoặc căng thẳng kéo dài. Hãy bắt đầu ngay từ 2 việc đơn giản nhất: chia nhỏ lượng nước uống trong ngày và thiết lập lại giờ ngủ sinh học cùng sự đồng hành chuyên môn.";
  }

  feedbackTitle.textContent = levelTitle;
  feedbackDesc.textContent = levelAdvice;

  appState.lastQuizSummary = `Kết quả tự khảo sát lối sống: ${totalScore}/${maxScore} điểm (${levelTitle}). Chi tiết: ${details.join("; ")}.`;
  resultBox.classList.add("is-visible");
  resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/**
 * 14. GẮN KẾT TOÀN BỘ SỰ KIỆN TƯƠNG TÁC TRÊN TRANG
 */
function initEventListeners() {
  // Menu Mobile Hamburger
  const mobileToggleBtn = document.getElementById("mobileMenuToggleBtn");
  const mobileDrawer = document.getElementById("mobileNavDrawer");
  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("is-open");
      mobileToggleBtn.setAttribute("aria-expanded", String(isOpen));
    });

    mobileDrawer.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("is-open");
        mobileToggleBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Các nút lọc danh mục Hoạt động thực tế
  const actFilterBtns = document.querySelectorAll(".activity-filter-btn[data-act-category]");
  actFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      actFilterBtns.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      appState.selectedActivityCategory = btn.getAttribute("data-act-category") || "Tất cả";
      renderActivitiesSection();
    });
  });

  // Ô tìm kiếm bài viết trực tiếp
  const searchInput = document.getElementById("articleSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      appState.searchQuery = e.target.value || "";
      renderArticlesSection();
    });
  }

  // Các nút lọc danh mục bài viết
  const filterBtns = document.querySelectorAll(".filter-btn[data-category]");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      appState.selectedCategory = btn.getAttribute("data-category") || "Tất cả";
      renderArticlesSection();
    });
  });

  // Nút đặt lại bộ lọc bài viết
  const resetFilterBtn = document.getElementById("resetArticleFilterBtn");
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener("click", () => {
      appState.selectedCategory = "Tất cả";
      appState.searchQuery = "";
      if (searchInput) searchInput.value = "";
      filterBtns.forEach(b => {
        b.classList.toggle("is-active", b.getAttribute("data-category") === "Tất cả");
      });
      renderArticlesSection();
    });
  }

  // Nút ẩn/hiện khung ảnh chân dung
  const togglePortraitBtn = document.getElementById("togglePortraitBtn");
  const portraitFrame = document.getElementById("specialistPortraitContainer");
  const aboutGrid = document.getElementById("aboutGridContainer");
  if (togglePortraitBtn && portraitFrame && aboutGrid) {
    togglePortraitBtn.addEventListener("click", () => {
      appState.showPortrait = !appState.showPortrait;
      portraitFrame.classList.toggle("is-hidden", !appState.showPortrait);
      aboutGrid.classList.toggle("no-portrait", !appState.showPortrait);
      togglePortraitBtn.textContent = appState.showPortrait
        ? "Ẩn khung ảnh chân dung mẫu"
        : "Hiện khung ảnh chân dung mẫu";
    });
  }

  // Biểu mẫu khảo sát nhanh 5 thói quen
  const quizForm = document.getElementById("lifestyleQuizForm");
  if (quizForm) {
    quizForm.addEventListener("submit", handleCalculateQuickCheck);
  }

  const sendQuizZaloBtn = document.getElementById("sendQuizResultZaloBtn");
  if (sendQuizZaloBtn) {
    sendQuizZaloBtn.addEventListener("click", () => {
      openZaloModal(
        "Nhận gợi ý cải thiện từ Kết quả Khảo sát Thói quen Sống khỏe",
        appState.lastQuizSummary
      );
    });
  }

  // Các nút mở Modal Kết nối Zalo chung
  document.querySelectorAll("[data-open-zalo]").forEach(btn => {
    btn.addEventListener("click", () => {
      const topic = btn.getAttribute("data-open-zalo") || "";
      openZaloModal(topic);
    });
  });

  // Sự kiện bên trong Modal Đọc bài viết / Xem ảnh lớn
  const closeReaderBtn = document.getElementById("closeArticleModalBtn");
  const closeReaderFooterBtn = document.getElementById("closeArticleFooterBtn");
  const printArticleBtn = document.getElementById("printArticleBtn");
  const articleModal = document.getElementById("articleModal");

  if (closeReaderBtn) closeReaderBtn.addEventListener("click", closeArticleModal);
  if (closeReaderFooterBtn) closeReaderFooterBtn.addEventListener("click", closeArticleModal);
  if (printArticleBtn) {
    printArticleBtn.addEventListener("click", () => {
      window.print();
    });
  }
  if (articleModal) {
    articleModal.addEventListener("click", (e) => {
      if (e.target === articleModal) closeArticleModal();
    });
  }

  // Sự kiện bên trong Modal Zalo
  const closeZaloBtn = document.getElementById("closeZaloModalBtn");
  const zaloModal = document.getElementById("zaloModal");
  const copyAndOpenZaloBtn = document.getElementById("copyAndOpenZaloBtn");
  const zaloInputs = ["zaloUserName", "zaloTopicSelect", "zaloCustomTopic", "zaloUserNote"];

  if (closeZaloBtn) closeZaloBtn.addEventListener("click", closeZaloModal);
  if (zaloModal) {
    zaloModal.addEventListener("click", (e) => {
      if (e.target === zaloModal) closeZaloModal();
    });
  }
  zaloInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", updateZaloMessagePreview);
      el.addEventListener("change", updateZaloMessagePreview);
    }
  });
  if (copyAndOpenZaloBtn) {
    copyAndOpenZaloBtn.addEventListener("click", handleCopyAndOpenZalo);
  }

  // Phím ESC đóng các Modal đang mở
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeArticleModal();
      closeZaloModal();
    }
  });
}
