import React from "react";
import { 
  Sparkles, 
  Flame, 
  Compass, 
  TrendingUp, 
  CheckCircle2, 
  GraduationCap, 
  Award, 
  Target, 
  ArrowRight,
  BookOpen,
  Calendar,
  AlertCircle
} from "lucide-react";
import { CareerRecommendation } from "../types";
import { getCareerPaths, Language } from "../i18n";

interface StatsDashboardProps {
  selectedPathId: string;
  setSelectedPathId: (pathId: string) => void;
  completedMilestones: string[];
  activeRecommendation: CareerRecommendation | null;
  setActiveTab: (tab: "dashboard" | "assessment" | "roadmap" | "chat") => void;
  completionRate: number;
  language: Language;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  selectedPathId,
  setSelectedPathId,
  completedMilestones,
  activeRecommendation,
  setActiveTab,
  completionRate,
  language,
}) => {
  const isJa = language === "ja";
  const careerPathsData = getCareerPaths(language);
  const currentPath = careerPathsData[selectedPathId] || careerPathsData.web;

  // Retrieve total milestones in current path to evaluate progress
  const totalMilestonesCount = currentPath.phases.reduce((acc, p) => acc + p.milestones.length, 0);
  const completedCount = currentPath.phases.reduce((acc, p) => {
    return acc + p.milestones.filter(m => completedMilestones.includes(m.id)).length;
  }, 0);

  // Identify next uncompleted milestone
  let nextMilestone: any = null;
  for (const phase of currentPath.phases) {
    const uncompleted = phase.milestones.find(m => !completedMilestones.includes(m.id));
    if (uncompleted) {
      nextMilestone = uncompleted;
      break;
    }
  }

  // Adaptive motivational advice
  const getMotivationalText = (rate: number) => {
    if (isJa) {
      if (rate === 0) return "素晴らしいスタートです。適性診断を受けるか、「学習を続ける」から最初の章を始めましょう。";
      if (rate < 30) return "いい流れです。キャリアの土台になる最初の一歩を積み上げています。毎日15分でも継続しましょう。";
      if (rate < 70) return "順調です。実践課題に取り組むことで、知識がポートフォリオに変わります。";
      if (rate < 100) return "あと少しで完走です。残りの深掘り milestone を仕上げて、応募できる状態へ近づきましょう。";
      return "おめでとうございます。ロードマップを完了しました。作品を整えて応募に進める状態です。";
    }
    if (rate === 0) return "Khởi đầu tuyệt diệu! Hãy kích hoạt bài thi năng lực hoặc bấm nút \"Học Tiếp\" để học chương đầu tiên.";
    if (rate < 30) return "Cực tốt! Bạn đã đặt những viên gạch móng đầu tiên cho sự nghiệp. Hãy duy trì đều đặn 15 phút mỗi ngày nhé.";
    if (rate < 70) return "Phong độ xuất sắc! Bạn đang sở hữu đà tiến bộ vượt trội. Tập trung giải quyết các bài tập thực chiến (Project) nào!";
    if (rate < 100) return "Sắp chạm tới vinh quang! Chỉ còn vài milestone chuyên sâu nữa thôi. Cố lên, nhà tuyển dụng đang đợi bạn.";
    return "Chúc mừng bạn! Bạn đã hoàn thành xuất sắc toàn bộ giáo trình. Sẵn sàng tỏa sáng và ứng tuyển ngay!";
  };

  // Accent helper
  const getAccentColors = (accent: string) => {
    switch (accent) {
      case "emerald": return { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" };
      case "cyan": return { text: "text-cyan-700", bg: "bg-cyan-50", border: "border-cyan-200" };
      case "violet": return { text: "text-violet-750", bg: "bg-violet-50", border: "border-violet-200" };
      case "amber": return { text: "text-amber-700 font-bold", bg: "bg-amber-50", border: "border-amber-200" };
      case "rose": return { text: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200" };
      default: return { text: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" };
    }
  };

  const pathAccent = getAccentColors(currentPath.accentColor);

  return (
    <div className="py-8 px-4 md:px-8 max-w-6xl mx-auto space-y-8 animate-fade-in">
      
      {/* 1. PERSONAL GREETING & ENCOURAGING MESSAGE HERO HEADER */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute right-[-20px] top-[-20px] w-60 h-60 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-[-20px] bottom-[-20px] w-60 h-60 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <span className="font-mono text-[9px] text-blue-700 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-full border border-blue-105 font-bold">
              {isJa ? "スマートガイダンスシステム" : "Hệ thống định hướng thông minh"}
            </span>
            <h1 className="font-sans font-extrabold text-xl md:text-3xl text-slate-900 tracking-tight leading-normal">
              {isJa ? "ようこそ" : "Chào mừng bạn đến với"} <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-650 to-indigo-500 bg-clip-text text-transparent font-black">
                {isJa ? "ITエンジニアへの学習ジャーニー" : "Hành Trình Kiến Tạo Kỹ Sư IT"}
              </span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 max-w-xl font-sans font-medium">
              &ldquo;{getMotivationalText(completionRate)}&rdquo;
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              id="dash-btn-start-quiz"
              onClick={() => setActiveTab("assessment")}
              className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold text-xs px-5 py-3 rounded-lg shadow-md shadow-blue-600/10 transition-colors cursor-pointer"
            >
              <Award className="h-4 w-4" />
              <span>{isJa ? "適性診断" : "Khảo Sát Năng Lực"}</span>
            </button>

            <button
              id="dash-btn-resume"
              onClick={() => setActiveTab("roadmap")}
              className="flex items-center space-x-1.5 bg-white hover:bg-slate-50 border border-slate-205 text-slate-700 font-sans font-bold text-xs px-5 py-3 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <span>{isJa ? "学習を続ける" : "Học Tiếp"}</span>
              <ArrowRight className="h-4 w-4 text-blue-600" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. CORE BENTO WIDGETS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Bento Widget 1: My Progress Overview */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-sans font-bold text-xs text-slate-500 uppercase tracking-widest">
              {isJa ? "現在の進捗" : "Tiến trình học hiện tại"}
            </h3>
            <Flame className="h-4 w-4 text-amber-500 shrink-0" />
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-mono font-black text-slate-900">{completionRate}%</span>
            <span className="text-xs text-slate-500 font-sans">{isJa ? "完了" : "hoàn thành lộ trình"}</span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${currentPath.colorTheme} rounded-full transition-all duration-500`}
              style={{ width: `${completionRate}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
            <span>{isJa ? "完了" : "Hoàn thành"}: {completedCount}/{totalMilestonesCount}</span>
            <span>{isJa ? "目安" : "Ước lượng"}: {totalMilestonesCount * 4} {isJa ? "週間" : "tuần"}</span>
          </div>
        </div>

        {/* Bento Widget 2: Next Lesson focused study */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-sans font-bold text-xs text-slate-500 uppercase tracking-widest">
                {isJa ? "次の目標" : "Đích ngắm tiếp theo"}
              </h3>
              <Target className="h-4 w-4 text-blue-600" />
            </div>

            {nextMilestone ? (
              <div className="space-y-1">
                <span className="font-sans font-bold text-xs text-slate-900 block line-clamp-1">
                  {nextMilestone.title}
                </span>
                <span className="text-[10px] text-slate-500 font-mono flex items-center space-x-1">
                  <Calendar className="h-3 w-3 shrink-0" />
                  <span>{isJa ? "目安" : "Dự kiến"}: {nextMilestone.duration}</span>
                </span>
                <span className="text-[10px] text-slate-600 font-sans line-clamp-1 block pt-1">
                  {nextMilestone.description}
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5 p-2 bg-emerald-50 border border-emerald-100 rounded text-[11px] text-emerald-800">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span className="font-medium">{isJa ? "おめでとうございます。すべての目標を完了しました。" : "Chúc mừng! Bạn đã hoàn thành mọi mục tiêu"}</span>
              </div>
            )}
          </div>

          {nextMilestone && (
            <button
              onClick={() => setActiveTab("roadmap")}
              className="text-[10px] font-sans font-bold text-blue-600 hover:text-blue-750 flex items-center space-x-1 pt-3 self-start cursor-pointer"
            >
              <span>{isJa ? "詳細を見る" : "Xem chi tiết nội dung"}</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Bento Widget 3: Competence Profile Analysis */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-sans font-bold text-xs text-slate-500 uppercase tracking-widest">
                {isJa ? "適性プロフィール" : "Hồ sơ định hướng AI/ML"}
              </h3>
              <Sparkles className="h-4 w-4 text-indigo-500 shrink-0" />
            </div>

            {activeRecommendation ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-bold text-slate-800">
                    {activeRecommendation.matchedDomain.toUpperCase()} Specialist
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-600">{activeRecommendation.percentageMatch}%</span>
                </div>
                <p className="text-[10px] text-slate-600 line-clamp-2 leading-relaxed">
                  {activeRecommendation.analysisSummary}
                </p>
              </div>
            ) : (
              <div className="p-3 bg-blue-50/50 border border-blue-100/60 rounded-lg text-center space-y-2">
                <p className="text-[10px] text-slate-600 font-sans leading-relaxed">
                  {isJa ? "EduPathITの適性診断はまだ完了していません。" : "Bạn chưa thực hiện trắc nghiệm năng lực của EduPathIT."}
                </p>
              </div>
            )}
          </div>

          {!activeRecommendation ? (
            <button
              onClick={() => setActiveTab("assessment")}
              className="text-xs font-sans font-bold text-blue-600 hover:text-blue-750 flex items-center space-x-1.5 pt-3 self-start cursor-pointer group"
            >
              <span>{isJa ? "今すぐ診断する" : "Kiểm định năng lượng ngay"}</span>
              <ArrowRight className="h-4 w-4 text-blue-650 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <button
              onClick={() => setActiveTab("assessment")}
              className="text-[10px] font-sans font-bold text-blue-600 hover:text-blue-750 flex items-center space-x-1 pt-3 self-start cursor-pointer"
            >
              <span>{isJa ? "分析を見る" : "Xem lại chi tiết phân tích"}</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* 3. UNDERSTAND DIFFERENT IT DISCIPLINES ROADMAP PORTAL */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-sans font-extrabold text-sm md:text-lg text-slate-900 leading-normal">
            {isJa ? "主要5分野のITロードマップ" : "Bản Đồ 5 Phân Ngành IT Hàng Đầu"}
          </h2>
          <p className="font-sans text-xs text-slate-500 block">
            {isJa ? "分野を選ぶと、対応する学習ロードマップと参考資料を開けます。" : "Click vào bất kỳ phân ngành nào dưới đây để lập tức mở khóa sơ đồ học tập và tài liệu học tương ứng."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" id="home-pathways-cards-container">
          {Object.values(careerPathsData).map((path) => {
            const isCurrentlySelected = selectedPathId === path.id;
            const colors = getAccentColors(path.accentColor);

            return (
              <div
                key={path.id}
                id={`dash-path-card-${path.id}`}
                onClick={() => {
                  setSelectedPathId(path.id);
                  setActiveTab("roadmap");
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex flex-col justify-between h-[160px] group shadow-xs ${
                  isCurrentlySelected
                    ? `${colors.border} ${colors.bg} ring-1 ring-slate-250`
                    : "border-slate-200 hover:border-blue-300 bg-white hover:bg-slate-50/50 hover:scale-[1.01]"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-[9px] px-2 py-0.5 rounded-full border ${colors.border} ${colors.text} font-bold`}>
                      {path.id.toUpperCase()}
                    </span>
                    {isCurrentlySelected && (
                      <Flame className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    )}
                  </div>
                  
                  <span className="font-sans font-bold text-xs md:text-sm text-slate-800 block line-clamp-2 leading-snug group-hover:text-slate-950 transition-colors">
                    {path.title.split("(")[0].trim()}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] text-slate-500 font-sans line-clamp-2">
                    {path.subTitle}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[9px] font-mono text-slate-500 block truncate max-w-[124px]">
                      {path.averageSalary.split("/")[0].trim()}
                    </span>
                    <span className="text-[9px] font-sans font-bold text-blue-600 group-hover:text-blue-750 flex items-center space-x-0.5 shrink-0 transition-colors">
                      <span>{isJa ? "開始" : "Bắt đầu"}</span>
                      <ArrowRight className="h-2.5 w-2.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
