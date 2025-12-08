# Quick Setup Guide - Personal Expense Tracker Backend

## 🎯 Quick Start (5 minutes)

### 1. Set Up Supabase Database

1. Go to https://supabase.com and create a free account
2. Create a new project
3. Navigate to **SQL Editor** in the left sidebar
4. Copy the entire contents of `src/database/schema.sql`
5. Paste and execute it in the SQL Editor
6. Go to **Settings > Database** and copy your connection string
7. It should look like: `postgresql://postgres:[YOUR-PASSWORD]@[HOST]:5432/postgres`

### 2. Set Up Cloudinary

1. Go to https://cloudinary.com and create a free account
2. From your dashboard, note down:
   - Cloud Name
   - API Key
   - API Secret

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in your values:

   ```env
   DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
   JWT_SECRET=your_super_secret_random_string_at_least_32_chars
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

   **Generate JWT Secret:** Run this in terminal:

   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

### 4. Install Dependencies & Run

```bash
npm install
npm run dev
```

The API will run at: `http://localhost:3000`

### 5. Test the API

Use the test commands below or import into Postman.

## 🧪 Quick Test Commands

### Register a User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "name": "Test User"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

**Save the token from the response!**

### Create Expense (replace YOUR_TOKEN)

```bash
curl -X POST http://localhost:3000/api/expenses \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 25.50,
    "category": "food",
    "description": "Lunch",
    "date": "2025-12-08"
  }'
```

### Get All Expenses

```bash
curl -X GET http://localhost:3000/api/expenses \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Statistics

```bash
curl -X GET http://localhost:3000/api/expenses/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📱 Connect React Native App

In your React Native app, use this base URL:

**Development (with Expo):**

- iOS Simulator: `http://localhost:3000/api`
- Android Emulator: `http://10.0.2.2:3000/api`
- Physical Device: `http://YOUR_COMPUTER_IP:3000/api`

**Production:**

- Use your Vercel deployment URL

## 🚀 Deploy to Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - DATABASE_URL
   - JWT_SECRET
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
   - CORS_ORIGIN (set to `*` or your app's domain)
5. Deploy!

Your API will be available at: `https://your-project.vercel.app`

## 🔍 Troubleshooting

### Database Connection Error

- Check your DATABASE_URL is correct
- Ensure Supabase project is not paused (free tier pauses after inactivity)
- Verify the connection string includes the password

### Cloudinary Upload Error

- Verify all three Cloudinary credentials are correct
- Check your Cloudinary upload preset settings

### JWT Error

- Ensure JWT_SECRET is at least 32 characters
- Check the token is being sent in the header as: `Bearer YOUR_TOKEN`

### CORS Error

- Set CORS_ORIGIN in .env to `*` for development
- For production, set it to your React Native app domain

## 📚 API Documentation

Full API docs are in `README.md`

All endpoints require `Authorization: Bearer <token>` header except:

- POST /api/auth/register
- POST /api/auth/login

## 🎉 You're Ready!

Your backend is now ready to use. Start building your React Native frontend!
