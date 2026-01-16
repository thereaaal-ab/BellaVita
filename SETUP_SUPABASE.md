# Quick Supabase Setup for Your Project

## Your Supabase Details
- **Project ID**: trihldwbuukpqesttwnk
- **URL**: https://trihldwbuukpqesttwnk.supabase.co
- **Anon Key**: (already saved)

## Step 1: Get Your Database Connection String

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/trihldwbuukpqesttwnk
2. Navigate to **Settings** → **Database**
3. Scroll down to **Connection string** section
4. Under **Connection pooling**, select **Transaction** mode
5. You'll see a connection string like:
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```
6. **Important**: You need the password you set when creating the Supabase project
   - If you forgot it, go to **Settings** → **Database** → **Database password** → **Reset database password**

## Step 2: Update .env.local

Create or update `.env.local` in your project root with:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.trihldwbuukpqesttwnk.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
```

Replace `[YOUR-PASSWORD]` with your actual database password.

**Alternative connection string format** (if the above doesn't work):
```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

## Step 3: Push Schema to Supabase

Once `.env.local` is set up, run:

```bash
npm run db:push
```

This will create all your tables in Supabase.

## Step 4: Seed the Database (Optional)

To add initial menu items, blog posts, etc.:

```bash
npm run db:seed
```

## Step 5: Verify in Supabase Dashboard

1. Go to **Table Editor** in your Supabase dashboard
2. You should see all your tables:
   - MenuItem
   - Reservation
   - BlogPost
   - Review
   - Order
   - Newsletter

## Step 6: Add to Vercel

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add `DATABASE_URL` with the same connection string
4. Redeploy your application

## Troubleshooting

### "Password authentication failed"
- Make sure you're using the correct database password (not your Supabase account password)
- Reset the password in Supabase dashboard if needed

### "Connection refused"
- Check that your IP is allowed (Supabase allows all by default)
- Try using the direct connection string instead of pooler

### "Relation does not exist"
- Run `npm run db:push` to create the tables
- Check that the schema was pushed successfully


