import {
  Activity,
  Bell,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Code2,
  FileText,
  LayoutDashboard,
  LineChart,
  ListChecks,
  Sparkles,
  Star,
  Trophy,
  UserRound,
} from "lucide-react";
import type {
  ActivityItem,
  AnnouncementItem,
  AssessmentItem,
  CodingPracticeItem,
  HomeworkItem,
  LeaderboardRow,
  NavItem,
  ResultItem,
  SelfAssessmentItem,
  SkillItem,
  StatItem,
  TaskItem,
} from "@/types/student";

export const navItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Activities", icon: Activity },
  { label: "Daily Tasks", icon: ListChecks },
  { label: "Placement Homework", icon: BookOpenCheck },
  { label: "Coding Practice", icon: Code2 },
  { label: "Self-Assessment", icon: ClipboardCheck },
  { label: "Assessments", icon: CalendarDays },
  { label: "Results", icon: Trophy },
  { label: "Announcements", icon: Bell },
  { label: "Preparation Progress", icon: LineChart },
  { label: "Profile", icon: UserRound },
];

export const mobileNavItems = navItems.filter((item) =>
  ["Dashboard", "Daily Tasks", "Placement Homework", "Assessments", "Profile"].includes(item.label),
);

export const stats: StatItem[] = [
  { label: "Tasks Due Today", value: "3", detail: "2 high priority", icon: Clock3 },
  { label: "Pending Homework", value: "4", detail: "1 due tonight", icon: FileText },
  { label: "Upcoming Assessments", value: "2", detail: "Next on Friday", icon: CalendarDays },
  { label: "Average Score", value: "82%", detail: "+6% this month", icon: Star },
  { label: "Completed Tasks", value: "28", detail: "92% on time", icon: CheckCircle2 },
  { label: "Prep Level", value: "Proficient", detail: "Interview track", icon: Sparkles },
];

export const initialTasks: TaskItem[] = [
  {
    time: "09:00 AM",
    title: "Complete quantitative aptitude drill",
    priority: "High",
    status: "In progress",
    assignedBy: "Priya Raman",
    group: "Aptitude Group",
    due: "Today, 10:30 AM",
    comments: 2,
  },
  {
    time: "12:00 PM",
    title: "Upload one-page resume draft",
    priority: "Medium",
    status: "Not started",
    assignedBy: "Arun Mehta",
    group: "Resume Review",
    due: "Today, 2:00 PM",
    comments: 1,
  },
  {
    time: "05:00 PM",
    title: "Finish arrays coding assignment",
    priority: "High",
    status: "Not started",
    assignedBy: "Nisha Kapoor",
    group: "Coding Group",
    due: "Today, 7:00 PM",
    comments: 4,
  },
  {
    time: "Yesterday",
    title: "Submit mock interview reflection",
    priority: "Critical",
    status: "Overdue",
    assignedBy: "Priya Raman",
    group: "Interview Group",
    due: "Jul 21, 8:00 PM",
    comments: 3,
  },
];

export const activities: ActivityItem[] = [
  {
    title: "Aptitude training sprint",
    type: "Workshop",
    date: "Jul 23",
    time: "10:00 AM - 12:00 PM",
    location: "Seminar Hall B",
    status: "Scheduled",
    attendance: "Required",
  },
  {
    title: "Mock interview circle",
    type: "Interview",
    date: "Jul 25",
    time: "2:00 PM - 4:00 PM",
    location: "Google Meet",
    status: "Scheduled",
    attendance: "Required",
  },
  {
    title: "Company orientation: TCS NQT",
    type: "Placement Drive",
    date: "Jul 29",
    time: "11:30 AM - 1:00 PM",
    location: "Auditorium",
    status: "Upcoming",
    attendance: "Optional",
  },
  {
    title: "Resume review lab",
    type: "Review",
    date: "Jul 19",
    time: "3:00 PM - 5:00 PM",
    location: "Lab 204",
    status: "Completed",
    attendance: "Marked present",
  },
];

export const initialHomework: HomeworkItem[] = [
  {
    title: "Resume headline rewrite",
    category: "Resume",
    difficulty: "Easy",
    due: "Today, 8:00 PM",
    score: "20 pts",
    status: "Pending",
    submission: "Text response",
  },
  {
    title: "SQL joins practice set",
    category: "Technical",
    difficulty: "Medium",
    due: "Tomorrow",
    score: "50 pts",
    status: "Started",
    submission: "File upload",
  },
  {
    title: "GD topic notes",
    category: "Communication",
    difficulty: "Easy",
    due: "Jul 26",
    score: "15 pts",
    status: "Pending",
    submission: "URL submission",
  },
  {
    title: "React coding mini project",
    category: "Coding",
    difficulty: "Hard",
    due: "Jul 30",
    score: "100 pts",
    status: "Submitted",
    submission: "Code submission",
  },
];

export const selfAssessments: SelfAssessmentItem[] = [
  { title: "Data structures readiness", questions: 25, duration: "30 min", best: "84%", level: "Intermediate" },
  { title: "Aptitude speed check", questions: 40, duration: "45 min", best: "76%", level: "Practice" },
  { title: "Communication confidence", questions: 18, duration: "15 min", best: "68%", level: "Foundation" },
  { title: "Core Java revision", questions: 30, duration: "35 min", best: "88%", level: "Advanced" },
];

export const codingPractice: CodingPracticeItem[] = [
  {
    title: "Two Sum with sorted input",
    topic: "Arrays",
    difficulty: "Easy",
    platform: "Internal Judge",
    status: "Solved",
    attempts: 2,
    acceptance: 94,
  },
  {
    title: "Longest substring without repeat",
    topic: "Strings",
    difficulty: "Medium",
    platform: "Internal Judge",
    status: "In progress",
    attempts: 3,
    acceptance: 67,
  },
  {
    title: "Merge intervals",
    topic: "Sorting",
    difficulty: "Medium",
    platform: "HackerRank",
    status: "Pending",
    attempts: 0,
    acceptance: 71,
  },
  {
    title: "Detect cycle in directed graph",
    topic: "Graphs",
    difficulty: "Hard",
    platform: "LeetCode",
    status: "Pending",
    attempts: 1,
    acceptance: 39,
  },
];

export const initialAssessments: AssessmentItem[] = [
  { title: "Cognizant pattern mock test", date: "Jul 24", type: "Coordinator", duration: "60 min", status: "Registered" },
  { title: "Self check: Data structures", date: "Anytime", type: "Self", duration: "30 min", status: "Open" },
  { title: "HR interview readiness", date: "Jul 29", type: "Coordinator", duration: "20 min", status: "Pending" },
  { title: "Technical MCQ challenge", date: "Aug 2", type: "Coordinator", duration: "45 min", status: "Upcoming" },
];

export const results: ResultItem[] = [
  { title: "Java fundamentals mock", score: 88, rank: "12 / 148", feedback: "Strong OOP concepts, revise collections edge cases." },
  { title: "Aptitude weekly test", score: 76, rank: "34 / 148", feedback: "Accuracy is good; speed needs timed practice." },
  { title: "Resume review", score: 91, rank: "8 / 148", feedback: "Clear format, add measurable impact for projects." },
  { title: "Mock interview", score: 72, rank: "42 / 148", feedback: "Improve answer structure and closing questions." },
];

export const initialAnnouncements: AnnouncementItem[] = [
  {
    title: "TCS NQT orientation moved",
    body: "The session is now in Seminar Hall B at 11:30 AM. Attendance will be captured at the entrance.",
    tag: "Schedule",
    date: "Today",
  },
  {
    title: "Resume review slots open",
    body: "Section C students can book one slot before Friday evening. Bring a PDF and project links.",
    tag: "Action",
    date: "Yesterday",
  },
  {
    title: "Saturday coding sprint",
    body: "Bring laptops with your preferred IDE installed. Problems will follow product-company patterns.",
    tag: "Practice",
    date: "Jul 20",
  },
];

export const skills: SkillItem[] = [
  { name: "Aptitude", value: 76, change: "+8%" },
  { name: "Coding", value: 84, change: "+12%" },
  { name: "Communication", value: 68, change: "+5%" },
  { name: "Interview", value: 72, change: "+9%" },
  { name: "Technical Core", value: 88, change: "+6%" },
];

export const milestones = [
  { label: "Profile completed", done: true },
  { label: "Resume approved", done: true },
  { label: "Aptitude benchmark passed", done: true },
  { label: "Mock interview passed", done: false },
  { label: "Company shortlist ready", done: false },
];

export const feedback = [
  "Good improvement in coding speed. Focus on explaining time complexity.",
  "Resume needs stronger project impact metrics before company submissions.",
];

export const organizationAnalytics = {
  organization: [
    { label: "Students", value: "1,248", detail: "Across 8 departments" },
    { label: "Avg readiness", value: "74%", detail: "+9% this term" },
    { label: "Assessment completion", value: "81%", detail: "Last 30 days" },
    { label: "Placement eligible", value: "642", detail: "Resume approved" },
  ],
  section: [
    { label: "Section C students", value: "148", detail: "CSE 2027 batch" },
    { label: "Section readiness", value: "78%", detail: "+11% this month" },
    { label: "Task completion", value: "92%", detail: "Daily task average" },
    { label: "Top skill", value: "Coding", detail: "84% section average" },
  ],
};

export const leaderboardRows: LeaderboardRow[] = [
  { rank: 1, name: "Ananya Rao", section: "CSE A", score: 96, orgRank: 1, sectionRank: 1 },
  { rank: 2, name: "Vikram Singh", section: "CSE C", score: 93, orgRank: 2, sectionRank: 1 },
  { rank: 3, name: "Riya Sharma", section: "CSE C", score: 91, orgRank: 8, sectionRank: 3 },
  { rank: 4, name: "Ishaan Patel", section: "ECE B", score: 89, orgRank: 11, sectionRank: 2 },
  { rank: 5, name: "Meera Nair", section: "CSE C", score: 87, orgRank: 15, sectionRank: 5 },
];

export const sectionPerformance = [
  { section: "CSE A", readiness: 82, completion: 88 },
  { section: "CSE B", readiness: 75, completion: 79 },
  { section: "CSE C", readiness: 78, completion: 92 },
  { section: "ECE A", readiness: 69, completion: 74 },
  { section: "IT A", readiness: 80, completion: 86 },
];
