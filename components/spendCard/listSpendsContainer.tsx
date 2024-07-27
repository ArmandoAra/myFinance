import React from "react";
import { StyleSheet } from "react-native";
import { Dimensions, FlatList, Pressable } from "react-native";
import { ThemedView } from "../ThemedView";
import { Amount } from "./amount";
import { Card } from "./card";
import { DeleteSpend } from "./deleteSpend";
import SpendInfo from "./spendInfo";
import { EditSpend } from './editSpend';


//Interfaces
import { Spend } from "@/constants/interfaces";
import { FontAwesome5 } from "@expo/vector-icons";
import { ShowDescription } from "./showDescription";
import { ThemedText } from "../ThemedText";

const { height, width } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';


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

    return (
        <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={styles.gradient}
        >
            <LinearGradient colors={['#028283', 'transparent']} style={styles.shadowTop} ></LinearGradient>

            <FlatList
                style={{
                    width: "100%", height: height * 0.55, marginTop: 10

                }}
                data={list}
                renderItem={({ item }) => (
                    <Card>
                        <ThemedView style={{
                            flexDirection: "row",
                            width: "100%",
                            borderRadius: 15,
                            gap: 5,
                            overflow: "hidden",

                        }}>
                            <SpendInfo
                                amount={item.amount}
                                service={item.service}
                                date={item.createdAt}
                                type={item.type}
                                id={item.id}
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