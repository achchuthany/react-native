import { useFonts } from 'expo-font';

export function useAppFonts() {
  return useFonts({
    Poppins_400Regular: require('./assets/fonts/Poppins-Regular.ttf'),
    Poppins_600SemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    PlayfairDisplay_400Regular: require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
    PlayfairDisplay_700Bold: require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
  });
}
