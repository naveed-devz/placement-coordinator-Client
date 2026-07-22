import { CalendarCheck, ChevronRight, Filter, MapPin } from "lucide-react";
import { SectionIntro } from "@/components/common/section-intro";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { activities } from "@/data/student";

export function ActivitiesSection() {
  return (
    <>
      <SectionIntro
        eyebrow="Placement Activities"
        title="Events, workshops, drives, and practice sessions assigned to you."
        description="View schedule, attendance requirement, location, links, attachments, coordinator notes, and completion state."
        action={
          <Button>
            <CalendarCheck className="h-4 w-4" />
            Sync Calendar
          </Button>
        }
      />
      <section className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="min-w-0">
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>Assigned placement preparation activity list.</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {activities.map((item) => (
              <div key={item.title} className="grid min-w-0 gap-3 rounded-lg border p-3 sm:p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    <Badge variant={item.status === "Completed" ? "secondary" : "outline"}>{item.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.type} · {item.date} · {item.time}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {item.location} · {item.attendance}
                  </p>
                </div>
                <Button className="w-full sm:w-auto" variant="outline" size="sm">
                  Details
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Attendance</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <p className="text-4xl font-bold">91%</p>
              <p className="text-sm text-muted-foreground">10 of 11 required activities attended</p>
            </div>
            <Progress value={91} />
            <div className="rounded-lg border bg-background p-3 text-sm">
              Next required activity starts at <span className="font-semibold">10:00 AM tomorrow</span>.
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
