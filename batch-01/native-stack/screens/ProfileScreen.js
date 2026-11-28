import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

function ProfileScreen({ route }) {
  const { userId, name, email } = route.params || {};
  const navigation = useNavigation();

  const updateTitle = () => {
    navigation.setOptions({ title: name });
  };
  return (
    <View>
      <Text>Profile Screen</Text>
      <Text>User ID: {userId}</Text>
      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>

      <TouchableOpacity onPress={updateTitle}>
        <Text>Update Title</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ProfileScreen;
