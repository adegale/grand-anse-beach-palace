/*
  # Fix Security Issues

  1. Indexes
    - Remove unused index `idx_rooms_slug` (duplicate of unique constraint `rooms_slug_key`)
    - Remove unused index `idx_rooms_view`
  
  2. Policies
    - Drop redundant policy "Authenticated users can view all rooms"
    - Keep "Public can view active rooms" which allows both public and authenticated users to view active rooms
  
  3. Function Security
    - Fix `update_updated_at_column` function to have immutable search_path
    - Recreate trigger after function update
  
  ## Notes
  - The unique constraint on slug already provides index coverage, so idx_rooms_slug is redundant
  - The view column index is not being used and can be removed
  - Having multiple permissive SELECT policies for authenticated role creates unnecessary complexity
  - Setting search_path in function prevents security vulnerabilities from search path manipulation
*/

-- Remove unused indexes
DROP INDEX IF EXISTS idx_rooms_slug;
DROP INDEX IF EXISTS idx_rooms_view;

-- Remove duplicate policy for authenticated users
DROP POLICY IF EXISTS "Authenticated users can view all rooms" ON rooms;

-- Drop trigger first, then function
DROP TRIGGER IF EXISTS update_rooms_updated_at ON rooms;
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Recreate function with secure search_path
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER update_rooms_updated_at
  BEFORE UPDATE ON rooms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
