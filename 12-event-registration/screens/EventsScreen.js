import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  CalendarHeart,
  ClipboardClock,
  UsersRound,
  ArrowRight,
  MapPin,
} from "lucide-react-native";

function EventsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Upcoming Events</Text>

      <View style={styles.eventCard}>
        {/* Banner */}
        <View style={styles.eventBanner}>
          <Text style={styles.eventCategory}>Conference</Text>
          <Text style={styles.eventTitle}>React Native{"\n"}Conference</Text>
        </View>

        {/* Details */}
        <View style={styles.eventBody}>
          <View style={styles.eventDetailsRow}>
            <View style={styles.iconWrapper}>
              <CalendarHeart color="#47a3ff" size={18} />
            </View>
            <Text style={styles.eventIconLabel}>October 15, 2023</Text>
          </View>

          <View style={styles.eventDetailsRow}>
            <View style={styles.iconWrapper}>
              <ClipboardClock color="#47a3ff" size={18} />
            </View>
            <Text style={styles.eventIconLabel}>9:00 AM – 5:00 PM</Text>
          </View>

          <View style={styles.eventDetailsRow}>
            <View style={styles.iconWrapper}>
              <MapPin color="#47a3ff" size={18} />
            </View>
            <Text style={styles.eventIconLabel}>San Francisco, CA</Text>
          </View>

          <View style={styles.eventDetailsRow}>
            <View style={styles.iconWrapper}>
              <UsersRound color="#47a3ff" size={18} />
            </View>
            <Text style={styles.eventIconLabel}>100 / 200 spots filled</Text>
          </View>

          {/* Capacity bar */}
          <View style={styles.capacityBarBg}>
            <View style={styles.capacityBarFill} />
          </View>

          {/* Register button */}
          <TouchableOpacity
            style={styles.registerButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("EventRegistration")}
          >
            <Text style={styles.registerButtonText}>Register Now</Text>
            <ArrowRight color="#ffffff" size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f7",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 16,
    marginTop: 8,
  },
  eventCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  eventBanner: {
    backgroundColor: "#47a3ff",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  eventCategory: {
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(255,255,255,0.7)",
    marginBottom: 6,
  },
  eventTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#ffffff",
    lineHeight: 32,
  },
  eventBody: {
    padding: 20,
  },
  eventDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  iconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#ede9ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  eventIconLabel: {
    color: "#3a3a4a",
    fontSize: 15,
    fontWeight: "500",
  },
  capacityBarBg: {
    height: 6,
    backgroundColor: "#ede9ff",
    borderRadius: 3,
    marginBottom: 20,
    marginTop: 4,
  },
  capacityBarFill: {
    width: "50%",
    height: 6,
    backgroundColor: "#47a3ff",
    borderRadius: 3,
  },
  registerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#47a3ff",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  registerButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default EventsScreen;
