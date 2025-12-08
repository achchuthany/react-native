import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";

function HomeScreen({ navigation }) {
  const handleOnPress = () => {
    navigation.navigate("About", {
      id: 1,
      name: "Yogarajah Achchuthan",
    });
  };
  return (
    <View style={style.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={handleOnPress} style={style.button}>
        <Text>Navigate to About Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ffccff",
    padding: 8,
    borderRadius: 8,
    marginTop: 16,
  },
});

export default HomeScreen;
