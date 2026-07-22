import type { LucideIcon } from "lucide-react";

export type NavLabel =
  | "Dashboard"
  | "Activities"
  | "Daily Tasks"
  | "Placement Homework"
  | "Coding Practice"
  | "Self-Assessment"
  | "Assessments"
  | "Results"
  | "Announcements"
  | "Preparation Progress"
  | "Profile";

export type NavItem = {
  label: NavLabel;
  icon: LucideIcon;
};

export type StatItem = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
};

export type TaskItem = {
  time: string;
  title: string;
  priority: string;
  status: string;
  assignedBy: string;
  group: string;
  due: string;
  comments: number;
};

export type ActivityItem = {
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  status: string;
  attendance: string;
};

export type HomeworkItem = {
  title: string;
  category: string;
  difficulty: string;
  due: string;
  score: string;
  status: string;
  submission: string;
};

export type SelfAssessmentItem = {
  title: string;
  questions: number;
  duration: string;
  best: string;
  level: string;
};

export type CodingPracticeItem = {
  title: string;
  topic: string;
  difficulty: string;
  platform: string;
  status: string;
  attempts: number;
  acceptance: number;
};

export type AssessmentItem = {
  title: string;
  date: string;
  type: string;
  duration: string;
  status: string;
};

export type ResultItem = {
  title: string;
  score: number;
  rank: string;
  feedback: string;
};

export type AnnouncementItem = {
  title: string;
  body: string;
  tag: string;
  date: string;
  read?: boolean;
};

export type SkillItem = {
  name: string;
  value: number;
  change: string;
};

export type LeaderboardRow = {
  rank: number;
  name: string;
  section: string;
  score: number;
  orgRank: number;
  sectionRank: number;
};
