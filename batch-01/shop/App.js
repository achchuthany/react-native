import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  StatusBar,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";

export default function App() {
  const productsList = [
    {
      id: 1,
      title: "Gaming Laptop",
      price: "999.99",
      image: require("./assets/laptop.jpg"),
      category: "Electronics",
      isStock: true,
    },
    {
      id: 2,
      title: "Wireless Headphones",
      price: "199.99",
      image: require("./assets/headphone.jpg"),
      category: "Electronics",
      isStock: true,
    },
    {
      id: 3,
      title: "Smartphone",
      price: "499.99",
      image: require("./assets/smartphone.jpg"),
      category: "Electronics",
      isStock: true,
    },
    {
      id: 4,
      title: "Bluetooth Speaker",
      price: "49.99",
      image: require("./assets/speaker.jpg"),
      category: "Electronics",
      isStock: true,
    },
    {
      id: 5,
      category: "Clothing",
      title: "Cotton T-Shirt",
      price: "19.99",
      image: require("./assets/tshirt.jpg"),
      isStock: true,
    },
    {
      id: 6,
      category: "Sports",
      title: "Running Shoes",
      price: "89.99",
      image: require("./assets/shoes.jpg"),
      isStock: true,
    },
    {
      id: 7,
      category: "Home",
      title: "Coffee Maker",
      price: "79.99",
      image: require("./assets/maker.jpg"),
      isStock: true,
    },
  ];

  const [products, setProducts] = useState(productsList);
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (category === "All") {
      setProducts(productsList);
    } else {
      const filteredProducts = productsList.filter(
        (product) => product.category === category,
      );
      setProducts(filteredProducts);
    }
  }, [category]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setProducts(productsList);
    } else {
      const filteredProducts = productsList.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setProducts(filteredProducts);
    }
  }, [searchQuery]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MyShop</Text>
          <View style={{ position: "absolute", right: 16, top: 12 }}>
            <Text style={{ color: "#fff", fontSize: 14, fontWeight: "500" }}>
              {cartItems.length} items
            </Text>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <Image
            source={require("./assets/search.png")}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search products..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        <CategoryList category={category} setCategory={setCategory} />
        <View style={styles.productsSection}>
          <ProductList
            products={products}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#1a1a2e",
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    width: 18,
    height: 18,
    tintColor: "#666",
  },
  searchInput: {
    marginLeft: 12,
    padding: 4,
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  productsSection: {
    flex: 1,
  },
});
