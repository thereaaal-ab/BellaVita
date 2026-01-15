# Supabase Setup Guide

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: Bella Vita (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait 2-3 minutes for the project to be created

## Step 2: Get Your Database Connection String

1. In your Supabase project dashboard, go to **Settings** → **Database**
2. Scroll down to **Connection string**
3. Under **Connection pooling**, select **Transaction** mode
4. Copy the connection string (it looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)
5. Replace `[YOUR-PASSWORD]` with the password you created in Step 1

## Step 3: Set Environment Variables

### For Local Development (.env.local)

Create or update `.env.local`:
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
```

### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name**: `DATABASE_URL`
   - **Value**: Your Supabase connection string (same as above)
   - **Environments**: Select all (Production, Preview, Development)
4. Click **Save**

## Step 4: Push Database Schema

Run these commands in your project directory:

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to Supabase
npm run db:push

# (Optional) Seed the database with initial data
npm run db:seed
```

## Step 5: Verify Connection

1. Start your dev server: `npm run dev`
2. Try submitting a reservation at `/reservations`
3. Check your Supabase dashboard → **Table Editor** to see the data

## Benefits of Supabase over SQLite

✅ **Works on Vercel**: SQLite doesn't work on serverless platforms  
✅ **Production-ready**: PostgreSQL is battle-tested  
✅ **Free tier**: 500MB database, 2GB bandwidth  
✅ **Real-time**: Can add real-time features later  
✅ **Scalable**: Easy to upgrade as you grow  
✅ **Backups**: Automatic daily backups  
✅ **Dashboard**: Visual database management  

## Troubleshooting

### Connection Issues
- Make sure you're using the **Transaction** mode connection string
- Verify your password is correct (no special characters need encoding)
- Check that your IP is allowed (Supabase allows all by default)

### Migration Issues
- If you have existing SQLite data, you'll need to export and import it
- Run `npm run db:push` to sync your schema
- Check Supabase logs in the dashboard for errors

## Next Steps

After setup, you can:
- View your data in Supabase dashboard
- Set up Row Level Security (RLS) policies
- Add real-time subscriptions
- Use Supabase Auth for user authentication
- Set up database backups

