import { FlatList } from "react-native";
import { ThemedView } from "../ThemedView";
import { Amount } from "./amount";
import { Card } from "./card";
import { DeleteSpend } from "./deleteSpend";
import SpendInfo from "./spendInfo";
import { SQLiteDatabase } from "expo-sqlite";


//Interfaces
import { Spend } from "@/constants/interfaces";
import React from "react";

export function SpendList({
    list,
    setSpends,
    showAmountInfo,
    handleEdit
}: {
    list: Spend[],
    setSpends: React.Dispatch<React.SetStateAction<Spend[]>>,
    showAmountInfo: boolean
    handleEdit: ({ id, service, date, type, amount }: { id: number; service: string; date: Date; type: string; amount: number; }) => void
}) {



    return <FlatList
        style={{ width: "100%", height: "60%" }}
        data={list}
        renderItem={({ item }) => (
            <Card>
                <SpendInfo
                    amount={item.amount}
                    service={item.service}
                    date={item.createdAt}
                    type={item.type}
                    id={item.id}
                    handleEdit={handleEdit}
                />
                <ThemedView style={{ width: "40%", gap: 3, flexDirection: "row" }}>
                    <Amount
                        amount={item.amount}
                        showInfo={showAmountInfo}
                    />
                    <DeleteSpend id={item.id} setSpends={setSpends} list={list} />
                </ThemedView>
            </Card>
        )}
        keyExtractor={(item) => (item.id).toString()}
    />

}