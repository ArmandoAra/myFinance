import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

import { Ionicons } from '@expo/vector-icons';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { z } from 'zod';

export function SpendInfo({ service, date, type, description, }: {
    service: string;
    date: Date;
    type: string;
    description: string;
}) {


    const [showDescription, setShowDescription] = React.useState(false);

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.typeContainer}>
                <ThemedView style={styles.typeTextContainer}>
                    <AutoSizeText
                        fontSize={12}
                        mode={ResizeTextMode.max_lines}
                        numberOfLines={1}
                        style={styles.typeText}
                    >
                        {type}
                    </AutoSizeText>
                </ThemedView>
                <ThemedView style={styles.serviceAndDateContainer}>
                    <ThemedText style={styles.serviceText}>{service}</ThemedText>
                    <ThemedText style={styles.dateText}>{new Date(date).toDateString()}</ThemedText>
                </ThemedView>

                {description.length > 0 &&
                    <Pressable
                        style={styles.showDescription}
                        onPress={() => setShowDescription(!showDescription)}
                    >
                        <Ionicons name="information-circle-outline" size={24} color="white" />
                    </Pressable>}
            </ThemedView>
            {showDescription &&
                <ThemedView style={styles.descriptionContainer}>
                    <ThemedText style={styles.description}>{description}</ThemedText>
                </ThemedView>
            }
        </ThemedView>
    );
}



const styles = StyleSheet.create({
    container: {
        flexShrink: 1,
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        margin: 5,
        width: '60%',
        borderRadius: 10,
        height: "auto",
        position: 'relative',
    },
    editcontainer: {
        flexShrink: 1,
        backgroundColor: '#45474B',
        width: '70%',
        borderRadius: 10,
        position: 'relative',
    },
    typeContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        overflow: "hidden",
        borderRadius: 15,
        alignContent: "center",
        alignItems: "center",
    },
    typeTextContainer: {
        backgroundColor: "#45474B",
        width: 40,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        objectFit: "cover",
    },
    typeText: {
        backgroundColor: "transparent",
        fontSize: 12,
        color: "white",
        padding: 2,
        textAlignVertical: "center",
        textAlign: "center"
    },
    serviceAndDateContainer: {
        flexDirection: "column",
        margin: "auto",
        width: "65%",
    },
    dateText: {
        fontSize: 10,
        bottom: 5
    },
    serviceText: {
        textAlign: "left",
        width: 120,
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
        paddingTop: 0,
        borderBottomStartRadius: 15,
        borderBottomLeftRadius: 15,
        textAlign: 'center',
    },
    showDescription: {
        width: 50,
        height: 50,
        backgroundColor: "transparent",
        borderRadius: 15,
        alignItems: "center",
        overflow: "hidden",
        position: "absolute",
        right: -10,
        top: 0,
    },
    descriptionContainer: {
        width: "100%",
        borderRadius: 7,
        overflow: "hidden",
        margin: 5,
        backgroundColor: "#45474B"
    },
    description: {
        width: "100%",
        fontSize: 16,
        color: "white",
        padding: 5,
    }
});

export default SpendInfo;
