import { FlatList } from "react-native";
import { ThemedView } from "../ThemedView";
import { Amount } from "./amount";
import { Card } from "./card";
import { DeleteSpend } from "./deleteSpend";
import SpendInfo from "./spendInfo";
import { SQLiteDatabase } from "expo-sqlite";
import db from 'oui-data';

interface Spends {
    id: number;
    monthId: number;
    service: string;
    amount: number;
    type: string;
    description: string;
    createdAt: Date;
}



export function SpendList({ list, db }: { list: Spends[], db: SQLiteDatabase }) {
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
                    <DeleteSpend id={item.id} db={db} />
                </ThemedView>
            </Card>
        )}
        keyExtractor={(item) => (item.id).toString()}
    />

}