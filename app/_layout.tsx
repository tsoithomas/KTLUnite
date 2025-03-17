import "@/global.css";
import { useEffect, useState } from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { Stack, router } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import '@/i18n';
import { useTranslation } from "react-i18next";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Text } from '@ui-kitten/components';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const { t } = useTranslation();
	const colorScheme = useColorScheme();
	const theme = Colors[colorScheme || "light"];

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
	const { t } = useTranslation();
	const colorScheme = useColorScheme();
	const registerFirstPage = 0, registerPageTotal = 4;
	const [registerPageNumber, setRegisterPageNumber] = useState(registerFirstPage);
	const [shareKey, setShareKey] = useState(0);
	const [closeDialogKey, setCloseDialogKey] = useState(0);
	const [submitKey, setSubmitKey] = useState(0);

	return (
		<ApplicationProvider {...eva} theme={eva.light}>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<ActionSheetProvider>
					<Stack screenOptions={{autoHideHomeIndicator: true}}>
						<Stack.Screen name="(tabs)" options={{ headerShown: false}} />
						<Stack.Screen name="modal" options={{ 
							presentation: 'modal', 
							headerStyle: {backgroundColor: '#7CC4EB'},
							headerTitleAlign: 'center',
							headerLeft: () => (
								<TouchableOpacity
									onPress={() => {
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
						<Stack.Screen name="register" options={{ 
							title: t('main.register'),
							presentation: 'card', 
							headerStyle: {backgroundColor: '#7CC4EB'},
							headerTitleAlign: 'center',
							headerBackTitle: "Back",
							headerShadowVisible: false,
							headerTintColor: '#16297C',

							headerLeft: () => (
								<TouchableOpacity
									onPress={() => {
										if (registerPageNumber == registerFirstPage) {
											setCloseDialogKey((prevKey) => prevKey + 1);
											setRegisterPageNumber(registerFirstPage);
											router.push({
												pathname: '/register',
												params: {
													closeDialog: closeDialogKey,
													pageNumber: registerFirstPage,
												},
											});
										}
										else {
											setRegisterPageNumber((prevPage) => prevPage - 1);
											router.navigate({
												pathname: '/register',
												params: {
													pageNumber: registerPageNumber-1,
												},
											});
										}
											
									}}
								>
									{
										registerPageNumber == registerFirstPage
										? <MaterialIcons name="close" size={28} color="#16297C" />
										: <Text>{t('register.back')}</Text>
									}
									
								</TouchableOpacity>
							),


							headerRight: () => (
								<TouchableOpacity
									onPress={() => {
										if (registerPageNumber < registerPageTotal-1) {
											setRegisterPageNumber((prevPage) => prevPage + 1);
											router.navigate({
												pathname: '/register',
												params: {
													pageNumber: registerPageNumber+1,
												}
											});
										}
										else {
											setSubmitKey((prevKey) => prevKey + 1);
											router.navigate({
												pathname: '/register',
												params: {
													submit: submitKey,
												},
											});
										}
									}}
								>
									{
										registerPageNumber < registerPageTotal-1
										? <Text>{t('register.next')}</Text>
										: <Text>{t('register.submit')}</Text>
									}
								</TouchableOpacity>
							),

						}} />
						<Stack.Screen name="terms" options={{ 
							title: t('settings.termsOfService'),
							presentation: 'card', 
							headerStyle: {backgroundColor: '#7CC4EB'},
							headerTitleAlign: 'center',
							headerBackTitle: "Back",
							headerShadowVisible: false,
							headerTintColor: '#16297C',
						}} />
					</Stack>
				</ActionSheetProvider>
			</ThemeProvider>
		</ApplicationProvider>
	);
}
