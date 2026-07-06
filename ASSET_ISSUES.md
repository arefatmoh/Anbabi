# Asset Issues

This file lists asset concerns after the approved rename/reorganization pass. It does not require immediate file changes.

## Summary

- Total production image assets: **676**
- Assets ready to use: **676**, with selective visual judgment
- Approved renamed/reorganized assets applied: **315**
- Pending rename candidates from the approved plan: **0**
- Production assets needing splitting: **0**
- Reference-only files: **14**
- Non-transparent production assets: **1** intentional texture
- Large assets over 150 KB: **3**
- Exact duplicate groups: **0**

## Renamed/reorganized groups

| Group | Count | Result |
|---|---:|---|
| `decorations/community` | 43 | Approved rename/reorganization applied. |
| `decorations/current-cycle` | 51 | Approved rename/reorganization applied. |
| `decorations/home` | 39 | Approved rename/reorganization applied. |
| `decorations/voices` | 34 | Approved rename/reorganization applied. |
| `gamification/badges` | 12 | Approved rename/reorganization applied. |
| `gamification/progress` | 64 | Approved rename/reorganization applied. |
| `gamification/rewards` | 27 | Approved rename/reorganization applied. |
| `textures` | 45 | Approved rename/reorganization applied. |

## Reference-only assets

| Path | Issue | Action |
|---|---|---|
| `assets-source/references/component-sheets/01-card-component-reference.webp` | Reference-only sheet/screenshot | Do not import into production pages; use only as visual guidance. |
| `assets-source/references/component-sheets/02-component-reference-sheet.webp` | Reference-only sheet/screenshot | Do not import into production pages; use only as visual guidance. |
| `assets-source/references/component-sheets/03-desktop-ui-reference.webp` | Reference-only sheet/screenshot | Do not import into production pages; use only as visual guidance. |
| `assets-source/references/component-sheets/04-gamification-ui.webp` | Reference-only sheet/screenshot | Do not import into production pages; use only as visual guidance. |
| `assets-source/references/ui-screens/01-homepage.webp` | Reference-only sheet/screenshot | Do not import into production pages; use only as visual guidance. |
| `assets-source/references/ui-screens/02-current-reading-cycle-page.webp` | Reference-only sheet/screenshot | Do not import into production pages; use only as visual guidance. |
| `assets-source/references/ui-screens/03-voices-from-the-circle-blog-listing-page.webp` | Reference-only sheet/screenshot | Do not import into production pages; use only as visual guidance. |
| `assets-source/references/ui-screens/04-blog-article-detail-page.webp` | Reference-only sheet/screenshot | Do not import into production pages; use only as visual guidance. |
| `assets-source/references/ui-screens/05-books-page.webp` | Reference-only sheet/screenshot | Do not import into production pages; use only as visual guidance. |
| `assets-source/references/ui-screens/06-book-detail-page.webp` | Reference-only sheet/screenshot | Do not import into production pages; use only as visual guidance. |
| `assets-source/references/ui-screens/07-community-page.webp` | Reference-only sheet/screenshot | Do not import into production pages; use only as visual guidance. |
| `assets-source/references/ui-screens/08-programs-page.webp` | Reference-only sheet/screenshot | Do not import into production pages; use only as visual guidance. |
| `assets-source/references/ui-screens/09-about-page.webp` | Reference-only sheet/screenshot | Do not import into production pages; use only as visual guidance. |
| `assets-source/references/ui-screens/10-dashboard.webp` | Reference-only sheet/screenshot | Do not import into production pages; use only as visual guidance. |

## Non-transparent production assets

| Path | Issue | Action |
|---|---|---|
| `/assets/textures/warm-paper.webp` | Opaque; intentional paper texture | Use as a background/surface texture, not as a floating transparent overlay. |

## Large assets over 150 KB

| Path | Size | Dimensions | Action |
|---|---:|---|---|
| `/assets/illustrations/community-discussion-circle.webp` | 197,690 bytes | 1418?889 | Use as intentional hero/anchor imagery; avoid repeated use on one page. |
| `/assets/illustrations/closing-session.webp` | 191,970 bytes | 1396?1014 | Use as intentional hero/anchor imagery; avoid repeated use on one page. |
| `/assets/illustrations/hero-reading-group.webp` | 171,260 bytes | 1393?819 | Use as intentional hero/anchor imagery; avoid repeated use on one page. |

## Duplicates

No exact binary duplicate production images were found.

## Assets that need splitting

No production assets need splitting. Reference sheets should remain reference-only unless a separate extraction task is requested.

## Enrichment readiness

The project is ready for the asset enrichment pass. The approved file reorganization is complete; the remaining concern is disciplined selection, not asset readiness.
