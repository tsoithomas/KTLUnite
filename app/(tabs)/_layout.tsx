import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, useColorScheme } from 'react-native';
import { Tabs, router } from 'expo-router';
import { useTranslation } from "react-i18next";
import Colors from '@/constants/Colors';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';

export default function TabLayout() {
	const { t } = useTranslation();
	const colorScheme = useColorScheme();
	const theme = Colors[colorScheme || "light"];

	const [reloadKey, setReloadKey] = useState(0);
	
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: 	theme.tabIconDefault,
				tabBarInactiveTintColor: theme.tabIconSelected,
				headerShown: useClientOnlyValue(false, true),
				tabBarStyle: {
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 0,
					elevation: 0,
					borderTopStartRadius: 30,
					borderTopEndRadius: 30,
					borderWidth: 0,
					borderTopWidth: 0,
					backgroundColor: theme.tabIconBackground,
					marginHorizontal: 0,
					paddingTop: 8,
					paddingHorizontal: 20,
					height: 90,
				},
				tabBarLabelPosition: 'below-icon',
				tabBarIconStyle: {
					width: 32,
					height: 32,
				},
				tabBarLabelStyle: {
					fontSize: 14,
				},
				tabBarHideOnKeyboard: true,
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: t('main.account'),
					// headerTitle: 'Alumni Association',
					headerTitle: () => (
						<View style={styles.headerTitle}>
							<Text style={styles.titleText}>{t('main.ktl')}</Text>
							<Image style={styles.star}
								source={require("../../assets/images/star.svg")}
							/>
							<Text style={styles.titleText}>{t('main.alumni')}</Text>
						</View>
					),
					headerTitleAlign: 'center',
					// header: ({ navigation, route, options }) => {
					// 	// const title = getHeaderTitle(options, route.name);
					// 	console.log(defaultHeaderHeight)
					// 	return (
					// 	  <View style={[styles.header, {height: defaultHeaderHeight+23+20}]}>
					// 		<View style={[styles.headerBar, {height: defaultHeaderHeight}]} />
					// 		<View style={styles.headerTitle}>
					// 			<Text style={styles.titleText}>KTL</Text>
					// 			<Image style={styles.star}
					// 				source={require("../../assets/images/star.svg")}
					// 			/>
					// 			<Text style={styles.titleText}>Alumni</Text>
					// 		</View>
					// 		{/* <Image style={styles.logo}
					// 			source={require("../../assets/images/HeaderMain.svg")}
					// 		/> */}
					// 		<HeaderSemiCircle style={styles.headerSemiCircle} />
					// 	  </View>
					// 	);
					// },
					headerStyle: {backgroundColor: theme.tint},
					headerTintColor: theme.text,
					headerShadowVisible: false,
					tabBarIcon: ({ color }) => <MaterialIcons name="account-circle" size={32} color={ color }/>,
				}}
			/>
			<Tabs.Screen
				name="activities"
				options={{
					title: t('main.events'),
					headerTitle: t('main.eventsTitle'),
					headerStyle: {backgroundColor: theme.tint},
					headerTitleAlign: 'center',
					headerTintColor: theme.text,
					headerShadowVisible: false,
					tabBarIcon: ({ color }) => <MaterialIcons name="event" size={32} color={color} />,
					headerRight: () => (
						<TouchableOpacity style={{marginHorizontal: 10}}
							onPress={() => {
								console.log('reloading');
								setReloadKey((prevKey) => prevKey + 1);
								router.navigate({
									pathname: '/activities',
									params: {
										reloadKey: reloadKey,
									}
								});
							}}
						>
							<MaterialIcons name="refresh" size={28} color={theme.text} />
						</TouchableOpacity>
					),
				}}
			/>
			<Tabs.Screen
				name="news"
				options={{
					title:t('main.news'),
					headerTitle: t('main.newsTitle'),
					headerTitleAlign: 'center',
					headerStyle: {backgroundColor: theme.tint},
					headerTintColor: theme.text,
					headerShadowVisible: false,
					tabBarIcon: ({ color }) => <MaterialIcons name="newspaper" size={32} color={ color } />,
					headerRight: () => (
						<TouchableOpacity style={{marginHorizontal: 10}}
							onPress={() => {
								console.log('reloading');
								setReloadKey((prevKey) => prevKey + 1);
								router.navigate({
									pathname: '/news',
									params: {
										reloadKey: reloadKey,
									}
								});
							}}
						>
							<MaterialIcons name="refresh" size={28} color={theme.text} />
						</TouchableOpacity>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: t('main.settings'),
					headerTitle: t('main.settingsTitle'),
					headerTitleAlign: 'center',
					headerStyle: {backgroundColor: theme.tint},
					headerTintColor: theme.text,
					headerShadowVisible: false,
					tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={32} color={ color } />,
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	headerTitle: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	titleText: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	star: {
		width: 48,
		height: 48,
	}
});
