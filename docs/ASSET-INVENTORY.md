# Read & Revive / áŠ áŠ•á‰£á‰¢ Asset Inventory

## Inventory status

- **676 production files** representing **648 logical assets**
- **6.72 MB** total public asset payload
- **45 original source files** preserved outside `public`
- **14 visual reference sheets** separated from production assets
- **93 rejected fragments/source crops** archived outside `public`
- Automated validation: **664/664 passed**, with zero errors and zero warnings

The exhaustive file-level inventory is [`public/assets/manifest.json`](../public/assets/manifest.json). The searchable visual inventory is [`public/assets/gallery.html`](../public/assets/gallery.html).

## Category inventory

| Category        | Files | Logical assets | Format     | Transparency              | Intended use                                                                                   | Naming quality                                                                    | Production status                                           |
| --------------- | ----: | -------------: | ---------- | ------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `brand`         |    12 |              8 | PNG + WebP | Alpha                     | Primary/inverse wordmarks, standalone marks, favicon and application icons                     | Clear and descriptive                                                             | Direct use                                                  |
| `decorations`   |   264 |            264 | WebP       | Alpha                     | Page-specific accents for Books, Community, CTA, Current Cycle, Dashboard, Home, and Voices    | Books/CTA names are descriptive; older extracted packs are generic numbered names | Direct use, selectively                                     |
| `dividers`      |    24 |             24 | PNG        | Alpha                     | Editorial separators, rules, botanical lines, book dividers                                    | Clear and descriptive                                                             | Direct use                                                  |
| `doodles`       |    90 |             90 | PNG        | Alpha                     | Arrows, paths, underlines, circles, highlights, stars, sparks, hearts, smileys                 | Clear and descriptive                                                             | Direct use                                                  |
| `gamification`  |   153 |            153 | WebP       | Alpha                     | Badges, streaks, progress marks, profile frames, rewards, certificates, leaderboard decoration | Category prefix is clear; many files use generic numeric suffixes                 | Direct use after choosing via gallery                       |
| `icons`         |    20 |             20 | PNG        | Alpha                     | Reading, calendar, trophy, flame, group, discussion, notebook, certificate icons               | Clear and descriptive                                                             | Direct use                                                  |
| `illustrations` |    10 |             10 | WebP       | Alpha                     | Hero, reading cycle, community, blog, mobile discussion, empty state                           | Excellent                                                                         | Direct use                                                  |
| `stickers`      |    48 |             24 | PNG + WebP | Alpha                     | Notes, tape, paper clips, stamps, paper scraps, sticker labels                                 | Clear; duplicate formats are intentional                                          | Direct use; prefer WebP in pages and PNG as fallback/master |
| `textures`      |    55 |             55 | WebP       | Alpha except `warm-paper` | Warm paper, notebook overlay, torn paper and editorial marks                                   | Major textures are clear; extracted editorial pieces are generic numbered names   | Direct use, selectively                                     |

## Page decoration subfolders

| Folder                      | Count | Typical contents                                                           |
| --------------------------- | ----: | -------------------------------------------------------------------------- |
| `decorations/books`         |    20 | Bookshelves, book stacks, bookmarks, page-turn marks, reading paths        |
| `decorations/community`     |    43 | Speech bubbles, groups, hearts, questions, connection paths                |
| `decorations/cta`           |    20 | White/cream arrows, books, sparkles and flourishes for orange CTA sections |
| `decorations/current-cycle` |    51 | Calendars, flags, progress marks, notes, rewards, discussion marks         |
| `decorations/dashboard`     |    57 | Flames, stars, crowns, medals, flags, achievement accents                  |
| `decorations/home`          |    39 | Hero arrows, stars, books, people, speech bubbles, CTA marks               |
| `decorations/voices`        |    34 | Quote marks, paper notes, underlines, bookmarks, editorial accents         |

## Direct-use assets

- All files under `public/assets/doodles`
- All files under `public/assets/icons`
- All files under `public/assets/illustrations`
- All files under `public/assets/stickers`
- All files under `public/assets/dividers`
- Curated files under `public/assets/textures`
- Curated files under `public/assets/gamification`
- Page-specific files under `public/assets/decorations`

Use the gallery before selecting numbered decoration/gamification assets. Prefer WebP for textured and large imagery. PNG line assets are appropriate at their intended decorative sizes.

## Reference-only assets

- `assets-source/references/ui-screens`: 10 complete page concepts
- `assets-source/references/component-sheets`: 4 design-system and gamification references
- `assets-source/archive/originals`: untouched source images
- `assets-source/generated-sheets`: generation/extraction sources
- `assets-source/masters`: transparent PNG production masters
- `assets-source/archive/rejected`: rejected fragments and unsuitable source sheets

These files must not be imported into production pages.

## Duplicate and naming findings

- No exact binary duplicate files were found.
- The 24 sticker designs intentionally exist in both PNG and WebP.
- `doodle-assets.json` is a legacy Batch 2 inventory; `manifest.json` is the authoritative complete inventory.
- The main naming weakness is generic extraction names such as `home-decoration-##`, `streak-progress-##`, and `blog-editorial-##`.
- Generic names are safe and unique, but a semantic rename is recommended when an asset becomes a frequently reused design-system element.

## Missing assets

- Optional original vector/SVG logo source for unlimited print scaling
- Licensed/current-cycle book-cover files and future CMS book imagery
- Open Graph/social-sharing image templates
- Optional true SVG versions of the simplest doodles and icons

The remaining items do not block UI development or production branding.

## Rename, move, delete, or regenerate recommendations

- **Rename later:** Generic numbered decoration, texture, and gamification files only when they are selected for repeated use. Bulk renaming all of them now would add noise without improving development.
- **Move later:** Split `gamification` into `badges`, `progress`, `rewards`, `passport`, and `leaderboard` subfolders when dashboard development begins.
- **Delete later:** Remove `doodle-assets.json` after all tooling has switched to the authoritative `manifest.json`. No current production image needs deletion.
- **Regenerate:** No existing accepted production asset currently requires regeneration. Generate only the missing logo-derived assets and content-specific book/social imagery when their real source material is available.
