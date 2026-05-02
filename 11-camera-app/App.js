import { StatusBar } from 'expo-status-bar';

import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import CameraAccess from './CameraAccess';
import { useAppFonts } from './fonts';
import LocationPicker from './Location';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('camera');
  const [fontsLoaded] = useAppFonts();

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0f172a" />
        <Text style={styles.loadingText}>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable
          style={[styles.tabButton, activeScreen === 'camera' && styles.activeTabButton]}
          onPress={() => setActiveScreen('camera')}
        >
          <Text style={[styles.tabText, activeScreen === 'camera' && styles.activeTabText]}>Camera</Text>
        </Pressable>
        <Pressable
          style={[styles.tabButton, activeScreen === 'location' && styles.activeTabButton]}
          onPress={() => setActiveScreen('location')}
        >
          <Text style={[styles.tabText, activeScreen === 'location' && styles.activeTabText]}>Location</Text>
        </Pressable>
      </View>

      <View style={styles.content}>{activeScreen === 'camera' ? <CameraAccess /> : <LocationPicker />}</View>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#fff',
  },
  loadingText: {
    fontFamily: 'Poppins_400Regular',
    color: '#0f172a',
  },
  topBar: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingTop: 54,
    paddingBottom: 10,
    backgroundColor: '#f1f5f9',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#0f172a',
  },
  tabText: {
    color: '#0f172a',
    fontFamily: 'Poppins_600SemiBold',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
});
