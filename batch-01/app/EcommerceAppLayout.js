import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";

const EcommerceAppLayout = () => {
  return (
    <View style={styles.appContainer}>
      {/* HEADER - Fixed at top */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ShopEasy</Text>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#95a5a6"
          />
        </View>

        {/* Category Filters - Horizontal Scroll */}
        <View style={styles.categoryContainer}>
          <View style={styles.categoryChip}>
            <Text style={styles.categoryText}>All</Text>
          </View>
          <View style={[styles.categoryChip, styles.categoryActive]}>
            <Text style={[styles.categoryText, styles.categoryActiveText]}>
              Electronics
            </Text>
          </View>
          <View style={styles.categoryChip}>
            <Text style={styles.categoryText}>Fashion</Text>
          </View>
          <View style={styles.categoryChip}>
            <Text style={styles.categoryText}>Home</Text>
          </View>
        </View>

        {/* Product Grid - 2 columns */}
        <View style={styles.productGrid}>
          <View style={styles.productCard}>
            <View style={styles.productImage}>
              <Text style={styles.productImageText}>🎧</Text>
            </View>
            <Text style={styles.productName}>Wireless Headphones</Text>
            <Text style={styles.productPrice}>$79.99</Text>
          </View>

          <View style={styles.productCard}>
            <View style={styles.productImage}>
              <Text style={styles.productImageText}>⌚</Text>
            </View>
            <Text style={styles.productName}>Smart Watch</Text>
            <Text style={styles.productPrice}>$199.99</Text>
          </View>

          <View style={styles.productCard}>
            <View style={styles.productImage}>
              <Text style={styles.productImageText}>📱 </Text>
            </View>
            <Text style={styles.productName}>Phone Case</Text>
            <Text style={styles.productPrice}>$24.99</Text>
          </View>

          <View style={styles.productCard}>
            <View style={styles.productImage}>
              <Text style={styles.productImageText}>🎮</Text>
            </View>
            <Text style={styles.productName}>Gaming Controller</Text>
            <Text style={styles.productPrice}>$59.99</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // ============ APP CONTAINER ============
  appContainer: {
    flex: 1, // Fill entire screen
    backgroundColor: "#f5f5f5",
  },

  // ============ HEADER ============
  header: {
    flexDirection: "row", // Horizontal layout
    justifyContent: "space-between", // Space between title and icons
    alignItems: "center", // Vertically center
    backgroundColor: "#db3458",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 40, // Extra space for status bar
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  // ============ CONTENT AREA ============
  content: {
    flex: 1, // Take remaining space
    padding: 16,
  },

  // ============ SEARCH BAR ============
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 8,
    marginBottom: 16,
    height: 48,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1, // Take remaining space
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "300",
  },

  // ============ CATEGORY FILTERS ============
  categoryContainer: {
    flexDirection: "row", // Horizontal scroll
    marginBottom: 16,
  },
  categoryChip: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  categoryActive: {
    backgroundColor: "#db3458",
  },
  categoryText: {
    fontSize: 12,
    color: "#7f8c8d",
  },
  categoryActiveText: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  // ============ PRODUCT GRID (2 columns) ============
  productGrid: {
    flexDirection: "row", // Horizontal layout
    flexWrap: "wrap", // Wrap to next row
    justifyContent: "space-between", // Space between items
  },
  productCard: {
    width: "48%", // ~Half width (with gap)
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  productImage: {
    height: 120,
    backgroundColor: "#ecf0f1",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  productImageText: {
    fontSize: 64,
  },
  productName: {
    fontSize: 14,
    color: "#2c3e50",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27ae60",
  },
});

export default function App() {
  return <EcommerceAppLayout />;
}
