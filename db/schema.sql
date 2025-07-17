-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  date_of_birth DATE,
  email TEXT UNIQUE,
  phone_number TEXT,
  is_parent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Sessions Table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  duration_minutes INT NOT NULL,
  breaks_taken INT DEFAULT 0,
  hints_given INT DEFAULT 0,
  distractions INT DEFAULT 0,
  points_earned INT DEFAULT 0,
  ended_early BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Points Table
CREATE TABLE points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  total_points INT DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Rewards Table
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reward_description TEXT NOT NULL,
  points_spent INT NOT NULL,
  redeemed_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Settings Table
CREATE TABLE settings (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  notifications_enabled BOOLEAN DEFAULT TRUE,
  dark_mode_enabled BOOLEAN DEFAULT FALSE
);
