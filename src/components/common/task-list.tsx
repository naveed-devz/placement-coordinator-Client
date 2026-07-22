import { UploadCloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TaskItem } from "@/types/student";

function getPriorityVariant(priority: string) {
  if (priority === "Critical") return "danger";
  if (priority === "High") return "warning";
  return "muted";
}

export function TaskList({
  tasksToShow,
  onTaskAction,
}: {
  tasksToShow: TaskItem[];
  onTaskAction: (title: string) => void;
}) {
  return (
    <div className="space-y-3">
      {tasksToShow.map((task) => (
        <div
          key={task.title}
          className="grid min-w-0 gap-3 rounded-lg border p-3 sm:p-4 md:grid-cols-[90px_minmax(0,1fr)_auto] md:items-center"
        >
          <p className="text-sm font-semibold text-muted-foreground">{task.time}</p>
          <div className="min-w-0">
            <p className="font-medium">{task.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {task.assignedBy} · {task.group} · {task.due}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{task.comments} coordinator comments</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={getPriorityVariant(task.priority)}>{task.priority}</Badge>
            <Badge variant="outline">{task.status}</Badge>
            <Button
              className="w-full sm:w-auto"
              variant={task.status === "Completed" ? "secondary" : "outline"}
              size="sm"
              disabled={task.status === "Completed"}
              onClick={() => onTaskAction(task.title)}
            >
              <UploadCloud className="h-4 w-4" />
              {task.status === "Completed" ? "Done" : task.status === "Not started" ? "Start" : "Submit"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
