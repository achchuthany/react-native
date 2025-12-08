import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const HomeScreen = ({ route }) => {
  const { userName, userEmail } = route.params || {};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.userName}>{userName || "User"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📧 Your Email</Text>
        <Text style={styles.cardText}>{userEmail || "No email"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎉 Quick Stats</Text>
        <Text style={styles.cardText}>You're logged in successfully!</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📱 Dashboard</Text>
        <Text style={styles.cardText}>
          This is your home screen with bottom tabs
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  welcomeCard: {
    backgroundColor: "#007AFF",
    padding: 30,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: "white",
    marginBottom: 5,
  },
  userName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
});

export default HomeScreen;
