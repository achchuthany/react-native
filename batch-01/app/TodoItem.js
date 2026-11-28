import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

function TodoItem({ task }) {
  const [done, setDone] = useState(false);
  return (
    <View
      style={{
        padding: 8,
        margin: 8,
        backgroundColor: "#eee",
      }}
    >
      <Text>{task}</Text>
      <Button title={done ? "Undo" : "Done"} onPress={() => setDone(!done)} />
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>My Todo List</Text>
      <TodoItem task="Buy Computer" />
      <TodoItem task="Play Cricket" />
      <TodoItem task="Watch Movie" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
