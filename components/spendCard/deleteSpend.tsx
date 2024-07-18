import { Pressable } from "react-native";
import { ThemedText } from "../ThemedText";


import { MaterialIcons } from '@expo/vector-icons';
import { deleteSpend } from "@/db/writeInDb";
import { SQLiteDatabase } from "expo-sqlite";

//Interfaces
import { Spend } from '../../constants/interfaces'

export function DeleteSpend({ id, db, setSpends, list }: { id: number, db: SQLiteDatabase, setSpends: React.Dispatch<React.SetStateAction<Spend[]>>, list: Spend[] }) {


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