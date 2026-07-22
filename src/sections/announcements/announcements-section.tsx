import { Check } from "lucide-react";
import { SectionIntro } from "@/components/common/section-intro";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AnnouncementItem } from "@/types/student";

export function AnnouncementsSection({
  announcementItems,
  onMarkRead,
}: {
  announcementItems: AnnouncementItem[];
  onMarkRead: () => void;
}) {
  const unreadCount = announcementItems.filter((item) => !item.read).length;

  return (
    <>
      <SectionIntro
        eyebrow="Announcements"
        title="Placement updates from coordinators and institution admins."
        description="Follow company updates, room changes, deadlines, orientation notices, and preparation instructions."
        action={
          <Button variant="outline" onClick={onMarkRead}>
            <Check className="h-4 w-4" />
            Mark Read
          </Button>
        }
      />
      <section className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Latest Notices</CardTitle>
            <CardDescription>Unread notices appear first.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {announcementItems.map((item) => (
              <div key={item.title} className={cn("rounded-lg border p-3 sm:p-4", !item.read && "border-primary/30 bg-primary/5")}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    {!item.read ? <Badge>Unread</Badge> : null}
                    <Badge variant="warning">{item.tag}</Badge>
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Channels</CardTitle>
            <CardDescription>{unreadCount} unread notices.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Email alerts", "Dashboard alerts", "Assessment reminders", "Drive updates"].map((item) => (
              <label key={item} className="flex items-center justify-between gap-3 rounded-lg border p-3 text-sm font-medium">
                {item}
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
              </label>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
