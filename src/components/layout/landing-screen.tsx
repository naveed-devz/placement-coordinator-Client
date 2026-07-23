import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Code2,
  Compass,
  LineChart,
  ListChecks,
  LogIn,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";
import { BrandLogo } from "@/components/common/brand-logo";
import { Button } from "@/components/ui/button";
import { careerRoadmaps } from "@/data/student";
import { materialCategories } from "@/sections/study-materials/study-materials-data";
import { studyGuideManifest } from "@/sections/study-materials/study-guide-registry";
import type { UserRole } from "@/types/auth";

const subjectCount = studyGuideManifest.length;

const heroStats = [
  { value: `${subjectCount}+`, label: "Tech study guides" },
  { value: `${careerRoadmaps.length}`, label: "Career roadmaps" },
  { value: "3", label: "Role-based portals" },
  { value: "8", label: "Subject categories" },
];

const features = [
  {
    icon: BookOpen,
    title: "Study Materials",
    description: `${subjectCount}+ subjects, each a multi-stage guide from fundamentals to production and interviews.`,
  },
  {
    icon: Compass,
    title: "Career Roadmaps",
    description: "Role tracks with target roles, core vs. next skills, readiness, and a preparation timeline.",
  },
  {
    icon: Code2,
    title: "Coding Practice",
    description: "Curated problems by topic and difficulty with attempts and acceptance tracking.",
  },
  {
    icon: ClipboardCheck,
    title: "Assessments",
    description: "Self-assessments and coordinator-created tests with scores, feedback, and weak-area insights.",
  },
  {
    icon: ListChecks,
    title: "Daily Tasks & Homework",
    description: "A daily task bar and placement homework so students always know the next action.",
  },
  {
    icon: LineChart,
    title: "Preparation Progress",
    description: "Skill performance, readiness trend, and milestones tracked in one place.",
  },
];

const roleCards: { role: UserRole; icon: typeof UserRound; title: string; blurb: string; cta: string }[] = [
  {
    role: "student",
    icon: UserRound,
    title: "Student",
    blurb: "Learn technologies, practice, take assessments, and track placement readiness.",
    cta: "Enter student portal",
  },
  {
    role: "admin",
    icon: Users,
    title: "Organization Admin",
    blurb: "Manage students, sections, coordinators, assessments, announcements, and reports.",
    cta: "Enter admin portal",
  },
  {
    role: "super-admin",
    icon: ShieldCheck,
    title: "Super Admin",
    blurb: "Oversee organizations, requests, plans, platform analytics, and audit logs.",
    cta: "Enter super admin",
  },
];

export function LandingScreen({
  onEnterDemo,
  onQuickLogin,
}: {
  onEnterDemo: () => void;
  onQuickLogin: (role: UserRole) => void;
}) {
  return (
    <div className="student-shell min-h-screen">
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <BrandLogo subtitle="Placement prep" />
          <Button variant="outline" onClick={onEnterDemo}>
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">Sign in</span>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        {/* Hero */}
        <section className="grid items-center gap-8 py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-16">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1 text-xs font-semibold text-secondary shadow-soft">
              <Sparkles className="h-3.5 w-3.5" />
              Learn tech skills. Get placement-ready.
            </span>
            <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              One workspace to learn <span className="text-primary">{subjectCount}+ technologies</span> and prepare for
              placements.
            </h1>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              PlacePrep gives students structured, interview-oriented study guides, career roadmaps, coding practice,
              and self-assessments — while coordinators and admins run the placement program from the same platform.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="default" onClick={() => onQuickLogin("student")}>
                Launch student demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={onEnterDemo}>
                Explore all roles
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">No signup needed — this is a live product demo.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border bg-white/85 p-5 shadow-soft">
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-6">
          <h2 className="text-2xl font-bold">Everything a student needs to prepare</h2>
          <p className="mt-1 text-sm text-muted-foreground">Built around how placement preparation actually works.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-xl border bg-white p-5 shadow-soft">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Subject breadth */}
        <section className="mt-10 rounded-2xl border bg-white p-6 shadow-soft sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">A deep library, not a link list</h2>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                {subjectCount} subjects across {materialCategories.length} categories, each authored as a staged
                curriculum with Learn, Examples, Visualize, Code, Practice, Interview, and Revision views.
              </p>
            </div>
            <Button variant="outline" onClick={() => onQuickLogin("student")}>
              Browse the library <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {materialCategories.map((category) => (
              <span key={category} className="rounded-full border bg-muted px-3 py-1 text-sm font-medium text-foreground">
                {category}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {studyGuideManifest.slice(0, 18).map((guide) => (
              <span key={guide.id} className="rounded-md border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                {guide.title}
              </span>
            ))}
            <span className="rounded-md border bg-background px-2.5 py-1 text-xs font-medium text-primary">
              +{Math.max(subjectCount - 18, 0)} more
            </span>
          </div>
        </section>

        {/* Roles */}
        <section className="py-12">
          <h2 className="text-2xl font-bold">Built for every role in the program</h2>
          <p className="mt-1 text-sm text-muted-foreground">Jump straight into any portal — no credentials required.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {roleCards.map((card) => (
              <div key={card.role} className="flex flex-col rounded-xl border bg-white p-6 shadow-soft">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-secondary">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
                <p className="mt-1 flex-1 text-sm leading-6 text-muted-foreground">{card.blurb}</p>
                <Button className="mt-4 w-full" variant="outline" onClick={() => onQuickLogin(card.role)}>
                  {card.cta} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="overflow-hidden rounded-2xl bg-primary px-6 py-10 text-center text-primary-foreground shadow-soft sm:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">See the whole product in two minutes.</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-primary-foreground/85">
            Start as a student, then switch to the admin and super-admin portals to see the full placement workflow.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="secondary" onClick={() => onQuickLogin("student")}>
              Launch student demo <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10"
              onClick={onEnterDemo}
            >
              Sign in with demo accounts
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <BrandLogo subtitle="Placement prep" />
          <p>Product demo · PlacePrep</p>
        </div>
      </footer>
    </div>
  );
}
