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
                width: "10%",
                height: "54%",
                maxHeight: 30,
                maxWidth: 30,
                borderRadius: 10,
                margin: 3,

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