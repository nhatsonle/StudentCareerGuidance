import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Technical assessment scoring matrix for offline rule-based fallback
interface OfflineRecommendation {
  matchedDomain: "web" | "mobile" | "ai" | "embedded" | "cyber";
  percentageMatch: number;
  suitabilityScore: string;
  analysisSummary: string;
  prosAndCons: { pro: string; con: string }[];
  marketOutlook: { demand: string; salary: string; trends: string };
  actionableTips: string[];
  customMessage: string;
}

const offlineRecommendations: Record<string, OfflineRecommendation> = {
  web: {
    matchedDomain: "web",
    percentageMatch: 92,
    suitabilityScore: "9.2/10",
    analysisSummary: "Bạn có xu hướng yêu thích việc xây dựng giao diện trực quan sinh động, tối ưu hóa trải nghiệm người dùng cuối hoặc thiết kế kiến trúc hệ thống phục vụ hàng triệu người truy cập. Phát triển Web (Frontend, Backend, Fullstack) cực kỳ phù hợp với tính cách hướng tới sản phẩm thực tế của bạn.",
    prosAndCons: [
      { pro: "Thị trường tuyển dụng cực lớn và luôn sôi động.", con: "Tốc độ thay đổi công nghệ nhanh, đòi hỏi tự học liên tục." },
      { pro: "Dễ bắt đầu, kết quả trực quan hiển thị ngay lập tức.", con: "Mức độ cạnh tranh cao ở phân khúc Junior." },
    ],
    marketOutlook: {
      demand: "Cực kỳ cao (Hầu hết các doanh nghiệp hiện đại đều cần hệ thống web/cloud)",
      salary: "12,000,000 - 35,000,000 VND / tháng cho Mid-level",
      trends: "Sự trỗi dậy của Next.js, Serverless, SSR và WebAssembly",
    },
    actionableTips: [
      "Làm chủ vững chắc HTML5, CSS3 và Javascript (ES6+).",
      "Học một thư viện JS hiện đại hàng đầu như React (hoặc Next.js) cho Frontend, và Node.js/Express cho Backend.",
      "Xây dựng dự án cá nhân hoàn chỉnh: Ví dụ một trang thương mại điện tử nhỏ hoặc blog cá nhân.",
    ],
    customMessage: "Thế giới Web đang chờ bạn kiến tạo! Bắt đầu từ những thẻ HTML đầu tiên và bạn sẽ sớm làm chủ các hệ thống phân tán khổng lồ trên đám mây.",
  },
  mobile: {
    matchedDomain: "mobile",
    percentageMatch: 88,
    suitabilityScore: "8.8/10",
    analysisSummary: "Bạn hào hứng với ý tưởng tạo ra những ứng dụng di động nằm ngay trong túi của người dùng, chạy trơn tru mượt mà với những tương tác cảm ứng trực quan lý thú. Bạn quan tâm sâu sắc đến tối ưu hiệu năng di động, lưu trữ offline và trải nghiệm cầm nắm thiết bị cầm tay.",
    prosAndCons: [
      { pro: "Cơ hội làm việc từ xa quốc tế cực tốt, có thể tự phát hành ứng dụng cá nhân kiếm tiền.", con: "Yêu cầu thiết bị cấu hình mạnh (đặc biệt nếu build cho iOS cần hệ sinh thái Apple)." },
      { pro: "Lương khởi điểm hấp dẫn do tính đặc thù chuyên sâu.", con: "Phải duy trì ứng dụng trên hai store lớn (App Store, Google Play) với nhiều luật khắt khe." },
    ],
    marketOutlook: {
      demand: "Rất cao (Sự bùng nổ của các ứng dụng chuyển đổi số, ví điện tử, siêu ứng dụng)",
      salary: "15,000,000 - 40,000,000 VND / tháng",
      trends: "Flutter và React Native tiếp tục thống lĩnh Cross-platform; Swift và Kotlin cho Native mượt mà",
    },
    actionableTips: [
      "Lựa chọn hướng đi hướng đến: Native (Kotlin cho Android, Swift cho iOS) hoặc Cross-platform (Flutter/React Native).",
      "Làm quen với các khái niệm quản lý trạng thái di động, gọi API và cơ sở dữ liệu local (SQLite, Hive, Room).",
      "Phát triển một ứng dụng đơn giản như: Quản lý chi tiêu cá nhân, App Thời Tiết, tải lên Store hoặc Github.",
    ],
    customMessage: "Mỗi dòng code bạn viết ra có thể xuất hiện trên hàng triệu chiếc smartphone toàn cầu. Hãy mang lại giá trị thiết thực cho người dùng di động ngay hôm nay!",
  },
  ai: {
    matchedDomain: "ai",
    percentageMatch: 95,
    suitabilityScore: "9.5/10",
    analysisSummary: "Bạn sở hữu tư duy phân tích toán học mạnh mẽ, bị lôi cuốn bởi việc khám phá các quy luật ẩn sau những khối dữ liệu khổng lồ và muốn lập trình nên những cỗ máy có khả năng tự học tập, dự báo hoặc sáng tạo dữ liệu mới. Lĩnh vực AI & Data Science chính là thánh đường dành cho bộ não phân tích của bạn.",
    prosAndCons: [
      { pro: "Mức thu nhập thuộc hàng top đầu trong ngành IT, cơ hội làm nghiên cứu tầm cao.", con: "Đòi hỏi nền tảng Toán giải tích, Xác suất thống kê và Đại số tuyến tính rất vững chắc." },
      { pro: "Là xu hướng tương lai dài hạn, không sợ bị thay thế.", con: "Yêu cầu bằng cấp cao (Thạc sĩ, Tiến sĩ) hoặc lộ trình học tập hàn lâm dài hạn hơn." },
    ],
    marketOutlook: {
      demand: "Bùng nổ dữ dội (Các doanh nghiệp tích hợp Generative AI, LLM, phân tích dữ liệu thông minh)",
      salary: "20,000,000 - 60,000,000 VND / tháng hoặc cao hơn tùy năng lực",
      trends: "Fine-tuning LLMs, Phát triển các giải pháp RAG, AI Agent, Thị giác máy tính và Robot học",
    },
    actionableTips: [
      "Học sâu ngôn ngữ Python cùng các thư viện xử lý dữ liệu: NumPy, Pandas, Matplotlib.",
      "Củng cố nền tảng Toán học cho Machine Learning (Đại số tuyến tính, Xác suất thống kê).",
      "Thực hành với thư viện Scikit-Learn trước khi tiến lên Deep Learning với PyTorch hoặc TensorFlow.",
    ],
    customMessage: "AI đang tái định hình tương lai nhân loại. Hãy là người viết nên những thuật toán thông minh dẫn dắt cuộc cách mạng công nghệ tiếp theo!",
  },
  embedded: {
    matchedDomain: "embedded",
    percentageMatch: 90,
    suitabilityScore: "9.0/10",
    analysisSummary: "Bạn bị hấp dẫn bởi sự kết hợp kỳ diệu giữa phần cứng và phần mềm. Bạn thích nhìn thấy những dòng code của mình trực tiếp điều khiển các động cơ, cảm biến, vi xử lý hoạt động trong thế giới vật lý thật. IoT, Robotics, Ô tô thông minh là sân chơi tuyệt vời của bạn.",
    prosAndCons: [
      { pro: "Tính bền vững cao, cực kỳ khó bị thay thế bởi các công cụ code tự động.", con: "Khó tự test phần cứng lỗi, chi phí mua sắm kit thí nghiệm và công cụ đo đạc vật lý." },
      { pro: "Lợi thế làm việc trong các tập đoàn chế tạo lớn toàn cầu (VinFast, Bosch, Samsung).", con: "Tài liệu kỹ thuật thường phức tạp, cấu trúc thanh ghi, tối ưu RAM/ROM cực kỳ chặt chẽ." },
    ],
    marketOutlook: {
      demand: "Cao và ổn định (Chip bán dẫn, Xe điện tự hành, Thành phố thông minh, Tự động hóa nhà máy)",
      salary: "14,000,000 - 38,000,000 VND / tháng",
      trends: "Phát triển vi điều khiển kiến trúc RISC-V, Embedded AI (TinyML), và AUTOSAR trong công nghiệp ô tô",
    },
    actionableTips: [
      "Master ngôn ngữ lập trình C/C++ ở mức độ quản lý bộ nhớ, con trỏ và thao tác bit.",
      "Học cách đọc sơ đồ mạch điện (Schematics) và sử dụng các kit vi điều khiển cơ bản như Arduino, ESP32, STM32.",
      "Thực hành các chuẩn giao tiếp phần cứng phổ biến: UART, SPI, I2C, CAN bus.",
    ],
    customMessage: "Thổi hồn vào đất đá vô tri bằng những dòng code nhị phân tối ưu. Hãy chế tạo nên những cỗ máy tự động hóa thông minh thay đổi cuộc sống!",
  },
  cyber: {
    matchedDomain: "cyber",
    percentageMatch: 87,
    suitabilityScore: "8.7/10",
    analysisSummary: "Bạn có óc thám tử nhạy bén, luôn đặt câu hỏi về tính toàn vẹn và bảo mật của một hệ thống, thích đóng vai lập trình viên mũ trắng phòng thủ chống lại các cuộc tấn công mạng hiểm độc hoặc thử nghiệm thâm nhập để tìm ra những lỗ hổng tiềm ẩn. Cybersecurity là lá chắn thép bảo vệ thế giới số.",
    prosAndCons: [
      { pro: "Nhu cầu khẩn thiết ở mọi tổ chức tài chính, ngân hàng, chính phủ; vị thế cực kỳ tôn trọng.", con: "Áp lực trách nhiệm lớn, trực chiến ứng cứu sự cố 24/7 khi xảy ra rủi ro hệ thống." },
      { pro: "Công việc đầy kịch tính, luôn đổi mới tư duy chiến thuật liên tục.", con: "Đòi hỏi kiến thức cực rộng từ phần cứng, mạng máy tính đến hệ quản trị cơ sở dữ liệu." },
    ],
    marketOutlook: {
      demand: "Tăng trưởng vượt bậc (Các vụ tấn công ransomware, rò rỉ dữ liệu diễn ra liên tục trên thế giới)",
      salary: "18,000,000 - 50,000,000 VND / tháng",
      trends: "Zero Trust Architecture, Cloud Security, DevSecOps và Bảo mật dữ liệu AI",
    },
    actionableTips: [
      "Đóng vững kiến thức Mạng máy tính (CCNA) và Hệ điều hành (Linux nâng cao, Windows Server).",
      "Tìm hiểu OWASP Top 10 lỗ hổng bảo mật web phổ biến nhất và cách khai thác/phòng chống.",
      "Luyện tập trên các nền tảng thực hành như TryHackMe, HackTheBox để lấy các chứng chỉ uy tín (CEH, CompTIA Security+).",
    ],
    customMessage: "Thế giới số đang đối mặt với những hiểm họa vô hình. Hãy trở thành những hiệp sĩ bảo vệ an ninh thông tin, giữ gìn sự an toàn cho cộng đồng!",
  },
};

// High-quality dynamic rule-based fallback generator
function generateDynamicOfflineRecommendation(
  dominantCategory: "web" | "mobile" | "ai" | "embedded" | "cyber",
  answers: any[],
  scores: Record<string, number>
): OfflineRecommendation {
  const base = offlineRecommendations[dominantCategory];
  
  // Calculate dynamic percentageMatch and suitabilityScore based on relative prominence of maximum score
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxScore = scores[dominantCategory];
  let percentageMatch = 85;
  if (totalScore > 0) {
    percentageMatch = Math.min(99, Math.max(70, Math.round((maxScore / totalScore) * 35 + 63)));
  }
  const suitabilityScore = `${(percentageMatch / 10).toFixed(1)}/10`;

  // Build a highly customized, dynamic analysis summary based on their answers
  let dynamicAnalysis = `Hệ thống ghi nhận xu hướng nổi trội của bạn tập trung ở nhóm kỹ năng ${
    dominantCategory === "web" ? "Phát triển Phần mềm Web" :
    dominantCategory === "mobile" ? "Lập trình Di động" :
    dominantCategory === "ai" ? "Trí tuệ Nhân tạo & ML" :
    dominantCategory === "embedded" ? "Hệ thống Nhúng & IoT" :
    "An ninh mạng & Bảo mật"
  }. `;

  const q1Ans = answers.find((a: any) => a.questionId === "q1")?.selectedOptionText || "";
  const q2Ans = answers.find((a: any) => a.questionId === "q2")?.selectedOptionText || "";
  const q3Ans = answers.find((a: any) => a.questionId === "q3")?.selectedOptionText || "";
  const q4Ans = answers.find((a: any) => a.questionId === "q4")?.selectedOptionText || "";

  const personalPoints: string[] = [];

  if (q1Ans.toLowerCase().includes("website") || q1Ans.toLowerCase().includes("triệu người")) {
    personalPoints.push("Ước mơ của bạn hướng tới dựng xây hệ thống Web quy mô lớn, giao diện mượt tốc độ cao.");
  } else if (q1Ans.toLowerCase().includes("di động") || q1Ans.toLowerCase().includes("sức khỏe")) {
    personalPoints.push("Bạn thích thiết kế các ứng dụng nằm gọn trong điện thoại của hàng triệu người dùng.");
  } else if (q1Ans.toLowerCase().includes("ai") || q1Ans.toLowerCase().includes("tài chính")) {
    personalPoints.push("Bạn có khao khát ứng dụng học máy vào phân tích mảng dữ liệu tài chính vĩ mô.");
  } else if (q1Ans.toLowerCase().includes("nhà thông minh") || q1Ans.toLowerCase().includes("cảm biến")) {
    personalPoints.push("Bạn hào hứng phát triển các chương trình điều khiển ngoại vi và phần cứng IoT.");
  } else if (q1Ans.toLowerCase().includes("quét") || q1Ans.toLowerCase().includes("lỗ hổng")) {
    personalPoints.push("Bạn sở hữu bản lĩnh kiến tạo các lá chắn rà quét, chặn đứng mọi ý đồ tấn công mạng.");
  }

  if (q2Ans.toLowerCase().includes("hiển thị") || q2Ans.toLowerCase().includes("ui/ux")) {
    personalPoints.push("Trải nghiệm trực quan mỹ thuật và sự nhịp nhàng phía client chính là chiếc neo cảm hứng cực tốt của bạn.");
  } else if (q2Ans.toLowerCase().includes("máy chủ") || q2Ans.toLowerCase().includes("api")) {
    personalPoints.push("Bạn yêu thích chiều sâu logic của dữ liệu server, các API phân tán và tối ưu hóa hệ thống.");
  } else if (q2Ans.toLowerCase().includes("mô hình") || q2Ans.toLowerCase().includes("mạng nơ-ron")) {
    personalPoints.push("Nghiên cứu kiến trúc nơ-ron học sâu để máy tự phản xạ chính là con đường bạn hướng tới.");
  } else if (q2Ans.toLowerCase().includes("bo mạch") || q2Ans.toLowerCase().includes("driver")) {
    personalPoints.push("Bạn có xu hướng làm việc sát sườn cùng bo mạch vi xử lý, thấu hiểu cấu trúc chip và thanh ghi.");
  } else if (q2Ans.toLowerCase().includes("phòng thủ") || q2Ans.toLowerCase().includes("quét gói tin")) {
    personalPoints.push("Bảo an dữ liệu từ tầng sơ khai đến mã hóa nâng cao là phân vùng bạn muốn bảo vệ.");
  }

  if (q3Ans.toLowerCase().includes("javascript") || q3Ans.toLowerCase().includes("react")) {
    personalPoints.push("Sự hỗ trợ mạnh mẽ của hệ sinh thái Javascript mang lại bệ phóng tốt nhất cho bạn.");
  } else if (q3Ans.toLowerCase().includes("dart") || q3Ans.toLowerCase().includes("kotlin")) {
    personalPoints.push("Mã nguồn Flutter/Native gọn gàng thúc đẩy năng lực sáng chế ứng dụng di động tuyệt hảo.");
  } else if (q3Ans.toLowerCase().includes("python") || q3Ans.toLowerCase().includes("pytorch")) {
    personalPoints.push("Sức mạnh tính toán của Python và Jupyter Notebook chính là người bạn đồng hành của bạn.");
  } else if (q3Ans.toLowerCase().includes("c/c++") || q3Ans.toLowerCase().includes("thanh ghi")) {
    personalPoints.push("Bạn chuộng sự kiểm soát bộ nhớ thủ công tuyệt đối của lập trình C/C++ thuần túy.");
  } else if (q3Ans.toLowerCase().includes("linux") || q3Ans.toLowerCase().includes("terminal")) {
    personalPoints.push("Sử dụng terminal Linux và công cụ soi gói tin mạng phản ánh chính xác lối tư duy hệ thống của bạn.");
  }

  if (q4Ans.toLowerCase().includes("render") || q4Ans.toLowerCase().includes("api")) {
    personalPoints.push("Khi giải quyết sự cố, bạn khéo léo gác chặn API và kiểm định lỗi giao diện ngay lập tức.");
  } else if (q4Ans.toLowerCase().includes("nhật ký") || q4Ans.toLowerCase().includes("ram")) {
    personalPoints.push("Bạn bền bỉ phân tích nhật ký rò rỉ bộ nhớ thực tế trên thiết bị để đảm bảo độ mượt tối ưu.");
  } else if (q4Ans.toLowerCase().includes("siêu tham số")) {
    personalPoints.push("Phong thái gỡ lỗi khoa học giúp bạn nắn chỉnh siêu tham số mô hình toán học kiên định.");
  } else if (q4Ans.toLowerCase().includes("nguồn") || q4Ans.toLowerCase().includes("ic")) {
    personalPoints.push("Bạn kiên trì đo đạc tín hiệu vật lý xung quanh và sơ đồ chân cắm chống nhiễu phần cứng.");
  } else if (q4Ans.toLowerCase().includes("khai thác") || q4Ans.toLowerCase().includes("mã độc")) {
    personalPoints.push("Bạn có nhãn quan thám tử nhạy bén tìm kiếm nguy cơ bị lợi dụng lỗ hổng xâm nhập hệ thống.");
  }

  if (personalPoints.length > 0) {
    dynamicAnalysis += personalPoints.join(" ") + " ";
  }

  dynamicAnalysis += base.analysisSummary;

  const actionableTips = [...base.actionableTips];
  if (q3Ans) {
    const languageName = q3Ans.split(" - ")[0] || "ngôn ngữ yêu thích";
    actionableTips.unshift(`Phát triển vững chắc kỹ năng sử dụng công cụ/ngôn ngữ ưu tiên chính của bạn: ${languageName}.`);
  }

  return {
    matchedDomain: dominantCategory,
    percentageMatch,
    suitabilityScore,
    analysisSummary: dynamicAnalysis,
    prosAndCons: base.prosAndCons,
    marketOutlook: base.marketOutlook,
    actionableTips: actionableTips.slice(0, 3),
    customMessage: base.customMessage,
  };
}

// API Endpoint to analyze dynamic assessment
app.post("/api/analyze-assessment", (req, res) => {
  const { answers } = req.body; // Array of items: { questionId, questionText, selectedOptionText, scoreValue: { web, mobile, ai, embedded, cyber } }

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: "Answers parameter is required and must be an array." });
  }

  // Calculate local scores first to identify the dominant category
  const scores = { web: 0, mobile: 0, ai: 0, embedded: 0, cyber: 0 };
  answers.forEach((ans: any) => {
    if (ans.scoreValue) {
      Object.keys(scores).forEach((key) => {
        const value = ans.scoreValue[key] || 0;
        scores[key as keyof typeof scores] += value;
      });
    }
  });

  // Find dominant category
  let dominantCategory: keyof typeof scores = "web";
  let maxScore = -1;
  Object.keys(scores).forEach((key) => {
    const k = key as keyof typeof scores;
    if (scores[k] > maxScore) {
      maxScore = scores[k];
      dominantCategory = k;
    }
  });

  const dynamicFallback = generateDynamicOfflineRecommendation(dominantCategory, answers, scores);
  return res.json({
    ...dynamicFallback,
    isAiGenerated: false,
    scores,
  });
});

// API Endpoint for Career Mentor AI Chat
app.post("/api/chat-mentor", (req, res) => {
  const { messages, language } = req.body; // messages: [{ role: "user" | "model", content: string }]

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  // Return standard friendly offline guidance responses based on keywords in user message
  const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
  const isJapanese = language === "ja";
  let reply = "";

  if (isJapanese) {
    if (lastUserMessage.includes("こんにちは") || lastUserMessage.includes("hi") || lastUserMessage.includes("hello")) {
      reply = "こんにちは。私は **EduMentor AI** です。学習計画、キャリア選択、技術選定、ポートフォリオ作成について相談できます。Web、Mobile、AI、組込み、Securityのどれを深掘りしますか。";
    } else if (lastUserMessage.includes("web") || lastUserMessage.includes("frontend") || lastUserMessage.includes("backend")) {
      reply = "**Web開発**は、HTML/CSS/JavaScriptを固めたあと、Frontendなら **React.js/Next.js**、Backendなら **Node.js/Express** やJavaへ進むのがおすすめです。求人が多く、作品として成果を見せやすい分野です。";
    } else if (lastUserMessage.includes("ai") || lastUserMessage.includes("data") || lastUserMessage.includes("機械学習") || lastUserMessage.includes("人工知能")) {
      reply = "**AI・Data Science** は、Python、確率統計、線形代数、データ処理が土台です。まずScikit-learnで回帰・分類を実装し、その後PyTorchやLLM/RAGへ進むと学習が安定します。";
    } else if (lastUserMessage.includes("組込み") || lastUserMessage.includes("embedded") || lastUserMessage.includes("hardware") || lastUserMessage.includes("iot")) {
      reply = "**組込み・IoT** は、C/C++、レジスタ、通信規格(I2C/SPI/UART)、マイコン実験が中心です。ESP32やSTM32の開発キットでLED、センサー、MQTT通信を小さく作るとよいです。";
    } else if (lastUserMessage.includes("mobile") || lastUserMessage.includes("モバイル") || lastUserMessage.includes("flutter")) {
      reply = "**モバイル開発** は、NativeならSwift/Kotlin、Cross-platformなら **Flutter** または **React Native** が候補です。UI/UX、状態管理、API連携、ローカル保存を含むアプリを作ると実力が伝わります。";
    } else if (lastUserMessage.includes("セキュリティ") || lastUserMessage.includes("security") || lastUserMessage.includes("cyber")) {
      reply = "**Cybersecurity** は、Linux、TCP/IP、Web、暗号の基礎が重要です。Blue TeamならSOC/SIEM、Red TeamならOWASP Top 10とCTFから始めると、実践力を安全に伸ばせます。";
    } else {
      reply = "良い質問です。IT学習で一番効くのは、公式ドキュメントを読みながら小さな実践プロジェクトを完成させることです。興味のある分野を1つ選び、2〜4週間で公開できる作品に落とし込みましょう。";
    }
  } else {
    if (lastUserMessage.includes("chào") || lastUserMessage.includes("hi") || lastUserMessage.includes("hello")) {
      reply = "Xin chào! Mình là **EduMentor AI**. Mình rất vui được hỗ trợ và giải đáp tất cả thắc mắc của bạn về lộ trình học tập, cơ hội nghề nghiệp, phân tích năng lực hoặc lựa chọn công nghệ trong ngành IT. Bạn muốn tìm hiểu kỹ hơn về hướng đi nào (Web, Mobile, AI, Nhúng, hay Security)?";
    } else if (lastUserMessage.includes("web") || lastUserMessage.includes("frontend") || lastUserMessage.includes("backend")) {
      reply = "Đối với **Lập trình Web**, lộ trình tối ưu là bắt đầu học vững HTML/CSS/JS, sau đó chọn **React.js/Next.js** cho Frontend hoặc **Node.js/Express/Java** cho Backend. Nhu cầu tuyển dụng của Web là vô cùng dồi dào, hầu hết dự án Startup hoặc Tập đoàn lớn đều cần. Hãy hỏi mình thêm về bất cứ framework cụ thể nào nhé!";
    } else if (lastUserMessage.includes("ai") || lastUserMessage.includes("data") || lastUserMessage.includes("trí tuệ nhân tạo") || lastUserMessage.includes("machine learning")) {
      reply = "Lĩnh vực **AI & Data Science** đòi hỏi tư duy phân tích sắc bén và khả năng Toán tốt (Xác suất thống kê, Đại số tuyến tính). Ngôn ngữ lập trình bắt buộc là **Python** (Pandas, NumPy, Scikit-learn), tiếp theo là Deep Learning Framework như PyTorch. Hiện nay, xu hướng làm kỹ sư AI ứng dụng (phối hợp LLM thông qua API hoặc Fine-tune) đang cực kỳ phát triển.";
    } else if (lastUserMessage.includes("nhúng") || lastUserMessage.includes("embedded") || lastUserMessage.includes("hardware") || lastUserMessage.includes("iot")) {
      reply = "Hệ thống **Nhúng & IoT** là sự giao thoa giữa điện tử phần cứng và code phần mềm. Bạn cần làm chủ **Lập trình C/C++**, học cách đọc thanh ghi, giao tiếp thiết bị (I2C, SPI, UART) và thực hành trên vi điều khiển ESP32, STM32 hoặc Raspberry Pi. Hướng đi này rất bền bỉ, tính thay thế thấp và đang cất cánh nhờ các đại siêu dự án xe điện và chip bán dẫn.";
    } else if (lastUserMessage.includes("mobile") || lastUserMessage.includes("di động") || lastUserMessage.includes("flutter")) {
      reply = "Với **Lập trình Di động**, bạn có thể chọn Native ( học Swift cho iOS, Kotlin cho Android) hoặc Cross-Platform ( học **Flutter** bằng Dart hoặc **React Native** bằng Javascript). Di động tập trung rất nhiều vào trải nghiệm người dùng, tương tác mượt mà và khả năng tối ưu hóa offline. Cơ hội làm Freelancer hoặc tự sáng tạo app kiếm tiền là vô song.";
    } else if (lastUserMessage.includes("bảo mật") || lastUserMessage.includes("an ninh") || lastUserMessage.includes("security") || lastUserMessage.includes("cyber")) {
      reply = "Ngành **An ninh mạng (Cybersecurity)** thích hợp cho những bạn thích phá rỡ, giải đố và phòng thủ. Các kiến thức gốc cực kỳ quan trọng gồm Mạng máy tính (TCP/IP, Routing) và Hệ điều hành (Khóa lệnh Linux). Bạn có thể định hướng đi theo Blue Team (Phòng thủ, giám sát SOC) hoặc Red Team (Tấn công thử nghiệm - Penetration Testing).";
    } else {
      reply = "Cảm ơn câu hỏi tuyệt vời của bạn! Trong lộ trình rèn luyện IT, kỹ năng quan trọng nhất chính là khả năng tự học sâu (Deep Work) kết hợp với các dự án thực tế. Bạn hãy thử làm một đồ án nhỏ (Pet Project) áp dụng công nghệ đó, đó là cách thuyết phục nhất trong mắt các nhà tuyển dụng. Bạn có muốn mình đưa gợi ý ý tưởng dự án thực hành cụ thể nào không?";
    }
  }

  return res.json({
    reply,
    isAiGenerated: false,
  });

});

// Setup Vite in Development or Static Server in Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 IT Career Roadmap Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
