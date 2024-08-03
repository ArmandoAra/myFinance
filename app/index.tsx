import { StyleSheet, StyleSheetProperties, Image, ActivityIndicator, Dimensions } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';

import CustomButton from '@/components/buttons/CustomButton';
import use, { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/GlobalProvider';

//DB
import * as SQLite from 'expo-sqlite';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite/next'; //Nos aseguramos de que se importe la version mas reciente
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { useYearAndMonthContext, YearAndMonthProvider } from '@/context/YearAndMonthProvider';
import React from 'react';
import { createDatabaseStructure, getUser } from '@/db/dbTools';






//Debo tambien crear una funcion para crear la estructura de la base de datos si no existe e insertar el usuario guest

//Funcion de ayruda para cargar la base de datos que podemos mover a otro archivo
export const loadDatabase = async () => {
    const dbName = 'myFinance.db';
    const dbAsset = require('@/assets/db/myFinance.db');// db file in assets folder
    const dbUri = Asset.fromModule(dbAsset).uri; // get the uri of the db file
    const dbDir = FileSystem.documentDirectory + 'SQLite/' + dbName; // directory to store the db file

    const dbInfo = await FileSystem.getInfoAsync(dbDir); // check if the db file exists

    if (!dbInfo.exists || dbInfo.size < 20480) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite/', { intermediates: true });
        await FileSystem.downloadAsync(dbUri, dbDir); // download the db file
        createDatabaseStructure()
    }
}


export default function App() {
    const [dbLoaded, setDbLoaded] = useState<boolean>(false);
    const { isLogged, setUser, setIsLogged, user } = useGlobalContext();


    useEffect(() => {
        loadDatabase()
            .then(() => setDbLoaded(true))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        getUser(setUser, setIsLogged)
    }, []);


    if (!dbLoaded) {
        return (
            <ThemedView>
                <ActivityIndicator size='large' color='blue' />
                <ThemedText>Loading...</ThemedText>
            </ThemedView>
        )
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        >
            <Image source={require('../assets/images/topImage.jpg')}
                style={styles.headerImage}
                resizeMode='cover'
            ></Image>
            <ThemedView style={styles.container}>
                <ThemedText type="title" style={styles.title}>My Finance </ThemedText>
                <ThemedText>{dbLoaded ?? "Base de datos cargada"}</ThemedText>

                {isLogged && <Redirect href='/home' />}

                <ThemedView style={styles.buttonContainer}>
                    <CustomButton
                        title='New User'
                        handlePress={() => router.push('/insertUser')}
                        textStyles={buttonStyles.buttonIn}
                    />

                </ThemedView>
            </ThemedView>

        </ParallaxScrollView>

    );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 18,
        height,
        paddingTop: 50,

    },
    headerImage: {
        width: '100%',
        height: 250,
        top: 0,
        left: 0,
        right: 0,
        zIndex: -1,
    },
    title: {
        width: '100%',
        height: "30%",
        textAlignVertical: "center",
        textAlign: "center",
        fontSize: 40,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
});


//Buttons Styles con el texto bien centrado
const buttonStyles = StyleSheet.create({
    buttonIn: {
        color: "white",
        fontSize: 20,
        width: 300,
        height: 60,
        backgroundColor: "#219C90",
        borderRadius: 10,
        display: "flex",
        verticalAlign: "middle",
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonUp: {
        color: "white",
        fontSize: 20,
        width: 300,
        height: 60,
        backgroundColor: "#4B70F5",
        borderRadius: 10,
        display: "flex",
        verticalAlign: "middle",
        justifyContent: 'center',
        alignItems: 'center'
    },

});
