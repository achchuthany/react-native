import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const TITLES = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];

function EventRegistration() {
  const [form, setForm] = useState({
    nic: "",
    title: "",
    fullName: "",
    phone: "",
    email: "",
  });

  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Event Registration</Text>
      <Text style={styles.subheading}>Fill in your details to register</Text>

      {/* NIC */}
      <Text style={styles.label}>NIC Number</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 123456789V"
        placeholderTextColor="#aaa"
        value={form.nic}
        onChangeText={(v) => updateField("nic", v)}
        autoCapitalize="characters"
      />

      {/* Title */}
      <Text style={styles.label}>Title</Text>
      <View style={styles.titleRow}>
        {TITLES.map((t) => (
          <TouchableOpacity
            key={t}
            style={[
              styles.titleChip,
              form.title === t && styles.titleChipActive,
            ]}
            onPress={() => updateField("title", t)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.titleChipText,
                form.title === t && styles.titleChipTextActive,
              ]}
            >
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Full Name */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. John Doe"
        placeholderTextColor="#aaa"
        value={form.fullName}
        onChangeText={(v) => updateField("fullName", v)}
        autoCapitalize="words"
      />

      {/* Phone */}
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. +94 77 123 4567"
        placeholderTextColor="#aaa"
        value={form.phone}
        onChangeText={(v) => updateField("phone", v)}
        keyboardType="phone-pad"
      />

      {/* Email */}
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. john@example.com"
        placeholderTextColor="#aaa"
        value={form.email}
        onChangeText={(v) => updateField("email", v)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton} activeOpacity={0.85}>
        <Text style={styles.submitButtonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f0f7",
    flexGrow: 1,
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1a1a2e",
    marginBottom: 4,
    marginTop: 8,
  },
  subheading: {
    fontSize: 14,
    color: "#888",
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3a3a4a",
    marginBottom: 6,
    marginTop: 4,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#1a1a2e",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0ef",
  },
  titleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  titleChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#d0c8ff",
    backgroundColor: "#ffffff",
  },
  titleChipActive: {
    backgroundColor: "#6c47ff",
    borderColor: "#6c47ff",
  },
  titleChipText: {
    fontSize: 14,
    color: "#6c47ff",
    fontWeight: "600",
  },
  titleChipTextActive: {
    color: "#ffffff",
  },
  submitButton: {
    backgroundColor: "#6c47ff",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default EventRegistration;
