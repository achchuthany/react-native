import * as Notifications from "expo-notifications";
import { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Platform } from "react-native";

//Step 1: Set up notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

//Step 2: Create the NotificationsScreen component
export default function NotificationsScreen() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Request permissions on component mount
  useEffect(() => {
    requestPermissions();
  }, []);

  //Step 3: Request notification permissions
  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setPermissionGranted(status === "granted");
  };

  //Step 4: Send a notification
  const sendNotification = async () => {
    // Check if permission is granted before sending notification
    if (!permissionGranted) {
      alert("Notification permission not granted!");
      return;
    }
    // Schedule a notification to be sent immediately
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello! 👋",
        body: "This is a simple expo notification.",
        data: { info: "some data" },
      },
      trigger: null, // null means send immediately
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Notifications</Text>
      <Text style={styles.status}>
        Permission: {permissionGranted ? "✅ Granted" : "❌ Not Granted"}
      </Text>
      <Button title="Send Notification" onPress={sendNotification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  status: {
    fontSize: 16,
    color: "#555",
  },
});
