import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { Home, Settings } from "lucide-react-native";
function HomeTab() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Tab</Text>
      <Home size={48} color="black" />
    </View>
  );
}

function SettingsTab() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings Tab</Text>
    </View>
  );
}
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "red",
          tabBarActiveBackgroundColor: "yellow",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{
            title: "My Home",
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsTab}
          options={{
            title: "My Settings",
            tabBarIcon: ({ color, size }) => (
              <Settings size={size} color={color} />
            ),
            tabBarBadge: 1,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
