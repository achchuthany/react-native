import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { getToken } from '../utils/storage';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await getToken();
    setIsLoggedIn(!!token);
  };

  if (isLoggedIn === null) {
    return null; // Loading state
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      {isLoggedIn ? (
        <Stack.Screen
          name="Home"
          options={{ animationEnabled: false }}
        >
          {(props) => (
            <HomeScreen {...props} onLogout={() => setIsLoggedIn(false)} />
          )}
        </Stack.Screen>
      ) : (
        <Stack.Group screenOptions={{ animationEnabled: true }}>
          <Stack.Screen
            name="SignIn"
            options={{ animationEnabled: false }}
          >
            {(props) => (
              <SignInScreen
                {...props}
                onLoginSuccess={() => setIsLoggedIn(true)}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            options={{ presentation: 'modal' }}
          >
            {(props) => (
              <SignUpScreen
                {...props}
                onLoginSuccess={() => setIsLoggedIn(true)}
              />
            )}
          </Stack.Screen>
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
