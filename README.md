# Mobile Applications Development Course Plan

## 30 Hours (10 Weeks × 3 Hours)

---

## **Week 1: Introduction & Development Environment Setup (3 hours)**

### Session Objectives:

- Understand mobile app ecosystem
- Set up React Native development environment
- Solve first problem using basic JavaScript

### Content:

1. **Introduction (45 mins)**

   - Types of mobile apps (Native, Hybrid, Web, PWA)
   - Platforms: iOS, Android
   - Cross-platform vs Native development
   - Why React Native?
   - Development tools overview (Node.js, npm, Expo, VS Code)

2. **Environment Setup (1 hour)**

   - Install Node.js and npm
   - Install Expo CLI
   - Set up Android Studio/Xcode (optional)
   - Create first React Native project
   - Run app on emulator/physical device

3. **First Problem-Solving Exercise (1 hour 15 mins)**
   - **Problem:** Calculate student grade based on marks
   - Introduce: variables, data types, if-else statements
   - **Problem:** Find largest of 3 numbers
   - Introduce: comparison operators, nested if
   - Create simple component to display results

**Homework:** Install all required tools, create a calculator for basic arithmetic operations

---

## **Week 2: JavaScript & Styling Fundamentals in React Native (3 hours)**

### Session Objectives:

- Master JavaScript basics for React Native
- Understand CSS-in-JS styling
- Solve problems using loops and arrays

### Content:

1. **JavaScript Fundamentals (1.5 hours)**

   - **Problem:** Print numbers 1-10 (introduce for loop)
   - **Problem:** Calculate sum of array elements
   - Arrays: declaration, methods (push, pop, map, filter)
   - **Problem:** Filter even numbers from an array
   - Functions: arrow functions, parameters, return values
   - Objects: creation, accessing properties
   - **Problem:** Create student object with name, age, grades

2. **Styling in React Native (1.5 hours)**
   - StyleSheet API
   - Flexbox basics (flexDirection, justifyContent, alignItems)
   - Common style properties (padding, margin, backgroundColor, fontSize)
   - **Problem:** Create a styled card component
   - Inline styles vs StyleSheet
   - **Problem:** Build a profile card with image, name, description

**Homework:** Create an array of 5 products (objects) and display them with styling

---

## **Week 3: Mobile App Structure & UI Components Basics (3 hours)**

### Session Objectives:

- Understand React Native project structure
- Learn core UI components
- Build first interactive app

### Content:

1. **App Structure & Components (1 hour)**

   - React Native project folder structure
   - Component lifecycle basics
   - JSX syntax
   - Props and their usage
   - **Problem:** Create reusable Button component with custom text and color

2. **Core UI Components (2 hours)**
   - View, Text, Image components
   - TextInput and handling user input
   - Button and TouchableOpacity
   - ScrollView for scrollable content
   - **Problem:** Build a simple form (Name, Email, Message)
   - SafeAreaView for different screen sizes
   - **Problem:** Create a news article list with ScrollView

**Homework:** Build a todo input form with add button (no state management yet)

---

## **Week 4: User Interface Design & Layout (3 hours)**

### Session Objectives:

- Master responsive layouts
- Apply design principles
- Create professional-looking UIs

### Content:

1. **Responsive Layout Design (1.5 hours)**

   - Flexbox deep dive
   - Flex property: flex, flexGrow, flexShrink
   - Dimensions API for screen size
   - **Problem:** Create a 2-column grid layout
   - Percentage-based dimensions
   - **Problem:** Build responsive card layout (1 col mobile, 2 col tablet)

2. **Visual Design Principles (1.5 hours)**
   - Visual hierarchy
   - Typography: fontSize, fontWeight, fontFamily
   - Color theory and palettes
   - Spacing: consistent padding and margins
   - **Problem:** Design a login screen with proper visual hierarchy
   - Containers and grouping
   - **Problem:** Create a settings screen with grouped sections

**Homework:** Design a restaurant menu app UI with categories and items

---

## **Week 5: State Management & Dynamic Content (3 hours)**

### Session Objectives:

- Understand React hooks (useState)
- Make UIs interactive and dynamic
- Implement conditional rendering

### Content:

1. **Introduction to State (1.5 hours)**

   - What is state?
   - useState hook
   - **Problem:** Create a counter app (increment/decrement)
   - Updating state properly
   - **Problem:** Build a toggle switch component
   - **Problem:** Create a simple calculator with state

2. **Dynamic Content & Conditional Rendering (1.5 hours)**
   - Conditional rendering with && and ternary operators
   - **Problem:** Show/hide password toggle
   - Dynamic styling based on state
   - **Problem:** Create a todo list with add/remove functionality
   - Form validation basics
   - **Problem:** Login form with validation feedback

**Homework:** Build a tip calculator with input validation

---

## **Week 6: Lists, Arrays & FlatList (3 hours)**

### Session Objectives:

- Render dynamic lists efficiently
- Handle user interactions with list items
- Master array methods

### Content:

1. **Working with Arrays (1 hour)**

   - **Problem:** Given array of numbers, display sum, average, max
   - Array methods: map, filter, find, reduce
   - **Problem:** Filter products by category
   - **Problem:** Search functionality in array

2. **FlatList Component (2 hours)**
   - FlatList vs ScrollView
   - renderItem and keyExtractor
   - **Problem:** Display list of contacts
   - Item separators and empty states
   - Pull to refresh
   - **Problem:** Build a product catalog with categories
   - Handling item clicks
   - **Problem:** Create a selectable list (checkbox behavior)
   - SectionList for grouped data

**Homework:** Create a note-taking app with add, delete, and search features

---

## **Week 7: Navigation in Mobile Apps (3 hours)**

### Session Objectives:

- Implement multi-screen navigation
- Pass data between screens
- Create tab and stack navigators

### Content:

1. **React Navigation Setup (45 mins)**

   - Install React Navigation
   - Navigation container
   - Stack Navigator basics
   - **Problem:** Create Home → Details screen flow

2. **Stack & Tab Navigation (1.5 hours)**

   - Navigating between screens
   - Passing parameters
   - **Problem:** Product list → Product details with data
   - Navigation header customization
   - Tab Navigator (bottom tabs)
   - **Problem:** Create app with Home, Search, Profile tabs
   - Nested navigation

3. **Advanced Navigation (45 mins)**
   - Going back and navigation history
   - **Problem:** Shopping cart flow with navigation
   - Deep linking basics

**Homework:** Build a blog app: Home (list) → Article details → Comments screen

---

## **Week 8: API Integration & Async Operations (3 hours)**

### Session Objectives:

- Fetch data from APIs
- Handle loading and error states
- Work with external data

### Content:

1. **Async JavaScript (1 hour)**

   - Promises and async/await
   - **Problem:** Simulate API call with setTimeout
   - fetch API basics
   - **Problem:** Fetch data from JSONPlaceholder API

2. **API Integration (2 hours)**
   - useEffect hook for data fetching
   - **Problem:** Display list of users from API
   - Loading indicators (ActivityIndicator)
   - Error handling and retry logic
   - **Problem:** Build weather app with API
   - **Problem:** Create news app with image loading
   - Axios library (optional)
   - Refresh functionality with APIs

**Homework:** Build a movie search app using OMDB or TMDB API

---

## **Week 9: User Input, Gestures & Device Features (3 hours)**

### Session Objectives:

- Handle complex user interactions
- Access device features
- Work with permissions

### Content:

1. **Advanced User Inputs & Gestures (1.5 hours)**

   - Form handling with multiple inputs
   - **Problem:** Registration form with multiple fields
   - Touch events: onPress, onLongPress
   - **Problem:** Long press to delete item
   - Swipe gestures basics
   - **Problem:** Swipeable list items
   - Keyboard handling (KeyboardAvoidingView)

2. **Device Features (1.5 hours)**
   - Expo packages overview
   - Camera access (expo-camera or expo-image-picker)
   - **Problem:** Profile photo upload
   - Location services (expo-location)
   - **Problem:** Show current location on map
   - Permissions handling
   - **Problem:** Request and check camera permission
   - Other sensors (accelerometer, gyroscope - demo only)

**Homework:** Build an expense tracker with camera receipt capture

---

## **Week 10: Debugging, Error Handling & Deployment (3 hours)**

### Session Objectives:

- Master debugging techniques
- Prepare app for deployment
- Understand publishing workflow

### Content:

1. **Debugging & Error Handling (1.5 hours)**

   - Console.log and debugging tools
   - React Native Debugger
   - **Problem:** Debug a broken todo app
   - Common errors and solutions
   - Error boundaries
   - Try-catch for async operations
   - User feedback: Toast messages, Alert
   - **Problem:** Add error handling to API app

2. **App Deployment Concepts (1.5 hours)**
   - Build process overview (APK/AAB for Android, IPA for iOS)
   - App icons and splash screens
   - Asset optimization
   - Environment variables and configuration
   - Google Play Store requirements
   - Apple App Store requirements
   - App versioning
   - General publishing workflow
   - Expo EAS Build overview (demo)
   - **Final Problem:** Review and optimize a complete app

**Final Project Discussion:** Students present their final app ideas

## **Final Project Ideas:**

- Todo app with categories and API sync
- Recipe app with search and favorites
- Expense tracker with charts
- Social media feed clone
- E-commerce product catalog

## **Required Tools:**

- Node.js & npm
- Expo CLI
- VS Code (with ES7+ React snippets extension)
- Android Studio / Xcode (optional)
- Expo Go app on physical device
