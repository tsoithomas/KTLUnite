import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const [reloadKey, setReloadKey] = useState(0);
	
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: '#16297C',
				tabBarInactiveTintColor: '#4976B4',
				// Disable the static render of the header on web
				// to prevent a hydration error in React Navigation v6.
				headerShown: useClientOnlyValue(false, true),
				tabBarStyle: {
					position: 'absolute',
					left: 20,
					right: 20,
					bottom: 20,
					elevation: 0,
					borderRadius: 30,
					borderWidth: 1,
					borderTopWidth: 1,
					borderColor: '#7CC4EB',
					backgroundColor: '#C3E8FD',
					marginHorizontal: 20,
					paddingTop: 8,
					paddingHorizontal: 20,
					height: 80,
				},
				tabBarLabelPosition: 'below-icon',
				tabBarIconStyle: {
					width: 32,
					height: 32,
				},
				tabBarLabelStyle: {
					fontSize: 14,
				},
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Account',
					headerTitle: 'Alumni Association',
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: '#7CC4EB',
					},
					headerTintColor: '#16297C',
					headerShadowVisible: false,
					tabBarIcon: ({ color }) => <MaterialIcons name="card-membership" size={32} color={ color }/>,
				}}
			/>
			<Tabs.Screen
				name="activities"
				options={{
					title: 'Events',
					headerStyle: {
						backgroundColor: '#7CC4EB'
					},
					headerTitle: 'Alumni Events',
					headerTitleAlign: 'center',
					headerTintColor: '#16297C',
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
							<MaterialIcons name="refresh" size={28} color='#16297C' />
						</TouchableOpacity>
					),
				}}
			/>
			<Tabs.Screen
				name="news"
				options={{
					title: 'News',
					headerTitle: 'School News',
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: '#7CC4EB'
					},
					headerTintColor: '#16297C',
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
							<MaterialIcons name="refresh" size={28} color='#16297C' />
						</TouchableOpacity>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: 'Settings',
					headerTitle: 'Settings',
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: '#7CC4EB'
					},
					headerTintColor: '#16297C',
					headerShadowVisible: false,
					tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={32} color={ color } />,
				}}
			/>
		</Tabs>
	);
}
