import React from 'react'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import CustomButton from './buttons/CustomButton'
import { router } from 'expo-router'
import { StyleSheet } from 'react-native'

const EmptyList = ({ title, subtitle }: { title: string, subtitle?: string }) => {
    return (
        <ThemedView>
            <ThemedText style={{ fontSize: 20, color: "#ffff", marginTop: 20, marginBottom: 20 }}>{title}</ThemedText>
            {subtitle && <ThemedText>{subtitle}</ThemedText>}
            <CustomButton
                title="Create"
                handlePress={() => router.push("/create")}
                textStyles={styles.createButton}

            />


        </ThemedView>
    )
}

const styles = StyleSheet.create({
    createButton: {
        color: "white",
        fontSize: 20,
        width: 300,
        height: 60,
        backgroundColor: "#219C90",
        borderRadius: 10,
        display: "flex",
        textAlign: "center",
        textAlignVertical: "center",
    },
})

export default EmptyList
