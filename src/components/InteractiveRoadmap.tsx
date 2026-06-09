import React, { useState } from "react";
import { 
  CheckSquare, 
  Square, 
  BookOpen, 
  Video, 
  Code, 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  Lightbulb, 
  TrendingUp, 
  Clock, 
  ExternalLink,
  Milestone
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CareerPathData, MilestoneData, PhaseData } from "../types";
import { getCareerPaths, Language } from "../i18n";

interface InteractiveRoadmapProps {
  selectedPathId: string;
  setSelectedPathId: (pathId: string) => void;
  completedMilestones: string[];
  toggleMilestoneCompletion: (milestoneId: string) => void;
  completionRate: number;
  language: Language;
}

export const InteractiveRoadmap: React.FC<InteractiveRoadmapProps> = ({
  selectedPathId,
  setSelectedPathId,
  completedMilestones,
  toggleMilestoneCompletion,
  completionRate,
  language,
}) => {
  const [expandedMilestones, setExpandedMilestones] = useState<Record<string, boolean>>({});
  const isJa = language === "ja";
  const careerPathsData = getCareerPaths(language);

  const toggleExpand = (milestoneId: string) => {
    setExpandedMilestones((prev) => ({
      ...prev,
      [milestoneId]: !prev[milestoneId],
    }));
  };

  const handlePathSwitch = (pathId: string) => {
    setSelectedPathId(pathId);
  };

  const currentPath: CareerPathData = careerPathsData[selectedPathId] || careerPathsData.web;

  // Style helper for color accents
  const getAccentClass = (accent: string) => {
    switch (accent) {
      case "emerald":
        return {
          border: "border-emerald-200",
          bg: "bg-emerald-600",
          text: "text-emerald-700",
          ring: "ring-emerald-100",
          gLine: "from-emerald-600 to-slate-200",
          chip: "bg-emerald-50 border-emerald-100 text-emerald-700"
        };
      case "cyan":
        return {
          border: "border-cyan-200",
          bg: "bg-cyan-600",
          text: "text-cyan-700",
          ring: "ring-cyan-100",
          gLine: "from-cyan-600 to-slate-200",
          chip: "bg-cyan-50 border-cyan-100 text-cyan-700"
        };
      case "violet":
        return {
          border: "border-violet-200",
          bg: "bg-violet-600",
          text: "text-violet-750",
          ring: "ring-violet-100",
          gLine: "from-violet-650 to-slate-200",
          chip: "bg-violet-50 border-violet-105 text-violet-755"
        };
      case "amber":
        return {
          border: "border-amber-200",
          bg: "bg-amber-600",
          text: "text-amber-700",
          ring: "ring-amber-100",
          gLine: "from-amber-600 to-slate-200",
          chip: "bg-amber-50 border-amber-100 text-amber-750 font-semibold"
        };
      case "rose":
        return {
          border: "border-rose-200",
          bg: "bg-rose-600",
          text: "text-rose-700",
          ring: "ring-rose-100",
          gLine: "from-rose-600 to-slate-200",
          chip: "bg-rose-50 border-rose-100 text-rose-700"
        };
      default:
        return {
          border: "border-blue-200",
          bg: "bg-blue-600",
          text: "text-blue-700",
          ring: "ring-blue-105",
          gLine: "from-blue-650 to-slate-200",
          chip: "bg-blue-50 border-blue-105 text-blue-700"
        };
    }
  };

  const accentStyles = getAccentClass(currentPath.accentColor);

  return (
    <div className="py-8 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      {/* 1. TOP SELECTOR AND CARD HERO */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <span className="font-mono text-[9px] text-slate-505 uppercase tracking-widest block font-bold">
              {isJa ? "詳細ロードマップライブラリ" : "Thư viện lộ trình chi tiết"}
            </span>
            <h2 className="font-sans font-bold text-lg md:text-xl text-slate-900">
              {isJa ? "分野を選んで探索" : "Chọn Lĩnh Vực Để Khám Phá"}
            </h2>
          </div>

          {/* Quick tab pathway selectors */}
          <div className="flex flex-wrap gap-1.5" id="roadmap-pathways-selector">
            {Object.values(careerPathsData).map((p) => {
              const isActive = selectedPathId === p.id;
              return (
                <button
                  key={p.id}
                  id={`roadmap-select-tab-${p.id}`}
                  onClick={() => handlePathSwitch(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? `bg-blue-50 border border-blue-200 text-blue-700 font-bold shadow-xs`
                      : "bg-white border border-slate-200 text-slate-650 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {p.title.split("(")[0].trim()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Pathway overview card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-1">
          <div className="md:col-span-3 space-y-4">
            <div className="space-y-1">
              <h1 className="text-xl md:text-2xl font-sans font-extrabold text-slate-900 tracking-tight leading-relaxed">
                {currentPath.title}
              </h1>
              <p className="text-xs text-blue-600 font-mono font-bold uppercase tracking-wide">
                {currentPath.subTitle}
              </p>
            </div>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-3xl font-medium">
              {currentPath.description}
            </p>

            {/* Path main tags / technologies bubble */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 flex items-center mr-1">
                {isJa ? "主要技術:" : "Công nghệ cốt lõi:"}
              </span>
              {currentPath.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-slate-50 text-slate-705 border border-slate-200 text-[10px] font-mono font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Quick stats panel */}
          <div className="md:col-span-1 p-4 bg-slate-50/50 rounded-xl border border-slate-200 space-y-3.5 flex flex-col justify-center">
            <div>
              <span className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block font-bold">{isJa ? "平均収入" : "Lương trung bình"}</span>
              <span className="text-xs font-bold text-slate-800 block font-mono">{currentPath.averageSalary}</span>
            </div>
            <div className="h-[1px] bg-slate-200" />
            <div>
              <span className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block font-bold">{isJa ? "見通し" : "Triển vọng"}</span>
              <span className="text-xs font-bold text-slate-800 block flex items-center space-x-1">
                <TrendingUp className={`h-4.5 w-4.5 shrink-0 ${accentStyles.text}`} />
                <span>{currentPath.outlook}</span>
              </span>
            </div>
            <div className="h-[1px] bg-slate-200" />
            <div>
              <span className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block font-bold">{isJa ? "完了" : "Hoàn thành"}</span>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-sm font-mono font-bold ${accentStyles.text}`}>{completionRate}%</span>
                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${currentPath.colorTheme} rounded-full transition-all duration-300`}
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CHRONOLOGICAL PATH TIMELINE STAGE */}
      <div className="space-y-10 relative pl-4 md:pl-8">
        
        {/* Dynamic timeline visual line spanning from top phase down to last phase */}
        <div className="absolute left-6 md:left-[35px] top-6 bottom-6 w-0.5 bg-slate-200" />

        {currentPath.phases.map((phase: PhaseData, phaseIdx: number) => {
          return (
            <div key={phase.id} className="space-y-6 relative" id={`roadmap-phase-segment-${phaseIdx}`}>
              
              {/* Phase visual node */}
              <div className="absolute left-[-16px] md:left-[-27px] top-0 z-10 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-xs">
                  <span className="font-mono text-xs font-bold text-slate-500">0{phaseIdx + 1}</span>
                </div>
              </div>

              {/* Phase Header Intro */}
              <div className="pl-6 space-y-1">
                <h3 className="font-sans font-extrabold text-sm md:text-base text-slate-900 tracking-tight block">
                  {phase.title}
                </h3>
                <p className="font-sans text-xs text-slate-500 max-w-3xl block font-medium">
                  {phase.description}
                </p>
              </div>

              {/* Milestones inside Phase */}
              <div className="space-y-4 pl-6">
                {phase.milestones.map((milestone: MilestoneData) => {
                  const isCompleted = completedMilestones.includes(milestone.id);
                  const isExpanded = !!expandedMilestones[milestone.id];

                  return (
                    <div
                      key={milestone.id}
                      className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                        isCompleted
                          ? `${accentStyles.border} bg-white shadow-xs`
                          : "border-slate-200 bg-white hover:bg-slate-50/20 hover:border-blue-200"
                      }`}
                    >
                      {/* Interactive Header Row */}
                      <div
                        id={`milestone-header-${milestone.id}`}
                        onClick={() => toggleExpand(milestone.id)}
                        className="p-4 flex items-center justify-between gap-4 cursor-pointer select-none"
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          {/* Checked Checkbox indicator */}
                          <button
                            id={`check-btn-${milestone.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMilestoneCompletion(milestone.id);
                            }}
                            className={`shrink-0 transition-transform active:scale-90 ${accentStyles.text} cursor-pointer`}
                          >
                            {isCompleted ? (
                              <CheckSquare className="h-5 w-5 fill-white text-emerald-600" />
                            ) : (
                              <Square className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                            )}
                          </button>

                          <div className="min-w-0">
                            <span className={`font-sans font-bold text-xs md:text-sm block truncate transition-colors ${
                              isCompleted ? "text-slate-400 line-through font-semibold" : "text-slate-850"
                            }`}>
                              {milestone.title}
                            </span>
                            
                            <div className="flex items-center space-x-3.5 mt-1 font-mono text-[10px] text-slate-500 shrink-0 font-semibold">
                              <span className="flex items-center space-x-1">
                                <Clock className="h-3 w-3 shrink-0" />
                                <span>{milestone.duration}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Expand indicator chevron */}
                        <div className="flex items-center space-x-2 shrink-0">
                          {isCompleted && (
                            <span className={`text-[9px] font-mono py-0.5 px-2 rounded-full border border-emerald-250 bg-emerald-50 text-emerald-700 font-bold hidden sm:inline`}>
                              {isJa ? "完了" : "Hoàn thành"}
                            </span>
                          )}
                          <button className="text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 p-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer">
                            {isExpanded ? (
                              <ChevronUp className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Dropdown collapsible panel body */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="border-t border-slate-200 bg-slate-50/40 px-4 py-5 space-y-4"
                          >
                            {/* Short definition description */}
                            <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                              {milestone.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                              {/* Left checklist items block */}
                              <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2.5 shadow-xs">
                                <span className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block font-bold">
                                  {isJa ? "学習タスク:" : "Nhiệm vụ rèn luyện:"}
                                </span>
                                <div className="space-y-2">
                                  {milestone.checklist.map((bullet, idx) => (
                                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-600 leading-relaxed font-sans font-medium">
                                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${accentStyles.bg} mt-1.5`} />
                                      <span>{bullet}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Right helpful references checklist */}
                              <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2.5 shadow-xs">
                                  <span className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block font-bold">
                                    {isJa ? "おすすめ教材:" : "Giáo trình gợi ý học:"}
                                  </span>
                                  <div className="space-y-2">
                                    {milestone.resources.map((res, idx) => (
                                      <a
                                        key={idx}
                                        href={res.link !== "#" ? res.link : undefined}
                                        target={res.link !== "#" ? "_blank" : undefined}
                                        rel="referrer"
                                        className="flex items-center justify-between p-2 rounded bg-slate-50/50 hover:bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all text-xs group cursor-pointer"
                                      >
                                        <div className="flex items-center space-x-2 text-slate-650 group-hover:text-slate-950">
                                          {res.type === "Video" ? (
                                            <Video className="h-3.5 w-3.5 text-red-500 shrink-0" />
                                          ) : res.type === "Project" ? (
                                            <Code className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                                          ) : (
                                            <BookOpen className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                                          )}
                                          <span className="font-sans font-semibold line-clamp-1 text-left">
                                            {res.title}
                                          </span>
                                        </div>
                                        {res.link !== "#" && (
                                          <ExternalLink className="h-3 w-3 text-slate-400 shrink-0 group-hover:text-slate-605 ml-1" />
                                        )}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
