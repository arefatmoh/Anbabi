# Anbabi Asset Audit

## Source assessment

- Audited 45 RGB PNG files from the supplied Downloads folder; none of the files intended as transparent contained an alpha channel.
- Preserved the 10 UI screens and 4 component sheets as references only. They establish a useful warm-paper, orange/black, editorial direction but should not be shipped as website UI.
- The screenshots are too dense to reproduce literally: repeated card grids, tiny fake text, rigid section patterns, and generic NGO/dashboard structures conflict with the intended human-made, interaction-led experience.
- The supplied Read & Revive / አንባቢ logo JPEGs were preserved, cleaned into primary and inverse transparent variants, and exported as standalone marks and favicon/application icons.

## Production decisions

- Accepted 676 production files representing 648 logical assets across brand, doodles, icons, stickers, dividers, illustrations, gamification, textures, and page decorations.
- Archived 93 rejected source/crop files, including fragments, merged mini-sheets, clipped cells, and the incorrect flattened CTA sheet.
- Retained all 45 supplied originals and 14 lightweight UI/component references outside the public delivery folders.
- Retained the strongest existing Batch 2 doodles and revalidated their true transparency.
- Extracted the 10 main illustrations without changing their composition, cultural direction, or color language.
- Split and curated gamification, texture, and page-decoration batches; fragments and accidental sheet-level crops are stored under `archive/rejected`.
- Replaced the missing Books-page decoration pack with a new 20-asset production sheet.
- Replaced the incorrect flattened orange CTA banners with 20 transparent white/cream overlays intended for coded orange sections.
- Simple line assets remain optimized PNG where already available. Automated SVG tracing was not accepted because it would distort marker texture and hand-drawn edges.

## Usage guidance

- Build buttons, cards, navigation, forms, timelines, progress indicators, and dashboards with HTML/CSS components.
- Use illustrations as hero/supporting imagery, not as flattened page sections.
- Use doodles sparingly to guide attention, reveal progress, and reinforce interaction.
- Keep page rhythm asymmetric and editorial; avoid repeating the same card grid across every section.
- Use the primary logo on light/cream surfaces and the inverse logo on orange surfaces; retain the supplied JPEGs as source references only.


