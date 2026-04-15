-- Admin email is locked to gymnastiar32@gmail.com for single-admin access.

create extension if not exists pgcrypto;

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
  full_name text,
  email text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  short_description text not null,
  overview text not null,
  role text not null,
  timeline text not null,
  status text not null check (status in ('draft', 'publish')),
  featured boolean not null default false,
  thumbnail_url text not null,
  cover_image_url text,
  problem_statement text not null,
  goals text not null,
  process text not null,
  solution text not null,
  result text not null,
  lessons_learned text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_tools (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references public.portfolios(id) on delete cascade,
  tool_name text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_gallery (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references public.portfolios(id) on delete cascade,
  image_url text not null,
  caption text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_portfolios_status on public.portfolios(status);
create index if not exists idx_portfolios_category on public.portfolios(category);
create index if not exists idx_portfolios_featured on public.portfolios(featured);
create index if not exists idx_portfolio_tools_portfolio_id on public.portfolio_tools(portfolio_id);
create index if not exists idx_portfolio_gallery_portfolio_id on public.portfolio_gallery(portfolio_id);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists set_portfolios_updated_at on public.portfolios;
create trigger set_portfolios_updated_at
before update on public.portfolios
for each row
execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.portfolios enable row level security;
alter table public.portfolio_tools enable row level security;
alter table public.portfolio_gallery enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "public_view_published_portfolios" on public.portfolios;
drop policy if exists "single_admin_manage_portfolios" on public.portfolios;
drop policy if exists "public_view_published_tools" on public.portfolio_tools;
drop policy if exists "single_admin_manage_tools" on public.portfolio_tools;
drop policy if exists "public_view_published_gallery" on public.portfolio_gallery;
drop policy if exists "single_admin_manage_gallery" on public.portfolio_gallery;

create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "public_view_published_portfolios"
on public.portfolios
for select
to public
using (status = 'publish');

create policy "single_admin_manage_portfolios"
on public.portfolios
for all
to authenticated
using ((auth.jwt() ->> 'email') = 'gymnastiar32@gmail.com')
with check ((auth.jwt() ->> 'email') = 'gymnastiar32@gmail.com');

create policy "public_view_published_tools"
on public.portfolio_tools
for select
to public
using (
  exists (
    select 1
    from public.portfolios p
    where p.id = portfolio_tools.portfolio_id
      and p.status = 'publish'
  )
);

create policy "single_admin_manage_tools"
on public.portfolio_tools
for all
to authenticated
using ((auth.jwt() ->> 'email') = 'gymnastiar32@gmail.com')
with check ((auth.jwt() ->> 'email') = 'gymnastiar32@gmail.com');

create policy "public_view_published_gallery"
on public.portfolio_gallery
for select
to public
using (
  exists (
    select 1
    from public.portfolios p
    where p.id = portfolio_gallery.portfolio_id
      and p.status = 'publish'
  )
);

create policy "single_admin_manage_gallery"
on public.portfolio_gallery
for all
to authenticated
using ((auth.jwt() ->> 'email') = 'gymnastiar32@gmail.com')
with check ((auth.jwt() ->> 'email') = 'gymnastiar32@gmail.com');

drop policy if exists "public_view_portfolio_images" on storage.objects;
drop policy if exists "single_admin_insert_portfolio_images" on storage.objects;
drop policy if exists "single_admin_update_portfolio_images" on storage.objects;
drop policy if exists "single_admin_delete_portfolio_images" on storage.objects;

create policy "public_view_portfolio_images"
on storage.objects
for select
to public
using (bucket_id = 'portfolio-images');

create policy "single_admin_insert_portfolio_images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'portfolio-images'
  and (auth.jwt() ->> 'email') = 'gymnastiar32@gmail.com'
);

create policy "single_admin_update_portfolio_images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'portfolio-images'
  and (auth.jwt() ->> 'email') = 'gymnastiar32@gmail.com'
)
with check (
  bucket_id = 'portfolio-images'
  and (auth.jwt() ->> 'email') = 'gymnastiar32@gmail.com'
);

create policy "single_admin_delete_portfolio_images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'portfolio-images'
  and (auth.jwt() ->> 'email') = 'gymnastiar32@gmail.com'
);
