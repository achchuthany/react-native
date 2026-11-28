import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../utils/api";

export default function AddExpenseScreen({ onBackPress, onExpenseAdded }) {
  const CATEGORY_OPTIONS = [
    "food",
    "transport",
    "shopping",
    "bills",
    "health",
    "entertainment",
    "other",
  ];

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [receipt, setReceipt] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const parsedAmount = Number.parseFloat(amount);

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      Alert.alert("Validation", "Amount must be greater than 0");
      return false;
    }

    if (!description.trim()) {
      Alert.alert("Validation", "Description is required");
      return false;
    }

    if (!category.trim()) {
      Alert.alert("Validation", "Category is required");
      return false;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      Alert.alert("Validation", "Date must be in YYYY-MM-DD format");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm() || submitting) {
      return;
    }

    setSubmitting(true);

    try {
      await api.post("/expenses", {
        amount: Number.parseFloat(amount),
        category: category.trim(),
        description: description.trim(),
        date,
        receipt: receipt.trim(),
      });

      Alert.alert("Success", "Expense added successfully", [
        {
          text: "OK",
          onPress: () => {
            if (onExpenseAdded) {
              onExpenseAdded();
            }
          },
        },
      ]);
    } catch (error) {
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "Failed to add expense";
      Alert.alert("Error", errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backBtn}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add Expense</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          placeholder="0.01"
          style={styles.input}
        />

        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          style={styles.dropdownTrigger}
          onPress={() => setCategoryOpen((prev) => !prev)}
          activeOpacity={0.8}
        >
          <Text style={styles.dropdownText}>{category}</Text>
          <Text style={styles.dropdownText}>{categoryOpen ? "^" : "v"}</Text>
        </TouchableOpacity>
        {categoryOpen && (
          <View style={styles.dropdownMenu}>
            {CATEGORY_OPTIONS.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.dropdownItem}
                onPress={() => {
                  setCategory(item);
                  setCategoryOpen(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.label}>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Lunch"
          style={styles.input}
        />

        <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
        <TextInput
          value={date}
          onChangeText={setDate}
          placeholder="2019-08-24"
          style={styles.input}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Receipt</Text>
        <TextInput
          value={receipt}
          onChangeText={setReceipt}
          placeholder="receipt-image-or-note"
          style={styles.input}
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={[styles.submitBtn, submitting && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Save Expense</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
  },
  backBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  backText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  headerSpacer: {
    width: 48,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
  },
  dropdownTrigger: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
    textTransform: "capitalize",
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginTop: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownItemText: {
    fontSize: 15,
    color: "#111",
    textTransform: "capitalize",
  },
  submitBtn: {
    marginTop: 22,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 46,
  },
  submitBtnDisabled: {
    opacity: 0.7,
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
