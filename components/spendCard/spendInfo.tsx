import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

export function SpendInfo({ id, service, date, type, amount, handleEdit }: {
    id: number;
    service: string;
    date: Date;
    type: string;
    amount: number
    handleEdit: ({ id, service, date, type, amount }: { id: number; service: string; date: Date; type: string; amount: number; }) => void;
}) {




    return (
        <Pressable
            onPress={() => handleEdit({ id, service, date, type, amount })}
            style={styles.container}
        >
            <ThemedView style={{ flexDirection: "row", backgroundColor: "transparent", paddingHorizontal: 10, height: "100%" }}>
                <ThemedText style={{ backgroundColor: "transparent", textAlignVertical: "center", width: "20%", fontSize: 10 }}>{type}</ThemedText>
                <ThemedView style={{ flexDirection: "column", backgroundColor: "transparent", alignItems: "flex-start", paddingLeft: 5, margin: "auto", width: "80%" }}>
                    <ThemedText style={{ fontSize: 15, margin: 0, padding: 0 }}>{service}</ThemedText>
                    <ThemedText style={{ fontSize: 10, bottom: 5 }}>{new Date(date).toDateString()}</ThemedText>
                </ThemedView>
            </ThemedView>


            <ThemedView style={styles.letterContainer}>
                <ThemedText style={styles.letter}><FontAwesome5 name="edit" size={14} color="white" /></ThemedText>
            </ThemedView>
        </Pressable>
    );
}



const styles = StyleSheet.create({
    container: {
        flexShrink: 1,
        backgroundColor: '#45474B',
        width: '60%',
        borderRadius: 10,
        position: 'relative',
        overflow: 'hidden', // Oculta el contenido desbordado
    },
    typeText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    serviceText: {},
    dateText: {
        fontSize: 12,
        color: 'gray',
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
});

export default SpendInfo;
