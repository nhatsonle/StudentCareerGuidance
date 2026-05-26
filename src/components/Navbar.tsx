import React from "react";
import { GraduationCap, Award, Compass, MessageSquare, Flame } from "lucide-react";
import { careerPathsData } from "../data";

interface NavbarProps {
  activeTab: "dashboard" | "assessment" | "roadmap" | "chat";
  setActiveTab: (tab: "dashboard" | "assessment" | "roadmap" | "chat") => void;
  selectedPathId: string;
  completionRate: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedPathId,
  completionRate,
}) => {
  const currentPath = careerPathsData[selectedPathId] || careerPathsData.web;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Logo and branding */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-650 to-indigo-500 text-white shadow-md shadow-blue-500/10 hover:scale-105 transition-all">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <span className="font-sans font-bold text-lg text-slate-900 tracking-tight block">
              EduPath<span className="bg-gradient-to-r from-blue-600 to-indigo-650 bg-clip-text text-transparent ml-0.5 font-extrabold">IT</span>
            </span>
            <span className="font-mono text-[9px] text-slate-500 block tracking-wider uppercase font-semibold">
              Cổng Định Hướng Sinh Viên
            </span>
          </div>
        </div>

        {/* Technical Nav links */}
        <nav className="hidden md:flex items-center space-x-1" id="desktop-nav-menu">
          <button
            id="nav-btn-dashboard"
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
              activeTab === "dashboard"
                ? "bg-blue-50 text-blue-700 border border-blue-100/80 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>Tổng Quan</span>
          </button>

          <button
            id="nav-btn-assessment"
            onClick={() => setActiveTab("assessment")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
              activeTab === "assessment"
                ? "bg-blue-50 text-blue-700 border border-blue-100/80 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Award className="h-4 w-4" />
            <span>Đánh Giá Năng Lực</span>
          </button>

          <button
            id="nav-btn-roadmap"
            onClick={() => setActiveTab("roadmap")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
              activeTab === "roadmap"
                ? "bg-blue-50 text-blue-700 border border-blue-100/80 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Award className="h-4 w-4" />
            <span>Sơ Đồ Lộ Trình</span>
          </button>

          <button
            id="nav-btn-chat"
            onClick={() => setActiveTab("chat")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
              activeTab === "chat"
                ? "bg-blue-50 text-blue-700 border border-blue-100/80 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>AI Career Mentor</span>
          </button>
        </nav>

        {/* Current Path Progress Pill */}
        <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 rounded-full py-1.5 pl-3 pr-4 shadow-sm">
          <div className="flex items-center space-x-1.5">
            <Flame className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 hidden sm:inline">
              Lộ trình đang học:
            </span>
            <span className="text-xs font-sans font-semibold text-slate-800 max-w-[120px] truncate">
              {currentPath.title.split("(")[0].trim()}
            </span>
          </div>
          <div className="h-4 w-[1px] bg-slate-200" />
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-mono font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {completionRate}%
            </span>
            {/* Visual Ring Micro progress bar */}
            <div className="w-10 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
