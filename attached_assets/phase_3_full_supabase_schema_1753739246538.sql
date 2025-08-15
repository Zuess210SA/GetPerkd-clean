
-- === PHASE 3: FULL SUPABASE SCHEMA EXPORT ===

-- Table: stamps
create table if not exists stamps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  card_id uuid references loyalty_cards(id) on delete cascade,
  business_id uuid references businesses(id) on delete cascade,
  method text check (method in ('qr', 'pin')),
  staff_id uuid references staff(id),
  created_at timestamptz default now()
);
create index on stamps (business_id, created_at);

-- Table: staff_pins
create table if not exists staff_pins (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid references staff(id) on delete cascade,
  business_id uuid references businesses(id) on delete cascade,
  pin_code text not null check (char_length(pin_code) = 4),
  active boolean default true,
  created_at timestamptz default now()
);
create unique index on staff_pins (staff_id, business_id);

-- Table: user_rewards
create table if not exists user_rewards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  card_id uuid references loyalty_cards(id) on delete cascade,
  reward_position int not null,
  status text check (status in ('locked', 'unlocked', 'redeemed')) default 'locked',
  unlocked_at timestamptz,
  redeemed_at timestamptz,
  business_id uuid references businesses(id),
  expires_at timestamptz
);
create index on user_rewards (user_id, card_id, status);

-- Enable RLS
alter table stamps enable row level security;
alter table staff_pins enable row level security;
alter table user_rewards enable row level security;

-- RLS Policies

-- Students can view their own stamps
create policy "Students can view own stamps" on stamps
  for select using (auth.uid() = user_id);

-- Students can view their own rewards
create policy "Students can view own rewards" on user_rewards
  for select using (auth.uid() = user_id);

-- Staff can manage their own PINs
create policy "Staff can manage their PIN" on staff_pins
  for all using (auth.uid() = staff_id);

-- Students can insert stamp
create policy "Students can insert stamp" on stamps
  for insert using (auth.uid() = user_id);
