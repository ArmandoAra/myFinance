import { Pressable } from "react-native";
import { ThemedText } from "../ThemedText";




//Interfaces
import { Spend } from '../../constants/interfaces'
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemedView } from "../ThemedView";

export function EditSpend({
    id, service, date, type, amount, description, handleEdit
}: {
    id: number;
    service: string;
    date: Date;
    type: string;
    amount: number;
    description: string;
    handleEdit: ({ id, service, date, type, amount }: { id: number; service: string; date: Date; type: string; amount: number; }) => void;
}) {



    return (
        <Pressable
            onPress={() => handleEdit({ id, service, date, type, amount })}
            style={{ width: 50, height: 50, backgroundColor: "#219C90", borderRadius: 15, justifyContent: "center", alignItems: "center", overflow: "hidden" }}
        >
            <ThemedView style={{ backgroundColor: "transparent", width: "auto", height: "auto" }}>
                <FontAwesome5 name="edit" size={18} color="white" />
            </ThemedView>
        </Pressable>
    );
}