import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export function ShowDescription({ description, showDescription, setShowDescription }: {
    description: string;
    showDescription: boolean;
    setShowDescription: React.Dispatch<React.SetStateAction<boolean>>;
}) {


    return (
        <ThemedView >
            <Pressable
                style={{
                    backgroundColor: "blue",
                    width: 50,
                    borderRadius: 10,
                    padding: 5,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onPress={() => setShowDescription(!showDescription)}
            >
                <Ionicons name="information-circle-outline" size={24} color="white" />
            </Pressable>
        </ThemedView>
    );
}



const styles = StyleSheet.create({
    container: {
        flexShrink: 1,
        flexDirection: "column",
        backgroundColor: '#45474B',
        width: '60%',
        borderRadius: 10,
        position: 'relative',
    },
    editcontainer: {
        flexShrink: 1,
        backgroundColor: '#45474B',
        width: '70%',
        borderRadius: 10,
        position: 'relative',
    },
    typeText: {
        backgroundColor: "transparent",
        textAlignVertical: "center",
        width: "20%",
        fontSize: 10
    },
    serviceAndDateContainer: {
        flexDirection: "column",
        backgroundColor: "transparent",
        alignItems: "flex-start",
        paddingLeft: 5,
        margin: "auto",
        width: "80%"
    },
    dateText: {
        fontSize: 10,
        bottom: 5
    },
    serviceText: {
        fontSize: 15,
        margin: 0,
        padding: 0
    },
    letterContainer: {
        position: 'absolute',
        backgroundColor: "transparent",
        bottom: "30%", // Ajusta la distancia desde la parte superior
        left: "89%", // Ajusta la distancia desde la derecha
    },
    letter: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: "#219C90",
        width: 30,
        height: 30,
        paddingTop: 3,
        borderBottomStartRadius: 15,
        borderBottomLeftRadius: 15,
        textAlign: 'center',
    },
    descriptionButton: {
        backgroundColor: "#219C90",
        width: "30%",
        height: 50,
        position: 'relative',
        overflow: 'hidden',

    },
    description: {
        height: 50,
        width: "100%",
        fontSize: 30,
        color: "white",

    }
});

