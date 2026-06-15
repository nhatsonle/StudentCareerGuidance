import React, { useState } from "react";
import { 
  Compass, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  RefreshCw, 
  Bookmark, 
  CheckCircle2, 
  AlertTriangle,
  Flame, 
  TrendingUp, 
  DollarSign, 
  Check, 
  X,
  Target
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AssessmentQuestion, CareerRecommendation } from "../types";
import { getAssessmentQuestions, Language } from "../i18n";

interface AssessmentCenterProps {
  onRecommendationReceived: (recommendation: CareerRecommendation) => void;
  onRestartAssessment: () => void;
  activeRecommendation: CareerRecommendation | null;
  setActiveTab: (tab: "dashboard" | "assessment" | "roadmap") => void;
  setSelectedPathId: (pathId: string) => void;
  language: Language;
}

export const AssessmentCenter: React.FC<AssessmentCenterProps> = ({
  onRecommendationReceived,
  onRestartAssessment,
  activeRecommendation,
  setActiveTab,
  setSelectedPathId,
  language,
}) => {
  const isJa = language === "ja";
  const assessmentQuestions = getAssessmentQuestions(language);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loadingStepText, setLoadingStepText] = useState<string>("");

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentStep(0);
    setSelectedOptions({});
    setSubmitError(null);
  };

  const handleRestartQuiz = () => {
    onRestartAssessment();
    handleStartQuiz();
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentStep < assessmentQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const runLoadingAnimationText = () => {
    const texts = isJa
      ? [
          "回答データを整理しています...",
          "適性スコアのバランスを計算しています...",
          "EduPathメンターエンジンを準備しています...",
          "採用市場の傾向と照合しています...",
          "個別ロードマップを組み立てています...",
          "準備できました。結果を表示します..."
        ]
      : [
          "Đang truyền tải dữ liệu tự khai báo...",
          "Đang cân đối điểm số ma trận năng lực...",
          "Kết nối AI cố vấn của EduPath...",
          "Đang phân tích xu hướng vị trí tuyển dụng...",
          "Đang lập lộ trình cá nhân hóa dài hạn...",
          "Mọi thứ đã sẵn sàng! Đang tải kết quả..."
        ];
    let i = 0;
    setLoadingStepText(texts[0]);
    const interval = setInterval(() => {
      i++;
      if (i < texts.length) {
        setLoadingStepText(texts[i]);
      } else {
        clearInterval(interval);
      }
    }, 1200);
    return interval;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    const interval = runLoadingAnimationText();

    // Organize selected answers structure matching server EXPECTED parameters
    const answersPayload = assessmentQuestions.map((q) => {
      const selectedIdx = selectedOptions[q.id];
      const opt = q.options[selectedIdx];
      return {
        questionId: q.id,
        questionText: q.questionText,
        selectedOptionText: opt.text,
        scoreValue: opt.scoreValue,
      };
    });

    try {
      const response = await fetch("/api/analyze-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: answersPayload }),
      });

      clearInterval(interval);

      if (!response.ok) {
        throw new Error(isJa ? "採点サーバーに接続できません。もう一度お試しください。" : "Không thể kết nối máy chủ để chấm điểm. Vui lòng thử lại!");
      }

      const data: CareerRecommendation = await response.json();
      onRecommendationReceived(data);
      setQuizStarted(false);
    } catch (error: any) {
      console.error("Submission failed:", error);
      setSubmitError(error.message || (isJa ? "予期しないエラーが発生しました。もう一度送信してください。" : "Đã xảy ra lỗi ngoài ý muốn. Vui lòng nhấn gửi lại."));
      clearInterval(interval);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleActivatePath = (pathId: string) => {
    setSelectedPathId(pathId);
    setActiveTab("roadmap");
  };

  // Helper values
  const currentQuestion = assessmentQuestions[currentStep];
  const totalQuestions = assessmentQuestions.length;
  const isSelected = selectedOptions[currentQuestion?.id] !== undefined;
  const progressPercentage = Math.round(((Object.keys(selectedOptions).length) / totalQuestions) * 100);

  // Style helpers for matchedDomain
  const getDomainStyle = (domain: string) => {
    switch (domain) {
      case "web":
        return {
          title: isJa ? "Web開発 (Web Dev)" : "Phát Triển Web (Web Dev)",
          bg: "bg-emerald-50 border-emerald-200",
          text: "text-emerald-700 font-bold",
          glow: "shadow-emerald-500/5",
          gradient: "from-emerald-650 to-teal-600"
        };
      case "mobile":
        return {
          title: isJa ? "モバイル開発 (Mobile Dev)" : "Lập Trình Di Động (Mobile Dev)",
          bg: "bg-cyan-50 border-cyan-200",
          text: "text-cyan-700 font-bold",
          glow: "shadow-cyan-500/5",
          gradient: "from-cyan-650 to-blue-600"
        };
      case "ai":
        return {
          title: isJa ? "AI・機械学習 (AI / ML)" : "Trí Tuệ Nhân Tạo & Học Máy (AI / ML)",
          bg: "bg-violet-50 border-violet-200",
          text: "text-violet-750 font-bold",
          glow: "shadow-violet-500/5",
          gradient: "from-violet-650 to-indigo-600"
        };
      case "embedded":
        return {
          title: isJa ? "組込みシステム・IoT" : "Hệ Thống Nhúng & IoT",
          bg: "bg-amber-50 border-amber-200",
          text: "text-amber-700 font-bold",
          glow: "shadow-amber-550/5",
          gradient: "from-amber-600 to-orange-600"
        };
      case "cyber":
        return {
          title: isJa ? "サイバーセキュリティ" : "An Ninh Mạng & Bảo Mật",
          bg: "bg-rose-50 border-rose-200",
          text: "text-rose-700 font-bold",
          glow: "shadow-rose-500/5",
          gradient: "from-rose-655 to-red-600"
        };
      default:
        return {
          title: isJa ? "Web開発者" : "Lập trình viên Web",
          bg: "bg-blue-50 border-blue-200",
          text: "text-blue-700 font-bold",
          glow: "shadow-blue-500/5",
          gradient: "from-blue-600 to-indigo-600"
        };
    }
  };

  return (
    <div className="py-8 px-4 md:px-8 max-w-5xl mx-auto flex flex-col min-h-[calc(100vh-10rem)]">
      {/* 1. INITIAL ASSESSMENT START PAGE */}
      {!quizStarted && !activeRecommendation && (
        <motion.div
          id="assessment-start-view"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm flex-1 flex flex-col justify-between"
        >
          <div className="max-w-2xl mx-auto text-center my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-650 text-white flex items-center justify-center mx-auto shadow-md">
              <Compass className="h-8 w-8 text-white" />
            </div>
            
            <div className="space-y-3">
              <span className="font-mono text-[10px] text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-105 font-bold">
                {isJa ? "IT知識マップ作成" : "Lập Bản Đồ Tri Thức IT"}
              </span>
              <h1 className="font-sans font-bold text-2xl md:text-4xl text-slate-900 tracking-tight leading-normal">
                {isJa ? "適性診断と" : "Đánh Giá Năng Lực"} &amp; <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-655 to-indigo-500 bg-clip-text text-transparent font-black">
                  {isJa ? "キャリア個別化" : "Cá Nhân Hóa Nghề Nghiệp"}
                </span>
              </h1>
            </div>

            <p className="text-sm text-slate-650 leading-relaxed max-w-lg mx-auto font-medium">
              {isJa
                ? "「ITでどの道を選ぶべきか」と迷う時間を減らしましょう。6つの実践的な質問に答えるだけで、あなたの興味と適性に合う方向性を可視化します。"
                : "Không còn loay hoay tự hỏi “Học IT nên chọn hướng đi nào?”. Hãy trải nghiệm khảo sát trắc nghiệm phản xạ năng lực gồm 6 câu hỏi tình huống thực tế của chúng tôi. Thuật toán ma trận rule-based sẽ vạch ra chiếc la bàn chuẩn xác nhất cho tương lai của bạn."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-mono text-xs text-blue-700 font-bold block mb-1">{isJa ? "01. 診断" : "01. Trắc Nghiệm"}</span>
                <span className="text-xs text-slate-600 font-medium">{isJa ? "6つの状況質問で適性を確認" : "6 tình huống ngẫu nhiên khảo sát kỹ năng"}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-mono text-xs text-teal-700 font-bold block mb-1">{isJa ? "02. 分析" : "02. Đối Soát AI"}</span>
                <span className="text-xs text-slate-600 font-medium">{isJa ? "採用市場の重みと照合" : "Đánh giá trọng lượng thị trường lao động"}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-mono text-xs text-indigo-700 font-bold block mb-1">{isJa ? "03. ロードマップ" : "03. Nhận Lộ Trình"}</span>
                <span className="text-xs text-slate-600 font-medium font-semibold">{isJa ? "詳細な自学ロードマップを開く" : "Lập tức mở khóa Giáo trình tự học chi tiết"}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-8 border-t border-slate-200 mt-8">
            <button
              id="btn-start-assessment"
              onClick={handleStartQuiz}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-650 text-white font-sans font-bold text-sm px-8 py-3.5 rounded-xl shadow-md cursor-pointer transition-all hover:brightness-105 active:scale-[0.99]"
            >
              <Sparkles className="h-4 w-4 text-amber-300 animate-bounce animate-pulse" />
              <span>{isJa ? "診断を始める" : "Bắt Đầu Khảo Sát Tự Nhiên"}</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* 2. DYNAMIC QUESTIONS LAYOUT (QUIZ VIEW) */}
      {quizStarted && !activeRecommendation && (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm flex-1 flex flex-col justify-between">
          
          {/* Header information with dynamic progress */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div className="flex items-center space-x-2 text-slate-500">
                <Target className="h-4 w-4 text-blue-600 shrink-0" />
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-slate-700">
                  {isJa ? "適性診断の質問" : "Câu hỏi khảo sát kỹ năng"}
                </span>
              </div>
              <span className="font-mono text-xs text-blue-700 font-bold bg-blue-50 px-2.5 py-1 rounded-md border border-blue-105">
                {currentStep + 1} / {totalQuestions}
              </span>
            </div>

            {/* Overall visual horizontal progress bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* Question Text */}
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-lg md:text-xl font-sans font-bold text-slate-900 leading-relaxed">
                {currentQuestion.questionText}
              </h2>

              {/* Unique options selection list */}
              <div className="space-y-3.5 pt-2">
                {currentQuestion.options.map((opt, optIdx) => {
                  const isCurSelected = selectedOptions[currentQuestion.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      id={`option-btn-${currentStep}-${optIdx}`}
                      onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                      className={`w-full text-left p-4 rounded-xl border font-sans text-xs md:text-sm transition-all duration-200 flex items-start space-x-3.5 group cursor-pointer ${
                        isCurSelected
                          ? "bg-blue-50/60 border-blue-500 text-blue-900 shadow-xs ring-1 ring-blue-500/20"
                          : "bg-white border-slate-200 hover:border-blue-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50/30"
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center font-mono text-[10px] font-bold border transition-colors ${
                        isCurSelected 
                          ? "bg-blue-600 text-white border-blue-605" 
                          : "bg-slate-105 border-slate-250 group-hover:border-slate-400 text-slate-500"
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="leading-relaxed font-medium">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Error notice if any */}
          {submitError && (
            <div className="p-3 bg-red-50 border border-red-250 text-red-700 text-xs rounded-lg mt-6 flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-red-650" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Stepper Buttons for navigation */}
          <div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-8">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                currentStep === 0
                  ? "text-slate-400 cursor-not-allowed opacity-40"
                  : "text-slate-650 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{isJa ? "戻る" : "Quay Lại"}</span>
            </button>

            {currentStep < totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                disabled={!isSelected}
                className={`flex items-center space-x-1.5 px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                  !isSelected
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-slate-900 hover:bg-slate-800 text-white shadow-xs transform hover:translate-x-0.5 cursor-pointer"
                }`}
              >
                <span>{isJa ? "次へ" : "Tiếp tục"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                id="btn-submit-assessment"
                onClick={handleSubmit}
                disabled={!isSelected}
                className={`flex items-center space-x-1.5 px-6 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                  !isSelected
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 via-indigo-650 to-indigo-500 text-white shadow-md hover:brightness-105 cursor-pointer"
                }`}
              >
                <Sparkles className="h-4 w-4 shrink-0" />
                <span>{isJa ? "完了して採点" : "Hoàn Thành & Chấm Điểm"}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. SIMULATED / REAL LONG RUNNING LOADING SCREEN */}
      {isSubmitting && (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex-1 flex flex-col items-center justify-center min-h-[400px]">
          <div className="relative flex flex-col items-center max-w-sm text-center space-y-6">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-blue-600 animate-spin" />
              <div className="absolute inset-2 rounded-full border-4 border-slate-100 border-b-teal-500 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full bg-slate-50 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-blue-600 animate-pulse" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-sans font-bold text-lg text-slate-900">
                {isJa ? "メンターが分析中..." : "Trợ Lý Cố Vấn Đang Phân Tích..."}
              </h3>
              <p className="font-mono text-xs text-blue-700 font-bold bg-blue-50 px-3 py-1 rounded border border-blue-100 min-h-[20px]">
                {loadingStepText}
              </p>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              {isJa ? "接続を維持してください。あなたの回答を現在の採用市場と照合し、最適な学習ロードマップを設計しています。" : "Vui lòng giữ kết nối. Chúng tôi đang thẩm định năng lượng cá nhân của bạn đối đối soát thị trường tuyển dụng hiện thời để thiết kế lộ trình vàng."}
            </p>
          </div>
        </div>
      )}

      {/* 4. COMPREHENSIVE EXPERT ASSESSMENT RESULT VIEW */}
      {activeRecommendation && !quizStarted && !isSubmitting && (
        <motion.div
          id="assessment-result-view"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-6 flex-1"
        >
          {/* Main Hero score panel */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-10 bottom-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6 mb-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2"> 
                  <span className="font-mono text-[9px] text-teal-800 uppercase tracking-widest bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200 font-bold">
                    {isJa ? "あなたの診断結果" : "Kết Quả Đánh Giá Của Bạn"}
                  </span>
                  {activeRecommendation.isAiGenerated ? (
                    <span className="font-mono text-[9px] text-blue-700 uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 flex items-center space-x-1 font-bold">
                      <Sparkles className="h-2.5 w-2.5 text-blue-600" />
                      <span>{isJa ? "AI支援" : "AI Hỗ Trợ"}</span>
                    </span>
                  ) : (
                    <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest bg-slate-105 px-2.5 py-0.5 rounded-full border border-slate-200">
                      {isJa ? "ルールエンジン" : "Thuật Toán Máy"}
                    </span>
                  )}
                </div>
                <h1 className="text-xl md:text-3xl font-sans font-extrabold text-slate-900 tracking-tight">
                  {isJa ? "適性が高い分野:" : "Xu Hướng Phù Hợp:"}{" "}
                  <span className={`bg-gradient-to-r ${getDomainStyle(activeRecommendation.matchedDomain).gradient} bg-clip-text text-transparent font-black`}>
                    {getDomainStyle(activeRecommendation.matchedDomain).title}
                  </span>
                </h1>
              </div>

              {/* Glowing Percentage Match Score card */}
              <div className="flex items-center space-x-4 shrink-0 bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-xs">
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono font-semibold">{isJa ? "マッチ度" : "Đo Thân Thiết"}</span>
                  <span className="text-3xl font-mono font-black text-slate-900">{activeRecommendation.percentageMatch}%</span>
                </div>
                <div className="h-8 w-[1px] bg-slate-200" />
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono font-semibold">{isJa ? "スコア" : "Hệ Điểm"}</span>
                  <span className="text-lg font-mono font-bold text-blue-750 block mt-1 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    {activeRecommendation.suitabilityScore}
                  </span>
                </div>
              </div>
            </div>

            {/* In-depth Analysis Section */}
            <div className="space-y-4">
              <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center space-x-2">
                <span>{isJa ? "適性の詳しい解説" : "Lý giải năng lực chuyên sâu"}</span>
              </h3>
              <p className="font-sans text-xs md:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 font-medium whitespace-pre-wrap">
                {activeRecommendation.analysisSummary}
              </p>
            </div>
          </div>

          {/* Market outlook and statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-blue-700">
                <TrendingUp className="h-4 w-4" />
                <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-slate-800">{isJa ? "市場需要" : "Nhu cầu thị trường"}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                {activeRecommendation.marketOutlook.demand}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-emerald-700">
                <DollarSign className="h-4 w-4" />
                <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-slate-800 font-bold">{isJa ? "収入目安" : "Thu nhập tham khảo"}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                {activeRecommendation.marketOutlook.salary}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-indigo-700">
                <Flame className="h-4 w-4 animate-pulse" />
                <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-slate-800">{isJa ? "技術トレンド" : "Xu hướng công nghệ"}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                {activeRecommendation.marketOutlook.trends}
              </p>
            </div>
          </div>

          {/* Pros and cons comparison layout */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-xs">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-slate-800">
              {isJa ? "現実的な比較: 強みと課題" : "Đối mặt thực tế: Điểm sáng & Thách thức nghề nghiệp"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                  {isJa ? "強み" : "Lợi Điểm Ưu Việt"}
                </span>
                <div className="space-y-2 pt-1">
                  {activeRecommendation.prosAndCons.map((item, idx) => (
                    <div key={idx} className="flex space-x-2.5 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 text-xs text-slate-700 font-medium">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item.pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-red-700 font-bold bg-rose-50 border border-rose-100 px-2 py-0.5 rounded">
                  {isJa ? "課題" : "Góc khuất / Thử thách"}
                </span>
                <div className="space-y-2 pt-1">
                  {activeRecommendation.prosAndCons.map((item, idx) => (
                    <div key={idx} className="flex space-x-2.5 p-3 rounded-lg bg-rose-50/50 border border-rose-100 text-xs text-slate-705 font-medium">
                      <X className="h-4 w-4 text-red-650 shrink-0 mt-0.5" />
                      <span>{item.con}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actionable Tips */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-slate-800 flex items-center space-x-2">
              <Bookmark className="h-4 w-4 text-blue-600" />
              <span>{isJa ? "すぐ始める3ステップ" : "Gợi ý hành trình 3 bước khởi đầu tức thì"}</span>
            </h3>

            <div className="space-y-3">
              {activeRecommendation.actionableTips.map((tip, idx) => (
                <div key={idx} className="flex space-x-3 items-start border-l-2 border-blue-600 pl-4 py-1">
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium font-sans pt-0.5">
                    {tip}
                  </p>
                </div>
              ))}
            </div>

            {/* Motivational message banner */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 text-xs text-slate-700 font-sans font-semibold italic leading-relaxed text-center">
              &ldquo;{activeRecommendation.customMessage}&rdquo;
            </div>
          </div>

          {/* Footer Action to Activate Path */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <span className="text-slate-500 text-xs block font-bold">{isJa ? "学習を始める準備はできましたか。" : "Sẵn sàng dốc lòng rèn luyện?"}</span>
              <span className="text-slate-800 text-xs md:text-sm font-bold font-sans">
                {isJa ? "おすすめ分野のロードマップを有効化:" : "Kích hoạt giáo trình tệp nhị phân khóa học"} {getDomainStyle(activeRecommendation.matchedDomain).title}
              </span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <button
                onClick={handleRestartQuiz}
                className="flex items-center space-x-1 px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer bg-white"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>{isJa ? "診断をやり直す" : "Làm Lại Trắc Nghiệm"}</span>
              </button>

              <button
                id="btn-activate-path"
                onClick={() => handleActivatePath(activeRecommendation.matchedDomain)}
                className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-105 text-white font-sans font-bold text-xs px-6 py-2.5 rounded-lg transition-transform hover:scale-[1.01] active:scale-95 shadow-md cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
                <span>{isJa ? "ロードマップを開く" : "Kích Hoạt Lộ Trình Ngay"}</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
