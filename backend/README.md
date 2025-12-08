# Personal Expense Tracker - Backend API

A robust RESTful API built with Node.js, Express, and PostgreSQL for managing personal expenses with authentication, image uploads, and comprehensive statistics.

## 🚀 Features

- ✅ User authentication with JWT tokens
- ✅ Secure password hashing with bcrypt
- ✅ CRUD operations for expenses
- ✅ Image upload to Cloudinary (receipts & avatars)
- ✅ Expense statistics by category
- ✅ Input validation and error handling
- ✅ Rate limiting for security
- ✅ CORS enabled for React Native
- ✅ PostgreSQL database with Supabase
- ✅ Ready for Vercel deployment

## 📋 Prerequisites

- Node.js 18.x or higher
- PostgreSQL database (Supabase recommended)
- Cloudinary account
- Vercel account (for deployment)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env` and fill in your values:

   ```bash
   cp .env.example .env
   ```

   Update the following variables:

   - `DATABASE_URL`: Your PostgreSQL connection string from Supabase
   - `JWT_SECRET`: Generate a strong random string
   - `CLOUDINARY_CLOUD_NAME`: From your Cloudinary dashboard
   - `CLOUDINARY_API_KEY`: From your Cloudinary dashboard
   - `CLOUDINARY_API_SECRET`: From your Cloudinary dashboard

4. **Set up the database**

   Run the SQL schema in your Supabase SQL editor:

   ```bash
   # Copy the contents of src/database/schema.sql
   # and run it in Supabase SQL Editor
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3000`

## 📚 API Documentation (Quick Reference)

**Base URLs**

- Local: `http://localhost:3000/api`
- Production: `https://your-vercel-app.vercel.app/api`

### Authentication

| Endpoint             | Method | Auth         | Body                                                                       | Notes                          |
| -------------------- | ------ | ------------ | -------------------------------------------------------------------------- | ------------------------------ |
| `/api/auth/register` | POST   | None         | `email` (string, valid email), `password` (string, min 6), `name` (string) | Creates user and returns token |
| `/api/auth/login`    | POST   | None         | `email` (string), `password` (string)                                      | Returns token and user info    |
| `/api/auth/profile`  | GET    | Bearer token | —                                                                          | Returns current user profile   |
| `/api/auth/profile`  | PUT    | Bearer token | `name` (string, optional), `avatar` (file, optional)                       | multipart/form-data            |

**Register request (JSON)**

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Login response example**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "avatar_url": null
    },
    "token": "jwt_token_here"
  }
}
```

### Expenses

| Endpoint              | Method | Auth         | Body                                                                                                                                                      | Notes                                 |
| --------------------- | ------ | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `/api/expenses`       | POST   | Bearer token | `amount` (number > 0, max 2dp), `category` (enum), `description` (string, optional, max 500), `date` (YYYY-MM-DD, not future), `receipt` (file, optional) | multipart/form-data allowed           |
| `/api/expenses`       | GET    | Bearer token | Query: `page` (int, default 1), `limit` (int, default 50)                                                                                                 | Returns paginated list                |
| `/api/expenses/:id`   | GET    | Bearer token | —                                                                                                                                                         | Get single expense                    |
| `/api/expenses/:id`   | PUT    | Bearer token | Same fields as create (all optional), `receipt` (file optional)                                                                                           | multipart/form-data allowed           |
| `/api/expenses/:id`   | DELETE | Bearer token | —                                                                                                                                                         | Deletes expense                       |
| `/api/expenses/stats` | GET    | Bearer token | —                                                                                                                                                         | Returns totals and per-category stats |

**Create expense (JSON)**

```http
POST /api/expenses
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 50.99,
  "category": "food",
  "description": "Lunch at restaurant",
  "date": "2025-12-08"
}
```

**Create expense (with receipt)**
Use `multipart/form-data` with fields `amount`, `category`, `description`, `date`, and file `receipt`.

**Categories**
`food`, `transport`, `shopping`, `bills`, `entertainment`, `health`, `other`

**Stats response example**

```json
{
  "success": true,
  "data": {
    "total": { "count": 15, "amount": 1250.5 },
    "byCategory": [{ "category": "food", "count": 5, "total": 350.0 }]
  }
}
```

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js       # PostgreSQL connection
│   │   ├── env.js            # Environment configuration
│   │   └── cloudinary.js     # Cloudinary setup
│   ├── controllers/
│   │   ├── authController.js # Authentication logic
│   │   └── expenseController.js # Expense logic
│   ├── middleware/
│   │   ├── authenticate.js   # JWT verification
│   │   └── upload.js         # Multer file upload
│   ├── models/
│   │   ├── User.js           # User model
│   │   └── Expense.js        # Expense model
│   ├── routes/
│   │   ├── authRoutes.js     # Auth endpoints
│   │   └── expenseRoutes.js  # Expense endpoints
│   ├── utils/
│   │   ├── jwt.js            # JWT helpers
│   │   ├── validators.js     # Input validation
│   │   └── helpers.js        # Utility functions
│   └── database/
│       └── schema.sql        # Database schema
├── server.js                 # Main entry point
├── package.json
├── vercel.json              # Vercel configuration
├── .env.example
├── .gitignore
└── README.md
```

## 🚢 Deployment to Vercel

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy**

   ```bash
   vercel
   ```

4. **Set Environment Variables in Vercel Dashboard**

   - Go to your project settings in Vercel
   - Add all environment variables from `.env`
   - Redeploy the project

5. **For production deployment**
   ```bash
   vercel --prod
   ```

## 🗄️ Database Setup (Supabase)

1. Create a new project at [Supabase](https://supabase.com)
2. Go to SQL Editor
3. Copy and paste the contents of `src/database/schema.sql`
4. Run the query to create tables
5. Copy the connection string from Settings > Database
6. Add it to your `.env` file as `DATABASE_URL`

## 📦 Environment Variables

| Variable                | Description                  | Example                               |
| ----------------------- | ---------------------------- | ------------------------------------- |
| `PORT`                  | Server port                  | `3000`                                |
| `NODE_ENV`              | Environment                  | `development` or `production`         |
| `DATABASE_URL`          | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET`            | Secret for JWT signing       | Random 64-character string            |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name        | From Cloudinary dashboard             |
| `CLOUDINARY_API_KEY`    | Cloudinary API key           | From Cloudinary dashboard             |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret        | From Cloudinary dashboard             |
| `CORS_ORIGIN`           | Allowed CORS origins         | `*` for development                   |

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT authentication with 7-day expiration
- Rate limiting on auth endpoints (10 requests per 15 minutes)
- Input validation on all endpoints
- Parameterized queries to prevent SQL injection
- Helmet.js for security headers
- File upload size limits (5MB)
- Image-only uploads with type validation

## 🧪 Testing the API

You can test the API using:

- Postman
- Thunder Client (VS Code extension)
- cURL commands

Example cURL:

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","name":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

## 📝 License

ISC

## 👨‍💻 Author

Built with ❤️ for Personal Expense Tracking

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Note**: Make sure to keep your `.env` file secure and never commit it to version control.
