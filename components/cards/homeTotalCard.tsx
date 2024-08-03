import { ThemedText } from "../ThemedText"
import { ThemedView } from "../ThemedView"
import { FlatList, StyleSheet } from 'react-native';

// Constants
import {
    rowHeaderColor,
} from "../../constants/Colors";
import { useYearAndMonthContext } from "@/context/YearAndMonthProvider";

//Db
import { getYearData, YearDataResult } from "@/db/dbTools";
import { useCallback, useState } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite/next";



export interface YearAndMonthData {
    month: string;
    amount: number;
    spendAmount: number;
}


export default function HomeTotalCard() {
    const db = useSQLiteContext();
    const [yearData, setYearData] = useState<YearDataResult>()
    const [yearAndMonthData, setYearAndMonthData] = useState<YearAndMonthData[]>([])

    //Obtener selectedYear from context
    const { selectedYear } = useYearAndMonthContext();


    //Cada vez que cambie la ruta hacer un fetch de los datos
    useFocusEffect(
        useCallback(() => {
            getYearData(db, selectedYear, setYearAndMonthData, setYearData)
        }, [selectedYear])
    );

    return (

        < ThemedView style={styles.container} >
            <ThemedView style={styles.textHeaderContainer}>
                <ThemedText style={styles.textHeader} >Total of the {selectedYear}</ThemedText>
            </ThemedView>
            <ThemedView style={{ ...styles.rowHeader }}>
                <ThemedText style={{ fontSize: 24 }}>Month</ThemedText>
                <ThemedView style={{ flexDirection: 'row', gap: 10 }}>

                    <ThemedText style={{ fontSize: 24 }}>Spend</ThemedText>
                    <ThemedText style={{ fontSize: 24 }}>Income</ThemedText>
                </ThemedView>
            </ThemedView>
            <FlatList
                style={{ width: "100%", height: "48%" }}
                data={yearAndMonthData}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <ThemedView style={styles.row}>
                        <ThemedText style={{ fontSize: 18 }} >{item.month}</ThemedText>
                        <ThemedView style={{ flexDirection: 'row', gap: 10 }}>
                            <ThemedText style={{ color: '#AD2222', fontSize: 18 }}>${item.spendAmount} </ThemedText>
                            <ThemedText style={{ color: '#A6F576', fontSize: 18 }}>${item.amount.toFixed(2)} </ThemedText>
                        </ThemedView>
                    </ThemedView>)}
                keyExtractor={(item) => (item.month).toString()}

            />

            <ThemedView style={styles.rowHeader}>
                <ThemedText style={{ fontSize: 20, width: "55%" }}>Total</ThemedText>
                <ThemedView style={{ flexDirection: 'row', width: "45%" }}>
                    <ThemedText style={{ fontSize: 20, width: "50%", textAlign: "center" }}>Spends</ThemedText>
                    <ThemedText style={{ fontSize: 20, width: "50%", textAlign: "center" }}>Incomes</ThemedText>
                </ThemedView>
            </ThemedView>
            <ThemedView style={styles.rowHeader}>
                <ThemedText style={{ width: "55%" }} >Of the Year</ThemedText>
                <ThemedView style={{ flexDirection: 'row', width: "45%" }}>
                    <ThemedText style={{ fontSize: 18, color: '#AD2222', width: "50%", textAlign: "center" }}>${yearData?.spendAmounts} </ThemedText>
                    <ThemedText style={{ fontSize: 18, color: '#A6F576', width: "50%", textAlign: "center" }}>${yearData?.amounts} </ThemedText>
                </ThemedView>
            </ThemedView>


        </ ThemedView>

    )
}

const styles = StyleSheet.create({
    textHeaderContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: rowHeaderColor,
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7,
    },
    textHeader: {
        fontSize: 22,
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
        marginBottom: 10,
        paddingBottom: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        gap: 2,
    },
    rowHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'flex-end',
        width: '100%',
        height: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'flex-end',
        width: '100%',
        marginVertical: 5,
    },
})



