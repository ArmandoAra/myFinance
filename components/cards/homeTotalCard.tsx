import { ThemedText } from "../ThemedText"
import { ThemedView } from "../ThemedView"
import { FlatList, StyleSheet } from 'react-native';

// Constants
import {
    rowHeaderColor, rowColorLighter, rowColorDarker
} from "../../constants/Colors";
import { useYearAndMonthContext } from "@/context/YearAndMonthProvider";

//Db
import { getAllYearSpends, getYearData, getYearIncome } from "@/db/dbTools";
import use, { useCallback, useEffect, useState } from 'react';
import { mergeAmountsAndSpends } from "@/utils/sortData";
import { useFocusEffect, useNavigationState } from "@react-navigation/native";




const exampleData = {
    year: 2024,
    totalBruIncome: 1000,
    totalNetIncome: 800,
    totalSpend: 200,
    totalUmst: 100,
    total: 1000
}
interface YearData {
    amount: number;
    month: string;
}

interface MonthData {
    spendAmount: number;
    month: string;
}

export interface YearAndMonthData {
    month: string;
    amount: number;
    spendAmount: number;
}

export default function HomeTotalCard() {


    const [yearData, setYearData] = useState<YearData[]>([])
    const [monthData, setMonthData] = useState<MonthData[]>([])
    const [yearAndMonthData, setYearAndMonthData] = useState<YearAndMonthData[]>([])

    //Obtener selectedYear from context
    const { selectedYear } = useYearAndMonthContext();
    //Obtener todos los Incomes del año seleccionado y meses
    // useEffect(() => {
    //     getYearData(selectedYear, setYearAndMonthData)
    //     console.log(yearAndMonthData)
    // }, [selectedYear])

    //Cada vez que cambie la ruta hacer un fetch de los datos
    useFocusEffect(
        useCallback(() => {
            getYearData(selectedYear, setYearAndMonthData)
        }, [selectedYear])
    );
    //Obtener todos los spends del año seleccionado y meses

    //Sumar todos los Incomes

    //Sumar todos los Spends

    return (

        < ThemedView style={styles.container} >
            <ThemedView style={styles.textHeaderContainer}>
                <ThemedText style={styles.textHeader} >Total of the {exampleData.year}</ThemedText>
            </ThemedView>
            <ThemedView style={{ ...styles.rowHeader }}>
                <ThemedText >Month</ThemedText>
                <ThemedView style={{ flexDirection: 'row', gap: 10 }}>

                    <ThemedText >Spend</ThemedText>
                    <ThemedText>Income</ThemedText>
                </ThemedView>
            </ThemedView>
            <FlatList
                style={{ width: "100%", height: "40%" }}
                data={yearAndMonthData}
                renderItem={({ item }) => (
                    <ThemedView style={{ ...styles.row }}>
                        <ThemedText >{item.month}</ThemedText>
                        <ThemedView style={{ flexDirection: 'row', gap: 10 }}>
                            <ThemedText style={{ color: '#AD2222' }}>{item.spendAmount} €</ThemedText>
                            <ThemedText style={{ color: '#A6F576' }}>{item.amount.toFixed(2)} €</ThemedText>
                        </ThemedView>
                    </ThemedView>)}
                keyExtractor={(item) => (item.month).toString()}

            />

            <ThemedView style={{ ...styles.rowHeader }}>
                <ThemedText >Total</ThemedText>
                <ThemedView style={{ flexDirection: 'row', gap: 10 }}>
                    <ThemedText >Spends</ThemedText>
                    <ThemedText>Incomes</ThemedText>
                </ThemedView>
            </ThemedView>
            <ThemedView style={{ ...styles.rowHeader }}>
                <ThemedText >Of the Year</ThemedText>
                <ThemedView style={{ flexDirection: 'row', gap: 10 }}>
                    <ThemedText style={{ color: '#AD2222' }}>{exampleData.totalSpend} €</ThemedText>
                    <ThemedText style={{ color: '#A6F576' }}>{exampleData.totalNetIncome.toFixed(2)} €</ThemedText>
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
        marginVertical: 2,
    },
})



