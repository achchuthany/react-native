# What is React Native? — Presentation for Week 1

> Objectives:
> - Understand the main idea behind React Native
> - Recognize the difference between React Native and other mobile approaches (Native, Hybrid, Web)
> - See a simple React Native "Hello World" and setup overview using Expo

---

## Slide 1 — High-level definition

- **React Native** is an open-source framework created by Facebook (Meta) that allows you to build mobile applications using JavaScript and React.
- Instead of generating HTML, React Native maps components to native UI elements on iOS and Android, giving the app a native look and better performance than typical hybrid apps.
- Code is written using React patterns (components, JSX, props, state) and rendered with native components.

---

## Slide 2 — Types of mobile apps (context)

- **Native apps**: Built using platform-specific languages and SDKs (Swift/Objective-C for iOS, Kotlin/Java for Android). Full native performance and UI.
- **Hybrid apps**: Built with web technologies and run in a WebView container (e.g., Cordova, Ionic). Lower performance and less native look.
- **Cross-platform frameworks**: Like React Native and Flutter — build cross-platform apps that compile to native UI.

Why React Native? One codebase, native performance, large ecosystem, and a very familiar developer experience for web/react developers.

---

## Slide 3 — How React Native Works (simplified)

1. JavaScript code runs in a JS thread using a JS engine (Hermes, JSC).
2. React updates are serialized into a "bridge" to communicate with native modules/components.
3. Native components are updated based on the commands from JS, rendering real native UI.

Note: Over time the architecture improved (TurboModules, Fabric) to reduce or remove the bridge overhead.

---

## Slide 4 — Core Concepts & Components

- **JSX**: Component markup similar to React for the web.
- **View**: Container (like <div>).
- **Text**: For text rendering (like <p> / <span>).
- **Image**: For images.
- **TextInput**: For user input fields.
- **TouchableOpacity** / **Pressable**: For buttons and gestures.
- **FlatList**, **ScrollView**, **SectionList**: For lists and scrolling content.

---

## Slide 5 — Basic `Hello World` (Expo-based)

```jsx
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, React Native!</Text>
      <Text>Welcome to Week 1 of the Mobile Applications Development course.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
```

---

## Slide 6 — Quick Setup (Expo CLI)

1. Make sure Node.js and npm are installed.
2. Install Expo CLI globally (optional):
   - `npm install -g create-expo-app` or `npx create-expo-app` (npx avoids global install)
3. Create a new project:
   - `npx create-expo-app my-app`
4. Run the project in development:
   - `cd my-app`
   - `npm start` or `npx expo start` — then use Expo Go on a device or run an emulator.

---

## Slide 7 — Pros & Cons

**Pros**:

- Shared JavaScript codebase for iOS & Android
- Access to native UI components with native performance
- Large ecosystem (Expo, React Navigation, community packages)
- Fast development cycle using Metro bundler and Expo over-the-air updates

**Cons**:

- Some low-level platform-specific features may still need native modules
- Large apps may require optimization to achieve native-grade performance
- Native dependency and update management can add complexity

---

## Slide 8 — When to Use React Native

- Great for startups and companies wanting faster time-to-market for both iOS and Android.
- Ideal for teams with JavaScript/React expertise.
- Good fit for apps that primarily use list data, forms, real-time content, and standard mobile UI patterns.

Not ideal if you need heavy custom native code or very low-level hardware management — consider native or Flutter depending on requirements.

---

## Slide 9 — Key Tools & Libraries

- **Expo**: Easiest path to start with, includes a lot of native APIs out of the box.
- **React Navigation**: Keep it for navigation and stacks.
- **AsyncStorage / MMKV**: For local storage.
- **Axios / fetch**: For network requests.
- **Hermes**: JS engine for performance on Android and iOS (supported by React Native newer versions).

---

## Slide 10 — Next Steps for Students

- Install Node.js, npm, and Expo CLI.
- Build the simple Hello World app using Expo.
- Try creating a small component (e.g., a profile card) and style it using `StyleSheet`.
- Complete Week 1 exercises in the README (set up development environment and basic JS problems).

---

## References (for instructor)

- React Native docs: https://reactnative.dev/
- Expo docs: https://docs.expo.dev/
- React Navigation: https://reactnavigation.org/

(These links are for instructor use — remove or rewrite if you want the students to follow specific references.)
