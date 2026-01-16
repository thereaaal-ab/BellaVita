-- ============================================
-- QUICK SETUP: Supabase Admin Authentication
-- ============================================
-- Run this AFTER creating an admin user in Supabase Auth
-- ============================================

-- Step 0: Verify Admin table exists (run this first to check)
-- If you get an error, the table doesn't exist yet
-- Run: npm run db:push in your project to create it

-- Step 1: Create helper function to verify admin
-- Note: If table doesn't exist, create it first or run: npm run db:push
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

-- Step 2: Enable Row Level Security (only if table exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'Admin'
  ) THEN
    ALTER TABLE "Admin" ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Step 3: Drop existing policy if it exists, then create RLS policy
DROP POLICY IF EXISTS "Admins can read own record" ON "Admin";

CREATE POLICY "Admins can read own record"
  ON "Admin"
  FOR SELECT
  USING (auth.uid()::text = id);

-- Step 4: Insert your admin user
-- REPLACE THESE VALUES:
--   - 'USER_ID_HERE' with the UUID from auth.users
--   - 'admin@yourdomain.com' with your admin email
-- Note: Make sure to include createdAt and updatedAt
INSERT INTO "Admin" (id, email, name, role, "createdAt", "updatedAt")
VALUES (
  'USER_ID_HERE',              -- Get from Authentication > Users after creating user
  'admin@yourdomain.com',     -- Your admin email
  'Admin User',                -- Display name
  'admin',                     -- Role: 'admin' or 'super_admin'
  NOW(),                       -- createdAt
  NOW()                        -- updatedAt
)
ON CONFLICT (email) DO UPDATE
SET name = EXCLUDED.name, 
    role = EXCLUDED.role,
    "updatedAt" = NOW();

-- ============================================
-- How to get USER_ID:
-- ============================================
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Find your admin user (or create one)
-- 3. Click on the user to see details
-- 4. Copy the UUID (User ID)
-- 5. Replace 'USER_ID_HERE' above with that UUID
-- ============================================

