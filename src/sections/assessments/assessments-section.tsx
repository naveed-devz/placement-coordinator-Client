import { useState } from "react";
import type { FormEvent } from "react";
import { Check, ClipboardCheck, Video } from "lucide-react";
import { DonutProgress } from "@/components/common/donut-progress";
import { SectionIntro } from "@/components/common/section-intro";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { AssessmentItem } from "@/types/student";

export function AssessmentsSection({
  assessmentItems,
  onCreateAssessment,
  onJoinAssessment,
}: {
  assessmentItems: AssessmentItem[];
  onCreateAssessment: (assessment: AssessmentItem) => void;
  onJoinAssessment: (title: string) => void;
}) {
  const [showCreator, setShowCreator] = useState(false);
  const [title, setTitle] = useState("");
  const [assessmentType, setAssessmentType] = useState("Self");
  const [duration, setDuration] = useState("30 min");

  function submitAssessment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    onCreateAssessment({
      title: trimmedTitle,
      date: "Created now",
      type: assessmentType,
      duration,
      status: "Open",
    });
    setTitle("");
    setAssessmentType("Self");
    setDuration("30 min");
    setShowCreator(false);
  }

  return (
    <>
      <SectionIntro
        eyebrow="Assessments"
        title="Coordinator-created tests, interviews, and company pattern mocks."
        description="See registrations, schedule, duration, assessment type, status, and joining actions."
        action={
          <Button onClick={() => setShowCreator((value) => !value)}>
            <ClipboardCheck className="h-4 w-4" />
            Create Practice
          </Button>
        }
      />
      {showCreator ? (
        <Card>
          <CardHeader>
            <CardTitle>Create Assessment</CardTitle>
            <CardDescription>student-side practice assessment creation.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_160px_auto]" onSubmit={submitAssessment}>
              <Input placeholder="Assessment title" value={title} onChange={(event) => setTitle(event.target.value)} />
              <select
                className="h-10 rounded-md border bg-white px-3 text-base outline-none focus:ring-2 focus:ring-ring sm:text-sm"
                value={assessmentType}
                onChange={(event) => setAssessmentType(event.target.value)}
              >
                <option>Self</option>
                <option>Coordinator</option>
                <option>Company Mock</option>
              </select>
              <select
                className="h-10 rounded-md border bg-white px-3 text-base outline-none focus:ring-2 focus:ring-ring sm:text-sm"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
              >
                <option>20 min</option>
                <option>30 min</option>
                <option>45 min</option>
                <option>60 min</option>
              </select>
              <Button type="submit">
                <Check className="h-4 w-4" />
                Create
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : null}
      <section className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_330px]">
        <Card>
          <CardHeader>
            <CardTitle>Assessment Schedule</CardTitle>
            <CardDescription>Upcoming and open assessments.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {assessmentItems.map((item) => (
              <div key={item.title} className="grid min-w-0 gap-3 rounded-lg border p-3 sm:p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                <div className="min-w-0">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.date} · {item.type} · {item.duration}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{item.status}</Badge>
                  <Button className="flex-1 sm:flex-none" variant="outline" size="sm" onClick={() => onJoinAssessment(item.title)}>
                    <Video className="h-4 w-4" />
                    {item.status === "Joined" ? "Joined" : "Join"}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Latest Score</CardTitle>
            <CardDescription>Java fundamentals mock</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <DonutProgress value={88} label="Latest score" caption="Rank 12 of 148 students" size="lg" className="justify-center" />
            <Button className="w-full" variant="outline">
              Review Answers
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
