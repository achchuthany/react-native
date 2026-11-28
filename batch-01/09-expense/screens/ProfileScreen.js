import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { clearToken, getToken } from "../utils/tokenHelper";
import { COLORS } from "../utils/colors";

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const token = await getToken();
      const response = await axios.get(
        "https://vertex.achchuthan.lk/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProfile(response.data.data);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    await clearToken();
    navigation.replace("SignIn");
  };

  const initial = profile?.name?.[0]?.toUpperCase() || "U";

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.stateCard}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.stateText}>Loading profile...</Text>
        </View>
      ) : error ? (
        <View style={styles.stateCard}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={fetchProfile}
          >
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            {profile?.avatar_url ? (
              <Image
                source={{ uri: profile.avatar_url }}
                style={styles.avatar}
              />
            ) : (
              <View style={[styles.avatar, styles.avatarFallback]}>
                <Text style={styles.avatarText}>{initial}</Text>
              </View>
            )}
          </View>

          <Text style={styles.name}>{profile?.name || "No name"}</Text>
          <Text style={styles.email}>{profile?.email || "No email"}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Joined</Text>
            <Text style={styles.metaValue}>
              {profile?.created_at
                ? new Date(profile.created_at).toLocaleDateString()
                : "-"}
            </Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 26,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 18,
  },
  profileCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatarWrap: {
    alignItems: "center",
    marginBottom: 14,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  avatarFallback: {
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 34,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 18,
  },
  metaRow: {
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaLabel: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: "600",
  },
  metaValue: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },
  stateCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  stateText: {
    color: COLORS.textSecondary,
    marginTop: 10,
    fontSize: 14,
  },
  errorText: {
    color: COLORS.danger,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 16,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    minWidth: 140,
  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
  },
});
