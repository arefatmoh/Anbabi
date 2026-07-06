# Asset Usage Map

Use this map during the next visual enrichment pass. UI controls, cards, buttons, forms, timelines, and text remain coded in React/Tailwind; assets decorate, anchor, divide, or add handmade character.

## Usage by website area

| Website area | Best asset categories | Usage guidance | Avoid |
|---|---|---|---|
| Hero decoration | `illustrations`, `doodles`, `decorations/home`, `brand` | Use one major illustration as the visual anchor, plus one to three small doodles/stickers for warmth. | Do not turn full UI references into hero images. |
| Section dividers | `dividers`, selected `doodles`, subtle `textures` | Use between major rhythm changes; keep dividers centered, decorative, and non-interactive. | Avoid a divider after every section. |
| CTA banners | `decorations/cta`, `doodles`, `stickers`, `brand` | Use corner flourishes, arrows, sparkle clusters, open-book accents, and paper swishes around coded CTA text/buttons. | Do not flatten CTA copy or buttons into images. |
| Cards | `stickers`, `icons`, small `doodles`, selected `decorations/*` | Use one small accent at most: tape, stamp, note edge, icon, or number-badge background. | Avoid over-decorating every card equally. |
| Blog / Voices pages | `decorations/voices`, `stickers`, `dividers`, selected `textures` | Use quote marks, paper notes, bookmarks, and editorial dividers outside article prose. | Keep article body quiet; no clutter around paragraphs. |
| Current cycle page | `illustrations/current-reading-cycle`, `decorations/current-cycle`, `doodles`, `gamification/badges`, `gamification/rewards` | Use paths, calendar/notebook/trophy accents, and one recognition badge near recognition copy. | Do not imply real stats, automated achievements, or fake attendance. |
| Community page | `illustrations/community-discussion-circle`, `decorations/community`, `icons`, `doodles` | Use speech bubbles, hearts, connection paths, and group icons to show discussion and belonging. | Avoid making it look like a generic social network dashboard. |
| Footer | `brand`, subtle `doodles`, small `stickers` | Use inverse logo on charcoal and one tiny handmade accent if it improves warmth. | Do not make footer visually heavier than page content. |
| Empty states | `illustrations/empty-state-reading`, `stickers`, `icons`, `doodles` | Use clear friendly imagery with coded headings/actions. | Do not use reference screenshots or dense gamification art. |

## Category notes

- `doodles`: best for arrows, circles, underlines, highlights, stars, sparkles, and reading paths.
- `decorations/*`: page-specific accents; names now use `*-accent-*` for the previously generic extracted packs.
- `gamification/badges`, `gamification/rewards`, and `gamification/progress`: organized homes for reading badges, reward stickers, and streak/progress artwork.
- `gamification` root: still contains other dashboard, certificate, passport, leaderboard, frame, and medal artwork.
- `textures`: use for subtle surface feel; avoid large repeated image backgrounds unless performance is checked.
- `assets-source/references`: visual guidance only, never production imagery.

## Current folder structure

```text
public/assets/
  brand/
  doodles/
  icons/
  illustrations/
  stickers/
  dividers/
  textures/
  gamification/
    badges/
    progress/
    rewards/
  decorations/
    home/
    current-cycle/
    books/
    community/
    voices/
    cta/
    dashboard/
  manifest.json
  gallery.html

assets-source/
  references/
    ui-screens/
    component-sheets/
  masters/
  archive/
```
