import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import axios from "axios";

const ExpenseScreen = () => {
  const PAGE_SIZE = 5;
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const formatExpenseDate = (dateValue) => {
    const parsedDate = new Date(dateValue);

    if (Number.isNaN(parsedDate.getTime())) {
      return dateValue || "-";
    }

    return parsedDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // The API Endpoint provided
  const API_URL = "https://vertex.achchuthan.lk/api/mock/expenses";

  useEffect(() => {
    fetchExpenses(1, false);
  }, []);

  const fetchExpenses = async (targetPage, isLoadMore) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          page: targetPage,
          limit: PAGE_SIZE,
        },
      });
      const fetchedExpenses = response.data?.expenses || [];

      //print base url and params for debugging
      setExpenses((prev) =>
        isLoadMore ? [...prev, ...fetchedExpenses] : fetchedExpenses,
      );
      setPage(targetPage);
      setHasMore(fetchedExpenses.length === PAGE_SIZE);
    } catch (err) {
      setError("Failed to fetch data. Check your connection.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const loadMoreExpenses = () => {
    if (loading || loadingMore || !hasMore) {
      return;
    }

    setLoadingMore(true);
    fetchExpenses(page + 1, true);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchExpenses(1, false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Expenses...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Expenses</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.topRow}>
              <Text style={styles.title}>{item.description}</Text>
              <Text style={styles.amount}>Rs. {item.amount.toFixed(2)}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.badge}>{item.category}</Text>
              <Text style={styles.date}>{formatExpenseDate(item.date)}</Text>
            </View>
          </View>
        )}
        onEndReached={loadMoreExpenses}
        onEndReachedThreshold={0.4}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#00a906"]}
            tintColor="#00a906"
          />
        }
        ListFooterComponent={
          loadingMore ? <ActivityIndicator style={styles.footerLoader} /> : null
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fb", paddingHorizontal: 16 },
  listContent: { paddingBottom: 18 },
  footerLoader: { paddingVertical: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 14,
    color: "#111827",
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    height: 200,
    elevation: 2, // Shadow for Android
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 16, fontWeight: "600", color: "#111827", flex: 1 },
  amount: {
    fontSize: 17,
    fontWeight: "700",
    color: "#16a34a",
    marginLeft: 12,
  },
  badge: {
    fontSize: 12,
    color: "#1d4ed8",
    backgroundColor: "#dbeafe",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
  },
  date: { fontSize: 12, color: "#6b7280" },
});

export default ExpenseScreen;
