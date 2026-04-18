import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../utils/colors";
import axios from "axios";
import { useEffect, useState } from "react";

const PAGE_SIZE = 4;
const FIRST_PAGE = 1;
const API_URL = "https://vertex.achchuthan.lk/api/mock/expenses";

export default function WelcomeScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [hasMore, setHasMore] = useState(true);

  const fetchExpenses = async (pageNumber = FIRST_PAGE, isRefresh = false) => {
    if (pageNumber === FIRST_PAGE && !isRefresh) setLoadingInitial(true);
    if (isRefresh) setRefreshing(true);
    if (pageNumber > FIRST_PAGE) setLoadingMore(true);
    setError("");

    try {
      const response = await axios.get(API_URL, {
        params: {
          page: pageNumber,
          limit: PAGE_SIZE,
        },
      });
      const nextItems = response.data?.expenses || [];

      setExpenses((prev) =>
        pageNumber === FIRST_PAGE ? nextItems : [...prev, ...nextItems],
      );
      setHasMore(nextItems.length === PAGE_SIZE);
      setCurrentPage(pageNumber);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setError("Failed to load expenses. Please try again.");
    } finally {
      setLoadingInitial(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchExpenses(FIRST_PAGE);
  }, []);

  const refreshList = () => {
    setHasMore(true);
    fetchExpenses(FIRST_PAGE, true);
  };

  const canLoadMore = hasMore && !loadingMore && !loadingInitial && !refreshing;

  const loadNextPage = () => {
    if (!canLoadMore) return;
    fetchExpenses(currentPage + 1);
  };

  const renderExpenseItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Welcome Screen!</Text>
      <TouchableOpacity
        style={[styles.button, styles.bgPrimary]}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.bgSecondary]}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      {loadingInitial && (
        <ActivityIndicator size={"large"} color={COLORS.primary} />
      )}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderExpenseItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshList}
            colors={[COLORS.primary]}
          />
        }
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size={"small"} color={COLORS.primary} />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "80%",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  bgPrimary: {
    backgroundColor: COLORS.primary,
  },
  bgSecondary: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginTop: 8,
  },
  card: {
    height: 200,
  },
});
