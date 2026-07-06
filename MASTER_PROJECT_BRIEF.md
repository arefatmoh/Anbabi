# Read & Revive / አንባቢ — Master Project Brief

**Status:** Canonical internal reference  
**Purpose:** Keep product, brand, content, design, and technical decisions aligned during implementation.  
**Source:** Consolidated from the seven planning documents and the finalized production asset library.

## 1. Product in one sentence

Read & Revive is a youth-led, gamified reading community platform that helps young people in Ethiopia read consistently, reflect deeply, discuss ideas with peers, and turn those ideas into published voices.

## 2. Brand foundation

- **Primary name:** Read & Revive
- **Cultural signature:** አንባቢ
- **Public lockup:** Read & Revive / አንባቢ
- **Category:** Gamified reading community platform
- **Core idea:** Books become circles. Circles become voices. Voices revive culture.
- **Main message:** Read together. Reflect deeply. Revive your mind.
- **Main tagline:** Reading · Sharing · Connecting
- **Primary CTA:** Join Current Reading Cycle
- **Editorial section:** Voices from the Circle
- **Community promise:** You do not have to build your reading habit alone.

## 3. Audience and positioning

The primary audience is young people in Ethiopia, especially ages 18–30, who want a more relevant, social, and purposeful reading experience.

The public brand is broad and welcoming. Muslim identity should be expressed softly through values such as knowledge, purpose, sincerity, discipline, character, service, and modest visual representation. Public pages must not imply that participation is restricted to Muslims unless a specific program intentionally has that audience.

### Audience needs

- Accessible and appealing reading material
- A clear reading plan
- Peer support and discussion
- Motivation to continue
- Recognition for meaningful effort
- A path from reading to reflection and expression
- Culturally relevant voices and content

## 4. Core product model

The Reading Cycle is the heart of the product:

1. Select a book.
2. Publish a clear timeline and reading targets.
3. Invite readers into the Telegram/Facebook circle.
4. Share prompts, check-ins, and discussions.
5. Hold a closing session with a reviewer or expert.
6. Collect reflections and article submissions.
7. Publish selected writing in Voices from the Circle.
8. Recognize meaningful participation.
9. Invite readers into the next cycle.

Every feature should support at least one of these goals:

- **Start** — make beginning easy.
- **Continue** — make progress visible and motivating.
- **Reflect** — turn pages into thought.
- **Connect** — make reading social.
- **Contribute** — turn readers into voices.

## 5. MVP definition

The first release is a public, responsive website with database-managed content. Public visitors do not need accounts.

### Required public experiences

- Home
- Current Reading Cycle
- Books
- Book detail
- Voices from the Circle listing
- Article detail
- Community
- About
- Programs
- Contact

### Required operational capabilities

- Display active, upcoming, completed, and archived cycles.
- Send visitors to current Telegram and Facebook community links.
- Publish books, cycles, schedules, articles, programs, and community links.
- Receive contact and inquiry forms.
- Track basic public analytics and outbound community clicks.
- Provide an admin-only content-management path before ongoing editorial operations depend on developer changes.

### Deliberately excluded from public MVP

- Reader sign-up or login
- Personal dashboards
- Automated reading check-ins
- User-submitted reflections inside the platform
- Automated XP, streaks, badges, leaderboards, or certificates
- Telegram bot automation

Manual recognition in Telegram/Facebook may preview the future gamification language without pretending that an automated system exists.

## 6. Future roadmap

- **Phase 2 — Reader accounts:** profiles, cycle joining, progress, check-ins, reflections, and reading history.
- **Phase 3 — Gamification:** XP, Reading Points, streaks, badges, levels, leaderboards, completion levels, and first Reader Passport.
- **Phase 4 — Editorial workflow:** authenticated article submissions, revision feedback, editor review, publishing, and author profiles.
- **Phase 5 — Recognition:** certificates, verification, achievement pages, and cycle finisher records.
- **Phase 6 — Telegram automation:** account linking, reminders, check-ins, reflections, and achievement notifications.
- **Phase 7 — Scale:** campus/city circles, team challenges, mentors, ambassadors, analytics, awards, and possible mobile app.

## 7. Brand voice

Write like a thoughtful, energetic reading companion.

### Use

- Friendly, clear, warm, youthful language
- Short, purposeful paragraphs
- Specific book and community context
- Honest encouragement
- Reflective questions
- Words such as read, circle, cycle, reflect, share, grow, voice, journey, streak, progress, ideas, and purpose

### Avoid

- NGO jargon such as beneficiaries, stakeholders, capacity building, and awareness creation
- Corporate or SaaS language
- Empty motivational claims
- Academic over-explanation
- Childish gamification language
- Heavy public religious messaging
- Generic AI-sounding copy
- Fake testimonials, numbers, reviews, or community activity

## 8. Content principles

Content follows:

**Read → Reflect → Discuss → Write → Publish → Inspire**

Every editorial item should connect to a book, reading cycle, discussion, reader experience, or meaningful reading practice. The primary blog name is always **Voices from the Circle**, not simply “Blog.”

AI may help with grammar, structure, titles, or shortening, but it must not replace real thought, personal experience, book connection, or the writer’s voice.

## 8A. Development mock-content policy

Development content should make the product feel complete enough to evaluate. Mock status is an internal data concern, not public-facing copy.

- Use coherent mock content naturally in the UI without visible staging labels or apologies.
- Recognizable real books may anchor mock cycles when title and author metadata are accurate; this does not imply endorsement or a confirmed production selection.
- Store mock records centrally and tag them internally with `is_mock: true`.
- Route all page content through a typed repository/service layer. Mock files are a temporary development source, not a permanent page dependency.
- Seed the mock records into Supabase when the data phase begins and manage them through the custom admin dashboard, using the same fields and relationships as production content.
- Do not fabricate statistics, testimonials, partnerships, credentials, endorsements, or claims of real community activity.
- Replace or explicitly approve all mock records at the production content-readiness gate.
## 9. Community model

- **Telegram:** active reading circle; targets, prompts, discussions, reminders, polls, voice chats, and recognition.
- **Facebook:** public visibility; announcements, article sharing, recaps, spotlights, and outreach.
- **Website:** official home, conversion point, and archive.

The weekly rhythm is:

**Target → Prompt → Discussion → Check-in → Recap → Recognition**

Moderation must be respectful, calm, fair, and encouraging. The community recognizes effort and thought, not only winners.

## 10. Visual direction

The visual concept is **A Reading Journey Playground**: editorial, handmade, warm, energetic, and human.

### Locked palette

| Token         |     Value | Primary role                       |
| ------------- | --------: | ---------------------------------- |
| Revive Orange | `#F97316` | Primary action and active progress |
| Burnt Orange  | `#C2410C` | Deep accents and hover states      |
| Ink Black     | `#111111` | Primary text and strong borders    |
| Charcoal      | `#232323` | Dark sections and footer           |
| Warm Paper    | `#FFF7ED` | Main background                    |
| Cream White   | `#FFFCF7` | Reading and card surfaces          |
| Peach Note    | `#FED7AA` | Notes and secondary emphasis       |
| Warm Yellow   | `#FACC15` | Celebration and selected rewards   |
| Success Green | `#22C55E` | Completed states                   |
| Info Sky      | `#38BDF8` | Informational states               |
| Soft Red      | `#EF4444` | Missed/error states                |

### Type direction

- Editorial serif for major headings: Fraunces, Playfair Display, or Libre Baskerville direction.
- Clean sans-serif for interface and body: Inter, Manrope, or Plus Jakarta Sans direction.
- Handwritten accent only for small notes, labels, and doodle-adjacent annotations.

### Visual rules

- Use a disciplined grid under an intentionally playful surface.
- Use warm paper, black ink, orange accents, rounded cards, stickers, and purposeful asymmetry.
- Tilt only a small minority of elements.
- Keep doodles purposeful: direction, emphasis, progress, delight, or section rhythm.
- Use one primary visual anchor and usually one to three small accents per section.
- Build controls and information architecture in React/Tailwind; do not flatten buttons, cards, forms, timelines, or dashboards into images.

### Anti-patterns

- Generic SaaS hero/card/stat layouts
- Rigid NGO sections
- Repetitive equal card grids
- Excessive orange surfaces
- Random blobs, gradients, or stock illustration styles
- Dense dashboards on public pages
- Fake interface text embedded in images
- Heavy parallax, flashing, or distracting motion

## 11. Technical foundation

- **Frontend:** Next.js App Router, React, TypeScript
- **Styling:** Tailwind CSS plus a custom token-driven design system
- **Backend/database:** Supabase PostgreSQL
- **Authentication:** Supabase Auth
- **Dynamic media:** Supabase Storage
- **Hosting:** Vercel
- **Security:** Row Level Security from the beginning
- **Content:** database-managed, not hard-coded long term
- **Admin:** custom admin area inside the app

The static curated brand library remains in `public/assets`. Supabase Storage is for content that administrators or users upload later, such as book covers, article covers, program images, avatars, and certificates.

## 12. Canonical decisions resolving source ambiguity

1. **Primary CTA copy:** Use “Join Current Reading Cycle” consistently. Shorten only where physical UI space requires it and the meaning remains clear.
2. **Current-cycle routes:** `/current-cycle` is the stable public shortcut to the active cycle. `/cycles/[slug]` is the canonical detail route for individual cycles and archives.
3. **Article statuses:** Use the comprehensive flow: `draft`, `submitted`, `under_review`, `needs_revision`, `approved`, `scheduled`, `published`, `rejected`, `archived`. Treat “featured” as a Boolean presentation flag, not a workflow status.
4. **Phase naming:** Use the seven-phase technical roadmap in this file as canonical. Earlier four-phase summaries are conceptual groupings.
5. **MVP submissions:** Contact and article-interest forms are allowed. Full authenticated editorial submission/revision workflow belongs to Phase 4.
6. **Asset storage:** Version-controlled brand artwork stays in `public/assets`; dynamic editorial/user media goes to Supabase Storage.
7. **Public language:** English is the initial content language. The Amharic name remains a visible cultural signature; multilingual content can be added deliberately later.
8. **Gamification numbers:** Level thresholds and streak rules are approved planning defaults. Point awards remain configurable until tested with real cycles.

## 13. Definition of success

The MVP succeeds when a visitor can quickly understand the movement, discover the active book, see exactly how the cycle works, join the real community, read authentic youth-generated content, and encounter no dead ends.

The experience should feel unmistakably human: less like a template and more like entering an active reading circle.


