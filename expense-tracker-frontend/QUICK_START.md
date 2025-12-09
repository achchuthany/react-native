# Expense Tracker Frontend - Quick Start Guide

## ⚡ 5-Minute Setup

### 1️⃣ Install & Run

```bash
cd expense-tracker-frontend
npm install
npm start
```

### 2️⃣ Configure Backend URL

Edit `src/utils/api.js` line 5:

```javascript
// Local development:
const API_BASE_URL = "http://localhost:3000/api";

// Production (Vercel):
const API_BASE_URL = "https://your-vercel-app.vercel.app/api";
```

### 3️⃣ Test the App

1. Scan QR code with **Expo Go** app
2. Sign Up → Create account
3. Sign In → Login
4. View Expenses → See your list

---

## 📁 File Structure

```
src/
├── screens/
│   ├── SignInScreen.js      (140 lines)  - Login form
│   ├── SignUpScreen.js      (140 lines)  - Register form
│   └── HomeScreen.js        (170 lines)  - Expenses list
├── navigation/
│   └── RootNavigator.js     (50 lines)   - Navigation logic
├── utils/
│   ├── api.js               (30 lines)   - API client
│   └── storage.js           (25 lines)   - Token storage
└── validation/
    └── schemas.js           (45 lines)   - Joi validation
```

---

## 🎯 Features

✅ **User Auth**

- Sign Up with name, email, password
- Sign In with email, password
- Logout clears token

✅ **Expenses**

- View list of expenses
- See total spending & count
- Delete expenses with confirmation
- Pull-to-refresh

✅ **Forms**

- Real-time client validation (Joi)
- Field-specific error messages
- Loading indicators
- Error alerts

✅ **Security**

- JWT token in Authorization header
- Secure storage (expo-secure-store)
- Auto-logout on 401

---

## 🔌 API Endpoints

```javascript
// Auth
POST /api/auth/register    // { name, email, password }
POST /api/auth/login       // { email, password }

// Expenses
GET /api/expenses          // Get list (paginated)
GET /api/expenses/stats    // Get totals
DELETE /api/expenses/:id   // Delete expense
```

---

## 💡 Code Examples

### Sign In

```javascript
const handleSignIn = async () => {
  const validation = validateForm({ email, password }, signInSchema);
  if (!validation.valid) return;

  const response = await api.post("/auth/login", { email, password });
  await saveToken(response.data.token);
  onLoginSuccess();
};
```

### Load Expenses

```javascript
const fetchData = async () => {
  const [expensesRes, statsRes] = await Promise.all([
    api.get("/expenses?limit=10"),
    api.get("/expenses/stats"),
  ]);
  setExpenses(expensesRes.data);
  setStats(statsRes.data);
};
```

### Delete Expense

```javascript
const handleDeleteExpense = async (id) => {
  Alert.alert("Delete", "Are you sure?", [
    { text: "Cancel" },
    {
      text: "Delete",
      onPress: async () => {
        await api.delete(`/expenses/${id}`);
        setExpenses(expenses.filter((e) => e.id !== id));
      },
    },
  ]);
};
```

---

## 🐛 Troubleshooting

| Issue                   | Solution                             |
| ----------------------- | ------------------------------------ |
| API connection error    | Check `API_BASE_URL` is correct      |
| "Email already exists"  | Try different email or login         |
| Token not saved         | Ensure secure storage permissions    |
| Blank screen on startup | Check RootNavigator.js is imported   |
| Validation errors       | Check email format & password length |

---

## 🚀 Deployment

### Deploy to Expo

```bash
npm install -g eas-cli
eas build --platform ios  # or android
eas submit                # to App Store / Play Store
```

### Connect to Live Backend

1. Update `API_BASE_URL` to your Vercel URL
2. Test sign in/sign up
3. Check Vercel logs if issues occur

---

## 📚 Learning Path

1. **Start Here:** Read this file
2. **Understand Structure:** Check folder organization
3. **Read Screens:** Start with SignInScreen.js
4. **Learn Navigation:** Review RootNavigator.js
5. **Explore Validation:** Check schemas.js
6. **Read Full Guide:** IMPLEMENTATION_GUIDE.md

---

## ✨ Key Learning Points

| Concept          | Where to Learn                         |
| ---------------- | -------------------------------------- |
| Navigation       | RootNavigator.js                       |
| Form Validation  | SignInScreen.js, validation/schemas.js |
| API Calls        | utils/api.js, HomeScreen.js            |
| Token Management | utils/storage.js, RootNavigator.js     |
| Error Handling   | All screens (try-catch, Alert)         |
| Loading States   | All screens (loading state)            |
| State Management | useState in each screen                |

---

## 💬 Common Questions

**Q: Where is the add expense screen?**
A: This is a beginner-only app. Add it in next iteration.

**Q: Why minimal styling?**
A: To focus on logic, not CSS. Add styles later as you learn.

**Q: Can I add more features?**
A: Yes! Profile, budget, categories, charts - endless possibilities!

**Q: How do I connect to my backend?**
A: Change `API_BASE_URL` in `src/utils/api.js`

**Q: Is data saved offline?**
A: Not yet. You can add AsyncStorage later for offline support.

---

## 📞 Support

- Backend Issues? Check `backend/README.md`
- Navigation Issues? Check React Navigation docs
- Validation Issues? Check Joi docs
- Storage Issues? Check Expo Secure Store docs

---

## 🎓 Next Steps

1. ✅ Get this running locally
2. ✅ Test all features
3. ✅ Connect to live backend
4. ✅ Add profile screen
5. ✅ Add create expense screen
6. ✅ Add budget feature
7. ✅ Deploy to app stores

---

**Status: Ready to Learn & Code! 🚀**

For detailed breakdown, see: `IMPLEMENTATION_GUIDE.md`
