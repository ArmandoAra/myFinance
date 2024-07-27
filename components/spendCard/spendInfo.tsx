import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { z } from 'zod';
import { HelloWave } from '../../../lsd/components/HelloWave';
import { TextWrap } from '@vicons/tabler';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';

export function SpendInfo({ id, service, date, type, amount, description, }: {
    id: number;
    service: string;
    date: Date;
    type: string;
    amount: number;
    description: string;
}) {


    const [showDescription, setShowDescription] = React.useState(false);

    return (<ThemedView style={styles.container}>
        <ThemedView style={{ width: "100%", flexDirection: "row", overflow: "hidden", borderRadius: 15 }}>
            <ThemedView style={styles.typeTextContainer}>
                <AutoSizeText
                    fontSize={20}
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
                    style={{ width: 50, height: 50, backgroundColor: "transparent", borderRadius: 15, justifyContent: "center", alignItems: "center", overflow: "hidden", position: "absolute", right: 0 }}
                    onPress={() => setShowDescription(!showDescription)}
                >
                    <Ionicons name="information-circle-outline" size={24} color="white" />
                </Pressable>}
        </ThemedView>
        {showDescription &&
            <ThemedView style={{ width: "100%", borderRadius: 7, overflow: "hidden", margin: 5, backgroundColor: "#45474B" }}>
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
        position: 'relative',
    },
    editcontainer: {
        flexShrink: 1,
        backgroundColor: '#45474B',
        width: '70%',
        borderRadius: 10,
        position: 'relative',
    },
    typeTextContainer: {
        backgroundColor: "#45474B",
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        objectFit: "cover",
    },
    typeText: {
        backgroundColor: "transparent",
        color: "white",
        padding: 2,
        height: 50,
        width: 50,
        textAlignVertical: "center",
        textAlign: "center"
    },
    serviceAndDateContainer: {
        flexDirection: "column",
        margin: "auto",
        width: "75%",
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
        paddingTop: 3,
        borderBottomStartRadius: 15,
        borderBottomLeftRadius: 15,
        textAlign: 'center',
    },
    description: {
        width: "100%",
        fontSize: 16,
        color: "white",
        padding: 5,
    }
});

export default SpendInfo;
