import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { apiClient } from "../utils/api";
import { COLORS } from "../utils/colors";
import { getToken } from "../utils/tokenHelper";

export default function HomeScreen({ navigation }) {
  /**
   * STEP 1: State
   * Keep all UI and API states in one place.
   */
  const [expenses, setExpenses] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalCount: 0,
    limit: 0,
    totalPages: 0,
  });

  /**
   * STEP 2: Small helper functions (beginner-friendly)
   */
  const formatAmount = (amount) => {
    const value = Number(amount || 0);
    return `$${value.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatCategory = (category) => {
    if (!category) return "Other";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  /**
   * STEP 3: API call
   * pageNumber = which page to load
   * isRefresh = true when pull-to-refresh is used
   */
  const fetchExpenses = async (pageNumber = 1, isRefresh = false) => {
    if (pageNumber === 1 && !isRefresh) setLoadingInitial(true);
    if (pageNumber > 1) setLoadingMore(true);
    if (isRefresh) setRefreshing(true);

    setErrorMessage("");

    try {
      const response = await apiClient.get("expenses", {
        params: {
          page: pageNumber,
          limit: 4,
        },
      });

      const newExpenses = response?.data?.data?.expenses || [];
      const newPagination = response?.data?.data?.pagination || {};

      if (pageNumber === 1) {
        setExpenses(newExpenses);
      } else {
        setExpenses((prev) => [...prev, ...newExpenses]);
      }

      setPagination(newPagination);
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setErrorMessage("Failed to load expenses. Please try again.");
    } finally {
      setLoadingInitial(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  /**
   * STEP 4: FlatList actions
   */
  const loadMore = () => {
    const hasMore = pagination.currentPage < pagination.totalPages;
    if (hasMore && !loadingMore && !loadingInitial) {
      fetchExpenses(pagination.currentPage + 1);
    }
  };

  const refreshList = () => {
    fetchExpenses(1, true);
  };

  /**
   * STEP 5: Reusable UI render functions
   */
  const renderExpenseItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.rowTop}>
          <Text style={styles.category}>{formatCategory(item.category)}</Text>
          <Text style={styles.amount}>{formatAmount(item.amount)}</Text>
        </View>

        <Text style={styles.description}>
          {item.description || "No description"}
        </Text>

        <View style={styles.rowBottom}>
          <Text style={styles.metaText}>Date: {formatDate(item.date)}</Text>
          <Text style={styles.metaText}>
            ID: {item.id?.slice(0, 8) || "N/A"}
          </Text>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    if (!loadingMore) return <View style={styles.footerSpacing} />;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator color="#0f766e" size="small" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loadingInitial) return null;
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>No expenses found</Text>
        <Text style={styles.emptySubtitle}>Pull down to refresh.</Text>
      </View>
    );
  };

  /**
   * STEP 6: Initial load
   */
  useEffect(() => {
    fetchExpenses();
  }, []);

  /**
   * STEP 7: Auth guard
   */
  useEffect(() => {
    const checkToken = async () => {
      const token =getToken();
      if (!token) {
        navigation.replace("SignIn");
      }
    };

    checkToken();
  }, [navigation]);

  /**
   * STEP 8: Final UI
   */
  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.heading}>Your Expenses</Text>
        <Text style={styles.subHeading}>
          {pagination.totalCount || 0} total expenses
        </Text>
        <Text style={styles.subHeading}>
          Showing {pagination.currentPage || 1} of {pagination.totalPages || 1}{" "}
          pages
        </Text>
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {loadingInitial ? (
        <View style={styles.centerLoader}>
          <ActivityIndicator color="#0f766e" size="large" />
          <Text style={styles.loadingText}>Loading expenses...</Text>
        </View>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item, index) => `${item.id || "expense"}-${index}`}
          renderItem={renderExpenseItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshList}
              colors={["#0f766e"]}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  heading: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
  },
  subHeading: {
    color: COLORS.primaryLight,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rowTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rowBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  category: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  amount: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  description: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 21,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  emptyState: {
    marginTop: 40,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  emptySubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.textMuted,
  },
  centerLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  footerLoader: {
    paddingVertical: 12,
  },
  footerSpacing: {
    height: 8,
  },
  errorText: {
    color: COLORS.danger,
    marginBottom: 10,
    fontSize: 13,
    fontWeight: "500",
    width: "100%",
  },
});
