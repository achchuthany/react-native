# React Native Navigation with Native Stack Navigator

This guide provides a step-by-step approach to implementing navigation in a React Native application using the Native Stack Navigator from the `@react-navigation/native-stack` package.

## Prerequisites

- Basic knowledge of React Native
- React Native development environment set up
- `@react-navigation/native` and `@react-navigation/native-stack` packages installed

## Step 1: Install Required Packages

The @react-navigation/native package contains the core functionality of React Navigation.

```bash
npm install @react-navigation/native
```

Let's also install and configure dependencies used by most navigators. The libraries we will install now are react-native-screens and react-native-safe-area-context.

```bash
npx expo install react-native-screens react-native-safe-area-context
```

The libraries we've installed so far are the building blocks and shared foundations for navigators, and each navigator in React Navigation lives in its own library. To use the native stack navigator, we need to install @react-navigation/native-stack :

```bash
npm install @react-navigation/native-stack
```

The @react-navigation/elements library provides a set of components that are designed to work well with React Navigation.

```bash
npm install @react-navigation/elements
```

## Step 2: Create Screens

Create two simple screens: `HomeScreen` and `ProfileScreen`. create a `screens` folder in your project directory and add the following files:
HomeScreen.js and ProfileScreen.js.

```javascript
// HomeScreen.js
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

function HomeScreen() {
  const navigation = useNavigation();

  const goToProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={goToProfile}>
        <Text>Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
```

```javascript
// ProfileScreen.js
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

function ProfileScreen() {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate("Home");
  };
  return (
    <View>
      <Text>Profile Screen</Text>
      <TouchableOpacity onPress={goToHome}>
        <Text>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ProfileScreen;
```

## Step 3: Set Up Navigation Container

Wrap your application in a `NavigationContainer` to manage navigation state.

Add this to your `App.js`:

```javascript
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
```
