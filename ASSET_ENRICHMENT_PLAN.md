# Asset Enrichment Plan

This plan prepares the next visual enrichment pass for the Read & Revive / አንባቢ website. It does **not** implement UI changes. It names the assets to use, where to place them, and how to keep the site handmade without becoming crowded.

## Asset inventory summary

| Category | Files exist | Directly usable | Reference-only | Transparency/readiness | Best use |
|---|---:|---|---|---|---|
| `brand` | 12 | Yes | No | Transparent / ready | Header, footer, metadata, subtle brand marks |
| `doodles` | 90 | Yes | No | Transparent / ready | Arrows, underlines, sparkles, reading paths, empty-space accents |
| `icons` | 20 | Yes | No | Transparent / ready | Coded cards, timeline metadata, small semantic cues |
| `stickers` | 48 | Yes | No | Transparent / ready | Sticky notes, tape, stamps, paper scraps, card corners |
| `dividers` | 24 | Yes | No | Transparent / ready | Section breaks and editorial rhythm |
| `textures` | 55 | Yes, selectively | No | Mostly transparent; `warm-paper.webp` is intentionally opaque | Warm paper surfaces, subtle overlays, editorial backgrounds |
| `illustrations` | 10 | Yes | No | Transparent / ready | Hero anchors, empty states, major page visuals |
| `gamification/badges` | 12 | Yes, selectively | No | Transparent / ready | Recognition/progress moments only |
| `gamification/rewards` | 27 | Yes, selectively | No | Transparent / ready | Small reward accents near recognition only |
| `gamification/progress` | 64 | Yes, selectively | No | Transparent / ready | Progress preview and future dashboard accents |
| `decorations/*` | 264 | Yes | No | Transparent / ready | Page-specific accents for home, cycle, books, community, voices, CTA, dashboard |
| `assets-source/references` | 14 | No | Yes | Reference-only | Visual guidance only; never import as website images |

Important findings:

- Production image assets: **676**.
- Reference-only files: **14** under `assets-source/references`.
- No production assets need splitting.
- No full reference sheet should be used directly in website UI.
- No `/public/assets/arrows`, `/public/assets/badges`, `/public/assets/ui-references`, or `/public/assets/page-references` folders exist now. Arrows live in `doodles` / `decorations/cta`; badges live in `gamification/badges`.
- `warm-paper.webp` is intentionally opaque and should be used as a surface/background texture, not a floating overlay.

## Implementation principles

- Do not redesign the site from scratch; enrich the existing structure.
- Keep controls, buttons, cards, forms, timelines, nav, chips, progress bars, and text as coded React/Tailwind UI.
- Assets are decorative/anchoring layers only.
- Decorative assets must use empty alt text, `aria-hidden="true"` where needed, and `pointer-events-none`.
- Use `next/image` for placed image assets; use CSS background only for subtle textures.
- Hide or reduce 40–60% of decorative assets on mobile.
- Avoid horizontal overflow from absolute-positioned doodles.
- Keep article prose and forms especially quiet.

## Reusable component plan

The project already has the right direction with `DoodleDecoration`, `SectionDivider`, `NumberBadge`, and `DecoratedCTASection`. In the implementation pass, prefer extending these rather than creating a competing system.

Planned helper refinements:

- Extend `DoodleDecoration` or add a thin `DecorativeAsset` wrapper with:
  - `src`
  - `className`
  - `mobileHidden?: boolean`
  - `priority?: boolean` only for hero-adjacent assets
  - decorative alt defaulting to empty string
- Expand `src/lib/assets.ts` semantic keys only for assets selected below.
- Keep all chosen paths centralized in `src/lib/assets.ts` before using them repeatedly.

## Page-by-page enrichment plan

### Home

| Section | Current issue / opportunity | Asset to use | Exact file path | Placement idea | Purpose | Desktop behavior | Mobile behavior | Mobile visibility | Risk |
|---|---|---|---|---|---|---|---|---|---|
| Hero | Strong anchor exists, but left copy area can feel clean compared with the illustration. | Loop arrow doodle | `/assets/doodles/arrow-loop-orange-02.png` | Absolute near CTA row, pointing toward Join Current Reading Cycle. | Guide action and add handmade motion. | Small, rotated, low opacity beside CTA. | Remove or hide to avoid CTA crowding. | Hidden below `sm`. | Low if kept away from button text. |
| Hero | Hero annotation can feel like plain label. | Sticky note | `/assets/stickers/sticky-note-cream-taped-01.webp` | Replace/augment the “Books become circles” note as a real paper sticker background with coded text over it. | Make hero more journal-like. | Sticker behind handwritten note. | Keep only if it does not cover illustration; shrink. | Visible on mobile only if below image, not absolute-overlapping. | Medium; sticker must not obscure hero art. |
| Hero | Heading underline exists; add one tiny sparkle cluster for warmth. | Sparkle doodle | `/assets/doodles/sparkle-orange-01.png` | Near “Revive” underline, offset outside text bounds. | Add delight without changing layout. | Tiny accent only. | Hide or keep very small. | Hidden under `sm`. | Low. |
| Current Cycle preview | Current cycle card is useful but could feel more “active cycle.” | Calendar/flag accents | `/assets/decorations/current-cycle/current-cycle-accent-03.webp`, `/assets/decorations/current-cycle/current-cycle-accent-12.webp` | Add small floated calendar top-right and flag bottom-left inside/around card. | Reinforce schedule and active mission. | Two small accents max. | Hide flag; keep calendar only if enough room. | Calendar visible at `sm+`, flag hidden mobile. | Medium; avoid cluttering metadata cards. |
| Journey section | Already uses path and badges; can use stronger section rhythm before/after. | Orange loop divider | `/assets/dividers/orange-loop-divider-01.png` | Between Current Cycle and Journey, replacing or alternating existing divider. | Stronger handmade transition. | Centered divider, max width. | Smaller max width. | Visible. | Low. |
| Why Read & Revive exists | Two cards are clean; can feel less handmade. | Tape / stamp accents | `/assets/stickers/tape-orange-01.webp`, `/assets/stickers/stamp-orange-border-01.webp` | One tape on first card corner, one stamp on second card corner. | Make cards feel pinned/journal-like. | Small absolute corner accents. | Hide one accent, keep at most one per card. | Visible `sm+`; hidden below `sm`. | Medium; card text must remain clear. |
| Voices preview | Cards could connect more to editorial voice. | Quote accent | `/assets/decorations/voices/voices-editorial-accent-01.webp` | Near section heading, outside card grid. | Signal writing/reflection. | Small quote mark beside heading. | Hide. | Hidden mobile. | Low. |
| Telegram panel | Charcoal panel has illustration; could use subtle CTA motion. | Dashed arrow / open book rays | `/assets/decorations/cta/dashed-arrow-01.webp`, `/assets/decorations/cta/open-book-rays-02.webp` | One arrow toward button, one small book/rays near illustration. | Direct attention to Telegram without overpowering. | Two accents max. | Keep arrow only if layout has room; otherwise hide. | Hidden below `md`. | Medium. |
| Final CTA | Already decorated; can add subtle paper/loop depth. | Page swish / sparkle swish | `/assets/decorations/cta/page-swish-01.webp`, `/assets/decorations/cta/sparkle-swish-01.webp` | Background edge and far corner only. | Make orange band feel like branded moment. | Low opacity, absolutely positioned. | Hide page swish if it causes crowding. | Mostly hidden below `md`. | Medium; orange CTA should stay clean. |

### Current Cycle and Cycle Detail

| Section | Current issue / opportunity | Asset to use | Exact file path | Placement idea | Purpose | Desktop behavior | Mobile behavior | Mobile visibility | Risk |
|---|---|---|---|---|---|---|---|---|---|
| Cycle hero card | Book cover placeholder and metadata are coded; needs more handmade cycle identity. | Current-cycle path accent | `/assets/decorations/current-cycle/current-cycle-accent-50.webp` | Faint curved path behind metadata, clipped inside card. | Show reading journey. | Low opacity behind content. | Hide. | Hidden below `lg`. | Medium; must not reduce readability. |
| Cycle hero card | Status chip area can feel plain. | Flag accent | `/assets/decorations/current-cycle/current-cycle-accent-12.webp` | Near status chip, not replacing chip. | Add active mission feel. | Small flag beside status area. | Hide. | Hidden below `sm`. | Low. |
| Reading schedule | Timeline is coded and good; can use icons more intentionally. | Calendar, notebook, discussion, trophy icons | `/assets/icons/calendar-01.png`, `/assets/icons/notebook-01.png`, `/assets/icons/discussion-circle-01.png`, `/assets/icons/trophy-01.png` | Add one icon per timeline step header or as tiny card corner. | Make schedule scannable and handmade. | Small 28–36px icon per card. | Keep only first/current step icon or reduce size. | Visible but reduced. | Medium; avoid repeated noisy icons. |
| Reading schedule | Line/path should feel more custom. | Reading path doodle | `/assets/doodles/reading-path-loop-black-01.png` | Behind desktop timeline, not on top of text. | Stronger journey movement. | Desktop-only path. | Hide. | Hidden mobile. | Medium; may create overflow if not clipped. |
| Reflection prompts | Prompt list can feel more like workbook. | Sticky note / tape | `/assets/stickers/torn-note-taped-01.webp`, `/assets/stickers/tape-cream-01.webp` | Small paper edge inside prompt panel, top-right. | Reading-journal feel. | One accent. | Hide. | Hidden mobile. | Low. |
| Recognition | Recognition already uses reward mini; can be more intentional. | Badge / reward pair | `/assets/gamification/badges/badge-reading-04.webp`, `/assets/gamification/rewards/reward-sticker-13.webp` | Use one as main decorative accent, one very small secondary sparkle only if needed. | Gamified but non-competitive recognition. | One visible reward asset max. | Keep one small badge or hide. | Visible `sm+`; reduced mobile. | Medium; avoid implying automated achievement. |
| Telegram CTA | CTA band can use stronger route-to-action cue. | Loop arrow and book rays | `/assets/decorations/cta/loop-arrow-01.webp`, `/assets/decorations/cta/open-book-rays-01.webp` | Arrow points toward CTA; book rays near title edge. | Guide to Join on Telegram. | Two accents max. | Hide book rays; keep no more than one. | Hidden below `md`. | Low. |

### Books

| Section | Current issue / opportunity | Asset to use | Exact file path | Placement idea | Purpose | Desktop behavior | Mobile behavior | Mobile visibility | Risk |
|---|---|---|---|---|---|---|---|---|---|
| Books hero | Illustration is strong; copy side could use motion toward shelf. | Arrow pair | `/assets/decorations/books/arrow-pair-01.webp` | Between heading and illustration, angled toward book stack. | Connect browsing to discovery. | Desktop/tablet accent. | Hide. | Hidden below `md`. | Low. |
| Books hero | Empty space around hero illustration can feel too clean. | Reading sparks | `/assets/decorations/books/reading-sparks-01.webp` | Around top-right of illustration. | Add warmth and reading energy. | Small accent. | Hide or keep tiny. | Hidden below `sm`. | Low. |
| Current book panel | Good panel; could feel more like pinned shelf selection. | Bookmark / tape | `/assets/decorations/books/bookmark-cream-01.webp`, `/assets/stickers/tape-orange-01.webp` | Bookmark peeking from card; tape near corner. | Make current book feel selected by hand. | Use one bookmark plus optional tape. | Keep bookmark only if not crowding. | Visible `sm+`. | Medium. |
| Shelf filters | Filters are coded; add subtle hand-drawn emphasis near heading. | Underline doodle | `/assets/doodles/underline-arrow-orange-01.png` | Under “reading shelf” title/section heading. | Editorial emphasis. | Small, heading-aligned. | Hide. | Hidden below `sm`. | Low. |
| Empty state | Existing EmptyState can feel generic. | Empty reading illustration + star | `/assets/illustrations/empty-state-reading.webp`, `/assets/doodles/star-orange-01.png` | Use if no filter results; add tiny star outside panel. | Friendly no-results state. | Illustration max 220px. | Keep illustration smaller. | Visible. | Low. |
| Reading path section | Already has one path and badges; can use page-curl/card feel. | Page curl | `/assets/decorations/books/page-curl-01.webp` | Far corner of section container. | Book-page transition. | Top/bottom corner. | Hide. | Hidden below `md`. | Low. |
| Book detail hero | Book detail feels strong; add one directional doodle toward CTA. | Curved orange arrow | `/assets/doodles/arrow-curve-orange-03.png` | Near CTA buttons, pointing gently. | Encourage cycle action. | Small, desktop-only. | Hide. | Hidden below `md`. | Low. |
| Book detail prompt panel | Prompt panel already uses page curl; can add tag scribble sparingly. | Tag scribble | `/assets/decorations/books/tag-scribble-black-01.webp` | Above prompt heading as a tiny label accent. | Adds editorial label texture. | Small. | Hide. | Hidden below `sm`. | Medium; avoid competing with prompt text. |
| Books CTA | Final CTA already uses decorated section. | Open book + sparkle cluster | `/assets/decorations/cta/open-book-rays-01.webp`, `/assets/decorations/cta/sparkle-cluster-02.webp` | CTA corners only. | Branded action moment. | Two accents max. | Hide one or both. | Hidden below `md`. | Low. |

### Community

| Section | Current issue / opportunity | Asset to use | Exact file path | Placement idea | Purpose | Desktop behavior | Mobile behavior | Mobile visibility | Risk |
|---|---|---|---|---|---|---|---|---|---|
| Community hero | Strong illustration; can feel more lively around people/conversation. | Speech bubble / heart rays | `/assets/decorations/community/community-accent-02.webp`, `/assets/decorations/community/community-accent-40.webp` | One speech bubble near illustration, one heart near CTA/copy. | Show discussion and belonging. | Two accents max. | Keep speech bubble only if enough room. | Mostly hidden below `sm`. | Medium. |
| Platform cards | Cards are useful but could feel more connected. | Connection path | `/assets/decorations/community/community-accent-19.webp` | Light path behind platform grid, clipped by section. | Show movement between spaces. | Desktop-only background accent. | Hide. | Hidden below `lg`. | Medium; avoid confusing card hierarchy. |
| Weekly rhythm | Rhythm cards can feel more handmade. | Dashed loop arrow | `/assets/doodles/arrow-dashed-loop-orange-01.png` | Above/behind section heading, not over cards. | Visualizes weekly loop. | Large low-opacity accent. | Hide. | Hidden below `md`. | Low. |
| Closing session | Illustration section can use paper-note accent. | Torn note | `/assets/stickers/torn-note-peach-pinned-01.webp` | Near text column top edge with coded mini note text if needed. | Reading circle notebook feel. | One sticker. | Hide or place below heading only if clean. | Hidden below `md`. | Medium. |
| Principles | Principle cards have badges; can add small corner tape. | Tape / stamp | `/assets/stickers/tape-cream-01.webp`, `/assets/stickers/stamp-orange-border-01.webp` | One accent on alternating cards. | Handmade card feel. | At most one accent per 2 cards. | Hide. | Hidden below `sm`. | Medium. |
| Recognition | Good charcoal section; can use one reward badge. | Reward sticker | `/assets/gamification/rewards/reward-sticker-04.webp` | Near recognition list, not replacing text. | Reinforce non-competitive recognition. | One accent max. | Hide. | Hidden below `md`. | Medium; avoid achievement claims. |
| CTA | CTA can use community-specific action cue. | Group icon + loop arrow | `/assets/decorations/community/community-accent-25.webp`, `/assets/decorations/cta/loop-arrow-02.webp` | Group accent in far corner; arrow toward button. | “Enter the circle” feeling. | Two accents max. | Hide group; keep clean CTA. | Hidden below `md`. | Low. |

### Voices

| Section | Current issue / opportunity | Asset to use | Exact file path | Placement idea | Purpose | Desktop behavior | Mobile behavior | Mobile visibility | Risk |
|---|---|---|---|---|---|---|---|---|---|
| Voices hero | Already uses quote/star; can add editorial underline to title area. | Voices underline | `/assets/decorations/voices/voices-editorial-accent-33.webp` | Under or beside “Circle” word, not over text. | Editorial voice identity. | Small heading accent. | Hide. | Hidden below `sm`. | Low. |
| Category chips | Chip row is coded; add one small paper note nearby. | Paper note | `/assets/decorations/voices/voices-editorial-accent-05.webp` | Beside chips, offset outside flow. | Writing/reflection notebook feel. | Small, absolute. | Hide. | Hidden below `md`. | Medium. |
| Featured reflection | Card can feel too clean. | Bookmark orange | `/assets/decorations/voices/voices-editorial-accent-20.webp` | Peeking from featured card edge. | Makes featured article feel saved/marked. | One accent. | Hide if card becomes tight. | Visible `sm+`. | Medium. |
| Article stream | Existing readers/book accent is good; add divider above stream. | Leaf-dot or dashed-wave divider | `/assets/dividers/leaf-dot-divider-01.png`, `/assets/dividers/dashed-wave-divider-02.png` | Between featured and stream sections. | Gentle editorial rhythm. | Centered divider. | Smaller. | Visible. | Low. |
| Voices CTA | CTA can use quote + sparkle. | Quote / sparkle swish | `/assets/decorations/voices/voices-editorial-accent-01.webp`, `/assets/decorations/cta/sparkle-swish-01.webp` | Far corners of CTA. | Connect writing to action. | Two accents max. | Hide one. | Hidden below `md`. | Low. |

### Article Detail

| Section | Current issue / opportunity | Asset to use | Exact file path | Placement idea | Purpose | Desktop behavior | Mobile behavior | Mobile visibility | Risk |
|---|---|---|---|---|---|---|---|---|---|
| Article hero | Metadata already has note; can add tiny underline/arrow toward share actions. | Emphasis arrow | `/assets/doodles/emphasis-arrow-orange-01.png` | Near share row, pointing gently. | Encourage sharing without making it loud. | Tiny desktop accent. | Hide. | Hidden below `md`. | Low. |
| Article hero visual | Cover has rays; add no more unless page feels sparse. | Keep existing rays | `/assets/decorations/voices/voices-editorial-accent-24.webp` | Current placement is fine. | Maintain focus on article hero. | Keep. | Hide if overlaps. | Current behavior. | Low. |
| Article body | Prose must stay quiet. | Quote mark only for pullquotes | `/assets/decorations/voices/voices-editorial-accent-01.webp` | Keep only inside pullquotes; no random body doodles. | Editorial emphasis. | Existing quote mark okay. | Hide or scale down if left overflow risk. | Visible only if safe. | Medium; must not disturb reading. |
| Related reading aside | Aside can feel more pinned. | Tape strip | `/assets/stickers/tape-striped-orange-01.webp` | Top of related reading card. | Paper/card metaphor. | One tape accent. | Hide if sidebar stacks. | Hidden below `lg`. | Low. |
| More from the circle | Section can use divider before cards. | Open book divider | `/assets/dividers/open-book-divider-01.png` | Above heading or between article body and related cards. | Gentle transition out of prose. | Centered divider. | Smaller. | Visible. | Low. |
| Article CTA | Use very light CTA decoration only after article. | Book spark + corner flourish | `/assets/decorations/cta/book-spark-01.webp`, `/assets/decorations/cta/corner-flourish-01.webp` | CTA corners only. | Action after reading. | Two accents max. | Hide one. | Hidden below `md`. | Low. |

### Programs

Programs is listed in the product plan, but the current codebase does not have a full implemented `/programs` route yet. `src/app/[section]/page.tsx` currently returns `notFound()`.

| Section | Current issue / opportunity | Asset to use | Exact file path | Placement idea | Purpose | Desktop behavior | Mobile behavior | Mobile visibility | Risk |
|---|---|---|---|---|---|---|---|---|---|
| Future Programs hero | Not implemented yet; avoid pretending it exists. | No asset selected yet | N/A | Plan only after real Programs content model exists. | Avoid premature visual work. | No implementation in this pass. | No implementation. | N/A | High if built before content scope is clear. |

Decision: do not enrich Programs until a real Programs page is created and content scope is approved.

### About

| Section | Current issue / opportunity | Asset to use | Exact file path | Placement idea | Purpose | Desktop behavior | Mobile behavior | Mobile visibility | Risk |
|---|---|---|---|---|---|---|---|---|---|
| About hero | Strong but similar to Home; needs a distinct about-page paper feel. | Torn paper strip | `/assets/stickers/torn-paper-strip-01.webp` | Behind/near eyebrow or below hero copy. | Makes About feel like manifesto/journal. | Low opacity, clipped. | Hide. | Hidden below `md`. | Medium. |
| Problem section | Could use subtle texture without more illustration clutter. | Warm paper texture | `/assets/textures/warm-paper.webp` | CSS background on cream section at very low opacity/blend. | Adds tactile warmth. | Subtle full-section texture. | Keep if performant. | Visible. | Medium; avoid heavy background. |
| Reading-cycle model | Already has arrow; add a better divider before/after. | Botanical / leaf divider | `/assets/dividers/botanical-divider-01.png`, `/assets/dividers/leaf-divider-orange-01.png` | Between problem and model; maybe after model. | Human/editorial rhythm. | Centered. | Smaller. | Visible. | Low. |
| Mission / vision cards | Existing card art can be richer. | Open book + readers | `/assets/decorations/home/home-accent-10.webp`, `/assets/decorations/home/home-accent-22.webp` | Keep current, add small tape/sticker only if needed. | Keep human/reading emphasis. | One accent per card. | Hide secondary accents. | Visible `sm+`. | Medium. |
| Values cards | Values are clean; could use tiny handwritten/card details. | Circle doodle / tape | `/assets/doodles/circle-scribble-black-01.png`, `/assets/stickers/tape-cream-01.webp` | One accent per row, not every card. | Handmade values board. | Sparse. | Hide. | Hidden below `sm`. | Medium. |
| Youth-led charcoal section | Good anchor; can add one orange emphasis doodle. | Emphasis rays orange | `/assets/doodles/emphasis-rays-orange-01.png` | Near heading, outside text. | Energetic youth-led note. | Small. | Hide. | Hidden below `md`. | Low. |
| About CTA | CTA already uses shared component; add book/loop accents. | Open book rays + double loop | `/assets/decorations/cta/open-book-rays-01.webp`, `/assets/decorations/cta/double-loop-01.webp` | Far corners of CTA. | Branded action. | Two accents max. | Hide one. | Hidden below `md`. | Low. |

### Footer / global layout

| Section | Current issue / opportunity | Asset to use | Exact file path | Placement idea | Purpose | Desktop behavior | Mobile behavior | Mobile visibility | Risk |
|---|---|---|---|---|---|---|---|---|---|
| Footer brand area | Footer is clear but visually plain. | Subtle sparkle or star | `/assets/doodles/star-orange-01.png`, `/assets/doodles/spark-orange-01.png` | Near tagline, not near legal links. | Adds handmade closing note. | One tiny accent. | Hide or keep tiny. | Hidden below `sm`. | Low. |
| Footer CTA column | CTA could use doodle arrow toward Telegram. | Arrow curve cream/orange | `/assets/decorations/cta/arrow-up-01.webp` | Near Open Telegram button. | Reinforce entry point. | Small. | Hide. | Hidden below `md`. | Low. |
| Global section rhythm | Some page transitions can use consistent dividers. | SectionDivider variants | `/assets/dividers/orange-loop-divider-01.png`, `/assets/dividers/open-book-rays-divider-01.png`, `/assets/dividers/leaf-dot-divider-01.png` | Use between major page blocks only. | Brand rhythm. | Max one every 2–3 sections. | Smaller. | Visible. | Medium if overused. |
| Global cards | Cards can use paper texture/edge details. | Tape / stamp / sticker badge | `/assets/stickers/tape-orange-01.webp`, `/assets/stickers/stamp-orange-border-01.webp`, `/assets/stickers/sticker-badge-cream-01.webp` | Only on highlighted cards. | Handmade journal style. | Sparse. | Mostly hidden. | Hidden below `sm` except special cards. | Medium. |

## Assets planned for immediate enrichment pass

Primary assets likely to be used first:

- `/assets/doodles/arrow-loop-orange-02.png`
- `/assets/doodles/arrow-curve-orange-03.png`
- `/assets/doodles/emphasis-arrow-orange-01.png`
- `/assets/doodles/emphasis-rays-orange-01.png`
- `/assets/doodles/sparkle-orange-01.png`
- `/assets/doodles/star-orange-01.png`
- `/assets/doodles/reading-path-loop-black-01.png`
- `/assets/stickers/sticky-note-cream-taped-01.webp`
- `/assets/stickers/torn-note-taped-01.webp`
- `/assets/stickers/torn-note-peach-pinned-01.webp`
- `/assets/stickers/torn-paper-strip-01.webp`
- `/assets/stickers/tape-orange-01.webp`
- `/assets/stickers/tape-cream-01.webp`
- `/assets/stickers/tape-striped-orange-01.webp`
- `/assets/stickers/stamp-orange-border-01.webp`
- `/assets/dividers/orange-loop-divider-01.png`
- `/assets/dividers/open-book-divider-01.png`
- `/assets/dividers/leaf-dot-divider-01.png`
- `/assets/dividers/dashed-wave-divider-02.png`
- `/assets/textures/warm-paper.webp`
- `/assets/decorations/cta/dashed-arrow-01.webp`
- `/assets/decorations/cta/loop-arrow-01.webp`
- `/assets/decorations/cta/loop-arrow-02.webp`
- `/assets/decorations/cta/open-book-rays-01.webp`
- `/assets/decorations/cta/open-book-rays-02.webp`
- `/assets/decorations/cta/page-swish-01.webp`
- `/assets/decorations/cta/sparkle-swish-01.webp`
- `/assets/decorations/current-cycle/current-cycle-accent-03.webp`
- `/assets/decorations/current-cycle/current-cycle-accent-12.webp`
- `/assets/decorations/current-cycle/current-cycle-accent-50.webp`
- `/assets/decorations/books/arrow-pair-01.webp`
- `/assets/decorations/books/bookmark-cream-01.webp`
- `/assets/decorations/books/page-curl-01.webp`
- `/assets/decorations/community/community-accent-19.webp`
- `/assets/decorations/community/community-accent-25.webp`
- `/assets/decorations/community/community-accent-40.webp`
- `/assets/decorations/voices/voices-editorial-accent-01.webp`
- `/assets/decorations/voices/voices-editorial-accent-05.webp`
- `/assets/decorations/voices/voices-editorial-accent-20.webp`
- `/assets/gamification/badges/badge-reading-04.webp`
- `/assets/gamification/rewards/reward-sticker-04.webp`
- `/assets/gamification/rewards/reward-sticker-13.webp`

## Files planned to modify during implementation

No UI files are modified by this plan. If approved later, the enrichment pass should likely touch:

- `src/lib/assets.ts` → add semantic keys for newly selected assets.
- `src/components/ui/doodle-decoration.tsx` → extend to support direct `src` or more typed asset keys.
- `src/components/ui/decorated-cta-section.tsx` → support richer but controlled accent packs.
- `src/components/ui/section-divider.tsx` → add divider variants selected above.
- `src/components/home/home-page.tsx`
- `src/components/cycle/current-cycle-hero.tsx`
- `src/components/cycle/cycle-detail-page.tsx`
- `src/components/cycle/reading-timeline.tsx`
- `src/components/books/books-listing-page.tsx`
- `src/components/books/book-detail-page.tsx`
- `src/components/community/community-page.tsx`
- `src/components/voices/voices-listing-page.tsx`
- `src/components/voices/article-detail-page.tsx`
- `src/components/about/about-page.tsx`
- `src/components/layout/site-footer.tsx`

## Missing assets or splitting needs

- No production asset needs splitting.
- Reference sheets under `assets-source/references` are not production assets and should not be used directly.
- `/public/assets/arrows` does not exist; use doodle arrows from `/public/assets/doodles` and CTA arrows from `/public/assets/decorations/cta`.
- `/public/assets/badges` does not exist; use `/public/assets/gamification/badges`.
- Programs page is not implemented yet; do not enrich it until page/content scope exists.

## Risks and guardrails

- **Over-decoration risk:** highest on Home, Community, Books, and CTA bands. Limit most sections to 1–3 accents.
- **Mobile crowding risk:** hide most absolute-positioned assets below `sm` or `md`.
- **Article readability risk:** keep decoration outside prose except pullquotes and one sidebar/card accent.
- **Performance risk:** avoid repeating large illustrations or large texture backgrounds; lazy-load below-fold decorative imagery.
- **Overflow risk:** every absolute asset must live inside `relative overflow-hidden` or be positioned within safe container bounds.
- **Meaning risk:** badges/rewards should decorate recognition only; they must not imply real scores, completed awards, or verified participation.

## Acceptance criteria for the enrichment implementation

- Website still uses coded UI components for all controls and content.
- Decorative assets have empty alt text and do not intercept pointer events.
- No reference sheet is imported or rendered as production art.
- No mobile horizontal overflow at 320px, 375px, 768px, 1024px, and desktop.
- Article body remains quiet and readable.
- `npm run check` passes.
- `npm run build` passes.
- Browser visual pass confirms assets load and do not cover text or buttons.

