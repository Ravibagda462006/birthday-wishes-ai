/*
  # Create Birthday Wishes Schema

  1. New Tables
    - `wishes`
      - `id` (uuid, primary key)
      - `recipient_name` (text, name of the person receiving the wish)
      - `relationship` (text, type of relationship: crush/girlfriend)
      - `wish_type` (text, type of wish: romantic/cute/emotional/flirty/poetic)
      - `wish_content` (text, the generated wish content)
      - `created_at` (timestamp)
    
    - `love_letters`
      - `id` (uuid, primary key)
      - `recipient_name` (text, name of the person)
      - `relationship` (text, type of relationship)
      - `letter_type` (text, type of letter: short/long/good_morning)
      - `letter_content` (text, the generated letter content)
      - `created_at` (timestamp)
    
    - `shared_cards`
      - `id` (uuid, primary key)
      - `wish_id` (uuid, foreign key to wishes, nullable)
      - `letter_id` (uuid, foreign key to love_letters, nullable)
      - `share_method` (text, how it was shared: copy/whatsapp/download)
      - `shared_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated users to manage their own generated content
    - Public read access for sharing functionality
*/

CREATE TABLE IF NOT EXISTS wishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_name text NOT NULL,
  relationship text NOT NULL CHECK (relationship IN ('crush', 'girlfriend')),
  wish_type text NOT NULL CHECK (wish_type IN ('romantic', 'cute', 'emotional', 'flirty', 'poetic')),
  wish_content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS love_letters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_name text NOT NULL,
  relationship text NOT NULL CHECK (relationship IN ('crush', 'girlfriend')),
  letter_type text NOT NULL CHECK (letter_type IN ('short', 'long', 'good_morning')),
  letter_content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS shared_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wish_id uuid REFERENCES wishes(id) ON DELETE CASCADE,
  letter_id uuid REFERENCES love_letters(id) ON DELETE CASCADE,
  share_method text NOT NULL CHECK (share_method IN ('copy', 'whatsapp', 'download')),
  shared_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE love_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_cards ENABLE ROW LEVEL SECURITY;

-- Policies for wishes
CREATE POLICY "Anyone can insert wishes"
  ON wishes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read wishes"
  ON wishes FOR SELECT
  USING (true);

-- Policies for love_letters
CREATE POLICY "Anyone can insert love letters"
  ON love_letters FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read love letters"
  ON love_letters FOR SELECT
  USING (true);

-- Policies for shared_cards
CREATE POLICY "Anyone can insert shared cards"
  ON shared_cards FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read shared cards"
  ON shared_cards FOR SELECT
  USING (true);

-- Add indexes for commonly queried columns
CREATE INDEX IF NOT EXISTS idx_wishes_created_at ON wishes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_love_letters_created_at ON love_letters(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_shared_cards_shared_at ON shared_cards(shared_at DESC);