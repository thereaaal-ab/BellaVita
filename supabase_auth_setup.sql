-- ============================================
-- Supabase Authentication Setup for Admin Dashboard
-- ============================================
-- 
-- This SQL script sets up authentication for the admin dashboard
-- Run this in your Supabase SQL Editor
--
-- Steps:
-- 1. Go to your Supabase Dashboard
-- 2. Navigate to SQL Editor
-- 3. Create a new query
-- 4. Paste and run this entire script
-- ============================================

-- Enable Row Level Security (RLS) on auth.users if not already enabled
-- This is usually enabled by default in Supabase

-- Create a function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM "Admin" 
    WHERE id = user_id::text
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get admin user by email
CREATE OR REPLACE FUNCTION get_admin_by_email(user_email TEXT)
RETURNS TABLE (
  id TEXT,
  email TEXT,
  name TEXT,
  role TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.email,
    a.name,
    a.role,
    a."createdAt",
    a."updatedAt"
  FROM "Admin" a
  WHERE a.email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to automatically create an Admin record when a user signs up
-- This assumes you're using Supabase Auth and want to link auth.users to Admin table
CREATE OR REPLACE FUNCTION handle_new_admin_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create admin record if email matches admin pattern
  -- You can customize this logic based on your needs
  IF NEW.email LIKE '%@yourdomain.com' OR NEW.email = 'admin@example.com' THEN
    INSERT INTO "Admin" (id, email, name, role)
    VALUES (
      NEW.id::text,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'name', 'Admin User'),
      'admin'
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users (if you want automatic admin creation)
-- Note: This requires superuser privileges. You may need to run this manually
-- or use Supabase Dashboard to set it up
-- 
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION handle_new_admin_user();

-- ============================================
-- Manual Admin User Creation
-- ============================================
-- Instead of using triggers, you can manually create admin users
-- First, create a user in Supabase Auth (Authentication > Users > Add User)
-- Then run this to link them to the Admin table:

-- Example: Create admin user (replace with actual user ID and email)
-- INSERT INTO "Admin" (id, email, name, role)
-- VALUES (
--   'USER_ID_FROM_AUTH_USERS',  -- Get this from auth.users table after creating user
--   'admin@yourdomain.com',
--   'Admin User',
--   'admin'
-- )
-- ON CONFLICT (email) DO UPDATE
-- SET name = EXCLUDED.name, role = EXCLUDED.role;

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================
-- Enable RLS on Admin table
ALTER TABLE "Admin" ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can read their own record
CREATE POLICY "Admins can read own record"
  ON "Admin"
  FOR SELECT
  USING (auth.uid()::text = id);

-- Policy: Super admins can read all admin records
-- (Adjust based on your role system)
CREATE POLICY "Super admins can read all"
  ON "Admin"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "Admin"
      WHERE id = auth.uid()::text
      AND role = 'super_admin'
    )
  );

-- ============================================
-- Helper Functions for API Routes
-- ============================================

-- Function to verify admin authentication
CREATE OR REPLACE FUNCTION verify_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM "Admin" 
    WHERE id = user_id::text
    AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Setup Instructions
-- ============================================
-- 
-- 1. Run this entire script in Supabase SQL Editor
-- 
-- 2. Create an admin user in Supabase Auth:
--    - Go to Authentication > Users
--    - Click "Add User"
--    - Enter email and password
--    - Copy the User ID
-- 
-- 3. Link the auth user to Admin table:
--    INSERT INTO "Admin" (id, email, name, role)
--    VALUES (
--      'PASTE_USER_ID_HERE',
--      'admin@yourdomain.com',
--      'Admin User',
--      'admin'
--    );
-- 
-- 4. Update your .env.local with Supabase credentials:
--    NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
--    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
--    SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
-- 
-- 5. Install Supabase client in your Next.js app:
--    npm install @supabase/supabase-js @supabase/ssr
-- 
-- 6. Update admin authentication to use Supabase Auth instead of localStorage
-- 
-- ============================================

