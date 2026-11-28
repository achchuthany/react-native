import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

function HomeScreen() {
  const navigation = useNavigation();

  const goToProfile = () => {
    navigation.navigate("Profile", {
      userId: 23,
      name: "John Doe",
      email: "john@jfn.ac.lk",
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fafaff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#000000" }}>Home Screen</Text>
      <TouchableOpacity
        onPress={goToProfile}
        style={{
          marginTop: 20,
          backgroundColor: "#6200ee",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "#ffffff", fontSize: 16 }}>Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
