import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./screens/ProfileScreen";
import EventsScreen from "./screens/EventsScreen";
import SignInScreen from "./screens/SignInScreen";
import MyTicketsScreen from "./screens/MyTicketsScreen";
import EventRegistration from "./screens/EventRegistration";
import { CalendarClock, TicketCheck, UserCog } from "lucide-react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <CalendarClock color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyTickets"
        component={MyTicketsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TicketCheck color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <UserCog color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function RootStack() {
  return (
    <Stack.Navigator initialRouteName="BottomTabs">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen
        name="EventRegistration"
        component={EventRegistration}
        options={{ title: "Event Registration" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
