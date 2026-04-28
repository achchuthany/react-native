import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function CameraAccess() {
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState('back');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>We need camera permission to continue.</Text>
        <Button onPress={requestPermission} title="Grant camera permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function handleTakePicture() {
    if (!cameraRef.current || isSaving) {
      return;
    }

    try {
      setIsSaving(true);
      setSaveMessage('');

      let permissionResult = mediaLibraryPermission;
      if (!permissionResult || !permissionResult.granted) {
        permissionResult = await requestMediaLibraryPermission();
      }

      if (!permissionResult?.granted) {
        setSaveMessage('Gallery permission is required to save photos.');
        return;
      }

      const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
      await MediaLibrary.createAssetAsync(photo.uri);
      setSaveMessage('Photo saved to gallery.');
    } catch (error) {
      setSaveMessage('Could not capture photo. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
          <Text style={styles.buttonText}>{isSaving ? 'Saving...' : 'Capture'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.buttonText}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
      {saveMessage ? <Text style={styles.message}>{saveMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 12,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 24,
    gap: 12,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  message: {
    position: 'absolute',
    top: 56,
    left: 12,
    right: 12,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 8,
    borderRadius: 8,
    fontFamily: 'PlayfairDisplay_400Regular',
  },
});
