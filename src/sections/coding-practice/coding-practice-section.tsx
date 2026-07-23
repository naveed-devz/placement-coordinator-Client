import { useState } from "react";
import { Code2, Play, RotateCcw, Send, TerminalSquare } from "lucide-react";
import { DonutProgress } from "@/components/common/donut-progress";
import { SectionIntro } from "@/components/common/section-intro";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { codingPractice } from "@/data/student";

export function CodingPracticeSection({ onAction }: { onAction: (message: string) => void }) {
  const [selectedProblem, setSelectedProblem] = useState(codingPractice[0]);
  const [language, setLanguage] = useState("TypeScript");
  const [testResult, setTestResult] = useState("No test run yet.");
  const [codeDrafts, setCodeDrafts] = useState<Record<string, string>>({
    [codingPractice[0].title]: `function solve(input: string) {
  const values = input.trim().split(" ");
  return values.length;
}`,
  });

  const currentCode =
    codeDrafts[selectedProblem.title] ??
    `function solve(input: string) {
  // Write your ${language} solution here
  return "";
}`;

  function updateCode(value: string) {
    setCodeDrafts((drafts) => ({ ...drafts, [selectedProblem.title]: value }));
  }

  function resetCode() {
    updateCode(`function solve(input: string) {
  // Write your ${language} solution here
  return "";
}`);
    setTestResult("Editor reset.");
  }

  return (
    <>
      <SectionIntro
        eyebrow="Coding Practice"
        title="Company-pattern coding problems with run and submit practice."
        description="Practice DSA topics, track attempts, inspect acceptance rates, and keep coding preparation separate from assessments."
        action={
          <Button onClick={() => onAction("Daily coding sprint started.")}>
            <Play className="h-4 w-4" />
            Start Sprint
          </Button>
        }
      />

      <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)]">
        <Card>
          <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <CardTitle>Problem Queue</CardTitle>
              <CardDescription>Assigned coding practice list.</CardDescription>
            </div>
            <select
              className="h-10 rounded-md border bg-white px-3 text-base outline-none focus:ring-2 focus:ring-ring sm:text-sm"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              <option>TypeScript</option>
              <option>Java</option>
              <option>Python</option>
              <option>C++</option>
            </select>
          </CardHeader>
          <CardContent className="space-y-3">
            {codingPractice.map((problem) => (
              <button
                key={problem.title}
                className={`grid w-full gap-3 rounded-lg border p-3 text-left transition-colors sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center ${
                  selectedProblem.title === problem.title ? "border-primary bg-primary/5" : "bg-white"
                }`}
                onClick={() => setSelectedProblem(problem)}
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="min-w-0 font-semibold">{problem.title}</p>
                    <Badge variant={problem.status === "Solved" ? "secondary" : problem.difficulty === "Hard" ? "danger" : "outline"}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {problem.topic} · {problem.platform} · {problem.attempts} attempts
                  </p>
                </div>
                <DonutProgress value={problem.acceptance} size="sm" className="justify-self-start sm:justify-self-end" />
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <CardTitle>{selectedProblem.title}</CardTitle>
                <CardDescription>
                  {selectedProblem.topic} · {selectedProblem.platform} · {language}
                </CardDescription>
              </div>
              <Badge variant={selectedProblem.status === "Solved" ? "secondary" : "warning"}>{selectedProblem.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-background p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <TerminalSquare className="h-4 w-4 text-primary" />
                Problem Brief
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Write an optimized solution, add edge-case comments, and submit once the sample tests pass.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg border bg-slate-950">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2 text-xs text-slate-300">
                <span>{language} editor</span>
                <button className="inline-flex items-center gap-1 hover:text-white" onClick={resetCode}>
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              </div>
              <textarea
                className="min-h-72 w-full resize-y bg-slate-950 p-4 font-mono text-sm leading-6 text-slate-100 outline-none"
                spellCheck={false}
                value={currentCode}
                onChange={(event) => updateCode(event.target.value)}
              />
            </div>
            <div className="rounded-lg border bg-background p-3 text-sm">
              <p className="font-semibold">Console</p>
              <p className="mt-2 text-muted-foreground">{testResult}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                variant="outline"
                onClick={() => {
                  setTestResult("3/4 sample tests passed. Check empty input edge case.");
                  onAction("Sample tests executed.");
                }}
              >
                <Play className="h-4 w-4" />
                Run Tests
              </Button>
              <Button onClick={() => onAction(`${selectedProblem.title} submitted for review.`)}>
                <Send className="h-4 w-4" />
                Submit Code
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Problems solved", value: "42", icon: Code2 },
          { label: "Weekly streak", value: "5 days", icon: Play },
          { label: "Avg acceptance", value: "78%", icon: Send },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="flex items-center gap-4 p-4 sm:p-5">
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
