import { Stack, Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

//icons
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                //ocultar el texto 
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#003b35",
                    borderTopWidth: 0,
                },
            }}>

            <Tabs.Screen
                name="sign-in"
                options={{
                    title: 'Sign In',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="sign-in" size={24} color={color} />

                    ),
                }}
            />
            <Tabs.Screen
                name="sign-up"
                options={{
                    title: 'Sign Up',
                    tabBarIcon: ({ color }) => (
                        <Feather name="user-plus" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
