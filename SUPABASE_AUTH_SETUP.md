# Supabase Authentication Setup for Admin Dashboard

This guide will help you set up proper authentication for your admin dashboard using Supabase Auth.

## Prerequisites

1. A Supabase project (already set up)
2. Access to Supabase Dashboard
3. Your project ID: `trihldwbuukpqesttwnk`

## Step 1: Run SQL Migration

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/trihldwbuukpqesttwnk
2. Navigate to **SQL Editor** (in the left sidebar)
3. Click **New Query**
4. Open the file `supabase_auth_setup.sql` in this project
5. Copy and paste the entire SQL script
6. Click **Run** to execute

This will:
- Create helper functions for admin authentication
- Set up Row Level Security (RLS) policies
- Create functions to verify admin users

## Step 2: Create Admin User in Supabase Auth

1. In Supabase Dashboard, go to **Authentication** → **Users**
2. Click **Add User** (or **Invite User**)
3. Fill in:
   - **Email**: `admin@yourdomain.com` (use your actual email)
   - **Password**: Create a strong password
   - **Auto Confirm User**: ✅ Check this box
4. Click **Create User**
5. **Important**: Copy the **User ID** (UUID) - you'll need this in the next step

## Step 3: Link Auth User to Admin Table

1. Go back to **SQL Editor**
2. Run this query (replace the values):

```sql
INSERT INTO "Admin" (id, email, name, role)
VALUES (
  'PASTE_USER_ID_FROM_STEP_2_HERE',  -- The UUID you copied
  'admin@yourdomain.com',            -- The email you used
  'Admin User',                      -- Display name
  'admin'                            -- Role: 'admin' or 'super_admin'
)
ON CONFLICT (email) DO UPDATE
SET name = EXCLUDED.name, role = EXCLUDED.role;
```

## Step 4: Get Supabase Credentials

1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://trihldwbuukpqesttwnk.supabase.co`
   - **anon/public key**: Copy the `anon` `public` key
   - **service_role key**: Copy the `service_role` `secret` key (keep this secret!)

## Step 5: Update Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://trihldwbuukpqesttwnk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Important**: Never commit the service role key to git. It has admin privileges.

## Step 6: Install Supabase Client

```bash
npm install @supabase/supabase-js @supabase/ssr
```

## Step 7: Update Your Code

The admin pages will need to be updated to use Supabase Auth. See the implementation files for examples.

## Security Notes

- The `SUPABASE_SERVICE_ROLE_KEY` should only be used in server-side API routes
- Never expose the service role key to the client
- Use the anon key for client-side operations
- Row Level Security (RLS) policies protect your data
- Always verify admin status on the server side

## Troubleshooting

### "User not found in Admin table"
- Make sure you ran the INSERT query in Step 3
- Verify the User ID matches the one from auth.users

### "Permission denied"
- Check that RLS policies are set up correctly
- Verify you're using the correct Supabase keys

### "Function does not exist"
- Make sure you ran the entire SQL script from `supabase_auth_setup.sql`
- Check for any errors in the SQL Editor

## Next Steps

After completing this setup:
1. Update `app/admin/page.tsx` to use Supabase Auth
2. Update `app/admin/reservations/page.tsx` to check authentication
3. Create API middleware to verify admin status
4. Test the authentication flow


