import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function LocationPicker() {
	const [locationText, setLocationText] = useState('No location selected');
	const [isLoading, setIsLoading] = useState(false);

	async function handleSelectLocation() {
		try {
			setIsLoading(true);
			setLocationText('Requesting location permission...');

			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setLocationText('Permission denied.');
				return;
			}

			const position = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.Balanced,
			});

			const { latitude, longitude } = position.coords;
			setLocationText(`Latitude: ${latitude.toFixed(6)}\nLongitude: ${longitude.toFixed(6)}`);
		} catch (error) {
			setLocationText('Could not fetch location.');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Simple Location Picker</Text>
			<Button
				title={isLoading ? 'Getting location...' : 'Select Current Location'}
				onPress={handleSelectLocation}
				disabled={isLoading}
			/>
			<Text style={styles.locationText}>{locationText}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 24,
		gap: 16,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 22,
		fontFamily: 'PlayfairDisplay_700Bold',
	},
	locationText: {
		fontSize: 16,
		textAlign: 'center',
		lineHeight: 24,
		fontFamily: 'Poppins_400Regular',
	},
});
