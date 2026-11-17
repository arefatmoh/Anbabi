-- Own-profile creation may only assign the default public role.
drop policy "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
for insert to authenticated
with check (id = auth.uid() and role = 'reader');

-- Row policies control whose profile may be updated, not which fields change.
create function public.protect_profile_role()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if current_user in ('anon', 'authenticated')
     and new.role is distinct from old.role
     and not public.is_super_admin() then
    raise exception 'Profile role changes require a super administrator'
      using errcode = '42501';
  end if;
  return new;
end;
$$;

create trigger profiles_protect_role
before update of role on public.profiles
for each row execute function public.protect_profile_role();

-- The public site has no database-backed contact form. Keep direct submissions
-- closed until a validated and rate-limited server endpoint exists.
drop policy "contact_messages_public_insert" on public.contact_messages;
