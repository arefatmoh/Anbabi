
-- Read & Revive / አንባቢ MVP content schema
-- Phase: Supabase content integration / admin-ready public content

begin;

create extension if not exists pgcrypto;
create extension if not exists citext;

-- Canonical workflow/status enums for Phase 1 only.
do $$
begin
  create type public.profile_role as enum (
    'reader',
    'writer',
    'moderator',
    'editor',
    'admin',
    'super_admin'
  );
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.profile_visibility as enum ('private', 'public');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.book_status as enum (
    'draft',
    'recommended',
    'current',
    'upcoming',
    'completed',
    'archived'
  );
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.cycle_status as enum (
    'draft',
    'upcoming',
    'active',
    'closing',
    'completed',
    'archived'
  );
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.timeline_state as enum (
    'completed',
    'current',
    'upcoming',
    'missed',
    'closing'
  );
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.blog_post_status as enum (
    'draft',
    'submitted',
    'under_review',
    'needs_revision',
    'approved',
    'scheduled',
    'published',
    'rejected',
    'archived'
  );
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.program_status as enum (
    'draft',
    'open',
    'full',
    'upcoming',
    'ongoing',
    'completed',
    'cancelled'
  );
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.contact_message_status as enum (
    'new',
    'read',
    'in_progress',
    'resolved',
    'archived',
    'spam'
  );
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.contact_message_type as enum (
    'general',
    'partnership',
    'volunteer',
    'book_suggestion',
    'article_interest',
    'program_inquiry',
    'other'
  );
exception when duplicate_object then null;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  username citext unique,
  avatar_url text,
  bio text,
  role public.profile_role not null default 'reader',
  visibility public.profile_visibility not null default 'private',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_display_name_length check (char_length(display_name) between 2 and 120),
  constraint profiles_username_length check (username is null or char_length(username::text) between 3 and 40)
);

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  slug citext not null unique,
  title text not null,
  author text not null,
  cover_url text,
  cover_alt text,
  cover_label text,
  cover_tone text not null default 'paper' check (cover_tone in ('charcoal', 'orange', 'paper')),
  description text not null,
  long_description text,
  why_featured text,
  category text not null,
  themes text[] not null default '{}',
  language text not null default 'English',
  status public.book_status not null default 'draft',
  status_label text,
  reading_time_label text,
  reader_fit text[] not null default '{}',
  discussion_prompts text[] not null default '{}',
  sort_order integer not null default 0,
  is_mock boolean not null default false,
  approved_for_production boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint books_slug_format check (slug::text ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint books_title_length check (char_length(title) between 1 and 180),
  constraint books_author_length check (char_length(author) between 1 and 180)
);

create table if not exists public.reading_cycles (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.books(id) on delete restrict,
  slug citext not null unique,
  title text not null,
  short_description text not null,
  start_date date,
  end_date date,
  duration_days integer check (duration_days is null or duration_days > 0),
  date_label text,
  duration_label text,
  target_label text,
  daily_target text,
  why_selected text,
  reader_fit text[] not null default '{}',
  prompts text[] not null default '{}',
  telegram_link text,
  facebook_link text,
  closing_session_title text,
  closing_session_description text,
  closing_session_at timestamptz,
  rewards_description text,
  status public.cycle_status not null default 'draft',
  status_label text,
  featured boolean not null default false,
  is_mock boolean not null default false,
  approved_for_production boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint reading_cycles_slug_format check (slug::text ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint reading_cycles_date_order check (end_date is null or start_date is null or end_date >= start_date),
  constraint reading_cycles_telegram_url check (telegram_link is null or telegram_link ~ '^https://t\.me/[A-Za-z0-9_]+/?$'),
  constraint reading_cycles_facebook_url check (facebook_link is null or facebook_link ~ '^https://(www\.)?facebook\.com/.+')
);

create unique index if not exists one_featured_active_cycle
  on public.reading_cycles (featured)
  where featured = true and status in ('active', 'closing') and approved_for_production = true;

create table if not exists public.cycle_schedule (
  id uuid primary key default gen_random_uuid(),
  cycle_id uuid not null references public.reading_cycles(id) on delete cascade,
  label text,
  title text not null,
  reading_target text not null,
  prompt text,
  day_number integer check (day_number is null or day_number > 0),
  week_number integer check (week_number is null or week_number > 0),
  due_date date,
  display_state public.timeline_state not null default 'upcoming',
  sort_order integer not null default 0,
  is_mock boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cycle_schedule_position_present check (day_number is not null or week_number is not null or sort_order >= 0)
);

create unique index if not exists cycle_schedule_unique_sort
  on public.cycle_schedule (cycle_id, sort_order);

create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  slug citext not null unique,
  name text not null unique,
  description text,
  sort_order integer not null default 0,
  active boolean not null default true,
  is_mock boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_categories_slug_format check (slug::text ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table if not exists public.blog_tags (
  id uuid primary key default gen_random_uuid(),
  slug citext not null unique,
  name text not null unique,
  is_mock boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_tags_slug_format check (slug::text ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  author_display_name text,
  author_note text,
  related_book_id uuid references public.books(id) on delete set null,
  related_cycle_id uuid references public.reading_cycles(id) on delete set null,
  category_id uuid references public.blog_categories(id) on delete set null,
  slug citext not null unique,
  title text not null,
  subtitle text,
  excerpt text not null,
  body jsonb not null default '[]'::jsonb,
  cover_url text,
  cover_alt text,
  cover_key text,
  status public.blog_post_status not null default 'draft',
  reading_time_minutes integer check (reading_time_minutes is null or reading_time_minutes > 0),
  reading_time_label text,
  featured boolean not null default false,
  scheduled_for timestamptz,
  published_at timestamptz,
  is_mock boolean not null default false,
  approved_for_production boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_posts_slug_format check (slug::text ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint blog_posts_published_at_required check (status <> 'published' or published_at is not null)
);

create table if not exists public.blog_post_tags (
  blog_post_id uuid not null references public.blog_posts(id) on delete cascade,
  tag_id uuid not null references public.blog_tags(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blog_post_id, tag_id)
);

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  slug citext not null unique,
  title text not null,
  description text not null,
  cover_url text,
  cover_alt text,
  program_type text not null,
  status public.program_status not null default 'draft',
  start_date date,
  end_date date,
  location text,
  registration_link text,
  sort_order integer not null default 0,
  is_mock boolean not null default false,
  approved_for_production boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint programs_slug_format check (slug::text ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint programs_date_order check (end_date is null or start_date is null or end_date >= start_date)
);

create table if not exists public.community_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  label text not null,
  url text not null,
  purpose text not null,
  active boolean not null default true,
  sort_order integer not null default 0,
  is_mock boolean not null default false,
  approved_for_production boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint community_links_platform_length check (char_length(platform) between 2 and 80),
  constraint community_links_url_https check (url ~ '^https://')
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  subject text not null,
  message text not null,
  message_type public.contact_message_type not null default 'general',
  status public.contact_message_status not null default 'new',
  source_path text,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint contact_messages_name_length check (char_length(name) between 2 and 120),
  constraint contact_messages_subject_length check (char_length(subject) between 2 and 180),
  constraint contact_messages_message_length check (char_length(message) between 10 and 5000),
  constraint contact_messages_email_format check (email is null or email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  description text,
  public_read boolean not null default false,
  is_mock boolean not null default false,
  approved_for_production boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint site_settings_key_format check (key ~ '^[a-z0-9_]+$')
);

create index if not exists books_public_lookup_idx on public.books (status, approved_for_production, sort_order);
create index if not exists reading_cycles_public_lookup_idx on public.reading_cycles (status, featured, approved_for_production);
create index if not exists cycle_schedule_cycle_sort_idx on public.cycle_schedule (cycle_id, sort_order);
create index if not exists blog_posts_public_lookup_idx on public.blog_posts (status, featured, published_at desc, approved_for_production);
create index if not exists programs_public_lookup_idx on public.programs (status, approved_for_production, sort_order);
create index if not exists community_links_public_lookup_idx on public.community_links (active, approved_for_production, sort_order);
create index if not exists contact_messages_status_created_idx on public.contact_messages (status, created_at desc);

create or replace function public.current_profile_role()
returns public.profile_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_content_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    public.current_profile_role() in ('moderator', 'editor', 'admin', 'super_admin'),
    false
  );
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_profile_role() = 'super_admin', false);
$$;

-- updated_at triggers
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
create trigger books_set_updated_at before update on public.books
for each row execute function public.set_updated_at();
create trigger reading_cycles_set_updated_at before update on public.reading_cycles
for each row execute function public.set_updated_at();
create trigger cycle_schedule_set_updated_at before update on public.cycle_schedule
for each row execute function public.set_updated_at();
create trigger blog_categories_set_updated_at before update on public.blog_categories
for each row execute function public.set_updated_at();
create trigger blog_tags_set_updated_at before update on public.blog_tags
for each row execute function public.set_updated_at();
create trigger blog_posts_set_updated_at before update on public.blog_posts
for each row execute function public.set_updated_at();
create trigger programs_set_updated_at before update on public.programs
for each row execute function public.set_updated_at();
create trigger community_links_set_updated_at before update on public.community_links
for each row execute function public.set_updated_at();
create trigger contact_messages_set_updated_at before update on public.contact_messages
for each row execute function public.set_updated_at();
create trigger site_settings_set_updated_at before update on public.site_settings
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.books enable row level security;
alter table public.reading_cycles enable row level security;
alter table public.cycle_schedule enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_tags enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_post_tags enable row level security;
alter table public.programs enable row level security;
alter table public.community_links enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_settings enable row level security;

-- Profiles
create policy "profiles_select_own_or_admin" on public.profiles
for select using (id = auth.uid() or public.is_content_admin());

create policy "profiles_insert_own" on public.profiles
for insert with check (id = auth.uid());

create policy "profiles_update_own_or_super_admin" on public.profiles
for update using (id = auth.uid() or public.is_super_admin())
with check (id = auth.uid() or public.is_super_admin());

-- Public read policies require production approval. Mock rows remain available to admins.
create policy "books_public_read_approved" on public.books
for select using (approved_for_production = true and status in ('recommended', 'current', 'upcoming', 'completed'));

create policy "books_admin_manage" on public.books
for all using (public.is_content_admin()) with check (public.is_content_admin());

create policy "reading_cycles_public_read_approved" on public.reading_cycles
for select using (approved_for_production = true and status in ('upcoming', 'active', 'closing', 'completed'));

create policy "reading_cycles_admin_manage" on public.reading_cycles
for all using (public.is_content_admin()) with check (public.is_content_admin());

create policy "cycle_schedule_public_read_for_approved_cycles" on public.cycle_schedule
for select using (
  exists (
    select 1 from public.reading_cycles rc
    where rc.id = cycle_schedule.cycle_id
      and rc.approved_for_production = true
      and rc.status in ('upcoming', 'active', 'closing', 'completed')
  )
);

create policy "cycle_schedule_admin_manage" on public.cycle_schedule
for all using (public.is_content_admin()) with check (public.is_content_admin());

create policy "blog_categories_public_read_active" on public.blog_categories
for select using (active = true);

create policy "blog_categories_admin_manage" on public.blog_categories
for all using (public.is_content_admin()) with check (public.is_content_admin());

create policy "blog_tags_public_read" on public.blog_tags
for select using (true);

create policy "blog_tags_admin_manage" on public.blog_tags
for all using (public.is_content_admin()) with check (public.is_content_admin());

create policy "blog_posts_public_read_published" on public.blog_posts
for select using (approved_for_production = true and status = 'published' and published_at <= now());

create policy "blog_posts_admin_manage" on public.blog_posts
for all using (public.is_content_admin()) with check (public.is_content_admin());

create policy "blog_post_tags_public_read_for_published_posts" on public.blog_post_tags
for select using (
  exists (
    select 1 from public.blog_posts bp
    where bp.id = blog_post_tags.blog_post_id
      and bp.approved_for_production = true
      and bp.status = 'published'
      and bp.published_at <= now()
  )
);

create policy "blog_post_tags_admin_manage" on public.blog_post_tags
for all using (public.is_content_admin()) with check (public.is_content_admin());

create policy "programs_public_read_approved" on public.programs
for select using (approved_for_production = true and status in ('open', 'full', 'upcoming', 'ongoing', 'completed'));

create policy "programs_admin_manage" on public.programs
for all using (public.is_content_admin()) with check (public.is_content_admin());

create policy "community_links_public_read_active" on public.community_links
for select using (approved_for_production = true and active = true);

create policy "community_links_admin_manage" on public.community_links
for all using (public.is_content_admin()) with check (public.is_content_admin());

create policy "contact_messages_public_insert" on public.contact_messages
for insert with check (true);

create policy "contact_messages_admin_manage" on public.contact_messages
for all using (public.is_content_admin()) with check (public.is_content_admin());

create policy "site_settings_public_read" on public.site_settings
for select using (public_read = true and approved_for_production = true);

create policy "site_settings_admin_manage" on public.site_settings
for all using (public.is_content_admin()) with check (public.is_content_admin());

-- Storage buckets for future admin-managed dynamic media.
insert into storage.buckets (id, name, public)
values
  ('book-covers', 'book-covers', true),
  ('blog-covers', 'blog-covers', true),
  ('program-images', 'program-images', true),
  ('badge-icons', 'badge-icons', true)
on conflict (id) do nothing;

create policy "public_read_public_media_buckets" on storage.objects
for select using (bucket_id in ('book-covers', 'blog-covers', 'program-images', 'badge-icons'));

create policy "admins_manage_public_media_buckets" on storage.objects
for all using (
  bucket_id in ('book-covers', 'blog-covers', 'program-images', 'badge-icons')
  and public.is_content_admin()
) with check (
  bucket_id in ('book-covers', 'blog-covers', 'program-images', 'badge-icons')
  and public.is_content_admin()
);

commit;
