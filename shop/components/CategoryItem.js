import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CategoryItem({ title, isActive, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.categoryItem, isActive && styles.activeCategory]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.categoryText, isActive && styles.activeText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryItem: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  categoryText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500",
  },
  activeCategory: {
    backgroundColor: "#1a1a2e",
    borderColor: "#1a1a2e",
  },
  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
});
