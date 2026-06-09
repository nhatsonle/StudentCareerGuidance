import { assessmentQuestions, careerPathsData } from "./data";
import {
  AssessmentQuestion,
  CareerPathData,
  CareerRecommendation,
  MilestoneData,
  PhaseData,
} from "./types";

export type Language = "vi" | "ja";

export const isLanguage = (value: string | null): value is Language =>
  value === "vi" || value === "ja";

export const languageName: Record<Language, string> = {
  vi: "Tiếng Việt",
  ja: "日本語",
};

export const getInitialAssistantMessage = (language: Language): string =>
  language === "ja"
    ? "こんにちは。私は **EduMentor AI**、IT分野の学習ロードマップとキャリア選択を支援するメンターです。\n\nWeb、モバイル、AI、組込み、サイバーセキュリティの比較、ポートフォリオ作成、面接準備、学習計画づくりまで相談できます。\n\nまずはどのテーマから話しましょうか。"
    : "Xin chào bạn thân mến! Mình là **EduMentor AI**, trợ lý tư vấn lộ trình học tập và định hướng nghề nghiệp công nghệ thông tin.\n\nMình có thể hỗ trợ giải đáp mọi thắc mắc của bạn về kiến thức lập trình, so sánh các lĩnh vực (Web, Mobile, AI, Hệ thống nhúng, An ninh mạng), tư vấn kỹ năng viết CV nổi bật hay chuẩn bị phỏng vấn tuyển dụng thực chiến.\n\nBạn muốn thảo luận về chủ đề gì trước tiên?";

const jaAssessmentQuestions: AssessmentQuestion[] = [
  {
    id: "q1",
    questionText: "あなたが最も研究・開発してみたい理想のITプロジェクトはどれですか。",
    options: [
      { text: "美しいUIと高速表示を備え、何百万人もの買い物客が使えるECサイト。", scoreValue: { web: 3, mobile: 1, ai: 0, embedded: 0, cyber: 0 } },
      { text: "GPS、通知、健康管理機能を備えた独自のモバイルアプリ。", scoreValue: { web: 1, mobile: 3, ai: 0, embedded: 0, cyber: 0 } },
      { text: "大量データから金融市場の変動を予測するAIモデル。", scoreValue: { web: 0, mobile: 0, ai: 3, embedded: 0, cyber: 0 } },
      { text: "センサー情報を使って照明やエアコンを自動制御するスマートホームシステム。", scoreValue: { web: 0, mobile: 0, ai: 1, embedded: 3, cyber: 0 } },
      { text: "脆弱性を自動で検出し、データを守るセキュリティ診断ツール。", scoreValue: { web: 0, mobile: 0, ai: 0, embedded: 0, cyber: 3 } },
    ],
  },
  {
    id: "q2",
    questionText: "開発サイクルの中で、あなたが一番関わりたい領域はどれですか。",
    options: [
      { text: "UI/UX、ボタン、色、アニメーションなど、ユーザーが直接触れる表示層。", scoreValue: { web: 3, mobile: 3, ai: 0, embedded: 0, cyber: 0 } },
      { text: "サーバー、API、データベース、認証など、システムを支えるバックエンド層。", scoreValue: { web: 3, mobile: 1, ai: 1, embedded: 0, cyber: 1 } },
      { text: "ニューラルネットワークやアルゴリズムなど、モデルが判断する知能層。", scoreValue: { web: 0, mobile: 0, ai: 3, embedded: 1, cyber: 0 } },
      { text: "基板、ドライバ、メモリ、レジスタなど、物理デバイスに近い低レイヤ。", scoreValue: { web: 0, mobile: 0, ai: 0, embedded: 3, cyber: 1 } },
      { text: "ネットワーク監視、暗号化、防御設計など、攻撃を防ぐセキュリティ層。", scoreValue: { web: 0, mobile: 0, ai: 0, embedded: 0, cyber: 3 } },
    ],
  },
  {
    id: "q3",
    questionText: "独学するとき、最もワクワクする言語・ツール群はどれですか。",
    options: [
      { text: "JavaScript、HTML/CSS、React、Tailwind CSS。世界中に届くWebを作る道具。", scoreValue: { web: 3, mobile: 1, ai: 0, embedded: 0, cyber: 0 } },
      { text: "Dart、Flutter、Kotlin、Swift。手のひらの中で動くアプリを作る道具。", scoreValue: { web: 1, mobile: 3, ai: 0, embedded: 0, cyber: 0 } },
      { text: "Python、Jupyter、Pandas、PyTorch。データから知識を引き出す道具。", scoreValue: { web: 0, mobile: 0, ai: 3, embedded: 0, cyber: 1 } },
      { text: "C/C++、バイナリ、レジスタ制御。ハードウェアを直接扱う道具。", scoreValue: { web: 0, mobile: 0, ai: 0, embedded: 3, cyber: 1 } },
      { text: "Linuxターミナル、Wireshark、Metasploitなど、システムを調べ守る道具。", scoreValue: { web: 0, mobile: 0, ai: 0, embedded: 1, cyber: 3 } },
    ],
  },
  {
    id: "q4",
    questionText: "難しいバグに出会ったとき、あなたに近い調べ方はどれですか。",
    options: [
      { text: "画面描画やAPIレスポンスを確認し、原因を素早く切り分ける。", scoreValue: { web: 3, mobile: 2, ai: 0, embedded: 0, cyber: 0 } },
      { text: "端末ログやメモリ使用量を観察し、モバイル上の挙動を丁寧に追う。", scoreValue: { web: 1, mobile: 3, ai: 0, embedded: 1, cyber: 0 } },
      { text: "モデルの指標やハイパーパラメータを見直し、実験で改善する。", scoreValue: { web: 0, mobile: 0, ai: 3, embedded: 0, cyber: 0 } },
      { text: "ICの電源、配線、ピン配置、ノイズを測定しながら確認する。", scoreValue: { embedded: 3, web: 0, mobile: 0, ai: 0, cyber: 0 } },
      { text: "攻撃者に悪用される可能性や、侵入経路にならないかを分析する。", scoreValue: { cyber: 3, web: 0, mobile: 0, ai: 0, embedded: 0 } },
    ],
  },
  {
    id: "q5",
    questionText: "今後5〜10年で最も大きな変化を生むトレンドは何だと思いますか。",
    options: [
      { text: "多くの体験が高速なWebアプリへ集約され、クラウド上で動くこと。", scoreValue: { web: 3, mobile: 1, ai: 1, embedded: 0, cyber: 0 } },
      { text: "スマートフォン、AR/VR、ウェアラブルが生活の中心になること。", scoreValue: { mobile: 3, web: 1, ai: 1, embedded: 1, cyber: 0 } },
      { text: "AIとLLMが作業を自動化し、産業全体の働き方を変えること。", scoreValue: { ai: 3, web: 0, mobile: 0, embedded: 1, cyber: 1 } },
      { text: "電気自動車、IoT、半導体、ロボットが現実世界を変えること。", scoreValue: { embedded: 3, ai: 1, web: 0, mobile: 0, cyber: 0 } },
      { text: "サイバー攻撃が増え、情報セキュリティが企業の生命線になること。", scoreValue: { cyber: 3, ai: 1, web: 0, mobile: 0, embedded: 0 } },
    ],
  },
  {
    id: "q6",
    questionText: "キャリアとして最も達成感を感じる瞬間はどれですか。",
    options: [
      { text: "美しいUIとデータ処理を組み合わせ、使いやすい画面を完成させること。", scoreValue: { web: 3, mobile: 2, ai: 0, embedded: 0, cyber: 0 } },
      { text: "自分のアプリがスマートフォン上で滑らかに動き、公開できる状態になること。", scoreValue: { mobile: 3, web: 2, ai: 0, embedded: 0, cyber: 0 } },
      { text: "長い学習の末、AIモデルの精度が大きく改善すること。", scoreValue: { ai: 3, web: 0, mobile: 0, embedded: 0, cyber: 0 } },
      { text: "マイコンに電源を入れ、ロボットやセンサーが思い通りに動くこと。", scoreValue: { embedded: 3, ai: 0, web: 0, mobile: 0, cyber: 0 } },
      { text: "難しいCTF問題を解き、脆弱性の仕組みを理解できること。", scoreValue: { cyber: 3, web: 0, mobile: 0, ai: 0, embedded: 0 } },
    ],
  },
];

const jaRecommendationBase: Record<string, Omit<CareerRecommendation, "percentageMatch" | "suitabilityScore" | "isAiGenerated" | "scores" | "aiError">> = {
  web: {
    matchedDomain: "web",
    analysisSummary: "あなたは、見やすいUI、快適なユーザー体験、そして多くの利用者を支えるWebシステムづくりに強い関心があります。フロントエンド、バックエンド、フルスタック開発は、実用的なプロダクトを形にしたいあなたに合っています。",
    prosAndCons: [
      { pro: "求人市場が大きく、学習成果を作品として見せやすい。", con: "技術変化が速く、継続的な学習が必要。" },
      { pro: "小さく始めやすく、画面上で成果を確認しやすい。", con: "ジュニア層は競争が高め。" },
    ],
    marketOutlook: {
      demand: "非常に高い。ほぼすべての企業がWeb/クラウド基盤を必要としています。",
      salary: "月額 1,200万〜3,500万 VND 程度（中級目安）",
      trends: "Next.js、Serverless、SSR、WebAssembly、クラウドネイティブ開発",
    },
    actionableTips: [
      "HTML、CSS、JavaScriptを基礎から固める。",
      "React/Next.jsとNode.js/Expressで小さなフルスタックアプリを作る。",
      "ECサイト、ブログ、学生向け管理ツールなど、完成度の高いポートフォリオを1つ作る。",
    ],
    customMessage: "Webの世界は、あなたのアイデアをすぐ形にできる場所です。小さな画面から、大きなサービスへ育てていきましょう。",
  },
  mobile: {
    matchedDomain: "mobile",
    analysisSummary: "あなたは、手元のデバイスで毎日使われるアプリを作ることに魅力を感じています。操作感、通知、オフライン対応、パフォーマンスなど、ユーザーに近い体験を磨くモバイル開発に向いています。",
    prosAndCons: [
      { pro: "個人でもアプリを公開でき、海外案件やリモート案件にもつながりやすい。", con: "iOS/Androidの環境差やストア審査への対応が必要。" },
      { pro: "専門性が高く、良いUI/UXを作れる人材は評価されやすい。", con: "端末テストやパフォーマンス調整に時間がかかる。" },
    ],
    marketOutlook: {
      demand: "高い。決済、教育、健康、物流など多くの分野でアプリ需要があります。",
      salary: "月額 1,500万〜4,000万 VND 程度",
      trends: "Flutter、React Native、Kotlin、Swift、モバイルUX最適化",
    },
    actionableTips: [
      "Flutter/React Nativeか、Kotlin/Swiftのどちらを主軸にするか決める。",
      "状態管理、API連携、ローカル保存、通知を含む小さなアプリを作る。",
      "GitHubやストア公開を想定して、スクリーンショットと説明文まで整える。",
    ],
    customMessage: "あなたのコードは、誰かの手のひらで毎日使われる体験になります。小さなアプリから始めて、使われる喜びを積み上げましょう。",
  },
  ai: {
    matchedDomain: "ai",
    analysisSummary: "あなたは、データの裏にある規則を見つけ、モデルに学習させ、予測や自動化を実現する領域に強く惹かれています。AI/Data Scienceは、数学的思考と実験が好きなあなたに合っています。",
    prosAndCons: [
      { pro: "将来性と収入水準が高く、研究・応用の両方に広がる。", con: "数学、統計、データ処理の基礎が重要。" },
      { pro: "LLMやRAGなど新しい応用領域が急成長している。", con: "成果を出すには継続的な実験と検証が必要。" },
    ],
    marketOutlook: {
      demand: "急増中。生成AI、データ分析、自動化を導入する企業が増えています。",
      salary: "月額 2,000万〜6,000万 VND 以上も可能",
      trends: "LLM、RAG、AI Agent、MLOps、Computer Vision、NLP",
    },
    actionableTips: [
      "Python、NumPy、Pandas、可視化の基礎を固める。",
      "線形代数、確率統計、微分の要点を機械学習と結びつけて学ぶ。",
      "Scikit-learnで小さな予測モデルを作り、その後PyTorchへ進む。",
    ],
    customMessage: "AIは世界の働き方を変えています。焦らず基礎を積み上げれば、あなたも賢いシステムを作る側に立てます。",
  },
  embedded: {
    matchedDomain: "embedded",
    analysisSummary: "あなたは、ソフトウェアがセンサー、モーター、マイコンなど現実世界のデバイスを動かす瞬間に魅力を感じています。組込み・IoTは、ハードとソフトをつなぐものづくり型のキャリアです。",
    prosAndCons: [
      { pro: "専門性が高く、自動車、ロボット、半導体、IoTなど産業応用が広い。", con: "実機、部品、測定器などの準備が必要になる。" },
      { pro: "低レイヤ理解が深まり、代替されにくいスキルになる。", con: "C/C++、メモリ、レジスタ、回路理解が必要。" },
    ],
    marketOutlook: {
      demand: "安定して高い。EV、スマート工場、IoT、半導体分野で需要があります。",
      salary: "月額 1,400万〜3,800万 VND 程度",
      trends: "ESP32、STM32、FreeRTOS、TinyML、RISC-V、車載システム",
    },
    actionableTips: [
      "C/C++、ポインタ、ビット演算、メモリ管理を重点的に学ぶ。",
      "Arduino、ESP32、STM32などでLED、センサー、通信を実験する。",
      "I2C、SPI、UART、PWM、割り込みを使った小さな作品を作る。",
    ],
    customMessage: "あなたのコードは画面の中だけでなく、現実の機械を動かします。小さなLED点灯から大きな制御システムへ進みましょう。",
  },
  cyber: {
    matchedDomain: "cyber",
    analysisSummary: "あなたは、システムの弱点を見抜き、攻撃の可能性を考え、防御策を設計する思考に向いています。サイバーセキュリティは、好奇心と責任感を両立できる人に合う分野です。",
    prosAndCons: [
      { pro: "金融、政府、企業など幅広い組織で重要性が高い。", con: "障害対応やインシデント時の責任が大きい。" },
      { pro: "Red Team、Blue Team、Cloud Securityなど進路が多様。", con: "ネットワーク、OS、Web、暗号など幅広い知識が必要。" },
    ],
    marketOutlook: {
      demand: "非常に高い。ランサムウェア、情報漏えい、クラウド移行で需要が増えています。",
      salary: "月額 1,800万〜5,000万 VND 程度",
      trends: "Zero Trust、Cloud Security、DevSecOps、SOC、AI Security",
    },
    actionableTips: [
      "TCP/IP、Linux、Webの基礎をしっかり理解する。",
      "OWASP Top 10を学び、脆弱性の仕組みと防御策をセットで覚える。",
      "TryHackMe、Hack The Box、CTFで実践経験を積む。",
    ],
    customMessage: "安全なデジタル社会には、仕組みを深く理解して守れる人が必要です。倫理を大切に、鋭い観察力を磨いていきましょう。",
  },
};

const jaCareerPathText: Record<string, Partial<CareerPathData>> = {
  web: {
    title: "Web開発者 (Web Developer)",
    subTitle: "クラウド上で動く使いやすいデジタル基盤をつくる",
    description: "Web開発者は、フロントエンドの体験設計とバックエンドのデータ処理を組み合わせ、ブラウザから利用できるサービスを形にします。",
    averageSalary: "月額 1,200万〜3,500万 VND",
    outlook: "安定成長。年間を通じて求人が多い分野",
  },
  mobile: {
    title: "モバイルアプリ開発者 (Mobile App Developer)",
    subTitle: "スマートフォン上で快適に動くアプリ体験を設計する",
    description: "モバイル開発者は、iOS/Android向けに直感的で高速なアプリを作り、通知、位置情報、オフライン保存など端末ならではの機能を活用します。",
    averageSalary: "月額 1,500万〜4,000万 VND",
    outlook: "スーパーアプリ、FinTech、教育、ヘルスケアで需要が高い",
  },
  ai: {
    title: "AI・データサイエンスエンジニア",
    subTitle: "データから知識を抽出し、賢いシステムを作る",
    description: "AIエンジニアは、データ処理、機械学習、深層学習、LLM応用を通じて、予測・分類・自動化を実現します。",
    averageSalary: "月額 2,000万〜6,000万 VND 以上",
    outlook: "生成AIとデータ活用の拡大により急成長",
  },
  embedded: {
    title: "組込み・IoTエンジニア",
    subTitle: "ハードウェアに知能を与え、現実世界を制御する",
    description: "組込みエンジニアは、マイコン、センサー、通信、リアルタイム制御を扱い、ロボット、IoT、自動車、スマートデバイスを動かします。",
    averageSalary: "月額 1,400万〜3,800万 VND",
    outlook: "EV、半導体、スマート工場、IoTで安定需要",
  },
  cyber: {
    title: "サイバーセキュリティ専門家",
    subTitle: "デジタル空間を守る防御の専門職",
    description: "セキュリティ専門家は、ネットワーク、Web、OS、暗号、監視を理解し、攻撃の検出、脆弱性診断、防御設計を行います。",
    averageSalary: "月額 1,800万〜5,000万 VND",
    outlook: "人材不足が続き、重要度が高まり続ける分野",
  },
};

const phaseTitles: Record<string, { title: string; description: string }> = {
  "web-p1": { title: "Phase 1: 基礎とWebの土台", description: "HTML/CSS、JavaScript、Webの仕組みを固め、画面を構造的に作る力を身につけます。" },
  "web-p2": { title: "Phase 2: モダンフロントエンド", description: "Reactと状態管理を使って、保守しやすいSPAを構築します。" },
  "web-p3": { title: "Phase 3: バックエンドとデータ設計", description: "API、認証、データベースを学び、実用的なWebサービスを支えます。" },
  "web-p4": { title: "Phase 4: 実務化とフルスタック作品", description: "Next.js、Docker、デプロイまで含めて、採用で見せられる作品に仕上げます。" },
  "mob-p1": { title: "Phase 1: モバイルUIと基礎言語", description: "Dart/FlutterまたはKotlin/Swiftの基礎と、モバイルUIの考え方を学びます。" },
  "mob-p2": { title: "Phase 2: 状態管理とAPI連携", description: "画面遷移、状態管理、REST API、ローカル保存を扱えるようにします。" },
  "mob-p3": { title: "Phase 3: ネイティブ機能と品質改善", description: "通知、位置情報、カメラ、パフォーマンス調整を学びます。" },
  "mob-p4": { title: "Phase 4: 公開とポートフォリオ化", description: "ストア公開を意識して、完成度の高いアプリを作ります。" },
  "ai-p1": { title: "Phase 1: 数学とPython基礎", description: "AI学習の土台となるPython、線形代数、確率統計を身につけます。" },
  "ai-p2": { title: "Phase 2: データ処理と古典的機械学習", description: "Pandas、可視化、Scikit-learnで予測モデルを作ります。" },
  "ai-p3": { title: "Phase 3: 深層学習とCV/NLP", description: "PyTorch、CNN、Transformerを使い、画像やテキストを扱います。" },
  "ai-p4": { title: "Phase 4: LLMとRAGシステム", description: "生成AI、プロンプト設計、Vector DB、RAGアプリを学びます。" },
  "emb-p1": { title: "Phase 1: C言語と電子回路基礎", description: "C/C++、ポインタ、ビット演算、回路図の読み方を学びます。" },
  "emb-p2": { title: "Phase 2: マイコンと通信規格", description: "GPIO、割り込み、ADC、I2C/SPI/UARTを使ってデバイスを制御します。" },
  "emb-p3": { title: "Phase 3: リアルタイムOS", description: "FreeRTOSのタスク、キュー、セマフォを使い、複数処理を安全に動かします。" },
  "emb-p4": { title: "Phase 4: IoTとTinyML", description: "MQTT、BLE/Wi-Fi、クラウド連携、マイコン上の機械学習を扱います。" },
  "cyb-p1": { title: "Phase 1: ネットワークとOS基礎", description: "TCP/IP、Linux、権限、暗号の基本を理解します。" },
  "cyb-p3": { title: "Phase 3: 監視とインシデント対応", description: "SOC、SIEM、IDS/IPS、ログ分析を通じて防御側の力を磨きます。" },
  "cyb-p4": { title: "Phase 4: CTF・資格・実戦経験", description: "CTF、Bug Bounty、資格学習を通じて実務に近い経験を積みます。" },
};

const milestoneText: Record<string, Partial<MilestoneData>> = {
  "m-web-1": {
    title: "HTML5とCSS3を深く学ぶ",
    duration: "3〜4週間",
    description: "セマンティックHTML、Flexbox、Grid、レスポンシブ設計を学び、検索にも使いやすい画面を作ります。",
    checklist: ["セマンティックHTMLを理解する", "FlexboxとCSS Gridでレイアウトする", "メディアクエリでレスポンシブ対応する", "個人プロフィールのランディングページを作る"],
  },
  "m-web-2": {
    title: "JavaScript (ES6+) 基礎から応用",
    duration: "4〜5週間",
    description: "変数、制御構文、DOM、イベント、非同期処理、JSON/API連携を学びます。",
    checklist: ["データ型、条件分岐、ループを理解する", "DOM操作とイベント処理を練習する", "Promiseとasync/awaitを使う", "Fetch APIでJSONを読み込む"],
  },
  "m-web-3": {
    title: "React.jsとTailwind CSS",
    duration: "5〜6週間",
    description: "コンポーネント、Props、Hooks、状態管理、ユーティリティCSSによる高速なUI構築を学びます。",
    checklist: ["JSX、Component、Propsを理解する", "useState/useEffect/useMemoを使う", "React Routerで画面遷移を作る", "Context APIまたはRedux Toolkitで状態管理する"],
  },
  "m-web-4": {
    title: "Node.jsとExpress",
    duration: "4〜5週間",
    description: "Event Loop、REST API、middleware、エラー処理、認証の基本を学びます。",
    checklist: ["Node.jsの非同期I/Oを理解する", "ExpressでAPIルーティングを作る", "JWT認証を導入する", "エラー処理と権限制御のmiddlewareを書く"],
  },
  "m-web-5": {
    title: "データベース (PostgreSQL / MongoDB)",
    duration: "3〜4週間",
    description: "テーブル設計、リレーション、クエリ、ORM、インデックス最適化を学びます。",
    checklist: ["テーブル、外部キー、制約を設計する", "JOINやGROUP BYを使う", "PrismaまたはMongooseを試す", "インデックスで読み書きを最適化する"],
  },
  "m-web-6": {
    title: "Next.jsとDocker",
    duration: "4週間",
    description: "SSR、SEO、Docker、デプロイを学び、フルスタック作品を公開します。",
    checklist: ["Next.js App Routerを理解する", "SEOとCore Web Vitalsを改善する", "Dockerfileでアプリをコンテナ化する", "VPSまたはCloud Runへデプロイする"],
  },
  "m-mob-1": {
    title: "FlutterまたはNative開発の基礎",
    duration: "4〜5週間",
    description: "モバイルUI、画面遷移、基本ウィジェット、言語文法を学びます。",
    checklist: ["Dart/Kotlin/Swiftの基礎文法を学ぶ", "画面レイアウトを作る", "フォーム入力とバリデーションを扱う", "小さなToDoアプリを作る"],
  },
  "m-mob-2": {
    title: "状態管理とAPI連携",
    duration: "5週間",
    description: "アプリ内状態、REST API、ローカルDB、非同期処理を実装します。",
    checklist: ["Riverpod/BlocまたはProviderを試す", "APIからデータを取得する", "SQLite/Hive/Roomで保存する", "ローディングとエラー状態を設計する"],
  },
  "m-mob-3": {
    title: "ネイティブ機能とパフォーマンス",
    duration: "4〜5週間",
    description: "通知、位置情報、カメラ、権限、メモリ使用量の最適化を学びます。",
    checklist: ["Push通知を実装する", "GPSやカメラを利用する", "権限リクエストを正しく扱う", "端末上で速度とメモリを確認する"],
  },
  "m-mob-4": {
    title: "公開レベルのアプリ制作",
    duration: "4週間",
    description: "UI品質、テスト、ビルド、ストア公開準備まで整えます。",
    checklist: ["完成アプリの要件を決める", "主要画面のテストを行う", "アイコンとスクリーンショットを用意する", "GitHub READMEを整える"],
  },
  "m-ai-1": {
    title: "Python・数学・統計の基礎",
    duration: "5週間",
    description: "Python文法、データ構造、線形代数、確率統計をAIの文脈で学びます。",
    checklist: ["PythonのList/Dict/関数を使う", "NumPyで行列計算を行う", "確率分布と統計量を理解する", "小さなデータ分析ノートを作る"],
  },
  "m-ai-2": {
    title: "Pandas、NumPy、Scikit-learn",
    duration: "5週間",
    description: "欠損値処理、可視化、回帰、分類、クラスタリングを実践します。",
    checklist: ["Pandasで前処理を行う", "Matplotlib/Seabornで可視化する", "回帰・決定木・SVMを試す", "K-MeansとPCAを理解する"],
  },
  "m-ai-3": {
    title: "ニューラルネットワークとPyTorch",
    duration: "6〜7週間",
    description: "MLP、CNN、Transformer、学習ループを理解し、画像やテキスト処理へ進みます。",
    checklist: ["MLPの基本構造を理解する", "CNNで画像分類を行う", "Self-Attentionの考え方を学ぶ", "PyTorchで学習コードを書く"],
  },
  "m-ai-4": {
    title: "生成AI、Prompt Engineering、RAG",
    duration: "4〜5週間",
    description: "LLM API、プロンプト設計、Vector DB、RAGチャットボットの構築を学びます。",
    checklist: ["良いプロンプトの構造を学ぶ", "PDFや文書を使うRAGを作る", "Vector DBの役割を理解する", "Fine-tuningの基本概念を知る"],
  },
  "m-emb-1": {
    title: "組込みCと電子回路基礎",
    duration: "5週間",
    description: "C言語、ポインタ、ビット演算、メモリ、回路図、測定の基礎を学びます。",
    checklist: ["ビット演算を練習する", "ポインタとメモリ構造を理解する", "回路図を読む", "テスターで電圧を測定する"],
  },
  "m-emb-2": {
    title: "STM32またはESP32実践",
    duration: "6週間",
    description: "GPIO、割り込み、タイマー、PWM、ADC、I2C/SPI/UARTを使います。",
    checklist: ["GPIOを制御する", "割り込みとタイマーを使う", "ADCでアナログ値を読む", "I2C/SPI/UARTでセンサーと通信する"],
  },
  "m-emb-3": {
    title: "FreeRTOS実践",
    duration: "4〜5週間",
    description: "タスク、優先度、セマフォ、Mutex、Queueを使い、リアルタイム処理を学びます。",
    checklist: ["タスクを作成し優先度を設定する", "SemaphoreとMutexで同期する", "Queueでデータを渡す", "deadlockやheap不足を調査する"],
  },
  "m-emb-4": {
    title: "Wi-Fi/BLE IoTとTinyML",
    duration: "4週間",
    description: "MQTT、クラウド連携、Web dashboard、マイコン向け機械学習を試します。",
    checklist: ["MQTTでクラウドへ送信する", "ESP32 Web Serverを作る", "小さなMLモデルをマイコンへ載せる", "加速度センサーでジェスチャー認識を試す"],
  },
  "m-cyb-1": {
    title: "ネットワークとLinux管理",
    duration: "5週間",
    description: "OSI、TCP/IP、DNS、HTTP、TLS、Linux権限、暗号の基礎を学びます。",
    checklist: ["IPv4/IPv6、Routing、Subnettingを理解する", "TCP/UDP/DNS/HTTP/TLSを説明できる", "Linux shellとsudo権限を扱う", "AES/RSA/SHA256の役割を理解する"],
  },
  "m-cyb-2": {
    title: "Web脆弱性診断: OWASP Top 10",
    duration: "5〜6週間",
    description: "Burp Suite、SQL Injection、XSS、認証不備、CORSなどを安全な環境で学びます。",
    checklist: ["Burp Suiteで通信を観察する", "SQL Injectionを理解する", "XSSの仕組みと防御を学ぶ", "CORSとサーバー設定を確認する"],
  },
  "m-cyb-3": {
    title: "SOC、SIEM、マルウェア検知",
    duration: "5週間",
    description: "ログ分析、SIEM、IDS/IPS、Nmap、インシデント対応の基礎を学びます。",
    checklist: ["Nmapでポートスキャンを行う", "SIEM/Splunkの基本を知る", "Snortの検知ルールを試す", "隔離環境でマルウェア分析の流れを学ぶ"],
  },
  "m-cyb-4": {
    title: "CTF、Bug Bounty、資格準備",
    duration: "4週間",
    description: "CTF練習、Bug Bountyのルール、CEH/OSCP/Security+などの資格学習を進めます。",
    checklist: ["CTFtimeや演習サイトに参加する", "Bug Bountyのルールを読む", "CEH/OSCP/Security+の範囲を確認する", "倫理的ハッキングの原則を守る"],
  },
};

const jaResourceTitles: Record<string, string[]> = {
  "m-web-1": [
    "W3Schools HTML/CSSチュートリアル",
    "F8 Education HTML/CSS入門（無料）",
    "制作課題: レスポンシブな個人CVページ",
  ],
  "m-web-2": [
    "javascript.info - JavaScript学習ガイド",
    "F8 JavaScript基礎・応用講座",
  ],
  "m-web-3": [
    "React公式ドキュメント",
    "Tailwind CSS公式ドキュメント",
    "制作課題: 個人タスク管理Dashboard",
  ],
  "m-web-4": ["Express.js公式ガイド"],
  "m-web-5": ["SQL Tutorial - 視覚的に学ぶSQL演習"],
  "m-web-6": [
    "Next.js学習コース",
    "制作課題: 学生向け小規模SNS（Next.js + DB）",
  ],
  "m-mob-1": ["Dart公式サイト - 詳細ガイド"],
  "m-mob-2": ["Flutter Widget動画シリーズ"],
  "m-mob-3": [
    "Riverpod Docs - Flutter状態管理",
    "制作課題: オフライン対応グルメ探索アプリ",
  ],
  "m-mob-4": ["Flutterアプリ公開ガイド"],
  "m-ai-1": [
    "Khan Academy - 線形代数と確率統計",
    "Mathematics for Machine Learning - 無料書籍",
  ],
  "m-ai-2": [
    "Kaggle Learn - 機械学習入門",
    "制作課題: 位置情報から住宅価格を予測",
  ],
  "m-ai-3": ["Coursera Andrew Ng 深層学習Specialization"],
  "m-ai-4": [
    "DeepLearning.AI - 生成AI短期講座",
    "制作課題: 学校規程QAチャットボット（Next.js + LLM API）",
  ],
  "m-emb-1": ["Embedded C Programming Course - メモリ最適化"],
  "m-emb-2": ["制作課題: LCD表示付きスマート空気品質測定ステーション"],
  "m-emb-3": ["FreeRTOS公式ドキュメント"],
  "m-emb-4": ["Harvard TinyML Course（EdX無料講座）"],
  "m-cyb-1": ["Kurose教授のComputer Networking講座"],
  "m-cyb-2": [
    "PortSwigger Web Security Academy",
    "TryHackMe 実践ラボ",
  ],
  "m-cyb-3": ["CompTIA Security+ Blueprint - 基礎教材"],
  "m-cyb-4": [
    "Hack The Box 実践ラボ",
    "制作課題: Active Directory攻防ラボ環境",
  ],
};

const localizeMilestone = (milestone: MilestoneData): MilestoneData => ({
  ...milestone,
  ...milestoneText[milestone.id],
  resources: milestone.resources.map((resource, index) => ({
    ...resource,
    title: jaResourceTitles[milestone.id]?.[index] || resource.title,
  })),
});

const localizePhase = (phase: PhaseData): PhaseData => ({
  ...phase,
  ...(phaseTitles[phase.id] || (phase.id === "emb-p2" ? { title: "Phase 2: Web侵入テスト", description: "攻撃者の視点を学び、Webの弱点を安全な環境で見つける力を磨きます。" } : {})),
  milestones: phase.milestones.map(localizeMilestone),
});

export const getAssessmentQuestions = (language: Language): AssessmentQuestion[] =>
  language === "ja" ? jaAssessmentQuestions : assessmentQuestions;

export const getCareerPaths = (language: Language): Record<string, CareerPathData> => {
  if (language === "vi") return careerPathsData;

  return Object.fromEntries(
    Object.entries(careerPathsData).map(([id, path]) => [
      id,
      {
        ...path,
        ...jaCareerPathText[id],
        phases: path.phases.map(localizePhase),
      },
    ])
  );
};

export const localizeRecommendation = (
  recommendation: CareerRecommendation,
  language: Language
): CareerRecommendation => {
  if (language === "vi") return recommendation;

  const base = jaRecommendationBase[recommendation.matchedDomain];
  if (!base) return recommendation;

  return {
    ...recommendation,
    ...base,
    percentageMatch: recommendation.percentageMatch,
    suitabilityScore: recommendation.suitabilityScore,
    isAiGenerated: recommendation.isAiGenerated,
    scores: recommendation.scores,
    aiError: recommendation.aiError,
  };
};
