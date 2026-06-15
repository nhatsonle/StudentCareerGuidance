import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { StatsDashboard } from "./components/StatsDashboard";
import { AssessmentCenter } from "./components/AssessmentCenter";
import { InteractiveRoadmap } from "./components/InteractiveRoadmap";
import { CareerRecommendation } from "./types";
import { GraduationCap } from "lucide-react";
import {
  getCareerPaths,
  isLanguage,
  Language,
  localizeRecommendation,
} from "./i18n";

type ActiveTab = "dashboard" | "assessment" | "roadmap";

export default function App() {
  // 1. STATE INITIALIZATION (SYNCED WITH LOCALSTORAGE)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("edupath_language");
    return isLanguage(saved) ? saved : "vi";
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    const saved = localStorage.getItem("edupath_active_tab");
    return saved === "assessment" || saved === "roadmap" ? saved : "dashboard";
  });

  const [selectedPathId, setSelectedPathId] = useState<string>(() => {
    return localStorage.getItem("edupath_selected_path") || "web";
  });

  const [completedMilestones, setCompletedMilestones] = useState<string[]>(() => {
    const saved = localStorage.getItem("edupath_completed_milestones");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeRecommendation, setActiveRecommendation] = useState<CareerRecommendation | null>(() => {
    const saved = localStorage.getItem("edupath_recommendation");
    return saved ? JSON.parse(saved) : null;
  });

  // 2. SYNCHRONIZE STATES TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("edupath_language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("edupath_active_tab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem("edupath_selected_path", selectedPathId);
  }, [selectedPathId]);

  useEffect(() => {
    localStorage.setItem("edupath_completed_milestones", JSON.stringify(completedMilestones));
  }, [completedMilestones]);

  useEffect(() => {
    localStorage.setItem("edupath_recommendation", JSON.stringify(activeRecommendation));
  }, [activeRecommendation]);

  useEffect(() => {
    setActiveRecommendation((prev) =>
      prev ? localizeRecommendation(prev, language) : prev
    );
  }, [language]);

  // 3. CORE CALCULATION HANDLERS
  const careerPathsData = getCareerPaths(language);
  const currentPath = careerPathsData[selectedPathId] || careerPathsData.web;
  
  // Calculate completion percentage dynamically based on current list
  const currentPathMilestones = currentPath.phases.flatMap((phase) => phase.milestones);
  const currentPathMilestoneIds = currentPathMilestones.map((m) => m.id);
  const completedInCurrentPath = currentPathMilestoneIds.filter((id) => completedMilestones.includes(id));
  
  const completionRate = currentPathMilestoneIds.length > 0
    ? Math.round((completedInCurrentPath.length / currentPathMilestoneIds.length) * 100)
    : 0;

  const toggleMilestoneCompletion = (milestoneId: string) => {
    setCompletedMilestones((prev) => {
      if (prev.includes(milestoneId)) {
        return prev.filter((id) => id !== milestoneId);
      } else {
        return [...prev, milestoneId];
      }
    });
  };

  const handleRecommendationReceived = (recommendation: CareerRecommendation) => {
    setActiveRecommendation(localizeRecommendation(recommendation, language));
    // Auto-update student's active track if they desire
    setSelectedPathId(recommendation.matchedDomain);
  };

  const handleRestartAssessment = () => {
    setActiveRecommendation(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-500/20 selection:text-blue-900 relative">
      {/* Modern dot grid background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_100%,transparent_100%)] opacity-35 pointer-events-none" />

      {/* Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedPathId={selectedPathId}
        completionRate={completionRate}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Central Interactive Module Stage with entry animation limits */}
      <main className="flex-1 relative z-10">
        {activeTab === "dashboard" && (
          <StatsDashboard
            selectedPathId={selectedPathId}
            setSelectedPathId={setSelectedPathId}
            completedMilestones={completedMilestones}
            activeRecommendation={activeRecommendation}
            setActiveTab={setActiveTab}
            completionRate={completionRate}
            language={language}
          />
        )}

        {activeTab === "assessment" && (
          <AssessmentCenter
            onRecommendationReceived={handleRecommendationReceived}
            onRestartAssessment={handleRestartAssessment}
            activeRecommendation={activeRecommendation}
            setActiveTab={setActiveTab}
            setSelectedPathId={setSelectedPathId}
            language={language}
          />
        )}

        {activeTab === "roadmap" && (
          <InteractiveRoadmap
            selectedPathId={selectedPathId}
            setSelectedPathId={setSelectedPathId}
            completedMilestones={completedMilestones}
            toggleMilestoneCompletion={toggleMilestoneCompletion}
            completionRate={completionRate}
            language={language}
          />
        )}

      </main>

      {/* Modern, non-obstructive tech Portal Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 px-4 md:px-8 text-center relative z-10 select-none shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <div className="flex items-center space-x-1.5">
            <GraduationCap className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-slate-700">
              {language === "ja" ? "EduPathIT Platform • テクノロジー学生のための設計" : "EduPathIT Platform • Thiết Kế Cho Sinh Viên Công Nghệ"}
            </span>
          </div>
          <span className="font-sans text-[10px]">
            &copy; {new Date().getFullYear()} {language === "ja" ? "スマートITキャリアガイダンスアカデミー." : "Học Viện Định Hướng Nghề Nghiệp IT Thông Minh."}
          </span>
          <div className="flex space-x-4">
            <span className="hover:text-slate-800 hover:underline transition-colors cursor-pointer">
              {language === "ja" ? "キャリア資料" : "Tài liệu hướng nghiệp"}
            </span>
            <span>&bull;</span>
            <span className="hover:text-slate-800 hover:underline transition-colors cursor-pointer">
              {language === "ja" ? "採用評価基準" : "Trọng số tuyển dụng"}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
