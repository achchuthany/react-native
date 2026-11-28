import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { Home, Settings } from "lucide-react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Navigation Learning App</Text>
        <Text style={styles.subtitle}>
          Clear naming and minimal design to practice navigation basics.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("MainTabs")}
        >
          <Text style={styles.buttonText}>Open Main Tabs</Text>
        </Pressable>
      </View>
    </View>
  );
}

function CreateAccountScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          This screen simulates a signup page.
        </Text>

        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("MainTabs")}
        >
          <Text style={styles.buttonText}>Continue to Tabs</Text>
        </Pressable>
      </View>
    </View>
  );
}

function OverviewTab({ navigation }) {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Home size={42} color="#111827" />
        <Text style={styles.title}>Overview</Text>
        <Text style={styles.subtitle}>
          Your main learning page inside tabs.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => navigation.getParent()?.navigate("Welcome")}
        >
          <Text style={styles.buttonText}>Back to Welcome</Text>
        </Pressable>
      </View>
    </View>
  );
}

function PreferencesTab() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Settings size={42} color="#111827" />
        <Text style={styles.title}>Preferences</Text>
        <Text style={styles.subtitle}>A minimal settings-style tab.</Text>
      </View>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#111827",
      }}
    >
      <Tab.Screen
        name="Overview"
        component={OverviewTab}
        options={{
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Preferences"
        component={PreferencesTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 340,
    padding: 12,
    gap: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#4b5563",
    textAlign: "center",
  },
  button: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#e5e7eb",
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#1f2937",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccountScreen}
          options={{ title: "Create Account" }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
