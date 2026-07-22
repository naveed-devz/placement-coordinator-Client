import { useMemo, useState } from "react";
import {
  Activity,
  Bell,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  ListChecks,
  LogOut,
  Menu,
  MessageSquareText,
  Search,
  Sparkles,
  Star,
  Target,
  Trophy,
  UserRound,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const navItems = [
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
  },
  {
    time: "12:00 PM",
    title: "Upload one-page resume draft",
    priority: "Medium",
    status: "Not started",
    assignedBy: "Arun Mehta",
    group: "Resume Review",
  },
  {
    time: "05:00 PM",
    title: "Finish arrays coding assignment",
    priority: "High",
    status: "Not started",
    assignedBy: "Nisha Kapoor",
    group: "Coding Group",
  },
  {
    time: "Yesterday",
    title: "Submit mock interview reflection",
    priority: "Critical",
    status: "Overdue",
    assignedBy: "Priya Raman",
    group: "Interview Group",
  },
];

const homework = [
  { title: "Resume headline rewrite", category: "Resume", due: "Today, 8:00 PM", score: "20 pts", status: "Pending" },
  { title: "SQL joins practice set", category: "Technical", due: "Tomorrow", score: "50 pts", status: "Started" },
  { title: "GD topic notes", category: "Communication", due: "Jul 26", score: "15 pts", status: "Pending" },
];

const assessments = [
  { title: "Cognizant pattern mock test", date: "Jul 24", type: "Coordinator", duration: "60 min" },
  { title: "Self check: Data structures", date: "Anytime", type: "Self", duration: "30 min" },
  { title: "HR interview readiness", date: "Jul 29", type: "Coordinator", duration: "20 min" },
];

const announcements = [
  "TCS NQT orientation moved to Seminar Hall B.",
  "Resume review slots are open for Section C students.",
  "Bring laptops for Saturday coding sprint.",
];

const skills = [
  { name: "Aptitude", value: 76 },
  { name: "Coding", value: 84 },
  { name: "Communication", value: 68 },
  { name: "Interview", value: 72 },
  { name: "Technical Core", value: 88 },
];

const feedback = [
  "Good improvement in coding speed. Focus on explaining time complexity.",
  "Resume needs stronger project impact metrics before company submissions.",
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const visibleTasks = useMemo(
    () => tasks.filter((task) => task.title.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  if (!isLoggedIn) {
    return (
      <main className="student-shell min-h-screen">
        <div className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-4 py-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="space-y-7">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-soft">
              <GraduationCap className="h-8 w-8" aria-hidden="true" />
            </div>
            <div className="max-w-xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-normal text-secondary">Student Placement Portal</p>
              <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl">
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
    <main className="min-h-screen bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 border-r bg-white transition-transform lg:translate-x-0",
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
        <nav className="space-y-1 p-3">
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

        <div className="space-y-6 p-4 md:p-6">
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

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted">
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

          <section className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
            <Card>
              <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                  <CardTitle>Daily Tasks</CardTitle>
                  <CardDescription>Open details, track priority, and mark work ready for submission.</CardDescription>
                </div>
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9" placeholder="Search tasks" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-2 text-sm sm:grid-cols-3">
                  <Badge variant="warning">3 Pending</Badge>
                  <Badge variant="secondary">2 Completed</Badge>
                  <Badge variant="danger">1 Overdue</Badge>
                </div>
                {visibleTasks.map((task) => (
                  <div key={task.title} className="grid gap-3 rounded-lg border p-4 md:grid-cols-[90px_1fr_auto] md:items-center">
                    <p className="text-sm font-semibold text-muted-foreground">{task.time}</p>
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {task.assignedBy} · {task.group}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={task.priority === "Critical" ? "danger" : task.priority === "High" ? "warning" : "muted"}>
                        {task.priority}
                      </Badge>
                      <Badge variant="outline">{task.status}</Badge>
                      <Button variant="outline" size="sm">
                        Submit
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Performance</CardTitle>
                <CardDescription>Dummy chart for preparation strength.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.value}%</span>
                    </div>
                    <Progress value={skill.value} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Placement Homework</CardTitle>
                <CardDescription>Pending submissions and scores.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {homework.map((item) => (
                  <div key={item.title} className="rounded-lg border p-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium">{item.title}</p>
                      <Badge variant="outline">{item.status}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.category} · {item.due} · {item.score}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assessments</CardTitle>
                <CardDescription>Coordinator-created and self checks.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {assessments.map((item) => (
                  <div key={item.title} className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      <p className="font-medium">{item.title}</p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.date} · {item.type} · {item.duration}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
                <CardDescription>Latest placement updates.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {announcements.map((item) => (
                  <div key={item} className="flex gap-3 rounded-lg border p-3 text-sm leading-6">
                    <MessageSquareText className="mt-1 h-4 w-4 shrink-0 text-secondary" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
