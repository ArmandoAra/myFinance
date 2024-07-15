import { Pressable } from "react-native";
import { ThemedText } from "../ThemedText";


import { MaterialIcons } from '@expo/vector-icons';
import { deleteSpend } from "@/db/writeInDb";
import { SQLiteDatabase } from "expo-sqlite";

export function DeleteSpend({ id, db }: { id: number, db: SQLiteDatabase }) {

    const handleDelete = () => {
        console.log(id)
        deleteSpend(id, db)
    }

    return (
        <Pressable
            onPress={handleDelete}
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