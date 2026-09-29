# SkillCraft-AI — Development Log

This log is updated every active development day. It is the honest record of what was done, what was decided, and what problems were found.

---

## DAY 1 — FOUNDATION

**Date:** September 30, 2026
**Objective:** Establish project foundation, planning documents, and repository structure.
**Status:** ✅ Complete

---

### What Was Inspected

- Examined the existing `CAREERFORGE` workspace on the desktop
- Found two existing projects inside it:
  - **BusLiveDemo** — an HTML/CSS/JavaScript web prototype for bus tracking
  - **KSRTC** — an Android app (Kotlin + Jetpack Compose) for bus tracking
- Both existing projects are related to a bus/transit tracking product — completely unrelated to SkillCraft-AI
- SkillCraft-AI is starting fresh as its own independent project in its own folder
- No existing code, design, or database schema exists for SkillCraft-AI — we are starting from zero

---

### What Was Created

| File | Purpose |
|---|---|
| `SkillCraft-AI/PROJECT_ROADMAP.md` | Full 600-day project roadmap — vision, phases, milestones, architecture notes |
| `SkillCraft-AI/DEVELOPMENT_LOG.md` | This file — daily log of all development activity |
| `SkillCraft-AI/README.md` | Project overview for anyone discovering this repository |
| `SkillCraft-AI/.gitignore` | Covers Node.js, Python, Android, OS files, IDE files, secrets |
| `SkillCraft-AI/docs/architecture.md` | Placeholder architecture document with open questions for Day 2 |

---

### Decisions Made

1. **Separate folder** — SkillCraft-AI lives in its own folder (`CAREERFORGE/SkillCraft-AI/`) and is independent from the BusLiveDemo and KSRTC projects.

2. **No source code on Day 1** — Day 1 is foundation and planning only. No framework, no language, no database chosen yet. Decisions made without enough information are expensive to undo.

3. **Tech stack deferred to Day 2** — The tech stack requires more research and thought. It will be decided on Day 2 based on the platform requirements (web-first, AI integration, SEO for portfolios, payment support).

4. **600-day incremental philosophy adopted** — The project will be built phase by phase, with each phase delivering real user value before moving on.

5. **Documentation-first approach** — The DEVELOPMENT_LOG, PROJECT_ROADMAP, and architecture doc are treated as first-class project artifacts, not afterthoughts.

6. **Marked assumptions explicitly** — Anything not directly stated by the founder is marked `[ASSUMPTION]` in the roadmap to keep honest track of what is decided vs. assumed.

---

### Problems Discovered

**Open questions that must be answered before coding can begin:**

1. **Tech stack unknown** — No decision yet on frontend (React? Next.js? Vue?), backend (Node.js? Python? Go?), or database (PostgreSQL? MongoDB? both?).

2. **AI provider unknown** — Roadmap generation is the core feature. Which LLM? OpenAI GPT-4, Google Gemini, open-source Llama/Mistral? Cost, quality, and rate limits vary significantly between them.

3. **Business model unclear at edges** — The core loop is clear (Learn → Build → Prove → Earn), but the payment model details are not: Does SkillCraft-AI take a commission? Is there a subscription? This affects database design and payment integration.

4. **Domain list not defined** — "Department/domain-wise learning paths" was mentioned (Web Dev, Data Science, UI/UX, Marketing) but the full list of supported domains is not defined. This affects Phase 2 scope.

5. **Client acquisition not addressed** — The "Earn" pillar depends on real clients discovering learners. How do clients find out about the platform? This is a marketing/growth question that the technical roadmap cannot solve.

6. **Portfolio SEO strategy not designed** — Public portfolio pages need to be discoverable. What metadata, structured data, and URL structure will they use?

7. **Mobile app decision pending** — Should there be a mobile app alongside the web app? This affects architecture decisions.

8. **No existing user research** — The problem statement is well-reasoned, but no user interviews or validation data exist yet. This is a risk to track.

---

### Next Steps (Day 2)

1. **Tech stack research and decision** — Research and choose:
   - Frontend framework (Next.js is the leading candidate for SSR + portfolio SEO)
   - Backend approach (Next.js API routes vs. separate backend service)
   - Database (PostgreSQL for relational data is the leading candidate)
   - AI provider (compare OpenAI vs. Gemini vs. open-source for cost and quality)

2. **Finalize architecture document** — Turn `docs/architecture.md` from a placeholder into a real document with decisions made and their rationale.

3. **Initialize Git repository** — Run `git init`, create initial commit, set up `.gitignore`, decide on branching strategy.

4. **Define domain list** — Write out the full list of learning domains for Phase 2 (even if it starts with 3–4 domains).

5. **Sketch the database schema** — First draft of the data model: users, roadmaps, projects, portfolios, clients, payments.

---

*Entry written by: Kiro (AI assistant)*
*Human review: Pending*

---

<!-- Template for future days:

## DAY N — [TITLE]

**Date:** [Date]
**Objective:** [One sentence]
**Status:** 🔄 In Progress / ✅ Complete / ❌ Blocked

### What Was Done
- 

### Decisions Made
- 

### Problems Discovered
- 

### Next Steps (Day N+1)
1. 

---

-->
