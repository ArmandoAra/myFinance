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
        <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'transparent']}
            style={styles.gradient}
        >
            <LinearGradient colors={['#028283', 'transparent']} style={styles.shadowTop} ></LinearGradient>

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

                            <Amount
                                amount={item.amount}
                            />
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
            <LinearGradient colors={['transparent', '#028283']} style={styles.shadowBottom} ></LinearGradient>
        </LinearGradient>
    )

}

const styles = StyleSheet.create({
    flatlist: {
        width: "100%",
        height: height * 0.55,
        marginTop: 10
    },
    infoContainer: {
        flexDirection: "row",
        width: "100%",
        borderRadius: 15,
        justifyContent: "space-between",
        overflow: "hidden",

    },
    gradient: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
    },
    shadowTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 10,
        zIndex: 1,
    },

    shadowBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 10,
        zIndex: 1,
    },

});