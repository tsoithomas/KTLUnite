import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/components/useColorScheme';
import { Pressable, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();
	const [shareKey, setShareKey] = useState(0);

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<ActionSheetProvider>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="modal" options={{ 
						presentation: 'modal', 
						headerStyle: {backgroundColor: '#7CC4EB'},
						headerTitleAlign: 'center',
						headerLeft: () => (
							<TouchableOpacity
								onPress={() => {
									console.log('sharing');
									setShareKey((prevKey) => prevKey + 1);
									router.navigate({
										pathname: '/modal',
										params: {
											shareKey: shareKey,
										}
									});
								}}
							>
								<MaterialIcons name="ios-share" size={28} color='#16297C' />
							</TouchableOpacity>
						),
						headerRight: () => (
							<TouchableOpacity>
								<MaterialIcons name="refresh" size={28} color='#16297C' />
							</TouchableOpacity>
						)
					}} />
				</Stack>
			</ActionSheetProvider>
		</ThemeProvider>
	);
}
