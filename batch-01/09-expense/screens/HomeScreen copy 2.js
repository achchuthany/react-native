import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { apiClient } from "../utils/api";
export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    setLoading(true);
    try {
      const response = await apiClient.get("expenses");
      if (response.status === 200) {
        console.log("Expenses response:", response.data.data.expenses);
        setExpenses(response.data.data.expenses);
      }
    } catch (error) {
      console.error("Expenses error:", error.response.data);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View>
      <Text>Home Screen</Text>
      {expenses.map((expense) => (
        <Text key={expense.id}>{expense.description}</Text>
      ))}
    </View>
  );
}
