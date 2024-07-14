import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import CustomButton from '@/components/buttons/CustomButton';

//Components
import FormField from '@/components/auth/FormField';
import { Link, router } from 'expo-router';

//Context
import { useGlobalContext } from '@/context/GlobalProvider';
import { createUser } from '@/lib/appwrite';

const SignIn = () => {
    const { setUser, setIsLogged } = useGlobalContext();
    const [form, setForm] = useState({
        userName: "",
        email: "",
        password: "",
        confirm_password: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false);


    //Funcion para enviar los datos del formulario
    const submit = async () => {

        if (!form.email || !form.password || !form.confirm_password || !form.userName) {
            Alert.alert("All fields are required");
            return;
        }

        if (form.password !== form.confirm_password) {
            Alert.alert("Passwords don't match");
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await createUser({
                email: form.email.trim(), //Para evitar espacios en blanco
                password: form.password,
                userName: form.userName
            })
            setUser(result);
            setIsLogged(true);

            // Set the user in the global state

            router.replace("/(tabs)");
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
                <ThemedText type="title">Sing In</ThemedText>
                <ThemedText type="subtitle" >Write your Email and Password</ThemedText>
                <ThemedView style={{ marginTop: 20, gap: 20 }}>
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(text: string) => setForm({ ...form, email: text })}

                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(text: string) => setForm({ ...form, password: text })}
                    />
                    <CustomButton
                        title='Sign In'
                        handlePress={() => submit()}
                        textStyles={styles.buttonIn}
                        isLoading={isSubmitting}
                    />
                    <ThemedText>Don't have an account? <Link href="/sign-up" style={{ color: "#4B70F5" }}>Sign Up</Link></ThemedText>
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
    buttonIn: {
        color: "white",
        fontSize: 20,
        height: 60,
        backgroundColor: "#219C90",
        borderRadius: 10,
        display: "flex",
        textAlign: "center",
        marginTop: 20,
        verticalAlign: "middle"
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

export default SignIn;
