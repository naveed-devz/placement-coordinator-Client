import { useState } from "react";
import { CalendarDays, MessageSquareText, PlayCircle, Plus, Users } from "lucide-react";
import { SectionIntro } from "@/components/common/section-intro";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { selfAssessments } from "@/data/student";

export function SelfAssessmentSection({ onLaunch }: { onLaunch: (title: string) => void }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(selfAssessments[0].title);
  const [assessmentMode, setAssessmentMode] = useState("Written Test");
  const [inviteInput, setInviteInput] = useState("");
  const [invites, setInvites] = useState(["Vikram Singh", "Meera Nair"]);
  const [createdSessions, setCreatedSessions] = useState([
    {
      title: "DSA peer challenge",
      mode: "Written Test",
      participants: 4,
      time: "Today, 6:00 PM",
    },
  ]);

  function addInvite() {
    const name = inviteInput.trim();
    if (!name) return;
    setInvites((items) => [...items, name]);
    setInviteInput("");
  }

  function createPracticeSession() {
    setCreatedSessions((sessions) => [
      {
        title: selectedTemplate,
        mode: assessmentMode,
        participants: invites.length + 1,
        time: "Created now",
      },
      ...sessions,
    ]);
    onLaunch(`${assessmentMode} session created`);
  }

  return (
    <>
      <SectionIntro
        eyebrow="Self-Assessment"
        title="Practice checks students can start anytime."
        description="Choose a skill area, take a timed self-check, and compare improvement against previous best scores."
        action={
          <Button onClick={createPracticeSession}>
            <PlayCircle className="h-4 w-4" />
            Create Session
          </Button>
        }
      />
      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
        <Card>
          <CardHeader>
            <CardTitle>Create Practice Assessment</CardTitle>
            <CardDescription>Invite classmates and choose the assessment format.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Template</label>
                <select
                  className="h-10 w-full rounded-md border bg-white px-3 text-base outline-none focus:ring-2 focus:ring-ring sm:text-sm"
                  value={selectedTemplate}
                  onChange={(event) => setSelectedTemplate(event.target.value)}
                >
                  {selfAssessments.map((item) => (
                    <option key={item.title}>{item.title}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mode</label>
                <select
                  className="h-10 w-full rounded-md border bg-white px-3 text-base outline-none focus:ring-2 focus:ring-ring sm:text-sm"
                  value={assessmentMode}
                  onChange={(event) => setAssessmentMode(event.target.value)}
                >
                  <option>Written Test</option>
                  <option>Mock Interview</option>
                  <option>Group Discussion</option>
                  <option>Coding Round</option>
                </select>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Questions", value: "25", icon: MessageSquareText },
                { label: "Duration", value: "30 min", icon: CalendarDays },
                { label: "Participants", value: String(invites.length + 1), icon: Users },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border bg-background p-3">
                  <item.icon className="h-4 w-4 text-primary" />
                  <p className="mt-2 text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Invite classmates</label>
              <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
                <Input placeholder="Student name or email" value={inviteInput} onChange={(event) => setInviteInput(event.target.value)} />
                <Button type="button" variant="outline" onClick={addInvite}>
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {invites.map((name) => (
                  <Badge key={name} variant="outline">
                    {name}
                  </Badge>
                ))}
              </div>
            </div>

            <Button className="w-full" onClick={createPracticeSession}>
              Create and Invite
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Created Sessions</CardTitle>
            <CardDescription>Peer practice rooms.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {createdSessions.map((session) => (
              <div key={`${session.title}-${session.time}`} className="rounded-lg border p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{session.title}</p>
                  <Badge variant="secondary">{session.mode}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {session.participants} participants · {session.time}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {selfAssessments.map((item) => (
          <Card key={item.title} className={selectedTemplate === item.title ? "border-primary/50" : ""}>
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
              <Button className="w-full" variant="outline" onClick={() => setSelectedTemplate(item.title)}>
                Select Template
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
