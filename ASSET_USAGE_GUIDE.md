# Read & Revive / አንባቢ — Asset Usage Guide

**Status:** Production reference  
**Related files:** `public/assets/manifest.json`, `public/assets/gallery.html`, `docs/ASSET-INVENTORY.md`, and `docs/ASSET-READINESS-EVALUATION.md`

## 1. Asset readiness

The production library is ready for implementation.

- `public/assets` contains 676 manifest-tracked production files.
- Transparent assets have been validated for real alpha, transparent padding, and checkerboard/chroma residue.
- Source masters, references, and rejected material are outside public delivery folders.
- Approved logo, mark, inverse variants, and web icons are present in `public/assets/brand`.

Do not reprocess or re-extract assets during website implementation unless a specific file fails at its actual rendered size.

## 2. Folder roles

| Folder                                    | Role                                                    | Website use                            |
| ----------------------------------------- | ------------------------------------------------------- | -------------------------------------- |
| `public/assets/brand`                     | Logo, mark, inverse variants, app/browser icons         | Direct                                 |
| `public/assets/doodles`                   | Arrows, underlines, sparks, emphasis marks              | Direct, sparingly                      |
| `public/assets/icons`                     | Hand-drawn reading-related icons                        | Direct where semantically suitable     |
| `public/assets/illustrations`             | Major reading/community visual anchors                  | Direct                                 |
| `public/assets/stickers`                  | Notes, labels, tape, paper items                        | Direct as decoration/container accents |
| `public/assets/dividers`                  | Section rhythm and transitions                          | Direct                                 |
| `public/assets/textures`                  | Paper and subtle surface treatments                     | Direct, optimized                      |
| `public/assets/gamification`              | Badges, progress, rewards, passport/leaderboard visuals | Direct as reward art or preview        |
| `public/assets/decorations/home`          | Homepage-specific accents                               | Direct                                 |
| `public/assets/decorations/current-cycle` | Cycle and timeline accents                              | Direct                                 |
| `public/assets/decorations/books`         | Books-page accents                                      | Direct                                 |
| `public/assets/decorations/community`     | Community-page accents                                  | Direct                                 |
| `public/assets/decorations/voices`        | Editorial/blog accents                                  | Direct                                 |
| `public/assets/decorations/dashboard`     | Future account/dashboard visuals                        | Future                                 |
| `public/assets/decorations/cta`           | CTA accents                                             | Direct, selectively                    |
| `assets-source/references`                | UI screens and component sheets                         | Visual reference only                  |
| `assets-source/masters`                   | Lossless source masters                                 | Archive/edit source only               |
| `assets-source/archive`                   | Originals, duplicates, rejected cells                   | Never import                           |

## 3. Brand asset rules

Use:

- Primary logo on warm paper/cream/light surfaces
- Inverse logo on charcoal/black surfaces
- Mark where horizontal space is limited
- 32, 180, 192, and 512 icons for appropriate browser/app metadata

Do not:

- Recreate the logo from screenshots
- Stretch, recolor, outline, rotate, or add effects
- Put the primary dark logo on a low-contrast dark surface
- Use a low-resolution icon as a large wordmark
- treat አንባቢ as decorative gibberish; preserve the approved lockup

## 4. Selection workflow

1. Start with the page purpose, not with an attractive asset.
2. Search `manifest.json` by category/source/intended usage.
3. Compare options in `gallery.html` on cream, black, orange, and checker backgrounds.
4. Select one visual anchor for the section.
5. Add zero to three supporting doodles only if they guide attention or reinforce meaning.
6. Test at real desktop and mobile sizes.
7. Keep the chosen path in a typed asset registry when reused.

## 5. Recommended page mapping

### Home

- One reading/community hero illustration
- One current-cycle/book illustration or cover
- Reading-path doodles for “How it works”
- Small stars/sparks around real recognition
- Subtle section divider

### Current cycle

- Actual book cover is content, not decoration
- Current-cycle decoration pack for path and status emphasis
- Timeline arrows/dividers
- Limited reward art near recognition

### Books

- Real book covers
- Books decoration pack for shelf/page accents
- Underlines or small reading icons around headings

### Voices

- Article cover photography/illustration when available
- Voices decoration pack
- Quote marks, paper notes, subtle editorial dividers
- Keep the prose area visually quiet

### Community

- Community illustration
- Speech, group, or discussion icons
- Directional doodles leading toward platform join actions

### About

- One human/community illustration
- Paper texture or timeline divider
- Avoid a collage of every brand asset

### Future dashboard

- Dashboard decoration pack
- Gamification art as badge/reward visuals
- UI itself remains coded and data-driven

## 6. Density limits

- Hero: one primary illustration plus up to three small accents.
- Standard section: one primary visual or up to three small accents, usually not both at maximum.
- Cards: usually zero; at most one small decorative treatment.
- Article body: almost no decoration inside prose.
- Mobile: reduce or hide nonessential accents before shrinking them into clutter.

These are guardrails, not quotas. Empty space is part of the brand.

## 7. Format strategy

- PNG: transparent line art and artwork where alpha fidelity matters.
- WebP: larger illustrations, stickers, paper textures, and other optimized delivery assets.
- SVG: only when the provided trace is visually faithful at both small and large sizes.
- JPG/WebP: non-transparent editorial imagery and reference screenshots.

Use intrinsic dimensions/aspect ratios and responsive image sizing. Do not upscale small raster assets beyond the point where strokes become soft.

## 8. Accessibility

- Decorative doodles: empty alt, hidden from assistive technology, no pointer events.
- Meaningful illustrations: short contextual alt describing their role.
- Logos: alt text using “Read & Revive / አንባቢ”.
- Do not repeat adjacent text in alt.
- Never put essential instructions or state only inside an image.
- Validate contrast when transparent art sits over colored surfaces.

## 9. Performance

- Import only assets used on a page.
- Prefer optimized WebP variants for large non-line-art assets.
- Set width/height or aspect ratio to prevent layout shift.
- Lazy-load below-the-fold imagery.
- Prioritize only the actual hero/LCP image.
- Avoid using large texture files as tiny repeated decorations.
- Do not animate many transparent PNGs simultaneously.

## 10. Naming and registry

Canonical naming remains lowercase kebab-case:

```text
<subject>-<variant>-<color>-<index>.<ext>
```

Do not rename the finalized library during initial implementation merely for preference. For frequently used assets, map paths to clear semantic registry keys such as:

```text
brand.logo.primary
brand.logo.inverse
home.hero.readingGroup
cycle.path.loopArrow
voices.quoteMark
```

This gives code clarity without breaking manifest/source traceability.

## 11. What must remain coded

Never use flattened image versions of:

- Buttons
- Navigation
- Cards
- Inputs and forms
- Timelines
- Progress rings/bars
- Status chips
- Leaderboards
- Dashboard panels
- Certificates containing personalized data

Artwork may decorate or visually anchor these components; semantic content and interaction remain HTML/CSS/React.

## 12. Reference-screen rules

The UI reference screens are inspiration for:

- Warm paper and orange/black balance
- Editorial typography
- Handmade details
- Asymmetrical rhythm
- Current-cycle prominence
- Gamification mood

They are not production page images and should not be recreated pixel for pixel. Avoid their weaker tendencies:

- Excessive card density
- Repeated grids
- Fake embedded text
- Rigid dashboard patterns
- Generic NGO/SaaS composition

## 13. Asset definition of done

An asset is ready in a page when:

- It loads from a production folder.
- Its purpose is clear.
- It remains sharp and unclipped.
- Transparency and edges look clean on the actual surface.
- It does not contain fake or uneditable interface copy.
- It has correct accessibility treatment.
- It does not create mobile overlap or horizontal scrolling.
- It adds hierarchy, direction, meaning, or delight rather than noise.
