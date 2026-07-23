import { useState } from "react";
import {
  Bookmark,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Code2,
  FileQuestion,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GuideTopic } from "../study-guide-schema";

export type GuideView = "Learn" | "Examples" | "Visualize" | "Code" | "Practice" | "Interview" | "Revision" | "Notes";

export function StudyGuideReader({ guideTitle, topic, view, onAction }: {
  guideTitle: string;
  topic: GuideTopic;
  view: GuideView;
  onAction: (message: string) => void;
}) {
  if (view === "Visualize") return (
    <div className="space-y-4">
      <SectionHeading icon={Brain} title={`How ${topic.title} works`} description="Trace the concept from requirement to observable result." />
      <pre className="overflow-x-auto rounded-md bg-slate-950 p-5 text-sm leading-7 text-slate-100">{topic.diagram}</pre>
    </div>
  );

  if (view === "Code") return (
    <div className="space-y-4">
      <SectionHeading icon={Code2} title={`${guideTitle} working example`} description={`Type the example, apply ${topic.title}, and test its failure boundary.`} />
      <pre className="overflow-x-auto rounded-md bg-slate-950 p-5 text-sm leading-7 text-slate-100">{topic.code}</pre>
      <p className="border-l-2 border-secondary pl-3 text-sm leading-6">Change one requirement, add invalid input, write one test, and explain the implementation tradeoff.</p>
      <Button onClick={() => onAction(`${guideTitle} coding page opened.`)}><Code2 className="h-4 w-4" />Open editor</Button>
    </div>
  );

  if (view === "Practice") return <ActionList icon={Code2} title="Practice set" description="Complete these without copying the lesson." items={topic.practice} action="Solve" onAction={onAction} />;

  if (view === "Interview") return <InterviewAnswers topic={topic} onAction={onAction} />;

  if (view === "Examples") return (
    <div>
      <SectionHeading icon={BookOpen} title="Practical application" description={`Connect ${topic.title} to product behavior before implementing it.`} />
      <TextSection eyebrow="Placement platform example" title="From concept to working behavior">{topic.practicalExample}</TextSection>
      <BulletSection title="Implementation checklist" items={["Write the requirement and boundary inputs", "Implement the smallest correct path", "Add invalid-input and failure tests", "Inspect or measure the result", "Document one design tradeoff"]} />
    </div>
  );

  if (view === "Revision") return (
    <div>
      <SectionHeading icon={Brain} title="Revision sheet" description="Attempt each prompt before reopening the full lesson." />
      <BulletSection title="Active recall" items={topic.revision} ordered />
      <BulletSection title="Mistakes to remember" items={topic.commonMistakes} />
    </div>
  );

  if (view === "Notes") return (
    <div>
      <SectionHeading icon={Bookmark} title="Decision notes" description="A compact reference for future revision." />
      <TextSection eyebrow="Definition" title={topic.title}>{topic.definition}</TextSection>
      <BulletSection title="Tradeoffs" items={topic.tradeoffs} />
      <BulletSection title="Do not use when" items={topic.whenNotToUse} />
    </div>
  );

  return (
    <div>
      <SectionHeading icon={BookOpen} title="Learn from first principles" description="Understand the definition, decision criteria and internal behavior before memorising an answer." />
      <TextSection eyebrow="Definition" title={`What is ${topic.title}?`}>{topic.definition}</TextSection>
      <TextSection eyebrow="Purpose" title="What problem does it solve?">{topic.whyItMatters}</TextSection>
      <div className="grid border-y md:grid-cols-2 md:divide-x">
        <BulletSection title="When to use" items={topic.whenToUse} positive />
        <BulletSection title="When not to use" items={topic.whenNotToUse} />
      </div>
      <BulletSection title="How it works internally" items={topic.internalWorking} ordered />
      <BulletSection title="Tradeoffs" items={topic.tradeoffs} />
      <TextSection eyebrow="Real-world application" title="Placement platform example">{topic.practicalExample}</TextSection>
      <BulletSection title="Common mistakes" items={topic.commonMistakes} />
      <section className="border-y py-5">
        <p className="text-xs font-semibold uppercase text-secondary">Interview checkpoint</p>
        <h3 className="mt-1 text-lg font-semibold">Build your two-minute answer</h3>
        <p className="mt-2 text-sm leading-7">{topic.interviewQuestions.at(-1)?.answer}</p>
      </section>
    </div>
  );
}

function InterviewAnswers({ topic, onAction }: { topic: GuideTopic; onAction: (message: string) => void }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div>
      <SectionHeading icon={FileQuestion} title="Interview questions and answers" description="Answer aloud first, then expand the model answer and follow-ups." />
      <div className="mt-5 divide-y border-y">
        {topic.interviewQuestions.map((item, index) => {
          const open = openIndex === index;
          return (
            <section key={item.question} className="py-1">
              <button className="flex w-full items-start justify-between gap-3 py-4 text-left" onClick={() => setOpenIndex(open ? -1 : index)}>
                <span className="flex min-w-0 gap-3"><span className="text-sm font-semibold text-primary">Q{index + 1}</span><span className="text-sm font-semibold leading-6">{item.question}</span></span>
                <ChevronDown className={cn("mt-1 h-4 w-4 shrink-0 transition-transform", open && "rotate-180")} />
              </button>
              {open ? (
                <div className="pb-5 pl-8">
                  <p className="text-xs font-semibold uppercase text-secondary">Model answer</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.answer}</p>
                  {item.followUps.length ? <div className="mt-4"><p className="text-xs font-semibold uppercase text-muted-foreground">Likely follow-ups</p><ul className="mt-2 space-y-2">{item.followUps.map((followUp) => <li key={followUp} className="flex gap-2 text-sm"><ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{followUp}</li>)}</ul></div> : null}
                  <Button className="mt-4" size="sm" variant="outline" onClick={() => onAction(`Answer practised: ${item.question}`)}>Mark practised</Button>
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
    </div>
  );
}

function SectionHeading({ icon: Icon, title, description }: { icon: typeof BookOpen; title: string; description: string }) {
  return <div className="flex gap-3"><Icon className="mt-0.5 h-5 w-5 text-primary" /><div><h2 className="text-xl font-bold">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{description}</p></div></div>;
}

function TextSection({ eyebrow, title, children }: { eyebrow: string; title: string; children: string }) {
  return <section className="border-t py-5 first:mt-5"><p className="text-xs font-semibold uppercase text-secondary">{eyebrow}</p><h3 className="mt-1 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{children}</p></section>;
}

function BulletSection({ title, items, ordered = false, positive = false }: { title: string; items: string[]; ordered?: boolean; positive?: boolean }) {
  const List = ordered ? "ol" : "ul";
  return (
    <section className="py-5 md:px-0 md:first:pr-5 md:last:pl-5">
      <h3 className="text-base font-semibold">{title}</h3>
      <List className="mt-3 space-y-2">
        {items.map((item, index) => <li key={`${item}-${index}`} className="flex gap-3 text-sm leading-6 text-muted-foreground"><span className={cn("mt-0.5 flex h-5 min-w-5 items-center justify-center rounded text-xs font-semibold", positive ? "bg-secondary/15 text-secondary" : "bg-muted text-primary")}>{ordered ? index + 1 : positive ? <CheckCircle2 className="h-3.5 w-3.5" /> : "•"}</span><span>{item}</span></li>)}
      </List>
    </section>
  );
}

function ActionList({ icon: Icon, title, description, items, action, onAction }: { icon: typeof Code2; title: string; description: string; items: string[]; action: string; onAction: (message: string) => void }) {
  return <div><SectionHeading icon={Icon} title={title} description={description} /><div className="mt-5 divide-y border-y">{items.map((item, index) => <div key={`${item}-${index}`} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-3"><span className="text-sm font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span><p className="text-sm font-medium">{item}</p></div><Button size="sm" variant="outline" onClick={() => onAction(`${action}: ${item}`)}>{action}<ChevronRight className="h-4 w-4" /></Button></div>)}</div></div>;
}
