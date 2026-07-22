import type { ReactNode } from "react";

export function SectionIntro({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <section className="flex min-w-0 flex-col justify-between gap-4 rounded-lg border bg-white p-4 shadow-soft sm:p-5 lg:flex-row lg:items-center">
      <div className="min-w-0 max-w-3xl">
        <p className="text-sm font-semibold text-secondary">{eyebrow}</p>
        <h1 className="mt-1 text-xl font-bold leading-tight sm:text-2xl md:text-3xl">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {action ? <div className="flex w-full shrink-0 sm:w-auto [&>button]:w-full sm:[&>button]:w-auto">{action}</div> : null}
    </section>
  );
}
