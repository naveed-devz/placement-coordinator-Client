import { Activity, Clock3, Zap } from "lucide-react";
import { DonutProgress } from "@/components/common/donut-progress";
import { MetricCards } from "@/components/common/metric-cards";
import { SkillBars } from "@/components/common/skill-bars";
import { TaskList } from "@/components/common/task-list";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { feedback } from "@/data/student";
import type { TaskItem } from "@/types/student";

export function DashboardSection({
  taskItems,
  onTaskAction,
}: {
  taskItems: TaskItem[];
  onTaskAction: (title: string) => void;
}) {
  return (
    <>
      <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)]">
        <div className="min-w-0 rounded-lg border bg-white p-4 shadow-soft sm:p-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="min-w-0">
              <p className="text-sm font-medium text-secondary">Welcome back, Riya</p>
              <h1 className="mt-1 text-2xl font-bold md:text-3xl">Your placement prep is 78% complete.</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Keep momentum today: finish aptitude practice, submit resume work, and review coding feedback.
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4 md:min-w-44">
              <p className="text-sm text-muted-foreground">Current streak</p>
              <p className="mt-1 text-3xl font-bold">12 days</p>
            </div>
          </div>
          <div className="mt-5 rounded-lg border bg-background p-3">
            <DonutProgress value={78} label="Overall readiness" caption="Based on tasks, scores, and practice activity" />
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

      <MetricCards taskItems={taskItems} />

      <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Today{"'"}s Task Bar</CardTitle>
            <CardDescription>Tasks ordered by deadline and priority.</CardDescription>
          </CardHeader>
          <CardContent>
            <TaskList tasksToShow={taskItems.slice(0, 3)} onTaskAction={onTaskAction} />
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

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Weekly practice", value: "11.5 hrs", icon: Clock3 },
          { label: "Activities completed", value: "18", icon: Activity },
          { label: "Readiness trend", value: "+14%", icon: Zap },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="flex items-center gap-4 p-4 sm:p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm text-muted-foreground">{item.label}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
