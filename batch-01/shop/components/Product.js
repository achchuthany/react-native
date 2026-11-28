import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function Product({ id, title, price, image, category, isStock, cartItems, setCartItems }) {
  return (
    <View style={styles.productCard}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.productImage} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.productTitle} numberOfLines={2}>{title}</Text>
        <Text style={styles.productPrice}>${price}</Text>
        <TouchableOpacity style={styles.productAddButton} activeOpacity={0.8} onPress={() => setCartItems([...cartItems, { id, title, price, image }])}>
          <Text style={styles.productAddButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        {cartItems.some((item) => item.id === id) && (
          <View style={styles.addedMessage}>
            <Text style={styles.addedMessageText}>✓ Added to Cart</Text>
          </View>
        )}
        <View style={styles.divider} />
        <View style={styles.metaContainer}>
          <View style={styles.stockBadge}>
            <Text style={styles.stockText}>In Stock</Text>
          </View>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: "#ececec",
    borderRadius: 16,
    width: "48%",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  imageContainer: {
    backgroundColor: "#ffffff",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    resizeMode: "contain",
  },
  cardContent: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: 6,
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#16a34a",
    marginBottom: 10,
  },
  productAddButton: {
    backgroundColor: "#1e2e1a",
    paddingVertical: 10,
    borderRadius: 10,
  },
  productAddButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
  },
  addedMessage: {
    backgroundColor: "#dcfce7",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#16a34a",
  },
  addedMessageText: {
    fontSize: 12,
    color: "#16a34a",
    fontWeight: "600",
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#bebebe",
    marginVertical: 10,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stockBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  stockText: {
    fontSize: 11,
    color: "#16a34a",
    fontWeight: "500",
  },
  categoryText: {
    fontSize: 11,
    color: "#888",
    fontWeight: "500",
  },
});
