import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { apiClient } from "../utils/api";
import { COLORS } from "../utils/colors";
import { getToken } from "../utils/tokenHelper";

const CATEGORIES = [
  "food",
  "transport",
  "shopping",
  "bills",
  "entertainment",
  "health",
  "other",
];

const formatInputDate = (value) => {
  if (!value) return "";
  if (typeof value === "string" && value.length >= 10) {
    return value.slice(0, 10);
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

export default function EditExpenseScreen({ navigation, route }) {
  const expense = route?.params?.expense;

  const initialCategory = useMemo(() => {
    const current = expense?.category || "food";
    return CATEGORIES.includes(current) ? current : "other";
  }, [expense?.category]);

  const [amount, setAmount] = useState(String(expense?.amount || ""));
  const [category, setCategory] = useState(initialCategory);
  const [description, setDescription] = useState(expense?.description || "");
  const [date, setDate] = useState(formatInputDate(expense?.date));
  const [receipt, setReceipt] = useState(expense?.receipt || "");

  const [loading, setLoading] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (!token) {
        navigation.replace("SignIn");
      }
    };

    checkToken();
  }, [navigation]);

  const handleUpdate = async () => {
    if (!expense?.id) {
      Alert.alert("Error", "Invalid expense id.");
      return;
    }

    if (!amount || Number.isNaN(parseFloat(amount))) {
      Alert.alert("Validation Error", "Please enter a valid amount.");
      return;
    }

    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      Alert.alert("Validation Error", "Date must be in YYYY-MM-DD format.");
      return;
    }

    const payload = {
      amount: parseFloat(amount),
      category,
      description,
      date,
      receipt,
    };

    setLoading(true);
    try {
      const response = await apiClient.put(`expenses/${expense.id}`, payload);
      if (response?.status === 200) {
        Alert.alert("Success", "Expense updated successfully.", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update expense.";
      Alert.alert("Update Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Expense</Text>

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={setAmount}
        editable={!loading}
      />

      <Text style={styles.label}>Category</Text>
      <TouchableOpacity
        style={styles.picker}
        onPress={() => setCategoryModalVisible(true)}
        disabled={loading}
      >
        <Text style={styles.pickerText}>{category}</Text>
        <Text style={styles.pickerArrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={categoryModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setCategoryModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.modalItem,
                  category === cat && styles.modalItemSelected,
                ]}
                onPress={() => {
                  setCategory(cat);
                  setCategoryModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalItemText,
                    category === cat && styles.modalItemTextSelected,
                  ]}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter description"
        multiline
        numberOfLines={3}
        value={description}
        onChangeText={setDescription}
        editable={!loading}
      />

      <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="2024-01-01"
        value={date}
        onChangeText={setDate}
        keyboardType="numbers-and-punctuation"
        maxLength={10}
        editable={!loading}
      />

      <Text style={styles.label}>Receipt</Text>
      <TextInput
        style={styles.input}
        placeholder="Receipt reference"
        value={receipt}
        onChangeText={setReceipt}
        editable={!loading}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleUpdate}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Update Expense</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: COLORS.background,
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.surface,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  picker: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerText: {
    fontSize: 15,
    color: COLORS.textPrimary,
    textTransform: "capitalize",
  },
  pickerArrow: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    overflow: "hidden",
  },
  modalItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalItemSelected: {
    backgroundColor: COLORS.primaryLight,
  },
  modalItemText: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  modalItemTextSelected: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 28,
    marginBottom: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
