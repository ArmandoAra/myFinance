import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Alert, Image } from 'react-native';

//Components
import FormField from '@/components/auth/FormField';
import CustomButton from '@/components/buttons/CustomButton';
import { router } from 'expo-router';

import { useGlobalContext } from '@/context/GlobalProvider';
import { createDatabaseStructure, inserUserByName } from '@/db/dbTools';
import { useSQLiteContext } from 'expo-sqlite';
import use from 'react';

const SignUp = () => {
    const { setUser, setIsLogged, setLoading } = useGlobalContext();
    const [form, setForm] = useState({
        userName: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false);



    //Funcion para enviar los datos del formulario
    const submit = async () => {

        if (!form.userName || form.userName === "") {
            Alert.alert("All fields are required");
            return;
        }
        setIsSubmitting(true);
        try {
            await inserUserByName(form.userName, setUser, setIsLogged, setLoading)
            router.push("/")
        } catch (error) {
            Alert.alert("Error creating user");
        } finally {
            setIsSubmitting(false);
        }

    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        >
            <Image source={require('@/assets/images/topImage.jpg')}
                style={styles.headerImage}
                resizeMode='cover'
            ></Image>
            <ThemedView style={styles.container}>
                <ThemedText type="title">Welcome</ThemedText>
                <ThemedText type="subtitle" >Write your name:</ThemedText>
                <ThemedView style={{ marginTop: 20, gap: 10 }}>
                    <FormField
                        title="Name"
                        value={form.userName}
                        handleChangeText={(text: string) => setForm({ ...form, userName: text })}
                    />
                    <CustomButton
                        title='Sign Up'
                        handlePress={() => submit()}
                        textStyles={styles.buttonUp}
                    />
                </ThemedView>
            </ThemedView>
        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        gap: 8,
        paddingTop: 20,
        paddingBottom: 420,
    },
    buttonUp: {
        fontSize: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 10,
        marginTop: 20,
    },
    headerImage: {
        width: '100%',
        height: 250,
        top: 0,
        left: 0,
        right: 0,
        zIndex: -1,
    },
})

export default SignUp;
