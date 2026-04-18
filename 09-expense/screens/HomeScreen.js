import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
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
  const [stats, setStats] = useState({
    total: { count: 0, amount: 0 },
    byCategory: [],
  });
  const [loadingStats, setLoadingStats] = useState(false);

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

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const response = await apiClient.get("expenses/stats");
      const statsData = response?.data?.data || {};
      setStats({
        total: statsData.total || { count: 0, amount: 0 },
        byCategory: statsData.byCategory || [],
      });
    } catch (err) {
      setStats({
        total: { count: 0, amount: 0 },
        byCategory: [],
      });
    } finally {
      setLoadingStats(false);
    }
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
          limit: 5,
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
    fetchStats();
  };

  /**
   * STEP 5: Reusable UI render functions
   */
  const renderExpenseItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("EditExpense", { expense: item })}
      >
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
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (!loadingMore) return <View style={styles.footerSpacing} />;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator color={COLORS.primary} size="small" />
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
  useFocusEffect(
    useCallback(() => {
      fetchExpenses(1);
      fetchStats();
    }, []),
  );

  /**
   * STEP 7: Auth guard
   */
  useEffect(() => {
    const checkToken = async () => {
      const token = getToken();
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
        {loadingStats ? (
          <Text style={styles.subHeading}>Loading summary...</Text>
        ) : (
          <View style={styles.summaryRow}>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Total Count</Text>
              <Text style={styles.summaryValue}>{stats.total.count || 0}</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Total Amount</Text>
              <Text style={styles.summaryValue}>
                {formatAmount(stats.total.amount)}
              </Text>
            </View>
          </View>
        )}
        <Text style={styles.subHeading}>
          Showing {pagination.currentPage || 1} of {pagination.totalPages || 1}{" "}
          pages
        </Text>
      </View>

      {stats.byCategory.length > 0 ? (
        <View style={styles.categoryStatsCard}>
          <Text style={styles.categoryStatsTitle}>By Category</Text>
          {stats.byCategory.map((item, index) => (
            <View
              key={`${item.category || "category"}-${index}`}
              style={styles.categoryStatRow}
            >
              <Text style={styles.categoryStatName}>
                {formatCategory(item.category)} ({item.count || 0} items)
              </Text>
              <Text style={styles.categoryStatValue}>
                {formatAmount(item.total)}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {loadingInitial ? (
        <View style={styles.centerLoader}>
          <ActivityIndicator color={COLORS.primary} size="large" />
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
              colors={[COLORS.primary]}
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
  summaryRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  summaryLabel: {
    color: COLORS.primaryLight,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  summaryValue: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "800",
  },
  categoryStatsCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  categoryStatsTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
  },
  categoryStatRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 7,
  },
  categoryStatName: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },
  categoryStatValue: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: "700",
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
