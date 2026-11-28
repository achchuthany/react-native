import { View, Text, FlatList, RefreshControl } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
export default function App() {
  //state variable for expenses
  const [expenses, setExpenses] = useState([]);
  //page number for pagination
  const [page, setPage] = useState(1);
  //get expenses from API
  function fetchExpenses(page = 1, limit = 3) {
    axios
      .get("https://vertex.achchuthan.lk/api/mock/expenses", {
        params: {
          page: page,
          limit: limit,
        },
      })
      .then((response) => {
        console.log("Fetched expenses:", response.data);
        setExpenses((prevExpenses) => [
          ...prevExpenses,
          ...response.data.expenses,
        ]);
        setPage(page + 1);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <View>
      <Text>Expenses List</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, height: 300 }}>
            <Text>{item.description}</Text>
            <Text>${item.amount}</Text>
          </View>
        )}
        onEndReached={() => {
          console.log("end", page);
          fetchExpenses(page);
        }}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              setExpenses([]);
              setPage(1);
              fetchExpenses();
            }}
          />
        }
      />
    </View>
  );
}
