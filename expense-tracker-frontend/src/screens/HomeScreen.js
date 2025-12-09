import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import api from '../utils/api';
import { removeToken } from '../utils/storage';

export default function HomeScreen({ onLogout }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [expensesRes, statsRes] = await Promise.all([
        api.get('/expenses?limit=10'),
        api.get('/expenses/stats'),
      ]);
      setExpenses(expensesRes.data || []);
      setStats(statsRes.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await removeToken();
    onLogout();
  };

  const handleDeleteExpense = async (id) => {
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await api.delete(`/expenses/${id}`);
            setExpenses(expenses.filter((e) => e.id !== id));
          } catch {
            Alert.alert('Error', 'Failed to delete expense');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expenses</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {stats && (
        <View style={styles.statsCard}>
          <Text style={styles.statsLabel}>Total Spending</Text>
          <Text style={styles.statsValue}>₹ {stats.totalAmount?.toFixed(2) || '0.00'}</Text>
          <Text style={styles.statsCount}>{stats.totalCount || 0} transactions</Text>
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : expenses.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No expenses yet</Text>
          <Text style={styles.emptySubtext}>Start tracking your spending</Text>
        </View>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.expenseItem}>
              <View style={styles.expenseInfo}>
                <Text style={styles.expenseTitle}>{item.description}</Text>
                <Text style={styles.expenseCategory}>{item.category}</Text>
                <Text style={styles.expenseDate}>{new Date(item.date).toLocaleDateString()}</Text>
              </View>
              <View style={styles.expenseActions}>
                <Text style={styles.expenseAmount}>₹ {item.amount.toFixed(2)}</Text>
                <TouchableOpacity
                  onPress={() => handleDeleteExpense(item.id)}
                  style={styles.deleteBtn}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          refreshing={loading}
          onRefresh={fetchData}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutBtn: {
    backgroundColor: '#d32f2f',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  statsCard: {
    margin: 20,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  statsLabel: {
    color: '#666',
    fontSize: 14,
  },
  statsValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#007AFF',
  },
  statsCount: {
    color: '#999',
    fontSize: 12,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  emptySubtext: {
    color: '#999',
    marginTop: 5,
  },
  expenseItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
  },
  expenseInfo: {
    flex: 1,
  },
  expenseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  expenseCategory: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
  },
  expenseDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  expenseActions: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  deleteBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  deleteText: {
    color: '#d32f2f',
    fontSize: 12,
    fontWeight: '600',
  },
});
