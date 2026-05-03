import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import NotificationsScreen from "./Notifications";
import LocationScreen from "./Location";

export default function App() {
  const [loaded, error] = useFonts({
    RobotoSlab_Regular: require("./assets/fonts/RobotoSlab-Regular.ttf"),
  });
  const cameraRef = useRef(null);

  //camera permissions
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImageUri, setCapturedImageUri] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  async function handleCapture() {
    if (!cameraRef.current || !isCameraReady) {
      return;
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
      });

      if (photo?.uri) {
        setCapturedImageUri(photo.uri);
      }
    } catch (captureError) {
      console.error("Error capturing image:", captureError);
    }
  }

  // Handle font loading error
  if (error) {
    console.error("Error loading fonts:", error);
    return null; // You can also render a fallback UI here
  }

  // Render the app only when fonts are loaded
  if (!loaded) {
    return null; // You can also render a loading indicator here
  }

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.textNormal}>Camera permission is required.</Text>
        <Button title="Allow Camera" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Roboto Slab Regular Font</Text>
        <Text style={styles.textNormal}>Normal Font</Text>
      </View>
      <View style={styles.cameraSection}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          onCameraReady={() => setIsCameraReady(true)}
        />
        <View style={styles.captureButtonContainer}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleCapture}
            disabled={!isCameraReady}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.previewSection}>
        <Text style={styles.previewTitle}>Captured Image</Text>
        {capturedImageUri ? (
          <Image
            source={{ uri: capturedImageUri }}
            style={styles.previewImage}
          />
        ) : (
          <Text style={styles.previewPlaceholder}>
            Tap the shutter button to capture a photo.
          </Text>
        )}
      </View>
      <NotificationsScreen />
      <LocationScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: "RobotoSlab_Regular",
    fontSize: 30,
  },
  textNormal: {
    fontSize: 30,
  },
  cameraSection: {
    flex: 1,
    width: "100%",
    marginTop: 16,
    position: "relative",
  },
  camera: {
    flex: 1,
  },
  captureButtonContainer: {
    position: "absolute",
    bottom: 24,
    width: "100%",
    alignItems: "center",
  },
  captureButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  captureButtonInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#fff",
  },
  previewSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#f7f7f7",
  },
  previewTitle: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: "600",
  },
  previewImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    resizeMode: "cover",
  },
  previewPlaceholder: {
    fontSize: 16,
    color: "#555",
  },
});
