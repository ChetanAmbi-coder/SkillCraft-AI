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

## DAY 2 — FIRST PRODUCT INTERFACE

**Date:** September 30, 2026
**Objective:** Build the first real user-facing experience — a landing page and career goal onboarding flow.
**Status:** ✅ Complete

---

### What Was Done

Built the complete Day 2 feature set: a polished landing page and a career goal selector with form validation, localStorage persistence, and a success state. All implemented with plain HTML, CSS, and vanilla JavaScript — no frameworks, no backend, no external libraries.

---

### Features Implemented

| Feature | Description |
|---|---|
| Landing page | Hero, problem statement, four-stage journey, how-it-works, features, CTA, footer |
| Sticky navigation | Desktop links + mobile hamburger menu with aria attributes |
| Career goal modal | Opens on "Start Your Journey" click from any button on the page |
| Onboarding form | Four fields: career goal (select), skill level (radio cards), hours/week (number input), learning goal (select) |
| Client-side validation | All four fields validated; inline error messages shown without `alert()`; visual error states on form groups |
| localStorage persistence | User profile saved as JSON; survives browser refresh; pre-fills form on return visit |
| Success state | Confirmation view with summary of user's selections |
| Returning user banner | Animated bottom banner shown on page load when saved profile exists; includes "Update Goal" shortcut |
| Responsive design | Tested at desktop (1200px+), tablet (900px), mobile (600px and below) |
| Accessibility | `aria-*` attributes throughout; keyboard-accessible modal and radio cards; focus management; `prefers-reduced-motion` respected |

---

### Technologies Used

- **HTML5** — semantic elements (`<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`, `<dl>`, `<fieldset>`, `<legend>`)
- **CSS** — CSS custom properties (design tokens), CSS Grid, Flexbox, `clamp()` for fluid type, `backdrop-filter`, `@media` queries, CSS animations
- **Vanilla JavaScript** — DOM manipulation, event handling, `localStorage` API, JSON serialization, XSS-safe `innerHTML` via `createTextNode`
- **Browser APIs** — `localStorage`, `document.getElementById`, `querySelectorAll`, `addEventListener`, `DOMContentLoaded`

---

### Project Structure Created

```
SkillCraft-AI/
├── index.html          ← Landing page + modal markup
├── css/
│   └── style.css       ← All styles (20 organized sections)
├── js/
│   └── app.js          ← All JavaScript (modular, commented)
├── docs/
│   ├── DEVELOPMENT_LOG.md
│   └── PROJECT_ROADMAP.md
├── architecture.md
├── README.md
└── .gitignore
```

---

### Important Technical Decisions

1. **localStorage structure** — Stored as a single JSON object under the key `skillcraft_user_profile`. Structure: `{ careerGoal, skillLevel, hoursPerWeek, learningGoal, savedAt }`. `savedAt` included as an ISO timestamp for future use (e.g., "you last updated your goal 3 days ago").

2. **Modal approach** — Used a single modal element with two views (form view and success view) toggled by JavaScript, rather than two separate modals. Simpler, less DOM, one animation setup.

3. **Radio cards over a plain select** — Skill level uses visually styled radio cards rather than a `<select>` dropdown. This makes the three choices more visually distinguishable and matches the feel of modern onboarding flows. Standard `<input type="radio">` underneath ensures full accessibility.

4. **No `alert()` for validation** — All validation messages are rendered as inline `<span>` elements with `role="alert"` and `aria-live="polite"`. Screen readers announce them; sighted users see them in context.

5. **Separate CSS/JS files** — Not inlined in HTML. This is the correct pattern for maintainability even at small scale. As the project grows, there may be multiple pages sharing the same stylesheet.

6. **XSS protection in innerHTML** — The `renderSuccessSummary()` function uses `document.createTextNode()` to escape all user-supplied values before inserting them via `innerHTML`. This prevents cross-site scripting even though the data only comes from `localStorage`.

7. **CSS custom properties for all design values** — Defined in `:root` and used throughout. This means changing the color scheme or spacing system requires editing one block, not hunting through hundreds of lines.

8. **`novalidate` on the form** — The HTML `required` attributes exist for semantics and browser fallback, but `novalidate` disables native browser validation popups. Our custom JS validation gives us full control over the UI.

---

### Testing Performed

| Test | Result |
|---|---|
| Landing page loads in browser | ✅ Pass |
| Desktop navigation renders correctly | ✅ Pass |
| Mobile hamburger opens/closes menu | ✅ Pass |
| "Start Your Journey" (all 4 buttons) opens modal | ✅ Pass |
| Modal closes on ✕ button | ✅ Pass |
| Modal closes on overlay click | ✅ Pass |
| Modal closes on Escape key | ✅ Pass |
| Submitting empty form shows all 4 validation errors | ✅ Pass |
| Selecting values clears their respective errors | ✅ Pass |
| Hours field rejects 0, negatives, and values > 80 | ✅ Pass |
| Hours field rejects non-integer values | ✅ Pass |
| Valid form submission saves to localStorage | ✅ Pass |
| Success state displays correct summary | ✅ Pass |
| Page refresh — localStorage data survives | ✅ Pass |
| Returning user banner appears after refresh | ✅ Pass |
| "Update Goal" in banner opens modal with prefilled form | ✅ Pass |
| Dismiss banner hides it | ✅ Pass |
| Responsive layout on tablet (900px) | ✅ Pass |
| Responsive layout on mobile (600px) | ✅ Pass |
| No JavaScript console errors on load | ✅ Pass |
| Diagnostics: HTML | ✅ No issues |
| Diagnostics: JS | ✅ No issues |
| Diagnostics: CSS | ✅ 1 benign warning (webkit-only spinner removal) |

---

### Problems Encountered

1. **CSS `appearance` property order** — The linter warned that `-webkit-appearance: none` appeared before the standard `appearance: none`. Fixed by reordering: `-webkit-appearance` first, then `appearance`.

2. **`showError` key mapping** — The form group IDs use a different naming convention from the error element IDs (`fg-hours` vs `hoursPerWeek`). Resolved with explicit mapping logic in the `showError` / `clearError` functions.

3. **Spinner removal CSS** — Removing number input spinners requires the vendor-prefixed `-webkit-inner-spin-button` and the Firefox-specific `-moz-appearance: textfield`. There is no standard CSS property for this. The linter warning on this line is expected and acceptable.

---

### What Was Learned

1. **CSS custom properties (design tokens)** are the correct way to manage a design system — changing one variable in `:root` updates the entire UI.

2. **`localStorage` is synchronous and can throw** — It can fail in private browsing mode or when storage is full. Always wrap `localStorage` operations in `try/catch`.

3. **ARIA is a contract, not decoration** — `aria-hidden="true"` actually hides elements from screen readers. `role="alert"` and `aria-live="polite"` cause screen readers to announce content changes. These attributes have real effects and must be toggled correctly.

4. **`innerHTML` is dangerous with user data** — Even data from your own `localStorage` should be escaped before insertion. The `createTextNode` pattern is the safe approach.

5. **Modal focus management matters** — When a modal opens, focus should move into it. When it closes, focus should return to the element that opened it. This was implemented via `dom._lastOpener`.

---

### Current Status

Day 2 is complete. The SkillCraft-AI landing page is a real, functional webpage. A user can visit it, understand the product, fill out their career goal, and have their data saved across browser sessions.

No backend. No AI. No database. Just a clean, honest foundation.

---

### Next Recommended Step (Day 3)

Build a **"My Dashboard" page** (`dashboard.html`) that:
- Reads the saved user profile from localStorage
- Displays a placeholder personalized roadmap UI (static, not AI-generated yet)
- Shows the user's career goal and progress state
- Gives the user a reason to return

This establishes the post-onboarding experience before any backend work begins.

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
