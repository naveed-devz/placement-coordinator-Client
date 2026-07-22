import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { leaderboardRows, organizationAnalytics, sectionPerformance } from "@/data/student";
import { cn } from "@/lib/utils";

export function AnalyticsAndLeaderboard() {
  const [scope, setScope] = useState<"organization" | "section">("section");
  const metrics = organizationAnalytics[scope];
  const rankedRows = scope === "section" ? leaderboardRows.filter((row) => row.section === "CSE C") : leaderboardRows;

  return (
    <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
      <Card>
        <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="min-w-0">
            <CardTitle>Analytics</CardTitle>
            <CardDescription>{scope === "section" ? "Section C performance snapshot." : "Organization-wide placement readiness."}</CardDescription>
          </div>
          <div className="grid grid-cols-2 rounded-md border bg-muted p-1 text-sm">
            {(["section", "organization"] as const).map((item) => (
              <button
                key={item}
                className={cn(
                  "rounded px-3 py-2 font-medium capitalize transition-colors",
                  scope === item ? "bg-white text-primary shadow-sm" : "text-muted-foreground",
                )}
                onClick={() => setScope(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-lg border bg-background p-3">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="mt-1 text-2xl font-bold">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.detail}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {sectionPerformance.map((item) => (
              <div key={item.section} className="grid gap-2 rounded-lg border p-3 sm:grid-cols-[70px_minmax(0,1fr)] sm:items-center">
                <p className="text-sm font-semibold">{item.section}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-20 text-xs text-muted-foreground">Readiness</span>
                    <Progress value={item.readiness} />
                    <span className="w-9 text-xs font-medium">{item.readiness}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-20 text-xs text-muted-foreground">Completion</span>
                    <Progress value={item.completion} />
                    <span className="w-9 text-xs font-medium">{item.completion}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
          <CardDescription>{scope === "section" ? "CSE Section C ranking." : "Organization ranking."}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {rankedRows.map((row) => (
            <div
              key={`${scope}-${row.name}`}
              className={cn(
                "grid grid-cols-[36px_minmax(0,1fr)_52px] items-center gap-3 rounded-lg border p-3",
                row.name === "Riya Sharma" && "border-primary/40 bg-primary/5",
              )}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-sm font-bold">
                #{scope === "section" ? row.sectionRank : row.orgRank}
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold">{row.name}</p>
                <p className="text-xs text-muted-foreground">{row.section}</p>
              </div>
              <p className="text-right text-lg font-bold">{row.score}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
