# Read & Revive / አንባቢ

Anbabi is a reading community for young people in Ethiopia. The website helps readers discover the current reading cycle, explore books and reflections, and join the conversation on Telegram.

- Website: [www.anbabi.org](https://www.anbabi.org/)
- Community: [Read & Revive on Telegram](https://t.me/ReadRevive)
- Repository contact: [developer@anbabi.org](mailto:developer@anbabi.org)

## Get started

Use Node.js 22 (see `.nvmrc`) and npm. From the repository root:

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No database, API keys, or local environment file is needed to run the public site. Copy `.env.example` to `.env.local` only if you need to override configuration. Never put private credentials in a `NEXT_PUBLIC_*` variable.

## What is implemented

- The public website uses Next.js App Router, TypeScript, Tailwind CSS, and locally bundled fonts. It is deployed on Vercel.
- Books, cycles, Voices, and other editorial content currently come from typed fixtures through a content repository. Supabase migrations and development seeds exist, but the app does **not** query Supabase yet. There is no member sign-in, admin dashboard, or database-backed contact form. Reactions are local to the browser.
- Sample editorial content still requires owner approval or replacement. Unverified impact figures appear only in development. Keep sample records out of a production database; the development seed is not a production content import.

## Find your way around

| Path | Purpose |
| --- | --- |
| `src/app` | Public routes, layout, metadata, sitemap, and robots rules |
| `src/components` | Feature components and shared UI |
| `src/lib/content/repository.ts` | Boundary between routes and content sources |
| `src/lib/mock-content.ts` and related book modules | Development fixture data |
| `public/assets` | Web-ready artwork, asset manifest, and reference gallery of those assets |
| `assets-source` | Editable masters and internal design references, not served by the app |
| `supabase` | Database migrations, local seed data, and setup notes |
| `scripts` | Project checks and optional artwork tooling |

For the project requirements and roadmap, see [the project brief](MASTER_PROJECT_BRIEF.md) and [implementation checklist](IMPLEMENTATION_CHECKLIST.md). See [asset usage](ASSET_USAGE_GUIDE.md) before changing artwork and [Supabase setup](supabase/README.md) before touching a database. The older asset inventories are useful for provenance; the current [manifest](public/assets/manifest.json) is authoritative for public files.

## Verify changes

```sh
npm run check        # ESLint, TypeScript, and asset paths
npm run build        # Production build
npm run start        # Start the production server in one terminal
npm run test:smoke   # In a second terminal: public pages, SEO endpoints, and 404s
```

The smoke test defaults to port 3000; set `SMOKE_BASE_URL` if using another local port. GitHub Actions runs the same checks on pull requests and pushes to `main`. For UI changes, also check keyboard navigation and mobile layouts in a browser.

Real book covers load directly from Open Library; the app does not proxy them through Next.js. When a remote cover is unavailable, the surrounding UI keeps the title and author visible.

For a deeper image check, optionally install the Python dependencies with `python -m pip install Pillow numpy`, then run `python scripts/validate_anbabi_assets.py`. Its JSON report is local only. The artwork extraction scripts are maintenance tools and can overwrite generated assets; run them in a separate working copy with the original source bundle.

## Deployment and sharing

Vercel production uses `https://www.anbabi.org` by default. The root domain redirects to it. Clear any stale localhost setting in Vercel or set `NEXT_PUBLIC_SITE_URL=https://www.anbabi.org` explicitly in the Production environment. Keep environment files, credentials, and local scratch output out of Git.

For coordinator review, share access to the existing repository. This project does not declare an open-source license; confirm publication and redistribution rights for the artwork, references, and book covers before making the repository public or reusing them outside the project.
