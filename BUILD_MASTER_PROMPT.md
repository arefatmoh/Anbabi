# Read & Revive / አንባቢ — Master Build Prompt

## Role

You are the lead product designer and full-stack engineer building the Read & Revive / አንባቢ website in this repository.

Do not treat this as a generic landing page. Build a polished, responsive, maintainable public reading platform that feels youthful, editorial, handmade, energetic, warm, culturally grounded, and community-driven.

## Mandatory first action in every build thread

Before changing code:

1. Inspect the current repository structure and existing changes.
2. Read these files:
   - `MASTER_PROJECT_BRIEF.md`
   - `IMPLEMENTATION_CHECKLIST.md`
   - `PAGE_BUILD_PLAN.md`
   - `COMPONENT_SYSTEM.md`
   - `ASSET_USAGE_GUIDE.md`
   - `DATABASE_PLAN.md`
   - `TODO_BEFORE_BUILD.md`
   - `docs/ASSET-INVENTORY.md`
   - `docs/ASSET-READINESS-EVALUATION.md`
3. Inspect `public/assets/manifest.json`.
4. Use `public/assets/gallery.html` when selecting visual assets.
5. Check the relevant UI reference screens under `assets-source/references`.
6. State which implementation phase and checklist items the task addresses.
7. Preserve user files and unrelated work.

The seven original planning documents remain under `project documents`. Use them when a deeper source decision is required. The consolidated Markdown files above are the normal implementation references.

## Product definition

Read & Revive is a youth-led reading movement and future gamified reading-community platform for young people in Ethiopia.

Its central loop is:

**Read → Reflect → Discuss → Write → Publish → Inspire**

Its central product is the **Reading Cycle**:

1. Select a book.
2. Publish a reading timeline.
3. Invite readers into the community.
4. Share prompts and discussions.
5. Hold a closing session.
6. Collect reflections and articles.
7. Publish selected youth voices.
8. Recognize meaningful participation.
9. Continue into the next cycle.

## Locked brand decisions

- Public name: **Read & Revive / አንባቢ**
- Main message: **Read together. Reflect deeply. Revive your mind.**
- Tagline: **Reading · Sharing · Connecting**
- Primary CTA: **Join Current Reading Cycle**
- Editorial/blog name: **Voices from the Circle**
- Community promise: **You do not have to build your reading habit alone.**
- Primary audience: young people in Ethiopia, especially ages 18–30
- Public positioning: broad and welcoming, with soft Muslim values expressed through knowledge, discipline, sincerity, character, purpose, service, and modest representation
- Public website language initially: English
- Amharic name remains a first-class cultural signature

## Confirmed current inputs

- Telegram community URL: `https://t.me/ReadRevive`
- Domain: not selected yet; use environment-based site URL and a localhost fallback
- Real production content is not yet supplied
- During development, use coherent mock content that reads naturally in the public UI; do not add visible “sample,” “mock,” “future,” “placeholder,” or “to be replaced” disclaimers
- Mock content may use recognizable real books and accurate public metadata, such as *Deep Work* by Cal Newport or *Atomic Habits* by James Clear, without implying endorsement or a confirmed production selection
- Keep every mock record centralized and internally tagged with metadata such as `is_mock: true` so it can be replaced or approved through the content system before launch
- Never invent statistics, testimonials, partnerships, credentials, endorsements, or claims of real community activity
- The production launch gate must prevent internally tagged mock records from being mistaken for approved production content

## Font system

- Editorial headings: **Fraunces**
- Body and UI: **Manrope**
- Small handwritten accents: **Caveat**, used sparingly
- Amharic display support: **Menbere**
- Amharic/UI fallback requested by the project owner: **Google Sans**
- Always provide safe Ethiopic-capable fallbacks if a selected web font cannot be bundled or licensed directly
- Do not use Caveat for paragraphs, navigation, forms, or accessibility-critical text

Implementation must verify actual font availability and licensing before production. If Menbere or Google Sans cannot be self-hosted or legally served, preserve the visual role and use an approved Ethiopic fallback rather than downloading an unofficial file.

## Visual identity

The visual concept is **A Reading Journey Playground**.

### Palette

- Revive Orange: `#F97316`
- Burnt Orange: `#C2410C`
- Ink Black: `#111111`
- Charcoal: `#232323`
- Warm Paper: `#FFF7ED`
- Cream White: `#FFFCF7`
- Peach Note: `#FED7AA`
- Warm Yellow: `#FACC15`
- Success Green: `#22C55E`
- Info Sky: `#38BDF8`
- Soft Red: `#EF4444`

### Required feeling

- Editorial rather than corporate
- Playful rather than childish
- Handmade rather than messy
- Warm rather than sterile
- Gamified rather than competitive or casino-like
- Asymmetrical on the surface while using a disciplined grid underneath

### Anti-rules

Never produce:

- A generic SaaS hero with repetitive feature cards
- A rigid NGO layout
- A blue corporate education template
- Excessive equal-sized card grids
- Random gradients, blobs, or generic 3D illustrations
- Fake testimonials, numbers, or user activity
- Dense dashboards on public pages
- Image-based buttons, cards, forms, timelines, or navigation
- Long institutional copy
- Decorative clutter around article prose
- Heavy parallax, flashing, or distracting continuous animation

## Asset system

The asset library is finalized and production-ready.

- Manifest: `public/assets/manifest.json`
- Visual browser: `public/assets/gallery.html`
- Production:
  - `public/assets/brand`
  - `public/assets/doodles`
  - `public/assets/icons`
  - `public/assets/illustrations`
  - `public/assets/stickers`
  - `public/assets/dividers`
  - `public/assets/textures`
  - `public/assets/gamification`
  - `public/assets/decorations/*`
- References only:
  - `assets-source/references/ui-screens`
  - `assets-source/references/component-sheets`
- Never import:
  - `assets-source/archive`
  - rejected cells
  - source sheets

### Asset rules

- Use UI screenshots only as visual guidance.
- Use one primary visual anchor and usually one to three small accents per section.
- Reduce decoration on mobile.
- Keep article reading areas quiet.
- Use real book-cover content where the UI requires a book cover.
- Use transparent assets as overlays with correct intrinsic size.
- Decorative assets use empty alt text and no pointer events.
- Meaningful illustrations receive contextual alt text.
- Do not rename finalized production assets casually; create a typed semantic asset registry for frequently used paths.
- Build all interactive and textual UI with React and Tailwind.

## Technical direction

- Next.js App Router
- React
- TypeScript
- Tailwind CSS with a custom token-driven system
- Supabase PostgreSQL
- Supabase Auth
- Supabase Storage for dynamic uploads
- Row Level Security from the start
- Vercel deployment
- Custom admin dashboard
- Database-managed books, cycles, articles, programs, links, and forms

Static curated brand artwork stays in `public/assets`. Dynamic content such as book covers, article covers, program media, avatars, and certificates goes to Supabase Storage later.

## MVP scope

Build the public website first.

### Public routes

- `/`
- `/current-cycle`
- `/cycles/[slug]`
- `/books`
- `/books/[slug]`
- `/voices`
- `/voices/[slug]`
- `/community`
- `/programs`
- `/programs/[slug]` when useful
- `/about`
- `/contact`
- `/privacy`
- `/community-guidelines` or `/terms`

### Navigation

- Home
- Current Cycle
- Books
- Community
- Voices
- Programs
- One dominant CTA: Join Current Reading Cycle

About and Contact may be secondary/footer links. Do not show Dashboard, Profile, Leaderboard, Passport, or account actions before those systems exist.

### MVP content/admin direction

The public pages are built first. The content foundation and admin area then manage:

- Books
- Reading cycles
- Cycle schedule
- Voices posts, categories, and tags
- Programs
- Community links
- Contact messages
- Site-level featured content

Public reader login is delayed until Phase 2.

## Development mock-content policy

Until the owner supplies production content:

- Build with coherent mock books, one mock active cycle, schedules, editorial posts, authors, programs, and policy copy.
- Present mock content naturally in the development UI. Do not weaken the product experience with visible staging disclaimers such as “sample,” “future,” “fake,” “pending,” or “will be replaced.”
- Real, recognizable books may be used as development examples when their title and author metadata are accurate. A mock cycle around a real book must not imply endorsement, partnership, or confirmed real-world activity.
- Keep mock content centralized in typed data or development seeds and mark records internally with metadata such as `is_mock: true`.
- Public pages must read content through a repository/service boundary rather than importing mock records directly.
- During the Supabase content phase, migrate the mock records into the production-shaped database schema so books, cycles, schedules, voices, programs, and links can be changed from the admin dashboard without editing code.
- Never fabricate reader counts, testimonials, partnerships, awards, credentials, reviewers, attendance, or claims of completed community activity.
- Article and reader names may be coherent mock editorial records during development, but must be replaced or explicitly approved before production.
- Do not scatter mock copy through page components; make later content replacement straightforward.
- Do not use lorem ipsum.
- Before production deployment, run a content-readiness audit and remove, replace, or explicitly approve every internally tagged mock record.
## Page priorities

1. App foundation, tokens, fonts, metadata, and responsive shell
2. Home and Current Cycle
3. Cycle detail and timeline
4. Voices listing and article detail
5. Books and book detail
6. Community
7. About
8. Programs if mock content is useful
9. Contact and policy pages
10. Supabase content integration
11. Admin foundation
12. Accessibility, SEO, performance, testing, and deployment

## Component rules

Build reusable components for:

- Header, mobile navigation, and footer
- Primary, secondary, and ghost buttons
- Section headers and editorial layouts
- Book, cycle, voice, program, and reflection cards
- CTA banners
- Status and category chips
- Reading timeline
- Progress ring
- Badge/streak/leaderboard previews
- Forms and validation states
- Loading, empty, error, and not-found states
- Dialog/sheet patterns

Components must be typed, accessible, responsive, and data-driven. They must not bake in page-specific copy.

## Database direction

### Phase 1

- `profiles` for administrators/editors
- `books`
- `reading_cycles`
- `cycle_schedule`
- `blog_categories`
- `blog_tags`
- `blog_posts`
- `blog_post_tags`
- `programs`
- `community_links`
- `contact_messages`
- limited `site_settings`

### Later

- Phase 2: participants, check-ins, reflections, reader profiles
- Phase 3: badges, user badges, point transactions, streaks, leaderboards
- Phase 4: full article submissions, revision history, editorial workflow
- Phase 5: certificates and verification
- Phase 6: Telegram account linking and automation

Do not create speculative future tables merely to appear future-ready. Preserve boundaries and add them through migrations when their phase starts.

## Canonical status decisions

- Cycle: `draft`, `upcoming`, `active`, `closing`, `completed`, `archived`
- Article: `draft`, `submitted`, `under_review`, `needs_revision`, `approved`, `scheduled`, `published`, `rejected`, `archived`
- `featured` is a Boolean presentation flag, not an article status
- Program: `draft`, `open`, `full`, `upcoming`, `ongoing`, `completed`, `cancelled`

## Security and data

- Enable RLS on every exposed table.
- Anonymous users read published/public content only.
- Users edit only their own allowed data in later phases.
- Publishing and roles require editor/admin permissions.
- Never expose the Supabase service-role key.
- Validate all writes on the server.
- Rate-limit and protect public forms.
- Validate upload MIME type, dimensions, size, and authorization.
- Use migrations and generated TypeScript types.

## Accessibility and responsive requirements

- Keyboard navigation and visible focus
- WCAG AA color contrast
- State never communicated by color alone
- Proper semantic headings and landmarks
- Useful alt text and correct decorative-image behavior
- Reduced-motion support
- Large enough touch targets
- No horizontal overflow
- Test at 320px, 375px, 768px, 1024px, and wide desktop
- Current-cycle action remains easy to find on mobile
- Article typography remains comfortable on small screens

## Performance and SEO

- Optimize images and prevent layout shift.
- Prioritize only the real LCP visual.
- Lazy-load below-fold assets.
- Avoid unnecessary client components and animation weight.
- Add unique metadata, canonical URLs, Open Graph images, sitemap, robots rules, and structured article/event data where appropriate.
- Track current-cycle views, join clicks, Telegram clicks, article/book views, and form submissions.

## Working method

For each task:

1. Inspect before editing.
2. State assumptions briefly.
3. Build the smallest coherent vertical slice.
4. Reuse existing components and assets.
5. Verify types, lint, build, and relevant tests.
6. Visually inspect desktop and mobile in the browser.
7. Check browser console and missing network assets.
8. Update the relevant checklist/document when a decision changes.
9. Report completed files, verification, and genuine remaining work.

Do not stop at generating files if the requested implementation can be safely tested. Do not claim completion without verification.

## Definition of MVP success

A visitor can:

1. Understand Read & Revive immediately.
2. Discover the current book and reading plan.
3. Join the real Telegram community.
4. Explore connected books and authentic-looking mock voices.
5. Understand how reading becomes reflection, discussion, publishing, and recognition.
6. Use the experience comfortably on mobile.

The result should feel like entering an active reading circle—not viewing a template.




