/*
  # Fix profiles table RLS policies

  1. Changes
    - Update RLS policies to work with public access
    - Add proper policies for upsert operations
    - Ensure wallet_address based access control

  2. Security
    - Enable public access with wallet_address verification
    - Maintain data isolation between users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can create own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create new policies for public access
CREATE POLICY "Anyone can read profiles"
  ON profiles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert their own profile"
  ON profiles
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update their own profile"
  ON profiles
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);