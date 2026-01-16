-- Check if Admin table exists and see its structure
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%admin%' OR table_name LIKE '%Admin%';

-- If the above returns nothing, the table doesn't exist
-- Run this to see all tables:
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;


