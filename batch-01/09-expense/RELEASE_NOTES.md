# Release Notes

## Expense Tracker Mobile App

Version: 1.0.0
Release Date: 2 April 2026
Type: Study / Academic Project Release

## Overview

This release introduces a complete mobile expense tracking workflow built with React Native and Expo. The app focuses on authentication, expense management, profile viewing, and clean navigation patterns for learning purposes.

## New Features

- User onboarding flow with Welcome, Sign In, and Sign Up screens.
- Secure login integration with backend authentication API.
- Persistent authentication session using secure token storage.
- Protected app access that redirects unauthenticated users to Sign In.
- Bottom tab navigation for Dashboard, Add Expense, Profile, and Settings.
- Expense dashboard with API-powered list of user expenses.
- Expense cards showing category, amount, description, date, and expense ID preview.
- Pagination support on expense list with load-more behavior.
- Pull-to-refresh support on dashboard expense data.
- Add Expense form with category selector and field validation.
- Category modal picker with predefined categories (food, transport, shopping, bills, entertainment, health, other).
- Date format validation for expense creation (YYYY-MM-DD).
- Profile screen with user details, avatar/fallback initial, and joined date.
- Retry flow for failed profile requests.
- Sign-out flow with secure token removal.
- Shared API client configuration with automatic Bearer token injection.
- Consistent custom color theme and reusable UI styling tokens.

## Technical Highlights

- React Navigation stack + bottom tab combination for scalable navigation.
- Axios-based API communication for auth, profile, and expense endpoints.
- Expo SecureStore usage for safer token persistence.
- UI loading and error states for key network screens.

## Known Limitations (Study Scope)

- Sign Up screen UI is available, but backend registration submission is not yet wired.
- Settings tab currently points to the same screen as Profile.
- Expense editing and deletion are not part of this release.
- No advanced filtering/sorting analytics yet.

## Suggested Next Version Scope

- Implement full account registration flow.
- Add Edit/Delete expense actions.
- Add search, filter, and category-wise insights.
- Build a dedicated Settings screen (theme, notifications, account options).
- Add form date picker and receipt image upload support.
