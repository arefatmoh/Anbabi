# Read & Revive / አንባቢ — Database Plan

**Status:** Pre-migration architecture  
**Backend:** Supabase PostgreSQL  
**Security:** Row Level Security on every exposed table

## 1. Design principles

- Model the Reading Cycle as the central domain.
- Separate public publishing data from private user activity.
- Build only the tables required by the current phase.
- Use migrations for every schema change.
- Use constraints and transactions rather than relying on UI behavior.
- Use immutable transaction records for XP/points later.
- Archive or soft-delete important content rather than destroying history.
- Store static versioned brand assets in the repository; store dynamic uploads in Supabase Storage.

## 2. MVP table set

### Required

- `profiles` — admin/editor identities initially; reader profiles later
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
- `site_settings` — limited operational settings such as current homepage features

### Optional in MVP

- `article_interest` — lightweight interest/contact submission
- `book_suggestions`
- `admin_audit_logs` — strongly recommended for publishing and role changes

Do not build the full `article_submissions` editorial workflow unless it is intentionally pulled forward. The MVP can collect interest without pretending to support revision and author dashboards.

## 3. Core content schema

### `profiles`

Initial admin/editor profile tied one-to-one to `auth.users`.

Key fields:

- `id uuid primary key references auth.users`
- `display_name`
- `username unique nullable`
- `avatar_url`
- `bio`
- `role`
- `visibility`
- `created_at`, `updated_at`

Roles: `reader`, `writer`, `moderator`, `editor`, `admin`, `super_admin`.

XP, points, and level may be added in Phase 3 or represented through derived/transactional models. Do not make totals the sole source of truth.

### `books`

Key fields:

- identity: `id`, `slug`, `title`, `author`
- media: `cover_url`, optional `cover_alt`
- editorial: `description`, `why_selected`
- taxonomy: `category`, `themes[]`, `language`
- workflow: `status`
- timestamps

Statuses: `draft`, `recommended`, `current`, `upcoming`, `completed`, `archived`.

Add unique index on `slug`; indexes on `status`, category, and publication/display ordering as needed.

### `reading_cycles`

Key fields:

- `book_id`
- `title`, `slug`, `short_description`
- `start_date`, `end_date`, `duration_days`
- `daily_target`
- `status`
- `telegram_link`, `facebook_link`
- closing-session fields
- reviewer fields
- `rewards_description`
- `featured`
- timestamps

Statuses: `draft`, `upcoming`, `active`, `closing`, `completed`, `archived`.

Constraints:

- end date cannot precede start date
- only valid public links
- at most one active featured/current cycle, enforced transactionally or with a partial unique index where appropriate

### `cycle_schedule`

Supports daily or weekly plans:

- `cycle_id`
- `day_number` and/or `week_number`
- `title`
- `reading_target`
- `prompt`
- `due_date`
- `sort_order`

Use a unique constraint preventing duplicate schedule position within a cycle.

### `blog_categories`

- `id`, `slug`, `name`, `description`, `sort_order`, `active`

Approved initial categories:

- Reflection
- Book Review
- Personal Growth
- Leadership
- Faith & Character
- Society
- Productivity
- Reader Story
- Community Recap
- Writing & Expression

### `blog_tags`

- `id`, `slug`, `name`

### `blog_posts`

Key fields:

- `author_id`
- `related_book_id`, `related_cycle_id`
- `title`, `slug`, `subtitle`, `excerpt`, `body`
- `cover_url`, `cover_alt`
- `category_id`
- `status`
- `reading_time_minutes`
- `featured boolean`
- `scheduled_for`, `published_at`
- timestamps

Canonical statuses:

`draft`, `submitted`, `under_review`, `needs_revision`, `approved`, `scheduled`, `published`, `rejected`, `archived`.

“Featured” is a Boolean display flag, not a workflow status.

### `blog_post_tags`

- `blog_post_id`
- `tag_id`
- composite primary key

Enforce one primary category at the post level. Editorial policy allows two to four tags.

### `programs`

- `title`, `slug`, `description`
- `cover_url`, `cover_alt`
- `program_type`, `status`
- `start_date`, `end_date`
- `location`, `registration_link`
- timestamps

Statuses: `draft`, `open`, `full`, `upcoming`, `ongoing`, `completed`, `cancelled`.

### `community_links`

- `platform`
- `label`
- `url`
- `purpose`
- `active`
- `sort_order`
- timestamps

Public pages read active records only.

### `contact_messages`

- `name`, `email`
- `subject`, `message`, `message_type`
- `status` default `new`
- `created_at`

Never expose public read access. Add retention and deletion policy before launch.

### `site_settings`

Use sparingly for values that truly require operational editing, such as homepage featured IDs or contact details. Avoid turning all page composition into untyped JSON.

## 4. Phase 2 reader tables

- `cycle_participants`
- `reading_checkins`
- `reflections`

### `cycle_participants`

Unique `(cycle_id, user_id)`.

Statuses: `joined`, `active`, `behind`, `completed`, `dropped`.

Completion levels:

- `basic_finisher`
- `reflective_finisher`
- `active_finisher`
- `full_circle_finisher`
- `contributor_finisher`

### `reading_checkins`

Unique `(user_id, schedule_id)`. Store completion timestamp and optional note. Do not trust a client-supplied user ID; derive identity from authentication.

### `reflections`

Statuses: `draft`, `submitted`, `approved`, `featured`, `needs_revision`, `rejected`.

Fields include cycle, schedule, author, prompt, body, visibility, status, optional quality score, reviewer, and timestamps.

Quality scoring is internal moderation metadata and must not become a public shame mechanism.

## 5. Phase 3 gamification tables

- `badges`
- `user_badges`
- `point_transactions`
- `streaks`
- leaderboard snapshots/views as needed

### Important rules

- XP is lifetime progression.
- Reading Points are resettable competition currency.
- Point awards are configuration-driven and auditable.
- Totals should derive from transactions or be cached with reconciliation.
- Badge grants should be idempotent.
- Moderators/admins do not compete in reader leaderboards.
- Leaderboards reset weekly, per cycle, or monthly; avoid all-time dominance.

Streak rules:

- Local daily deadline at 11:59 PM using a defined user/project timezone strategy
- One grace day per week
- Maximum two stored freezes
- Catch-up within 24 hours, maximum two per cycle
- No shame-based messaging

Before implementing streaks, lock timezone behavior, job scheduling, idempotency, and correction/admin override rules.

## 6. Phase 4–6 tables

- `article_submissions` and revision/history tables
- `certificates`
- `notifications`
- Telegram account/link/event tables
- `admin_audit_logs`

Editorial history should preserve writer consent and editor changes. Certificates need immutable verification codes and private/signed file delivery where appropriate.

## 7. RLS direction

### Public/anonymous

Can read:

- published/public books
- active/upcoming/completed public cycles
- public cycle schedule items
- published blog posts and active taxonomy
- public programs
- active community links

Cannot read:

- contact messages
- drafts or scheduled/unpublished content
- private profiles or reflections
- admin metadata

### Reader

Can:

- read/update own profile within allowed fields
- join cycles and manage own progress in Phase 2
- create/read/update own eligible drafts/reflections
- read public/featured content

Cannot:

- assign roles
- publish content
- award points/badges directly
- read other users’ private data

### Moderator/editor/admin

Grant least privilege:

- moderator: reflection/community review scope
- editor: article/content review and publishing scope
- admin: operational content management
- super admin: roles and full administrative control

Use database policies plus server-side authorization. Hiding an admin link is not security.

## 8. Storage

### Repository

`public/assets`:

- logos and marks
- approved doodles
- illustrations
- static gamification art
- textures and page decorations

### Public Supabase buckets

- `book-covers`
- `blog-covers`
- `program-images`
- `badge-icons` when admin-managed later

### Controlled/private buckets

- `avatars` depending on privacy design
- `article-attachments` until publication
- `certificates`

Validate MIME type, size, dimensions, naming, and authorization. Do not permit arbitrary executable uploads.

## 9. Data access and rendering

- Use a typed content repository/service boundary so public pages do not depend directly on development mock files or Supabase query details.
- Treat centralized mock records as development seeds for the same production-shaped tables; preserve `is_mock` metadata until each record is approved or replaced.
- Once Supabase integration begins, books, cycles, schedules, Voices posts, programs, and community links must be editable through the admin dashboard without code changes.
- Fetch public content on the server where practical.
- Cache/revalidate public books, cycles, programs, and posts by publishing needs.
- Use server actions/API handlers for writes and protected operations.
- Keep the service-role key server-only.
- Generate database TypeScript types.
- Validate inputs with shared schemas.
- Use transactions for multi-record publishing and reward operations.

## 10. Analytics and privacy

Phase 1 event names should cover:

- page view
- current-cycle view
- join CTA click
- Telegram/Facebook outbound click
- book view
- voice/article view
- form submission

Do not mix product analytics into core domain tables. Collect only what is needed and disclose tracking appropriately.

## 11. Migration order

1. Extensions/enums or check constraints
2. Profiles and role helper functions
3. Books
4. Reading cycles
5. Cycle schedule
6. Blog categories/tags/posts/join table
7. Programs
8. Community links
9. Contact/interest forms
10. Site settings
11. RLS policies and storage policies
12. Seeds and tests

Future phase migrations should be separate and must not be pre-created merely to look “future-ready.”

## 12. Database readiness gates

- Final MVP field requirements confirmed with real content
- Canonical statuses represented once
- Constraints and indexes reviewed
- RLS tested for every role
- Public queries return only publishable content
- Contact data has retention and access rules
- Publishing and archive behavior tested
- Seed data cannot be mistaken for real production activity
- Backup/export and rollback procedures documented

