-- Create categories enum
create type post_status as enum ('draft', 'published', 'archived');

-- Create blog posts table
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  featured_image text,
  author_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  tags text[] default '{}',
  status post_status default 'draft',
  featured boolean default false,
  view_count integer default 0,
  reading_time integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  published_at timestamp with time zone
);

-- Enable RLS
alter table public.posts enable row level security;

-- RLS policies for posts
create policy "posts_select_published" on public.posts for select using (status = 'published');
create policy "posts_select_own" on public.posts for select using (auth.uid() = author_id);
create policy "posts_insert_own" on public.posts for insert with check (auth.uid() = author_id);
create policy "posts_update_own" on public.posts for update using (auth.uid() = author_id);
create policy "posts_delete_own" on public.posts for delete using (auth.uid() = author_id);

-- Create indexes for better performance
create index if not exists posts_author_id_idx on public.posts(author_id);
create index if not exists posts_category_idx on public.posts(category);
create index if not exists posts_status_idx on public.posts(status);
create index if not exists posts_created_at_idx on public.posts(created_at desc);
create index if not exists posts_slug_idx on public.posts(slug);
