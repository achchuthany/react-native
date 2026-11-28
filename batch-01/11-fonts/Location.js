import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function LocationScreen() {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState('');

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied.');
				return;
			}

			const currentLocation = await Location.getCurrentPositionAsync({});
			setLocation(currentLocation);
		})();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Current Location</Text>
			{errorMsg ? (
				<Text style={styles.text}>{errorMsg}</Text>
			) : location ? (
				<>
					<Text style={styles.text}>Latitude: {location.coords.latitude}</Text>
					<Text style={styles.text}>Longitude: {location.coords.longitude}</Text>
				</>
			) : (
				<Text style={styles.text}>Fetching location...</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
	},
	title: {
		fontSize: 22,
		fontWeight: '600',
		marginBottom: 12,
	},
	text: {
		fontSize: 16,
		marginBottom: 6,
	},
});
