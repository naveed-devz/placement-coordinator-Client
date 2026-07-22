import { useState } from "react";
import { FileUp, UploadCloud } from "lucide-react";
import { SectionIntro } from "@/components/common/section-intro";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { HomeworkItem } from "@/types/student";

export function HomeworkSection({
  homeworkItems,
  onSubmitHomework,
}: {
  homeworkItems: HomeworkItem[];
  onSubmitHomework: (title: string) => void;
}) {
  const [selectedHomework, setSelectedHomework] = useState(homeworkItems[0]?.title ?? "");
  const selected = homeworkItems.find((item) => item.title === selectedHomework) ?? homeworkItems[0];

  return (
    <>
      <SectionIntro
        eyebrow="Placement Homework"
        title="Assignments from coordinators with submission-ready detail views."
        description="Track instructions, difficulty, category, score, due dates, accepted submission types, and review feedback."
        action={
          <Button>
            <FileUp className="h-4 w-4" />
            New Submission
          </Button>
        }
      />
      <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Homework Board</CardTitle>
            <CardDescription>Sorted by due date.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {homeworkItems.map((item) => (
              <div key={item.title} className="rounded-lg border p-3 sm:p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <Badge variant={item.status === "Submitted" ? "secondary" : "outline"}>{item.status}</Badge>
                </div>
                <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
                  <p>Due: {item.due}</p>
                  <p>Difficulty: {item.difficulty}</p>
                  <p>Maximum score: {item.score}</p>
                  <p>Submission: {item.submission}</p>
                </div>
                <Button className="mt-4 w-full" variant={selected?.title === item.title ? "default" : "outline"} onClick={() => setSelectedHomework(item.title)}>
                  Open Homework
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Submission Panel</CardTitle>
            <CardDescription>{selected ? selected.title : "Preview state for selected homework."}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selected ? (
              <div className="grid gap-2 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                <p>Category: {selected.category}</p>
                <p>Due: {selected.due}</p>
                <p>Accepted type: {selected.submission}</p>
              </div>
            ) : null}
            <Input placeholder="Paste external platform link" />
            <textarea
              className="min-h-32 w-full rounded-md border bg-white px-3 py-2 text-base outline-none focus:ring-2 focus:ring-ring sm:text-sm"
              placeholder="Write your response or notes"
            />
            <div className="rounded-lg border border-dashed bg-background p-5 text-center">
              <UploadCloud className="mx-auto h-7 w-7 text-primary" />
              <p className="mt-2 text-sm font-medium">Upload PDF, DOCX, ZIP, or code file</p>
            </div>
            <Button className="w-full" disabled={!selected || selected.status === "Submitted"} onClick={() => selected && onSubmitHomework(selected.title)}>
              {selected?.status === "Submitted" ? "Already Submitted" : "Submit Homework"}
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
