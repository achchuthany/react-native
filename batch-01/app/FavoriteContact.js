import { useState } from "react";
import { View, Text, Button } from "react-native";

function FavoriteContact({ name, phone }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <View style={{ padding: 15, margin: 10, borderWidth: 1 }}>
      <Text style={{ fontSize: 18 }}>{name}</Text>
      <Text>{phone}</Text>
      <Button
        title={favorite ? "Remove Favorite" : "Add Favorite"}
        onPress={() => setFavorite(!favorite)}
      />
    </View>
  );
}

export default function App() {
  return (
    <View>
      <FavoriteContact name="John Doe" phone="0771234567" />
      <FavoriteContact name="John Raj" phone="0719876543" />
      <FavoriteContact name="John Smith" phone="0754455667" />
    </View>
  );
}
