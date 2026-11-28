import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { COLORS } from "../utils/colors";
import { apiClient } from "../utils/api";

const CATEGORIES = ["fashion", "electronics", "home", "sports", "beauty"];

const STATUS_OPTIONS = ["active", "inactive"];

export default function CreateProductScreen({ navigation }) {
  // #TODO: Create state variables for all form fields (name, description, price, imageUrl, stock, status and category)
  // and for controlling the category modal visibility and submission state.
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState("active");

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    // #TODO: Validate the name, price and category is non empty and price .
    // Show appropriate alert messages if validation fails.

    setSubmitting(true);
    try {
      // #TODO: Make a POST request to /products with the form data.
      // On success, show a success alert and navigate back to the product list.
      // Handle any errors by showing an error alert.
    } catch (error) {
      // #TODO: Show an alert with the error message if the API call fails.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* Name */}
      <Text style={styles.label}>
        Name <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Running Shoe"
        placeholderTextColor={COLORS.textMuted}
        editable={!submitting}
      />

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Product description…"
        placeholderTextColor={COLORS.textMuted}
        multiline
        numberOfLines={3}
        editable={!submitting}
      />

      {/* Price */}
      <Text style={styles.label}>
        Price <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="0.01"
        placeholderTextColor={COLORS.textMuted}
        keyboardType="decimal-pad"
        editable={!submitting}
      />

      {/* Category */}
      <Text style={styles.label}>
        Category <Text style={styles.required}>*</Text>
      </Text>
      <TouchableOpacity
        style={[styles.input, styles.picker]}
        onPress={() => setCategoryModalVisible(true)}
        disabled={submitting}
      >
        <Text style={category ? styles.pickerText : styles.pickerPlaceholder}>
          {category
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : "Select a category"}
        </Text>
        <Text style={styles.pickerChevron}>▾</Text>
      </TouchableOpacity>

      {/* Image URL */}
      <Text style={styles.label}>Image URL</Text>
      <TextInput
        style={styles.input}
        placeholder="https://example.com/image.jpg"
        placeholderTextColor={COLORS.textMuted}
        keyboardType="url"
        autoCapitalize="none"
        editable={!submitting}
      />

      {/* Stock */}
      <Text style={styles.label}>Stock</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        placeholderTextColor={COLORS.textMuted}
        keyboardType="number-pad"
        editable={!submitting}
      />

      {/* Status */}
      <Text style={styles.label}>Status</Text>
      <View style={styles.statusRow}>
        {STATUS_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[
              styles.statusChip,
              status === opt && styles.statusChipActive,
            ]}
            onPress={() => !submitting && setStatus(opt)}
          >
            <Text
              style={[
                styles.statusChipText,
                status === opt && styles.statusChipTextActive,
              ]}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Submit */}
      <TouchableOpacity
        style={[styles.button, submitting && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.buttonText}>Create Product</Text>
        )}
      </TouchableOpacity>

      {/* Category Modal */}
      <Modal
        visible={categoryModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setCategoryModalVisible(false)}
        >
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Select Category</Text>
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    category === item && styles.modalItemActive,
                  ]}
                  onPress={() => {
                    setCategory(item);
                    setCategoryModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      category === item && styles.modalItemTextActive,
                    ]}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                  {category === item && (
                    <Text style={styles.modalItemCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginBottom: 6,
    marginTop: 14,
  },
  required: {
    color: COLORS.danger,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  picker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pickerText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  pickerPlaceholder: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  pickerChevron: {
    fontSize: 16,
    color: COLORS.textMuted,
  },
  statusRow: {
    flexDirection: "row",
    gap: 10,
  },
  statusChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
  },
  statusChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  statusChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textMuted,
  },
  statusChipTextActive: {
    color: COLORS.white,
  },
  button: {
    marginTop: 28,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    paddingBottom: 36,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 16,
    textAlign: "center",
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  modalItemActive: {
    backgroundColor: COLORS.primaryLight,
  },
  modalItemText: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  modalItemTextActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  modalItemCheck: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "700",
  },
});
