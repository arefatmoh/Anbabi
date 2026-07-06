# Supabase data foundation

This folder starts the Read & Revive / አንባቢ Phase 1 content database.

## Files

- `migrations/001_mvp_content_schema.sql` ? MVP content schema, RLS policies, helper functions, and media buckets.
- `seed.sql` ? development seed records shaped like production content.

## Important content rule

Seeded books, cycles, and Voices posts are marked:

- `is_mock = true`
- `approved_for_production = false`

Public RLS policies only expose approved production rows. Admin/editor screens can still see and replace or approve mock rows later.

## Next Supabase commands

After a Supabase project is selected and linked:

```powershell
supabase link --project-ref <project-ref>
supabase db push
supabase gen types typescript --linked --schema public > src/lib/database/generated.types.ts
```

Then create the first secured admin user in Supabase Auth and add a matching `profiles` row with `role = 'super_admin'`.
