import React from "react";
import { StyleSheet } from "react-native";
import { Dimensions, FlatList } from "react-native";
import { ThemedView } from "../ThemedView";
import { Amount } from "./amount";
import { Card } from "./card";
import { DeleteSpend } from "./deleteSpend";
import SpendInfo from "./spendInfo";
import { EditSpend } from './editSpend';


//Interfaces
import { Spend } from "@/constants/interfaces";

const { height } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import { verticalSpendListScale } from "@/constants/dimensions";


export function SpendList({
    list,
    setSpends,
    handleEdit
}: {
    list: Spend[],
    setSpends: React.Dispatch<React.SetStateAction<Spend[]>>,
    handleEdit: ({ id, service, date, type, amount, description }: { id: number; service: string; date: Date; type: string; amount: number; description: string }) => void
}) {

    return (



        <FlatList
            style={styles.flatlist}
            data={list}
            renderItem={({ item }) => (
                <Card>
                    <ThemedView style={styles.infoContainer}>
                        <SpendInfo
                            service={item.service}
                            date={item.createdAt}
                            type={item.type}
                            description={item.description}
                        />
                        <ThemedView style={{ height: "60%", maxHeight: 35 }}>

                            <Amount
                                amount={item.amount}
                            />
                        </ThemedView>
                        <EditSpend
                            id={item.id}
                            service={item.service}
                            date={item.createdAt}
                            type={item.type}
                            amount={item.amount}
                            description={item.description}
                            handleEdit={handleEdit}
                        />
                        <DeleteSpend id={item.id} setSpends={setSpends} list={list} />
                    </ThemedView>
                </Card>
            )}
            keyExtractor={(item) => (item.id).toString()}
        />


    )

}

const styles = StyleSheet.create({
    flatlist: {
        width: "100%",
        height: verticalSpendListScale(),
        backgroundColor: "#31363F",
        // marginTop: 3
    },
    infoContainer: {
        flexDirection: "row",
        width: "100%",
        height: "auto",
        borderRadius: 15,
        // paddingTop: 5,
        justifyContent: "space-between",
        overflow: "hidden",
    },


});