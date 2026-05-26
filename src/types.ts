export interface AssessmentOption {
  text: string;
  scoreValue: {
    web: number;
    mobile: number;
    ai: number;
    embedded: number;
    cyber: number;
  };
}

export interface AssessmentQuestion {
  id: string;
  questionText: string;
  options: AssessmentOption[];
}

export interface ResourceData {
  title: string;
  type: "Docs" | "Video" | "Project" | "Book" | "Course";
  link: string;
}

export interface MilestoneData {
  id: string;
  title: string;
  duration: string;
  description: string;
  checklist: string[];
  resources: ResourceData[];
}

export interface PhaseData {
  id: string;
  title: string;
  description: string;
  milestones: MilestoneData[];
}

export interface CareerPathData {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  colorTheme: string;
  accentColor: "emerald" | "cyan" | "violet" | "amber" | "rose";
  starsRate: number;
  averageSalary: string;
  outlook: string;
  technologies: string[];
  phases: PhaseData[];
}

export interface MatchScoreMap {
  web: number;
  mobile: number;
  ai: number;
  embedded: number;
  cyber: number;
}

export interface CareerRecommendation {
  matchedDomain: "web" | "mobile" | "ai" | "embedded" | "cyber";
  percentageMatch: number;
  suitabilityScore: string;
  analysisSummary: string;
  prosAndCons: { pro: string; con: string }[];
  marketOutlook: {
    demand: string;
    salary: string;
    trends: string;
  };
  actionableTips: string[];
  customMessage: string;
  isAiGenerated: boolean;
  scores?: MatchScoreMap;
  aiError?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
