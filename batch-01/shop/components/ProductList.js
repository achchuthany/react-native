import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Product from "./Product";

export default function ProductList({
  products = [],
  cartItems = [],
  setCartItems,
}) {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.productContainer}
      showsVerticalScrollIndicator={false}
    >
      {products.map((product, index) => (
        <Product
          key={index}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
          category={product.category}
          isStock={product.isStock}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      ))}

      {products && products.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyText}>No products found</Text>
          <Text style={styles.emptySubtext}>
            Try adjusting your search or filter
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#888",
  },
});
