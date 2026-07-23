import { Activity, BarChart3, Check, CircleDashed, Clock3, LoaderCircle, Zap } from "lucide-react";
import { AnalyticsAndLeaderboard } from "@/components/common/analytics-leaderboard";
import { SectionIntro } from "@/components/common/section-intro";
import { SkillBars } from "@/components/common/skill-bars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { milestones } from "@/data/student";
import { cn } from "@/lib/utils";

export function PreparationProgressSection() {
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
      <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
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
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    item.status === "Completed"
                      ? "bg-secondary text-secondary-foreground"
                      : item.status === "In progress"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {item.status === "Completed" ? (
                    <Check className="h-4 w-4" />
                  ) : item.status === "In progress" ? (
                    <LoaderCircle className="h-4 w-4" />
                  ) : (
                    <CircleDashed className="h-4 w-4" />
                  )}
                </div>
                <span className="min-w-0 flex-1 text-sm font-medium">{item.label}</span>
                <Badge variant={item.status === "Completed" ? "secondary" : item.status === "In progress" ? "warning" : "outline"}>
                  {item.status}
                </Badge>
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
      <AnalyticsAndLeaderboard />
    </>
  );
}
