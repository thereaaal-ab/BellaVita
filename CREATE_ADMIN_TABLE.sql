-- ============================================
-- Create Admin Table (if it doesn't exist)
-- ============================================
-- Run this FIRST before QUICK_AUTH_SETUP.sql
-- ============================================

-- Check if Admin table exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'Admin'
  ) THEN
    -- Create the Admin table
    CREATE TABLE "Admin" (
      id        TEXT PRIMARY KEY,
      email     TEXT UNIQUE NOT NULL,
      name      TEXT,
      role      TEXT NOT NULL DEFAULT 'admin',
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
    );

    -- Create index on email for faster lookups
    CREATE INDEX IF NOT EXISTS "Admin_email_idx" ON "Admin"(email);

    RAISE NOTICE 'Admin table created successfully';
  ELSE
    RAISE NOTICE 'Admin table already exists';
  END IF;
END $$;

-- Verify the table was created
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'Admin'
ORDER BY ordinal_position;

