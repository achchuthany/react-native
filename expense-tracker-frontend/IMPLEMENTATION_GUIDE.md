# Expense Tracker Frontend - Implementation Guide

## 📱 Project Overview

A beginner-friendly React Native expense tracking app with minimal styling and clean code architecture. Features:

- User authentication (Sign In / Sign Up)
- View expenses with statistics
- Delete expenses
- Secure token storage with expo-secure-store
- Form validation with Joi
- API integration with Axios

---

## 📁 Project Structure

```
expense-tracker-frontend/
├── App.js                           # Main entry point
├── package.json                     # Dependencies
├── src/
│   ├── screens/
│   │   ├── SignInScreen.js         # Login screen
│   │   ├── SignUpScreen.js         # Registration screen
│   │   └── HomeScreen.js           # Expenses list + stats
│   ├── navigation/
│   │   └── RootNavigator.js        # Stack navigation
│   ├── utils/
│   │   ├── api.js                  # Axios instance + interceptors
│   │   └── storage.js              # Token storage helpers
│   └── validation/
│       └── schemas.js              # Joi validation schemas
└── assets/                          # App icons and splash screen
```

---

## 🛠️ Step-by-Step Implementation

### Step 1: Project Setup ✅

**What was done:**

- Created folder structure for better organization
- Dependencies already installed:
  - `@react-navigation/*` - Navigation library
  - `axios` - HTTP client
  - `joi` - Schema validation
  - `expo-secure-store` - Secure token storage

**Command to run locally:**

```bash
cd expense-tracker-frontend
npm start
```

---

### Step 2: API Configuration (`src/utils/api.js`)

**Purpose:** Centralized API communication

**Key Features:**

```javascript
// 1. Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:3000/api", // Change to your Vercel URL
});

// 2. Interceptor: Add token to every request
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. Interceptor: Handle responses globally
api.interceptors.response.use(
  (response) => response.data, // Return only data
  (error) => {
    if (error.response?.status === 401) {
      // Clear token if unauthorized
      SecureStore.deleteItemAsync("auth_token");
    }
    return Promise.reject(error.response?.data || error.message);
  }
);
```

**Best Practice:**

- Uses interceptors to avoid repetitive code
- Automatically adds JWT token to all requests
- Handles unauthorized responses globally

---

### Step 3: Token Storage (`src/utils/storage.js`)

**Purpose:** Secure token persistence

**Three Simple Functions:**

```javascript
// Save token after login
saveToken(token);

// Retrieve token on app startup
getToken();

// Remove token on logout
removeToken();
```

**Why Expo Secure Store?**

- Encrypted storage (better than AsyncStorage)
- Platform-specific: iOS Keychain, Android Keystore
- Beginner-friendly API

---

### Step 4: Form Validation (`src/validation/schemas.js`)

**Purpose:** Validate user input on client side

**Using Joi for Simple Validation:**

```javascript
const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
```

**Validation Helper:**

```javascript
const { valid, errors } = validateForm(data, schema);
// Returns: { valid: true/false, errors: { fieldName: 'error message' } }
```

**Best Practices:**

- Validate before API call (faster feedback)
- Show field-specific errors
- Support multiple error types (length, format, required)

---

### Step 5: Sign In Screen (`src/screens/SignInScreen.js`)

**What It Does:**

1. User enters email + password
2. Client-side validation with Joi
3. API call to `/auth/login`
4. Save token if successful
5. Navigate to Home screen

**Code Flow:**

```javascript
const handleSignIn = async () => {
  // 1. Validate
  const validation = validateForm({ email, password }, signInSchema);
  if (!validation.valid) return;

  // 2. API call
  const response = await api.post("/auth/login", { email, password });

  // 3. Save token
  await saveToken(response.data.token);

  // 4. Update state
  onLoginSuccess();
};
```

**UI Elements:**

- Email input
- Password input
- Submit button with loading indicator
- Error messages per field
- Link to Sign Up

---

### Step 6: Sign Up Screen (`src/screens/SignUpScreen.js`)

**Almost identical to Sign In:**

- Adds "Name" field
- Uses different validation schema
- Calls `/auth/register` endpoint
- Same token saving flow

---

### Step 7: Home Screen (`src/screens/HomeScreen.js`)

**What It Does:**

1. Load expenses on mount
2. Display stats (total spending, count)
3. Show list of expenses
4. Allow delete with confirmation
5. Logout button

**API Calls:**

```javascript
// Load both expenses and stats in parallel
Promise.all([api.get("/expenses?limit=10"), api.get("/expenses/stats")]);
```

**Features:**

- Pull-to-refresh
- Empty state message
- Delete confirmation dialog
- Loading indicator
- Logout button

---

### Step 8: Navigation (`src/navigation/RootNavigator.js`)

**Navigation Logic:**

```
App Starts
    ↓
Check Token
    ↓
Token exists? → YES → Show HomeScreen
    ↓ NO
Show SignIn Stack
    ↓
SignIn Screen
    ↓
If no account → Navigate to SignUp (Modal)
    ↓
After successful auth → Show HomeScreen
```

**Key Points:**

- `useEffect` checks token on app startup
- Stack navigator for Sign In/Sign Up
- Conditional rendering based on `isLoggedIn` state
- SignUp appears as modal overlay

---

## 🚀 Setup & Running the App

### 1. Install Dependencies

```bash
cd expense-tracker-frontend
npm install
```

### 2. Configure Backend URL

Edit `src/utils/api.js`:

```javascript
// For local development:
const API_BASE_URL = "http://localhost:3000/api";

// For production (Vercel):
const API_BASE_URL = "https://your-app.vercel.app/api";
```

### 3. Run the App

**iOS:**

```bash
npm run ios
```

**Android:**

```bash
npm run android
```

**Web (for testing):**

```bash
npm run web
```

---

## 📋 Best Practices Implemented

### 1. **Separation of Concerns**

- Screens: UI components
- Utils: Reusable functions (API, storage)
- Validation: Schema definitions
- Navigation: Route management

### 2. **Error Handling**

- Field-level validation errors
- API error messages to user (Alert)
- Axios interceptor for global errors
- 401 auto-logout

### 3. **User Experience**

- Loading indicators during API calls
- Disabled buttons while loading
- Confirmation dialogs for destructive actions
- Pull-to-refresh on list
- Empty state message

### 4. **Security**

- Token stored in secure storage (not AsyncStorage)
- Token passed in Authorization header
- Automatic logout on 401 response
- Password input hidden

### 5. **Code Quality**

- Minimal, clean code
- DRY principles (reusable functions)
- Consistent styling approach
- Comments for clarity

### 6. **Performance**

- Parallel API calls (Promise.all)
- Efficient list rendering (FlatList)
- Memo for optimization (if needed later)

---

## 🔄 User Flow

### Sign Up Flow

```
1. User taps "Sign Up" link
2. SignUp screen opens as modal
3. Enter name, email, password
4. Validation on client side
5. API call to /auth/register
6. Receive JWT token
7. Save token securely
8. Navigate to Home screen
```

### Sign In Flow

```
1. App checks stored token on startup
2. If no token → Show SignIn screen
3. Enter email, password
4. Validation on client side
5. API call to /auth/login
6. Receive JWT token
7. Save token securely
8. Navigate to Home screen
```

### Home Screen Flow

```
1. Load expenses list
2. Load spending statistics
3. Display in FlatList with stats card
4. Swipe to refresh
5. Tap delete → Confirm → API call
6. Tap logout → Clear token → Back to SignIn
```

---

## 📊 API Endpoints Used

| Endpoint          | Method | Body                  | Response                    |
| ----------------- | ------ | --------------------- | --------------------------- |
| `/auth/register`  | POST   | name, email, password | { token, user }             |
| `/auth/login`     | POST   | email, password       | { token, user }             |
| `/expenses`       | GET    | -                     | { data: [...], total }      |
| `/expenses/stats` | GET    | -                     | { totalAmount, totalCount } |
| `/expenses/:id`   | DELETE | -                     | { success }                 |

---

## 🐛 Troubleshooting

### "Cannot connect to API"

- **Cause:** Backend not running or wrong URL
- **Fix:** Update `API_BASE_URL` in `src/utils/api.js`

### "Login/Register fails with validation error"

- **Cause:** API validation rejected data
- **Fix:** Check backend logs, ensure email doesn't exist for signup

### "Token not persisting"

- **Cause:** Secure storage permissions issue
- **Fix:** Run `expo prebuild` and check permissions

### "Navigation not working"

- **Cause:** Missing `NavigationContainer` wrapper
- **Fix:** Verify App.js has NavigationContainer

---

## 📈 Next Steps (To Build Upon)

### Features to Add

1. **Add Expense Screen** - Create/edit expenses
2. **Profile Screen** - View/edit user profile
3. **Category Filter** - Filter by expense category
4. **Date Range Filter** - Filter by date range
5. **Export/Share** - Export expenses as CSV/PDF

### Code Improvements

1. Add Redux/Context for state management
2. Add error boundaries
3. Add animated transitions
4. Add dark mode support
5. Add offline mode with local storage

### Testing

1. Unit tests with Jest
2. Integration tests with Detox
3. API mocking with MSW

---

## 📚 File Reference

| File                              | Lines | Purpose                         |
| --------------------------------- | ----- | ------------------------------- |
| `App.js`                          | 10    | Entry point, Navigation wrapper |
| `src/utils/api.js`                | 30    | Axios + interceptors            |
| `src/utils/storage.js`            | 25    | Token persistence               |
| `src/validation/schemas.js`       | 45    | Joi schemas + validator         |
| `src/screens/SignInScreen.js`     | 140   | Login UI + logic                |
| `src/screens/SignUpScreen.js`     | 140   | Register UI + logic             |
| `src/screens/HomeScreen.js`       | 170   | Expenses list + stats           |
| `src/navigation/RootNavigator.js` | 50    | Navigation logic                |

**Total: ~610 lines of clean, beginner-friendly code**

---

## ✅ Implementation Checklist

- [x] Project structure created
- [x] Dependencies installed
- [x] API client configured
- [x] Token storage setup
- [x] Form validation with Joi
- [x] Sign In screen implemented
- [x] Sign Up screen implemented
- [x] Home/Expenses screen implemented
- [x] Navigation configured
- [x] Error handling added
- [x] Loading states managed
- [x] Best practices applied

**Status: ✅ READY TO RUN**

---

## 🎯 Key Takeaways

1. **Keep it simple** - Minimal styling, focus on functionality
2. **Secure storage** - Use Secure Store for tokens, not AsyncStorage
3. **Validation early** - Validate on client side before API
4. **Interceptors** - Use Axios interceptors to avoid repetition
5. **Error handling** - Show user-friendly error messages
6. **Loading states** - Always show feedback during API calls
7. **Navigation logic** - Check auth state on app startup
8. **Component structure** - Separate concerns (screens, utils, validation)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
cd expense-tracker-frontend
npm install

# 2. Update API URL in src/utils/api.js
# 3. Run the app
npm start

# 4. Scan QR code with Expo Go app
# 5. Test Sign Up → Login → View Expenses flow
```

**Enjoy! 🎉**
