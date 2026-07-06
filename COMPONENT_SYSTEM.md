# Read & Revive / አንባቢ — Component System

**Status:** Architecture and design reference  
**Rule:** Components provide consistency without producing a generic component-library appearance.

## 1. Principles

- Build semantic, accessible React components.
- Style from shared tokens, not scattered one-off values.
- Keep public experiences editorial and alive; keep admin experiences operationally clear.
- Use composition before adding dozens of variants.
- Use images as content or decoration, never as controls.
- Keep server-rendered content as the default and add client behavior only where interaction requires it.
- Treat third-party primitives as accessibility foundations, not visual design.

## 2. Token system

### Color

```text
brand-orange       #F97316
brand-orange-deep  #C2410C
ink                #111111
charcoal           #232323
paper              #FFF7ED
cream              #FFFCF7
peach              #FED7AA
celebration        #FACC15
success            #22C55E
info               #38BDF8
danger              #EF4444
```

Define foreground pairs for every surface and verify WCAG AA. Orange is an action/accent color, not the default background for every section.

### Typography

- `font-display`: editorial serif; headings and major numerals
- `font-body`: readable sans-serif; body and controls
- `font-note`: handwritten accent; short annotations only

Recommended ranges:

- Body desktop: 16–18px
- Body mobile: 15–16px
- Article body: 18–20px, line height 1.7–1.9
- Labels: 12–14px
- Display sizes: responsive `clamp()` scale, never fixed oversized text

### Layout

- Desktop content width: 1180–1280px
- Article measure: 650–760px
- Desktop section padding: 80–120px
- Tablet section padding: 64–80px
- Mobile section padding: 48–64px
- Mobile horizontal padding: 20–24px
- Standard component gaps: 8, 12, 16, 24, 32px

### Shape and depth

- Main cards: 24–36px radius
- Buttons: pill or approximately 16px radius
- Modals/sheets: approximately 32px where appropriate
- Thin ink borders, warm soft shadows, occasional offset “paper” shadows
- Only 10–20% of decorative/card elements may be visibly tilted

### Motion

- Fast feedback: 120–180ms
- Standard transition: 180–260ms
- Section reveal maximum: roughly 400ms
- Button hover: subtle `translateY(-2px)` and/or arrow shift
- Avoid heavy parallax and continuous decorative motion
- Respect reduced motion

## 3. Component layers

### Primitives

- `Button`
- `LinkButton`
- `IconButton`
- `Input`
- `Textarea`
- `Select`
- `Checkbox`
- `RadioGroup`
- `Label`
- `FormMessage`
- `Badge`
- `Chip`
- `Avatar`
- `Progress`
- `Dialog`
- `Sheet`
- `Tooltip`

### Layout

- `Container`
- `Section`
- `Stack`
- `Cluster`
- `EditorialGrid`
- `ArticleLayout`
- `SiteHeader`
- `MobileNavigation`
- `SiteFooter`

### Brand presentation

- `BrandLogo`
- `SectionHeader`
- `StickerLabel`
- `DoodleDecoration`
- `PaperPanel`
- `QuotePullout`
- `CTASection`
- `EmptyState`

### Domain components

- `BookCard`
- `BookCover`
- `BookMetadata`
- `CycleCard`
- `CurrentCycleHero`
- `CycleStatus`
- `ReadingTimeline`
- `TimelineStep`
- `CommunityPlatformCard`
- `VoiceCard`
- `ArticleByline`
- `RelatedReading`
- `ProgramCard`

### Gamification preview/future

- `ProgressRing`
- `StreakCard`
- `BadgeCard`
- `BadgeShelf`
- `LeaderboardPreview`
- `CompletionLevel`
- `ReaderPassportPreview`

MVP versions are presentational previews driven by real/manual aggregate data. They must not imply personal tracking exists before accounts are launched.

## 4. Button family

### Primary

- Orange fill, ink or high-contrast text
- Strong enough for one page-primary action
- Main use: Join Current Reading Cycle
- Warm shadow and restrained hover lift

### Secondary

- Cream/paper fill
- Ink border
- Use for Explore Books, Read Article, Learn More

### Ghost/editorial link

- Minimal surface
- Underline, hand-drawn emphasis, or arrow movement
- Use for tertiary navigation

Rules:

- Keep labels action-specific.
- Never embed button text inside an asset.
- Provide loading and disabled states.
- Preserve visible keyboard focus.
- Avoid multiple primary buttons in one visual group.

## 5. Card system

Cards share spacing and accessibility behavior, not identical appearance.

### Book card

- Cover with stable aspect ratio
- Title, author, theme/category
- Cycle or reading status
- Optional related-voice count
- Entire-card link only when nested controls are absent

### Cycle card

- Book/cycle identity
- Status and dates
- Target/duration
- Direct next action

### Voice card

- Article title and excerpt
- Author, category, reading time, date
- Related book/cycle
- Layout variants: featured, standard, compact

### Program card

- Type, title, status, dates, format/location
- Registration state

### Decorative discipline

- Use at most one strong sticker/decoration treatment per card.
- Avoid applying the same tilt, shadow, and doodle to every card.
- Do not make all sections a three-column grid.

## 6. Timeline system

`ReadingTimeline` owns layout; `TimelineStep` owns state.

States:

- `completed`: green plus icon/text cue
- `current`: orange, emphasized, optional restrained pulse
- `upcoming`: cream with outline
- `missed`: soft red plus explicit text/icon
- `closing`: flag/session cue

Desktop may use a curved journey path. Mobile must use a readable vertical sequence. Content and state remain identical across layouts.

## 7. Status and taxonomy

Use one canonical status presentation map:

- Cycle: draft, upcoming, active, closing, completed, archived
- Voice: draft, submitted, under review, needs revision, approved, scheduled, published, rejected, archived
- Program: draft, open, full, upcoming, ongoing, completed, cancelled

Status styles include text and icon/shape, never color alone.

Primary categories and freeform tags are distinct. Do not use the same chip style for workflow status and editorial taxonomy.

## 8. Forms

MVP forms:

- Contact
- Book suggestion
- Article interest
- Partnership/volunteer interest

Requirements:

- Persistent labels
- Helpful descriptions
- Server and client validation based on the same schema
- Field-level errors
- Submit, success, error, and retry states
- Spam protection and rate limits
- Clear privacy/consent copy

Do not open newsletter popups immediately on page load.

## 9. Navigation and footer

### Header

- Approved logo lockup
- Primary navigation
- One current-cycle CTA
- Active-route state
- Accessible mobile menu

### Footer

- Charcoal background
- Short movement description
- Current cycle, books, community, voices, programs, about/contact links
- Real social/community links
- Newsletter only when the operational workflow exists
- Legal links

## 10. Decoration API

`DoodleDecoration` should accept a known asset key rather than arbitrary string paths.

Suggested conceptual props:

- asset key
- size
- placement
- rotation
- opacity
- decorative/meaningful alt behavior
- responsive visibility

Rules:

- Decorative assets use empty alt and are hidden from assistive technology.
- Meaningful illustrations receive contextual alt text.
- Decorations should not influence document order.
- Disable pointer events.
- Do not rely on them to communicate state.

## 11. Article reading components

- `ArticleHeader`
- `ArticleByline`
- `ArticleBody`
- `ArticleTOC` for longer content
- `PullQuote`
- `RelatedBook`
- `ShareActions`
- `AuthorNote`
- `RelatedVoices`
- `ArticleCycleCTA`

Article prose must preserve readable measure and vertical rhythm. Decorative flourishes stay outside dense reading areas.

## 12. Loading, empty, error, and not-found states

Every data-driven region defines all four:

- Loading preserves layout without excessive skeleton animation.
- Empty state explains what is absent and gives a next step.
- Error state is honest and recoverable.
- Not-found state links to current cycle, books, or voices.

Approved tone is encouraging, never blame-based. Example: “Your streak paused, but your journey did not.”

## 13. Admin component rules

- Reuse tokens and primitives.
- Prefer tables/forms where they improve work.
- Reduce doodles and decorative assets.
- Add confirmation for destructive or publishing actions.
- Expose status, validation, preview, and unsaved changes clearly.
- Enforce permissions on the server/database, not just in navigation.

## 14. Component definition of done

- Typed API and documented variants
- Accessible semantics and keyboard behavior
- Responsive at mobile/tablet/desktop
- Light and dark/charcoal surface compatibility where used
- Loading/disabled/error behavior
- Reduced-motion behavior
- No baked-in page copy
- No arbitrary asset imports when a registry key exists
- Visual QA against the UI references without copying their dense layouts literally
