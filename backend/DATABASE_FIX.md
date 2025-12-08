# Database Connection Issue - Fix Guide

## Problem
Vercel deployment shows error: `ENOTFOUND db.spudxdcjjkqpvfsnrrwh.supabase.co`

This means Vercel cannot connect to your Supabase database.

---

## Solution Steps

### Step 1: Get Correct Supabase Connection String

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **Database**
4. Scroll to **Connection string** section
5. Select **Connection pooling** tab (recommended for serverless)
6. Choose **Transaction mode** 
7. Copy the connection string - it should look like:
   ```
   postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```

**Important Notes:**
- Use **port 6543** (connection pooler) for production/Vercel
- Use **port 5432** (direct connection) for local development only
- Replace `[password]` with your actual database password

### Step 2: Update Vercel Environment Variables

1. Go to Vercel Dashboard: https://vercel.com
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Find `DATABASE_URL` variable
5. Click **Edit**
6. Replace with your correct Supabase connection string from Step 1
7. Click **Save**

**Format should be:**
```
postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
```

### Step 3: Update Local .env File

Update your local `.env` file with the correct connection string:

```bash
cd backend
nano .env  # or use your preferred editor
```

Update the `DATABASE_URL` line:
```env
# For local development (direct connection - port 5432)
DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres

# OR for testing with pooler locally (port 6543)
DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
```

### Step 4: Redeploy on Vercel

After updating environment variables:

**Option A: Via Vercel Dashboard**
1. Go to **Deployments**
2. Click on the latest deployment
3. Click **Redeploy** button

**Option B: Push to GitHub (auto-deploy)**
```bash
git add .
git commit -m "fix: Update database configuration for connection pooling"
git push origin main
```

---

## Connection String Format Guide

### Direct Connection (Port 5432) - Local Development
```
postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
```
- Good for: Local development
- Connections: Limited to 60 concurrent connections
- Latency: Lower

### Connection Pooler (Port 6543) - Production/Vercel
```
postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
```
- Good for: Serverless (Vercel, AWS Lambda)
- Connections: Unlimited (pooled)
- Required for: Serverless environments

### Legacy Format (May Not Work)
```
postgresql://user:password@db.xxxxx.supabase.co:5432/database
```
- This format may be outdated
- Update to the pooler format above

---

## Verify Connection

### Test Locally
```bash
cd backend
npm run dev
```

Look for: `✅ Connected to PostgreSQL database`

### Test Database Query
```bash
# Using psql
psql "postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres" -c "SELECT version();"
```

### Test API Endpoint
```bash
# After deployment
curl https://your-app.vercel.app/api/health
```

---

## Troubleshooting

### Error: ENOTFOUND
- ✅ Verify hostname is correct in DATABASE_URL
- ✅ Check if project is paused on Supabase (free tier)
- ✅ Ensure password has no special characters (or URL encode them)

### Error: ECONNREFUSED
- ✅ Wrong port (use 6543 for pooler, not 5432)
- ✅ Firewall blocking connection

### Error: Connection timeout
- ✅ Use connection pooler (port 6543) for Vercel
- ✅ Increase `connectionTimeoutMillis` in database.js
- ✅ Check Supabase project status

### Error: Too many connections
- ✅ Must use connection pooler (port 6543)
- ✅ Check `max` setting in database.js

---

## Updated Configuration

Your `backend/src/config/database.js` now includes:

```javascript
const pool = new Pool({
  connectionString: config.database.connectionString,
  ssl: { rejectUnauthorized: false },
  max: 20,                          // Max connections in pool
  idleTimeoutMillis: 30000,        // Close idle after 30s
  connectionTimeoutMillis: 10000,  // Timeout after 10s
});
```

---

## Quick Fix Checklist

- [ ] Get correct connection string from Supabase (with pooler, port 6543)
- [ ] Update DATABASE_URL in Vercel environment variables
- [ ] Update local .env file (optional, for testing)
- [ ] Redeploy on Vercel
- [ ] Test health endpoint
- [ ] Verify logs in Vercel Dashboard

---

## Example: Correct DATABASE_URL

**Replace these placeholders:**
- `[project-ref]`: Your Supabase project reference (e.g., `spudxdcjjkqpvfsnrrwh`)
- `[password]`: Your database password
- `[region]`: Your region (e.g., `us-east-1`)

**Result:**
```
postgresql://postgres.spudxdcjjkqpvfsnrrwh:MySecurePass123@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

---

## Need Help?

1. Check Vercel logs: Dashboard → Deployments → Logs
2. Check Supabase status: Dashboard → Project → Reports
3. Verify environment variables are set correctly
4. Test connection locally first before deploying
