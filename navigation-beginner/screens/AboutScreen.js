import { View, Text } from "react-native-web";

function AboutScreen({ route }) {
  const { id, name } = route.params || [];
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text> About Screen</Text>
      <Text>ID : {id}</Text>
      <Text>Name: {name}</Text>
    </View>
  );
}

export default AboutScreen;
