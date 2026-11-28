import { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

function PrimaryButton({ onPress, title }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

export default function App() {
  const [like, setLike] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    console.log(`Likes: ${like}`);
  }, [like]);

  const handleLike = () => {
    setLike(like + 1);
  };
  const handleReset = () => {
    setLike(0);
  };
  const handleNameChange = (text) => {
    setName(text);
  };
  return (
    <View style={styles.container}>
      <Text>Hello, {name}</Text>
      <TextInput
        placeholder="Your Name"
        style={styles.input}
        onChangeText={handleNameChange}
      />
      <Text>Likes: {like}</Text>
      <PrimaryButton onPress={handleLike} title="Like" />
      <PrimaryButton onPress={handleReset} title="Reset" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 12,
    padding: 24,
  },
  button: {
    backgroundColor: "#1e40af",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});
