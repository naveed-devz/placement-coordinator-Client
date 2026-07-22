import { Progress } from "@/components/ui/progress";
import { skills } from "@/data/student";

export function SkillBars() {
  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.name} className="space-y-2">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium">{skill.name}</span>
            <span className="shrink-0 text-muted-foreground">
              {skill.value}% · {skill.change}
            </span>
          </div>
          <Progress value={skill.value} />
        </div>
      ))}
    </div>
  );
}
