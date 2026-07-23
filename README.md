# PlacePrep — Student Learning & Placement Preparation

PlacePrep is a web workspace that helps students **learn technologies and tools** and **prepare for campus
placements** in one place. It combines structured, interview-oriented study guides with career roadmaps, coding
practice, self-assessments, daily tasks, and progress tracking — alongside admin and super-admin views for the
organizations that run placement programs.

> Status: front-end prototype with mock data. Authentication and all data are currently simulated on the client
> (no backend yet). See [Roadmap](#roadmap) for what a production version needs.

## Live demo

Deployed on Vercel. Use one of the demo accounts below on the login screen (or click a **quick-login** button).

| Role        | Email                  | Password |
| ----------- | ---------------------- | -------- |
| Student     | `student@gmail.com`    | `123456` |
| Admin       | `admin@gmail.com`      | `123456` |
| Super Admin | `superadmin@gmail.com` | `123456` |

## Pitching / showcasing

- **Landing page** — the app now opens on a marketing landing screen (hero, features, subject library, role cards)
  with one-click entry into any role. Sign in returns the demo-account login.
- **Demo script** — a click-by-click walkthrough in [`docs/DEMO_SCRIPT.md`](docs/DEMO_SCRIPT.md) so anyone can
  deliver the pitch consistently in ~2–4 minutes.
- **Product one-pager** — [`docs/pitch-one-pager.html`](docs/pitch-one-pager.html), a self-contained visual overview
  to show alongside the live demo.

## What students get

- **Study Materials** — 40+ subjects (languages, web, backend, databases, CS core, DevOps & cloud, AI, career),
  each authored as a multi-stage guide (Fundamentals → Core → … → Interview → Revision) with Learn / Examples /
  Visualize / Code / Practice / Interview / Revision / Notes views. Content lives in versioned JSON guides under
  [`src/sections/study-materials/guides/`](src/sections/study-materials/guides/).
- **Career Roadmaps** — role tracks (frontend, full-stack, data/AI, cyber/cloud) with target roles, core vs. next
  skills, readiness, hiring signals, and a preparation timeline.
- **Coding Practice** — curated problems by topic and difficulty.
- **Self-Assessment & Assessments** — practice tests and coordinator-created assessments.
- **Daily Tasks, Homework, Announcements, Results, Preparation Progress, Profile.**

## Tech stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)-style primitives
  (`src/components/ui`) and [lucide-react](https://lucide.dev/) icons
- Path alias `@` → `src/` (see [`vite.config.ts`](vite.config.ts) and [`tsconfig.json`](tsconfig.json))
- SPA routing handled by [`vercel.json`](vercel.json) rewrites

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
```

### Available scripts

| Script                    | Purpose                                                    |
| ------------------------- | ---------------------------------------------------------- |
| `npm run dev`             | Start the Vite dev server                                  |
| `npm run build`           | Type-check (`tsc -b`) and build for production             |
| `npm run preview`         | Preview the production build locally                       |
| `npm run lint`            | Run ESLint                                                 |
| `npm run generate:guides` | Regenerate study-guide JSON via `scripts/`                 |
| `npm run validate:guides` | Validate study-guide JSON against the schema              |

## Project structure

```text
src/
├── components/      # ui primitives, layout shells, shared common components
├── data/            # mock data for student / admin / super-admin
├── sections/        # feature modules (study-materials, career-roadmaps, coding-practice, ...)
├── types/           # shared TypeScript types
├── lib/             # utilities (cn, ...)
└── App.tsx          # role-based routing + top-level state
```

Product/UX requirements are documented in [`Placement Coordinator.md`](Placement%20Coordinator.md).

## Roadmap

The current build is a UI prototype. To make it production-ready:

- **Backend + real authentication** (replace the mock login in
  [`src/components/layout/login-screen.tsx`](src/components/layout/login-screen.tsx) and the path-based role
  detection in [`src/App.tsx`](src/App.tsx)). Persist users, progress, submissions, and assessments.
- **Persist learning progress** (completed topics, bookmarks, revision queue) per user.
- **Coordinator/admin data flows** wired to the backend (students, sections, groups, assessments, reports).
- See `Placement Coordinator.md` §28 and §31 for the full feature backlog and MVP scope.
