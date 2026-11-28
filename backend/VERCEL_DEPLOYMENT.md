# Vercel Deployment Checklist & Quick Start

## ✅ What's Been Prepared

Your backend is now ready for Vercel deployment with the following setup:

### Infrastructure Files
- ✅ `vercel.json` - Configured with @vercel/node builder and route rules
- ✅ `.env.example` - Template for all required environment variables
- ✅ `package.json` - All dependencies listed with exact versions
- ✅ `server.js` - Properly exported for Vercel serverless environment
- ✅ `DEPLOYMENT.md` - Comprehensive deployment guide

### API Features Ready
- ✅ Authentication endpoints (register, login, profile management)
- ✅ Expense CRUD operations with pagination
- ✅ Statistics and analytics
- ✅ Image uploads to Cloudinary (avatars & receipts)
- ✅ OpenAPI/Redoc documentation at `/api/docs`
- ✅ Health check endpoints
- ✅ Rate limiting and security headers
- ✅ CORS configuration for frontend

### Code Quality
- ✅ Input validation on all endpoints
- ✅ Error handling with proper HTTP status codes
- ✅ Security: JWT tokens, bcrypt hashing, Helmet.js
- ✅ Parameterized SQL queries (no injection risks)
- ✅ CSP-compliant documentation (no external CDN scripts)

---

## 🚀 Deploy to Vercel in 5 Minutes

### Step 1: Prepare Environment Variables
Have these values ready:
```
DATABASE_URL=postgresql://user:password@host:5432/db
JWT_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CORS_ORIGIN=https://yourdomain.com
NODE_ENV=production
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Choose `achchuthany/react-native`
4. Set **Root Directory** to `backend`
5. Click "Deploy"

### Step 3: Add Environment Variables
1. After deployment, go to **Settings** → **Environment Variables**
2. Add all variables from Step 1
3. Click **Save**

### Step 4: Redeploy
1. Go to **Deployments**
2. Click the latest deployment
3. Click **Redeploy** button

### Step 5: Test Your API
```bash
# Get your Vercel URL from the deployment
VERCEL_URL=https://your-app.vercel.app

# Test health endpoint
curl $VERCEL_URL/api/health

# View API documentation
open $VERCEL_URL/api/docs
```

---

## 📚 Important Links

| Resource | Location |
|----------|----------|
| API Documentation | `GET /api/docs` |
| OpenAPI Spec | `GET /api/docs.yaml` |
| Health Check | `GET /api/health` |
| Full Deployment Guide | `backend/DEPLOYMENT.md` |
| Quick Start Guide | `backend/QUICK_START.md` |
| API Documentation | `backend/README.md` |
| Postman Collection | `backend/postman_collection.json` |

---

## 🔒 Security Reminders

Before deploying to production:

- ⚠️ **Never use `*` for CORS_ORIGIN** (only for development)
- ⚠️ **Generate a strong JWT_SECRET** - Use the command provided above
- ⚠️ **Use database connection pooling** - Configure in Supabase
- ⚠️ **Enable HTTPS only** - Automatic with Vercel
- ⚠️ **Verify all credentials** - Especially Cloudinary API keys
- ⚠️ **Set environment-specific DATABASE_URL** - Use Supabase production database

---

## 🔄 CI/CD & Auto-Deployment

Since you're using GitHub + Vercel:
- ✅ Every push to `main` branch auto-deploys
- ✅ Preview deployments for pull requests (if enabled)
- ✅ Automatic SSL certificates
- ✅ CDN and edge caching

---

## 📊 Monitoring After Deployment

### View Logs
- Vercel Dashboard → Deployments → Click deployment → Logs tab

### Check Performance
- Vercel Dashboard → Analytics → Serverless Functions
- Monitor response times and error rates

### Monitor API
- Test endpoints regularly with Postman collection
- Set up monitoring alerts in Vercel (Pro plan)

---

## 🆘 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Check all deps in package.json |
| Database timeout | Verify DATABASE_URL, use connection pooler |
| CORS errors | Update CORS_ORIGIN to your frontend domain |
| Image uploads fail | Verify Cloudinary credentials and permissions |
| 404 on `/api/docs` | Check that Redoc is installed (`npm ls redoc`) |

---

## 📝 Next Steps After Deployment

1. ✅ Update frontend `API_BASE_URL` to your Vercel deployment
2. ✅ Test all API endpoints from frontend
3. ✅ Set up custom domain (optional)
4. ✅ Configure database backups
5. ✅ Monitor logs and performance
6. ✅ Plan for scaling if needed

---

## 🎯 Frontend Integration

Once backend is deployed, update your React Native app to use:

```javascript
// Development
const API_URL = 'http://localhost:3000/api';

// Production
const API_URL = 'https://your-app.vercel.app/api';

// Example API call
const response = await fetch(`${API_URL}/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
    name: 'User Name'
  })
});

const data = await response.json();
if (data.success) {
  const token = data.data.token;
  // Store token in AsyncStorage for future requests
}
```

---

## ✨ All Set!

Your backend is committed to GitHub and ready for Vercel deployment. Follow the "Deploy to Vercel in 5 Minutes" section above to go live!

**Need help?** Check `backend/DEPLOYMENT.md` for detailed instructions.
