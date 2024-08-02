import { Stack } from 'expo-router';
import React, { } from 'react';


//icons
import { ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

import { GlobalProvider, useGlobalContext } from '@/context/GlobalProvider';
import { ThemedView } from '@/components/ThemedView';
import { SQLiteProvider } from 'expo-sqlite/next';


//Icono de usuario negro redondeado con la inicial del nombre en blanco
const userIcon = ({ user, isLogged }: { user: string, isLogged: boolean }) => {
    if (isLogged) {
        return (<ThemedView
            style={{
                marginRight: 20,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50
            }} >
            <ThemedText style={{ fontSize: 22 }}>
                {user}
            </ThemedText>
        </ThemedView >
        )
    }
    return (<ThemedText>{user}</ThemedText>)
}


export default function HomeLayout() {

    const { isLogged, user } = useGlobalContext();

    return (
        <React.Suspense fallback={<ActivityIndicator size='large' color='blue' />}>
            <SQLiteProvider
                databaseName='myFinance2.db'
            >
                <GlobalProvider>
                    <Stack>
                        <Stack.Screen
                            name="home"
                            options={{
                                headerTitle: () => userIcon({ user, isLogged }),

                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                                headerTitleAlign: "center",
                                headerShadowVisible: false,
                                headerLeft: () => null,
                            }}

                        />
                    </Stack>
                </GlobalProvider>
            </SQLiteProvider>
        </React.Suspense>
    );
}
