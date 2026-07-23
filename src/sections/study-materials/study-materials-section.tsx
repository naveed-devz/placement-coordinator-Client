import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  FileQuestion,
  Play,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  materialCategories,
  technologies,
  technologyMaterials,
  type MaterialCategory,
} from "./study-materials-data";
import { buildTopicLesson, type TopicLesson } from "./study-lesson-content";

type ChapterTab = "Learn" | "Examples" | "Visualize" | "Code" | "Practice" | "Interview" | "Revision" | "Notes";

const flow = ["Roadmap", "Fundamentals", "Core", "Intermediate", "Advanced", "Production", "Interview", "Coding", "Projects", "Revision", "Mock"];
const tabs: ChapterTab[] = ["Learn", "Examples", "Visualize", "Code", "Practice", "Interview", "Revision", "Notes"];

export function StudyMaterialsSection({ onAction }: { onAction: (message: string) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MaterialCategory | "All">("All");
  const [selectedTech, setSelectedTech] = useState("Java");
  const [activeStage, setActiveStage] = useState("Fundamentals");
  const [activeTab, setActiveTab] = useState<ChapterTab>("Learn");
  const [chapterOpen, setChapterOpen] = useState(false);

  const filteredTech = useMemo(
    () => technologies.filter((tech) => {
      const item = technologyMaterials[tech];
      return (category === "All" || item.category === category) && tech.toLowerCase().includes(query.toLowerCase());
    }),
    [category, query],
  );
  const selected = technologyMaterials[selectedTech];
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

  function openStage(stage: string, tab: ChapterTab = "Learn") {
    setActiveStage(stage);
    setActiveTab(tab);
    setChapterOpen(true);
  }

  return (
    <section className="min-w-0 space-y-4">
      <header className="flex flex-col gap-4 border-b bg-white px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase text-secondary">Study library</p>
          <h1 className="mt-1 text-2xl font-bold">Learn deeply. Practise deliberately.</h1>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            Complete, interview-oriented curricula from first principles to production for {technologies.length} subjects.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onAction(`${selectedTech} bookmarked.`)} title="Bookmark course">
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Bookmark</span>
          </Button>
          <Button onClick={() => openStage(activeStage)}>
            <Play className="h-4 w-4" /> Continue
          </Button>
        </div>
      </header>

      <section className="border-y bg-white">
        <div className="flex flex-col gap-3 px-4 py-3 sm:px-5">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <div className="relative w-full lg:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search subjects" value={query} onChange={(event) => setQuery(event.target.value)} />
            </div>
            <div className="flex gap-1 overflow-x-auto pb-1">
              {(["All", ...materialCategories] as const).map((item) => (
                <button
                  key={item}
                  className={cn(
                    "h-9 shrink-0 rounded-md px-3 text-sm font-medium transition-colors",
                    category === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
                  )}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border bg-border sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
            {filteredTech.map((tech) => (
              <button
                key={tech}
                className={cn(
                  "min-w-0 bg-white px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-muted",
                  selectedTech === tech && "bg-primary/10 text-primary ring-1 ring-inset ring-primary",
                )}
                onClick={() => {
                  setSelectedTech(tech);
                  setActiveStage("Fundamentals");
                }}
              >
                <span className="block truncate">{tech}</span>
                <span className="mt-0.5 block truncate text-xs font-normal text-muted-foreground">{technologyMaterials[tech].category}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-5 sm:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{selected.category}</Badge>
              <span className="text-xs text-muted-foreground">11 learning stages · {countTopics(selected)} topics</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold">{selectedTech}</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{selected.purpose}</p>
          </div>
          <div className="grid grid-cols-3 divide-x rounded-md border text-center lg:min-w-[360px]">
            <Stat label="Progress" value="42%" />
            <Stat label="Completed" value="18" />
            <Stat label="Revision" value="4 due" />
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-md border">
          <div className="hidden grid-cols-[140px_minmax(0,1fr)_110px] bg-muted px-4 py-2 text-xs font-semibold uppercase text-muted-foreground md:grid">
            <span>Stage</span><span>What you will learn</span><span className="text-right">Action</span>
          </div>
          {flow.map((stage, index) => {
            const topics = topicsForStage(selectedTech, stage);
            return (
              <button
                key={stage}
                className={cn(
                  "grid w-full gap-2 border-t px-4 py-3 text-left transition-colors first:border-t-0 hover:bg-muted/60 md:grid-cols-[140px_minmax(0,1fr)_110px] md:items-center",
                  activeStage === stage && "bg-primary/5",
                )}
                onClick={() => openStage(stage, stage === "Interview" ? "Interview" : stage === "Coding" ? "Practice" : "Learn")}
              >
                <span className="flex items-center gap-2 font-semibold">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-muted text-xs text-primary">{index + 1}</span>
                  {stage}
                </span>
                <span className="line-clamp-2 text-sm text-muted-foreground">{topics.join(" · ")}</span>
                <span className="flex items-center justify-end gap-1 text-sm font-medium text-primary">
                  Open <ChevronRight className="h-4 w-4" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid border-y bg-white lg:grid-cols-2 lg:divide-x">
        <CompactPanel
          icon={Code2}
          title="Practice workspace"
          description={`${selectedTech} exercises from concept checks to production debugging.`}
          items={selected.coding.slice(0, 3)}
          action="Open practice"
          onClick={() => openStage("Coding", "Practice")}
        />
        <CompactPanel
          icon={Brain}
          title="Revision queue"
          description="Spaced review based on weak answers and failed attempts."
          items={selected.revision.slice(0, 3)}
          action="Start revision"
          onClick={() => openStage("Revision", "Revision")}
        />
      </section>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="px-3 py-2"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-0.5 font-bold">{value}</p></div>;
}

function CompactPanel({ icon: Icon, title, description, items, action, onClick }: {
  icon: typeof Code2;
  title: string;
  description: string;
  items: string[];
  action: string;
  onClick: () => void;
}) {
  return (
    <div className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{description}</p></div>
        </div>
        <Button size="sm" variant="outline" onClick={onClick}>{action}</Button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => <Badge key={item} variant="outline">{item}</Badge>)}
      </div>
    </div>
  );
}

function ChapterPage({ activeTab, material, selectedTech, onAction, onBack, onChangeTab }: {
  activeTab: ChapterTab;
  material: ReturnType<typeof getMaterial>;
  selectedTech: string;
  onAction: (message: string) => void;
  onBack: () => void;
  onChangeTab: (tab: ChapterTab) => void;
}) {
  const [topicIndex, setTopicIndex] = useState(0);
  const topic = material.topics[topicIndex] ?? material.topics[0];
  const lesson = buildTopicLesson(selectedTech, topic, material.stage);

  function selectTopic(index: number) {
    setTopicIndex(index);
    onChangeTab("Learn");
  }

  return (
    <article className="min-w-0 bg-white">
      <header className="border-b px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline" onClick={onBack}><ArrowLeft className="h-4 w-4" /> Library</Button>
          <Badge variant="secondary">{selectedTech}</Badge>
          <Badge variant="outline">{material.difficulty}</Badge>
        </div>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">{material.title}</h1>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">{material.summary}</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <span><strong>{material.time}</strong> estimated</span>
          <span><strong>{material.topics.length}</strong> topics</span>
          <span>Prerequisite: <strong>{material.prerequisites}</strong></span>
        </div>
      </header>

      <nav className="sticky top-[61px] z-10 flex gap-1 overflow-x-auto border-b bg-white/95 px-4 py-2 backdrop-blur sm:px-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={cn("h-9 shrink-0 rounded-md px-3 text-sm font-medium", activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted")}
            onClick={() => onChangeTab(tab)}
          >{tab}</button>
        ))}
      </nav>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_240px]">
        <main className="min-w-0 px-4 py-6 sm:px-6 lg:border-r">
          <div className="mb-5 flex items-start justify-between gap-3 border-b pb-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase text-secondary">Topic {topicIndex + 1} of {material.topics.length}</p>
              <h2 className="mt-1 text-xl font-bold sm:text-2xl">{topic}</h2>
            </div>
            <Badge className="shrink-0" variant="outline">{material.stage}</Badge>
          </div>
          <ChapterPanel tab={activeTab} material={material} lesson={lesson} topic={topic} selectedTech={selectedTech} onAction={onAction} />
          <TopicNavigation topics={material.topics} topicIndex={topicIndex} onSelect={selectTopic} />
        </main>
        <aside className="border-t px-4 py-5 lg:border-t-0">
          <p className="text-xs font-semibold uppercase text-muted-foreground">Chapter outline</p>
          <ol className="mt-3 space-y-1">
            {material.topics.map((topic, index) => (
              <li key={topic}>
                <button
                  className={cn(
                    "flex w-full gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-muted",
                    topicIndex === index && "bg-primary/10 font-semibold text-primary",
                  )}
                  onClick={() => selectTopic(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span><span>{topic}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="mt-5 grid gap-2">
            <Button onClick={() => onAction(`${material.title} marked complete.`)}><CheckCircle2 className="h-4 w-4" /> Mark complete</Button>
            <Button variant="outline" onClick={() => onAction(`${material.title} bookmarked.`)}><Bookmark className="h-4 w-4" /> Bookmark</Button>
          </div>
        </aside>
      </div>
    </article>
  );
}

function ChapterPanel({ tab, material, lesson, topic, selectedTech, onAction }: {
  tab: ChapterTab;
  material: ReturnType<typeof getMaterial>;
  lesson: TopicLesson;
  topic: string;
  selectedTech: string;
  onAction: (message: string) => void;
}) {
  if (tab === "Visualize") return (
    <div className="space-y-4">
      <SectionHeading icon={Brain} title={`How ${topic} works`} description="Trace the behavior from requirement to observable outcome." />
      <pre className="overflow-x-auto rounded-md bg-slate-950 p-5 text-sm leading-7 text-slate-100">{lesson.diagram}</pre>
    </div>
  );
  if (tab === "Code") return (
    <div className="space-y-4"><SectionHeading icon={Code2} title={`${selectedTech} working example`} description={`Use this as a starting point, then apply ${topic} and test its boundaries.`} /><pre className="overflow-x-auto rounded-md bg-slate-950 p-5 text-sm leading-7 text-slate-100">{material.code}</pre><p className="border-l-2 border-secondary pl-3 text-sm leading-6">Exercise: change one requirement, add invalid input, and explain how the implementation should fail.</p><Button onClick={() => onAction(`${selectedTech} coding page opened.`)}><Code2 className="h-4 w-4" /> Open editor</Button></div>
  );
  if (tab === "Practice") return <QuestionList title={`${topic} practice set`} questions={[...lesson.checkpoints, ...material.codingQuestions]} action="Solve" onAction={onAction} />;
  if (tab === "Interview") return (
    <div>
      <SectionHeading icon={FileQuestion} title="Interview-ready explanation" description="Start with the direct answer, then defend decisions through follow-up questions." />
      <section className="mt-5 border-y py-5">
        <p className="text-xs font-semibold uppercase text-secondary">Two-minute answer</p>
        <p className="mt-2 text-sm leading-7">{lesson.interviewAnswer}</p>
      </section>
      <QuestionList title="Likely follow-ups" questions={[...lesson.followUps, ...material.interviewQuestions.slice(0, 3)]} action="Practise" onAction={onAction} />
    </div>
  );
  if (tab === "Examples") return (
    <div>
      <SectionHeading icon={BookOpen} title="Practical application" description={`See ${topic} in a product workflow before implementing it.`} />
      <LessonSection eyebrow="Placement platform example" title="From concept to working behavior">{lesson.practicalExample}</LessonSection>
      <BulletSection title="Implementation checklist" items={["Write the requirement and boundary inputs", "Implement the smallest correct path", "Add one invalid-input and one failure test", "Measure or inspect the important result", "Explain one design tradeoff"]} />
    </div>
  );
  if (tab === "Revision") return (
    <div>
      <SectionHeading icon={Brain} title="Revision sheet" description="Recall first. Open the lesson only after attempting each prompt." />
      <BulletSection title="Active-recall checklist" items={lesson.checkpoints} ordered />
      <LessonSection eyebrow="Model answer" title={`Explain ${topic} in an interview`}>{lesson.interviewAnswer}</LessonSection>
      <BulletSection title="Mistakes to remember" items={lesson.mistakes} />
    </div>
  );
  if (tab === "Notes") return (
    <div>
      <SectionHeading icon={Bookmark} title="Decision notes" description="The shortest useful reference for future revision." />
      <LessonSection eyebrow="Definition" title={topic}>{lesson.definition}</LessonSection>
      <BulletSection title="Tradeoffs" items={lesson.tradeoffs} />
      <BulletSection title="Do not use when" items={lesson.whenNotToUse} />
    </div>
  );

  return (
    <div>
      <SectionHeading icon={BookOpen} title="Learn from first principles" description={material.goal} />
      <LessonSection eyebrow="Definition" title={`What is ${topic}?`}>{lesson.definition}</LessonSection>
      <LessonSection eyebrow="Purpose" title="What problem does it solve?">{lesson.problem}</LessonSection>
      <div className="grid border-y md:grid-cols-2 md:divide-x">
        <BulletSection title="When to use" items={lesson.whenToUse} positive />
        <BulletSection title="When not to use" items={lesson.whenNotToUse} />
      </div>
      <BulletSection title="How it works internally" items={lesson.internalWorking} ordered />
      <BulletSection title="Tradeoffs" items={lesson.tradeoffs} />
      <LessonSection eyebrow="Real-world application" title="Placement platform example">{lesson.practicalExample}</LessonSection>
      <BulletSection title="Common mistakes" items={lesson.mistakes} />
      <section className="border-y py-5">
        <p className="text-xs font-semibold uppercase text-secondary">Interview checkpoint</p>
        <h3 className="mt-1 text-lg font-semibold">Your two-minute answer</h3>
        <p className="mt-2 text-sm leading-7">{lesson.interviewAnswer}</p>
      </section>
    </div>
  );
}

function LessonSection({ eyebrow, title, children }: { eyebrow: string; title: string; children: string }) {
  return <section className="border-t py-5 first:mt-5"><p className="text-xs font-semibold uppercase text-secondary">{eyebrow}</p><h3 className="mt-1 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{children}</p></section>;
}

function BulletSection({ title, items, ordered = false, positive = false }: { title: string; items: string[]; ordered?: boolean; positive?: boolean }) {
  const List = ordered ? "ol" : "ul";
  return (
    <section className="py-5 md:px-0 md:first:pr-5 md:last:pl-5">
      <h3 className="text-base font-semibold">{title}</h3>
      <List className="mt-3 space-y-2">
        {items.map((item, index) => <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground"><span className={cn("mt-0.5 flex h-5 min-w-5 items-center justify-center rounded text-xs font-semibold", positive ? "bg-secondary/15 text-secondary" : "bg-muted text-primary")}>{ordered ? index + 1 : positive ? <CheckCircle2 className="h-3.5 w-3.5" /> : "•"}</span><span>{item}</span></li>)}
      </List>
    </section>
  );
}

function TopicNavigation({ topics, topicIndex, onSelect }: { topics: string[]; topicIndex: number; onSelect: (index: number) => void }) {
  return (
    <div className="mt-7 flex items-center justify-between gap-3 border-t pt-4">
      <Button variant="outline" disabled={topicIndex === 0} onClick={() => onSelect(topicIndex - 1)}><ChevronLeft className="h-4 w-4" /><span className="hidden sm:inline">Previous topic</span></Button>
      <p className="text-center text-xs text-muted-foreground">{topicIndex + 1} / {topics.length}</p>
      <Button disabled={topicIndex === topics.length - 1} onClick={() => onSelect(topicIndex + 1)}><span className="hidden sm:inline">Next topic</span><ChevronRight className="h-4 w-4" /></Button>
    </div>
  );
}

function SectionHeading({ icon: Icon, title, description }: { icon: typeof BookOpen; title: string; description: string }) {
  return <div className="flex gap-3"><Icon className="mt-0.5 h-5 w-5 text-primary" /><div><h2 className="text-xl font-bold">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{description}</p></div></div>;
}

function QuestionList({ title, questions, action, onAction }: { title: string; questions: string[]; action: string; onAction: (message: string) => void }) {
  return (
    <div><SectionHeading icon={FileQuestion} title={title} description="Work through each item aloud before opening notes." /><div className="mt-5 divide-y border-y">{questions.map((question, index) => <div key={question} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex min-w-0 gap-3"><span className="text-sm font-semibold text-primary">Q{index + 1}</span><p className="text-sm font-medium">{question}</p></div><Button className="shrink-0" size="sm" variant="outline" onClick={() => onAction(`${action}: ${question}`)}>{action}<ChevronRight className="h-4 w-4" /></Button></div>)}</div></div>
  );
}

function topicsForStage(tech: string, stage: string) {
  const item = technologyMaterials[tech];
  if (stage === "Roadmap") return [...item.fundamentals.slice(0, 1), ...item.core.slice(0, 1), ...item.advanced.slice(0, 1), ...item.production.slice(0, 1)];
  if (stage === "Fundamentals") return item.fundamentals;
  if (stage === "Core") return item.core;
  if (stage === "Intermediate") return item.intermediate;
  if (stage === "Advanced") return item.advanced;
  if (stage === "Production") return item.production;
  if (stage === "Interview") return item.interview;
  if (stage === "Coding") return item.coding;
  if (stage === "Projects") return item.projects;
  if (stage === "Revision") return item.revision;
  return ["Timed concept round", "Technical explanation round", "Coding or case-study round", "Feedback and targeted retry"];
}

function countTopics(item: (typeof technologyMaterials)[string]) {
  return item.fundamentals.length + item.core.length + item.intermediate.length + item.advanced.length + item.production.length;
}

function getMaterial(tech: string, stage: string) {
  const item = technologyMaterials[tech];
  const topics = topicsForStage(tech, stage);
  const advanced = stage === "Advanced" || stage === "Production";
  const learning = topics.map((topic, index) => ({
    label: index === 0 ? "First principles" : index === topics.length - 1 ? "Applied understanding" : "Core concept",
    title: topic,
    body: `${topic} is part of the ${stage.toLowerCase()} layer of ${tech}. Learn the problem it solves, its operating model, the data or state it owns, its main tradeoffs, and the failure cases that affect real applications. Connect the idea to ${item.purpose.toLowerCase()}`,
    highlight: index === 0 ? `Checkpoint: explain ${topic.toLowerCase()} in two minutes, then give one correct use case and one misuse.` : undefined,
  }));
  return {
    title: `${tech}: ${stage}`,
    stage,
    summary: item.purpose,
    difficulty: advanced ? "Advanced" : stage === "Intermediate" ? "Intermediate" : "Foundation",
    time: `${Math.max(1, topics.length * 2)} hours`,
    prerequisites: stage === "Fundamentals" || stage === "Roadmap" ? "None" : `${tech} fundamentals`,
    goal: stage === "Interview" ? "Explain concepts with examples, internals and tradeoffs." : `Master the ${stage.toLowerCase()} layer and apply it without relying on memorized definitions.`,
    topics,
    learning,
    examples: [
      { label: "Small example", title: `Isolate one ${tech} concept`, body: `Implement the smallest useful example for ${topics[0]}. Write down the input, state changes, output and one boundary condition.` },
      { label: "Product example", title: "Apply it to placement preparation", body: `Use ${tech} to model a study-material, assessment, result or roadmap workflow. Keep the data flow visible and validate invalid input.` },
      { label: "Production example", title: "Make the solution operational", body: `Add the relevant production concerns: ${item.production.join(", ")}. Explain which concern matters first and why.` },
    ],
    revision: item.revision.map((topic) => ({ label: "Recall", title: topic, body: `Explain ${topic.toLowerCase()} from memory, write one example, list one common mistake, and schedule another review if the answer is incomplete.` })),
    notes: [
      { label: "Study method", title: "Question → model → implementation", body: `For each topic, begin with a question, draw the internal flow, implement a small example, test an edge case, then answer the question again without notes.` },
      { label: "Completion standard", title: "Evidence before completion", body: `Mark this stage complete only when you can explain every outline item, solve one related task, and describe a production tradeoff.` },
    ],
    diagram: `${tech}: ${stage}\n\nProblem and constraints\n        |\n        v\n${topics.join("\n        |\n        v\n")}\n        |\n        v\nPractice -> Feedback -> Revision`,
    code: item.code,
    codingQuestions: item.coding,
    interviewQuestions: item.interview,
  };
}
