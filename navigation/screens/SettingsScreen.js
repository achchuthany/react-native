import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

const SettingsScreen = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "SignIn" }],
          });
        },
      },
    ]);
  };

  const SettingItem = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      <Text style={styles.settingArrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <SettingItem
            icon="👤"
            title="Edit Profile"
            onPress={() => Alert.alert("Edit Profile")}
          />
          <View style={styles.divider} />
          <SettingItem
            icon="🔐"
            title="Change Password"
            onPress={() => Alert.alert("Change Password")}
          />
          <View style={styles.divider} />
          <SettingItem
            icon="🔔"
            title="Notifications"
            onPress={() => Alert.alert("Notifications")}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <SettingItem
            icon="🌙"
            title="Dark Mode"
            onPress={() => Alert.alert("Dark Mode")}
          />
          <View style={styles.divider} />
          <SettingItem
            icon="🌐"
            title="Language"
            onPress={() => Alert.alert("Language")}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.card}>
          <SettingItem
            icon="❓"
            title="Help Center"
            onPress={() => Alert.alert("Help Center")}
          />
          <View style={styles.divider} />
          <SettingItem
            icon="📧"
            title="Contact Us"
            onPress={() => Alert.alert("Contact Us")}
          />
          <View style={styles.divider} />
          <SettingItem
            icon="ℹ️"
            title="About"
            onPress={() => Alert.alert("About", "Version 1.0.0")}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8E8E93",
    marginLeft: 20,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    color: "#333",
  },
  settingArrow: {
    fontSize: 24,
    color: "#C7C7CC",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5EA",
    marginLeft: 60,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 30,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SettingsScreen;
