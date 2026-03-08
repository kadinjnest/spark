-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Memories table
create table if not exists memories (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  narrative text not null,
  mood text not null,
  location_guess text,
  people_count integer,
  era_guess text,
  media_url text,
  media_type text not null check (media_type in ('image', 'video', 'text')),
  raw_input text,
  created_at timestamptz default now() not null
);

-- Row Level Security: users can only see their own memories
alter table memories enable row level security;

create policy "Users can view own memories"
  on memories for select
  using (auth.uid() = user_id);

create policy "Users can insert own memories"
  on memories for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own memories"
  on memories for delete
  using (auth.uid() = user_id);

-- Index for fast user queries
create index memories_user_id_idx on memories(user_id);
create index memories_created_at_idx on memories(created_at desc);

-- Storage bucket for media
insert into storage.buckets (id, name, public)
values ('memories', 'memories', false)
on conflict do nothing;

-- Storage RLS
create policy "Users can upload own media"
  on storage.objects for insert
  with check (bucket_id = 'memories' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can view own media"
  on storage.objects for select
  using (bucket_id = 'memories' and auth.uid()::text = (storage.foldername(name))[1]);
