import { Link, router, Stack, Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

//icons
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Pressable, StyleSheetProperties, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { getMonthByNumber } from '@/utils/getMonth';
import { YearAndMonthProvider } from '@/context/YearAndMonthProvider';
import { ThemedText } from '@/components/ThemedText';
import CustomButton from '@/components/buttons/CustomButton';

import { useGlobalContext } from '@/context/GlobalProvider';
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

const logOutIcon = ({ isLogged }: { isLogged: boolean }) => {
    //por el momento solo redirecciona
    //comprobar si esta logueado, desloguear y redireccionar a pantalla root
    return (
        <Pressable style={{ marginRight: 20, }} onPress={() => router.push("/")}>
            <MaterialIcons name="logout" size={24} color="white" />
        </Pressable>
    )

}

export default function HomeLayout() {

    const { isLogged, user } = useGlobalContext();

    //Obtenemos el usuario y si no existe entramos como invitado
    const [currentUser, setCurrentUser] = useState(user || '');

    return (
        <React.Suspense fallback={<ActivityIndicator size='large' color='blue' />}>
            <SQLiteProvider
                databaseName='myFinance2.db'
            >

                <Stack>
                    <Stack.Screen
                        name="home" //El nomber tiene que ser igual al que se pone en el archivo de rutas
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
            </SQLiteProvider>
        </React.Suspense>
    );
}
