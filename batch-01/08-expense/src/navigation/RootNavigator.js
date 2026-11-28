import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getToken, removeToken } from "../utils/storage";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import AddExpenseScreen from "../screens/AddExpenseScreen";

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("home");

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await getToken();
    setIsLoggedIn(!!token);
  };

  const handleLogout = async () => {
    await removeToken();
    setIsLoggedIn(false);
    setCurrentScreen("home");
  };

  if (isLoggedIn === null) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isLoggedIn) {
    if (currentScreen === "add") {
      return (
        <AddExpenseScreen
          onBackPress={() => setCurrentScreen("home")}
          onExpenseAdded={() => setCurrentScreen("home")}
        />
      );
    }

    return (
      <HomeScreen
        onLogout={handleLogout}
        onAddPress={() => setCurrentScreen("add")}
      />
    );
  }

  if (showSignUp) {
    return (
      <View style={styles.container}>
        <SignUpScreen
          onLoginSuccess={() => setIsLoggedIn(true)}
          onBackPress={() => setShowSignUp(false)}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SignInScreen
        onLoginSuccess={() => setIsLoggedIn(true)}
        onSignUpPress={() => setShowSignUp(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
