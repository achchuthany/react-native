# Google Play Launch Pack

Project: Expense Tracker Mobile App
Package name: lk.achchuthan.vertex
Version: 1.0.0
Date: 2 April 2026

## 1. Publish Checklist (Ready to Tick)

### A. Build and Signing

- [ ] Production AAB built with EAS
- [ ] Build uses correct package name: lk.achchuthan.vertex
- [ ] Version code auto-increment enabled in EAS
- [ ] Keep generated keystore and credentials safe (managed by EAS)

### B. Play Console App Setup

- [ ] Create app in Google Play Console
- [ ] Set default language and app title
- [ ] Select app category (Finance)
- [ ] Set contact email

### C. Store Listing Assets

- [ ] App icon 512 x 512
- [ ] Feature graphic 1024 x 500
- [ ] Minimum 2 phone screenshots (recommended 4-8)
- [ ] 7-inch and 10-inch tablet screenshots if required by your target
- [ ] Short description entered
- [ ] Full description entered

### D. Policy and Compliance

- [ ] Privacy Policy URL added
- [ ] Data Safety form completed
- [ ] Content rating questionnaire submitted
- [ ] Target audience and content declaration done
- [ ] Ads declaration completed (No ads if none)
- [ ] App access instructions added for reviewer login

### E. Testing and Release

- [ ] Internal testing release created
- [ ] Testers validated login, expense list, add expense, profile, sign out
- [ ] Production release created
- [ ] Release notes added
- [ ] Rollout percentage set and reviewed

## 2. Ready-to-Paste Store Listing Copy

### Final App Title

Vertex Expense Tracker

### Final Short Description (80 chars max)

Track expenses with secure login, smart categories, and quick daily updates.

Character count: 73/80

### Full Description

Manage your spending with a clean and easy mobile expense tracker built for everyday use.

Vertex Expense Tracker helps you record expenses, view your spending history, and keep your account data secure.

Key features:

- Secure sign in with persistent login
- Dashboard with expense list and pagination
- Pull-to-refresh for latest data
- Add expense with amount, category, date, description, and receipt reference
- Category picker for faster entry
- Profile page with account details
- Sign out with secure session clearing

Why use this app:

- Fast and simple UI
- Beginner-friendly workflow
- Built using modern React Native and Expo stack

Current scope:

- Core expense tracking and profile flow are available
- Future updates will include edit/delete expense, settings improvements, and richer insights

### Suggested Privacy Policy URL

https://your-domain.com/vertex-expense-tracker/privacy-policy

If you do not have a domain yet, publish the privacy policy on GitHub Pages and use that URL.

## 3. App Access (Reviewer Instructions)

Use this section in Play Console if your app requires login.

- App requires user authentication to access core screens.
- Provide a test account for Google reviewer:
  - Email: <add-test-email>
  - Password: <add-test-password>
- After login, reviewer can test:
  - Dashboard expense list
  - Add Expense
  - Profile
  - Sign Out

## 4. Data Safety Preparation Notes

Before submission, confirm these answers based on your backend behavior:

- Data collected: email/profile/expense records (confirm exact fields)
- Data shared with third parties: Yes/No (confirm)
- Data encrypted in transit: Yes (HTTPS API)
- Data deletion request flow: document if available

## 5. First Production Release Notes (Play Console)

### Version 1.0.0

- Initial public release of Expense Tracker
- Secure sign-in and session handling
- Dashboard to view expenses with pagination and refresh
- Add Expense form with category and date validation
- Profile screen with user details and sign out
- Performance and UI stability improvements

## 6. Commands for Build and Submit

Build production Android app bundle:

```bash
eas build -p android --profile production
```

Submit to Google Play:

```bash
eas submit -p android --profile production
```

## 7. Pre-Submission Quality Pass (Recommended)

Run this manual test before pushing to production:

- [ ] Sign In works with valid credentials
- [ ] Invalid Sign In shows clear error
- [ ] Dashboard loads expenses correctly
- [ ] Pull-to-refresh updates list
- [ ] Infinite load works without duplicate entries
- [ ] Add Expense validates amount and date
- [ ] Add Expense success message appears
- [ ] Profile loads and retry works on failure
- [ ] Sign Out clears token and returns to Sign In
