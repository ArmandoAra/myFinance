import { FlatList } from "react-native";
import { ThemedView } from "../ThemedView";
import { Amount } from "./amount";
import { Card } from "./card";
import { DeleteSpend } from "./deleteSpend";
import SpendInfo from "./spendInfo";
import { SQLiteDatabase } from "expo-sqlite";


//Interfaces
import { Spend } from '../../constants/interfaces'

export function SpendList({
    list,
    db,
    setSpends,
    showAmountInfo
}: {
    list: Spend[],
    db: SQLiteDatabase,
    setSpends: React.Dispatch<React.SetStateAction<Spend[]>>,
    showAmountInfo: boolean
}) {



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
                        showInfo={showAmountInfo}
                    />
                    <DeleteSpend id={item.id} db={db} setSpends={setSpends} list={list} />
                </ThemedView>
            </Card>
        )}
        keyExtractor={(item) => (item.id).toString()}
    />

}