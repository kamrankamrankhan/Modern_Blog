-- Create user roles table
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'moderator', 'author', 'user')),
  granted_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, role)
);

-- Create moderation logs table
create table if not exists public.moderation_logs (
  id uuid primary key default gen_random_uuid(),
  moderator_id uuid not null references auth.users(id),
  target_type text not null check (target_type in ('post', 'comment', 'user')),
  target_id uuid not null,
  action text not null check (action in ('approve', 'reject', 'delete', 'ban', 'unban')),
  reason text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.user_roles enable row level security;
alter table public.moderation_logs enable row level security;

-- RLS policies for user_roles (only admins can manage roles)
create policy "user_roles_select_all" on public.user_roles for select using (true);
create policy "user_roles_admin_only" on public.user_roles for all using (
  exists (
    select 1 from public.user_roles ur 
    where ur.user_id = auth.uid() and ur.role = 'admin'
  )
);

-- RLS policies for moderation_logs (only moderators and admins can view)
create policy "moderation_logs_select_moderators" on public.moderation_logs for select using (
  exists (
    select 1 from public.user_roles ur 
    where ur.user_id = auth.uid() and ur.role in ('admin', 'moderator')
  )
);
create policy "moderation_logs_insert_moderators" on public.moderation_logs for insert with check (
  exists (
    select 1 from public.user_roles ur 
    where ur.user_id = auth.uid() and ur.role in ('admin', 'moderator')
  )
);

-- Create indexes
create index if not exists user_roles_user_id_idx on public.user_roles(user_id);
create index if not exists user_roles_role_idx on public.user_roles(role);
create index if not exists moderation_logs_moderator_id_idx on public.moderation_logs(moderator_id);
create index if not exists moderation_logs_target_idx on public.moderation_logs(target_type, target_id);
