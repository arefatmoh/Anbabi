# Read & Revive / አንባቢ — Implementation Checklist

**Status:** Implementation in progress  
**Rule:** Complete public MVP foundations before reader-account or automated gamification work.

## Phase 0 — Decisions and inputs

- [x] Consolidate brand, product, content, community, UI, gamification, and technical plans.
- [x] Finalize and validate production asset library.
- [x] Add approved brand logo, mark, and icon exports.
- [x] Separate production assets from references and source masters.
- [ ] Confirm primary domain and canonical site URL.
- [ ] Confirm final Telegram, Facebook, Instagram, and contact links.
- [ ] Confirm real launch content owners and admin users.
- [ ] Select final licensed web fonts.
- [ ] Provide current cycle content and actual dates.
- [ ] Provide at least three real books and high-quality cover images.
- [ ] Provide at least three publishable articles with author permission.
- [ ] Confirm current programs or decide to hide the Programs route at launch.
- [ ] Confirm privacy policy, terms, and content consent requirements.

## Foundation

- [x] Initialize Next.js App Router project with TypeScript.
- [x] Configure Tailwind CSS and custom design tokens.
- [ ] Establish local, preview, and production environments.
- [ ] Create Supabase and Vercel projects.
- [x] Configure environment variables without exposing service-role credentials.
- [x] Add linting, formatting, type checking, and build commands.
- [x] Establish route groups and component folders.
- [x] Create metadata defaults, sitemap, robots rules, and not-found experience.
- [x] Configure image optimization and remote-image allowlist if needed.
- [x] Add reduced-motion and accessibility foundations.

## Design system

- [x] Implement approved color tokens.
- [x] Implement serif, sans-serif, and limited handwritten font roles.
- [x] Define spacing, container widths, radii, borders, shadows, and motion tokens.
- [x] Build primary, secondary, and ghost button variants.
- [x] Build chips, status labels, inputs, cards, section headers, and CTA patterns.
- [x] Build responsive navbar, mobile menu, and footer.
- [x] Create coded texture/background utilities rather than image-based layout controls.
- [x] Create a typed asset registry for repeated asset paths.
- [x] Verify every used decorative asset at mobile and desktop sizes.
- [x] Confirm visual rhythm does not become repetitive or card-heavy.

## Data foundation

- [x] Create migration workflow.
- [x] Create MVP content tables.
- [x] Add constraints, timestamps, slugs, and indexes.
- [x] Add status enums/check constraints.
- [x] Enable RLS on every exposed table.
- [x] Add public read policies for published content only.
- [x] Add admin/editor policies for content management.
- [x] Seed development with centralized, internally tagged mock data that reads naturally in the UI.
- [x] Add a typed content repository boundary between pages and the development mock dataset.
- [x] Seed the mock dataset into production-shaped Supabase tables during the data phase.
- [ ] Manage database-backed books, cycles, schedules, Voices, programs, and links through the admin dashboard rather than code edits.
- [ ] Create generated TypeScript database types.
- [x] Verify no service-role key reaches client bundles.

## Shared components

- [x] `SiteHeader`
- [x] `MobileNavigation`
- [x] `SiteFooter`
- [x] `Container`
- [x] `Section`
- [x] `SectionHeader`
- [x] `PrimaryButton`, `SecondaryButton`, `GhostLink`
- [x] `StatusChip`, `CategoryChip`
- [x] `BookCard`
- [ ] `CycleCard`
- [x] `CurrentCycleHero`
- [x] `ReadingTimeline`
- [x] `VoiceCard`
- [ ] `ProgramCard`
- [x] `ProgressPreview`
- [ ] `BadgePreview`
- [x] `DoodleDecoration`
- [x] `EmptyState`
- [ ] Form fields, validation messages, and submit states

## Public pages

### Home

- [x] Hero explains the movement in one screen.
- [x] Current cycle is visible without searching.
- [ ] Primary CTA reads “Join Current Reading Cycle.”
- [ ] “How it works” explains the cycle, not generic benefits.
- [x] Gamification is previewed honestly as the experience direction.
- [ ] Voices from the Circle uses real content.
- [x] Final CTA returns to the current cycle/community.

### Current cycle and cycle detail

- [ ] Show real book, author, dates, status, duration, and target.
- [x] Explain why the book was selected and who should join.
- [x] Render timeline responsively.
- [ ] Show Telegram/Facebook destinations and what happens after clicking.
- [ ] Show closing-session information only when confirmed.
- [x] Show reward/recognition language without implying unavailable automation.
- [ ] Provide no-active-cycle empty state.

### Books

- [x] Support status/category/theme discovery without over-filtering.
- [x] Link books to related cycles and voices.
- [ ] Use real covers and descriptive alt text.
- [x] Provide meaningful empty and loading states.

### Voices from the Circle

- [x] Use one primary category plus two to four tags per article.
- [x] Display author, excerpt, category, reading time, date, and related book.
- [x] Keep article width readable.
- [x] Include related content and current-cycle CTA.
- [ ] Avoid generic or AI-generated placeholder articles in production.

### Community

- [x] Explain roles of Telegram, Facebook, and the website.
- [x] Show community rules and weekly rhythm.
- [ ] Make join links visible and trackable.
- [x] Do not present invented community statistics.

### About, Programs, Contact

- [x] About tells the problem, model, values, and movement story concisely.
- [ ] Programs display status and registration only when real.
- [x] Contact supports relevant inquiry types.
- [ ] Forms have validation, success, error, rate-limit, and spam protection.

## Admin MVP

- [ ] Admin authentication.
- [ ] Role-protected admin routes.
- [ ] CRUD for books.
- [ ] CRUD for reading cycles and schedules.
- [ ] CRUD for Voices posts, categories, and tags.
- [ ] CRUD for programs and community links.
- [ ] Contact-message inbox and status handling.
- [ ] Media upload validation.
- [ ] Draft, preview, publish, schedule, and archive behavior.
- [ ] Audit important publishing actions.

## Content readiness

- [ ] Final homepage copy approved.
- [ ] Active cycle has all required fields.
- [ ] Community links tested.
- [ ] Article authors and permissions confirmed.
- [ ] Copy uses approved voice and preferred vocabulary.
- [ ] No fabricated testimonials, statistics, partnerships, credentials, endorsements, or claims of real activity.
- [ ] Every `is_mock` record is replaced or explicitly approved before production.
- [x] All images have meaningful alt text or empty alt when decorative.
- [ ] Embedded image text is avoided.
- [ ] Legal/contact information is accurate.

## Accessibility and responsiveness

- [ ] Keyboard navigation works end to end.
- [ ] Focus indicators are visible.
- [ ] Minimum tap targets are respected.
- [ ] Text/background contrast passes WCAG AA.
- [ ] State is not communicated by color alone.
- [ ] Motion respects `prefers-reduced-motion`.
- [x] Decorative assets do not intercept pointer or screen-reader interaction.
- [x] Article typography is comfortable on small screens.
- [x] Current-cycle CTA remains discoverable on mobile.
- [x] Test at 320px, 375px, 768px, 1024px, and wide desktop.

## Performance, SEO, analytics

- [ ] Optimize and size images correctly.
- [ ] Avoid shipping unused illustration variants.
- [ ] Keep animation libraries and client components scoped.
- [ ] Validate Core Web Vitals.
- [ ] Add unique title, description, canonical, and Open Graph data per page.
- [ ] Add structured data where appropriate for articles/events.
- [ ] Install privacy-conscious analytics.
- [ ] Track current-cycle views and join CTA clicks.
- [ ] Track Telegram/Facebook outbound clicks.
- [ ] Track book/article views and form submissions.

## Security and quality assurance

- [ ] RLS policies tested as anonymous, reader, editor, and admin.
- [ ] Admin routes cannot be protected only in the UI.
- [ ] Forms sanitize and validate server-side.
- [ ] Upload type and size restrictions enforced.
- [ ] Error states do not expose secrets.
- [ ] External links use safe target behavior.
- [ ] All routes have loading, empty, error, and not-found behavior where relevant.
- [x] No missing images or browser-console errors.
- [x] Production build succeeds.
- [ ] Preview deployment receives stakeholder approval.

## Launch gate

- [ ] Domain and HTTPS active.
- [ ] Production Supabase project and policies verified.
- [ ] Production admin account secured.
- [ ] Real content loaded and proofread.
- [ ] Contact/community destinations tested from mobile.
- [ ] Analytics verified without storing unnecessary personal data.
- [ ] Backup/export procedure documented.
- [ ] Rollback path documented.
- [x] Programs page hidden if it has no real content.
- [ ] Public site has no references to unavailable account features.

## Post-launch, before Phase 2

- [ ] Review real CTA conversion and community clicks.
- [ ] Interview readers about the cycle-page clarity.
- [ ] Review mobile analytics and performance.
- [ ] Document content/admin pain points.
- [ ] Validate gamification assumptions with manual community operations.
- [ ] Freeze the Phase 2 account scope before schema expansion.








