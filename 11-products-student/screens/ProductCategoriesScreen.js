import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";

export default function ProductCategoriesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product Categories</Text>
      <Text style={styles.body}>
        Available categories from GET /products/categories will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});
