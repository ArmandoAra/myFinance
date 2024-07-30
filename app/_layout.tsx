import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { router, SplashScreen, Stack } from 'expo-router';
import 'react-native-reanimated';


import { useColorScheme } from '@/hooks/useColorScheme';
import { GlobalProvider } from '@/context/GlobalProvider';
import { YearAndMonthProvider } from '@/context/YearAndMonthProvider';

import { MaterialIcons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite/next';
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';

const goHomeIcon = () => {
    return (
        <Pressable onPress={() => router.push("/home")} style={{ marginLeft: 20 }}>
            <MaterialIcons name="home" size={24} color="white" />
        </Pressable>
    )
}


export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <React.Suspense fallback={<ActivityIndicator size='large' color='blue' />}>
                <YearAndMonthProvider>
                    <SQLiteProvider
                        databaseName='myFinance2.db'
                    >
                        <GlobalProvider>
                            <Stack>
                                <Stack.Screen name="index" options={{ headerShown: false }} />
                                <Stack.Screen name="(auth)" options={{
                                    headerShown: false,
                                    headerTitle: "",
                                    headerShadowVisible: false,
                                    headerStyle: { backgroundColor: "#003b35" },
                                    headerLeft: () => goHomeIcon(),
                                }} />
                                <Stack.Screen name="(home)" options={{
                                    headerShown: false,
                                }} />
                                <Stack.Screen name="(month)" options={{
                                    headerShown: true,
                                    headerTitle: "",
                                    headerStyle: {
                                        backgroundColor: '#003b35',

                                    },
                                    headerLeft: () => goHomeIcon(),
                                }} />

                                <Stack.Screen name="+not-found" />
                            </Stack>
                        </GlobalProvider>
                    </SQLiteProvider>
                </YearAndMonthProvider>
            </React.Suspense>
        </ThemeProvider>
    );
}
