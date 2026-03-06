import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import CategoryItem from "./CategoryItem";

export default function CategoryList({ category, setCategory }) {
  return (
    <View style={styles.categoryContainer}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <CategoryItem
          title="All"
          isActive={category === "All"}
          onPress={() => setCategory("All")}
        />
        <CategoryItem
          title="Electronics"
          isActive={category === "Electronics"}
          onPress={() => setCategory("Electronics")}
        />
        <CategoryItem
          title="Clothing"
          isActive={category === "Clothing"}
          onPress={() => setCategory("Clothing")}
        />
        <CategoryItem
          title="Home"
          isActive={category === "Home"}
          onPress={() => setCategory("Home")}
        />
        <CategoryItem
          title="Books"
          isActive={category === "Books"}
          onPress={() => setCategory("Books")}
        />
        <CategoryItem
          title="Toys"
          isActive={category === "Toys"}
          onPress={() => setCategory("Toys")}
        />
        <CategoryItem
          title="Sports"
          isActive={category === "Sports"}
          onPress={() => setCategory("Sports")}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: "#fff",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  scrollViewContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },
});
