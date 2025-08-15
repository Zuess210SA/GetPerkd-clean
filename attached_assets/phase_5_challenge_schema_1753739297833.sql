
-- === PHASE 5: GAMIFICATION SCHEMA ===

-- Table: challenges (global definitions)
create table if not exists challenges (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  type text check (type in ('daily', 'weekly', 'campaign')) not null,
  target_action text not null, -- e.g. 'stamps', 'redemptions'
  target_count int not null,
  reward_points int not null,
  active boolean default true,
  campus_id uuid references campuses(id),
  start_date date,
  end_date date,
  created_at timestamptz default now()
);

-- Table: user_challenges (user progress tracking)
create table if not exists user_challenges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  challenge_id uuid references challenges(id) on delete cascade,
  progress int default 0,
  completed boolean default false,
  completed_at timestamptz,
  points_awarded boolean default false,
  created_at timestamptz default now()
);
create unique index on user_challenges (user_id, challenge_id);

-- Table: points_log (every time user earns points)
create table if not exists points_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  action_type text, -- 'challenge_complete', 'referral', etc.
  related_id uuid,
  points int not null,
  created_at timestamptz default now()
);
create index on points_log (user_id);

-- Table: leaderboard_snapshots (weekly rankings per campus)
create table if not exists leaderboard_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  campus_id uuid references campuses(id),
  week_start date,
  total_points int,
  rank int,
  snapshot_at timestamptz default now()
);
create index on leaderboard_snapshots (campus_id, week_start);

-- Enable RLS
alter table challenges enable row level security;
alter table user_challenges enable row level security;
alter table points_log enable row level security;
alter table leaderboard_snapshots enable row level security;

-- RLS: Only show user their own challenge/points
create policy "User can see own challenges" on user_challenges
  for select using (auth.uid() = user_id);

create policy "User can see own points" on points_log
  for select using (auth.uid() = user_id);

create policy "User can see own leaderboard position" on leaderboard_snapshots
  for select using (auth.uid() = user_id);

-- Admins can see all (handled by elevated service role keys on server)
