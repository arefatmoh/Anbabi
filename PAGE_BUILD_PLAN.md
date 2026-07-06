# Read & Revive / አንባቢ — Page Build Plan

**Status:** Canonical page and route reference  
**Approach:** Public conversion journey first; admin and future account experiences follow.

## 1. Canonical sitemap

| Experience             | Route                               |                   MVP | Primary purpose                                        |
| ---------------------- | ----------------------------------- | --------------------: | ------------------------------------------------------ |
| Home                   | `/`                                 |                   Yes | Explain movement and drive current-cycle participation |
| Current cycle shortcut | `/current-cycle`                    |                   Yes | Resolve to/show the active cycle                       |
| Cycle detail           | `/cycles/[slug]`                    |                   Yes | Show a specific active, upcoming, or past cycle        |
| Books                  | `/books`                            |                   Yes | Discover books and their connected cycles/content      |
| Book detail            | `/books/[slug]`                     |                   Yes | Understand a book and its Read & Revive context        |
| Voices listing         | `/voices`                           |                   Yes | Discover youth-generated writing                       |
| Voice detail           | `/voices/[slug]`                    |                   Yes | Read an article comfortably and continue the journey   |
| Community              | `/community`                        |                   Yes | Explain and enter Telegram/Facebook community spaces   |
| Programs               | `/programs`                         | Yes if content exists | Discover workshops, sessions, and events               |
| Program detail         | `/programs/[slug]`                  |             If needed | Understand and register for a real program             |
| About                  | `/about`                            |                   Yes | Build trust and explain the movement                   |
| Contact                | `/contact`                          |                   Yes | Receive inquiries and participation interest           |
| Privacy                | `/privacy`                          |    Launch requirement | Explain data handling                                  |
| Terms/community policy | `/terms` or `/community-guidelines` |    Launch requirement | Set participation/content expectations                 |

`/current-cycle` is a stable visitor-facing destination. It should render the active cycle directly or redirect to `/cycles/[slug]`. If there is no active cycle, it shows the next upcoming cycle or a purposeful empty state.

## 2. Navigation

### Desktop

Logo → Home, Current Cycle, Books, Community, Voices, Programs → primary CTA

About and Contact may live in the footer or a compact secondary menu. Keep the main navigation focused.

### Mobile

- Compact logo/mark
- Clear menu trigger
- Full-screen or sheet menu with generous targets
- Current-cycle CTA remains visually dominant
- Sticky cycle CTA only on relevant pages, never globally intrusive

## 3. Global page rhythm

1. Establish purpose quickly.
2. Show the most relevant next action.
3. Offer evidence or context.
4. Connect the page to books, cycles, voices, or community.
5. End with a useful next step.

Avoid dead ends. Most pages should link back to the active cycle, related reading, or community.

## 4. Home page

### Goal

Turn an unfamiliar visitor into someone who understands the movement and enters the active cycle.

### Recommended sequence

1. **Hero**
   - Headline: “Read together. Reflect deeply. Revive your mind.”
   - Short description for young readers in Ethiopia
   - Primary CTA: Join Current Reading Cycle
   - Secondary CTA: Explore Books
   - One strong reading/community illustration

2. **Current Reading Cycle**
   - Largest product section after hero
   - Book cover, title, author, status, dates, progress/timeline preview
   - Why this book
   - Community destination

3. **How the circle works**
   - Read → Reflect → Discuss → Write/Share
   - Use a path or timeline, not four identical corporate cards

4. **Visible motivation**
   - Preview streaks, badges, progress, and recognition honestly
   - Label future or manual community recognition accurately

5. **Why Read & Revive exists**
   - Problem and solution in short editorial storytelling
   - No NGO report language

6. **Voices from the Circle**
   - One featured article and two supporting items
   - Real author, category, related book, and reading time

7. **Community invitation**
   - Explain why Telegram and Facebook have different roles
   - Show real join links

8. **Programs or upcoming moments**
   - Include only when actual content exists

9. **Final CTA**
   - Return to the current cycle

### Mobile priority

Hero → current cycle → join CTA → how it works → voices. Decorative storytelling must not push the active cycle too far below the fold.

## 5. Current Reading Cycle

### Goal

Answer every question a visitor needs before joining.

### Required content

- Cycle title and status
- Book title, author, and cover
- Start/end dates and duration
- Daily or weekly target
- Why the book was selected
- Who should join
- Reading schedule
- Reflection/discussion preview
- Telegram/Facebook links
- Closing-session details when confirmed
- Recognition/reward details when real
- Related voices and past-cycle context

### Layout

- Treat it as an active mission, not a standard product detail page.
- Use an editorial intro plus a path-like timeline.
- Desktop timeline may curve; mobile timeline becomes vertical.
- Status states: completed, current, upcoming, missed, closing.
- Add a mobile sticky join CTA after the main CTA scrolls out of view.

### Empty/upcoming states

- No active cycle: show upcoming cycle if available.
- No upcoming cycle: invite newsletter/community participation and show recent completed cycles.
- Never fabricate dates or progress.

## 6. Books and book detail

### Books page

- Intro connecting books to cycles, not a generic catalog.
- Featured/current book treatment.
- Lightweight filters: status, category/theme, language if useful.
- Cards show cover, title, author, category/theme, cycle status, and connected voices.
- Use asymmetrical editorial grouping occasionally; do not use endless equal grids.

### Book detail

- Book identity and summary
- Why Read & Revive selected/recommends it
- Themes and reader fit
- Related/current/past cycles
- Related Voices articles
- Next action based on state: join active cycle, view completed cycle, or explore related reading

## 7. Voices from the Circle

### Listing goal

Make youth writing feel editorially credible and clearly born from the reading movement.

### Listing structure

- Editorial masthead
- Featured voice
- Category discovery
- Article stream with varied visual rhythm
- Related current-cycle invitation

### Article card

- Title
- Excerpt
- Author
- Primary category
- Publish date
- Reading time
- Related book/cycle when available

### Article detail

- Comfortable 650–760px reading measure on desktop
- Title, subtitle/excerpt, author, category, tags, date, reading time
- Related book/cycle
- Optional pull quotes and table of contents for long pieces
- Author context without inventing credentials
- Share controls
- Related voices
- Final CTA: join the current reading cycle

## 8. Community

### Goal

Set expectations and help visitors choose the correct community entry point.

### Sections

- “Welcome to the circle” introduction
- Telegram: active reading and discussion
- Facebook: visibility, updates, and articles
- Weekly rhythm
- Community rules
- Recognition examples
- Closing-session explanation
- Join links and contact path

Use community imagery and real process. Do not show fake member counts, testimonials, or activity feeds.

## 9. Programs

### Goal

Present real workshops, closing sessions, writing events, and reading activities.

### Program card

- Title and type
- Status
- Date/time
- Location or online format
- Short description
- Registration state/link

Statuses: `draft`, `open`, `full`, `upcoming`, `ongoing`, `completed`, `cancelled`.

If no real programs are ready, hide the route from primary navigation rather than publishing an empty generic page.

## 10. About

### Sections

- Movement definition
- The reading-culture problem
- The Reading Cycle solution
- Vision, mission, and values
- Why community and reflection matter
- Youth-led identity
- Soft values-based positioning
- Trust markers based only on real activity
- Join CTA

Keep it human and concise. Avoid institutional history unless it helps trust.

## 11. Contact

### Inquiry types

- General question
- Partnership
- Volunteer interest
- Book suggestion
- Article interest
- Program inquiry

### Form requirements

- Clear data-use explanation
- Server-side validation
- Spam/rate-limit protection
- Success and recovery states
- Accessible labels and errors

Article interest in MVP is an expression of interest, not the full authenticated submission workflow.

## 12. Admin pages

| Route                         | Capability                            |
| ----------------------------- | ------------------------------------- |
| `/admin`                      | Overview and publishing tasks         |
| `/admin/books`                | Manage books                          |
| `/admin/cycles`               | Manage cycles                         |
| `/admin/cycles/[id]/schedule` | Manage timeline and prompts           |
| `/admin/voices`               | Manage articles, categories, tags     |
| `/admin/programs`             | Manage programs                       |
| `/admin/community-links`      | Manage public destinations            |
| `/admin/messages`             | Review contact messages               |
| `/admin/settings`             | Site-level settings and homepage data |

Admin UI should prioritize clarity and safety over decorative playfulness. It still uses brand tokens but does not imitate the public editorial layout.

## 13. Future account routes

Do not expose these in MVP navigation:

- `/dashboard`
- `/dashboard/cycles`
- `/dashboard/reflections`
- `/dashboard/badges`
- `/dashboard/certificates`
- `/profile`
- `/passport`
- `/leaderboard`

Their future information architecture must remain compatible with the Reading Cycle model but should not distort the public MVP.

## 14. Recommended build order

1. App shell, tokens, navigation, footer, shared primitives
2. Home and Current Cycle together
3. Cycle detail and timeline system
4. Voices listing and article detail
5. Books and book detail
6. Community
7. About
8. Programs and program detail if content exists
9. Contact and legal pages
10. Admin content management
11. Full responsive/accessibility/performance polish
