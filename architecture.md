# SkillCraft-AI — Architecture (Draft)

**Status: Day 1 Placeholder — Decisions will be made on Day 2+**

---

## Note

This document is a placeholder created on Day 1. No architectural decisions have been made yet. This file will be updated on Day 2 after research, and will continue to evolve throughout the project.

The goal for Day 2 is to answer each open question below with a decision and a rationale. Every decision will be logged here along with:
- What was decided
- Why it was chosen over alternatives
- What trade-offs were accepted
- Date of decision

---

## Open Architectural Questions

The following questions must be answered before any source code is written. They will be worked through starting on Day 2.

---

### 1. Frontend: Web app, mobile app, or both? Which framework?

**Context:**
- Portfolio pages must be publicly accessible and SEO-indexable (clients need to find learners)
- The learning experience involves roadmaps, project briefs, and progress tracking
- Eventually a client-facing discovery interface is needed

**Options being considered:**
- Next.js (React-based, SSR/SSG for SEO, large ecosystem)
- React + separate SSR solution
- Vue.js / Nuxt.js
- Mobile-first with React Native

**Status:** ❓ Undecided — will be decided Day 2

---

### 2. Backend: What language and framework?

**Context:**
- Needs to serve API requests to the frontend
- Needs to integrate with an AI/LLM provider
- Needs to handle authentication, user data, payments
- Will grow to moderate complexity over 600 days

**Options being considered:**
- Next.js API routes (co-located with frontend, good for early stage)
- Node.js + Express or Fastify (separate backend service)
- Python + FastAPI (strong AI/ML ecosystem, Python native for LLM work)
- Python + Django (more batteries included, larger framework)

**Status:** ❓ Undecided — will be decided Day 2

---

### 3. AI Integration: Which LLM provider?

**Context:**
- The core "Learn" feature requires AI to generate personalized roadmaps
- AI guidance on "how to use AI while learning" is a differentiator
- Cost, quality, rate limits, and developer experience vary significantly

**Options being considered:**
- OpenAI (GPT-4 / GPT-4o) — high quality, pay-per-use, well-documented
- Google Gemini — competitive quality, Google ecosystem
- Anthropic Claude — strong reasoning, alternative to OpenAI
- Open-source (Llama 3, Mistral) — self-hosted, no API costs, but infrastructure overhead

**Questions to resolve:**
- What is the expected volume of roadmap generation requests?
- What is the budget for AI API calls?
- Should roadmaps be generated fresh each time or cached?

**Status:** ❓ Undecided — will be decided Day 2

---

### 4. Database: What type(s) of data need to be stored?

**Context:**
We need to identify all major data entities before choosing a database.

**Known data entities (first draft):**
- Users (learners and clients)
- Learning domains and categories
- Roadmaps (AI-generated, per user)
- Roadmap steps / milestones
- Learning resources (links, descriptions per step)
- Projects (briefs, submissions, completions)
- Portfolio entries
- Client profiles
- Client-learner engagements
- Payments and transactions
- Reviews and ratings

**Options being considered:**
- PostgreSQL — relational, strong for structured data, ACID compliance
- MongoDB — document store, flexible schema, good for roadmap/content data
- Hybrid — PostgreSQL for users/payments, MongoDB or similar for content

**Status:** ❓ Undecided — will be decided Day 2

---

### 5. Authentication Strategy

**Context:**
- Two user types: learners and clients
- Need secure session management
- Social login (Google at minimum) improves onboarding

**Options being considered:**
- Custom auth (JWT + refresh tokens)
- NextAuth.js / Auth.js (if using Next.js)
- Clerk (managed auth service)
- Supabase Auth (if using Supabase as backend)
- Firebase Authentication

**Questions to resolve:**
- Do we want to own auth infrastructure or use a managed service?
- What OAuth providers are required at launch? (Google, GitHub, LinkedIn?)

**Status:** ❓ Undecided — will be decided Day 2

---

### 6. Client-Learner Marketplace: How Does Matching Work?

**Context:**
- Clients discover learners through their public portfolio projects
- This is discovery-first, not bidding-first (unlike Upwork/Fiverr)
- The mechanics of how a client approaches a learner need to be designed

**Open questions:**
- Does the client send a message/brief, or is there a formal proposal system?
- Can a client approach multiple learners for the same project?
- Is there a vetting step before client and learner connect?
- Who defines project scope — client, learner, or AI-assisted?

**Status:** ❓ Undecided — will be designed in Phase 4 (Days 181–300)

---

### 7. Payment Integration: Which Provider?

**Context:**
- Money moves from client to learner through the platform
- Escrow or milestone-based payments are likely required
- Geographic considerations: is this India-first or global from the start?

**Options being considered:**
- Stripe — global, strong developer tools, supports escrow via Connect
- Razorpay — India-focused, good INR support, UPI integration
- PayPal — wide recognition, but higher fees

**Questions to resolve:**
- What is the target geography at launch?
- Does the platform take a commission? If so, what percentage?
- Milestone-based or lump-sum payments?

**Status:** ❓ Undecided — will be designed in Phase 5 (Days 301–450)

---

### 8. Hosting and Deployment Strategy

**Context:**
- Frontend needs to be fast globally (CDN-backed)
- Backend needs to be reliable and scalable
- Cost must be manageable for a solo/small team early-stage project
- CI/CD pipeline needed from the start

**Options being considered:**
- Vercel — excellent for Next.js frontend, serverless functions
- Railway — simple full-stack deployment, good DX, reasonable cost
- Render — similar to Railway, good free tier
- AWS (EC2, ECS, Lambda) — maximum control, higher ops complexity
- Supabase — if used as backend-as-a-service (DB + auth + storage)

**Status:** ❓ Undecided — will be decided Day 2

---

## Decisions Log

*(This section will be filled in starting Day 2 as decisions are made.)*

| Date | Question | Decision | Rationale |
|---|---|---|---|
| — | — | — | — |

---

## Architecture Diagram

*(To be created on Day 2 once the tech stack is decided.)*

---

*Document created: Day 1*
*Next update: Day 2*
