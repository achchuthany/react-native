import axios from "axios";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../utils/colors";
import { apiClient } from "../utils/api";

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (!name.trim()) {
      Alert.alert("Validation Error", "Please enter your full name.");
      return;
    }

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
      const response = await apiClient.post("auth/register", {
        email: email.trim(),
        password,
        name: name.trim(),
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert(
          "Account Created",
          "Your account was created successfully.",
          [
            {
              text: "OK",
              onPress: () => navigation.replace("SignIn"),
            },
          ],
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      Alert.alert("Sign Up Error", errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
          editable={!loading}
        />
      </View>
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
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Create Account</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.bgSecondary]}
        onPress={() => navigation.navigate("SignIn")}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Already have an account? Sign In</Text>
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
    padding: 10,
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
  },
  inputRow: {
    width: "80%",
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
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
