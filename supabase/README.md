# Supabase data foundation

This folder starts the Read & Revive / አንባቢ Phase 1 content database.

This is a database foundation, not an active integration: the Next.js app reads from its local content repository and does not open a Supabase connection.

## Files

- `migrations/001_mvp_content_schema.sql` — content schema, row-level security (RLS), helper functions, and media buckets.
- `migrations/002_restrict_public_profile_and_contact_writes.sql` — protects administrator-assigned profile roles and closes direct public contact inserts.
- `seed.sql` — development fixtures only.

## Important content rule

Seeded books, cycles, and Voices posts are marked:

- `is_mock = true`
- `approved_for_production = false`

Public RLS policies only expose approved production rows. Admin/editor screens can still see and replace or approve mock rows later.

## Local verification

With the Supabase CLI and Docker running:

```sh
supabase start
supabase db reset
```

Reset is for the disposable local database only. It reapplies migrations and reloads the development fixtures.

## Before applying to a hosted project

Review and back up the target database, confirm the correct project, and test the migrations and RLS locally first. Then inspect the migration plan before manually applying it. Do not use `--include-seed` in production.

```powershell
supabase link --project-ref <project-ref>
supabase db push --dry-run
supabase db push
supabase gen types typescript --linked --schema public > src/lib/database/generated.types.ts
```

Then create the first secured admin user in Supabase Auth and add a matching `profiles` row with `role = 'super_admin'`.
