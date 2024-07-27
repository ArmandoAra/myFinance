import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { ThemedView } from "../ThemedView";
import React from "react";
import { ThemedText } from "../ThemedText";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from "react-native";



export function Amount({ amount }: { amount: number }) {

    return (
        <ThemedView style={styles.container}>
            <AutoSizeText
                fontSize={20}
                mode={ResizeTextMode.max_lines}
                numberOfLines={1}
                style={styles.amount}
            >
                ${amount}
            </AutoSizeText>
        </ThemedView>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexShrink: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#31363F',
        width: 70,
        height: 50,
        borderRadius: 10,
    },
    amount: {
        color: "#F05941",
        backgroundColor: "#31363F",
        height: 40,
        textAlignVertical: "center",
        fontSize: 20,
        textAlign: "center"
    },

});
