# Read & Revive / áŠ áŠ•á‰£á‰¢ Asset Readiness Evaluation

## Project structure evaluation

The asset system is production-ready and deliberately separates website-delivery files from references, masters, originals, and rejected material.

- `public/assets` contains only website-consumable files, the manifest, and gallery.
- `assets-source/masters` contains lossless transparent PNG masters.
- `assets-source/references` contains UI screens and component sheets that guide design but must not be rendered as website sections.
- `assets-source/archive` preserves originals and rejected material without polluting production imports.
- Validation confirms every intended transparent production asset has working alpha, transparent padding, and no checkerboard/chroma residue.

The current workspace is an asset-preparation workspace, not yet a Next.js application: there is no `package.json`, `app`, or `src` application structure. That is expected because website coding has not started.

## What is strong

- The orange, black, warm-cream identity is consistent.
- Illustrations feel editorial, culturally relevant, youthful, and human.
- The Current Cycle, community, reading, editorial, and gamification themes are all well covered.
- Doodles and dividers are small, isolated, transparent, and practical in responsive layouts.
- Reference screenshots are correctly separated from production assets.
- The manifest and gallery make a large library searchable and inspectable.

## What requires discipline during development

- Do not reproduce the dense reference-screen layouts literally.
- Do not use every decorative asset simply because it exists.
- Limit most sections to one primary illustration and one to three small accents.
- Build buttons, cards, timelines, progress bars, navigation, forms, and dashboard widgets with React and Tailwind.
- Generic numbered assets should be selected visually through the gallery, then optionally renamed semantically if promoted to a reusable component.
- Keep handwritten styling limited to small annotations; use serif headings and clean sans-serif body text.

## Recommended final structure

```text
public/assets/
â”œâ”€â”€ brand/                     # add original logo, favicon, wordmark later
â”œâ”€â”€ doodles/
â”œâ”€â”€ icons/
â”œâ”€â”€ illustrations/
â”œâ”€â”€ stickers/
â”œâ”€â”€ dividers/
â”œâ”€â”€ textures/
â”œâ”€â”€ gamification/
â”‚   â”œâ”€â”€ badges/                # recommended future refinement
â”‚   â”œâ”€â”€ progress/
â”‚   â”œâ”€â”€ rewards/
â”‚   â”œâ”€â”€ passport/
â”‚   â””â”€â”€ leaderboard/
â”œâ”€â”€ decorations/
â”‚   â”œâ”€â”€ home/
â”‚   â”œâ”€â”€ current-cycle/
â”‚   â”œâ”€â”€ books/
â”‚   â”œâ”€â”€ community/
â”‚   â”œâ”€â”€ voices/
â”‚   â”œâ”€â”€ dashboard/
â”‚   â””â”€â”€ cta/
â””â”€â”€ manifest.json

assets-source/
â”œâ”€â”€ brand/
â”œâ”€â”€ masters/
â”œâ”€â”€ references/
â”‚   â”œâ”€â”€ ui-screens/
â”‚   â””â”€â”€ component-sheets/
â””â”€â”€ archive/
```

The current structure already matches this recommendation except for the optional gamification subfolders.

## Naming convention

Use lowercase kebab-case:

```text
<subject>-<variant>-<color>-<index>.<ext>
```

Examples:

```text
arrow-loop-orange-01.png
open-book-rays-cream-01.webp
badge-weekly-reader-orange-01.webp
hero-reading-group.webp
sticky-note-peach-taped-01.webp
divider-botanical-black-01.png
```

Rules:

- Describe the visible subject, not the generation batch.
- Include color only when variants exist.
- Use two-digit indexes for related sets.
- Avoid dates, `ChatGPT Image`, `final`, `new`, and unexplained abbreviations.
- Prefer one canonical production format per use; retain alternate masters outside `public` when possible.

## Development readiness score

**9.5/10**

The library is safe and sufficiently organized to begin the Next.js website without asset confusion. The remaining half point reflects the flat gamification folder and generic names on several extracted decoration sets.

## Short implementation plan

1. Establish Tailwind color, typography, spacing, radius, and shadow tokens from the reference sheets.
2. Build the responsive shell and Current Reading Cycle experience with coded React components.
3. Use `hero-reading-group`, `current-reading-cycle`, and selected page illustrations as the main visual anchors.
4. Add doodles, stickers, and dividers only where they support hierarchy, direction, progress, or delight.
5. Use `manifest.json` or a typed asset registry to centralize repeated asset paths.
6. Keep gamification interfaces data-driven and coded; use the supplied graphics only as visual rewards and accents.
7. Use the finalized brand assets immediately; add content-managed book covers before final production launch.

## Final verdict

The website can be built confidently from this asset library. The structure is logical, production files are technically clean, references are separated correctly, and the remaining issues are organizational refinements rather than blockers.
