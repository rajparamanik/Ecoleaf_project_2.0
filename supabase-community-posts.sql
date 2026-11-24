-- Table definition for community_posts in Supabase

create table if not exists public.community_posts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  user_name text not null,
  user_avatar text,
  content text not null,
  image text,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  likes integer not null default 0,
  comments integer not null default 0,
  user_comments jsonb not null default '[]'
);

-- Enable Row Level Security
alter table public.community_posts enable row level security;

-- Allow authenticated users to insert posts
create policy "Authenticated can insert posts"
on public.community_posts
for insert
with check (auth.role() = 'authenticated');

-- Allow authenticated users to update posts
create policy "Authenticated can update posts"
on public.community_posts
for update
using (auth.role() = 'authenticated');

-- Allow anyone to select posts
create policy "Anyone can select posts"
on public.community_posts
for select
using (true);
