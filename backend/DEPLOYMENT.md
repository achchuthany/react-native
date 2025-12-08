# Deployment Guide - Vercel

## Prerequisites

- Vercel account (https://vercel.com)
- Git repository pushed to GitHub/GitLab/Bitbucket
- Environment variables ready (see below)

## Environment Variables Required for Production

When deploying to Vercel, you must set the following environment variables in your Vercel project settings:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# JWT Secret (Generate a strong random string: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
JWT_SECRET=your_production_jwt_secret_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS Origin (set to your frontend domain, e.g., https://myapp.com)
CORS_ORIGIN=https://yourdomain.com

# Node Environment
NODE_ENV=production
```

## Step-by-Step Deployment

### 1. Push to GitHub

```bash
cd backend
git add .
git commit -m "Backend: Add Vercel deployment configuration"
git push origin main
```

### 2. Import to Vercel

1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Choose your repository
4. Set Project Name: `expense-tracker-backend`
5. Set Root Directory: `backend` (if at root level, leave empty)
6. Click "Deploy"

### 3. Add Environment Variables

1. In Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add all the variables listed above
3. Click "Save"

### 4. Redeploy

1. Go to Deployments
2. Click the latest deployment
3. Redeploy (or just wait for automatic redeploy after env vars are set)

## Testing Production Deployment

Once deployed, test your endpoints:

```bash
# Test health
curl https://your-vercel-url.vercel.app/api/health

# Test API docs
curl https://your-vercel-url.vercel.app/api/docs

# Test register
curl -X POST https://your-vercel-url.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

## Troubleshooting

### Issue: "Cannot find module" errors

**Solution:** Ensure all dependencies are in `package.json` devDependencies are not installed in production.

### Issue: Database connection timeout

**Solution:** Check DATABASE_URL format and ensure Postgres connection pool isn't exhausted. Use Supabase connection pooler if available.

### Issue: CORS errors from frontend

**Solution:** Update CORS_ORIGIN environment variable to your frontend domain(s).

### Issue: Image upload fails

**Solution:** Verify CLOUDINARY\_\* credentials are correct and API key has upload permissions.

## Monitoring

1. **View Logs:** Vercel Dashboard → Deployments → Click deployment → Logs
2. **Monitor Performance:** Use Vercel Analytics
3. **Error Tracking:** Check Vercel Error Log for uncaught exceptions

## Custom Domain

1. In Vercel → Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update CORS_ORIGIN environment variable to match domain

## Rollback

To rollback to a previous version:

1. Vercel Dashboard → Deployments
2. Click on the desired previous deployment
3. Click "Promote to Production"

## Additional Security

For production:

- ✅ Set strong JWT_SECRET
- ✅ Use environment-specific database URLs
- ✅ Enable rate limiting (already configured)
- ✅ Use HTTPS only (automatic with Vercel)
- ✅ Set specific CORS_ORIGIN (not wildcard)
- ✅ Keep dependencies updated regularly

## Next Steps

1. Set up database backups with Supabase
2. Enable database connection pooling
3. Configure custom domain with SSL
4. Set up monitoring/alerting for uptime
5. Review security headers (Helmet is already configured)
