import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { ThemedView } from "../ThemedView";
import React from "react";
import { ThemedText } from "../ThemedText";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from "react-native";



export function Amount({
    amount,
    showInfo = true,
}: {
    amount: number;
    showInfo: boolean;
}) {


    // Cuando se mantenga presionado el botón de Amount, se mostrará un mensaje en la pantalla con la información del gasto
    return (
        <Pressable
            onPressIn={() => console.log("Amount")}
            onPressOut={() => console.log("Amount Out")}
            style={{
                backgroundColor: "#31363F", borderRadius: 10, width: "60%", height: 40, position: 'relative',
                overflow: 'hidden',
            }}
        >
            <AutoSizeText
                fontSize={20}
                mode={ResizeTextMode.max_lines}
                numberOfLines={1}
                style={{ color: "#F05941", backgroundColor: "#31363F", borderRadius: 10, height: 40, textAlignVertical: "center", fontSize: 20, textAlign: "center" }}
            >
                ${amount}

            </AutoSizeText>
            {showInfo &&
                <ThemedView style={
                    {
                        position: 'absolute',
                        backgroundColor: "transparent",
                        bottom: "30%",
                        left: "70%",
                        opacity: 0.3,
                    }
                }>
                    <ThemedText style={
                        {
                            fontSize: 20,
                            color: 'white',
                            width: 30,
                            height: 30,
                            paddingTop: 3,
                            textAlign: 'center',

                        }
                    }><MaterialIcons name="info-outline" size={20} color="white" /></ThemedText>
                </ThemedView>
            }
        </Pressable>
    );
}

