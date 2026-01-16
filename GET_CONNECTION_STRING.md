# How to Get the Correct Supabase Connection String

## Step-by-Step Instructions

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard/project/trihldwbuukpqesttwnk

2. **Navigate to Database Settings**
   - Click on **Settings** (gear icon) in the left sidebar
   - Click on **Database** in the settings menu

3. **Get the Connection String**
   - Scroll down to the **Connection string** section
   - You'll see different connection modes:
     - **URI** (for direct connections)
     - **Connection pooling** (for serverless/serverless-friendly)
   
4. **For Prisma, use one of these:**
   
   **Option A: Direct Connection (Transaction mode)**
   - Under **Connection pooling**, select **Transaction** mode
   - Copy the connection string
   - It should look like:
     ```
     postgresql://postgres.trihldwbuukpqesttwnk:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
     ```
   
   **Option B: Direct Connection (Session mode)**
   - Use the **URI** connection string
   - It should look like:
     ```
     postgresql://postgres:[YOUR-PASSWORD]@db.trihldwbuukpqesttwnk.supabase.co:5432/postgres
     ```

5. **Update .env.local**
   - Replace `[YOUR-PASSWORD]` with: `MApfJQfRaxpUEeD3`
   - The full connection string should be:
     ```
     DATABASE_URL="postgresql://postgres:MApfJQfRaxpUEeD3@db.trihldwbuukpqesttwnk.supabase.co:5432/postgres"
     ```
   
   OR for connection pooling:
     ```
     DATABASE_URL="postgresql://postgres.trihldwbuukpqesttwnk:MApfJQfRaxpUEeD3@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
     ```

## Common Issues

### "Can't reach database server"
- The direct connection (port 5432) might be blocked
- Try using the connection pooler instead (port 6543)
- Check if your IP needs to be whitelisted (usually not needed)

### "Tenant or user not found"
- Make sure you're using the correct connection string format
- The pooler format uses: `postgres.trihldwbuukpqesttwnk` (with project ID)
- The direct format uses: `postgres` (standard user)

### Connection Works but Schema Push Fails
- Make sure you have the correct permissions
- Try using the direct connection (Session mode) for migrations
- Connection pooler is better for runtime, but direct is better for migrations

## Recommended Setup

For **development and migrations**, use the **direct connection** (Session mode):
```
DATABASE_URL="postgresql://postgres:MApfJQfRaxpUEeD3@db.trihldwbuukpqesttwnk.supabase.co:5432/postgres"
```

For **production/Vercel**, use the **connection pooler** (Transaction mode):
```
DATABASE_URL="postgresql://postgres.trihldwbuukpqesttwnk:MApfJQfRaxpUEeD3@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

## Next Steps

Once you have the correct connection string:
1. Update `.env.local` with the connection string
2. Run: `npm run db:push`
3. Run: `npm run db:seed` (optional)


