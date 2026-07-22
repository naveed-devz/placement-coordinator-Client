import { Download, FileText, MessageSquareText, Star, Trophy } from "lucide-react";
import { SectionIntro } from "@/components/common/section-intro";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { results } from "@/data/student";

export function ResultsSection() {
  return (
    <>
      <SectionIntro
        eyebrow="Results"
        title="Scores, ranks, feedback, and performance history."
        description="Review assessment outcomes, coordinator feedback, strengths, weak areas, and downloadable result summaries."
        action={
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        }
      />
      <section className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Latest score", value: "88%", icon: Trophy },
          { label: "Best score", value: "91%", icon: Star },
          { label: "Reports", value: "12", icon: FileText },
          { label: "Feedback notes", value: "8", icon: MessageSquareText },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-primary">
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

      <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card>
          <CardHeader>
            <CardTitle>Assessment Report Cards</CardTitle>
            <CardDescription>Score, rank, feedback, and review status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {results.map((item) => (
              <div key={item.title} className="rounded-lg border p-3 sm:p-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      <Badge variant={item.score >= 85 ? "secondary" : "outline"}>{item.score >= 85 ? "Strong" : "Review"}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.feedback}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-2xl font-bold">{item.score}%</p>
                    <p className="text-sm text-muted-foreground">Rank {item.rank}</p>
                  </div>
                </div>
                <Progress className="mt-4" value={item.score} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Answer Review</CardTitle>
            <CardDescription>Section-wise result breakdown.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Aptitude", correct: 24, total: 30, value: 80 },
              { label: "Coding MCQ", correct: 18, total: 20, value: 90 },
              { label: "Communication", correct: 14, total: 20, value: 70 },
              { label: "Technical Core", correct: 26, total: 30, value: 86 },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border p-3">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted-foreground">
                    {item.correct}/{item.total}
                  </span>
                </div>
                <Progress className="mt-3" value={item.value} />
              </div>
            ))}
            <Button className="w-full" variant="outline">
              View Answer Sheet
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
