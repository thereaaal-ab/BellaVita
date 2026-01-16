# Vercel Deployment Setup Guide

This guide will help you configure your Bella Vita restaurant website on Vercel with Supabase database.

## Step 1: Add Environment Variables in Vercel

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Select your project: **BellaVita** (or your project name)
3. Navigate to **Settings** → **Environment Variables**
4. Add the following environment variable:

### DATABASE_URL

**For Production (Vercel):**
- Use the **Connection Pooler** with **Transaction mode** (port 6543)
- This is required because Vercel is IPv4-only and needs the pooler

**Connection String Format:**
```
postgresql://postgres.trihldwbuukpqesttwnk:MApfJQfRaxpUEeD3@aws-1-eu-west-3.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Steps to get the correct connection string:**
1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/trihldwbuukpqesttwnk
2. Navigate to **Settings** → **Database**
3. Scroll to **Connection string** section
4. Click on **Connection pooling** tab
5. Select **Transaction** mode
6. Copy the connection string
7. Replace `[YOUR-PASSWORD]` with: `MApfJQfRaxpUEeD3`

**In Vercel:**
- **Name**: `DATABASE_URL`
- **Value**: The connection string from above
- **Environment**: Select **Production**, **Preview**, and **Development** (or just Production if you prefer)

## Step 2: Redeploy Your Application

After adding the environment variable:

1. Go to **Deployments** tab in Vercel
2. Click the **⋯** (three dots) on your latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger a new deployment

## Step 3: Verify Database Connection

After deployment:

1. Visit your site: https://bella-vita-beta.vercel.app/menu
2. The menu should now load with all items
3. Check Vercel logs if issues persist:
   - Go to **Deployments** → Click on your deployment → **Functions** tab
   - Check the logs for any database connection errors

## Step 4: Check Vercel Function Logs

If the menu still doesn't load:

1. In Vercel Dashboard, go to **Deployments**
2. Click on your latest deployment
3. Go to **Functions** tab
4. Click on `/api/menu` function
5. Check the **Logs** for errors

Common errors:
- `DATABASE_URL is not configured` → Environment variable not set
- `Can't reach database server` → Wrong connection string or network issue
- `Tenant or user not found` → Incorrect pooler connection string format

## Important Notes

### Connection String Differences

**Local Development (.env.local):**
- Use **Session Pooler** (port 5432) for migrations
- Format: `postgresql://postgres.trihldwbuukpqesttwnk:MApfJQfRaxpUEeD3@aws-1-eu-west-3.pooler.supabase.com:5432/postgres?pgbouncer=true`

**Vercel Production:**
- Use **Transaction Pooler** (port 6543) for serverless
- Format: `postgresql://postgres.trihldwbuukpqesttwnk:MApfJQfRaxpUEeD3@aws-1-eu-west-3.pooler.supabase.com:6543/postgres?pgbouncer=true`

### Why Different Ports?

- **Port 5432 (Session)**: Better for migrations and long-lived connections
- **Port 6543 (Transaction)**: Required for serverless/Vercel (IPv4 compatible)

## Troubleshooting

### Menu shows "Loading menu..." forever
- Check if `DATABASE_URL` is set in Vercel
- Verify the connection string format
- Check Vercel function logs for errors

### Menu shows "Menu is unavailable"
- Database connection failed
- Check Supabase project is active
- Verify password is correct
- Check Vercel logs for specific error

### Empty menu array
- Database might be empty
- Run `npm run db:seed` locally to populate
- Or use Supabase Dashboard to add menu items

## Quick Fix Checklist

- [ ] Added `DATABASE_URL` to Vercel environment variables
- [ ] Used Transaction Pooler connection string (port 6543)
- [ ] Selected all environments (Production, Preview, Development)
- [ ] Redeployed the application
- [ ] Checked Vercel function logs for errors
- [ ] Verified database has menu items (run seed locally or check Supabase)

## Need Help?

If issues persist:
1. Check Vercel deployment logs
2. Check Supabase database is accessible
3. Verify connection string format matches exactly
4. Ensure Supabase project is not paused


