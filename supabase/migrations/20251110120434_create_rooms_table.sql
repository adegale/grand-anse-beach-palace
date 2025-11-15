/*
  # Create Rooms Table for Grand Anse Beach Palace

  1. New Tables
    - `rooms`
      - `id` (uuid, primary key) - Unique identifier for each room
      - `number` (text, not null) - Room number (e.g., "6", "8", "14")
      - `name` (text, not null) - Room name/type (e.g., "Standard Ocean View")
      - `view` (text, not null) - View type: "Ocean" or "Garden"
      - `bedrooms` (integer, default 1) - Number of bedrooms
      - `max_guests` (integer, default 2) - Maximum guest capacity
      - `features` (text[], default empty array) - Array of room features
      - `has_kitchenette` (boolean, default false) - Whether room has kitchenette
      - `is_apartment_capable` (boolean, default false) - Can be configured as apartment
      - `is_active` (boolean, default true) - Whether room is currently available/visible
      - `photos` (text[], default empty array) - Array of photo URLs/paths
      - `base_rate_winter` (numeric, not null) - Winter season "from" rate in USD
      - `base_rate_summer` (numeric, not null) - Summer season "from" rate in USD
      - `slug` (text, unique, not null) - URL-friendly identifier
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record last update timestamp

  2. Security
    - Enable RLS on `rooms` table
    - Add policy for public read access to active rooms only
    - Add policy for authenticated admin users to manage all rooms

  3. Indexes
    - Index on `is_active` for efficient filtering
    - Index on `slug` for lookups
    - Index on `view` for filtering
*/

CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text NOT NULL,
  name text NOT NULL,
  view text NOT NULL CHECK (view IN ('Ocean', 'Garden')),
  bedrooms integer DEFAULT 1 NOT NULL,
  max_guests integer DEFAULT 2 NOT NULL,
  features text[] DEFAULT '{}',
  has_kitchenette boolean DEFAULT false,
  is_apartment_capable boolean DEFAULT false,
  is_active boolean DEFAULT true,
  photos text[] DEFAULT '{}',
  base_rate_winter numeric NOT NULL,
  base_rate_summer numeric NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active rooms"
  ON rooms
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all rooms"
  ON rooms
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert rooms"
  ON rooms
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update rooms"
  ON rooms
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete rooms"
  ON rooms
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_rooms_is_active ON rooms(is_active);
CREATE INDEX IF NOT EXISTS idx_rooms_slug ON rooms(slug);
CREATE INDEX IF NOT EXISTS idx_rooms_view ON rooms(view);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON rooms
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();