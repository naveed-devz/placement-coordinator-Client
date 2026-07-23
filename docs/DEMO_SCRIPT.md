# PlacePrep — Guided Demo Script

A click-by-click walkthrough for pitching the product live in ~2–4 minutes. Everything runs on mock data, so it
never fails on a network call. No credentials are needed — the landing page and login screen both have one-click
entry.

> **Password for any demo account (if you ever type it manually):** `123456`
> Accounts: `student@gmail.com`, `admin@gmail.com`, `superadmin@gmail.com`

---

## 0. Before you start

- Open the Vercel URL. You should land on the **marketing landing page** (hero + features + role cards).
- If you were already signed in, click **Logout** (top-right) to return to the landing page.
- Full-screen the browser. Zoom ~90–100%.

---

## 1. Frame the problem (landing page) — 30s

**Stay on the landing page.**

> "Students preparing for placements juggle a dozen tabs — DSA here, system design there, resume tips somewhere
> else — with no idea if they're actually ready. PlacePrep puts learning, practice, and placement tracking in one
> workspace, for students *and* the coordinators who run the program."

- Point to the hero stat tiles: **40+ study guides, career roadmaps, 3 role-based portals, 8 categories.**
- Scroll to **"A deep library, not a link list"** — highlight the category chips and subject chips.
  > "Every subject is a full staged curriculum — not a bookmark."

---

## 2. Student experience — 90s

Click **"Launch student demo"** (hero or role card).

1. **Dashboard** — "Riya's placement prep is 78% complete." Point to: readiness donut, coordinator feedback,
   today's task bar, skill performance.
2. **Study Materials** (sidebar) — this is the core.
   - Show the subject grid + category filter + search.
   - Click a subject (e.g. **Java** or **System Design**).
   - Walk the **learning stages** (Fundamentals → … → Interview → Revision).
   - Open a stage and switch tabs: **Learn / Examples / Visualize / Code / Practice / Interview / Revision**.
   > "Same depth for every one of the 40+ subjects — this is real authored content, versioned as JSON."
3. **Career Roadmaps** — open one track (e.g. Software Engineer). Point to target roles, core vs. next skills,
   readiness, hiring signals, timeline.
4. **Coding Practice** — problems by topic/difficulty with attempts + acceptance.
5. (Optional) **Self-Assessment / Assessments / Preparation Progress** — quick glance to show breadth.

---

## 3. Coordinator / Admin experience — 45s

Click **Logout** → on the landing page click the **Organization Admin** role card (or Sign in → Admin quick-login).

- **Dashboard** — org-wide metrics.
- **Students** — list, filters, and a student profile (move a student between sections to show it's interactive).
- **Sections / Groups / Coordinators** — org structure and RBAC roles.
- **Assessments / Tasks / Announcements** — create flows (they update the live preview instantly).
- **Reports** — section/student analytics.
> "Coordinators run the entire program here — no spreadsheets."

---

## 4. Super Admin experience — 20s

Logout → **Super Admin** role card.

- **Dashboard** — platform-wide totals.
- **Organizations / Requests** — approve/suspend orgs.
- **Plans, Analytics, Support, Audit Logs.**
> "This is the multi-tenant control plane — one platform, many institutions."

---

## 5. Close — 15s

> "That's the full picture: students learn and get placement-ready, coordinators run the program, and the platform
> scales across organizations. Today it's a working front-end demo on real content — the next phase is the backend,
> real auth, and saved progress."

---

## Fallbacks / tips

- **Something looks off?** Logout and re-enter — state resets cleanly.
- **Short on time?** Do sections 1, 2, and 5 only (student story is the strongest).
- **Deep-linking:** you can open a role directly via `/student`, `/admin`, or `/super-admin` (demo shortcut — it
  bypasses login on purpose).
- Keep the narration on *outcomes* ("knows exactly what to study next"), not on the fact that data is mocked.
