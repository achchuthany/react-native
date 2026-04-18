import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { getToken, setToken } from "../utils/tokenHelper";
import { COLORS } from "../utils/colors";
import { apiClient } from "../utils/api";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //check if user is already logged in
  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        navigation.replace("Home");
      }
    };
    checkToken();
  });

  async function handleSignIn() {
    if (!email.trim()) {
      Alert.alert("Validation Error", "Please enter your email address.");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Validation Error", "Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post("auth/login", {
        email: email.trim(),
        password,
      });
      if (response.status === 200) {
        const { token } = response.data.data;
        await setToken(token);
        navigation.replace("Home");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials and try again.";
      Alert.alert("Login Error", errorMessage);
    } finally {
      setLoading(false);
    }
  }

  function handleSignUp() {
    navigation.navigate("SignUp");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          editable={!loading}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          editable={!loading}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          styles.bgPrimary,
          loading && styles.buttonDisabled,
        ]}
        onPress={handleSignIn}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.bgSecondary]}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.primary,
  },
  button: {
    width: "80%",
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  bgPrimary: {
    backgroundColor: COLORS.primary,
  },
  bgSecondary: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "600",
  },
  inputRow: {
    width: "80%",
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.surface,
    color: COLORS.textPrimary,
  },
});
