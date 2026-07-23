import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  Brain,
  CheckCircle2,
  Code2,
  FileQuestion,
  Layers3,
  MessageSquareText,
  Play,
  Search,
  Target,
} from "lucide-react";
import { SectionIntro } from "@/components/common/section-intro";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ChapterTab = "Overview" | "Theory" | "Examples" | "Visualization" | "Code" | "Practice" | "Interview" | "Revision" | "Notes";

const technologies = [
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "React",
  "Node.js",
  "Express.js",
  "SQL",
  "MongoDB",
  "Redis",
  "Git & GitHub",
  "Docker",
  "Linux",
  "REST APIs",
  "GraphQL",
  "Authentication",
  "OOP",
  "Design Patterns",
  "Data Structures",
  "Algorithms",
  "Operating Systems",
  "Computer Networks",
  "DBMS",
  "System Design",
  "Distributed Systems",
  "Kafka",
  "RabbitMQ",
  "Kubernetes",
  "AWS",
  "AI Engineering",
  "Prompt Engineering",
  "LLM",
  "RAG",
  "Vector Databases",
  "LangChain",
  "LangGraph",
  "MCP",
  "AI Agents",
  "HR Interview",
  "Resume Preparation",
  "Mock Interviews",
];

const flow = ["Roadmap", "Fundamentals", "Core", "Intermediate", "Advanced", "Production", "Interview", "Coding", "Projects", "Revision", "Mock"];
const tabs: ChapterTab[] = ["Overview", "Theory", "Examples", "Visualization", "Code", "Practice", "Interview", "Revision", "Notes"];

export function StudyMaterialsSection({ onAction }: { onAction: (message: string) => void }) {
  const [query, setQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("Java");
  const [activeStage, setActiveStage] = useState("Fundamentals");
  const [activeTab, setActiveTab] = useState<ChapterTab>("Theory");
  const [chapterOpen, setChapterOpen] = useState(false);

  const filteredTech = useMemo(
    () => technologies.filter((tech) => tech.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const material = getMaterial(selectedTech, activeStage);

  if (chapterOpen) {
    return (
      <ChapterPage
        activeTab={activeTab}
        material={material}
        selectedTech={selectedTech}
        onAction={onAction}
        onBack={() => setChapterOpen(false)}
        onChangeTab={setActiveTab}
      />
    );
  }

  return (
    <>
      <SectionIntro
        eyebrow="Study Materials"
        title="Question → Learning → Practice → Revision"
        description="A personal interview-preparation workspace. Pick any technology, study the chapter, practice questions, revise weak areas, and prepare for mock interviews."
        action={
          <Button onClick={() => onAction(`${selectedTech} mock interview started.`)}>
            <MessageSquareText className="h-4 w-4" />
            Mock Interview
          </Button>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          { label: "Continue Learning", value: selectedTech, detail: activeStage, icon: Play },
          { label: "Today's Goal", value: "2 chapters", detail: "Theory + practice", icon: Target },
          { label: "Revision Due", value: "4", detail: "Weak topics", icon: Brain },
          { label: "Coding Streak", value: "7 days", detail: "Keep solving", icon: Code2 },
          { label: "Bookmarks", value: "18", detail: "Notes and questions", icon: Bookmark },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="flex min-w-0 items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm text-muted-foreground">{item.label}</p>
                <p className="truncate text-xl font-bold">{item.value}</p>
                <p className="truncate text-xs text-muted-foreground">{item.detail}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid min-w-0 gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
        <Card className="h-fit xl:sticky xl:top-20">
          <CardHeader>
            <CardTitle>Technologies</CardTitle>
            <CardDescription>Search everything by topic, company, class, method, pattern, or project.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search technology" value={query} onChange={(event) => setQuery(event.target.value)} />
            </div>
            <div className="max-h-[62vh] space-y-1 overflow-y-auto pr-1">
              {filteredTech.map((tech) => (
                <button
                  key={tech}
                  className={cn(
                    "flex h-10 w-full items-center gap-2 rounded-md px-3 text-left text-sm font-medium transition-colors",
                    selectedTech === tech ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
                  )}
                  onClick={() => {
                    setSelectedTech(tech);
                    setActiveStage("Fundamentals");
                    setActiveTab("Theory");
                    setChapterOpen(false);
                  }}
                >
                  <Layers3 className="h-4 w-4 shrink-0" />
                  <span className="truncate">{tech}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="min-w-0 space-y-4">
          <Card>
            <CardHeader className="gap-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
              <div className="min-w-0">
                <CardTitle>{selectedTech}</CardTitle>
                <CardDescription>Progress, readiness, practice, revision and bookmarked material for this technology.</CardDescription>
              </div>
              <Button onClick={() => onAction(`${selectedTech} bookmarked.`)} variant="outline">
                <Bookmark className="h-4 w-4" />
                Bookmark
              </Button>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
              {[
                ["Progress", "42%"],
                ["Modules", "25 / 60"],
                ["Interview", "72%"],
                ["Coding", "80%"],
                ["Revision Due", "4"],
                ["Notes", "12"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border bg-background p-3">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="mt-1 text-lg font-bold">{value}</p>
                </div>
              ))}
            </CardContent>
            <CardContent className="pt-0">
              <Button
                onClick={() => {
                  setActiveTab("Theory");
                  setChapterOpen(true);
                }}
              >
                <Play className="h-4 w-4" />
                Continue {activeStage}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Flow</CardTitle>
              <CardDescription>Same structure for every technology.</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2 overflow-x-auto pb-1">
              {flow.map((stage) => (
                <button
                  key={stage}
                  className={cn(
                    "shrink-0 rounded-md border px-3 py-2 text-sm font-medium transition-colors",
                    activeStage === stage ? "border-primary bg-primary text-primary-foreground" : "bg-white text-muted-foreground hover:bg-muted",
                  )}
                  onClick={() => {
                    setActiveStage(stage);
                    setActiveTab("Theory");
                    setChapterOpen(true);
                  }}
                >
                  {stage}
                </button>
              ))}
            </CardContent>
          </Card>

          <section className="grid gap-4 xl:grid-cols-2">
            <PracticeBoard selectedTech={selectedTech} onAction={onAction} />
            <RevisionBoard selectedTech={selectedTech} />
          </section>
        </div>
      </section>
    </>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function ChapterPage({
  activeTab,
  material,
  selectedTech,
  onAction,
  onBack,
  onChangeTab,
}: {
  activeTab: ChapterTab;
  material: ReturnType<typeof getMaterial>;
  selectedTech: string;
  onAction: (message: string) => void;
  onBack: () => void;
  onChangeTab: (tab: ChapterTab) => void;
}) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          Study Materials
        </Button>
        <Badge variant="secondary">{selectedTech}</Badge>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <CardTitle className="text-2xl">{material.title}</CardTitle>
              <CardDescription className="mt-2">{material.meta}</CardDescription>
            </div>
            <Badge variant={material.difficulty === "Advanced" ? "danger" : material.difficulty === "Intermediate" ? "outline" : "secondary"}>
              {material.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            <InfoBlock label="Estimated Time" value={material.time} />
            <InfoBlock label="Prerequisites" value={material.prerequisites} />
            <InfoBlock label="Learning Goal" value={material.goal} />
          </div>

          <div className="flex gap-2 overflow-x-auto rounded-lg border bg-muted p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={cn(
                  "shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  activeTab === tab ? "bg-white text-primary shadow-sm" : "text-muted-foreground",
                )}
                onClick={() => onChangeTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <ChapterPanel tab={activeTab} material={material} selectedTech={selectedTech} onAction={onAction} />
        </CardContent>
      </Card>
    </>
  );
}

function ChapterPanel({
  tab,
  material,
  selectedTech,
  onAction,
}: {
  tab: ChapterTab;
  material: ReturnType<typeof getMaterial>;
  selectedTech: string;
  onAction: (message: string) => void;
}) {
  if (tab === "Visualization") {
    return (
      <pre className="overflow-x-auto rounded-lg border bg-slate-950 p-4 text-sm leading-6 text-slate-100">
{material.diagram}
      </pre>
    );
  }

  if (tab === "Code") {
    return (
      <div className="space-y-3">
        <pre className="overflow-x-auto rounded-lg border bg-slate-950 p-4 text-sm leading-6 text-slate-100">
{material.code}
        </pre>
        <Button onClick={() => onAction(`${selectedTech} code practice opened.`)}>
          <Code2 className="h-4 w-4" />
          Open Coding Page
        </Button>
      </div>
    );
  }

  if (tab === "Practice") {
    return <QuestionGrid title="Coding Questions" questions={material.codingQuestions} action="Solve" onAction={onAction} />;
  }

  if (tab === "Interview") {
    return <QuestionGrid title="Interview Questions" questions={material.interviewQuestions} action="View Answer" onAction={onAction} />;
  }

  const content =
    tab === "Overview"
      ? material.overview
      : tab === "Theory"
        ? material.theory
        : tab === "Examples"
          ? material.examples
          : tab === "Revision"
            ? material.revision
            : tab === "Notes"
              ? material.notes
              : material.assignment;

  return (
    <div className="space-y-3">
      {content.map((item) => (
        <div key={item.title} className="rounded-lg border bg-background p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{item.label}</Badge>
            <h3 className="font-semibold">{item.title}</h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
          {item.highlight ? <div className="mt-3 rounded-md border-l-4 border-secondary bg-secondary/10 px-3 py-2 text-sm leading-6">{item.highlight}</div> : null}
        </div>
      ))}
      <Button onClick={() => onAction(`${material.title} marked complete.`)}>
        <CheckCircle2 className="h-4 w-4" />
        Mark Complete
      </Button>
    </div>
  );
}

function QuestionGrid({
  title,
  questions,
  action,
  onAction,
}: {
  title: string;
  questions: string[];
  action: string;
  onAction: (message: string) => void;
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">{title}</h3>
      <div className="grid gap-3 lg:grid-cols-2">
        {questions.map((question, index) => (
          <div key={question} className="rounded-lg border bg-background p-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="font-medium">Q{index + 1}. {question}</p>
              <Badge variant={index > 2 ? "danger" : index > 0 ? "outline" : "secondary"}>{index > 2 ? "Hard" : index > 0 ? "Medium" : "Easy"}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Asked by: TCS, Infosys, Accenture · Expected time: {index + 1}0 min</p>
            <Button className="mt-3" size="sm" variant="outline" onClick={() => onAction(`${action}: ${question}`)}>
              <FileQuestion className="h-4 w-4" />
              {action}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PracticeBoard({ selectedTech, onAction }: { selectedTech: string; onAction: (message: string) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Practice</CardTitle>
        <CardDescription>Filter by difficulty, company, topic, popularity, bookmark, or incomplete state.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {["Easy", "Medium", "Hard", "Company Wise", "Topic Wise", "Recently Asked", "Most Popular", "Bookmarked", "Incomplete"].map((filter) => (
            <Badge key={filter} variant="outline">{filter}</Badge>
          ))}
        </div>
        {["Core concept MCQ set", "Scenario-based coding question", "Production debugging question"].map((question, index) => (
          <div key={question} className="rounded-lg border bg-background p-3">
            <p className="font-semibold">{selectedTech}: {question}</p>
            <p className="mt-1 text-sm text-muted-foreground">Acceptance {82 - index * 9}% · Tags: fundamentals, interview, production</p>
            <Button className="mt-3" size="sm" onClick={() => onAction(`${selectedTech} practice opened.`)}>Solve</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function RevisionBoard({ selectedTech }: { selectedTech: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revision Dashboard</CardTitle>
        <CardDescription>{selectedTech} spaced repetition and weak-topic review.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {[
          ["Due Today", "4"],
          ["Completed", "18"],
          ["Missed", "2"],
          ["Upcoming", "11"],
          ["Mastered", "9"],
          ["Weak Topics", "3"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border bg-background p-3">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-bold">{value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function getMaterial(tech: string, stage: string) {
  const java = tech === "Java";
  const title = `${tech} · ${stage}`;

  return {
    title,
    difficulty: stage === "Advanced" || stage === "Production" ? "Advanced" : stage === "Intermediate" ? "Intermediate" : "Beginner",
    time: stage === "Coding" ? "45 min" : "30 min",
    prerequisites: stage === "Fundamentals" ? "None" : `${tech} fundamentals`,
    goal: stage === "Interview" ? "Answer clearly with tradeoffs" : "Understand and apply the concept",
    meta: "Title, time, difficulty, prerequisites, goals, theory, diagrams, examples, code, practice, interview, revision and notes.",
    overview: [
      {
        label: "Why",
        title: `Why ${tech} matters`,
        body: java
          ? "Java is widely used for enterprise backend systems because it combines strong typing, mature tooling, JVM portability, concurrency support and a large ecosystem."
          : `${tech} is part of modern software interviews because it teaches practical engineering concepts, production tradeoffs and implementation discipline.`,
        highlight: "Study goal: understand the problem each concept solves before memorizing the definition.",
      },
      {
        label: "Flow",
        title: "Question → Learning → Practice → Revision",
        body: "Start from a question, learn the concept, practice it immediately, then revise it later. This avoids passive note-reading.",
      },
    ],
    theory: [
      {
        label: "First Principles",
        title: java ? "From source code to JVM execution" : `${tech} from first principles`,
        body: java
          ? "A Java program starts as .java text. The compiler checks syntax and types, then produces bytecode. The JVM loads bytecode, verifies it, manages memory, runs methods on stack frames and stores objects on the heap."
          : `Begin with what problem ${tech} solves, how code is executed, what runtime or platform is involved, and how data moves through memory, network or storage.`,
        highlight: java
          ? "Stack: method calls and local variables. Heap: objects created with new. Reference variables point to heap objects."
          : "Interview-ready answers explain why the tool exists, not only what it is.",
      },
      {
        label: "Internal Working",
        title: java ? "Memory, references and garbage collection" : "Runtime behavior",
        body: java
          ? "Java passes values into methods. For object variables, the value is a reference. Garbage collection frees heap objects that are no longer reachable, but long-lived references in caches or static fields can prevent cleanup."
          : "Explain execution flow, internal state, failure cases, performance implications and production usage.",
      },
      {
        label: "Production",
        title: "Tradeoffs and real-world usage",
        body: java
          ? "Java favors reliability, explicit models and long-term maintainability. In production, you care about exceptions, logging, memory usage, thread safety, API boundaries and tests."
          : `Production ${tech} work needs error handling, observability, validation, security, performance and maintainable structure.`,
      },
    ],
    examples: [
      {
        label: "Simple",
        title: "Small example",
        body: java ? "Create a Student class with fields, constructor, getters and a method that calculates eligibility." : `Build a minimal ${tech} example that demonstrates the current concept.`,
      },
      {
        label: "Real World",
        title: "Placement platform example",
        body: java ? "Model Student, Assessment, Submission and Result. Use collections to group submissions by student and sort results by score." : `Apply ${tech} inside a placement-prep workflow such as tasks, assessments, results or study materials.`,
      },
      {
        label: "Production",
        title: "Production example",
        body: java ? "Keep domain classes small, validate inputs, use exceptions for invalid state, write unit tests and avoid mutable shared state." : "Add validation, errors, tests and observability so the example behaves like production code.",
      },
    ],
    assignment: [
      {
        label: "Assignment",
        title: `${tech} assignment`,
        body: "Build a small placement-preparation feature using the chapter concept. Include input validation, edge cases, output explanation and README notes.",
        highlight: "Submission should include: code, explanation, test cases, edge cases and one improvement idea.",
      },
    ],
    revision: [
      {
        label: "Cheat Sheet",
        title: "Revision notes",
        body: java ? "JDK compiles, JVM runs bytecode, stack stores frames, heap stores objects, HashMap depends on hashCode/equals, String is immutable, exceptions separate failure flow." : `Summarize ${tech} definitions, internal behavior, common commands, tradeoffs and interview answers.`,
      },
      {
        label: "Mistakes",
        title: "Common mistakes",
        body: java ? "Confusing reference passing with pass-by-reference, using == for String content, ignoring equals/hashCode, catching Exception too broadly, overusing inheritance." : "Memorizing definitions without explaining use cases, internals, tradeoffs or failure modes.",
      },
    ],
    notes: [
      {
        label: "Best Practices",
        title: "How to study this chapter",
        body: "Read the theory, draw the diagram, write code from memory, answer interview questions aloud, solve one practice question, then mark revision due.",
      },
      {
        label: "Resources",
        title: "What to bookmark",
        body: "Bookmark concepts you cannot explain in under two minutes, code snippets you wrote incorrectly, and interview questions where your answer missed tradeoffs.",
      },
    ],
    diagram: java
      ? `Java Execution

.java source
   |
   v
javac compiler
   |
   v
.class bytecode
   |
   v
JVM class loader -> verifier -> interpreter/JIT
   |
   +--> Stack: method frames and local variables
   |
   +--> Heap: objects and arrays
   |
   +--> GC: frees unreachable objects`
      : `${tech} Learning Loop

Question
   |
   v
Concept from first principles
   |
   v
Internal working
   |
   v
Example + code
   |
   v
Practice
   |
   v
Revision + interview answer`,
    code: java
      ? `class Student {
  private final String name;
  private final int score;

  Student(String name, int score) {
    if (name == null || name.isBlank()) {
      throw new IllegalArgumentException("name is required");
    }
    this.name = name;
    this.score = score;
  }

  boolean isEligible() {
    return score >= 70;
  }
}`
      : `// ${tech} practice placeholder for this chapter
// Write the concept, run it, test edge cases, then explain tradeoffs.`,
    interviewQuestions: java
      ? [
          "Why is Java platform independent?",
          "Explain stack vs heap with a method call example.",
          "Why is String immutable?",
          "How does HashMap work internally?",
          "What is overloading vs overriding?",
          "What are common garbage collection mistakes?",
        ]
      : [
          `Why does ${tech} exist?`,
          `What problem does ${tech} solve?`,
          `Explain ${tech} internal working at a high level.`,
          `What are common production mistakes in ${tech}?`,
          `How would you debug a ${tech} issue in production?`,
        ],
    codingQuestions: [
      `Solve one ${tech} fundamentals problem with edge cases.`,
      `Build a small ${tech} feature and explain the data flow.`,
      `Debug a failing ${tech} snippet and identify the root cause.`,
      `Optimize a ${tech} solution and explain time/space tradeoffs.`,
    ],
  };
}
