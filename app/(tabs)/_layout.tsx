import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

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
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Membership',
          headerStyle: {
            backgroundColor: '#7CC4EB'
          },
          headerTintColor: '#16297C',
          tabBarIcon: ({ color }) => <MaterialIcons name="card-membership" size={32} color={ color }/>,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="activities"
        options={{
          title: 'Activities',
          headerStyle: {
            backgroundColor: '#7CC4EB'
          },
          headerTintColor: '#16297C',
          tabBarIcon: ({ color }) => <MaterialIcons name="event" size={32} color={color} />,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'School News',
          headerStyle: {
            backgroundColor: '#7CC4EB'
          },
          headerTintColor: '#16297C',
          tabBarIcon: ({ color }) => <MaterialIcons name="newspaper" size={32} color={ color } />,        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: '#7CC4EB'
          },
          headerTintColor: '#16297C',
          tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={32} color={ color } />,
        }}
      />
    </Tabs>
  );
}
