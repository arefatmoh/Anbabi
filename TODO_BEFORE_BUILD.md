# Read & Revive / አንባቢ — TODO Before Build

**Status:** Final pre-development decisions  
**Current readiness:** Planning and assets are ready; the items below are content, operational, and environment inputs—not reasons to redesign the system.

## Must decide before project initialization

- [ ] Confirm the repository/project name.
- [ ] Confirm the production domain and preferred `www` behavior.
- [ ] Confirm whether the codebase starts in this asset workspace or a new app repository.
- [ ] Select the final font licenses/files:
  - editorial serif
  - body sans-serif
  - small handwritten accent
- [ ] Confirm browser support targets.
- [ ] Confirm who can approve design, content, and production deployment.

## Must provide before real page population

- [ ] Active or upcoming reading cycle:
  - title
  - selected book and author
  - licensed/high-quality cover
  - start/end dates
  - daily/weekly target
  - why selected
  - intended reader
  - schedule and prompts
  - closing-session information
  - real rewards/recognition
- [ ] Official Telegram and Facebook URLs.
- [ ] Official contact email and social links.
- [ ] At least three real books with descriptions and covers.
- [ ] At least three publication-ready Voices articles.
- [ ] Author names, permissions, bios if used, and related book/cycle data.
- [ ] About-page factual history, team description, and any real trust metrics.
- [ ] Real programs/events or approval to hide Programs at launch.

## Content decisions to confirm

- [ ] Confirm English-only MVP or identify exact Amharic content to support at launch.
- [ ] Approve final homepage hero and subheadline.
- [ ] Approve public use of “young people in Ethiopia” as the broad audience phrase.
- [ ] Confirm whether reviewer/expert names and photos can be published.
- [ ] Confirm article consent and editing approval process.
- [ ] Confirm whether article interest is a simple contact form or a file/text submission in MVP.
- [ ] Define content owner and publishing cadence.
- [ ] Decide whether newsletter collection is operational at launch; omit it if not.

## Community and operations

- [ ] Assign:
  - admin
  - community moderator
  - content editor
  - reading-cycle coordinator
  - reviewer/expert contact
- [ ] Finalize public community rules.
- [ ] Confirm moderation escalation and member privacy rules.
- [ ] Confirm the weekly community rhythm is operationally realistic.
- [ ] Confirm how manual recognition is selected and announced.
- [ ] Establish permission before publishing member reflections or names.
- [ ] Define response ownership for contact and partnership messages.

## Legal, safety, and privacy

- [ ] Draft privacy policy.
- [ ] Draft terms/community guidelines.
- [ ] Define contact-message retention.
- [ ] Define image, article, and reflection consent.
- [ ] Confirm whether users under 18 are in scope; current primary audience is 18–30.
- [ ] Decide analytics provider and consent requirements.
- [ ] Define acceptable-use and content-removal process.
- [ ] Confirm rights to book covers, article images, and uploaded media.

## Technical accounts and access

- [ ] Create/confirm GitHub organization or repository access.
- [ ] Create Supabase organization/project.
- [ ] Create Vercel project/team.
- [ ] Configure local, preview, and production environments.
- [ ] Establish secret ownership and rotation process.
- [ ] Identify production admin accounts.
- [ ] Decide email provider if admin notifications are required.
- [ ] Decide spam protection/rate-limiting approach.
- [ ] Define database backup/export schedule.

## Design and asset checks

- [x] Production assets separated from references.
- [x] Checkerboards removed and transparency validated.
- [x] Brand logo/mark/icon variants added.
- [x] Books-page decoration pack available.
- [x] CTA decoration assets corrected and isolated.
- [x] Asset manifest and gallery available.
- [ ] Select a small first-use shortlist from the 676 assets for:
  - homepage
  - current cycle
  - books
  - voices
  - community
- [ ] Choose one final hero illustration candidate.
- [ ] Confirm real photography policy and source if photography is used.
- [ ] Confirm final type pairing against the approved logos.

## Decisions already locked—do not reopen casually

- Brand name: Read & Revive / አንባቢ
- Main CTA: Join Current Reading Cycle
- Tagline: Reading · Sharing · Connecting
- Blog identity: Voices from the Circle
- Broad public audience with soft Muslim values
- Current Reading Cycle as the main product focus
- Warm paper, orange, black, editorial, handmade visual identity
- Public MVP before reader accounts
- Next.js + React + TypeScript + Tailwind CSS
- Supabase + RLS + custom admin
- Vercel deployment
- Static brand assets in `public/assets`
- Dynamic editorial/user media in Supabase Storage
- UI controls built as React/Tailwind components, not flattened images
- Development mocks read naturally in the UI, stay internally tagged, and are replaced or approved at the production launch gate

## Known ambiguities already resolved

- `/current-cycle` is the stable active-cycle route; `/cycles/[slug]` is the canonical detail/archive route.
- “Featured” is a blog presentation flag, not an article workflow status.
- Full article submission/revision workflow is Phase 4; MVP may collect interest.
- Earlier four-phase roadmaps are summaries; the seven-phase technical roadmap is canonical.
- Point awards remain configurable; streak principles and level thresholds are planning defaults.
- Public site content starts in English; አንባቢ remains a first-class cultural signature.

## Build-start gate

Development can start when these five inputs are available:

1. Repository/domain/environment ownership
2. Final font choice
3. Real current-cycle content
4. Real community/contact links
5. Named content/admin approvers

Other content can be integrated progressively without blocking the technical foundation.


