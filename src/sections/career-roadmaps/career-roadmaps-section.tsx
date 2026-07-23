import { useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  Check,
  Code2,
  FileQuestion,
  Lock,
  MessageSquareText,
  Play,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Track = {
  id: string;
  title: string;
  promise: string;
  estimatedTime: string;
  difficulty: string;
  packageRange: string;
  companies: string[];
  skills: { label: string; value: number }[];
  nodes: { label: string; status: "completed" | "current" | "progress" | "locked"; summary: string }[];
  phases: { title: string; progress: number; status: string }[];
  projects: { title: string; locked?: boolean }[];
  problems: { topic: string; completed: number; total: number }[];
  questions: string[];
};

const tracks: Track[] = [
  {
    id: "software",
    title: "Software Engineer",
    promise: "Become interview ready in 6 months.",
    estimatedTime: "6 Months",
    difficulty: "Intermediate",
    packageRange: "8-18 LPA",
    companies: ["Amazon", "Microsoft", "Oracle", "Adobe", "Zoho", "Flipkart", "Infosys", "TCS", "Accenture"],
    skills: [
      { label: "Java", value: 85 },
      { label: "DSA", value: 52 },
      { label: "SQL", value: 68 },
      { label: "System Design", value: 28 },
      { label: "Backend", value: 44 },
    ],
    nodes: [
      { label: "Programming Basics", status: "completed", summary: "Syntax, loops, functions, memory basics" },
      { label: "OOP", status: "completed", summary: "Classes, inheritance, polymorphism, interfaces" },
      { label: "Collections", status: "current", summary: "List, Set, Map, queues, sorting and complexity" },
      { label: "DSA Patterns", status: "progress", summary: "Arrays, strings, trees, graphs, DP" },
      { label: "SQL", status: "progress", summary: "Joins, grouping, indexes, transactions" },
      { label: "Backend APIs", status: "locked", summary: "REST, auth, services, validation" },
      { label: "System Design", status: "locked", summary: "Scalability, cache, queues, tradeoffs" },
      { label: "Interview Prep", status: "locked", summary: "Mock rounds and revision loops" },
    ],
    phases: [
      { title: "Programming Basics", progress: 100, status: "Completed" },
      { title: "OOP and Collections", progress: 62, status: "Current" },
      { title: "DSA and SQL", progress: 35, status: "In progress" },
      { title: "Backend and System Design", progress: 0, status: "Locked" },
    ],
    projects: [
      { title: "Calculator" },
      { title: "Library Management" },
      { title: "Banking System" },
      { title: "URL Shortener", locked: true },
      { title: "E-commerce Backend", locked: true },
      { title: "Microservices", locked: true },
    ],
    problems: [
      { topic: "Arrays", completed: 28, total: 45 },
      { topic: "Strings", completed: 22, total: 35 },
      { topic: "Collections", completed: 14, total: 30 },
      { topic: "SQL", completed: 18, total: 28 },
    ],
    questions: [
      "Explain HashMap internals and collision handling.",
      "How do you choose ArrayList vs LinkedList vs HashSet?",
      "Design a placement assessment API with auth and reporting.",
      "Explain SQL indexes and when they hurt performance.",
      "How would you debug a memory leak in a Java service?",
    ],
  },
  {
    id: "fullstack",
    title: "Full Stack",
    promise: "Build frontend, backend, database and deployment confidence.",
    estimatedTime: "7 Months",
    difficulty: "Intermediate",
    packageRange: "6-16 LPA",
    companies: ["Zoho", "Freshworks", "Razorpay", "TCS", "Accenture", "Infosys", "Deloitte"],
    skills: [
      { label: "React", value: 70 },
      { label: "Node.js", value: 54 },
      { label: "SQL", value: 64 },
      { label: "Auth", value: 42 },
      { label: "Deployment", value: 25 },
    ],
    nodes: [
      { label: "HTML/CSS/JS", status: "completed", summary: "Responsive UI and browser basics" },
      { label: "React", status: "current", summary: "Components, state, forms, API calls" },
      { label: "Node APIs", status: "progress", summary: "Routes, controllers, services, validation" },
      { label: "Database", status: "progress", summary: "SQL schema, queries, indexes" },
      { label: "Authentication", status: "locked", summary: "JWT, roles, sessions, security" },
      { label: "Deployment", status: "locked", summary: "Env, Docker basics, logs" },
      { label: "Projects", status: "locked", summary: "Full-stack placement-grade apps" },
    ],
    phases: [
      { title: "Frontend Basics", progress: 84, status: "In progress" },
      { title: "API Development", progress: 46, status: "Current" },
      { title: "Database and Auth", progress: 28, status: "In progress" },
      { title: "Deployment and Projects", progress: 0, status: "Locked" },
    ],
    projects: [
      { title: "Task Manager" },
      { title: "Placement Portal" },
      { title: "Chat Application", locked: true },
      { title: "E-commerce App", locked: true },
      { title: "Real-Time Dashboard", locked: true },
    ],
    problems: [
      { topic: "React", completed: 18, total: 32 },
      { topic: "APIs", completed: 12, total: 28 },
      { topic: "SQL", completed: 14, total: 24 },
      { topic: "Auth", completed: 6, total: 18 },
    ],
    questions: [
      "Explain React state and props with data flow.",
      "How do you structure a Node.js API project?",
      "How do you secure login with JWT?",
      "How do frontend and backend handle validation together?",
      "Explain deployment environment variables and failure cases.",
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    promise: "Become strong in UI, React, accessibility and product-grade frontend.",
    estimatedTime: "5 Months",
    difficulty: "Beginner",
    packageRange: "5-14 LPA",
    companies: ["Atlassian", "Postman", "Razorpay", "Zoho", "Publicis Sapient", "Accenture"],
    skills: [
      { label: "HTML", value: 90 },
      { label: "CSS", value: 76 },
      { label: "JavaScript", value: 68 },
      { label: "React", value: 58 },
      { label: "Testing", value: 22 },
    ],
    nodes: [
      { label: "HTML", status: "completed", summary: "Semantic structure and forms" },
      { label: "CSS", status: "completed", summary: "Layout, responsive design, states" },
      { label: "JavaScript", status: "current", summary: "DOM, async, arrays, objects" },
      { label: "React", status: "progress", summary: "Components, hooks, routing" },
      { label: "TypeScript", status: "locked", summary: "Props, APIs, reusable types" },
      { label: "Performance", status: "locked", summary: "Rendering, bundles, metrics" },
      { label: "Frontend Interview", status: "locked", summary: "JS, React, UI problems" },
    ],
    phases: [
      { title: "Web Basics", progress: 100, status: "Completed" },
      { title: "JavaScript", progress: 68, status: "Current" },
      { title: "React and TypeScript", progress: 34, status: "In progress" },
      { title: "Performance and Testing", progress: 0, status: "Locked" },
    ],
    projects: [
      { title: "Portfolio" },
      { title: "Dashboard UI" },
      { title: "Quiz App" },
      { title: "Kanban Board", locked: true },
      { title: "Design System", locked: true },
    ],
    problems: [
      { topic: "JavaScript", completed: 24, total: 40 },
      { topic: "React", completed: 16, total: 35 },
      { topic: "CSS", completed: 18, total: 26 },
      { topic: "Accessibility", completed: 5, total: 18 },
    ],
    questions: [
      "Explain event bubbling and capturing.",
      "How does React reconciliation work at a high level?",
      "Controlled vs uncontrolled components?",
      "How do you avoid unnecessary re-renders?",
      "How do you make a form accessible?",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    promise: "Learn APIs, databases, auth, architecture and production backend thinking.",
    estimatedTime: "6 Months",
    difficulty: "Intermediate",
    packageRange: "7-18 LPA",
    companies: ["Oracle", "Amazon", "Microsoft", "Paytm", "PhonePe", "TCS", "Infosys"],
    skills: [
      { label: "APIs", value: 74 },
      { label: "SQL", value: 62 },
      { label: "Auth", value: 44 },
      { label: "Caching", value: 30 },
      { label: "System Design", value: 24 },
    ],
    nodes: [
      { label: "HTTP + REST", status: "completed", summary: "Methods, status, JSON, errors" },
      { label: "Backend Language", status: "current", summary: "Java, Node or Python service code" },
      { label: "Database", status: "progress", summary: "Schema, queries, transactions" },
      { label: "Authentication", status: "progress", summary: "JWT, sessions, roles" },
      { label: "Caching", status: "locked", summary: "Redis, TTL, invalidation" },
      { label: "Queues", status: "locked", summary: "Async jobs and events" },
      { label: "System Design", status: "locked", summary: "Scale and tradeoffs" },
    ],
    phases: [
      { title: "API Basics", progress: 90, status: "Completed" },
      { title: "Database and Auth", progress: 55, status: "Current" },
      { title: "Caching and Queues", progress: 20, status: "In progress" },
      { title: "System Design", progress: 0, status: "Locked" },
    ],
    projects: [
      { title: "REST API" },
      { title: "Authentication Service" },
      { title: "URL Shortener" },
      { title: "Notification Queue", locked: true },
      { title: "Microservices", locked: true },
    ],
    problems: [
      { topic: "REST", completed: 16, total: 24 },
      { topic: "SQL", completed: 19, total: 30 },
      { topic: "Auth", completed: 8, total: 20 },
      { topic: "Caching", completed: 3, total: 15 },
    ],
    questions: [
      "How do you design REST error responses?",
      "JWT vs session authentication?",
      "How do transactions work?",
      "When would you add Redis?",
      "How do you design a rate limiter?",
    ],
  },
  {
    id: "ai",
    title: "AI Engineer",
    promise: "Build AI applications with LLMs, RAG, vector databases and agents.",
    estimatedTime: "6 Months",
    difficulty: "Advanced",
    packageRange: "8-22 LPA",
    companies: ["Microsoft", "Google", "Accenture", "TCS", "Infosys", "Fractal", "Deloitte"],
    skills: [
      { label: "Python", value: 72 },
      { label: "LLM", value: 48 },
      { label: "RAG", value: 35 },
      { label: "Vector DB", value: 28 },
      { label: "Agents", value: 18 },
    ],
    nodes: [
      { label: "Python", status: "completed", summary: "Data structures, APIs, files" },
      { label: "Prompting", status: "current", summary: "Instructions, examples, constraints" },
      { label: "LLM APIs", status: "progress", summary: "Calls, messages, tools, streaming" },
      { label: "Embeddings", status: "progress", summary: "Similarity and retrieval" },
      { label: "RAG", status: "locked", summary: "Chunk, embed, retrieve, answer" },
      { label: "Agents", status: "locked", summary: "Planning, tools, memory, evals" },
      { label: "Production AI", status: "locked", summary: "Monitoring, safety, cost" },
    ],
    phases: [
      { title: "Python + APIs", progress: 75, status: "In progress" },
      { title: "Prompting + LLMs", progress: 48, status: "Current" },
      { title: "RAG + Vector DBs", progress: 22, status: "In progress" },
      { title: "Agents + Production", progress: 0, status: "Locked" },
    ],
    projects: [
      { title: "AI Chatbot" },
      { title: "Resume Reviewer" },
      { title: "RAG Notes Search", locked: true },
      { title: "Interview Agent", locked: true },
      { title: "Multi-Agent Tutor", locked: true },
    ],
    problems: [
      { topic: "Prompting", completed: 12, total: 25 },
      { topic: "LLM APIs", completed: 8, total: 22 },
      { topic: "RAG", completed: 4, total: 20 },
      { topic: "Agents", completed: 1, total: 18 },
    ],
    questions: [
      "What is the difference between prompt engineering and RAG?",
      "How do embeddings work conceptually?",
      "How do you evaluate LLM output quality?",
      "What can go wrong in an AI agent?",
      "How do you reduce hallucinations in RAG?",
    ],
  },
];

const sidebarTracks = [
  "Software Engineer",
  "Full Stack",
  "Frontend",
  "Backend",
  "Java Developer",
  "Python Developer",
  "Data Engineer",
  "AI Engineer",
  "DevOps",
  "Cyber Security",
  "Cloud Engineer",
  "Mobile",
  "Product Engineer",
];

export function CareerRoadmapsSection({ onAction }: { onAction: (message: string) => void }) {
  const [selectedId, setSelectedId] = useState("software");
  const [selectedNode, setSelectedNode] = useState("Collections");
  const [detailNode, setDetailNode] = useState<string | null>(null);
  const selected = tracks.find((track) => track.id === selectedId) ?? tracks[0];
  const node = selected.nodes.find((item) => item.label === selectedNode) ?? selected.nodes[2] ?? selected.nodes[0];

  function selectTrack(label: string) {
    const matched = tracks.find((track) => track.title === label || label.toLowerCase().includes(track.id));
    const next = matched ?? selected;
    setSelectedId(next.id);
    setSelectedNode(next.nodes.find((item) => item.status === "current")?.label ?? next.nodes[0].label);
    setDetailNode(null);
  }

  if (detailNode) {
    const openedNode = selected.nodes.find((item) => item.label === detailNode) ?? node;
    return <RoadmapNodePage track={selected} node={openedNode} onAction={onAction} onBack={() => setDetailNode(null)} />;
  }

  return (
    <section className="min-w-0 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Career Tracks</CardTitle>
          <CardDescription>Pick one path and follow it from basics to placement ready.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2 overflow-x-auto pb-4">
          {sidebarTracks.map((track) => (
            <button
              key={track}
              className={cn(
                "flex h-10 shrink-0 items-center gap-2 rounded-md border px-3 text-left text-sm font-medium transition-colors",
                selected.title === track ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
              )}
              onClick={() => selectTrack(track)}
            >
              <Star className="h-4 w-4 shrink-0" />
              <span className="truncate">{track}</span>
            </button>
          ))}
        </CardContent>
      </Card>

      <section className="rounded-lg border bg-white p-4 shadow-soft">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-secondary">Career Track</p>
            <h1 className="mt-1 text-2xl font-bold text-foreground">{selected.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{selected.promise}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {selected.skills.slice(0, 5).map((skill) => (
              <Badge key={skill.label} variant="outline">
                <Check className="h-3.5 w-3.5" />
                {skill.label}
              </Badge>
            ))}
          </div>
          <div className="grid min-w-0 gap-2 text-sm sm:grid-cols-3 xl:w-[430px]">
            <Info label="Time" value={selected.estimatedTime} />
            <Info label="Difficulty" value={selected.difficulty} />
            <Info label="Package" value={selected.packageRange} />
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Button onClick={() => onAction(`${selected.title} learning started.`)}>
              <Play className="h-4 w-4" />
              Start
            </Button>
            <Button variant="outline" onClick={() => setDetailNode(node.label)}>
              Current Topic
            </Button>
          </div>
        </div>
      </section>

      <Card id="main-roadmap">
        <CardHeader className="py-4">
          <CardTitle>Roadmap</CardTitle>
          <CardDescription>Click a row to open the topic page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {selected.nodes.map((item, index) => (
            <button
              key={item.label}
              className={cn(
                "grid w-full gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors md:grid-cols-[36px_minmax(0,1fr)_110px_auto] md:items-center",
                node.label === item.label && "border-primary bg-primary/5",
                item.status === "completed" && "border-secondary/50 bg-secondary/10",
                item.status === "current" && "border-primary bg-primary/10",
                item.status === "progress" && "border-warning/40 bg-warning/10",
                item.status === "locked" && "bg-muted text-muted-foreground",
              )}
              onClick={() => {
                setSelectedNode(item.label);
                setDetailNode(item.label);
              }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-sm font-bold text-primary">{index + 1}</span>
              <span className="min-w-0">
                <span className="block font-semibold">{item.label}</span>
                <span className="block truncate text-sm text-muted-foreground">{item.summary}</span>
              </span>
              <Badge variant={item.status === "locked" ? "outline" : item.status === "completed" ? "secondary" : "warning"}>{item.status}</Badge>
              {item.status === "locked" ? <Lock className="h-4 w-4" /> : <Check className="h-4 w-4" />}
            </button>
          ))}
        </CardContent>
      </Card>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-4">
          <section className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Learning Timeline</CardTitle>
              <CardDescription>Visible progress by phase.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selected.phases.map((phase, index) => (
                <div key={phase.title} className="rounded-lg border bg-background p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Phase {index + 1}</p>
                      <p className="font-semibold">{phase.title}</p>
                    </div>
                    <Badge variant={phase.status === "Locked" ? "outline" : phase.status === "Completed" ? "secondary" : "warning"}>{phase.status}</Badge>
                  </div>
                  <Progress className="mt-3" value={phase.progress} />
                  <p className="mt-2 text-sm text-muted-foreground">{phase.progress}%</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skill Graph</CardTitle>
              <CardDescription>Readiness by skill.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selected.skills.map((skill) => (
                <div key={skill.label}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium">{skill.label}</span>
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
              <CardTitle>Projects</CardTitle>
              <CardDescription>Projects unlock gradually.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {selected.projects.map((project) => (
                <div key={project.title} className={cn("flex items-center gap-2 rounded-md border p-3 text-sm", project.locked && "bg-muted text-muted-foreground")}>
                  {project.locked ? <Lock className="h-4 w-4" /> : <Check className="h-4 w-4 text-secondary" />}
                  {project.title}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Practice</CardTitle>
              <CardDescription>Like a focused problem list.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {selected.problems.map((problem) => (
                <div key={problem.topic} className="rounded-lg border bg-background p-3">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold">{problem.topic}</span>
                    <span className="text-muted-foreground">{problem.completed}/{problem.total}</span>
                  </div>
                  <Progress className="mt-2" value={(problem.completed / problem.total) * 100} />
                </div>
              ))}
              <Button className="w-full" variant="outline" onClick={() => onAction(`${selected.title} practice opened.`)}>
                <Code2 className="h-4 w-4" />
                Open Problems
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interview Prep</CardTitle>
              <CardDescription>Top questions, company-wise and scenario based.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {selected.questions.slice(0, 4).map((question) => (
                <div key={question} className="rounded-md border bg-background p-3 text-sm leading-6">
                  {question}
                </div>
              ))}
              <Button className="w-full" onClick={() => onAction(`${selected.title} interview opened.`)}>
                <MessageSquareText className="h-4 w-4" />
                Mock Interview
              </Button>
            </CardContent>
          </Card>
          </section>

          <Card>
          <CardHeader>
            <CardTitle>Companies</CardTitle>
            <CardDescription>Company mapping and question frequency.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            {selected.companies.map((company, index) => (
              <div key={company} className="rounded-lg border bg-background p-3">
                <p className="font-semibold">{company}</p>
                <p className="mt-2 text-sm text-warning">{"★★★★★".slice(0, Math.max(3, 5 - (index % 3)))}</p>
              </div>
            ))}
          </CardContent>
          </Card>
        </div>

        <Card className="h-fit xl:sticky xl:top-20">
        <CardHeader>
          <CardTitle>Progress</CardTitle>
          <CardDescription>Today’s learning actions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-background p-3">
            <p className="text-sm text-muted-foreground">Overall Progress</p>
            <p className="mt-1 text-3xl font-bold">72%</p>
            <Progress className="mt-3" value={72} />
          </div>
          <Info label="Today's Goal" value={node.label} />
          <Info label="Revision Due" value="2 chapters" />
          <Info label="Mock Interview" value="Available" />
          <div className="grid gap-2">
            <Button onClick={() => onAction(`${node.label} continued.`)}>
              <Play className="h-4 w-4" />
              Continue Learning
            </Button>
            <Button variant="outline" onClick={() => onAction(`${node.label} bookmarked.`)}>
              <Bookmark className="h-4 w-4" />
              Bookmark
            </Button>
            <Button variant="outline" onClick={() => onAction("AI mentor opened.")}>
              <FileQuestion className="h-4 w-4" />
              Ask AI Mentor
            </Button>
          </div>
          <div className="rounded-lg border bg-background p-3">
            <p className="font-semibold">AI Mentor</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Explain", "Quiz", "Interview", "Hint", "Notes"].map((item) => (
                <Badge key={item} variant="outline">{item}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
        </Card>
      </section>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function RoadmapNodePage({
  track,
  node,
  onAction,
  onBack,
}: {
  track: Track;
  node: Track["nodes"][number];
  onAction: (message: string) => void;
  onBack: () => void;
}) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          Roadmap
        </Button>
        <Badge variant="secondary">{track.title}</Badge>
      </div>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <CardTitle className="text-2xl">{node.label}</CardTitle>
                  <CardDescription className="mt-2">{node.summary}</CardDescription>
                </div>
                <Badge variant={node.status === "locked" ? "outline" : node.status === "completed" ? "secondary" : "warning"}>{node.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              <Info label="Difficulty" value={node.status === "locked" ? "Locked" : "Medium"} />
              <Info label="Estimated Time" value="4 Hours" />
              <Info label="Prerequisites" value="Previous roadmap node" />
            </CardContent>
          </Card>

          <div className="space-y-4">
            {[
              ["Overview", `Understand why ${node.label} exists, what problem it solves, and where it appears in ${track.title} interviews.`],
              ["Theory", "Learn the definitions, rules, mental model, edge cases and tradeoffs with mentor-style explanations."],
              ["Visualization", "Draw the execution flow, memory layout, request lifecycle or dependency path before memorizing answers."],
              ["Examples", "Study one simple example, one real-world placement platform example, and one production-style example."],
              ["Internal Working", "Trace how the concept behaves internally: runtime, memory, data structures, API flow, performance and failure modes."],
              ["Interview Questions", "Practice easy, medium, hard, scenario-based, production-based and follow-up questions."],
              ["Coding Practice", "Solve topic-wise problems, review failed attempts and bookmark weak patterns."],
              ["Quiz", "Check recall with short MCQ and explanation questions before marking complete."],
              ["Assignment", "Build a small feature using this concept and document assumptions, edge cases and tradeoffs."],
              ["Project", `Connect ${node.label} to one ${track.title} project so it becomes resume evidence.`],
              ["Revision Notes", "Save compact notes, common mistakes, flashcards and next revision date."],
            ].map(([title, text]) => (
              <Card key={title}>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">{text}</p>
                  {title === "Visualization" ? (
                    <pre className="mt-4 overflow-x-auto rounded-lg border bg-slate-950 p-4 text-sm leading-6 text-slate-100">
{`${track.title}
   |
   v
${node.label}
   |
   +--> Theory
   +--> Internal working
   +--> Practice
   +--> Interview
   +--> Revision`}
                    </pre>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="h-fit xl:sticky xl:top-20">
          <CardHeader>
            <CardTitle>Topic Actions</CardTitle>
            <CardDescription>Keep the reading page focused.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" onClick={() => onAction(`${node.label} continued.`)}>
              <Play className="h-4 w-4" />
              Continue
            </Button>
            <Button className="w-full" variant="outline" onClick={() => onAction(`${node.label} practice opened.`)}>
              <Code2 className="h-4 w-4" />
              Practice
            </Button>
            <Button className="w-full" variant="outline" onClick={() => onAction(`${node.label} interview opened.`)}>
              <MessageSquareText className="h-4 w-4" />
              Interview
            </Button>
            <Button className="w-full" variant="outline" onClick={() => onAction(`${node.label} bookmarked.`)}>
              <Bookmark className="h-4 w-4" />
              Bookmark
            </Button>
            <Button className="w-full" onClick={() => onAction(`${node.label} completed.`)}>
              <Check className="h-4 w-4" />
              Mark Complete
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
