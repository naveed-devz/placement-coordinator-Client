import { useMemo, useState } from "react";
import {
  Activity,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Code2,
  Download,
  Eye,
  EyeOff,
  FileText,
  FileUp,
  Filter,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  Link,
  ListChecks,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Phone,
  PlayCircle,
  Search,
  Sparkles,
  Star,
  Trophy,
  UploadCloud,
  UserRound,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type NavLabel =
  | "Dashboard"
  | "Activities"
  | "Daily Tasks"
  | "Placement Homework"
  | "Self-Assessment"
  | "Assessments"
  | "Results"
  | "Announcements"
  | "Preparation Progress"
  | "Profile";

const navItems: { label: NavLabel; icon: typeof LayoutDashboard }[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Activities", icon: Activity },
  { label: "Daily Tasks", icon: ListChecks },
  { label: "Placement Homework", icon: BookOpenCheck },
  { label: "Self-Assessment", icon: ClipboardCheck },
  { label: "Assessments", icon: CalendarDays },
  { label: "Results", icon: Trophy },
  { label: "Announcements", icon: Bell },
  { label: "Preparation Progress", icon: LineChart },
  { label: "Profile", icon: UserRound },
];

const mobileNavItems = navItems.filter((item) =>
  ["Dashboard", "Daily Tasks", "Placement Homework", "Assessments", "Profile"].includes(item.label),
);

const stats = [
  { label: "Tasks Due Today", value: "3", detail: "2 high priority", icon: Clock3 },
  { label: "Pending Homework", value: "4", detail: "1 due tonight", icon: FileText },
  { label: "Upcoming Assessments", value: "2", detail: "Next on Friday", icon: CalendarDays },
  { label: "Average Score", value: "82%", detail: "+6% this month", icon: Star },
  { label: "Completed Tasks", value: "28", detail: "92% on time", icon: CheckCircle2 },
  { label: "Prep Level", value: "Proficient", detail: "Interview track", icon: Sparkles },
];

const tasks = [
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

const activities = [
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

const homework = [
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

const selfAssessments = [
  { title: "Data structures readiness", questions: 25, duration: "30 min", best: "84%", level: "Intermediate" },
  { title: "Aptitude speed check", questions: 40, duration: "45 min", best: "76%", level: "Practice" },
  { title: "Communication confidence", questions: 18, duration: "15 min", best: "68%", level: "Foundation" },
  { title: "Core Java revision", questions: 30, duration: "35 min", best: "88%", level: "Advanced" },
];

const assessments = [
  { title: "Cognizant pattern mock test", date: "Jul 24", type: "Coordinator", duration: "60 min", status: "Registered" },
  { title: "Self check: Data structures", date: "Anytime", type: "Self", duration: "30 min", status: "Open" },
  { title: "HR interview readiness", date: "Jul 29", type: "Coordinator", duration: "20 min", status: "Pending" },
  { title: "Technical MCQ challenge", date: "Aug 2", type: "Coordinator", duration: "45 min", status: "Upcoming" },
];

const results = [
  { title: "Java fundamentals mock", score: 88, rank: "12 / 148", feedback: "Strong OOP concepts, revise collections edge cases." },
  { title: "Aptitude weekly test", score: 76, rank: "34 / 148", feedback: "Accuracy is good; speed needs timed practice." },
  { title: "Resume review", score: 91, rank: "8 / 148", feedback: "Clear format, add measurable impact for projects." },
  { title: "Mock interview", score: 72, rank: "42 / 148", feedback: "Improve answer structure and closing questions." },
];

const announcements = [
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

const skills = [
  { name: "Aptitude", value: 76, change: "+8%" },
  { name: "Coding", value: 84, change: "+12%" },
  { name: "Communication", value: 68, change: "+5%" },
  { name: "Interview", value: 72, change: "+9%" },
  { name: "Technical Core", value: 88, change: "+6%" },
];

const milestones = [
  { label: "Profile completed", done: true },
  { label: "Resume approved", done: true },
  { label: "Aptitude benchmark passed", done: true },
  { label: "Mock interview passed", done: false },
  { label: "Company shortlist ready", done: false },
];

const feedback = [
  "Good improvement in coding speed. Focus on explaining time complexity.",
  "Resume needs stronger project impact metrics before company submissions.",
];

function getPriorityVariant(priority: string) {
  if (priority === "Critical") return "danger";
  if (priority === "High") return "warning";
  return "muted";
}

function SectionIntro({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="flex flex-col justify-between gap-4 rounded-lg border bg-white p-4 shadow-soft sm:p-5 lg:flex-row lg:items-center">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold text-secondary">{eyebrow}</p>
        <h1 className="mt-1 text-xl font-bold leading-tight sm:text-2xl md:text-3xl">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {action ? <div className="flex w-full shrink-0 sm:w-auto [&>button]:w-full sm:[&>button]:w-auto">{action}</div> : null}
    </section>
  );
}

function MetricCards() {
  return (
    <section className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-3 p-4 sm:gap-4 sm:p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted sm:h-11 sm:w-11">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.detail}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

function SkillBars() {
  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.name} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{skill.name}</span>
            <span className="text-muted-foreground">
              {skill.value}% · {skill.change}
            </span>
          </div>
          <Progress value={skill.value} />
        </div>
      ))}
    </div>
  );
}

function TaskList({ tasksToShow }: { tasksToShow: typeof tasks }) {
  return (
    <div className="space-y-3">
      {tasksToShow.map((task) => (
        <div key={task.title} className="grid gap-3 rounded-lg border p-3 sm:p-4 md:grid-cols-[90px_1fr_auto] md:items-center">
          <p className="text-sm font-semibold text-muted-foreground">{task.time}</p>
          <div>
            <p className="font-medium">{task.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {task.assignedBy} · {task.group} · {task.due}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={getPriorityVariant(task.priority)}>{task.priority}</Badge>
            <Badge variant="outline">{task.status}</Badge>
            <Button className="w-full sm:w-auto" variant="outline" size="sm">
              <UploadCloud className="h-4 w-4" />
              Submit
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function DashboardSection() {
  return (
    <>
      <section className="grid gap-4 xl:grid-cols-[1.5fr_0.8fr]">
        <div className="rounded-lg border bg-white p-5 shadow-soft">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium text-secondary">Welcome back, Riya</p>
              <h1 className="mt-1 text-2xl font-bold md:text-3xl">Your placement prep is 78% complete.</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Keep momentum today: finish aptitude practice, submit resume work, and review coding feedback.
              </p>
            </div>
            <div className="min-w-44 rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Current streak</p>
              <p className="mt-1 text-3xl font-bold">12 days</p>
            </div>
          </div>
          <div className="mt-5">
            <Progress value={78} />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coordinator Feedback</CardTitle>
            <CardDescription>Latest notes from mentors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {feedback.map((note) => (
              <div key={note} className="rounded-lg border bg-background p-3 text-sm leading-6">
                {note}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
      <MetricCards />
      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Today{"'"}s Task Bar</CardTitle>
            <CardDescription>Tasks ordered by deadline and priority.</CardDescription>
          </CardHeader>
          <CardContent>
            <TaskList tasksToShow={tasks.slice(0, 3)} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Skill Performance</CardTitle>
            <CardDescription>Current preparation strength.</CardDescription>
          </CardHeader>
          <CardContent>
            <SkillBars />
          </CardContent>
        </Card>
      </section>
    </>
  );
}

function ActivitiesSection() {
  return (
    <>
      <SectionIntro
        eyebrow="Placement Activities"
        title="Events, workshops, drives, and practice sessions assigned to you."
        description="View schedule, attendance requirement, location, links, attachments, coordinator notes, and completion state."
        action={
          <Button>
            <CalendarCheck className="h-4 w-4" />
            Sync Calendar
          </Button>
        }
      />
      <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>Assigned placement preparation activity list.</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {activities.map((item) => (
              <div key={item.title} className="grid gap-3 rounded-lg border p-3 sm:p-4 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    <Badge variant={item.status === "Completed" ? "secondary" : "outline"}>{item.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.type} · {item.date} · {item.time}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {item.location} · {item.attendance}
                  </p>
                </div>
                <Button className="w-full sm:w-auto" variant="outline" size="sm">
                  Details
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Attendance</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <p className="text-4xl font-bold">91%</p>
              <p className="text-sm text-muted-foreground">10 of 11 required activities attended</p>
            </div>
            <Progress value={91} />
            <div className="rounded-lg border bg-background p-3 text-sm">
              Next required activity starts at <span className="font-semibold">10:00 AM tomorrow</span>.
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

function DailyTasksSection({ query, setQuery }: { query: string; setQuery: (value: string) => void }) {
  const visibleTasks = useMemo(
    () => tasks.filter((task) => task.title.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <>
      <SectionIntro
        eyebrow="Daily Tasks"
        title="Today's coordinator-assigned work queue."
        description="Start, submit, comment, upload attachments, and track overdue placement preparation tasks."
        action={
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Export
          </Button>
        }
      />
      <Card>
        <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="grid gap-2 text-sm sm:grid-cols-3">
            <Badge variant="warning">3 Pending</Badge>
            <Badge variant="secondary">2 Completed</Badge>
            <Badge variant="danger">1 Overdue</Badge>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search tasks" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          <TaskList tasksToShow={visibleTasks} />
        </CardContent>
      </Card>
      <section className="grid gap-4 lg:grid-cols-3">
        {["Open task details", "Add comments", "Upload attachments"].map((item, index) => (
          <Card key={item}>
            <CardContent className="flex items-center gap-3 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-primary">{index + 1}</div>
              <p className="font-medium">{item}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}

function HomeworkSection() {
  return (
    <>
      <SectionIntro
        eyebrow="Placement Homework"
        title="Assignments from coordinators with submission-ready detail views."
        description="Track instructions, difficulty, category, score, due dates, accepted submission types, and review feedback."
        action={
          <Button>
            <FileUp className="h-4 w-4" />
            New Submission
          </Button>
        }
      />
      <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Homework Board</CardTitle>
            <CardDescription>Sorted by due date.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {homework.map((item) => (
              <div key={item.title} className="rounded-lg border p-3 sm:p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <Badge variant={item.status === "Submitted" ? "secondary" : "outline"}>{item.status}</Badge>
                </div>
                <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
                  <p>Due: {item.due}</p>
                  <p>Difficulty: {item.difficulty}</p>
                  <p>Maximum score: {item.score}</p>
                  <p>Submission: {item.submission}</p>
                </div>
                <Button className="mt-4 w-full" variant="outline">
                  Open Homework
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Submission Panel</CardTitle>
            <CardDescription>Preview state for selected homework.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Paste external platform link" />
            <textarea
              className="min-h-32 w-full rounded-md border bg-white px-3 py-2 text-base outline-none focus:ring-2 focus:ring-ring sm:text-sm"
              placeholder="Write your response or notes"
            />
            <div className="rounded-lg border border-dashed bg-background p-5 text-center">
              <UploadCloud className="mx-auto h-7 w-7 text-primary" />
              <p className="mt-2 text-sm font-medium">Upload PDF, DOCX, ZIP, or code file</p>
            </div>
            <Button className="w-full">Submit Homework</Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

function SelfAssessmentSection() {
  return (
    <>
      <SectionIntro
        eyebrow="Self-Assessment"
        title="Practice checks students can start anytime."
        description="Choose a skill area, take a timed self-check, and compare improvement against previous best scores."
        action={
          <Button>
            <PlayCircle className="h-4 w-4" />
            Start Practice
          </Button>
        }
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {selfAssessments.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.level}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-muted-foreground">Questions</p>
                  <p className="font-bold">{item.questions}</p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-bold">{item.duration}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Best score: {item.best}</p>
              <Button className="w-full" variant="outline">
                Launch
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
      <Card>
        <CardHeader>
          <CardTitle>Question Preview</CardTitle>
          <CardDescription>Selected assessment mock state.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-medium">Which data structure is best suited for checking balanced parentheses?</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Queue", "Stack", "Hash table", "Binary tree"].map((option) => (
              <button key={option} className="rounded-lg border bg-white p-3 text-left text-sm font-medium hover:bg-muted">
                {option}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function AssessmentsSection() {
  return (
    <>
      <SectionIntro
        eyebrow="Assessments"
        title="Coordinator-created tests, interviews, and company pattern mocks."
        description="See registrations, schedule, duration, assessment type, status, and joining actions."
        action={
          <Button>
            <Video className="h-4 w-4" />
            Join Next
          </Button>
        }
      />
      <section className="grid gap-4 lg:grid-cols-[1fr_330px]">
        <Card>
          <CardHeader>
            <CardTitle>Assessment Schedule</CardTitle>
            <CardDescription>Upcoming and open assessments.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {assessments.map((item) => (
              <div key={item.title} className="grid gap-3 rounded-lg border p-3 sm:p-4 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.date} · {item.type} · {item.duration}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{item.status}</Badge>
                  <Button className="flex-1 sm:flex-none" variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Latest Score</CardTitle>
            <CardDescription>Java fundamentals mock</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="text-center">
              <p className="text-5xl font-bold">88%</p>
              <p className="mt-2 text-sm text-muted-foreground">Rank 12 of 148 students</p>
            </div>
            <Progress value={88} />
            <Button className="w-full" variant="outline">
              Review Answers
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

function ResultsSection() {
  return (
    <>
      <SectionIntro
        eyebrow="Results"
        title="Scores, ranks, feedback, and performance history."
        description="Review assessment outcomes, coordinator feedback, strengths, weak areas, and downloadable result summaries."
        action={
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        }
      />
      <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Result History</CardTitle>
            <CardDescription>Recent scored activities.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {results.map((item) => (
              <div key={item.title} className="rounded-lg border p-3 sm:p-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.feedback}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-2xl font-bold">{item.score}%</p>
                    <p className="text-sm text-muted-foreground">Rank {item.rank}</p>
                  </div>
                </div>
                <Progress className="mt-4" value={item.score} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
            <CardDescription>Dummy visual summary.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[65, 74, 82, 91, 78, 88].map((height, index) => (
              <div key={height + index} className="flex items-center gap-3">
                <span className="w-10 text-sm text-muted-foreground">T{index + 1}</span>
                <div className="h-7 flex-1 rounded-md bg-muted">
                  <div className="h-full rounded-md bg-primary" style={{ width: `${height}%` }} />
                </div>
                <span className="w-10 text-sm font-medium">{height}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}

function AnnouncementsSection() {
  return (
    <>
      <SectionIntro
        eyebrow="Announcements"
        title="Placement updates from coordinators and institution admins."
        description="Follow company updates, room changes, deadlines, orientation notices, and preparation instructions."
        action={
          <Button variant="outline">
            <Check className="h-4 w-4" />
            Mark Read
          </Button>
        }
      />
      <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Latest Notices</CardTitle>
            <CardDescription>Unread notices appear first.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {announcements.map((item) => (
              <div key={item.title} className="rounded-lg border p-3 sm:p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="warning">{item.tag}</Badge>
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Channels</CardTitle>
            <CardDescription>Notification preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Email alerts", "Dashboard alerts", "Assessment reminders", "Drive updates"].map((item) => (
              <label key={item} className="flex items-center justify-between rounded-lg border p-3 text-sm font-medium">
                {item}
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
              </label>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}

function PreparationProgressSection() {
  return (
    <>
      <SectionIntro
        eyebrow="Preparation Progress"
        title="A complete view of placement readiness."
        description="Monitor skill scores, milestones, weekly effort, completed activities, and areas needing coordinator support."
        action={
          <Button>
            <BarChart3 className="h-4 w-4" />
            View Analytics
          </Button>
        }
      />
      <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Skill Progress</CardTitle>
            <CardDescription>Current score and monthly change.</CardDescription>
          </CardHeader>
          <CardContent>
            <SkillBars />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Milestones</CardTitle>
            <CardDescription>Placement preparation checklist.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {milestones.map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-lg border p-3">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    item.done ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Weekly practice", value: "11.5 hrs", icon: Clock3 },
          { label: "Activities completed", value: "18", icon: Activity },
          { label: "Readiness trend", value: "+14%", icon: Zap },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}

function ProfileSection() {
  const profileRows = [
    { label: "Email", value: "riya.sharma@example.edu", icon: Mail },
    { label: "Phone", value: "+91 98765 43210", icon: Phone },
    { label: "Department", value: "Computer Science Engineering", icon: BookOpen },
    { label: "Batch", value: "2027 · Section C", icon: Users },
    { label: "Primary group", value: "Advanced Coding Group", icon: Code2 },
    { label: "Placement interest", value: "Software Development", icon: BriefcaseBusiness },
  ];

  return (
    <>
      <SectionIntro
        eyebrow="Profile"
        title="Student academic, placement, and skill profile."
        description="Keep identity, contact details, department, groups, skills, resume links, and placement preferences ready."
        action={
          <Button>
            <FileUp className="h-4 w-4" />
            Upload Resume
          </Button>
        }
      />
      <section className="grid gap-4 xl:grid-cols-[360px_1fr]">
        <Card>
          <CardContent className="p-5">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-primary text-3xl font-bold text-primary-foreground">
                RS
              </div>
              <h2 className="mt-4 text-xl font-bold">Riya Sharma</h2>
              <p className="text-sm text-muted-foreground">CSE · Section C · Roll 21CSE084</p>
              <Badge className="mt-3" variant="secondary">
                Placement Ready: 78%
              </Badge>
            </div>
            <div className="mt-6 space-y-3">
              <Button className="w-full" variant="outline">
                <Link className="h-4 w-4" />
                Portfolio Link
              </Button>
              <Button className="w-full" variant="outline">
                <Award className="h-4 w-4" />
                Certificates
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Details</CardTitle>
              <CardDescription>Dummy profile data.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {profileRows.map((row) => (
                <div key={row.label} className="flex gap-3 rounded-lg border p-3">
                  <row.icon className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{row.label}</p>
                    <p className="text-sm font-medium">{row.value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Profile tags visible to coordinators.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Java", "SQL", "Data Structures", "Public Speaking"].map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeNav, setActiveNav] = useState<NavLabel>("Dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  function renderSection() {
    switch (activeNav) {
      case "Activities":
        return <ActivitiesSection />;
      case "Daily Tasks":
        return <DailyTasksSection query={query} setQuery={setQuery} />;
      case "Placement Homework":
        return <HomeworkSection />;
      case "Self-Assessment":
        return <SelfAssessmentSection />;
      case "Assessments":
        return <AssessmentsSection />;
      case "Results":
        return <ResultsSection />;
      case "Announcements":
        return <AnnouncementsSection />;
      case "Preparation Progress":
        return <PreparationProgressSection />;
      case "Profile":
        return <ProfileSection />;
      default:
        return <DashboardSection />;
    }
  }

  if (!isLoggedIn) {
    return (
      <main className="student-shell min-h-screen">
        <div className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-4 py-6 sm:py-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="space-y-7">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-soft">
              <GraduationCap className="h-8 w-8" aria-hidden="true" />
            </div>
            <div className="max-w-xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-normal text-secondary">Student Placement Portal</p>
              <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-5xl">
                Daily placement prep, all in one focused workspace.
              </h1>
              <p className="text-base leading-7 text-muted-foreground">
                Track tasks, homework, assessments, scores, feedback, announcements, and preparation progress with
                dummy student data.
              </p>
            </div>
            <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
              {["3 pending tasks", "82% average score", "2 assessments"].map((item) => (
                <div key={item} className="rounded-lg border bg-white/80 p-4 text-sm font-medium shadow-soft">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <Card className="mx-auto w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Enter any username/email and password to view the student dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  setIsLoggedIn(true);
                }}
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="identity">
                    Username or email
                  </label>
                  <Input id="identity" placeholder="student@example.edu" autoComplete="username" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Any password"
                      className="pr-11"
                      autoComplete="current-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <label className="flex items-center gap-2 text-muted-foreground">
                    <input className="h-4 w-4 rounded border-input accent-primary" type="checkbox" />
                    Remember me
                  </label>
                  <button className="font-medium text-primary" type="button">
                    Forgot password?
                  </button>
                </div>
                <Button className="w-full" type="submit">
                  Login
                </Button>
                <p className="text-center text-sm text-muted-foreground">Need help? Contact placement support.</p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      {mobileMenuOpen ? (
        <button
          className="fixed inset-0 z-30 bg-foreground/35 backdrop-blur-[1px] lg:hidden"
          aria-label="Close navigation"
          onClick={() => setMobileMenuOpen(false)}
        />
      ) : null}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 max-w-[86vw] border-r bg-white transition-transform lg:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold">PlacePrep</p>
              <p className="text-xs text-muted-foreground">Student</p>
            </div>
          </div>
          <Button className="lg:hidden" variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="h-[calc(100vh-4rem)] space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium transition-colors",
                activeNav === item.label ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
              )}
              onClick={() => {
                setActiveNav(item.label);
                setMobileMenuOpen(false);
              }}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/90 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <Button className="lg:hidden" variant="outline" size="icon" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-lg font-semibold">{activeNav}</h2>
              <p className="hidden text-sm text-muted-foreground sm:block">Riya Sharma, CSE Section C</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsLoggedIn(false)} aria-label="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="space-y-5 p-3 pb-28 sm:space-y-6 sm:p-4 sm:pb-28 md:p-6 lg:pb-6">{renderSection()}</div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t bg-white/95 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 shadow-[0_-10px_30px_rgba(31,41,55,0.08)] backdrop-blur lg:hidden">
        <div className="grid grid-cols-5 gap-1">
          {mobileNavItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 rounded-md px-1 text-[11px] font-medium leading-tight transition-colors",
                activeNav === item.label ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
              )}
              onClick={() => setActiveNav(item.label)}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="line-clamp-1">{item.label === "Placement Homework" ? "Homework" : item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </main>
  );
}

export default App;
