import { FlatList } from "react-native";
import { ThemedView } from "../ThemedView";
import { Amount } from "./amount";
import { Card } from "./card";
import { DeleteSpend } from "./deleteSpend";
import SpendInfo from "./spendInfo";

interface Spends {
    id: number;
    monthId: number;
    service: string;
    amount: number;
    type: string;
    description: string;
    createdAt: Date;
}



export function SpendList({ list }: { list: Spends[] }) {
    return <FlatList
        style={{ width: "100%", height: "60%" }}
        data={list}
        renderItem={({ item }) => (
            <Card>
                <SpendInfo
                    service={item.service}
                    date={item.createdAt}
                    type={item.type}
                    id={item.id}
                />
                <ThemedView style={{ width: "40%", gap: 3, flexDirection: "row" }}>
                    <Amount
                        amount={item.amount}
                    />
                    <DeleteSpend id={item.id} />
                </ThemedView>
            </Card>
        )}
        keyExtractor={(item) => (item.id).toString()}
    />

}