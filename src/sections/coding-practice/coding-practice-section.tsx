import { useState } from "react";
import { Code2, Play, Send, TerminalSquare } from "lucide-react";
import { SectionIntro } from "@/components/common/section-intro";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { codingPractice } from "@/data/student";

export function CodingPracticeSection({ onAction }: { onAction: (message: string) => void }) {
  const [selectedProblem, setSelectedProblem] = useState(codingPractice[0]);
  const [language, setLanguage] = useState("TypeScript");

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
                className={`w-full rounded-lg border p-3 text-left transition-colors hover:bg-muted ${
                  selectedProblem.title === problem.title ? "border-primary bg-primary/5" : "bg-white"
                }`}
                onClick={() => setSelectedProblem(problem)}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{problem.title}</p>
                  <Badge variant={problem.status === "Solved" ? "secondary" : problem.difficulty === "Hard" ? "danger" : "outline"}>
                    {problem.difficulty}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {problem.topic} · {problem.platform} · {problem.attempts} attempts
                </p>
                <Progress className="mt-3" value={problem.acceptance} />
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
            <div className="min-h-56 rounded-lg border bg-slate-950 p-4 font-mono text-sm leading-6 text-slate-100">
              <p className="text-slate-400">// {language} solution draft</p>
              <p>function solve(input: string) {" {"}</p>
              <p className="pl-4 text-slate-300">const values = input.trim().split(" ");</p>
              <p className="pl-4 text-slate-300">return values.length;</p>
              <p>{"}"}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button variant="outline" onClick={() => onAction("Sample tests executed.")}>
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
