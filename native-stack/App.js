import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import { createStaticNavigation } from "@react-navigation/native";
import ProfileScreen from "./screens/ProfileScreen";
import { Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HandCoins, House } from "lucide-react-native";
import ExpenseScreen from "./screens/ExpenseScreen";

const HomeTabs = createBottomTabNavigator({
  initialRouteName: "Home",
  screenOptions: {
    headerStyle: {
      backgroundColor: "#6200ee",
    },
    headerTitleStyle: {
      color: "#ffffff",
      fontSize: 20,
    },
    tabBarActiveTintColor: "#6200ee",
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => {
          return <House size={size} color={color} />;
        },
      },
    },
    Expense: {
      screen: ExpenseScreen,
      options: {
        title: "Expenses",
        tabBarLabel: "Expenses",
        tabBarIcon: ({ color, size }) => {
          return <HandCoins size={size} color={color} />;
        },
        tabBarBadge: 3,
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  initialRouteName: "HomeTabs",
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        headerShown: false,
      },
    },
    Profile: {
      screen: ProfileScreen,
      options: {
        headerRight: () => (
          <Button
            title="Info"
            onPress={() => alert("This is the profile screen")}
          />
        ),
        headerStyle: {
          backgroundColor: "#6200ee",
        },
        headerTitleStyle: {
          color: "#ffffff",
          fontSize: 20,
        },
        headerBackTitle: "Back",
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);
export default function App() {
  return <Navigation />;
}
