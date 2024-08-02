import { Pressable } from "react-native";
import { ThemedText } from "../ThemedText";


import { MaterialIcons } from '@expo/vector-icons';
import { deleteSpend } from "@/db/dbTools";

//Interfaces
import { Spend } from '../../constants/interfaces'
import { useSQLiteContext } from "expo-sqlite/next";

export function DeleteSpend({
    id,
    setSpends,
    list
}: {
    id: number,
    setSpends: React.Dispatch<React.SetStateAction<Spend[]>>,
    list: Spend[]
}) {
    const db = useSQLiteContext();

    const handleDelete = () => {
        deleteSpend(id, db)
        const newList = list.filter((item) => item.id !== id)
        setSpends(newList)
    }

    return (
        <Pressable
            onPress={handleDelete}
            style={{
                backgroundColor: "#FC4100",
                width: 50,
                borderRadius: 10,
                padding: 5,
                height: 50,
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