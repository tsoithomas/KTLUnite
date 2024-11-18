import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Button, Platform, Pressable, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
	const colorScheme = useColorScheme();

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
						<Pressable style={{marginHorizontal: 10}}>
							{({ pressed }) => (
								<MaterialIcons name="refresh" size={28} color='#16297C' />
							)}
						</Pressable>
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
						<Pressable style={{marginHorizontal: 10}}>
							{({ pressed }) => (
								<MaterialIcons name="refresh" size={28} color='#16297C' />
							)}
						</Pressable>
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
