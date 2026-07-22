import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { SectionIntro } from "@/components/common/section-intro";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { selfAssessments } from "@/data/student";

export function SelfAssessmentSection({ onLaunch }: { onLaunch: (title: string) => void }) {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <>
      <SectionIntro
        eyebrow="Self-Assessment"
        title="Practice checks students can start anytime."
        description="Choose a skill area, take a timed self-check, and compare improvement against previous best scores."
        action={
          <Button onClick={() => onLaunch("Data structures readiness")}>
            <PlayCircle className="h-4 w-4" />
            Start Practice
          </Button>
        }
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {selfAssessments.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.level}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-muted-foreground">Questions</p>
                  <p className="font-bold">{item.questions}</p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-bold">{item.duration}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Best score: {item.best}</p>
              <Button className="w-full" variant="outline" onClick={() => onLaunch(item.title)}>
                Launch
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
      <Card>
        <CardHeader>
          <CardTitle>Question Preview</CardTitle>
          <CardDescription>Selected assessment mock state.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-medium">Which data structure is best suited for checking balanced parentheses?</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Queue", "Stack", "Hash table", "Binary tree"].map((option) => (
              <button
                key={option}
                className={`rounded-lg border bg-white p-3 text-left text-sm font-medium hover:bg-muted ${
                  selectedOption === option ? "border-primary bg-primary/5 text-primary" : ""
                }`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
