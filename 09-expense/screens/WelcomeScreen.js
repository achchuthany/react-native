import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../utils/colors";

const APP_VERSION = "1.0.0";
const PRIVACY_POLICY_URL = "https://vertex.achchuthan.lk/privacy-policy";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Branding */}
      <View style={styles.brandSection}>
        <View style={styles.iconBox}>
          <Text style={styles.iconText}>₹</Text>
        </View>
        <Text style={styles.appTitle}>Vertex Expense Tracker</Text>
        <Text style={styles.appPurpose}>
          Track your daily spending, manage categories, and stay on top of your
          finances — all in one place.
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsSection}>
        <TouchableOpacity
          style={[styles.button, styles.bgPrimary]}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.bgSecondary]}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          ⚠️ This application is developed for educational purposes only and is
          not intended for public or commercial use.
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}>
          <Text style={styles.privacyLink}>Privacy Policy</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Developed by Y. Achchuthan · v{APP_VERSION}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 60,
    paddingHorizontal: 28,
  },
  brandSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  iconText: {
    fontSize: 38,
    color: COLORS.white,
    fontWeight: "800",
  },
  appTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 12,
  },
  appPurpose: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  actionsSection: {
    width: "100%",
    gap: 10,
  },
  button: {
    width: "100%",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  bgPrimary: {
    backgroundColor: COLORS.primary,
  },
  bgSecondary: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 15,
  },
  disclaimer: {
    backgroundColor: "#fff8e1",
    borderWidth: 1,
    borderColor: "#f59e0b",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 20,
    width: "100%",
  },
  disclaimerText: {
    color: "#92400e",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
    gap: 6,
    marginTop: 24,
  },
  privacyLink: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  footerText: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
});
