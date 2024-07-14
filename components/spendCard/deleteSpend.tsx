import { Pressable } from "react-native";
import { ThemedText } from "../ThemedText";


import { MaterialIcons } from '@expo/vector-icons';



export function DeleteSpend({ id }: { id: number }) {
    return (
        <Pressable
            onPress={() => console.log("Delete", id)}
            style={{
                backgroundColor: "#FC4100",
                width: "20%",
                borderRadius: 10,
                padding: 5,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ThemedText style={{ color: "white", fontWeight: "500" }}>
                <MaterialIcons name="delete-outline" size={20} color="white" />
            </ThemedText>
        </Pressable>
    );
}