# SkillCraft-AI — Project Roadmap

---

## Vision

A platform where anyone — student, beginner, or career switcher — can go from "I don't know what to learn" to "I just got paid for my work," guided by AI every step of the way.

The core promise: **Learn → Build → Prove → Earn** — not just certificates, but actual job-relevant skills, real portfolio projects, and real clients who pay for results.

---

## The Problem We're Solving

Most people who want to break into a new career field face the same set of problems:

1. **They don't know what to learn.** The internet has too much content. Generic tutorials don't map to actual jobs.
2. **They don't know how to use AI tools while learning.** AI is reshaping every field, but nobody teaches learners how to integrate AI into their workflow.
3. **They can't prove they know it.** Certificates from courses don't convince real employers or clients. A portfolio of real work does.
4. **They can't find their first client or job.** The transition from "I learned this" to "someone paid me for this" is the hardest gap to cross.

SkillCraft-AI addresses all four problems in a single, connected platform.

---

## Target Users

**Primary:**
- Students (college or high school) who want practical, job-ready skills
- Beginners switching into a new field (e.g., switching from manual work to tech)
- Career switchers who need to prove their new skills quickly

**Secondary:**
- Clients (businesses, entrepreneurs, startups) who want to hire affordable, vetted talent for real projects

**Not the target (for now):**
- Enterprise L&D teams
- Experienced professionals seeking advanced certifications
- Academic institutions

---

## The Core Loop: Learn → Build → Prove → Earn

```
[User picks a career goal]
        ↓
    [LEARN]
AI generates a personalized roadmap.
Structured resources, department/domain-wise paths.
AI guides learner on how to use AI tools while learning.
        ↓
    [BUILD]
Learner works through real-world projects tied to their roadmap.
Projects are guided, practical, and portfolio-worthy.
        ↓
    [PROVE]
Learner builds a public portfolio.
Portfolio showcases what they can actually do — not just what they studied.
        ↓
    [EARN]
Real clients discover learners through their portfolio projects.
Client approaches learner, project is scoped, learner gets paid.
        ↓
[Learner levels up → new roadmap → repeat loop]
```

---

## Core Features (by phase)

### Phase 1 — Foundation (Days 1–30)
- Project structure and planning
- Tech stack decision
- Architecture design
- Repository setup

### Phase 2 — Core Learn Flow (Days 31–90)
- User onboarding: goal selection
- Domain/department picker (Web Dev, Data Science, UI/UX, Marketing, etc.)
- AI-powered roadmap generation
- Roadmap display and navigation
- Resource curation per roadmap step
- AI guidance on how to use AI tools during learning

### Phase 3 — Build & Portfolio Foundation (Days 91–180)
- Project assignment system (real-world projects tied to roadmap)
- Project submission workflow
- Portfolio page generation per learner
- Public portfolio URLs

### Phase 4 — Prove & Client Marketplace (Days 181–300)
- Client registration and onboarding
- Client discovery of learner portfolios
- Client → learner contact/approach system
- Project scoping and agreement flow [ASSUMPTION: some form of structured brief]

### Phase 5 — Earn & Payments (Days 301–450)
- Payment integration [ASSUMPTION: escrow or milestone-based]
- Earnings dashboard for learners
- Project completion and handoff workflow
- Reviews and ratings [ASSUMPTION: both directions — client rates learner, learner rates client]

### Phase 6 — Scale & Polish (Days 451–600+)
- More domains and learning paths
- AI tutor / mentor chat
- Community features [ASSUMPTION: forums or peer groups]
- Analytics for learners (skill progress, earnings over time)
- Platform-wide quality improvements

---

## Non-Goals (What We Are NOT Building)

These are explicitly out of scope, especially in early phases:

- **Not a MOOC platform.** We are not trying to compete with Coursera, Udemy, or edX. We do not host video courses.
- **Not a job board.** We are not LinkedIn or Indeed. Clients come to learners through their portfolio — we are not listing job postings.
- **Not a freelancing marketplace like Fiverr/Upwork.** The model is discovery-first (client finds learner's portfolio), not bidding-first.
- **Not a certification body.** We don't issue accredited certificates. Portfolio proof replaces certificate proof.
- **Not a social network.** No news feeds, no followers, no viral content mechanics (at least not in early phases).
- **Not enterprise software.** No multi-tenant B2B SaaS, no org-level dashboards, not for corporate L&D teams.

---

## Technical Architecture [ASSUMPTIONS marked]

> Full architecture decisions will be made on Day 2. This section captures the known constraints and open questions.

### Known constraints:
- Must support AI-generated personalized roadmaps (requires LLM integration)
- Must support public portfolio pages (requires web frontend)
- Must eventually support payments (requires payment gateway integration)
- Must support client and learner user roles

### [ASSUMPTION] Likely frontend:
- Web app first (mobile later), likely React or Next.js
- Public portfolio pages need to be SEO-indexable, which favors SSR (Next.js)

### [ASSUMPTION] Likely backend:
- Node.js + Express or Next.js API routes, OR Python (FastAPI/Django) — to be decided Day 2
- REST or GraphQL API — to be decided

### [ASSUMPTION] AI integration:
- One of: OpenAI GPT-4, Google Gemini, or open-source model (Llama, Mistral)
- Used for: roadmap generation, project guidance, AI tool coaching

### [ASSUMPTION] Database:
- Relational DB (PostgreSQL) for users, portfolios, projects, payments
- Possibly a document store for roadmap/content data (MongoDB) — to be evaluated

### [ASSUMPTION] Authentication:
- Email/password + OAuth (Google at minimum)
- JWT or session-based auth

### [ASSUMPTION] Payments:
- Stripe or Razorpay (if India-first) for escrow/milestone payments

### [ASSUMPTION] Hosting:
- Vercel (frontend), Railway or Render or AWS (backend) — to be evaluated

---

## Major Milestones

| Milestone | Target Day | Description |
|---|---|---|
| M0 | Day 1 | Foundation: folder structure, planning docs |
| M1 | Day 30 | Tech stack decided, architecture documented, repo initialized |
| M2 | Day 90 | Working Learn flow: roadmap generation end-to-end |
| M3 | Day 180 | Working Build + Portfolio: projects assigned, portfolio live |
| M4 | Day 300 | Client marketplace: clients can discover and contact learners |
| M5 | Day 450 | Payments working end-to-end: learner earns first dollar |
| M6 | Day 600 | Platform polished, multiple domains live, scaling begins |

---

## Development Phases

### Phase 1: Foundation (Days 1–30)
**Goal:** Make every future decision easier by establishing strong foundations.

- Day 1: Folder structure, planning documents (this phase — DONE)
- Day 2–5: Tech stack research and decision
- Day 6–10: Architecture document finalized
- Day 11–15: Repository initialized (Git, branching strategy)
- Day 16–20: Development environment setup (linting, formatting, CI basics)
- Day 21–25: Database schema first draft
- Day 26–30: Auth system design, first working login/signup

**Deliverable:** A running skeleton app with auth, no business logic yet.

---

### Phase 2: Core Learn Flow (Days 31–90)
**Goal:** A user can pick a career goal and get a personalized AI roadmap.

- User onboarding screens
- Domain/department selection (Web Dev, Data Science, UI/UX, Marketing, etc.)
- AI prompt engineering for roadmap generation
- Roadmap storage and display
- Resource links per step
- "How to use AI while learning this" guidance integrated into roadmap

**Deliverable:** A user can sign up, pick a goal, and receive + view a roadmap.

---

### Phase 3: Build & Portfolio (Days 91–180)
**Goal:** A learner can work through projects and show a public portfolio.

- Project assignment tied to roadmap steps
- Project brief display
- Submission system (links, uploads, descriptions)
- Portfolio page auto-generated from submissions
- Public URL for each learner's portfolio
- Basic SEO for portfolio pages

**Deliverable:** A learner has a live, shareable portfolio URL showing their work.

---

### Phase 4: Prove & Client Marketplace (Days 181–300)
**Goal:** Clients can find learners and initiate projects.

- Client account type
- Client search/browse of learner portfolios
- Client → learner contact flow
- Project brief creation by client
- Learner accepts/declines project
- Basic project workspace (communication, file sharing) [ASSUMPTION]

**Deliverable:** A client can find a learner and agree on a project scope.

---

### Phase 5: Earn & Payments (Days 301–450)
**Goal:** Money moves from client to learner through the platform.

- Payment gateway integration
- Milestone or project-based payment flow
- Escrow hold until project completion [ASSUMPTION]
- Payout to learner
- Earnings dashboard
- Basic review/rating system

**Deliverable:** A learner completes a client project and receives payment.

---

### Phase 6: Scale & Polish (Days 451–600+)
**Goal:** Make the platform excellent and scale to more users and domains.

- Add more domain learning paths
- AI tutor chat
- Learner progress analytics
- Community features [ASSUMPTION]
- Performance optimization
- Security hardening
- Marketing and growth mechanics

**Deliverable:** A polished, scalable platform ready for real user growth.

---

## Testing Strategy

- **Unit tests** for all business logic (roadmap generation, payment calculations, etc.)
- **Integration tests** for API endpoints
- **End-to-end tests** for critical user flows (signup → roadmap → portfolio → payment)
- **Manual QA** for AI-generated content quality
- Test coverage targets to be set in Phase 1

---

## Security Considerations

- All secrets in environment variables — never committed to repo
- Authentication tokens handled securely (httpOnly cookies or secure storage)
- Input validation and sanitization on all user inputs
- Rate limiting on AI endpoints (cost control + abuse prevention)
- Payment data handled exclusively through payment provider SDKs — never stored raw
- HTTPS enforced everywhere in production
- Regular dependency audits

---

## Deployment Strategy

[ASSUMPTION] Likely approach:
- Development: local machines
- Staging: cloud environment mirroring production
- Production: cloud deployment with CI/CD pipeline
- Zero-downtime deployments via rolling updates or blue/green

Specific providers to be decided in Phase 1.

---

## Documentation Strategy

- `DEVELOPMENT_LOG.md` updated every development day
- `docs/architecture.md` updated whenever architectural decisions change
- Code-level comments for complex logic
- API documentation (auto-generated where possible)
- README kept current as the project evolves

---

## Future Scalability

- **More domains:** Every professional domain (Legal, Finance, Design, Writing, etc.) can have its own learning paths
- **Mobile app:** Once web is stable, native iOS/Android apps
- **Enterprise tier:** Organizations can onboard teams [ASSUMPTION — not in initial scope]
- **AI improvement loop:** Learner feedback improves roadmap quality over time
- **Global expansion:** Multi-language support, regional payment methods

---

## 600+ Day Development Philosophy

SkillCraft-AI is built incrementally, one day at a time, with:

1. **Honesty over hype** — every day's log reflects what actually happened, not what was hoped
2. **Foundation first** — no shortcuts in early architecture; they cost 10x later
3. **User value first** — each phase must deliver something a real user can use
4. **One thing at a time** — no parallel half-finished features; complete each phase before the next
5. **Document everything** — future-self and collaborators must understand every decision
6. **Security and quality are not phases** — they are present from Day 1

The 600+ day timeline is realistic. Most meaningful platforms take 2–3 years to build well. This roadmap doesn't pretend otherwise.

---

*Last updated: Day 1*
*Status: Planning & Foundation*
