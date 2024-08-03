import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import 'react-native-reanimated';


import { useColorScheme } from '@/hooks/useColorScheme';
import { GlobalProvider } from '@/context/GlobalProvider';
import { YearAndMonthProvider } from '@/context/YearAndMonthProvider';

import { MaterialIcons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable } from 'react-native';
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import React from 'react';

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
                        databaseName='myFinance.db'
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
