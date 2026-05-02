import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../utils/colors";
import { apiClient } from "../utils/api";

function ProductCard({ item, navigation }) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => navigation.navigate("EditProduct", { product: item })}
    >
      {/* Image */}
      <View style={[styles.cardImage, styles.cardImagePlaceholder]}>
        <Text style={styles.cardImagePlaceholderText}>No Image</Text>
      </View>

      {/* Body */}
      <View style={styles.cardBody}>
        {/* Top row: name + status badge */}
        <View style={styles.cardTopRow}>
          <Text style={styles.cardName} numberOfLines={1}>
            Name
          </Text>
          <View
            style={[
              styles.statusBadge,
              item?.status === "active"
                ? styles.statusActive
                : styles.statusInactive,
            ]}
          >
            <Text
              style={[
                styles.statusBadgeText,
                item?.status === "active"
                  ? styles.statusActiveText
                  : styles.statusInactiveText,
              ]}
            >
              Status
            </Text>
          </View>
        </View>

        {/* Category pill */}
        <View style={styles.categoryPill}>
          <Text style={styles.categoryPillText}>Category</Text>
        </View>

        {/* Description */}
        <Text style={styles.cardDescription} numberOfLines={2}>
          Description
        </Text>

        {/* Bottom row: price + stock + edit */}
        <View style={styles.cardBottomRow}>
          <View>
            <Text style={styles.cardPrice}>Price</Text>
            <Text style={styles.cardStock}>Stock</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("EditProduct", { product: item })
            }
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ProductListScreen({ navigation }) {
  // #TODO - Fetch products from GET /products and display in FlatList using the ProductCard component.
  // #TODO use state variables to manage the products and pagination
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // #TODO: Make a GET request to /products to fetch the product list.
      } catch (error) {
        // #TODO: Show an alert with the error message if the API call fails.
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* #TODO: show pagination info based on the API response (e.g. "Page 1 of 10") */}
      <Text style={styles.paginationText}>Page 1 of 10</Text>

      {/* #TODO: Render the product list using FlatList and the ProductCard component. 
      Show a placeholder text if the list is empty. */}
      <ProductCard item={{ category: "sports" }} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  paginationText: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 8,
  },
  list: {
    paddingBottom: 24,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: COLORS.textMuted,
    fontSize: 15,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    marginBottom: 16,
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardImage: {
    width: 110,
    height: "100%",
    minHeight: 120,
  },
  cardImagePlaceholder: {
    backgroundColor: COLORS.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  cardImagePlaceholderText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  cardBody: {
    flex: 1,
    padding: 12,
    gap: 4,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  cardName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  statusActive: {
    backgroundColor: "#dcfce7",
  },
  statusInactive: {
    backgroundColor: "#fee2e2",
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  statusActiveText: {
    color: "#16a34a",
  },
  statusInactiveText: {
    color: COLORS.danger,
  },
  categoryPill: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    marginTop: 2,
  },
  categoryPillText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.primary,
    textTransform: "capitalize",
  },
  cardDescription: {
    fontSize: 12,
    color: COLORS.textMuted,
    lineHeight: 17,
    marginTop: 4,
  },
  cardBottomRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 8,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  cardStock: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "700",
  },
});
