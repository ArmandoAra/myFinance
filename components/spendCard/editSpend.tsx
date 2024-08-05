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
    handleEdit: ({ id, service, date, type, amount, description }: { id: number; service: string; date: Date; type: string; amount: number; description: string }) => void;
}) {



    return (
        <Pressable
            onPress={() => handleEdit({ id, service, date, type, amount, description })}
            style={{
                width: "10%",
                height: "54%",
                backgroundColor: "#219C90",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                margin: 3,
                maxHeight: 30,
                maxWidth: 30,
            }}
        >
            <ThemedView style={{ backgroundColor: "transparent", width: "auto", height: "auto" }}>
                <FontAwesome5 name="edit" size={18} color="white" />
            </ThemedView>
        </Pressable>
    );
}