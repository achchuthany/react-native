import { View, TextInput, Image, StyleSheet } from "react-native";
import EmailIcon from "./assets/email.png";
import PhoneIcon from "./assets/phone.png";

export default function InputWithIcon() {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image source={EmailIcon} style={styles.icon} />
        <TextInput placeholder="Enter your email" style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Image source={PhoneIcon} style={styles.icon} />
        <TextInput placeholder="Enter your phone number" style={styles.input} 
        keyboardType="numeric"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
});
