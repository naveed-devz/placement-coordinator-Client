import { DonutProgress } from "@/components/common/donut-progress";
import { skills } from "@/data/student";

export function SkillBars() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {skills.map((skill) => (
        <div key={skill.name} className="rounded-lg border bg-background p-3">
          <DonutProgress value={skill.value} label={skill.name} caption={`Monthly change ${skill.change}`} size="sm" />
        </div>
      ))}
    </div>
  );
}
